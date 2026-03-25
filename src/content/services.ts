import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";

export type ServicePillarId = "web" | "mobile" | "ai";

type Cta = {
  label: string;
  href: string;
  external?: boolean;
};

export type ServicePackage = {
  name: string;
  description: string;
  priceCue: string;
  subnote?: string;
  isCustom?: boolean;
  badge?: string;
  features?: string[];
  cta: Cta;
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
        priceCue: "Spesial Rp1.200.000",
        subnote: "Satu kali bayar, termasuk domain dan hosting 1 tahun.",
        features: [
          "One page website atau landing page",
          "Responsive mobile view",
          "Contact form integration",
          "Dukungan 7 hari setelah rilis",
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
        priceCue: "Spesial Rp2.800.000",
        badge: "Paling Populer",
        features: [
          "Hingga 5 halaman utama",
          "Lead capture dan CTA terstruktur",
          "Optimasi performa dasar",
          "Struktur SEO on-page",
          "Dukungan 30 hari setelah rilis",
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
        priceCue: "Spesial Rp4.500.000",
        features: [
          "Fitur custom berbasis kebutuhan operasional",
          "Integrasi API dan database",
          "Role dan panel admin lanjutan",
          "Prioritas support pasca-rilis",
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
];

export const servicesContent = {
  hero: {
    title: "Layanan digital yang bisa dimulai dari paket, lalu tumbuh sesuai kebutuhan",
    body: "NechCode membantu bisnis, UMKM, organisasi, dan institusi membangun website, mobile app, dan automasi AI yang relevan dengan tahap pertumbuhan mereka - mulai dari kebutuhan dasar yang harus cepat jalan sampai solusi custom yang lebih kompleks.",
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
