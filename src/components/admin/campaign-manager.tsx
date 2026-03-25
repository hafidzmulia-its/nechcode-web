"use client";

import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import { getFirebaseClientAuth } from "@/lib/firebase/client";
import { resolveCampaignUrgencyState } from "@/lib/campaign/urgency";
import type { Campaign, CampaignPayload, CampaignStatus, CampaignUrgencyMode } from "@/types/campaign";

type EditableCampaign = CampaignPayload & { id?: string };

const STATUS_OPTIONS: CampaignStatus[] = ["draft", "scheduled", "active", "paused", "expired", "archived"];
const URGENCY_OPTIONS: CampaignUrgencyMode[] = ["automatic", "force-awareness", "force-final-hours"];

const initialForm: EditableCampaign = {
  title: "",
  slug: "",
  status: "draft",
  shortLabel: "Campaign",
  headline: "",
  subheadline: "",
  description: "",
  body: "",
  ctaLabel: "Konsultasi via WhatsApp",
  secondaryCtaLabel: "Lihat Detail",
  ctaHref: "",
  secondaryCtaHref: "",
  campaignType: "other",
  audience: "",
  placementSettings: {
    allowOverlap: false,
    homepageWeight: "normal",
    stickyAlwaysOnRouteOpen: false,
  },
  startAt: new Date().toISOString(),
  endAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  timezone: "Asia/Jakarta",
  urgencyMode: "automatic",
  slotLimit: 0,
  slotUsed: 0,
  showCountdown: true,
  showBadge: true,
  isDismissible: true,
  placements: {
    topBar: true,
    homepageInline: true,
    stickyFinalHours: true,
    dedicatedPage: true,
    modalOptional: false,
  },
  visualVariant: "editorial",
  themeVariant: "cream",
  termsShort: "",
  termsLong: "",
  galleryItems: [],
  faqItems: [],
  priority: 10,
  analyticsPlaceholder: {
    utmCampaign: "",
    goalName: "",
    sourceNote: "",
  },
};

function toInputDateTime(value: string) {
  const ms = new Date(value).getTime();

  if (!Number.isFinite(ms)) {
    return "";
  }

  return new Date(ms).toISOString().slice(0, 16);
}

function fromInputDateTime(value: string) {
  const ms = new Date(value).getTime();

  if (!Number.isFinite(ms)) {
    return new Date().toISOString();
  }

  return new Date(ms).toISOString();
}

function tryParseJson<T>(raw: string, fallback: T): T {
  if (!raw.trim()) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Invalid JSON payload");
  }
}

export function CampaignManager() {
  const router = useRouter();
  const auth = useMemo(() => getFirebaseClientAuth(), []);
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<Campaign[]>([]);
  const [form, setForm] = useState<EditableCampaign>(initialForm);
  const [previewUrgency, setPreviewUrgency] = useState<CampaignUrgencyMode>("automatic");
  const [galleryJson, setGalleryJson] = useState("[]");
  const [faqJson, setFaqJson] = useState("[]");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function refreshItems(idToken: string) {
    const response = await fetch("/api/campaign?mode=admin", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const data = (await response.json()) as { items?: Campaign[]; error?: string };

    if (!response.ok) {
      setError(data.error ?? "Gagal memuat campaign.");
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
    if (!token) {
      return;
    }

    void refreshItems(token);
  }, [token]);

  useEffect(() => {
    setGalleryJson(JSON.stringify(form.galleryItems, null, 2));
    setFaqJson(JSON.stringify(form.faqItems, null, 2));
  }, [form.id]);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) {
      return;
    }

    const startMs = new Date(form.startAt).getTime();
    const endMs = new Date(form.endAt).getTime();

    if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || startMs >= endMs) {
      setError("Rentang tanggal campaign tidak valid.");
      return;
    }

    let galleryItems: Campaign["galleryItems"] = [];
    let faqItems: Campaign["faqItems"] = [];

    try {
      galleryItems = tryParseJson(galleryJson, []);
      faqItems = tryParseJson(faqJson, []);
    } catch {
      setError("Format JSON gallery atau FAQ tidak valid.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      setMessage(null);

      const method = form.id ? "PATCH" : "POST";
      const url = form.id ? `/api/campaign/${form.id}` : "/api/campaign";

      const payload: CampaignPayload = {
        ...form,
        galleryItems,
        faqItems,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { item?: Campaign; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Gagal menyimpan campaign.");
      }

      setMessage(form.id ? "Campaign diperbarui." : "Campaign ditambahkan.");
      setForm(initialForm);
      setGalleryJson("[]");
      setFaqJson("[]");
      await refreshItems(token);
    } catch (submitError) {
      const messageText = submitError instanceof Error ? submitError.message : "Gagal menyimpan campaign.";
      setError(messageText);
    } finally {
      setIsSaving(false);
    }
  }

  async function removeItem(id: string) {
    if (!token) {
      return;
    }

    if (!window.confirm("Hapus campaign ini?")) {
      return;
    }

    const response = await fetch(`/api/campaign/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Gagal menghapus campaign.");
      return;
    }

    await refreshItems(token);
    setMessage("Campaign dihapus.");
  }

  async function quickStatusUpdate(item: Campaign, status: CampaignStatus) {
    if (!token) {
      return;
    }

    const response = await fetch(`/api/campaign/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Gagal mengubah status campaign.");
      return;
    }

    setMessage(`Status campaign diubah ke ${status}.`);
    await refreshItems(token);
  }

  async function seedDefaults() {
    if (!token) {
      return;
    }

    const confirmed = window.confirm(
      "Import default campaign ke database? Hanya berjalan jika koleksi campaign masih kosong.",
    );

    if (!confirmed) {
      return;
    }

    setError(null);
    setMessage(null);

    const response = await fetch("/api/campaign/seed-defaults", {
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
      setError(data.error ?? "Gagal import default campaign.");
      return;
    }

    if (data.result?.skipped) {
      setMessage("Seed dilewati karena koleksi campaign sudah berisi data.");
    } else {
      setMessage(`Berhasil import ${data.result?.created ?? 0} campaign default.`);
    }

    await refreshItems(token);
  }

  async function onLogout() {
    if (!auth) {
      return;
    }

    await signOut(auth);
    router.push("/admin/login");
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-4xl text-primary md:text-5xl">Campaign Manager</h1>
          <p className="mt-2 text-on-surface-variant">Kelola campaign musiman dan urgency placement secara terpusat.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin" className="rounded-xl border border-outline-variant/45 px-4 py-2 text-sm font-semibold hover:bg-surface-container-low">
            Dashboard
          </Link>
          <Link href="/admin/portfolio" className="rounded-xl border border-outline-variant/45 px-4 py-2 text-sm font-semibold hover:bg-surface-container-low">
            Portfolio
          </Link>
          <Link href="/admin/faq" className="rounded-xl border border-outline-variant/45 px-4 py-2 text-sm font-semibold hover:bg-surface-container-low">
            FAQ
          </Link>
          <button onClick={() => void seedDefaults()} className="rounded-xl border border-outline-variant/45 px-4 py-2 text-sm font-semibold hover:bg-surface-container-low">
            Seed Defaults
          </button>
          <button onClick={onLogout} className="rounded-xl border border-outline-variant/45 px-5 py-2.5 text-sm font-semibold hover:bg-surface-container-low">
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-outline-variant/35 bg-surface-container-lowest p-6 shadow-[var(--shadow-soft)] md:p-8">
          <h2 className="mb-6 font-headline text-3xl text-primary">Daftar Campaign</h2>
          <div className="space-y-4">
            {items.map((item) => {
              const previewItem = { ...item, urgencyMode: previewUrgency };
              const urgency = resolveCampaignUrgencyState(previewItem);

              return (
                <article key={item.id} className="rounded-2xl border border-outline-variant/25 bg-white p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-headline text-2xl text-primary">{item.title}</h3>
                      <p className="text-xs uppercase tracking-wide text-on-surface-variant/75">
                        /campaign/{item.slug} • priority {item.priority}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button onClick={() => setForm({ ...item })} className="rounded-lg border border-outline-variant/40 px-3 py-1.5 text-xs font-semibold hover:bg-surface-container-low">
                        Edit
                      </button>
                      <button onClick={() => void quickStatusUpdate(item, item.status === "active" ? "paused" : "active")} className="rounded-lg border border-outline-variant/40 px-3 py-1.5 text-xs font-semibold hover:bg-surface-container-low">
                        {item.status === "active" ? "Pause" : "Activate"}
                      </button>
                      <button onClick={() => void removeItem(item.id)} className="rounded-lg bg-error px-3 py-1.5 text-xs font-semibold text-white">
                        Hapus
                      </button>
                    </div>
                  </div>

                  <p className="mb-2 text-sm text-on-surface-variant">{item.headline}</p>
                  <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide">
                    <span className="rounded-full bg-surface-container px-3 py-1 text-primary">Status: {item.status}</span>
                    <span className="rounded-full bg-surface-container px-3 py-1 text-primary">Urgency preview: {urgency}</span>
                    {item.placements.topBar ? <span className="rounded-full bg-surface-container px-3 py-1 text-primary">Top bar</span> : null}
                    {item.placements.homepageInline ? <span className="rounded-full bg-surface-container px-3 py-1 text-primary">Homepage inline</span> : null}
                    {item.placements.stickyFinalHours ? <span className="rounded-full bg-surface-container px-3 py-1 text-primary">Sticky final-hours</span> : null}
                    {item.placements.dedicatedPage ? <span className="rounded-full bg-surface-container px-3 py-1 text-primary">Dedicated page</span> : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-outline-variant/35 bg-surface-container-lowest p-6 shadow-[var(--shadow-soft)] md:p-8">
          <h2 className="mb-6 font-headline text-3xl text-primary">{form.id ? "Edit Campaign" : "Tambah Campaign"}</h2>

          <form className="space-y-4" onSubmit={submitForm}>
            <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Title" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" required />
            <input value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} placeholder="Slug (e.g. wisuda-april)" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" required />
            <input value={form.shortLabel} onChange={(event) => setForm((current) => ({ ...current, shortLabel: event.target.value }))} placeholder="Short label" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" required />
            <input value={form.headline} onChange={(event) => setForm((current) => ({ ...current, headline: event.target.value }))} placeholder="Headline" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" required />
            <textarea value={form.subheadline} onChange={(event) => setForm((current) => ({ ...current, subheadline: event.target.value }))} placeholder="Subheadline" rows={3} className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" required />
            <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="Description" rows={2} className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" required />
            <textarea value={form.body} onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))} placeholder="Body" rows={3} className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" required />

            <div className="grid grid-cols-2 gap-3">
              <input value={form.ctaLabel} onChange={(event) => setForm((current) => ({ ...current, ctaLabel: event.target.value }))} placeholder="Primary CTA label" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" required />
              <input value={form.secondaryCtaLabel ?? ""} onChange={(event) => setForm((current) => ({ ...current, secondaryCtaLabel: event.target.value }))} placeholder="Secondary CTA label" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input value={form.ctaHref ?? ""} onChange={(event) => setForm((current) => ({ ...current, ctaHref: event.target.value }))} placeholder="Primary CTA href (optional)" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" />
              <input value={form.secondaryCtaHref ?? ""} onChange={(event) => setForm((current) => ({ ...current, secondaryCtaHref: event.target.value }))} placeholder="Secondary CTA href (optional)" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as CampaignStatus }))} className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3">
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <select value={form.urgencyMode} onChange={(event) => setForm((current) => ({ ...current, urgencyMode: event.target.value as CampaignUrgencyMode }))} className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3">
                {URGENCY_OPTIONS.map((mode) => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs font-semibold text-on-surface-variant">
                Start At
                <input
                  type="datetime-local"
                  value={toInputDateTime(form.startAt)}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, startAt: fromInputDateTime(event.target.value) }))
                  }
                  className="mt-1 w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
                />
              </label>
              <label className="text-xs font-semibold text-on-surface-variant">
                End At
                <input
                  type="datetime-local"
                  value={toInputDateTime(form.endAt)}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, endAt: fromInputDateTime(event.target.value) }))
                  }
                  className="mt-1 w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input value={form.timezone} onChange={(event) => setForm((current) => ({ ...current, timezone: event.target.value }))} placeholder="Timezone" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" />
              <input type="number" value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: Number(event.target.value) }))} placeholder="Priority" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input value={form.audience} onChange={(event) => setForm((current) => ({ ...current, audience: event.target.value }))} placeholder="Audience" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" />
              <input value={form.campaignType} onChange={(event) => setForm((current) => ({ ...current, campaignType: event.target.value as Campaign["campaignType"] }))} placeholder="Campaign type" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <input
                value={form.analyticsPlaceholder?.utmCampaign ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    analyticsPlaceholder: { ...current.analyticsPlaceholder, utmCampaign: event.target.value },
                  }))
                }
                placeholder="Analytics UTM campaign"
                className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
              />
              <input
                value={form.analyticsPlaceholder?.goalName ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    analyticsPlaceholder: { ...current.analyticsPlaceholder, goalName: event.target.value },
                  }))
                }
                placeholder="Analytics goal name"
                className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
              />
              <input
                value={form.analyticsPlaceholder?.sourceNote ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    analyticsPlaceholder: { ...current.analyticsPlaceholder, sourceNote: event.target.value },
                  }))
                }
                placeholder="Analytics source note"
                className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input type="number" value={form.slotLimit ?? 0} onChange={(event) => setForm((current) => ({ ...current, slotLimit: Number(event.target.value) }))} placeholder="Slot limit" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" />
              <input type="number" value={form.slotUsed ?? 0} onChange={(event) => setForm((current) => ({ ...current, slotUsed: Number(event.target.value) }))} placeholder="Slot used" className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" />
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-xl border border-outline-variant/35 bg-white p-4 text-sm">
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.placements.topBar} onChange={(event) => setForm((current) => ({ ...current, placements: { ...current.placements, topBar: event.target.checked } }))} />Top Bar</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.placements.homepageInline} onChange={(event) => setForm((current) => ({ ...current, placements: { ...current.placements, homepageInline: event.target.checked } }))} />Homepage Inline</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.placements.stickyFinalHours} onChange={(event) => setForm((current) => ({ ...current, placements: { ...current.placements, stickyFinalHours: event.target.checked } }))} />Sticky Final-Hours</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.placements.dedicatedPage} onChange={(event) => setForm((current) => ({ ...current, placements: { ...current.placements, dedicatedPage: event.target.checked } }))} />Dedicated Page</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.placements.modalOptional} onChange={(event) => setForm((current) => ({ ...current, placements: { ...current.placements, modalOptional: event.target.checked } }))} />Modal Optional</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.placementSettings?.allowOverlap ?? false} onChange={(event) => setForm((current) => ({ ...current, placementSettings: { ...current.placementSettings, allowOverlap: event.target.checked } }))} />Allow Overlap</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.placementSettings?.stickyAlwaysOnRouteOpen ?? false} onChange={(event) => setForm((current) => ({ ...current, placementSettings: { ...current.placementSettings, stickyAlwaysOnRouteOpen: event.target.checked } }))} />Sticky Always on Route Open</label>
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-xl border border-outline-variant/35 bg-white p-4 text-sm">
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.showCountdown} onChange={(event) => setForm((current) => ({ ...current, showCountdown: event.target.checked }))} />Show Countdown</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.showBadge} onChange={(event) => setForm((current) => ({ ...current, showBadge: event.target.checked }))} />Show Badge</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.isDismissible} onChange={(event) => setForm((current) => ({ ...current, isDismissible: event.target.checked }))} />Dismissible</label>
            </div>

            <textarea value={form.termsShort ?? ""} onChange={(event) => setForm((current) => ({ ...current, termsShort: event.target.value }))} placeholder="Terms short" rows={2} className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" />
            <textarea value={form.termsLong ?? ""} onChange={(event) => setForm((current) => ({ ...current, termsLong: event.target.value }))} placeholder="Terms long" rows={3} className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3" />

            <label className="block text-xs font-semibold text-on-surface-variant">
              Gallery JSON
              <textarea value={galleryJson} onChange={(event) => setGalleryJson(event.target.value)} rows={4} className="mt-1 w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3 font-mono text-xs" />
            </label>

            <label className="block text-xs font-semibold text-on-surface-variant">
              FAQ JSON
              <textarea value={faqJson} onChange={(event) => setFaqJson(event.target.value)} rows={4} className="mt-1 w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3 font-mono text-xs" />
            </label>

            <div className="rounded-xl border border-outline-variant/35 bg-white p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Preview urgency state</p>
              <div className="flex flex-wrap gap-2">
                {URGENCY_OPTIONS.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPreviewUrgency(mode)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${previewUrgency === mode ? "border-primary bg-primary text-white" : "border-outline-variant/40"}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {message ? <p className="text-sm text-secondary">{message}</p> : null}
            {error ? <p className="text-sm text-error">{error}</p> : null}

            <div className="flex flex-wrap gap-2">
              <button disabled={isSaving} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
                {isSaving ? "Menyimpan..." : form.id ? "Update Campaign" : "Tambah Campaign"}
              </button>
              <button type="button" onClick={() => setForm(initialForm)} className="rounded-xl border border-outline-variant/45 px-5 py-2.5 text-sm font-semibold hover:bg-surface-container-low">
                Reset Form
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
