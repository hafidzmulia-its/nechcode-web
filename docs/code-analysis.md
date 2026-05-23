# Analisis Kode — NechCode Web

> Dokumen ini berisi analisis lengkap struktur kode, pola arsitektur, dan konvensi yang digunakan pada project NechCode Web.
>
> Terakhir diperbarui: 20 Mei 2026

---

## 1. Ringkasan Project

**NechCode Web** adalah marketing website + admin panel untuk NechCode — partner teknologi founder-led yang fokus pada pengembangan website, sistem internal, dan AI workflow.

Situs mencakup:
- **Halaman publik:** Home, Services (hub + 4 detail), Portfolio, About, Contact
- **Admin panel:** CMS client-side untuk mengelola Portfolio, FAQ, dan Campaign (WIP)
- **API routes:** REST endpoints untuk CRUD data dinamis (Portfolio, FAQ)
- **SEO:** Sitemap, robots.txt, JSON-LD, OpenGraph, Twitter Cards

---

## 2. Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| UI | React 19 + Tailwind CSS v4 |
| Animation | CSS transitions + IntersectionObserver (custom `Reveal` component) |
| Database | Firebase Firestore |
| Auth | Firebase Authentication |
| Image Upload | Cloudinary (unsigned upload + client-side compression) |
| Icons | Lucide React + Material Symbols Outlined + icon 3D custom |
| Fonts | Poppins (body), Coolvetica (headline), Manrope (alternatif) |
| Linting | ESLint (config Next.js) |
| Deployment | Vercel |

---

## 3. Struktur Folder

```
src/
├── app/                 # Next.js App Router — routes, layouts, API handlers
│   ├── admin/           # Admin panel (client-side only)
│   ├── api/             # REST endpoints: portfolio, faq, campaign (WIP)
│   ├── campaign/[slug]/ # Dynamic campaign pages (WIP)
│   ├── services/        # Hub + detail per layanan
│   └── (public routes)  # home, about, portfolio, contact
│
├── components/
│   ├── admin/           # Manager UI (portfolio, faq)
│   ├── campaign/        # Campaign components (placeholder)
│   ├── pages/           # Full page layout components
│   ├── sections/        # Modular sections (home, services)
│   ├── shared/          # Reusable primitives (Reveal, SocialIcon, SectionHeading)
│   └── ui/              # Base UI primitives (Accordion, ContainerScrollAnimation)
│
├── config/              # Site config, fonts, layout constants
├── content/             # Copy/content terpusat (home, services, about, service-pages)
├── lib/                 # Business logic (firebase, portfolio, faq, whatsapp, utils)
├── styles/theme.css     # Design tokens (Material Design 3 + brand palette)
└── types/               # Shared TypeScript types (faq, portfolio)
```

---

## 4. App Router (Routes, Layouts, Pages, API)

### 4.1 Root Layout & Global Files

| File | Fungsi |
|------|--------|
| `layout.tsx` | Root layout — metadata template, font variables, Material Symbols CDN, design token classes |
| `globals.css` | CSS reset, keyframe animations, utility classes, `prefers-reduced-motion` |
| `sitemap.ts` | Generate sitemap.xml dinamis (5 URL statis) |
| `robots.txt` | Allow semua kecuali `/admin` dan `/api` |

### 4.2 Halaman Publik

| Route | File | Rendering | Catatan |
|-------|------|-----------|---------|
| `/` | `page.tsx` | Server, async, `force-dynamic` | JSON-LD structured data, delegasi ke `HomePage` |
| `/about` | `about/page.tsx` | Server | Delegasi ke `AboutPage` |
| `/contact` | `contact/page.tsx` | Server | Delegasi ke `ContactPage` |
| `/portfolio` | `portfolio/page.tsx` | Server, async, `force-dynamic` | Fetch Firestore via repository |
| `/services` | `services/page.tsx` | Server, async | Menerima `searchParams` (pillar) |
| `/services/web` | `services/web/page.tsx` | Server | Detail layanan Website |
| `/services/ai` | `services/ai/page.tsx` | Server | Detail layanan AI |
| `/services/mobile` | `services/mobile/page.tsx` | Server | Detail layanan Mobile |
| `/services/predictive-data` | `services/predictive-data/page.tsx` | Server | Detail layanan Predictive Data |
| `/campaign/[slug]` | `campaign/[slug]/` | — | **Belum diimplementasi** |

### 4.3 Admin Panel

| Route | File | Rendering | Catatan |
|-------|------|-----------|---------|
| `/admin` | `admin/page.tsx` | Server → Client | Thin wrapper ke `AdminHome` |
| `/admin/login` | `admin/login/page.tsx` | Client | Firebase Auth login + reset password |
| `/admin/portfolio` | `admin/portfolio/page.tsx` | Server → Client | Thin wrapper ke `PortfolioManager` |
| `/admin/faq` | `admin/faq/page.tsx` | Server → Client | Thin wrapper ke `FaqManager` |
| `/admin/campaigns` | `admin/campaigns/` | — | **Belum diimplementasi** |

### 4.4 API Routes

| Endpoint | Methods | Auth | Fungsi |
|----------|---------|------|--------|
| `/api/portfolio` | GET, POST | GET dual-mode, POST auth | List & create portfolio |
| `/api/portfolio/[id]` | PATCH, DELETE | Auth required | Update & delete by ID |
| `/api/portfolio/seed-defaults` | POST | Auth required | Seed data default |
| `/api/portfolio/reorder` | POST | Auth required | Reorder batch |
| `/api/faq` | GET, POST | GET dual-mode, POST auth | List & create FAQ |
| `/api/faq/[id]` | PATCH, DELETE | Auth required | Update & delete by ID |
| `/api/faq/seed-defaults` | POST | Auth required | Seed data default |
| `/api/faq/reorder` | POST | Auth required | Reorder batch |
| `/api/campaign/*` | — | — | **Belum diimplementasi** |

**Pola API:**
- Dual-mode GET: `?mode=admin` (auth, semua items) vs public (published only)
- Auth via Bearer token → `getVerifiedAdminActor()` / `verifyAdminBearerToken()`
- Async params pattern (Next.js 15+): `params: Promise<{ id: string }>`
- Repository pattern — API routes tidak akses Firestore langsung

---

## 5. Components

### 5.1 `components/admin/`

| File | Fungsi | Pola Utama |
|------|--------|------------|
| `admin-home.tsx` | Dashboard admin — link ke modul, info user | `onAuthStateChanged` auth guard, role check |
| `faq-manager.tsx` | CRUD FAQ — tambah, edit, hapus, reorder, seed | Optimistic UI, debounced auto-save (650ms), HTML5 DnD |
| `portfolio-manager.tsx` | CRUD Portfolio — tambah, edit, hapus, reorder, upload gambar | Client-side image compression, Cloudinary upload, live preview |

### 5.2 `components/pages/`

| File | Props | Pola |
|------|-------|------|
| `home-page.tsx` | `{ content: HomeContent }` | Server component, composition pattern |
| `services-page.tsx` | `{ content, initialPillar? }` | Client, URL-driven state, sticky nav |
| `about-page.tsx` | `{ content }` | Server, content-driven |
| `portfolio-page.tsx` | `{ content, items }` | Client, filtering, featured item |
| `contact-page.tsx` | `{ content }` | Client, form → dynamic WA/mailto links |
| `web-service-page.tsx` | `{ content }` | Client, composition (Hero, Portfolio, Pricing) |
| `mobile-service-page.tsx` | `{ content }` | Client, sama dengan web + `ctaSubnote` |
| `ai-service-page.tsx` | `{ content }` | Client, sama + `showOptionLabel` |
| `predictive-data-service-page.tsx` | `{ content }` | Client, tanpa section portfolio |

### 5.3 `components/sections/home/`

| File | Fungsi | Rendering |
|------|--------|-----------|
| `hero-section.tsx` | Hero homepage — intro animation, dropdown services | Client |
| `about-section.tsx` | Section about + statistik | Server |
| `services-section.tsx` | Daftar layanan numbered | Server |
| `principle-section.tsx` | 4 card prinsip kerja | Server |
| `consult-section.tsx` | Form konsultasi (WA/email) | Client |
| `top-navbar.tsx` | Navbar sticky (non-homepage) | Client |
| `site-footer.tsx` | Footer global | Server |

### 5.4 `components/sections/services/`

| File | Props | Fungsi |
|------|-------|--------|
| `index.ts` | — | Barrel export |
| `service-hero.tsx` | `{ hero, ctaHref?, ctaLabel? }` | Hero section layanan individual |
| `service-pricing.tsx` | `{ title, pillar, showOptionLabel?, ctaSubnote? }` | Pricing 3 paket + add-ons |
| `service-special-program.tsx` | — | Program khusus/promo |
| `service-portfolio.tsx` | `{ eyebrow, title, body, items, maxColumns? }` | Showcase portfolio per layanan |

### 5.5 `components/shared/`

| File | Props | Fungsi |
|------|-------|--------|
| `reveal.tsx` | `{ children, delay?, duration?, y?, x?, amount?, once? }` | Scroll-reveal animation (IntersectionObserver) |
| `social-icon.tsx` | `{ platform }` | Icon sosial media (Lucide + inline SVG) |
| `section-heading.tsx` | `{ eyebrow, title, description, className? }` | Heading section reusable |

### 5.6 `components/ui/`

| File | Exports | Fungsi |
|------|---------|--------|
| `accordion.tsx` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | Radix UI accordion wrapper |
| `container-scroll-animation.tsx` | `ContainerScrollAnimation` | Parallax/3D scroll effect |

---

## 6. Library & Utilities

### 6.1 `lib/utils.ts`

| Function | Kegunaan |
|----------|----------|
| `cn(...inputs)` | Merge Tailwind classes (`clsx` + `twMerge`) |
| `withoutUndefined<T>(data)` | Strip undefined keys untuk Firestore writes |

### 6.2 `lib/whatsapp.ts`

| Function | Kegunaan |
|----------|----------|
| `buildWhatsAppInquiryUrl(context?)` | Bangun URL `wa.me` dengan pesan terstruktur |

### 6.3 `lib/firebase/`

| File | Exports | Sisi |
|------|---------|------|
| `client.ts` | `getFirebaseClientApp()`, `getFirebaseClientAuth()` | Client (browser) |
| `admin.ts` | `getFirebaseAdminApp()`, `getFirebaseAdminAuth()`, `getFirebaseAdminDb()`, `isFirebaseAdminEnabled()` | Server only |
| `admin-auth.ts` | `AdminActor`, `verifyAdminBearerToken()`, `getVerifiedAdminActor()` | Server only |

### 6.4 `lib/portfolio/`

| File | Exports | Kegunaan |
|------|---------|----------|
| `defaults.ts` | `defaultPortfolioItems` | Seed data (3 item default) |
| `repository.ts` | `seedDefaultPortfolioItems`, `listPublicPortfolioItems`, `listAdminPortfolioItems`, `createPortfolioItem`, `updatePortfolioItem`, `deletePortfolioItem`, `reorderPortfolioItems` | CRUD Firestore + fallback |

### 6.5 `lib/faq/`

| File | Exports | Kegunaan |
|------|---------|----------|
| `repository.ts` | `listPublicFaqItems`, `listAdminFaqItems`, `createFaqItem`, `updateFaqItem`, `deleteFaqItem`, `reorderFaqItems`, `seedDefaultFaqItems` | CRUD Firestore + fallback ke content home |

### 6.6 `lib/campaign/` — Placeholder (kosong)

---

## 7. Config & Constants

| File | Exports | Kegunaan |
|------|---------|----------|
| `config/site.ts` | `siteConfig`, `buildMailto()`, `buildGmailComposeUrl()`, `getSocialLinks()` | Identitas situs, kontak, sosial media |
| `config/fonts.ts` | `poppins`, `coolvetica`, `manrope`, `appFontVariables` | Konfigurasi font Next.js |
| `config/layout.ts` | `layoutContainer`, `layoutContainerCompact`, `layoutContainerBleed` | Konstanta Tailwind class untuk container |

---

## 8. Content Management

Konten website dikelola dalam file TypeScript (bukan CMS) untuk type safety dan kesederhanaan.

| File | Scope | Export Utama |
|------|-------|--------------|
| `content/home.ts` | Seluruh copy Home + shared (navbar, footer) | `HomeContent` type, `getHomeContent(locale?)` |
| `content/about.ts` | Visi, misi, capabilities, principles | `aboutContent` object |
| `content/services.ts` | Pricing pillars, mega menu, FAQ layanan, program khusus | `servicesContent`, `getServicePillarById()`, `isValidPillarId()` |
| `content/service-pages.ts` | Copy per halaman layanan individual | `servicePageCopy: Record<ServicePillarId, ServicePageCopy>` |

**Dynamic content** (Portfolio, FAQ, Campaign) dikelola via admin panel → Firestore → API routes.

**Fallback strategy:** Jika Firestore tidak tersedia atau collection kosong, repository mengembalikan data default dari file TypeScript.

---

## 9. Styles & Design Tokens

### `src/styles/theme.css`

**Sistem warna:** Material Design 3 + brand palette custom.

| Token | Hex | Penggunaan |
|-------|-----|------------|
| `--color-brand-deep` | `#16425b` | Hero/section dark background |
| `--color-brand-accent` | `#e37434` | CTA orange utama |
| `--color-brand-accent-soft` | `#d97d55` | CTA secondary |
| `--color-brand-cream` | `#efe4cc` | Container cream |
| `--color-brand-cream-soft` | `#fbf7ee` | Nested card cream |
| `--color-surface` | `#f5eedc` | Base cream background |

**Tailwind v4 integration:**
- `@theme` directive untuk extend breakpoints, colors, fonts, shadows, radius
- Custom breakpoint `desktop` (1280px)
- Font families: `sans`/`body` → Poppins, `headline`/`display` → Coolvetica

**Animasi:**
- `@keyframes float` — floating effect
- `@keyframes orbit-slow` — orbit rotation
- Utility classes: `.animate-float-slow`, `.animate-orbit-slow`, `.text-balance`

### `src/app/globals.css`

- CSS reset minimal
- Keyframe animations: `bg-drop`, `navbar-in`, `blur-left-in`, `blur-right-in`, `hero-copy-in`
- `prefers-reduced-motion` media query
- `scroll-margin-top` untuk offset navbar pada section anchors

---

## 10. Types

| File | Types | Kegunaan |
|------|-------|----------|
| `types/faq.ts` | `FaqItem`, `FaqPayload` | Struktur data FAQ (id, question, answer, order, published, audit fields) |
| `types/portfolio.ts` | `PortfolioItem`, `PortfolioPayload` | Struktur data Portfolio (id, title, categories[], types[], description, imageUrl, order, published, audit fields) |

**Pola:** `Payload` type = subset tanpa `id` dan metadata audit (untuk create/update operations).

---

## 11. Pola & Konvensi yang Digunakan

### Arsitektur

| Pola | Deskripsi |
|------|-----------|
| **Thin page wrappers** | `page.tsx` hanya export metadata + delegasi render ke komponen di `components/pages/` |
| **Server-first rendering** | Semua halaman publik = server components; client hanya jika butuh state/effects |
| **Repository pattern** | API routes → repository functions → Firestore (tidak akses DB langsung) |
| **Centralized content** | Copy/teks dari `src/content/*.ts` — single source of truth, type-safe |
| **Composition pattern** | Page components menyusun section components |
| **Barrel exports** | `sections/services/index.ts` untuk clean imports |

### Data & Auth

| Pola | Deskripsi |
|------|-----------|
| **Dual-mode GET** | Public (published only) vs admin (auth, semua items) via `?mode=admin` |
| **Bearer token auth** | Firebase ID token di header Authorization |
| **Optimistic UI** | Admin managers update UI sebelum server response |
| **Fallback data** | Repository mengembalikan defaults jika Firestore kosong/unavailable |
| **Audit trail** | `createdAt`, `updatedAt`, `updatedByEmail`, `updatedByUid` pada setiap item |

### UI & Styling

| Pola | Deskripsi |
|------|-----------|
| **Tailwind + CSS custom properties** | Material Design tokens via CSS vars, dikonsumsi Tailwind |
| **Custom Reveal** | IntersectionObserver native menggantikan Framer Motion untuk performa |
| **Dynamic link generation** | WhatsApp/mailto links dibangun dari form state via `useMemo` |
| **Layout constants** | Container classes terpusat di `config/layout.ts` |
| **Design token classes** | `bg-brand-deep`, `bg-brand-accent`, dll — konsisten di seluruh app |

### SEO

| Pola | Deskripsi |
|------|-----------|
| **Metadata per page** | Title, description, canonical, openGraph, twitter card |
| **JSON-LD** | Organization + Service schema di homepage |
| **Sitemap dinamis** | `sitemap.ts` dengan priority per route |
| **robots.txt** | Block `/admin` dan `/api` dari crawler |

### Konvensi Kode

| Konvensi | Detail |
|----------|--------|
| File naming | kebab-case untuk semua file |
| Component naming | PascalCase |
| `"use client"` | Eksplisit di baris pertama jika butuh client features |
| Async params | `params: Promise<{}>` untuk dynamic routes (Next.js 15+) |
| `force-dynamic` | Pada halaman dengan data real-time dari Firestore |
| Type exports | Types di `src/types/`, content types co-located di content files |

---

## 12. Catatan & Rekomendasi

### Status Fitur

| Fitur | Status |
|-------|--------|
| Halaman publik (Home, About, Services, Portfolio, Contact) | ✅ Selesai |
| Admin Panel (Portfolio, FAQ) | ✅ Selesai |
| API Routes (Portfolio, FAQ) | ✅ Selesai |
| SEO (sitemap, robots, JSON-LD, OG) | ✅ Selesai |
| Campaign system | ⚠️ Struktur direktori ada, implementasi belum |

### Rekomendasi

1. **DRY & Clean Code** — Sesuai todolist di README, beberapa area bisa di-refactor:
   - Service page components (`web-service-page`, `mobile-service-page`, `ai-service-page`, `predictive-data-service-page`) memiliki pola sangat mirip — bisa digabung jadi satu generic component dengan config per pillar.
   - API route handlers (portfolio & faq) identik strukturnya — bisa di-abstract ke generic CRUD handler factory.

2. **Campaign Implementation** — Direktori sudah disiapkan (`/campaign/[slug]`, `/admin/campaigns`, `/api/campaign/*`, `lib/campaign/`, `components/campaign/`). Tinggal implementasi mengikuti pola yang sudah ada (repository + API + admin manager).

3. **Error Boundaries** — Belum terlihat `error.tsx` atau `not-found.tsx` custom di level route. Disarankan menambahkan untuk UX yang lebih baik.

4. **Loading States** — Belum ada `loading.tsx` di route level. Bisa ditambahkan untuk perceived performance pada halaman `force-dynamic`.

5. **Testing** — Belum terlihat test files. Disarankan menambahkan minimal:
   - Unit test untuk repository functions
   - Integration test untuk API routes
   - Component test untuk admin managers

6. **Image Optimization** — Portfolio menggunakan Cloudinary upload. Pertimbangkan menggunakan Cloudinary transformations URL untuk responsive images daripada client-side compression saja.

7. **Caching Strategy** — Halaman `force-dynamic` tidak di-cache. Untuk portfolio/FAQ yang jarang berubah, pertimbangkan `revalidate` dengan ISR atau on-demand revalidation setelah admin update.

8. **Admin Layout** — Belum ada shared layout (`admin/layout.tsx`) untuk sidebar/navigation konsisten di seluruh admin pages.

---

## Dependency Graph

```
src/types/              → (leaf nodes, no deps)
src/config/site.ts      → (leaf node)
src/config/layout.ts    → (leaf node)
src/config/fonts.ts     → next/font/*
src/styles/theme.css    → CSS vars dari fonts.ts
src/lib/utils.ts        → clsx, tailwind-merge
src/lib/whatsapp.ts     → config/site
src/lib/firebase/client → firebase/app, firebase/auth
src/lib/firebase/admin  → firebase-admin/*
src/lib/firebase/admin-auth → lib/firebase/admin
src/content/home.ts     → config/site, lib/whatsapp
src/content/about.ts    → (no deps)
src/content/services.ts → lib/whatsapp
src/content/service-pages.ts → content/services (type only)
src/lib/portfolio/*     → lib/firebase/*, lib/utils, types/portfolio
src/lib/faq/*           → content/home, lib/firebase/*, types/faq
src/components/shared/* → lib/utils
src/components/ui/*     → @radix-ui/*, lib/utils
src/components/sections/* → components/shared/*, config/*, content/*
src/components/pages/*  → components/sections/*, components/shared/*, content/*
src/components/admin/*  → lib/firebase/client, types/*
src/app/pages           → components/pages/*, content/*, config/*
src/app/api/*           → lib/*/repository, types/*
```
