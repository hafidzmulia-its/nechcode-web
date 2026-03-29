# DRY + Clean Code Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate all DRY violations across the frontend and backend without changing any functionality.

**Architecture:** Three new shared modules (`lib/firebase/admin-auth.ts`, `lib/utils.ts` addition, `config/layout.ts`, `components/shared/social-icon.tsx`) serve as single sources of truth. All existing files import from these instead of defining their own copies.

**Tech Stack:** Next.js 15 App Router, TypeScript, React, Tailwind CSS, Firebase Admin SDK, Lucide React

---

## Status Check

Most of the refactor was already applied by a prior editor. The following tasks are what **remain**.

### Already verified complete — DO NOT re-touch:
- `src/lib/firebase/admin-auth.ts` — created, correct ✅
- `src/lib/utils.ts` — `withoutUndefined` added ✅
- `src/config/layout.ts` — created ✅
- `src/components/shared/social-icon.tsx` — created ✅
- `src/lib/portfolio/repository.ts` — imports from admin-auth + utils, no local copies ✅
- `src/lib/faq/repository.ts` — imports from admin-auth, no local copies ✅
- `src/lib/campaign/repository.ts` — imports from admin-auth + utils, no local copies ✅
- `isPortfolioWriteEnabled`, `isFaqWriteEnabled`, `isCampaignWriteEnabled` — removed, API routes call `isFirebaseAdminEnabled()` directly ✅
- `top-navbar.tsx` — uses `layoutContainer`, `isNavItemActive` extracted ✅
- `site-footer.tsx` — uses `SocialIcon` + `layoutContainer` ✅
- `services-section.tsx` — uses `layoutContainer` ✅
- `hero-section.tsx` — uses `layoutContainer` ✅
- `final-cta-section.tsx` — uses `SocialIcon` + `layoutContainer` ✅

---

## File Change Summary

| File | Action |
|---|---|
| `src/components/pages/contact-page.tsx` | MODIFY — remove local `getSocialIcon`, use `SocialIcon`; use `layoutContainer` on container divs |
| `docs/architecture.md` | CREATE — project architecture documentation |

---

## Task 1: Fix contact-page.tsx

**Files:**
- Modify: `src/components/pages/contact-page.tsx`

**Context:** This file still has a local `getSocialIcon()` function (lines 44–72) that is a verbatim duplicate of the shared `SocialIcon` component. It also has two container `<div>`s that use the `layoutContainer` string inline instead of the shared constant.

- [ ] **Step 1: Verify the current duplicates**

Open `src/components/pages/contact-page.tsx` and confirm:
1. Lines 4–5: imports `Instagram, Linkedin` from `lucide-react` (these are only used by `getSocialIcon`)
2. Lines 44–72: local `getSocialIcon(platform: string)` function
3. Line 81: `className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12"`
4. Line 95: another inline container class with the same string
5. Line 130: `{getSocialIcon(item.platform)}`

- [ ] **Step 2: Apply the changes**

Replace the entire file content with the following:

```tsx
"use client";

import { useMemo, useState } from "react";

import { SocialIcon } from "@/components/shared/social-icon";
import { buildMailto, getSocialLinks, siteConfig } from "@/config/site";
import { layoutContainer } from "@/config/layout";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { Reveal } from "@/components/shared/reveal";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import type { HomeContent } from "@/content/home";

type ContactPageProps = {
  content: HomeContent;
};

export function ContactPage({ content }: ContactPageProps) {
  const socialLinks = getSocialLinks();
  const [briefForm, setBriefForm] = useState({
    name: "",
    email: "",
    projectType: "",
    brief: "",
  });

  const whatsappLink = buildWhatsAppInquiryUrl({
    sourcePage: "Contact Page",
    serviceInterest: "Diskusi kebutuhan proyek",
  });

  const briefWhatsappLink = useMemo(
    () =>
      buildWhatsAppInquiryUrl({
        sourcePage: "Contact Page - Brief Form",
        name: briefForm.name,
        serviceInterest: briefForm.projectType || "Brief proyek digital",
        packageInterest: briefForm.projectType,
        mainNeed: briefForm.brief,
        additionalNote: briefForm.email ? `Email kontak: ${briefForm.email}` : undefined,
      }),
    [briefForm],
  );

  return (
    <div className="selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar brand={content.brand} nav={content.nav} cta={content.headerCta} />

      <main className="pb-20">
        <section className="w-full bg-surface py-20">
          <div className={layoutContainer}>
            <Reveal once y={18} className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Contact</p>
              <h1 className="font-headline text-5xl leading-tight text-primary md:text-7xl">
                Konsultasi Proyek dengan <span className="serif-italic">Arah yang Jelas</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-on-surface-variant">
                Ceritakan konteks bisnis, target timeline, dan prioritas Anda. Kami akan bantu memetakan opsi solusi paling realistis untuk tahap awal sampai implementasi.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="w-full bg-gradient-to-b from-surface-container-low/55 to-surface py-10 md:py-14">
          <div className={`${layoutContainer} grid grid-cols-1 gap-6 md:grid-cols-2`}>
            <Reveal y={16}>
              <div className="rounded-[1.8rem] border border-outline-variant/20 bg-surface-container-lowest p-7 shadow-[0_10px_24px_rgba(24,34,45,0.06)]">
                <h2 className="mb-4 font-headline text-3xl text-primary">Direct Channel</h2>
                <div className="space-y-3 text-sm text-on-surface-variant">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold !text-white visited:!text-white hover:!text-white transition hover:opacity-90"
                  >
                    Konsultasi via WhatsApp ({siteConfig.whatsappDisplayName})
                  </a>
                  <a
                    href={buildMailto("Konsultasi Proyek NechCode")}
                    className="inline-flex w-full items-center justify-center rounded-xl border border-outline-variant/30 bg-surface px-5 py-3 text-sm font-bold text-primary transition hover:bg-surface-container"
                  >
                    Kirim Brief via Email
                  </a>
                  <p>Email resmi: <a className="font-semibold text-primary underline underline-offset-4" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
                  <p className="pt-1 text-xs">Respon awal umumnya dalam 1x24 jam kerja. Jika kebutuhan Anda mendesak, tulis kata "URGENT" di awal pesan WhatsApp.</p>
                </div>
                <div className="mt-5 border-t border-outline-variant/20 pt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">Social</p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {socialLinks.map((item) => (
                      <a
                        key={item.platform}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${item.platform} ${item.handle}`}
                        title={`${item.platform} / ${item.handle}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(29,90,141,0.14)] bg-[#FBF7EE] text-[#1D5A8D] transition-all hover:-translate-y-0.5 hover:border-[rgba(29,90,141,0.28)] hover:text-[#00BCD4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low"
                      >
                        <SocialIcon platform={item.platform} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal y={16} delay={0.06}>
              <form
                onSubmit={(event) => event.preventDefault()}
                className="rounded-[1.8rem] border border-outline-variant/20 bg-surface-container-lowest p-7 shadow-[0_10px_24px_rgba(24,34,45,0.06)]"
              >
                <h2 className="mb-4 font-headline text-3xl text-primary">Brief Form</h2>
                <p className="mb-4 text-sm text-on-surface-variant">
                  Cocok untuk kebutuhan yang sudah lebih jelas. Isi poin inti agar kami bisa menyiapkan rekomendasi scope awal dengan cepat.
                </p>
                <p className="mb-4 text-xs text-on-surface-variant">
                  Jelaskan kebutuhan Anda secara singkat. Contoh: Saya ingin mengintegrasikan sistem stok gudang ke website e-commerce.
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nama"
                    value={briefForm.name}
                    onChange={(event) => setBriefForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={briefForm.email}
                    onChange={(event) => setBriefForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <input
                    type="text"
                    placeholder="Jenis Proyek (Website, System, Automation)"
                    value={briefForm.projectType}
                    onChange={(event) => setBriefForm((prev) => ({ ...prev, projectType: event.target.value }))}
                    className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <textarea
                    placeholder="Jelaskan kebutuhan Anda secara singkat"
                    rows={5}
                    value={briefForm.brief}
                    onChange={(event) => setBriefForm((prev) => ({ ...prev, brief: event.target.value }))}
                    className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <a
                  href={briefWhatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold !text-white visited:!text-white hover:!text-white transition hover:opacity-90"
                >
                  Kirim Brief via WhatsApp
                </a>
                <a href={buildMailto("Project Brief NechCode")} className="mt-4 block text-sm font-bold text-primary underline underline-offset-4">
                  Kirim Brief via Email
                </a>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
```

- [ ] **Step 3: Verify the diff**

Confirm the only changes are:
- Removed `import { Instagram, Linkedin } from "lucide-react"` (no longer needed)
- Added `import { SocialIcon } from "@/components/shared/social-icon"`
- Added `import { layoutContainer } from "@/config/layout"`
- Removed the local `getSocialIcon()` function entirely
- Line 81 `className="mx-auto w-full..."` → `className={layoutContainer}`
- Line 95 `className="mx-auto grid w-full max-w-[1360px] ..."` → `className={\`${layoutContainer} grid grid-cols-1 gap-6 md:grid-cols-2\`}`
- Line 130 `{getSocialIcon(item.platform)}` → `<SocialIcon platform={item.platform} />`

- [ ] **Step 4: Commit**

```bash
git add src/components/pages/contact-page.tsx
git commit -m "refactor: use shared SocialIcon and layoutContainer in contact-page"
```

---

## Task 2: Write architecture documentation

**Files:**
- Create: `docs/architecture.md`

- [ ] **Step 1: Create docs/architecture.md**

Write the following content to `docs/architecture.md`:

```markdown
# NechCode Web — Architecture

## Project Overview

NechCode Web is a Next.js 15 App Router application serving as the marketing and admin site for NechCode. It includes:
- Public-facing pages (Home, About, Services, Portfolio, Contact, Campaign)
- A client-side admin panel for managing portfolio items, FAQs, and campaigns
- Firebase Firestore as the database, with Firebase Auth for admin access

---

## Directory Structure

```
src/
├── app/                   # Next.js App Router pages and API routes
│   ├── admin/             # Admin panel pages (client-side only)
│   ├── api/               # REST API route handlers (portfolio, faq, campaign)
│   ├── campaign/[slug]/   # Dynamic campaign pages
│   └── *.tsx              # Public pages (home, about, services, portfolio, contact)
│
├── components/
│   ├── admin/             # Admin UI components (managers for portfolio/faq/campaign)
│   ├── campaign/          # Campaign-specific UI (badge, countdown, CTA, etc.)
│   ├── pages/             # Full-page layout components (one per route)
│   ├── sections/home/     # Modular page sections (hero, footer, navbar, etc.)
│   ├── shared/            # Reusable primitives used across pages
│   └── ui/                # Base UI components (button, card, badge, accordion)
│
├── config/
│   ├── fonts.ts           # Font variable exports for the root layout
│   ├── layout.ts          # Shared layout constants (layoutContainer CSS class)
│   ├── motion.ts          # Framer Motion animation presets
│   └── site.ts            # Global site config: name, URL, socials, WhatsApp number
│
├── content/
│   ├── home.ts            # All copy for the home page and shared sections
│   └── services.ts        # Services pillar content and mega-menu data
│
├── lib/
│   ├── campaign/          # Campaign business logic: repository, urgency, defaults
│   ├── faq/               # FAQ business logic: repository, defaults
│   ├── firebase/          # Firebase client + admin SDK setup
│   │   ├── admin.ts       # Firebase Admin SDK initialisation
│   │   ├── admin-auth.ts  # Shared admin auth functions (verifyToken, getActor)
│   │   └── client.ts      # Firebase client SDK (used in admin panel)
│   ├── portfolio/         # Portfolio business logic: repository, defaults
│   ├── utils.ts           # General utilities (cn, withoutUndefined)
│   └── whatsapp.ts        # WhatsApp inquiry URL builder
│
├── styles/
│   └── theme.css          # CSS custom properties for the design token system
│
└── types/
    ├── campaign.ts        # Campaign types and payload interfaces
    ├── faq.ts             # FAQ types and payload interfaces
    └── portfolio.ts       # Portfolio types and payload interfaces
```

---

## Admin Authentication

**File:** `src/lib/firebase/admin-auth.ts`

All admin-gated API routes require a Firebase ID token passed as a Bearer token in the `Authorization` header. Two shared functions handle this:

- **`verifyAdminBearerToken(authHeader)`** — returns `true` if the token is valid and the caller is an authorised admin. Used in GET routes to gate admin-mode reads.
- **`getVerifiedAdminActor(authHeader)`** — returns an `AdminActor` (`{ uid, email }`) if authorised, or `null`. Used in mutation routes (POST, PATCH, DELETE) to identify who made the change.

Authorisation logic:
1. Token is verified using Firebase Admin SDK
2. If `ADMIN_REQUIRE_CUSTOM_CLAIM=true`, the token must have `admin: true` claim
3. Otherwise, the decoded email must match the `ADMIN_EMAIL` env variable, OR the token must have `admin: true` claim

All three repositories (`portfolio`, `faq`, `campaign`) import these functions from `admin-auth.ts` and re-export them so API route files don't need to know the internal source.

---

## Repository Pattern

Each data domain (portfolio, faq, campaign) has a repository file under `src/lib/<domain>/repository.ts` that:
- Exports public CRUD functions consumed by API routes
- Falls back to static default data when Firebase is not configured (useful for local dev without `.env`)
- Auto-seeds Firestore on first access if the collection is empty

**Shared utilities used by repositories:**
- `withoutUndefined(data)` from `src/lib/utils.ts` — strips `undefined` values before writing to Firestore
- `isFirebaseAdminEnabled()` from `src/lib/firebase/admin.ts` — guards all Firestore access

---

## Frontend Shared Utilities

### `src/config/layout.ts`
Exports `layoutContainer` — the Tailwind class string for the standard full-width content container used across all page sections. Centralised here so responsive padding is consistent and changes in one place.

### `src/components/shared/social-icon.tsx`
`SocialIcon` component — accepts a `platform` string and returns the correct icon (LinkedIn, Instagram, TikTok, X/Twitter) from Lucide or inline SVG. Used in `site-footer.tsx`, `final-cta-section.tsx`, and `contact-page.tsx`.

### `src/components/shared/reveal.tsx`
Scroll-triggered reveal animation wrapper using Framer Motion. Used extensively across all page sections.

### `src/lib/whatsapp.ts`
`buildWhatsAppInquiryUrl(context)` — builds a pre-filled WhatsApp deep-link from structured context (page source, service interest, campaign info, etc.).

---

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `FIREBASE_PROJECT_ID` | Yes (for Firebase) | Firebase project identifier |
| `FIREBASE_CLIENT_EMAIL` | Yes (for Firebase) | Service account email |
| `FIREBASE_PRIVATE_KEY` | Yes (for Firebase) | Service account private key (`\n` escaped) |
| `FIREBASE_API_KEY` | Yes (for admin panel) | Client-side Firebase config |
| `FIREBASE_AUTH_DOMAIN` | Yes (for admin panel) | Client-side Firebase config |
| `ADMIN_EMAIL` | Yes (for auth) | Email address allowed to access admin panel |
| `ADMIN_REQUIRE_CUSTOM_CLAIM` | No | If `"true"`, requires `admin: true` Firebase custom claim |

Without Firebase env vars, the app runs in fallback mode: all public pages show static default content, and the admin panel shows a "write disabled" state.

---

## Campaign System

Campaigns are time-bounded promotional items with multiple placement slots:

| Placement | Where it shows |
|---|---|
| `topBar` | Announcement bar above the navbar |
| `homepageInline` | Inline slot on the home page |
| `stickyFinalHours` | Sticky urgency bar (shows only in final hours) |
| `dedicatedPage` | Own page at `/campaign/[slug]` |

The navbar fetches active campaign placements from `/api/campaign/active` on mount and polls every 60 seconds. Urgency state (`active`, `finalHours`, `expiringSoon`, `expired`, `scheduled`, `inactive`) is computed client-side by `src/lib/campaign/urgency.ts`.
```

- [ ] **Step 2: Commit**

```bash
git add docs/architecture.md
git commit -m "docs: add architecture documentation"
```

---

## Final Verification

- [ ] Run `npm run build` and confirm zero type errors and zero build errors
- [ ] Spot-check the contact page in browser — social icons render correctly
- [ ] Confirm no `getSocialIcon` local function remains anywhere: `grep -r "function getSocialIcon" src/`
- [ ] Confirm no inline `layoutContainer` string remains: `grep -r "max-w-\[1360px\]" src/` (should only appear in `config/layout.ts`)
