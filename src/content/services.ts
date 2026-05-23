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
      "For company profiles, lead generation, catalogs and business websites that are more credible, fast and ready to use.",
    navbarPriceCue: "Mulai dari Rp1.200.000",
    navbarCtaLabel: "Lihat Paket Website",
    selectorLabel: "Web",
    sectionTitle: "Web Packages",
    sectionBody:
      "Paket website untuk tim yang ingin mulai cepat dengan fondasi yang rapi, lalu tumbuh bertahap sesuai kebutuhan operasional.",
    microcopy: "",
    packages: [
      {
        name: "Basic Web",
        description:
          "For personal brands, MSMEs, or businesses that need a simple but neat, credible and online-ready website.",
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
          "For businesses that need a multi-page website with a catalog, lead capture and more complete communication integration.",
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
          "For more complex website needs, admin systems, database integration, and custom features that support operations.",
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
      "For mobile-first experiences, field operations, or digital products that need to be present directly on users devices.",
    navbarPriceCue: "Scope via konsultasi",
    navbarCtaLabel: "Lihat Opsi Mobile App",
    selectorLabel: "Mobile Apps",
    sectionTitle: "Mobile Apps dengan estimasi berbasis scope",
    sectionBody:
      "Layanan mobile app cocok untuk tim yang membutuhkan pengalaman mobile-first, aplikasi operasional, atau produk digital yang dipakai langsung oleh pengguna. Karena kebutuhan mobile cenderung lebih spesifik, estimasi terbaik dimulai dari konsultasi scope.",
    microcopy: "",
    packages: [
      {
        name: "MVP Mobile App",
        description:
          "To validate ideas, functional prototypes, or initial applications with a clear core flow.",
        priceCue: "",
        isCustom: true,
        features: [
          "The core flow is ready to be tested on users",
          "Initial architecture for fast iteration",
          "A compact timeline based on feature priorities",
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
          "For internal or field operational needs with more mature authentication, roles, dashboards and workflows.",
        priceCue: "",
        isCustom: true,
        features: [
          "Auth, roles, and operational dashboards",
          "Field data synchronization",
          "Scope based on team SOP",
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
          "For apps that connect to backends, payments, external APIs, notifications, or already running systems.",
        priceCue: "",
        isCustom: true,
        features: [
          "Backend integration and external APIs",
          "Notifications and user lifecycle",
          "Phased release planning",
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
      "For FAQs, lead capture, automatic follow-up, knowledge routing, and more consistent AI workflows.",
    navbarPriceCue: "Mulai dari Rp1.200.000",
    navbarCtaLabel: "Lihat Paket AI",
    selectorLabel: "AI Automation",
    sectionTitle: "AI Automation & Chatbot",
    sectionBody:
      "Opsi layanan AI untuk tim yang ingin mempercepat respons, merapikan knowledge flow, dan mengurangi pekerjaan berulang lewat automasi yang terukur.",
    microcopy: "",
    packages: [
      {
        name: "Basic Chatbot",
        description:
          "For automated FAQs, simple conversation flows, and early integration into websites.",
        priceCue: "Rp1.200.000",
        features: [
          "FAQ automation for recurring questions",
          "Basic conversation flow",
          "Initial integration into the website",
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
          "For lead capture, automated follow-up, Google Sheets/CRM integration, and more team-ready communication flows.",
        priceCue: "Rp3.500.000",
        badge: "Paling Populer",
        features: [
          "Lead Capture and Automatic Follow-Up",
          "Google Sheets or CRM integration",
          "More structured conversation routing",
          "Ready to be used by the sales/ops team",
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
          "For AI workflows, cross-tool automation, knowledge routing, API integration, and processes that cannot be completed with common templates.",
        priceCue: "Mulai dari konsultasi",
        isCustom: true,
        features: [
          "Cross-tool AI workflow",
          "Knowledge routing according to team context",
          "API integration and custom process automation",
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
      "Data analysis and prediction using Machine Learning to turn your datasets into insights and predictions that are useful for business and research.",
    navbarPriceCue: "Mulai dari Rp1.500.000",
    navbarCtaLabel: "Lihat Paket Data",
    selectorLabel: "Predictive Data",
    sectionTitle:
      "Predictive Data — Analisis & Prediksi berbasis Machine Learning",
    sectionBody:
      "Kami membantu bisnis, UMKM, dan peneliti mengubah data historis menjadi model prediksi yang actionable. Cukup siapkan data dalam format CSV, Excel, atau dataset numerik — kami yang kerjakan analisisnya.",
    microcopy: "",
    packages: [
      {
        name: "Basic Prediction",
        description:
          "A simple data prediction solution to understand trends from your dataset. Suitable for MSMEs, students, and businesses that are just starting to analyze data.",
        priceCue: "Rp 1.500.000",
        subnote: "Estimasi pengerjaan 4–6 hari kerja.",
        features: [
          "Dataset analysis",
          "Create a prediction model",
          "Identify data patterns",
          "Visualization of prediction results",
          "Analysis report (PDF)",
          "Trend charts and predictions",
          "Prediction model (.pkl)",
          "Interpretation consultation",
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
          "Deeper data analysis to produce more accurate predictions. Includes all Basic Prediction features. Suitable for data-driven business, academic research, and complex data analysis.",
        priceCue: "Rp 4.000.000",
        subnote: "Estimasi pengerjaan 1–2 minggu.",
        badge: "Paling Populer",
        features: [
          "All Basic Prediction features",
          "Analysis of relationships between variables",
          "Testing multiple ML models",
          "Evaluate model performance",
          "More accurate predictions",
          "Analyze the factors that influence the results",
          "Machine Learning model optimization",
          "Analysis report (PDF) + data visualization",
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
          "If your needs do not fall within the Basic or Pro plans, we can completely customize a data analysis solution to your business or research context.",
        priceCue: "Mulai dari konsultasi",
        isCustom: true,
        features: [
          "The dataset is more complex",
          "Special analysis needs",
          "Integration into business systems",
          "Scope and price adjust to project needs",
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
    title:
      "Layanan digital yang bisa dimulai dari paket, lalu tumbuh sesuai kebutuhan",
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
        body: "The program is limited to certain businesses, organizations and personal brands who want to start a website, application or AI chatbot with a flexible payment scheme.",
      },
      {
        title: "Diskon Akademisi",
        body: "Special discounts for students, teachers, lecturers and certain educational needs.",
      },
      {
        title: "Penawaran Khusus UMKM",
        body: "Customized options for product landing pages, online catalogs, simple e-commerce, and initial optimization.",
      },
    ],
  },
  faq: {
    heading: "Pertanyaan seputar layanan dan pricing",
    items: [
      {
        question:
          "Bagaimana cara memilih antara Web, Mobile Apps, atau AI Automation?",
        answer:
          "Mulai dari kebutuhan utama tim Anda saat ini. Jika fokusnya kredibilitas dan lead, mulai dari Web. Jika operasional atau produk utama ada di perangkat pengguna, pilih Mobile Apps. Jika bottleneck ada di respons dan proses berulang, mulai dari AI Automation.",
      },
      {
        question:
          "Apakah bisa mulai dari paket lalu ditingkatkan ke custom scope?",
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
  return (
    servicesContent.pillars.find((pillar) => pillar.id === id) ??
    servicesContent.pillars[0]
  );
}

export function isValidPillarId(
  value: string | null,
): value is ServicePillarId {
  return (
    value === "web" || value === "mobile" || value === "ai" || value === "data"
  );
}
