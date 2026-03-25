"use client";

import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { getFirebaseClientAuth } from "@/lib/firebase/client";

export function AdminHome() {
  const router = useRouter();
  const auth = useMemo(() => getFirebaseClientAuth(), []);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      setError("Firebase client belum dikonfigurasi.");
      return;
    }

    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }

      const allowed = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      const tokenResult = await user.getIdTokenResult();
      const hasAdminClaim = tokenResult.claims.admin === true;
      const requireClaim = process.env.NEXT_PUBLIC_ADMIN_REQUIRE_CUSTOM_CLAIM === "true";

      if (requireClaim && !hasAdminClaim) {
        setError("Akun ini tidak punya custom claim admin.");
        return;
      }

      if (!hasAdminClaim && allowed && user.email?.toLowerCase() !== allowed.toLowerCase()) {
        setError("Akun ini tidak punya akses admin.");
        return;
      }

      setEmail(user.email ?? null);
    });
  }, [auth, router]);

  async function onLogout() {
    if (!auth) {
      return;
    }

    await signOut(auth);
    router.push("/admin/login");
  }

  if (error) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-5 py-16">
        <section className="w-full rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-8 text-center shadow-[var(--shadow-soft)] md:p-10">
          <h1 className="mb-3 font-headline text-4xl text-primary">Admin Dashboard</h1>
          <p className="text-error">{error}</p>
          <Link href="/admin/login" className="mt-6 inline-flex rounded-xl border border-outline-variant/45 px-5 py-2.5 text-sm font-semibold hover:bg-surface-container-low">
            Kembali ke Login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 md:px-8 md:py-14">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-4xl text-primary md:text-5xl">Admin Dashboard</h1>
          <p className="mt-2 text-on-surface-variant">
            {email ? `Signed in as ${email}` : "Kelola konten website NechCode."}
          </p>
        </div>
        <button
          onClick={onLogout}
          className="rounded-xl border border-outline-variant/45 px-5 py-2.5 text-sm font-semibold hover:bg-surface-container-low"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link
          href="/admin/portfolio"
          className="rounded-3xl border border-outline-variant/35 bg-surface-container-lowest p-8 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">CMS Module</p>
          <h2 className="font-headline text-3xl text-primary">Portfolio Manager</h2>
          <p className="mt-3 text-sm text-on-surface-variant">Tambah, edit, publish, hapus, dan reorder karya.</p>
        </Link>

        <Link
          href="/admin/faq"
          className="rounded-3xl border border-outline-variant/35 bg-surface-container-lowest p-8 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">CMS Module</p>
          <h2 className="font-headline text-3xl text-primary">FAQ Manager</h2>
          <p className="mt-3 text-sm text-on-surface-variant">Kelola tanya jawab homepage secara dinamis.</p>
        </Link>
      </div>
    </main>
  );
}
