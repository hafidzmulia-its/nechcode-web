import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";

export type ServicePillarId = "web" | "mobile" | "ai" | "data";

type Cta = {
  label: string;
  href: string;
  external?: boolean;
};

export type FeatureRow = {
  label: string;
  included: boolean;
};

export type ServicePackage = {
  name: string;
  description: string;
  priceCue: string;
  subnote?: string;
  isCustom?: boolean;
  badge?: string;
  features?: string[];
  featureRows?: FeatureRow[];
  cta: Cta;
};

export type AddOnItem = {
  name: string;
  price: string;
};

export type ServicePillar = {
  id: ServicePillarId;
  label: string;
  navbarTitle: string;
  navbarBody: string;
  navbarPriceCue: string;
  navbarCtaLabel: string;
  selectorLabel: string;
  sectionTitle: string;
  sectionBody: string;
  microcopy: string;
  packages: ServicePackage[];
  addOns?: {
    title: string;
    description: string;
    items: AddOnItem[];
    note: string;
  };
};

const pillars: ServicePillar[] = [
  {
    id: "web",
    label: "Web",
    navbarTitle: "Website & Landing Pages",
    navbarBody:
      "Untuk company profile, lead generation, katalog, dan website bisnis yang lebih kredibel, cepat, dan siap dipakai.",
    navbarPriceCue: "Mulai dari Rp1.200.000",
    navbarCtaLabel: "Lihat Paket Website",
    selectorLabel: "Web",
    sectionTitle: "Web Packages",
    sectionBody:
      "Paket website untuk tim yang ingin mulai cepat dengan fondasi yang rapi, lalu tumbuh bertahap sesuai kebutuhan operasional.",
    microcopy:
      "Harga dapat disesuaikan dengan kompleksitas, konten, integrasi, dan kebutuhan lanjutan.",
    packages: [
      {
        name: "Basic Web",
        description:
          "Untuk personal brand, UMKM, atau bisnis yang butuh website sederhana tapi tetap rapi, kredibel, dan siap online.",
        priceCue: "Rp 1.200.000",
        subnote: "Satu kali bayar, termasuk domain dan hosting 1 tahun.",
        featureRows: [
          { label: "One page/landing page", included: true },
          { label: "Responsive mobile view", included: true },
          { label: "Contact form integration", included: true },
          { label: "Lead Capture & CTA terstruktur", included: false },
          { label: "Optimasi performa dasar", included: false },
          { label: "Struktur SEO on-page", included: false },
          { label: "Fitur custom operasional", included: false },
          { label: "Integrasi API & database", included: false },
          { label: "Role & panel admin lanjutan", included: false },
          { label: "Dukungan 7 hari setelah rilis", included: true },
        ],
        cta: {
          label: "Pilih Basic",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Web",
            serviceInterest: "Website & Landing Pages",
            packageInterest: "Basic Web",
          }),
          external: true,
        },
      },
      {
        name: "Pro Web",
        description:
          "Untuk bisnis yang butuh website multi halaman dengan katalog, lead capture, dan integrasi komunikasi yang lebih lengkap.",
        priceCue: "Rp 2.800.000",
        badge: "Paling Populer",
        featureRows: [
          { label: "Hingga 5 halaman utama", included: true },
          { label: "Responsive mobile view", included: true },
          { label: "Contact form integration", included: true },
          { label: "Lead Capture & CTA terstruktur", included: true },
          { label: "Optimasi performa dasar", included: true },
          { label: "Struktur SEO on-page", included: false },
          { label: "Fitur custom operasional", included: false },
          { label: "Integrasi API & database", included: false },
          { label: "Role & panel admin lanjutan", included: false },
          { label: "Dukungan 30 hari setelah rilis", included: true },
        ],
        cta: {
          label: "Pilih Pro",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Web",
            serviceInterest: "Website & Landing Pages",
            packageInterest: "Pro Web",
          }),
          external: true,
        },
      },
      {
        name: "Advanced Web",
        description:
          "Untuk kebutuhan website yang lebih kompleks, sistem admin, integrasi database, dan fitur custom yang mendukung operasional.",
        priceCue: "Rp 4.500.000",
        featureRows: [
          { label: "One page/landing page", included: true },
          { label: "Responsive mobile view", included: true },
          { label: "Contact form integration", included: true },
          { label: "Lead Capture & CTA terstruktur", included: true },
          { label: "Optimasi performa dasar", included: true },
          { label: "Struktur SEO on-page", included: true },
          { label: "Fitur custom operasional", included: true },
          { label: "Integrasi API & database", included: true },
          { label: "Role & panel admin lanjutan", included: true },
          { label: "Dukungan 7 hari setelah rilis", included: true },
        ],
        cta: {
          label: "Pilih Advanced",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Web",
            serviceInterest: "Website & Landing Pages",
            packageInterest: "Advanced Web",
          }),
          external: true,
        },
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    navbarTitle: "Mobile Apps",
    navbarBody:
      "Untuk pengalaman mobile-first, operasional lapangan, atau produk digital yang perlu hadir langsung di perangkat pengguna.",
    navbarPriceCue: "Scope via konsultasi",
    navbarCtaLabel: "Lihat Opsi Mobile App",
    selectorLabel: "Mobile Apps",
    sectionTitle: "Mobile Apps dengan estimasi berbasis scope",
    sectionBody:
      "Layanan mobile app cocok untuk tim yang membutuhkan pengalaman mobile-first, aplikasi operasional, atau produk digital yang dipakai langsung oleh pengguna. Karena kebutuhan mobile cenderung lebih spesifik, estimasi terbaik dimulai dari konsultasi scope.",
    microcopy:
      "Estimasi mobile app disusun berdasarkan flow, integrasi, jumlah role, dan target rilis.",
    packages: [
      {
        name: "MVP Mobile App",
        description:
          "Untuk validasi ide, prototype fungsional, atau aplikasi awal dengan alur inti yang sudah jelas.",
        priceCue: "Konsultasi Scope",
        isCustom: true,
        features: [
          "Flow inti siap diuji ke pengguna",
          "Arsitektur awal untuk iterasi cepat",
          "Timeline ringkas berbasis prioritas fitur",
        ],
        cta: {
          label: "Diskusikan Scope MVP",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Mobile",
            serviceInterest: "Mobile Apps",
            packageInterest: "MVP Mobile App",
          }),
          external: true,
        },
      },
      {
        name: "Operational Mobile App",
        description:
          "Untuk kebutuhan internal atau operasional lapangan dengan autentikasi, role, dashboard, dan alur kerja yang lebih matang.",
        priceCue: "Konsultasi Scope",
        isCustom: true,
        features: [
          "Auth, role, dan dashboard operasional",
          "Sinkronisasi data lapangan",
          "Scope berdasarkan SOP tim",
        ],
        cta: {
          label: "Diskusikan Scope Operasional",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Mobile",
            serviceInterest: "Mobile Apps",
            packageInterest: "Operational Mobile App",
          }),
          external: true,
        },
      },
      {
        name: "Integrated Mobile Product",
        description:
          "Untuk aplikasi yang terhubung ke backend, pembayaran, API eksternal, notifikasi, atau sistem yang sudah berjalan.",
        priceCue: "Konsultasi Scope",
        isCustom: true,
        features: [
          "Integrasi backend dan API eksternal",
          "Notifikasi dan lifecycle pengguna",
          "Perencanaan rilis bertahap",
        ],
        cta: {
          label: "Diskusikan Scope Terintegrasi",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Mobile",
            serviceInterest: "Mobile Apps",
            packageInterest: "Integrated Mobile Product",
          }),
          external: true,
        },
      },
    ],
  },
  {
    id: "ai",
    label: "AI Automation",
    navbarTitle: "AI Automation & Chatbot",
    navbarBody:
      "Untuk FAQ, lead capture, follow-up otomatis, knowledge routing, dan workflow AI yang lebih konsisten.",
    navbarPriceCue: "Mulai dari Rp1.200.000",
    navbarCtaLabel: "Lihat Paket AI",
    selectorLabel: "AI Automation",
    sectionTitle: "AI Automation & Chatbot",
    sectionBody:
      "Opsi layanan AI untuk tim yang ingin mempercepat respons, merapikan knowledge flow, dan mengurangi pekerjaan berulang lewat automasi yang terukur.",
    microcopy:
      "Fitur di luar kebutuhan dasar akan disesuaikan melalui konsultasi dan pemetaan workflow.",
    packages: [
      {
        name: "Basic Chatbot",
        description:
          "Untuk FAQ otomatis, alur percakapan sederhana, dan integrasi awal ke website.",
        priceCue: "Spesial Rp1.200.000",
        features: [
          "FAQ automation untuk pertanyaan berulang",
          "Flow percakapan dasar",
          "Integrasi awal ke website",
        ],
        cta: {
          label: "Pilih Basic",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - AI",
            serviceInterest: "AI Automation & Chatbot",
            packageInterest: "Basic Chatbot",
          }),
          external: true,
        },
      },
      {
        name: "Pro Chatbot",
        description:
          "Untuk lead capture, follow-up otomatis, integrasi Google Sheets/CRM, dan alur komunikasi yang lebih siap dipakai tim.",
        priceCue: "Spesial Rp3.500.000",
        badge: "Paling Populer",
        features: [
          "Lead capture dan follow-up otomatis",
          "Integrasi Google Sheets atau CRM",
          "Routing percakapan yang lebih terstruktur",
          "Siap dipakai tim sales/ops",
        ],
        cta: {
          label: "Pilih Pro",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - AI",
            serviceInterest: "AI Automation & Chatbot",
            packageInterest: "Pro Chatbot",
          }),
          external: true,
        },
      },
      {
        name: "Custom AI Solution",
        description:
          "Untuk workflow AI, automation lintas tools, routing pengetahuan, integrasi API, dan proses yang tidak bisa diselesaikan dengan template umum.",
        priceCue: "Mulai dari konsultasi",
        isCustom: true,
        features: [
          "Workflow AI lintas tools",
          "Knowledge routing sesuai konteks tim",
          "Integrasi API dan automasi proses custom",
        ],
        cta: {
          label: "Konsultasi via WhatsApp",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - AI",
            serviceInterest: "AI Automation & Chatbot",
            packageInterest: "Custom AI Solution",
          }),
          external: true,
        },
      },
    ],
  },
  {
    id: "data",
    label: "Predictive Data",
    navbarTitle: "Predictive Data",
    navbarBody:
      "Analisis dan prediksi data menggunakan Machine Learning untuk mengubah dataset Anda menjadi insight dan prediksi yang bermanfaat bagi bisnis maupun penelitian.",
    navbarPriceCue: "Mulai dari Rp1.500.000",
    navbarCtaLabel: "Lihat Paket Data",
    selectorLabel: "Predictive Data",
    sectionTitle: "Predictive Data — Analisis & Prediksi berbasis Machine Learning",
    sectionBody:
      "Kami membantu bisnis, UMKM, dan peneliti mengubah data historis menjadi model prediksi yang actionable. Cukup siapkan data dalam format CSV, Excel, atau dataset numerik — kami yang kerjakan analisisnya.",
    microcopy:
      "Harga bervariasi tergantung kompleksitas dataset, jumlah variabel, dan kedalaman analisis yang dibutuhkan.",
    packages: [
      {
        name: "Basic Prediction",
        description:
          "Solusi prediksi data sederhana untuk memahami tren dari dataset Anda. Cocok untuk UMKM, mahasiswa, dan bisnis yang baru mulai analisis data.",
        priceCue: "Rp 1.500.000",
        subnote: "Estimasi pengerjaan 4–6 hari kerja.",
        features: [
          "Analisis dataset",
          "Membuat model prediksi",
          "Identifikasi pola data",
          "Visualisasi hasil prediksi",
          "Laporan analisis (PDF)",
          "Grafik tren dan prediksi",
          "Model prediksi (.pkl)",
          "Konsultasi interpretasi",
        ],
        cta: {
          label: "Mulai Analisis Data",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Predictive Data",
            serviceInterest: "Predictive Data",
            packageInterest: "Basic Prediction",
          }),
          external: true,
        },
      },
      {
        name: "Pro Prediction",
        description:
          "Analisis data lebih mendalam untuk menghasilkan prediksi yang lebih akurat. Sudah termasuk semua fitur Basic Prediction. Cocok untuk bisnis berbasis data, penelitian akademik, dan analisis data kompleks.",
        priceCue: "Rp 4.000.000",
        subnote: "Estimasi pengerjaan 1–2 minggu.",
        badge: "Paling Populer",
        features: [
          "Semua fitur Basic Prediction",
          "Analisis hubungan antar variabel",
          "Pengujian beberapa model ML",
          "Evaluasi performa model",
          "Prediksi lebih akurat",
          "Analisis faktor yang memengaruhi hasil",
          "Optimasi model Machine Learning",
          "Laporan analisis (PDF) + visualisasi data",
        ],
        cta: {
          label: "Mulai Analisis",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Predictive Data",
            serviceInterest: "Predictive Data",
            packageInterest: "Pro Prediction",
          }),
          external: true,
        },
      },
      {
        name: "Custom Prediction",
        description:
          "Jika kebutuhan Anda tidak termasuk paket Basic atau Pro, kami dapat menyesuaikan solusi analisis data sepenuhnya dengan konteks bisnis atau penelitian Anda.",
        priceCue: "Mulai dari konsultasi",
        isCustom: true,
        features: [
          "Dataset lebih kompleks",
          "Kebutuhan analisis khusus",
          "Integrasi ke sistem bisnis",
          "Scope dan harga menyesuaikan kebutuhan proyek",
        ],
        cta: {
          label: "Konsultasi Data Anda",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Predictive Data",
            serviceInterest: "Predictive Data",
            packageInterest: "Custom Prediction",
          }),
          external: true,
        },
      },
    ],
    addOns: {
      title: "Add-On Services",
      description:
        "Fitur tambahan yang dapat digunakan bersama paket Basic atau Pro Prediction untuk meningkatkan kualitas analisis data Anda.",
      items: [
        { name: "Data preprocessing", price: "Rp 50.000 – Rp 150.000" },
        { name: "Feature engineering", price: "Rp 100.000 – Rp 250.000" },
        { name: "Hyperparameter tuning", price: "Rp 150.000 – Rp 250.000" },
        { name: "Advanced model evaluation", price: "Rp 100.000 – Rp 200.000" },
        { name: "Deployment model ke API", price: "Rp 200.000 – Rp 250.000" },
      ],
      note: "Add-on dapat dipilih sesuai kebutuhan analisis data Anda.",
    },
  },
];

export const servicesContent = {
  hero: {
    title: "Layanan digital yang bisa dimulai dari paket, lalu tumbuh sesuai kebutuhan",
    body: "NechCode membantu bisnis, UMKM, organisasi, dan institusi membangun website, mobile app, automasi AI, dan solusi Predictive Data yang relevan dengan tahap pertumbuhan mereka - mulai dari kebutuhan dasar yang harus cepat jalan sampai solusi custom yang lebih kompleks.",
  },
  pricingIntro: {
    title: "Pilih jalur mulai yang paling masuk akal",
    body: "Tidak semua kebutuhan harus dimulai dari scope besar. Beberapa tim cukup memulai dari paket website atau chatbot, lalu berkembang setelah validasi. Tim lain membutuhkan mobile app atau sistem custom sejak awal. Karena itu, kami menyusun opsi layanan berdasarkan kebutuhan nyata, bukan sekadar daftar fitur.",
  },
  megaMenu: {
    intro:
      "Pilih layanan berdasarkan kebutuhan utama tim Anda. Mulai dari paket awal sampai implementasi custom.",
    compareCta: {
      label: "Bandingkan Semua Opsi",
      href: "/services",
    },
    consultCta: {
      label: "Konsultasi via WhatsApp",
      href: buildWhatsAppInquiryUrl({
        sourcePage: "Navbar Mega Menu",
        serviceInterest: "Bandingkan semua layanan",
      }),
      external: true,
    },
  },
  waysToWork: {
    heading: "Model Kolaborasi",
    description:
      "Mode kerja ini membantu tim memilih cara kolaborasi yang paling pas tanpa mengubah fokus utama layanan.",
    items: [
      {
        title: "Mulai dari Konsultasi",
        description:
          "Sesi konsultasi untuk memetakan prioritas, risiko, dan urutan implementasi paling efisien.",
      },
      {
        title: "Mulai dari Paket Awal",
        description:
          "Paket awal website atau chatbot sebagai langkah cepat sebelum scale-up.",
      },
      {
        title: "Bangun Scope Custom",
        description:
          "Scope end-to-end untuk sistem, integrasi, dan automation yang disesuaikan konteks bisnis.",
      },
    ],
  },
  specialPrograms: {
    title: "Program khusus untuk tahap awal tertentu",
    body: "Beberapa inisiatif kami disiapkan untuk membantu tim tertentu memulai transformasi digital dengan lebih ringan.",
    note: "Program khusus bersifat terbatas dan melalui proses seleksi kebutuhan.",
    items: [
      {
        title: "Bayar Seikhlasnya",
        body: "Program terbatas untuk bisnis, organisasi, dan personal brand tertentu yang ingin memulai website, aplikasi, atau AI chatbot dengan skema pembayaran fleksibel.",
      },
      {
        title: "Diskon Akademisi",
        body: "Potongan khusus untuk mahasiswa, pelajar, guru, dosen, dan kebutuhan edukasi tertentu.",
      },
      {
        title: "Penawaran Khusus UMKM",
        body: "Opsi yang disesuaikan untuk landing page produk, katalog online, e-commerce sederhana, dan optimasi awal.",
      },
    ],
  },
  faq: {
    heading: "Pertanyaan seputar layanan dan pricing",
    items: [
      {
        question: "Bagaimana cara memilih antara Web, Mobile Apps, atau AI Automation?",
        answer:
          "Mulai dari kebutuhan utama tim Anda saat ini. Jika fokusnya kredibilitas dan lead, mulai dari Web. Jika operasional atau produk utama ada di perangkat pengguna, pilih Mobile Apps. Jika bottleneck ada di respons dan proses berulang, mulai dari AI Automation.",
      },
      {
        question: "Apakah bisa mulai dari paket lalu ditingkatkan ke custom scope?",
        answer:
          "Bisa. Banyak klien memulai dari paket entry-level untuk validasi cepat, lalu kami scale secara bertahap berdasarkan data penggunaan dan prioritas bisnis.",
      },
      {
        question: "Kenapa Mobile Apps tidak menampilkan harga paket tetap?",
        answer:
          "Karena kompleksitas mobile app sangat dipengaruhi flow, role user, integrasi backend, dan target rilis. Estimasi yang kredibel harus dimulai dari konsultasi scope.",
      },
      {
        question: "Apakah ada dukungan setelah go-live?",
        answer:
          "Ya. Kami menyediakan dukungan pasca-rilis untuk stabilisasi awal, perbaikan minor, dan arahan iterasi agar solusi tetap relevan dengan ritme operasional tim.",
      },
      {
        question: "Apakah harga bisa di nego?",
        answer:
          "Bisa. Kami punya pendekatan Build Your App Based on Your Budget, jadi scope bisa disusun bertahap sesuai prioritas paling penting dulu. Tim Anda tetap bisa mulai dari budget yang realistis, lalu kami scale secara terukur di fase berikutnya.",
      },
    ],
  },
  pillars,
};

export function getServicePillarById(id: ServicePillarId) {
  return servicesContent.pillars.find((pillar) => pillar.id === id) ?? servicesContent.pillars[0];
}

export function isValidPillarId(value: string | null): value is ServicePillarId {
  return value === "web" || value === "mobile" || value === "ai" || value === "data";
}
