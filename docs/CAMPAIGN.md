# NechCode Campaign System Brief

## Tujuan
Sistem ini dibuat untuk campaign musiman yang time-sensitive, conversion-focused, dan tetap premium-clean (bukan gaya promo murahan).

Campaign bisa dipakai ulang untuk:
- Wisuda / academic season
- Promo UMKM
- Bayar Seikhlasnya
- Seasonal service promotion
- Launch campaign

## Layer Publik yang Sudah Aktif
1. Sitewide Announcement Bar
2. Homepage Inline Campaign Strip (di bawah hero)
3. Dedicated Campaign Page (`/campaign/[slug]`)
4. Sticky Urgency Bar

## Lokasi Kode Utama
- Types: `src/types/campaign.ts`
- Urgency logic: `src/lib/campaign/urgency.ts`
- Repository/data source: `src/lib/campaign/repository.ts`
- Defaults seed: `src/lib/campaign/defaults.ts`
- API list/create: `src/app/api/campaign/route.ts`
- API update/delete: `src/app/api/campaign/[id]/route.ts`
- API active placements: `src/app/api/campaign/active/route.ts`
- API seeder: `src/app/api/campaign/seed-defaults/route.ts`
- Admin manager: `src/components/admin/campaign-manager.tsx`
- Admin route: `src/app/admin/campaigns/page.tsx`
- Campaign page route: `src/app/campaign/[slug]/page.tsx`

## Cara Trigger Sticky Urgency Bar

### Opsi 1 (Mode Normal Production)
Pakai urgency real-time:
- Set `placements.stickyFinalHours = true`
- Set `urgencyMode = automatic`
- Sticky muncul otomatis saat <= 24 jam terakhir

### Opsi 2 (Paksa Final-Hours)
Untuk test cepat tanpa ubah tanggal:
- Set `urgencyMode = force-final-hours`
- Sticky akan tampil selama campaign aktif (di dalam startAt-endAt)

### Opsi 3 (Selalu Tampil Tiap Buka Route)
Mode baru yang kamu minta:
- Set `placementSettings.stickyAlwaysOnRouteOpen = true`
- Sticky bar akan selalu tampil di atas saat route dibuka, selama campaign aktif dan placement sticky aktif
- Posisi sticky sekarang di bagian top (desktop + mobile)

## Catatan Dismiss Behavior
- Jika `stickyAlwaysOnRouteOpen = true`, dismiss tidak dipersist per route: saat pindah route, sticky akan muncul lagi.
- Jika mode ini `false`, dismiss memakai `sessionStorage` per slug campaign.

## Seeder Behavior
- Tombol seeder ada di Admin Campaign Manager: `Seed Defaults`
- Endpoint seeder memerlukan auth admin token
- Seeder hanya membuat data default jika koleksi campaign masih kosong

## Dummy Campaign Saat Ini
Slug default: `wisuda-april`
- Campaign type: `academic`
- Top bar: aktif
- Homepage inline: aktif
- Sticky final hours: aktif
- Dedicated page: aktif
- Countdown: aktif

## CTA & WhatsApp Context
CTA campaign sudah mengirim context ke WhatsApp helper:
- campaign title
- campaign slug
- urgency state
- cta origin

Tujuannya agar lead dari campaign lebih mudah di-track dan dipahami saat masuk ke WhatsApp.

## Hal Penting yang Perlu Tim Tahu
1. Expired campaign tidak akan dirender di layer publik.
2. Overlap placement aktif dicegah secara default (kecuali `allowOverlap = true`).
3. Date range invalid (start >= end) ditolak di admin submit/API.
4. Sticky visibility bisa berbeda tergantung urgency mode + placement + active window.
5. API `/api/campaign/active` adalah sumber utama untuk top bar, inline strip, sticky bar.

## Quick QA Checklist
- Buka `/admin/campaigns`
- Pastikan campaign status = `active`
- Cek placement aktif sesuai kebutuhan
- Cek `urgencyMode`
- Cek `placementSettings.stickyAlwaysOnRouteOpen` jika ingin sticky selalu tampil
- Buka homepage dan route lain untuk verifikasi top bar + sticky
- Buka `/campaign/<slug>` untuk dedicated campaign view

## Catatan Visual
Inspirasi komponen diadaptasi dari pola 21st.dev (announcement/banner/countdown/waitlist-like composition), tetapi tetap diselaraskan dengan tone NechCode:
- premium-clean
- warm-tech
- editorial
- credible
- non-gimmicky
