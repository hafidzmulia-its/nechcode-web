import { defaultLocale, getHomeContent } from "@/content/home";
import {
  getFirebaseAdminDb,
  isFirebaseAdminEnabled,
} from "@/lib/firebase/admin";
import {
  getVerifiedAdminActor,
  verifyAdminBearerToken,
  type AdminActor,
} from "@/lib/firebase/admin-auth";
import type { FaqItem, FaqPayload } from "@/types/faq";

const COLLECTION = "faqItems";

function sortByOrder(items: FaqItem[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

function toDefaultFaqItems() {
  const content = getHomeContent(defaultLocale);

  return content.faq.items.map((item, index) => ({
    id: `default-faq-${index + 1}`,
    question: item.question,
    answer: item.answer,
    order: index + 1,
    published: true,
  })) as FaqItem[];
}

function mapDoc(doc: FirebaseFirestore.DocumentSnapshot): FaqItem {
  const data = doc.data() as Omit<FaqItem, "id"> | undefined;

  if (!data) {
    throw new Error("Invalid FAQ document");
  }

  return {
    id: doc.id,
    ...data,
  };
}

export async function listPublicFaqItems() {
  const fallback = sortByOrder(toDefaultFaqItems().filter((item) => item.published));

  if (!isFirebaseAdminEnabled()) {
    return fallback;
  }

  const db = getFirebaseAdminDb();

  if (!db) {
    return fallback;
  }

  try {
    const snapshot = await db
      .collection(COLLECTION)
      .where("published", "==", true)
      .orderBy("order", "asc")
      .get();

    const items = snapshot.docs.map(mapDoc);

    if (items.length === 0) {
      await seedDefaultFaqItems();
      const seededSnapshot = await db
        .collection(COLLECTION)
        .where("published", "==", true)
        .orderBy("order", "asc")
        .get();

      const seededItems = seededSnapshot.docs.map(mapDoc);
      return seededItems.length > 0 ? seededItems : fallback;
    }

    return items;
  } catch {
    return fallback;
  }
}

export async function listAdminFaqItems() {
  const fallback = sortByOrder(toDefaultFaqItems());

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
    await seedDefaultFaqItems();
    const seededSnapshot = await db.collection(COLLECTION).orderBy("order", "asc").get();
    const seededItems = seededSnapshot.docs.map(mapDoc);
    return seededItems.length > 0 ? seededItems : fallback;
  }

  return items;
}

export async function createFaqItem(payload: FaqPayload, actor?: AdminActor) {
  const db = getFirebaseAdminDb();

  if (!db) {
    throw new Error("Firebase admin is not configured.");
  }

  const now = new Date().toISOString();
  const docRef = db.collection(COLLECTION).doc();

  await docRef.set({
    ...payload,
    createdAt: now,
    updatedAt: now,
    updatedByEmail: actor?.email,
    updatedByUid: actor?.uid,
  });

  const created = await docRef.get();

  return mapDoc(created);
}

export async function updateFaqItem(id: string, payload: Partial<FaqPayload>, actor?: AdminActor) {
  const db = getFirebaseAdminDb();

  if (!db) {
    throw new Error("Firebase admin is not configured.");
  }

  const docRef = db.collection(COLLECTION).doc(id);

  await docRef.update({
    ...payload,
    updatedAt: new Date().toISOString(),
    updatedByEmail: actor?.email,
    updatedByUid: actor?.uid,
  });

  const updated = await docRef.get();

  return mapDoc(updated);
}

export async function deleteFaqItem(id: string) {
  const db = getFirebaseAdminDb();

  if (!db) {
    throw new Error("Firebase admin is not configured.");
  }

  await db.collection(COLLECTION).doc(id).delete();

  return { success: true };
}

export async function reorderFaqItems(ids: string[], actor?: AdminActor) {
  const db = getFirebaseAdminDb();

  if (!db) {
    throw new Error("Firebase admin is not configured.");
  }

  const timestamp = new Date().toISOString();
  const batch = db.batch();

  ids.forEach((id, index) => {
    const docRef = db.collection(COLLECTION).doc(id);
    batch.update(docRef, {
      order: index + 1,
      updatedAt: timestamp,
      updatedByEmail: actor?.email,
      updatedByUid: actor?.uid,
    });
  });

  await batch.commit();
}

export async function seedDefaultFaqItems(actor?: AdminActor) {
  const db = getFirebaseAdminDb();

  if (!db) {
    throw new Error("Firebase admin is not configured.");
  }

  const existing = await db.collection(COLLECTION).limit(1).get();

  if (!existing.empty) {
    return { created: 0, skipped: true };
  }

  const defaults = toDefaultFaqItems();
  const now = new Date().toISOString();
  const batch = db.batch();

  defaults.forEach((item) => {
    const docRef = db.collection(COLLECTION).doc();
    batch.set(docRef, {
      question: item.question,
      answer: item.answer,
      order: item.order,
      published: item.published,
      createdAt: now,
      updatedAt: now,
      updatedByEmail: actor?.email,
      updatedByUid: actor?.uid,
    });
  });

  await batch.commit();

  return { created: defaults.length, skipped: false };
}

export { getVerifiedAdminActor, verifyAdminBearerToken };
export type { AdminActor };
