import { defaultCampaigns } from "@/lib/campaign/defaults";
import {
  resolveCampaignUrgencyState,
  resolveEffectiveCampaignStatus,
} from "@/lib/campaign/urgency";
import {
  getFirebaseAdminAuth,
  getFirebaseAdminDb,
  isFirebaseAdminEnabled,
} from "@/lib/firebase/admin";
import type { Campaign, CampaignPayload } from "@/types/campaign";

const COLLECTION = "campaignItems";

type CampaignPlacementKey = keyof Campaign["placements"];

export type AdminActor = {
  uid: string;
  email?: string;
};

function withoutUndefined<T extends Record<string, unknown>>(data: T) {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}

function sortCampaigns(items: Campaign[]) {
  return [...items].sort((a, b) => b.priority - a.priority);
}

function normalizeCampaign(item: Campaign): Campaign {
  return {
    ...item,
    galleryItems: Array.isArray(item.galleryItems) ? item.galleryItems : [],
    faqItems: Array.isArray(item.faqItems) ? item.faqItems : [],
    placements: {
      topBar: Boolean(item.placements?.topBar),
      homepageInline: Boolean(item.placements?.homepageInline),
      stickyFinalHours: Boolean(item.placements?.stickyFinalHours),
      dedicatedPage: Boolean(item.placements?.dedicatedPage),
      modalOptional: Boolean(item.placements?.modalOptional),
    },
  };
}

function toMs(value: string) {
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : NaN;
}

function validateDateRange(startAt: string, endAt: string) {
  const startMs = toMs(startAt);
  const endMs = toMs(endAt);

  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || startMs >= endMs) {
    throw new Error("Invalid campaign schedule range.");
  }

  return { startMs, endMs };
}

function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && bStart < aEnd;
}

function hasPlacement(campaign: Campaign, placement: CampaignPlacementKey) {
  return Boolean(campaign.placements?.[placement]);
}

function mapDoc(doc: FirebaseFirestore.DocumentSnapshot): Campaign {
  const raw = doc.data() as CampaignPayload | undefined;

  if (!raw) {
    throw new Error("Invalid campaign document");
  }

  return normalizeCampaign({
    ...raw,
    id: doc.id,
  });
}

async function seedCampaignsIfEmpty(actor?: AdminActor) {
  const db = getFirebaseAdminDb();

  if (!db) {
    return { created: 0, skipped: true };
  }

  const existing = await db.collection(COLLECTION).limit(1).get();

  if (!existing.empty) {
    return { created: 0, skipped: true };
  }

  const now = new Date().toISOString();
  const batch = db.batch();

  defaultCampaigns.forEach((campaign) => {
    const docRef = db.collection(COLLECTION).doc();
    batch.set(
      docRef,
      withoutUndefined({
        ...campaign,
        createdAt: now,
        updatedAt: now,
        updatedByEmail: actor?.email,
        updatedByUid: actor?.uid,
      }),
    );
  });

  await batch.commit();

  return { created: defaultCampaigns.length, skipped: false };
}

export async function seedDefaultCampaignItems(actor?: AdminActor) {
  return seedCampaignsIfEmpty(actor);
}

export async function listAdminCampaignItems() {
  const fallback = sortCampaigns(defaultCampaigns);

  if (!isFirebaseAdminEnabled()) {
    return fallback;
  }

  const db = getFirebaseAdminDb();

  if (!db) {
    return fallback;
  }

  const snapshot = await db.collection(COLLECTION).orderBy("priority", "desc").get();
  const items = snapshot.docs.map(mapDoc);

  if (items.length === 0) {
    await seedCampaignsIfEmpty();
    const seededSnapshot = await db.collection(COLLECTION).orderBy("priority", "desc").get();
    return seededSnapshot.docs.map(mapDoc);
  }

  return items;
}

function toPublicActive(items: Campaign[], now = new Date()) {
  return items
    .map((item) => ({
      ...item,
      status: resolveEffectiveCampaignStatus(item, now),
    }))
    .filter((item) => resolveCampaignUrgencyState(item, now) !== "inactive")
    .filter((item) => resolveCampaignUrgencyState(item, now) !== "scheduled")
    .filter((item) => resolveCampaignUrgencyState(item, now) !== "expired");
}

export async function listPublicCampaignItems(now = new Date()) {
  const items = await listAdminCampaignItems();
  return toPublicActive(items, now);
}

export async function createCampaignItem(payload: CampaignPayload, actor?: AdminActor) {
  const db = getFirebaseAdminDb();

  if (!db) {
    throw new Error("Firebase admin is not configured.");
  }

  validateDateRange(payload.startAt, payload.endAt);

  const existing = await listAdminCampaignItems();
  const payloadStart = toMs(payload.startAt);
  const payloadEnd = toMs(payload.endAt);

  if (payload.status === "active" || payload.status === "scheduled") {
    const placementsToGuard: CampaignPlacementKey[] = ["topBar", "homepageInline", "stickyFinalHours"];

    for (const placement of placementsToGuard) {
      if (!payload.placements[placement]) {
        continue;
      }

      const conflict = existing.find((item) => {
        if (!hasPlacement(item, placement)) {
          return false;
        }

        if (item.status !== "active" && item.status !== "scheduled") {
          return false;
        }

        if (item.placementSettings?.allowOverlap || payload.placementSettings?.allowOverlap) {
          return false;
        }

        const itemStart = toMs(item.startAt);
        const itemEnd = toMs(item.endAt);

        if (!Number.isFinite(itemStart) || !Number.isFinite(itemEnd)) {
          return false;
        }

        return overlaps(payloadStart, payloadEnd, itemStart, itemEnd);
      });

      if (conflict) {
        throw new Error(`Placement overlap detected on ${placement}. Set allowOverlap to true to bypass.`);
      }
    }
  }

  const now = new Date().toISOString();
  const docRef = db.collection(COLLECTION).doc();

  await docRef.set(
    withoutUndefined({
      ...payload,
      createdAt: now,
      updatedAt: now,
      updatedByEmail: actor?.email,
      updatedByUid: actor?.uid,
    }),
  );

  const created = await docRef.get();
  return mapDoc(created);
}

export async function updateCampaignItem(
  id: string,
  payload: Partial<CampaignPayload>,
  actor?: AdminActor,
) {
  const db = getFirebaseAdminDb();

  if (!db) {
    throw new Error("Firebase admin is not configured.");
  }

  const currentDoc = await db.collection(COLLECTION).doc(id).get();

  if (!currentDoc.exists) {
    throw new Error("Campaign item not found.");
  }

  const current = mapDoc(currentDoc);
  const merged = {
    ...current,
    ...payload,
    placements: {
      ...current.placements,
      ...(payload.placements ?? {}),
    },
    placementSettings: {
      ...current.placementSettings,
      ...(payload.placementSettings ?? {}),
    },
  } as Campaign;

  validateDateRange(merged.startAt, merged.endAt);

  const existing = (await listAdminCampaignItems()).filter((item) => item.id !== id);
  const mergedStart = toMs(merged.startAt);
  const mergedEnd = toMs(merged.endAt);

  if (merged.status === "active" || merged.status === "scheduled") {
    const placementsToGuard: CampaignPlacementKey[] = ["topBar", "homepageInline", "stickyFinalHours"];

    for (const placement of placementsToGuard) {
      if (!merged.placements[placement]) {
        continue;
      }

      const conflict = existing.find((item) => {
        if (!hasPlacement(item, placement)) {
          return false;
        }

        if (item.status !== "active" && item.status !== "scheduled") {
          return false;
        }

        if (item.placementSettings?.allowOverlap || merged.placementSettings?.allowOverlap) {
          return false;
        }

        const itemStart = toMs(item.startAt);
        const itemEnd = toMs(item.endAt);

        if (!Number.isFinite(itemStart) || !Number.isFinite(itemEnd)) {
          return false;
        }

        return overlaps(mergedStart, mergedEnd, itemStart, itemEnd);
      });

      if (conflict) {
        throw new Error(`Placement overlap detected on ${placement}. Set allowOverlap to true to bypass.`);
      }
    }
  }

  const docRef = db.collection(COLLECTION).doc(id);

  await docRef.update(
    withoutUndefined({
      ...payload,
      updatedAt: new Date().toISOString(),
      updatedByEmail: actor?.email,
      updatedByUid: actor?.uid,
    }),
  );

  const updated = await docRef.get();
  return mapDoc(updated);
}

export async function deleteCampaignItem(id: string) {
  const db = getFirebaseAdminDb();

  if (!db) {
    throw new Error("Firebase admin is not configured.");
  }

  await db.collection(COLLECTION).doc(id).delete();
  return { success: true };
}

export async function getPublicCampaignBySlug(slug: string, now = new Date()) {
  const all = await listPublicCampaignItems(now);
  return all.find((item) => item.slug === slug && item.placements.dedicatedPage) ?? null;
}

export async function getActiveCampaignForPlacement(
  placement: CampaignPlacementKey,
  now = new Date(),
) {
  const all = await listPublicCampaignItems(now);

  const candidates = all
    .filter((item) => item.placements[placement])
    .sort((a, b) => b.priority - a.priority);

  if (candidates.length === 0) {
    return null;
  }

  return candidates[0];
}

export async function getActiveCampaignPlacements(now = new Date()) {
  const topBar = await getActiveCampaignForPlacement("topBar", now);
  const homepageInline = await getActiveCampaignForPlacement("homepageInline", now);
  const stickyFinalHours = await getActiveCampaignForPlacement("stickyFinalHours", now);

  return {
    topBar,
    homepageInline,
    stickyFinalHours,
  };
}

export async function verifyAdminBearerToken(authHeader: string | null) {
  if (!authHeader?.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const adminAuth = getFirebaseAdminAuth();

  if (!adminAuth) {
    return false;
  }

  const decoded = await adminAuth.verifyIdToken(token);
  const allowedEmail = process.env.ADMIN_EMAIL;
  const requireAdminClaim = process.env.ADMIN_REQUIRE_CUSTOM_CLAIM === "true";

  if (requireAdminClaim && decoded.admin !== true) {
    return false;
  }

  if (!allowedEmail) {
    return Boolean(decoded.admin === true);
  }

  if (decoded.admin === true) {
    return true;
  }

  return decoded.email?.toLowerCase() === allowedEmail.toLowerCase();
}

export async function getVerifiedAdminActor(authHeader: string | null) {
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const adminAuth = getFirebaseAdminAuth();

  if (!adminAuth) {
    return null;
  }

  const decoded = await adminAuth.verifyIdToken(token);
  const allowedEmail = process.env.ADMIN_EMAIL;
  const requireAdminClaim = process.env.ADMIN_REQUIRE_CUSTOM_CLAIM === "true";

  if (requireAdminClaim && decoded.admin !== true) {
    return null;
  }

  const email = decoded.email?.toLowerCase();

  if (!allowedEmail && decoded.admin !== true) {
    return null;
  }

  if (allowedEmail && decoded.admin !== true && email !== allowedEmail.toLowerCase()) {
    return null;
  }

  return {
    uid: decoded.uid,
    email: decoded.email,
  } as AdminActor;
}

export function isCampaignWriteEnabled() {
  return isFirebaseAdminEnabled();
}
