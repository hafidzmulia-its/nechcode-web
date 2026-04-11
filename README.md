# NechCode Web

Marketing website dan admin panel untuk **NechCode** — partner teknologi founder-led yang fokus pada pengembangan website, sistem internal, dan AI workflow untuk bisnis, UMKM, organisasi, dan institusi.

> "Innovate Locally, Deliver Globally."

Situs ini mencakup halaman publik (home, services, portfolio, about, contact, campaign) serta admin panel client-side untuk mengelola portfolio, FAQ, dan campaign yang disimpan di Firebase Firestore.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **UI:** React 19 + Tailwind CSS v4 + custom design tokens di `src/styles/theme.css`
- **Animation:** Framer Motion
- **Database/Auth:** Firebase Firestore + Firebase Auth (admin panel)
- **Icons:** Lucide React + Material Symbols Outlined + icon 3D custom di `public/img/`
- **Linting:** ESLint (config Next.js)

---

## Prerequisites

- Node.js 20+
- npm (atau pnpm/yarn/bun — scripts menggunakan npm)
- Firebase project dengan Firestore dan Authentication aktif (untuk admin panel & API routes)

---

## todolist

- [x] perbaiki desain About
- [x] perbaiki desain Setiap Layanan (web,apps,ai automation)
- [ ] kurangi kode, kemudian gunakan DRY dan clean code (terasa berat disaat running first time)
- [x] Tambahkan portofolio

---

### 1. Install dependencies

```bash
npm install
```

### 2. Konfigurasi environment variables

Buat file `.env.local` di root project dengan variabel Firebase berikut (ambil dari Firebase Console → Project Settings):

```bash
# Firebase client (public)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Firebase Admin SDK (server-only, jangan commit)
FIREBASE_ADMIN_PROJECT_ID=...
FIREBASE_ADMIN_CLIENT_EMAIL=...
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 3. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### 4. Build untuk production

```bash
npm run build
npm start
```

### 5. Lint

```bash
npm run lint
```

---

## Project Structure

```
src/
├── app/                 # Next.js App Router — routes, layouts, API handlers
│   ├── admin/           # Admin panel (client-side only)
│   ├── api/             # REST endpoints: portfolio, faq, campaign
│   ├── campaign/[slug]/ # Dynamic campaign pages
│   └── (public routes)  # home, about, services, portfolio, contact
│
├── components/
│   ├── admin/           # Manager UI untuk portfolio/faq/campaign
│   ├── campaign/        # Campaign-specific components (badge, countdown, CTA)
│   ├── pages/           # Full page layout components
│   ├── sections/        # Modular sections (home, services)
│   ├── shared/          # Reusable primitives (Reveal, SocialIcon, dll)
│   └── ui/              # Base UI primitives
│
├── config/              # Site config, fonts, layout constants
├── content/             # Copy/content terpusat (home.ts, services.ts, about.ts)
├── lib/                 # Business logic (firebase, campaign, faq, portfolio, whatsapp)
├── styles/theme.css     # Design tokens (Material Design + brand accent palette)
└── types/               # Shared TypeScript types
```

Detail lengkap: lihat [`docs/architecture.md`](./docs/architecture.md).

---

## Design System

Warm-Tech Studio — precise + warm, editorial, founder-led personality. Detail token dan rules ada di [`DESIGN.md`](./DESIGN.md).

**Brand palette** (via Tailwind class, terdefinisi di `src/styles/theme.css`):

| Token | Hex | Penggunaan |
|---|---|---|
| `bg-brand-deep` | `#16425b` | Hero/section dark background |
| `bg-brand-accent` | `#e37434` | CTA orange utama |
| `bg-brand-accent-soft` | `#d97d55` | CTA secondary / highlight |
| `bg-brand-cream` | `#efe4cc` | Container cream |
| `bg-brand-cream-soft` | `#fbf7ee` | Nested card cream |
| `bg-surface` | `#f5eedc` | Base cream background |

Plus Material Design tokens: `primary`, `secondary`, `tertiary`, `surface-*`, dan variantnya.

---

## Content Management

Copy website di-manage di file TypeScript (bukan CMS) untuk kesederhanaan dan type safety:

- **`src/content/home.ts`** — seluruh copy home page + shared sections (navbar, footer)
- **`src/content/services.ts`** — pillars services, mega menu, pricing
- **`src/content/about.ts`** — visi, misi, capabilities, principles

Dynamic content (portfolio, FAQ, campaign) di-manage via admin panel di `/admin`.

---

## Admin Panel

Admin panel di `/admin` untuk mengelola:
- **Portfolio** — proyek yang tampil di halaman Portfolio
- **FAQ** — pertanyaan yang tampil di FAQ section
- **Campaign** — campaign aktif (announcement bar, sticky urgency, campaign page)

Akses dilindungi Firebase Auth. Lihat [`CAMPAIGN.md`](./CAMPAIGN.md) untuk detail campaign system.

---

## Documentation

Dokumentasi terstruktur di root project:

- [`docs/architecture.md`](./docs/architecture.md) — arsitektur lengkap, data flow, API contracts
- [`BRIEF.md`](./BRIEF.md) — product brief, positioning, target user
- [`DESIGN.md`](./DESIGN.md) — design system, typography, component specs
- [`CAMPAIGN.md`](./CAMPAIGN.md) — spesifikasi campaign system (countdown, urgency, CTA)
- [`CLAUDE.md`](./CLAUDE.md) — instruksi untuk Claude Code assistant
- [`AGENTS.md`](./AGENTS.md) — catatan untuk AI agent yang bekerja di repo ini

---

## Deployment

Deploy yang direkomendasikan: **Vercel** (native support untuk Next.js). Pastikan semua env variables di-set di Vercel project settings sebelum deploy.

```bash
# Build check lokal sebelum deploy
npm run build
```

---

## License

Private repository — © NechCode. Berbasis di Surabaya, Indonesia.
