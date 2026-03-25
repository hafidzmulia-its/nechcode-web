import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function parsePrivateKey(value?: string) {
  if (!value) {
    return undefined;
  }

  return value.replace(/\\n/g, "\n");
}

function hasAdminConfig() {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY,
  );
}

export function getFirebaseAdminApp() {
  if (!hasAdminConfig()) {
    return null;
  }

  if (getApps().length > 0) {
    return getApps()[0];
  }

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: parsePrivateKey(process.env.FIREBASE_PRIVATE_KEY),
    }),
  });
}

export function getFirebaseAdminAuth() {
  const app = getFirebaseAdminApp();

  if (!app) {
    return null;
  }

  return getAuth(app);
}

export function getFirebaseAdminDb() {
  const app = getFirebaseAdminApp();

  if (!app) {
    return null;
  }

  return getFirestore(app);
}

export function isFirebaseAdminEnabled() {
  return hasAdminConfig();
}
