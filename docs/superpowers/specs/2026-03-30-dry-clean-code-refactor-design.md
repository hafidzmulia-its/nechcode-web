# DRY + Clean Code Refactor Design
**Date:** 2026-03-30
**Scope:** Full frontend + backend pass (Option B)
**Constraint:** Zero functionality changes — only moving/deduplicating identical code

---

## Problem Summary

The codebase has several concrete DRY violations where identical or near-identical code is copy-pasted across multiple files:

| Violation | Files Affected | Lines Duplicated |
|---|---|---|
| `verifyAdminBearerToken` + `getVerifiedAdminActor` | 3 repo files | ~65 lines × 3 |
| `AdminActor` type | 3 repo files | 4 lines × 3 |
| `withoutUndefined<T>` utility | portfolio + campaign repos | 5 lines × 2 |
| `getSocialIcon()` function | footer + final-cta | ~35 lines × 2 |
| `layoutContainer` CSS string | hero + navbar (inline in 3 more) | 1 line × 5 |
| `isActive` nav check | top-navbar (desktop + mobile) | 3 lines × 2 |
| Pointless `isXWriteEnabled()` wrappers | 3 repo files | 3 files |

---

## Architecture

### Backend Layer

#### `src/lib/firebase/admin-auth.ts` (NEW)
Single source of truth for all admin authentication logic.

Exports:
- `AdminActor` — the shared type `{ uid: string; email?: string }`
- `verifyAdminBearerToken(authHeader: string | null): Promise<boolean>` — verifies a Bearer token, checks `ADMIN_EMAIL` and `admin` custom claim
- `getVerifiedAdminActor(authHeader: string | null): Promise<AdminActor | null>` — same logic but returns the decoded actor or null

**Consumers:** All three repositories import from here. Their local copies are deleted.

#### `src/lib/utils.ts` (MODIFIED)
Add `withoutUndefined<T extends Record<string, unknown>>(data: T): Partial<T>` — currently duplicated in `lib/portfolio/repository.ts` and `lib/campaign/repository.ts`. Both delete their local copy.

#### Remove pointless write-enabled wrappers
`isPortfolioWriteEnabled()`, `isFaqWriteEnabled()`, `isCampaignWriteEnabled()` each just call `isFirebaseAdminEnabled()`.
- Delete the three wrapper functions from the repositories
- Update callers (API route handlers) to import and call `isFirebaseAdminEnabled()` directly from `lib/firebase/admin`

---

### Frontend Layer

#### `src/components/shared/social-icon.tsx` (NEW)
A focused component with one job: given a platform name string, return the correct icon element.

```ts
// signature
export function SocialIcon({ platform }: { platform: string }): React.ReactElement | null
```

Handles: `linkedin`, `instagram`, `tiktok`, `twitter` / `x`.
Replaces the local `getSocialIcon()` in both `site-footer.tsx` and `final-cta-section.tsx`.

#### `src/config/layout.ts` (NEW)
Exports a single named constant:
```ts
export const layoutContainer = "mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12";
```
Used in: `hero-section.tsx`, `top-navbar.tsx`, `site-footer.tsx`, `services-section.tsx`, `final-cta-section.tsx`.

#### `top-navbar.tsx` — extract `isNavItemActive` (LOCAL helper)
The `isActive` check is copy-pasted for both desktop and mobile nav loops. Extracted to a module-level function:
```ts
function isNavItemActive(href: string, pathname: string | null): boolean
```
Both loops call this function instead of repeating the ternary.

---

## What Does NOT Change

- All exported function signatures from the three repositories remain identical
- All API route handlers remain functionally identical
- All rendered UI output is bit-for-bit identical
- No component props change
- No test files are affected (there are none)
- No content or config data changes

---

## File Change Summary

| File | Action |
|---|---|
| `src/lib/firebase/admin-auth.ts` | CREATE — shared auth functions + AdminActor type |
| `src/lib/utils.ts` | MODIFY — add `withoutUndefined` |
| `src/config/layout.ts` | CREATE — shared `layoutContainer` constant |
| `src/components/shared/social-icon.tsx` | CREATE — shared `SocialIcon` component |
| `src/lib/portfolio/repository.ts` | MODIFY — remove duplicated auth, withoutUndefined, isWriteEnabled |
| `src/lib/faq/repository.ts` | MODIFY — remove duplicated auth, isWriteEnabled |
| `src/lib/campaign/repository.ts` | MODIFY — remove duplicated auth, withoutUndefined, isWriteEnabled |
| `src/app/api/portfolio/route.ts` | MODIFY — use `isFirebaseAdminEnabled` directly |
| `src/app/api/faq/route.ts` | MODIFY — use `isFirebaseAdminEnabled` directly |
| `src/app/api/campaign/route.ts` | MODIFY — use `isFirebaseAdminEnabled` directly |
| `src/components/sections/home/site-footer.tsx` | MODIFY — use `SocialIcon`, use `layoutContainer` |
| `src/components/sections/home/final-cta-section.tsx` | MODIFY — use `SocialIcon` |
| `src/components/sections/home/hero-section.tsx` | MODIFY — use `layoutContainer` |
| `src/components/sections/home/services-section.tsx` | MODIFY — use `layoutContainer` |
| `src/components/sections/home/top-navbar.tsx` | MODIFY — use `layoutContainer`, extract `isNavItemActive` |

---

## Documentation

After all refactoring is complete, a `docs/architecture.md` file will be written covering:
- Project structure overview
- How the admin auth layer works
- Repository pattern explanation
- Frontend shared utilities and components
- Config files and their purpose
