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
