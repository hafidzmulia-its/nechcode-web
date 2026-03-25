import { buildMailto, siteConfig } from "@/config/site";
import { defaultPortfolioItems } from "@/lib/portfolio/defaults";

export type Locale = "id" | "en";

export const defaultLocale: Locale = "id";

export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type HomeContent = {
  brand: {
    name: string;
  };
  nav: LinkItem[];
  headerCta: LinkItem;
  hero: {
    badge: string;
    headingA: string;
    headingEmphasis: string;
    headingB: string;
    description: string;
    primaryCta: LinkItem;
    secondaryCta: LinkItem;
    showcaseImage: { src: string; alt: string };
    illustrations3d: Array<{
      title: string;
      imageUrl: string;
    }>;
    livePipeline: {
      eyebrow: string;
      title: string;
      progressLabel: string;
      progressNote: string;
      progressPercent: number;
    };
  };
  services: {
    eyebrow: string;
    headingA: string;
    headingEmphasis: string;
    description: string;
  };
  trustStrip: {
    items: Array<{
      icon: string;
      title: string;
      description: string;
      imageUrl?: string;
    }>;
  };
  problems: {
    heading: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
    codeTitle: string;
    codeLines: string[];
  };
  about: {
    eyebrow: string;
    headingA: string;
    headingEmphasis: string;
    headingB: string;
    descriptionA: string;
    descriptionB: string;
    quote: string;
    quoteAuthor: string;
  };
  works: {
    heading: string;
    description: string;
  };
  whyPartner: {
    heading: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  process: {
    heading: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  faq: {
    eyebrow: string;
    heading: string;
    description: string;
    contactCta: LinkItem;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    headingA: string;
    headingEmphasis: string;
    headingB: string;
    description: string;
    primaryCta: LinkItem;
    secondaryCta: LinkItem;
  };
  footer: {
    note: string;
    links: LinkItem[];
  };
};

const idContent: HomeContent = {
  brand: {
    name: siteConfig.name,
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  headerCta: {
    label: "Mulai Proyek",
    href: buildMailto("Mulai Proyek NechCode"),
  },
  hero: {
    badge: "Founder-Led Studio",
    headingA: "Solusi Digital",
    headingEmphasis: "Praktis",
    headingB: "untuk Masa Depan Bisnis Anda.",
    description:
      "Kami bukan pabrik kode. Kami adalah studio teknologi di mana setiap baris script dirancang dengan presisi untuk mendukung pertumbuhan eksponensial organisasi Anda di Indonesia.",
    primaryCta: {
      label: "Konsultasi Gratis",
      href: buildMailto("Konsultasi Gratis NechCode"),
    },
    secondaryCta: {
      label: "Lihat Karya Kami",
      href: "/portfolio",
    },
    showcaseImage: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAs_1E-9AE0xMJjaW1YZfH1FYD1zhHJTfPjqn5NsEuWWdzPC0HAqAe0Vrwog5XVXb7CwmRg_jvZGmfihQ0DhReq6f2ST9eDD5uciMxGJSkeL6TQU0O1BNZSENjif8n7Eh4nqa6nifYS9JSI-stC_0PNf4AoyEKZPgFrRm19b_J8qoGXHxHFzJ1xLsSPGyri0FNydcoMUklw36jVia4-Dg5XXdnfBw5nz2-9NXEpfYM_ixpA7pdtRubboPhCFcecc58B14U6GNQxbU4",
      alt: "Technology Showcase",
    },
    illustrations3d: [
      {
        title: "Web Analytics",
        imageUrl: "https://img.icons8.com/?id=M2rB4aGrYYOq&format=png&size=96",
      },
      {
        title: "Automation",
        imageUrl: "https://img.icons8.com/?id=269UT6k4i79F&format=png&size=96",
      },
      {
        title: "3D Object",
        imageUrl: "https://img.icons8.com/?id=kqDWzgE2rzsi&format=png&size=96",
      },
    ],
    livePipeline: {
      eyebrow: "Live Pipeline",
      title: "Automation Engine v2.4",
      progressLabel: "Syncing...",
      progressNote: "75% Complete",
      progressPercent: 75,
    },
  },
  services: {
    eyebrow: "Layanan Unggulan",
    headingA: "Keahlian kami dirancang untuk",
    headingEmphasis: "skalabilitas",
    description:
      "Pendekatan modular kami memastikan teknologi Anda tidak hanya bekerja hari ini, tapi tetap relevan lima tahun ke depan.",
  },
  trustStrip: {
    items: [
      {
        icon: "developer_mode",
        title: "Keahlian Sistem Web",
        description: "Arsitektur robust untuk performa maksimal.",
        imageUrl: "https://img.icons8.com/?id=M2rB4aGrYYOq&format=png&size=96",
      },
      {
        icon: "psychology",
        title: "Fokus Automasi AI",
        description: "Integrasi LLM dan AI workflow praktis.",
        imageUrl: "https://img.icons8.com/?id=269UT6k4i79F&format=png&size=96",
      },
      {
        icon: "biotech",
        title: "Riset & Institusi",
        description: "Berpengalaman menangani data kompleks.",
      },
      {
        icon: "handshake",
        title: "Eksekusi Founder-Led",
        description: "Komunikasi langsung dengan penentu kebijakan.",
      },
    ],
  },
  problems: {
    heading: "Kendala Digital yang Kami Selesaikan",
    description:
      "Teknologi seharusnya mempermudah, bukan menjadi beban baru. Kami hadir untuk membereskan masalah fundamental digital Anda.",
    items: [
      {
        title: "Sulit Scaling",
        description: "Sistem lama yang tidak sanggup menampung pertumbuhan trafik dan pengguna.",
      },
      {
        title: "Fragmentasi Data",
        description: "Informasi tersebar di berbagai platform tanpa sinkronisasi yang jelas.",
      },
      {
        title: "Legacy Systems",
        description: "Ketergantungan pada teknologi usang yang sulit dimodifikasi dan rawan keamanan.",
      },
    ],
    codeTitle: "Analisis Akar Masalah",
    codeLines: [
      "if (manual_process > efficiency_threshold) {",
      "  implementAutomation(target_workflow);",
      "}",
    ],
  },
  about: {
    eyebrow: "Tentang NechCode",
    headingA: "Dibangun oleh Praktisi,",
    headingEmphasis: "Bukan",
    headingB: "Birokrasi.",
    descriptionA:
      "NechCode lahir dari keinginan untuk mengembalikan sisi manusiawi ke dalam pengembangan perangkat lunak. Kami percaya bahwa teknologi terbaik lahir dari diskusi mendalam antara founder bisnis dan partner teknologi yang mengerti visi mereka.",
    descriptionB:
      "Kami tidak mengejar kuantitas klien. Kami mengkurasi partner kerja untuk memastikan setiap proyek mendapatkan perhatian penuh dari tim ahli kami.",
    quote: "Setiap proyek adalah karya seni teknis yang personal.",
    quoteAuthor: "Faisal N., Founder",
  },
  works: {
    heading: "Karya Pilihan",
    description: "Bukti nyata dari dedikasi kami terhadap detail.",
  },
  whyPartner: {
    heading: "Mengapa Bermitra dengan Kami?",
    description:
      "Kami mengedepankan kualitas studio butik: fokus pada kualitas detail, bukan kuantitas proyek massal.",
    items: [
      {
        title: "Founder-led",
        description: "Anda berkomunikasi langsung dengan praktisi inti.",
      },
      {
        title: "Practical",
        description: "Solusi yang realistis dan mudah digunakan tim Anda.",
      },
      {
        title: "Business-minded",
        description: "Setiap baris kode harus mendukung pertumbuhan ROI.",
      },
      {
        title: "Collaborative",
        description: "Transparansi penuh melalui sprint board dan update rutin.",
      },
      {
        title: "Scalable",
        description: "Arsitektur siap tumbuh bersama bisnis Anda.",
      },
    ],
  },
  process: {
    heading: "Alur Kerja Kami",
    steps: [
      {
        title: "Discovery",
        description: "Bedah kebutuhan bisnis dan batasan teknis yang ada.",
      },
      {
        title: "Design",
        description: "Rancang arsitektur data dan pengalaman pengguna yang intuitif.",
      },
      {
        title: "Development",
        description: "Iterasi cepat dengan standar kualitas kode industri.",
      },
      {
        title: "Launch",
        description: "Deployment aman dan onboarding tim operasional Anda.",
      },
      {
        title: "Support",
        description: "Pendampingan berkelanjutan untuk stabilitas jangka panjang.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Pertanyaan yang Sering Muncul",
    description:
      "Jawaban cepat untuk hal-hal yang paling sering ditanyakan sebelum memulai kolaborasi bersama NechCode.",
    contactCta: {
      label: "Masih ada pertanyaan? Hubungi kami",
      href: buildMailto("Tanya Seputar Layanan NechCode"),
    },
    items: [
      {
        question: "Proyek seperti apa yang cocok dikerjakan bersama NechCode?",
        answer:
          "Kami fokus pada website bisnis, dashboard internal, dan otomasi proses yang berdampak langsung ke operasional dan pertumbuhan. Jika target Anda jelas, kami bisa bantu menyusun scope teknis yang tepat.",
      },
      {
        question: "Berapa lama estimasi pengerjaan proyek?",
        answer:
          "Rata-rata 3 sampai 8 minggu tergantung kompleksitas. Setelah discovery call, kami akan berikan timeline bertahap agar progres transparan dari minggu ke minggu.",
      },
      {
        question: "Apakah NechCode bisa melanjutkan sistem yang sudah ada?",
        answer:
          "Bisa. Kami sering masuk di fase perbaikan atau scale-up produk existing, termasuk audit arsitektur, optimasi performa, dan penataan ulang alur kerja tim.",
      },
      {
        question: "Bagaimana skema komunikasi selama proyek berlangsung?",
        answer:
          "Kami menggunakan ritme komunikasi mingguan dengan update jelas: progres, blocker, dan rencana sprint berikutnya. Anda selalu tahu status proyek tanpa harus mengejar tim.",
      },
      {
        question: "Apakah ada dukungan setelah proyek selesai?",
        answer:
          "Ya. Kami menyediakan masa pendampingan pasca-rilis untuk stabilisasi, monitoring awal, dan iterasi minor agar sistem siap dipakai tim Anda secara konsisten.",
      },
    ],
  },
  cta: {
    headingA: "Siap Membangun",
    headingEmphasis: "Masa Depan",
    headingB: "Anda?",
    description:
      "Mari bicara tentang bagaimana teknologi dapat bekerja untuk bisnis Anda, bukan sebaliknya.",
    primaryCta: {
      label: "Jadwalkan Panggilan",
      href: buildMailto("Jadwalkan Panggilan NechCode"),
    },
    secondaryCta: {
      label: "Hubungi via WhatsApp",
      href: siteConfig.whatsapp,
      external: true,
    },
  },
  footer: {
    note: "Dibuat dengan presisi studio.",
    links: [
      { label: "Kebijakan Privasi", href: "#" },
      { label: "Syarat & Ketentuan", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "X", href: "#" },
    ],
  },
};

const contentMap: Record<Locale, HomeContent> = {
  id: idContent,
  en: idContent,
};

export function getHomeContent(locale: Locale = defaultLocale) {
  return contentMap[locale];
}

export function getHomeDefaultPortfolio() {
  return defaultPortfolioItems;
}
