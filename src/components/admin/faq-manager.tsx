"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent, type FormEvent } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getFirebaseClientAuth } from "@/lib/firebase/client";
import type { FaqItem, FaqPayload } from "@/types/faq";

type EditableFaq = FaqPayload & { id?: string };

const initialForm: EditableFaq = {
  question: "",
  answer: "",
  order: 1,
  published: true,
};

export function FaqManager() {
  const router = useRouter();
  const auth = useMemo(() => getFirebaseClientAuth(), []);
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<FaqItem[]>([]);
  const [form, setForm] = useState<EditableFaq>(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const reorderDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queuedOrderIdsRef = useRef<string[] | null>(null);

  async function refreshItems(idToken: string) {
    const response = await fetch("/api/faq?mode=admin", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const data = (await response.json()) as { items?: FaqItem[]; error?: string };

    if (!response.ok) {
      setError(data.error ?? "Gagal memuat FAQ.");
      return;
    }

    setItems(data.items ?? []);
  }

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

      const idToken = await user.getIdToken();
      setToken(idToken);
    });
  }, [auth, router]);

  useEffect(() => {
    async function load() {
      if (!token) {
        return;
      }

      await refreshItems(token);
    }

    void load();
  }, [token]);

  useEffect(() => {
    return () => {
      if (reorderDebounceRef.current) {
        clearTimeout(reorderDebounceRef.current);
      }
    };
  }, []);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) {
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      setMessage(null);

      const method = form.id ? "PATCH" : "POST";
      const url = form.id ? `/api/faq/${form.id}` : "/api/faq";
      const payload: FaqPayload = {
        question: form.question,
        answer: form.answer,
        order: Number(form.order) || 1,
        published: form.published,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { item?: FaqItem; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Gagal menyimpan FAQ.");
      }

      setMessage(form.id ? "FAQ diperbarui." : "FAQ ditambahkan.");
      setForm(initialForm);
      await refreshItems(token);
    } catch (submitError) {
      const messageText = submitError instanceof Error ? submitError.message : "Gagal menyimpan FAQ.";
      setError(messageText);
    } finally {
      setIsSaving(false);
    }
  }

  async function removeItem(id: string) {
    if (!token) {
      return;
    }

    const confirmed = window.confirm("Hapus FAQ ini?");
    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/faq/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Gagal menghapus FAQ.");
      return;
    }

    await refreshItems(token);
  }

  async function reorderWithIds(orderedIds: string[]) {
    if (!token) {
      return;
    }

    setError(null);
    setMessage(null);

    const response = await fetch("/api/faq/reorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids: orderedIds }),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Gagal menyusun ulang FAQ.");
      await refreshItems(token);
      return;
    }

    setMessage("Urutan FAQ diperbarui.");
    await refreshItems(token);
  }

  function onDragStart(id: string) {
    setDraggingId(id);
  }

  function onDragEnd() {
    setDraggingId(null);
    setDragOverId(null);
  }

  function scheduleReorder(orderedIds: string[]) {
    queuedOrderIdsRef.current = orderedIds;
    setMessage("Urutan diperbarui. Menyimpan otomatis...");

    if (reorderDebounceRef.current) {
      clearTimeout(reorderDebounceRef.current);
    }

    reorderDebounceRef.current = setTimeout(() => {
      const pendingIds = queuedOrderIdsRef.current;
      if (!pendingIds) {
        return;
      }

      queuedOrderIdsRef.current = null;
      void reorderWithIds(pendingIds);
    }, 650);
  }

  function onDragOverItem(event: DragEvent<HTMLElement>, targetId: string) {
    event.preventDefault();

    if (draggingId && draggingId !== targetId && dragOverId !== targetId) {
      setDragOverId(targetId);
    }
  }

  async function onDropOn(targetId: string) {
    if (!draggingId || draggingId === targetId) {
      setDraggingId(null);
      setDragOverId(null);
      return;
    }

    const current = [...items].sort((a, b) => a.order - b.order);
    const sourceIndex = current.findIndex((item) => item.id === draggingId);
    const targetIndex = current.findIndex((item) => item.id === targetId);

    if (sourceIndex < 0 || targetIndex < 0) {
      setDraggingId(null);
      setDragOverId(null);
      return;
    }

    const [moved] = current.splice(sourceIndex, 1);
    current.splice(targetIndex, 0, moved);

    const optimistic = current.map((item, index) => ({ ...item, order: index + 1 }));
    setItems(optimistic);
    scheduleReorder(optimistic.map((item) => item.id));
    setDraggingId(null);
    setDragOverId(null);
  }

  async function quickUpdate(id: string, payload: Partial<FaqPayload>, successMessage: string) {
    if (!token) {
      return;
    }

    setError(null);
    setMessage(null);

    const response = await fetch(`/api/faq/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Gagal memperbarui FAQ.");
      return;
    }

    setMessage(successMessage);
    await refreshItems(token);
  }

  async function togglePublished(item: FaqItem) {
    await quickUpdate(
      item.id,
      { published: !item.published },
      item.published ? "FAQ di-unpublish." : "FAQ dipublish.",
    );
  }

  async function shiftOrder(item: FaqItem, direction: "up" | "down") {
    const sorted = [...items].sort((a, b) => a.order - b.order);
    const currentIndex = sorted.findIndex((entry) => entry.id === item.id);

    if (currentIndex < 0) {
      return;
    }

    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const swapTarget = sorted[swapIndex];

    if (!swapTarget) {
      return;
    }

    setError(null);

    const next = [...sorted];
    const [moved] = next.splice(currentIndex, 1);
    next.splice(swapIndex, 0, moved);

    const optimistic = next.map((entry, index) => ({ ...entry, order: index + 1 }));
    setItems(optimistic);
    scheduleReorder(optimistic.map((entry) => entry.id));
  }

  async function onLogout() {
    if (!auth) {
      return;
    }

    await signOut(auth);
    router.push("/admin/login");
  }

  async function seedDefaults() {
    if (!token) {
      return;
    }

    const confirmed = window.confirm("Import FAQ default dari content ke database? Hanya berjalan jika koleksi FAQ masih kosong.");

    if (!confirmed) {
      return;
    }

    setError(null);
    setMessage(null);

    const response = await fetch("/api/faq/seed-defaults", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as {
      result?: { created: number; skipped: boolean };
      error?: string;
    };

    if (!response.ok) {
      setError(data.error ?? "Gagal import default FAQ.");
      return;
    }

    if (data.result?.skipped) {
      setMessage("Seed dilewati karena koleksi FAQ sudah berisi data.");
    } else {
      setMessage(`Berhasil import ${data.result?.created ?? 0} FAQ default.`);
    }

    await refreshItems(token);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-4xl text-primary md:text-5xl">FAQ Manager</h1>
          <p className="mt-2 text-on-surface-variant">Kelola FAQ homepage secara dinamis.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="rounded-xl border border-outline-variant/45 px-4 py-2 text-sm font-semibold hover:bg-surface-container-low"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/portfolio"
            className="rounded-xl border border-outline-variant/45 px-4 py-2 text-sm font-semibold hover:bg-surface-container-low"
          >
            Portfolio
          </Link>
          <button
            onClick={() => void seedDefaults()}
            className="rounded-xl border border-outline-variant/45 px-4 py-2 text-sm font-semibold hover:bg-surface-container-low"
          >
            Seed Defaults
          </button>
          <button
            onClick={onLogout}
            className="rounded-xl border border-outline-variant/45 px-5 py-2.5 text-sm font-semibold hover:bg-surface-container-low"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-outline-variant/35 bg-surface-container-lowest p-6 shadow-[var(--shadow-soft)] md:p-8">
          <h2 className="mb-6 font-headline text-3xl text-primary">Daftar FAQ</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                draggable
                onDragStart={() => onDragStart(item.id)}
                onDragEnd={onDragEnd}
                onDragOver={(event) => onDragOverItem(event, item.id)}
                onDrop={() => void onDropOn(item.id)}
                className={`relative rounded-2xl border border-outline-variant/25 bg-white p-4 transition-shadow ${draggingId === item.id ? "cursor-grabbing opacity-70" : "cursor-grab"} ${dragOverId === item.id && draggingId !== item.id ? "shadow-[0_0_0_2px_rgba(0,188,212,0.18)]" : ""}`}
              >
                {dragOverId === item.id && draggingId !== item.id ? (
                  <div className="pointer-events-none absolute inset-x-5 -top-px h-0.5 rounded-full bg-secondary" />
                ) : null}
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-headline text-2xl text-primary">{item.question}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setForm({ ...item })}
                      className="rounded-lg border border-outline-variant/40 px-3 py-1.5 text-xs font-semibold hover:bg-surface-container-low"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => void togglePublished(item)}
                      className="rounded-lg border border-outline-variant/40 px-3 py-1.5 text-xs font-semibold hover:bg-surface-container-low"
                    >
                      {item.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => void shiftOrder(item, "up")}
                      className="rounded-lg border border-outline-variant/40 px-3 py-1.5 text-xs font-semibold hover:bg-surface-container-low"
                    >
                      Naik
                    </button>
                    <button
                      onClick={() => void shiftOrder(item, "down")}
                      className="rounded-lg border border-outline-variant/40 px-3 py-1.5 text-xs font-semibold hover:bg-surface-container-low"
                    >
                      Turun
                    </button>
                    <button
                      onClick={() => void removeItem(item.id)}
                      className="rounded-lg bg-error px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                <p className="mb-2 text-xs uppercase tracking-wide text-on-surface-variant/70">
                  Urutan: {item.order} • Status: {item.published ? "Published" : "Draft"}
                </p>
                <p className="mb-2 text-xs uppercase tracking-wide text-on-surface-variant/70">
                  Last update: {item.updatedAt ? new Date(item.updatedAt).toLocaleString("id-ID") : "-"}
                  {item.updatedByEmail ? ` • by ${item.updatedByEmail}` : ""}
                </p>
                <p className="line-clamp-3 text-sm text-on-surface-variant">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-outline-variant/35 bg-surface-container-lowest p-6 shadow-[var(--shadow-soft)] md:p-8">
          <h2 className="mb-6 font-headline text-3xl text-primary">{form.id ? "Edit FAQ" : "Tambah FAQ"}</h2>

          <form className="space-y-4" onSubmit={submitForm}>
            <input
              value={form.question}
              onChange={(event) => setForm((current) => ({ ...current, question: event.target.value }))}
              placeholder="Pertanyaan"
              className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
              required
            />
            <textarea
              value={form.answer}
              onChange={(event) => setForm((current) => ({ ...current, answer: event.target.value }))}
              placeholder="Jawaban"
              rows={6}
              className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={form.order}
                onChange={(event) => setForm((current) => ({ ...current, order: Number(event.target.value) }))}
                placeholder="Urutan"
                className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
                required
              />
              <label className="flex items-center gap-3 rounded-xl border border-outline-variant/45 bg-white px-4 py-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, published: event.target.checked }))
                  }
                />
                Publish
              </label>
            </div>

            {message ? <p className="text-sm text-secondary">{message}</p> : null}
            {error ? <p className="text-sm text-error">{error}</p> : null}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-xl bg-primary px-6 py-3.5 font-bold text-white disabled:opacity-60"
            >
              {isSaving ? "Menyimpan..." : "Simpan"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
