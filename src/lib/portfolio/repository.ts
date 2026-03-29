import { defaultPortfolioItems } from "@/lib/portfolio/defaults";
import {
  getFirebaseAdminDb,
  isFirebaseAdminEnabled,
} from "@/lib/firebase/admin";
import {
  getVerifiedAdminActor,
  verifyAdminBearerToken,
  type AdminActor,
} from "@/lib/firebase/admin-auth";
import { withoutUndefined } from "@/lib/utils";
import type { PortfolioItem, PortfolioPayload } from "@/types/portfolio";

const COLLECTION = "portfolioItems";

function sortByOrder(items: PortfolioItem[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

function mapDoc(doc: FirebaseFirestore.DocumentSnapshot): PortfolioItem {
  const data = doc.data() as Record<string, unknown> | undefined;

  if (!data) {
    throw new Error("Invalid portfolio document");
  }

  const rawCategories = Array.isArray(data.categories)
    ? data.categories.filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    : [];
  const rawTypes = Array.isArray(data.types)
    ? data.types.filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    : [];

  const legacyCategory = typeof data.category === "string" ? data.category : undefined;
  const legacyCategorySecondary =
    typeof data.categorySecondary === "string" ? data.categorySecondary : undefined;

  const categories =
    rawCategories.length > 0
      ? rawCategories
      : [legacyCategory, legacyCategorySecondary].filter(
          (value): value is string => Boolean(value && value.trim().length > 0),
        );

  const normalizedCategories = categories.length > 0 ? categories : ["Business & Organization Websites"];
  const normalizedTypes = rawTypes;

  return {
    id: doc.id,
    title: String(data.title ?? "Untitled"),
    categories: normalizedCategories,
    types: normalizedTypes,
    category: normalizedCategories[0],
    categorySecondary: normalizedCategories[1],
    description: String(data.description ?? ""),
    imageUrl: String(data.imageUrl ?? ""),
    imageAlt: String(data.imageAlt ?? ""),
    order: Number(data.order ?? 1),
    published: Boolean(data.published ?? true),
    createdAt: typeof data.createdAt === "string" ? data.createdAt : undefined,
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
    updatedByEmail: typeof data.updatedByEmail === "string" ? data.updatedByEmail : undefined,
    updatedByUid: typeof data.updatedByUid === "string" ? data.updatedByUid : undefined,
  };
}

async function seedPortfolioItemsIfEmpty(actor?: AdminActor) {
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

  defaultPortfolioItems.forEach((item) => {
    const docRef = db.collection(COLLECTION).doc();
    batch.set(
      docRef,
      withoutUndefined({
        title: item.title,
        categories: item.categories,
        types: item.types,
        description: item.description,
        imageUrl: item.imageUrl,
        imageAlt: item.imageAlt,
        order: item.order,
        published: item.published,
        createdAt: now,
        updatedAt: now,
        updatedByEmail: actor?.email,
        updatedByUid: actor?.uid,
      }),
    );
  });

  await batch.commit();

  return { created: defaultPortfolioItems.length, skipped: false };
}

export async function seedDefaultPortfolioItems(actor?: AdminActor) {
  return seedPortfolioItemsIfEmpty(actor);
}

export async function listPublicPortfolioItems() {
  const fallback = sortByOrder(defaultPortfolioItems.filter((item) => item.published));

  if (!isFirebaseAdminEnabled()) {
    return fallback;
  }

  const db = getFirebaseAdminDb();

  if (!db) {
    return fallback;
  }

  try {
    const snapshot = await db.collection(COLLECTION).orderBy("order", "asc").get();
    const allItems = snapshot.docs.map(mapDoc);

    if (allItems.length === 0) {
      await seedPortfolioItemsIfEmpty();
      const seededSnapshot = await db.collection(COLLECTION).orderBy("order", "asc").get();
      const seededItems = seededSnapshot.docs.map(mapDoc).filter((item) => item.published);
      return seededItems.length > 0 ? seededItems : fallback;
    }

    return allItems.filter((item) => item.published);
  } catch (error) {
    console.error("Failed to load public portfolio items from Firestore:", error);
    return fallback;
  }
}

export async function listAdminPortfolioItems() {
  const fallback = sortByOrder(defaultPortfolioItems);

  if (!isFirebaseAdminEnabled()) {
    return fallback;
  }

  const db = getFirebaseAdminDb();

  if (!db) {
    return fallback;
  }

  const snapshot = await db.collection(COLLECTION).orderBy("order", "asc").get();

  const items = snapshot.docs.map(mapDoc);

  if (items.length === 0) {
    await seedPortfolioItemsIfEmpty();
    const seededSnapshot = await db.collection(COLLECTION).orderBy("order", "asc").get();
    const seededItems = seededSnapshot.docs.map(mapDoc);
    return seededItems.length > 0 ? seededItems : fallback;
  }

  return items;
}

export async function createPortfolioItem(payload: PortfolioPayload, actor?: AdminActor) {
  const db = getFirebaseAdminDb();

  if (!db) {
    throw new Error("Firebase admin is not configured.");
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

export async function updatePortfolioItem(
  id: string,
  payload: Partial<PortfolioPayload>,
  actor?: AdminActor,
) {
  const db = getFirebaseAdminDb();

  if (!db) {
    throw new Error("Firebase admin is not configured.");
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

export async function deletePortfolioItem(id: string) {
  const db = getFirebaseAdminDb();

  if (!db) {
    throw new Error("Firebase admin is not configured.");
  }

  await db.collection(COLLECTION).doc(id).delete();

  return { success: true };
}

export async function reorderPortfolioItems(ids: string[], actor?: AdminActor) {
  const db = getFirebaseAdminDb();

  if (!db) {
    throw new Error("Firebase admin is not configured.");
  }

  const timestamp = new Date().toISOString();
  const batch = db.batch();

  ids.forEach((id, index) => {
    const docRef = db.collection(COLLECTION).doc(id);
    batch.update(
      docRef,
      withoutUndefined({
        order: index + 1,
        updatedAt: timestamp,
        updatedByEmail: actor?.email,
        updatedByUid: actor?.uid,
      }),
    );
  });

  await batch.commit();
}

export { getVerifiedAdminActor, verifyAdminBearerToken };
export type { AdminActor };
