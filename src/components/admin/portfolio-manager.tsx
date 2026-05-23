"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent, type FormEvent } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { getFirebaseClientAuth } from "@/lib/firebase/client";
import type { PortfolioItem, PortfolioPayload } from "@/types/portfolio";

type EditablePortfolio = PortfolioPayload & { id?: string };

const CATEGORY_OPTIONS = [
  "Institutional & Research",
  "Business & Organization Websites",
  "Systems & Internal Tools",
  "Social Impact Projects",
  "Developer Projects",
  "Upcoming / In Development",
] as const;

const TYPE_OPTIONS = [
  "Logistics",
  "SaaS",
  "Dashboard",
  "Admin Panel",
  "Fintech",
  "E-commerce",
  "Automation",
  "Website",
  "Research",
  "Mobile App",
] as const;

const CUSTOM_CATEGORY_VALUE = "__custom__";
const CUSTOM_TYPE_VALUE = "__custom_type__";

const initialForm: EditablePortfolio = {
  title: "",
  categories: [],
  types: [],
  description: "",
  imageUrl: "",
  imageAlt: "",
  order: 1,
  published: true,
};

async function uploadImageToCloudinary(file: File) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary belum dikonfigurasi. Set NEXT_PUBLIC_CLOUDINARY_*.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload gambar gagal.");
  }

  const result = (await response.json()) as { secure_url?: string };

  if (!result.secure_url) {
    throw new Error("Cloudinary tidak mengembalikan URL gambar.");
  }

  return result.secure_url;
}

async function loadImageElement(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new window.Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Gagal membaca gambar."));
    };

    image.src = objectUrl;
  });
}

async function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Gagal mengompres gambar."));
          return;
        }

        resolve(blob);
      },
      type,
      quality,
    );
  });
}

async function compressImageBeforeUpload(file: File) {
  const image = await loadImageElement(file);
  const maxDimension = 1600;
  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas tidak tersedia untuk kompresi gambar.");
  }

  context.drawImage(image, 0, 0, width, height);

  const outputType = file.type === "image/webp" ? "image/webp" : "image/jpeg";
  let quality = 0.82;
  let blob = await canvasToBlob(canvas, outputType, quality);

  while (blob.size > 1200000 && quality > 0.45) {
    quality -= 0.08;
    blob = await canvasToBlob(canvas, outputType, quality);
  }

  const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, outputType === "image/webp" ? ".webp" : ".jpg"), {
    type: outputType,
    lastModified: Date.now(),
  });

  return {
    file: compressedFile,
    originalSize: file.size,
    compressedSize: compressedFile.size,
  };
}

export function PortfolioManager() {
  const router = useRouter();
  const auth = useMemo(() => getFirebaseClientAuth(), []);
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [form, setForm] = useState<EditablePortfolio>(initialForm);
  const [categorySelection, setCategorySelection] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [typeSelection, setTypeSelection] = useState("");
  const [customType, setCustomType] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const reorderDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queuedOrderIdsRef = useRef<string[] | null>(null);

  async function refreshItems(idToken: string) {
    const response = await fetch("/api/portfolio?mode=admin", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const data = (await response.json()) as { items?: PortfolioItem[]; error?: string };

    if (!response.ok) {
      setError(data.error ?? "Gagal memuat portfolio.");
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

    if (form.categories.length === 0) {
      setError("Tambahkan minimal 1 kategori.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      setMessage(null);

      const method = form.id ? "PATCH" : "POST";
      const url = form.id ? `/api/portfolio/${form.id}` : "/api/portfolio";
      const payload: PortfolioPayload = {
        title: form.title,
        categories: form.categories,
        types: form.types,
        description: form.description,
        imageUrl: form.imageUrl,
        imageAlt: form.imageAlt,
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

      const data = (await response.json()) as { item?: PortfolioItem; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Gagal menyimpan item.");
      }

      setMessage(form.id ? "Item diperbarui." : "Item ditambahkan.");
      setForm(initialForm);
      setCategorySelection("");
      setCustomCategory("");
      setTypeSelection("");
      setCustomType("");

      await refreshItems(token);
    } catch (submitError) {
      const messageText = submitError instanceof Error ? submitError.message : "Gagal menyimpan item.";
      setError(messageText);
    } finally {
      setIsSaving(false);
    }
  }

  async function removeItem(id: string) {
    if (!token) {
      return;
    }

    const confirmed = window.confirm("Hapus item portfolio ini?");
    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/portfolio/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Gagal menghapus item.");
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

    const response = await fetch("/api/portfolio/reorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids: orderedIds }),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Gagal menyusun ulang item.");
      await refreshItems(token);
      return;
    }

    setMessage("Urutan item diperbarui.");
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

  async function quickUpdate(id: string, payload: Partial<PortfolioPayload>, successMessage: string) {
    if (!token) {
      return;
    }

    setError(null);
    setMessage(null);

    const response = await fetch(`/api/portfolio/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Gagal memperbarui item.");
      return;
    }

    setMessage(successMessage);
    await refreshItems(token);
  }

  async function togglePublished(item: PortfolioItem) {
    await quickUpdate(
      item.id,
      { published: !item.published },
      item.published ? "Item di-unpublish." : "Item dipublish.",
    );
  }

  async function shiftOrder(item: PortfolioItem, direction: "up" | "down") {
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

    if (!token) {
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

  async function onImageChange(file: File | null) {
    if (!file) {
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      const compressed = await compressImageBeforeUpload(file);
      const url = await uploadImageToCloudinary(compressed.file);
      setForm((current) => ({
        ...current,
        imageUrl: url,
      }));
      setMessage(
        `Upload gambar berhasil (${Math.round(compressed.originalSize / 1024)}KB -> ${Math.round(
          compressed.compressedSize / 1024,
        )}KB).`,
      );
    } catch (uploadError) {
      const messageText = uploadError instanceof Error ? uploadError.message : "Upload gagal.";
      setError(messageText);
    } finally {
      setIsUploading(false);
    }
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

    const confirmed = window.confirm("Import portfolio default ke database? Hanya berjalan jika koleksi portfolio masih kosong.");

    if (!confirmed) {
      return;
    }

    setError(null);
    setMessage(null);

    const response = await fetch("/api/portfolio/seed-defaults", {
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
      setError(data.error ?? "Gagal import default portfolio.");
      return;
    }

    if (data.result?.skipped) {
      setMessage("Seed dilewati karena koleksi portfolio sudah berisi data.");
    } else {
      setMessage(`Berhasil import ${data.result?.created ?? 0} portfolio default.`);
    }

    await refreshItems(token);
  }

  function normalizeCategories(item: PortfolioItem) {
    const fromArray = Array.isArray(item.categories)
      ? item.categories.filter((value) => value && value.trim().length > 0)
      : [];

    if (fromArray.length > 0) {
      return fromArray;
    }

    return [item.category, item.categorySecondary].filter(
      (value): value is string => Boolean(value && value.trim().length > 0),
    );
  }

  function normalizeTypes(item: PortfolioItem) {
    if (!Array.isArray(item.types)) {
      return [];
    }

    return item.types.filter((value) => value && value.trim().length > 0);
  }

  function addCategory(value: string) {
    const normalized = value.trim();

    if (!normalized) {
      return;
    }

    setForm((current) => {
      if (current.categories.includes(normalized)) {
        return current;
      }

      return {
        ...current,
        categories: [...current.categories, normalized],
      };
    });
  }

  function removeCategory(index: number) {
    setForm((current) => ({
      ...current,
      categories: current.categories.filter((_, i) => i !== index),
    }));
  }

  function addType(value: string) {
    const normalized = value.trim();

    if (!normalized) {
      return;
    }

    setForm((current) => {
      if (current.types.includes(normalized)) {
        return current;
      }

      return {
        ...current,
        types: [...current.types, normalized],
      };
    });
  }

  function removeType(index: number) {
    setForm((current) => ({
      ...current,
      types: current.types.filter((_, i) => i !== index),
    }));
  }

  function startEdit(item: PortfolioItem) {
    const categories = normalizeCategories(item);
    const types = normalizeTypes(item);

    setForm({
      id: item.id,
      title: item.title,
      categories,
      types,
      description: item.description,
      imageUrl: item.imageUrl,
      imageAlt: item.imageAlt,
      order: item.order,
      published: item.published,
    });

    setCategorySelection("");
    setCustomCategory("");
    setTypeSelection("");
    setCustomType("");
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-4xl text-primary md:text-5xl">Portfolio Manager</h1>
          <p className="mt-2 text-on-surface-variant">Kelola konten karya untuk homepage secara dinamis.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="rounded-xl border border-outline-variant/45 px-4 py-2 text-sm font-semibold hover:bg-surface-container-low"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/faq"
            className="rounded-xl border border-outline-variant/45 px-4 py-2 text-sm font-semibold hover:bg-surface-container-low"
          >
            FAQ
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
          <h2 className="mb-6 font-headline text-3xl text-primary">Daftar Portfolio</h2>
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
                  <h3 className="font-headline text-2xl text-primary">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(item)}
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
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-md bg-surface-container px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Drag seluruh card untuk reorder
                  </span>
                </div>
                <p className="mb-2 text-xs uppercase tracking-wide text-on-surface-variant/70">
                  Urutan: {item.order} • Status: {item.published ? "Published" : "Draft"}
                </p>
                <p className="mb-2 text-xs uppercase tracking-wide text-on-surface-variant/70">
                  Last update: {item.updatedAt ? new Date(item.updatedAt).toLocaleString("id-ID") : "-"}
                  {item.updatedByEmail ? ` • by ${item.updatedByEmail}` : ""}
                </p>
                <div className="mb-2 flex flex-wrap gap-2 text-[11px]">
                  {normalizeCategories(item).map((category) => (
                    <span key={`${item.id}-${category}`} className="rounded-full bg-surface-container px-2.5 py-1 font-semibold text-primary">
                      {category}
                    </span>
                  ))}
                  {normalizeTypes(item).map((type) => (
                    <span key={`${item.id}-${type}`} className="rounded-full border border-outline-variant/40 bg-white px-2.5 py-1 font-semibold text-on-surface-variant">
                      {type}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-on-surface-variant">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-outline-variant/35 bg-surface-container-lowest p-6 shadow-[var(--shadow-soft)] md:p-8">
          <h2 className="mb-6 font-headline text-3xl text-primary">{form.id ? "Edit Item" : "Tambah Item"}</h2>

          <form className="space-y-4" onSubmit={submitForm}>
            <input
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Judul"
              className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
              required
            />
            <select
              value={categorySelection}
              onChange={(event) => {
                const value = event.target.value;
                setCategorySelection(value);

                if (value === CUSTOM_CATEGORY_VALUE) {
                  return;
                }

                if (value) {
                  addCategory(value);
                  return;
                }
              }}
              className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
            >
              <option value="" disabled>
                Pilih / Tambah Kategori
              </option>
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value={CUSTOM_CATEGORY_VALUE}>Tambah Kategori</option>
            </select>
            {categorySelection === CUSTOM_CATEGORY_VALUE ? (
              <div className="flex gap-2">
                <input
                  value={customCategory}
                  onChange={(event) => setCustomCategory(event.target.value)}
                  placeholder="Masukkan kategori baru"
                  className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
                />
                <button
                  type="button"
                  onClick={() => {
                    addCategory(customCategory);
                    setCustomCategory("");
                    setCategorySelection("");
                  }}
                  className="rounded-xl border border-outline-variant/45 px-4 text-sm font-semibold hover:bg-surface-container-low"
                >
                  Tambah
                </button>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {form.categories.map((category, index) => (
                <button
                  key={`${category}-${index}`}
                  type="button"
                  onClick={() => removeCategory(index)}
                  className="rounded-full bg-surface-container px-3 py-1 text-xs font-semibold text-primary"
                >
                  {category} ×
                </button>
              ))}
            </div>

            <select
              value={typeSelection}
              onChange={(event) => {
                const value = event.target.value;
                setTypeSelection(value);

                if (value === CUSTOM_TYPE_VALUE) {
                  return;
                }

                if (value) {
                  addType(value);
                }
              }}
              className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
            >
              <option value="" disabled>
                Pilih / Tambah Type
              </option>
              {TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value={CUSTOM_TYPE_VALUE}>Tambah Type</option>
            </select>
            {typeSelection === CUSTOM_TYPE_VALUE ? (
              <div className="flex gap-2">
                <input
                  value={customType}
                  onChange={(event) => setCustomType(event.target.value)}
                  placeholder="Masukkan type baru"
                  className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
                />
                <button
                  type="button"
                  onClick={() => {
                    addType(customType);
                    setCustomType("");
                    setTypeSelection("");
                  }}
                  className="rounded-xl border border-outline-variant/45 px-4 text-sm font-semibold hover:bg-surface-container-low"
                >
                  Tambah
                </button>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {form.types.map((type, index) => (
                <button
                  key={`${type}-${index}`}
                  type="button"
                  onClick={() => removeType(index)}
                  className="rounded-full border border-outline-variant/45 bg-white px-3 py-1 text-xs font-semibold text-on-surface-variant"
                >
                  {type} ×
                </button>
              ))}
            </div>
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
              placeholder="Deskripsi"
              rows={4}
              className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
              required
            />
            <input
              value={form.imageAlt}
              onChange={(event) => setForm((current) => ({ ...current, imageAlt: event.target.value }))}
              placeholder="Alt gambar"
              className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
              required
            />
            <input
              value={form.imageUrl}
              onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))}
              placeholder="URL gambar"
              className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
              required
            />

            <label className="block text-sm font-semibold text-on-surface">
              Upload via Cloudinary
              <input
                type="file"
                accept="image/*"
                onChange={(event) => void onImageChange(event.target.files?.[0] ?? null)}
                className="mt-2 block w-full text-sm"
              />
            </label>

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
              disabled={isSaving || isUploading}
              className="w-full rounded-xl bg-primary px-6 py-3.5 font-bold text-white disabled:opacity-60"
            >
              {isUploading ? "Uploading..." : isSaving ? "Menyimpan..." : "Simpan"}
            </button>
          </form>

          <div className="mt-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Live Preview</p>
            <article className="group rounded-2xl border border-outline-variant/25 bg-white p-4">
              <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-surface-container-low">
                {form.imageUrl ? (
                  <Image
                    src={form.imageUrl}
                    alt={form.imageAlt || "Preview image"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-on-surface-variant">
                    Belum ada gambar
                  </div>
                )}
              </div>
              <h3 className="mb-1 font-headline text-2xl text-primary">
                {form.title || "Judul Portfolio"}
              </h3>
              <div className="mb-2 flex flex-wrap gap-2">
                {(form.categories.length > 0 ? form.categories : ["Kategori"]).map((category, index) => (
                  <span key={`${category}-${index}`} className="rounded-full bg-surface-container px-3 py-1 text-[11px] font-semibold text-primary">
                    {category}
                  </span>
                ))}
                {form.types.map((type, index) => (
                  <span key={`${type}-${index}`} className="rounded-full border border-outline-variant/45 bg-white px-3 py-1 text-[11px] font-semibold text-on-surface-variant">
                    {type}
                  </span>
                ))}
              </div>
              <p className="text-sm text-on-surface-variant">
                {form.description || "Deskripsi proyek akan muncul di sini."}
              </p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
