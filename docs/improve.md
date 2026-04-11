You are a senior product designer, UX strategist, UX writer, and Next.js/shadcn implementation partner.

Revise the existing NechCode website in place.
Do NOT redesign from scratch.
Preserve the current founder-led, premium-clean, warm-tech direction.

Important context:
NechCode is a founder-led technology partner for businesses, UMKM, organizations, and institutions.
Its visual tone should stay:
- practical
- credible
- editorial-clean
- warm-tech
- premium but approachable
- modern, but not overly corporate

Current high-level brand fit is already good.
Do not break the current design language.

Very important constraints:
1. Ignore portfolio text issues. Do not spend time rewriting or fixing portfolio content artifacts.
2. Focus on services architecture, pricing discovery, UX flow, and conversion.
3. Pricing should NOT become a separate main-nav-first page.
4. Pricing should emerge naturally from Services.
5. The 3 main service pillars must become:
   - Web
   - Mobile Apps
   - AI Automation
6. Use 21st.dev via MCP for inspiration and implementation patterns where useful.
   Use 21st.dev for:
   - mega menu / services dropdown inspiration
   - pricing comparison cards
   - segmented control or tab switching
   - FAQ accordion
   - subtle motion and premium interaction polish
7. Do not copy Hostdata visually.
   Only borrow the product logic pattern:
   category in navbar -> specific service detail -> service-specific pricing.
8. Keep the current premium-clean composition and spacing.
9. Keep Indonesian as the primary language.

Strategic business alignment:
- The company profile emphasizes practical, affordable, reliable, scalable digital solutions, plus long-term partnership.
- The attached price list clearly supports Website, Mobile App, AI Chatbot, and Automation.
- The website should now clearly communicate 3 core services:
  Web, Mobile Apps, AI Automation.
- Consultation, integrations, internal tools, custom systems, maintenance, audit, etc. should be reframed as delivery modes, scope extensions, or engagement models, not top-level service pillars.

Main problem to solve:
The current website is already visually solid, but it does not yet help users choose a service path and discover pricing quickly enough.
We need to turn Services into a better commercial decision page without losing the premium studio feel.

IMPLEMENTATION GOALS

1. Refactor service architecture
- Make the 3 main service pillars:
  Web
  Mobile Apps
  AI Automation
- Move “consultation”, “custom solution”, “integrations”, “internal tools”, and similar items into supporting roles:
  - engagement model
  - capability detail
  - delivery mode
  - scope extension

2. Add a Services mega-dropdown in the navbar
- Replace the current simple Services nav behavior with a richer dropdown / mega menu.
- Use a premium warm-tech mega menu, not a plain utilitarian dropdown.
- The mega menu must include:
  - Website & Landing Pages
  - Mobile Apps
  - AI Automation & Chatbot
- Each item should include:
  - title
  - one-line description
  - pricing cue
  - CTA link
- Add a bottom row or side CTA:
  - Bandingkan Semua Opsi
  - Konsultasi via WhatsApp

3. Rebuild the Services page around service selection
- Keep the page route at /services
- Make this page the main pricing discovery page
- Add:
  - hero
  - service selector (tabs / segmented control / pills)
  - dynamic pricing section
  - ways to work
  - special programs
  - FAQ
- The pricing section must change based on the selected service pillar

4. Pricing structure
Web:
- Show fixed pricing cards using the attached price list:
  - Basic Web — Spesial Rp1.200.000
  - Pro Web — Spesial Rp2.800.000
  - Advanced Web — Spesial Rp4.500.000
- Keep the package cards premium, readable, and scannable

AI Automation:
- Show fixed pricing cards:
  - Basic Chatbot — Spesial Rp1.200.000
  - Pro Chatbot — Spesial Rp3.500.000
  - Custom AI Solution — consultation-based
- Make the custom option visually distinct but still consistent

Mobile Apps:
- Do NOT invent fixed prices if the business does not have validated public mobile app package pricing
- Present Mobile Apps as consultation-led, scope-based offers
- Create 3 service cards without fake prices:
  - MVP Mobile App
  - Operational Mobile App
  - Integrated Mobile Product
- Add consultation CTA for each
- Make the explanatory copy strong and credible

5. Keep and reposition “Ways to Work”
Preserve these ideas:
- Consultation First
- Entry Package
- Strategic Custom Build
But reposition them as engagement modes, not as top-level services.

6. Add Special Programs section
Create a section below core pricing for:
- Program Spesial Bayar Seikhlasnya
- Diskon Akademisi
- Penawaran Khusus UMKM
This section should feel secondary but visible.
It should not overpower the main pricing selector.

7. Improve conversion logic
- All package/service CTAs should route to WhatsApp using the existing reusable helper
- Include contextual prefilled values:
  - source page
  - selected service
  - selected package or scope
- Keep the contact name as NechMin
- Keep the WhatsApp flow practical and conversion-oriented

8. Improve recurring copy
- Update any service or CTA copy so it helps buyers choose:
  - who this is for
  - when to choose it
  - how to start
- Avoid vague studio-only language
- Keep the founder-led, practical tone

DESIGN SYSTEM / UX DIRECTION

- Preserve the current NechCode warm-tech palette and typography
- Use premium whitespace
- Use rounded cards with soft shadows
- Use tabs / segmented controls that feel editorial and calm
- Add subtle motion only where useful
- Use 21st.dev components or patterns as inspiration for:
  - mega menu
  - pricing cards
  - tabs
  - accordions
  - CTA polish
- Avoid over-animated SaaS patterns
- Avoid cyberpunk
- Avoid noisy gradient-heavy visuals
- Avoid generic hosting-site visuals

COPY TO IMPLEMENT

Navbar mega menu intro:
“Pilih layanan berdasarkan kebutuhan utama tim Anda. Mulai dari paket awal sampai implementasi custom.”

Service item 1:
Title: Website & Landing Pages
Body: “Untuk company profile, lead generation, katalog, dan website bisnis yang lebih kredibel, cepat, dan siap dipakai.”
Price cue: “Mulai dari Rp1.200.000”
CTA: “Lihat Paket Website”

Service item 2:
Title: Mobile Apps
Body: “Untuk pengalaman mobile-first, operasional lapangan, atau produk digital yang perlu hadir langsung di perangkat pengguna.”
Price cue: “Scope via konsultasi”
CTA: “Lihat Opsi Mobile App”

Service item 3:
Title: AI Automation & Chatbot
Body: “Untuk FAQ, lead capture, follow-up otomatis, knowledge routing, dan workflow AI yang lebih konsisten.”
Price cue: “Mulai dari Rp1.200.000”
CTA: “Lihat Paket AI”

Services page hero:
Title: “Layanan digital yang bisa dimulai dari paket, lalu tumbuh sesuai kebutuhan”
Body: “NechCode membantu bisnis, UMKM, organisasi, dan institusi membangun website, mobile app, dan automasi AI yang relevan dengan tahap pertumbuhan mereka — mulai dari kebutuhan dasar yang harus cepat jalan sampai solusi custom yang lebih kompleks.”

Pricing intro:
Title: “Pilih jalur mulai yang paling masuk akal”
Body: “Tidak semua kebutuhan harus dimulai dari scope besar. Beberapa tim cukup memulai dari paket website atau chatbot, lalu berkembang setelah validasi. Tim lain membutuhkan mobile app atau sistem custom sejak awal. Karena itu, kami menyusun opsi layanan berdasarkan kebutuhan nyata, bukan sekadar daftar fitur.”

Web packages:
Basic Web:
“Untuk personal brand, UMKM, atau bisnis yang butuh website sederhana tapi tetap rapi, kredibel, dan siap online.”
Price: “Spesial Rp1.200.000”
Subnote: “Satu kali bayar, termasuk domain dan hosting 1 tahun.”

Pro Web:
“Untuk bisnis yang butuh website multi halaman dengan katalog, lead capture, dan integrasi komunikasi yang lebih lengkap.”
Price: “Spesial Rp2.800.000”

Advanced Web:
“Untuk kebutuhan website yang lebih kompleks, sistem admin, integrasi database, dan fitur custom yang mendukung operasional.”
Price: “Spesial Rp4.500.000”

Web pricing microcopy:
“Harga dapat disesuaikan dengan kompleksitas, konten, integrasi, dan kebutuhan lanjutan.”

Mobile Apps section:
Title: “Mobile Apps — dirancang berdasarkan scope, bukan dipaksakan ke paket yang sempit”
Body: “Layanan mobile app cocok untuk tim yang membutuhkan pengalaman mobile-first, aplikasi operasional, atau produk digital yang dipakai langsung oleh pengguna. Karena kebutuhan mobile cenderung lebih spesifik, estimasi terbaik dimulai dari konsultasi scope.”

Mobile card 1:
Title: “MVP Mobile App”
Body: “Untuk validasi ide, prototype fungsional, atau aplikasi awal dengan alur inti yang sudah jelas.”
CTA: “Diskusikan Scope MVP”

Mobile card 2:
Title: “Operational Mobile App”
Body: “Untuk kebutuhan internal atau operasional lapangan dengan autentikasi, role, dashboard, dan alur kerja yang lebih matang.”
CTA: “Diskusikan Scope Operasional”

Mobile card 3:
Title: “Integrated Mobile Product”
Body: “Untuk aplikasi yang terhubung ke backend, pembayaran, API eksternal, notifikasi, atau sistem yang sudah berjalan.”
CTA: “Diskusikan Scope Terintegrasi”

Mobile microcopy:
“Estimasi mobile app disusun berdasarkan flow, integrasi, jumlah role, dan target rilis.”

AI section:
Basic Chatbot:
“Untuk FAQ otomatis, alur percakapan sederhana, dan integrasi awal ke website.”
Price: “Spesial Rp1.200.000”

Pro Chatbot:
“Untuk lead capture, follow-up otomatis, integrasi Google Sheets/CRM, dan alur komunikasi yang lebih siap dipakai tim.”
Price: “Spesial Rp3.500.000”

Custom AI Solution:
“Untuk workflow AI, automation lintas tools, routing pengetahuan, integrasi API, dan proses yang tidak bisa diselesaikan dengan template umum.”
Price cue: “Mulai dari konsultasi”

AI microcopy:
“Fitur di luar kebutuhan dasar akan disesuaikan melalui konsultasi dan pemetaan workflow.”

Special programs section:
Title: “Program khusus untuk tahap awal tertentu”
Body: “Beberapa inisiatif kami disiapkan untuk membantu tim tertentu memulai transformasi digital dengan lebih ringan.”

Program 1:
Title: “Bayar Seikhlasnya”
Body: “Program terbatas untuk bisnis, organisasi, dan personal brand tertentu yang ingin memulai website, aplikasi, atau AI chatbot dengan skema pembayaran fleksibel.”

Program 2:
Title: “Diskon Akademisi”
Body: “Potongan khusus untuk mahasiswa, pelajar, guru, dosen, dan kebutuhan edukasi tertentu.”

Program 3:
Title: “Penawaran Khusus UMKM”
Body: “Opsi yang disesuaikan untuk landing page produk, katalog online, e-commerce sederhana, dan optimasi awal.”

Special program note:
“Program khusus bersifat terbatas dan melalui proses seleksi kebutuhan.”

CTAs:
- Pilih Basic
- Pilih Pro
- Pilih Advanced
- Konsultasi via WhatsApp
- Diskusikan Scope
- Bandingkan Semua Opsi

TECHNICAL REQUIREMENTS

- Use Next.js + TypeScript
- Use shadcn/ui where appropriate
- Use reusable data-driven configuration for service cards and pricing cards
- Keep pricing content easy to edit in one data source
- Use the existing WhatsApp helper and pass service/package/source context
- Make the mega menu accessible for keyboard navigation
- Make mobile nav behavior clean and usable
- Make the service selector performant and responsive
- Ensure package cards stack gracefully on mobile

DELIVERABLES

1. Updated Services mega menu in navbar
2. Refactored /services page around 3 core service pillars
3. Dynamic pricing section for Web / Mobile Apps / AI Automation
4. Secondary special programs section
5. Better CTA and WhatsApp routing with service/package context
6. Cleaner information architecture
7. Short implementation summary explaining the rationale

ACCEPTANCE CRITERIA

- Users can understand NechCode’s 3 main services within seconds
- Pricing is discoverable from Services without a separate top-nav Pricing page
- Web and AI have clear package cards
- Mobile Apps has credible consultation-led pricing UX
- Special programs are visible but not overpowering
- The result feels premium-clean and founder-led, not like a cheap hosting site
- 21st.dev patterns are used as inspiration where useful, but not copied blindly

Saran final gue

Kalau tujuan lo best UX dan best business clarity, menurut gue keputusan paling tepat adalah:

jangan bikin “Pricing” sebagai menu utama terpisah.
Bikin Services jadi gateway komersial utama, lalu pricing muncul di dalamnya dengan struktur yang jelas.

Jadi user flow idealnya:
Navbar Services → pilih Web / Mobile / AI → lihat pricing / scope → klik WA dengan context

Itu paling nyambung sama:

brand lo
company profile
price list yang udah ada
dan referensi pattern Hostdata yang lo mau adaptasi

Kalau lo mau, next step gue bisa bikin:
versi 2 prompt yang lebih teknis
khusus untuk:

navbar mega-dropdown
services page pricing tabs/cards
data schema JSON/TS buat pricing content