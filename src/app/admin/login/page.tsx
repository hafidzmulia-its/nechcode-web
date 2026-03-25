"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

import { getFirebaseClientAuth } from "@/lib/firebase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const auth = useMemo(() => getFirebaseClientAuth(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!auth) {
      setError("Firebase client belum dikonfigurasi. Cek NEXT_PUBLIC_FIREBASE_*.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setNotice(null);

      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Gagal login.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function onResetPassword() {
    if (!auth) {
      setError("Firebase client belum dikonfigurasi. Cek NEXT_PUBLIC_FIREBASE_*.");
      return;
    }

    if (!email) {
      setError("Isi email admin dulu untuk reset password.");
      return;
    }

    try {
      setIsResetting(true);
      setError(null);
      setNotice(null);
      await sendPasswordResetEmail(auth, email);
      setNotice("Link reset password sudah dikirim ke email tersebut.");
    } catch (resetError) {
      const message = resetError instanceof Error ? resetError.message : "Gagal kirim email reset password.";
      setError(message);
    } finally {
      setIsResetting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center justify-center px-5 py-16">
      <section className="w-full rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-8 shadow-[var(--shadow-soft)] md:p-10">
        <h1 className="mb-3 font-headline text-4xl text-primary">Admin Login</h1>
        <p className="mb-8 text-on-surface-variant">Akses hanya untuk akun admin NechCode.</p>

        <form className="space-y-5" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-on-surface">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3 outline-none ring-primary/30 transition focus:ring-2"
              placeholder="admin@nechcode.id"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-on-surface">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3 outline-none ring-primary/30 transition focus:ring-2"
              placeholder="••••••••"
            />
          </label>

          <button
            type="button"
            onClick={() => void onResetPassword()}
            disabled={isResetting}
            className="text-sm font-semibold text-primary underline underline-offset-4 disabled:opacity-60"
          >
            {isResetting ? "Mengirim link reset..." : "Lupa password admin? Kirim link reset"}
          </button>

          {error ? <p className="text-sm text-error">{error}</p> : null}
          {notice ? <p className="text-sm text-secondary">{notice}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-6 py-3.5 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk ke Dashboard"}
          </button>
        </form>
      </section>
    </main>
  );
}
