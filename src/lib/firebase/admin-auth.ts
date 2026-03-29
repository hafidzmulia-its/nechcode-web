import { getFirebaseAdminAuth } from "@/lib/firebase/admin";

export type AdminActor = {
  uid: string;
  email?: string;
};

export async function verifyAdminBearerToken(authHeader: string | null): Promise<boolean> {
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

export async function getVerifiedAdminActor(authHeader: string | null): Promise<AdminActor | null> {
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
  };
}