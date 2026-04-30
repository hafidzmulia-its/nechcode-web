import { siteConfig } from "@/config/site";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";

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
    featured: {
      label: string;
      title: string;
      description: string;
    };
    stats: Array<{
      value: string;
      suffix: string;
      description: string;
    }>;
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
    { label: "Layanan", href: "/services" },
    { label: "Tentang", href: "/about" },
    { label: "Kontak", href: "/contact" },
  ],
  headerCta: {
    label: "Pesan Sekarang!",
    href: buildWhatsAppInquiryUrl({
      sourcePage: "Top Navbar",
      serviceInterest: "Pesan sekarang",
    }),
    external: true,
  },
  hero: {
    badge: "Welcome to NechCode",
    headingA: "We Turn Ideas into",
    headingEmphasis: "Digital Solutions!",
    headingB: "",
    description:
      "Melalui Pengembangan Software, Sistem Digital, AI, dan Otomatisasi, kami membantu Bisnis, UMKM, Organisasi serta Masyarakat berkembang di Era Digital!",
    primaryCta: {
      label: "Konsultasi Gratis!",
      href: buildWhatsAppInquiryUrl({
        sourcePage: "Hero",
        serviceInterest: "Konsultasi gratis",
      }),
      external: true,
    },
    secondaryCta: {
      label: "Lihat Opsi Solusi",
      href: "/services",
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
    headingA: "Solusi yang Kami tawarkan",
    headingEmphasis: "kepada Anda",
    description: "",
  },
  trustStrip: {
    items: [
      {
        icon: "trending_up",
        title: "Business-minded",
        description:
          "Setiap keputusan teknis diarahkan ke efisiensi dan dampak bisnis.",
        imageUrl: "/img/bisnis.png",
      },
      {
        icon: "build",
        title: "Practical",
        description: "Solusi yang realistis dan mudah digunakan tim Anda.",
        imageUrl: "/img/eng.png",
      },
      {
        icon: "group",
        title: "Collaborative",
        description:
          "Transparansi penuh melalui sprint board dan update rutin.",
        imageUrl: "/img/coll.png",
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
        description:
          "Sistem lama yang tidak sanggup menampung pertumbuhan trafik dan pengguna.",
      },
      {
        title: "Fragmentasi Data",
        description:
          "Informasi tersebar di berbagai platform tanpa sinkronisasi yang jelas.",
      },
      {
        title: "Legacy Systems",
        description:
          "Ketergantungan pada teknologi usang yang sulit dimodifikasi dan rawan keamanan.",
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
    headingA: "Dibangun oleh Praktisi",
    headingEmphasis: "yang ikut eksekusi",
    headingB: "dari awal sampai jalan.",
    descriptionA:
      "NechCode cocok untuk tim yang butuh partner teknologi yang bisa menerjemahkan kebutuhan bisnis menjadi roadmap implementasi yang realistis, bukan hanya daftar fitur.",
    descriptionB:
      "Model kerja kami sederhana: discovery yang jelas, prioritas sprint yang terukur, dan pendampingan setelah rilis agar solusi benar-benar dipakai.",
    quote:
      "Teknologi yang baik bukan yang paling rumit, tapi yang paling berguna untuk tim Anda.",
    quoteAuthor: "NechCode Team",
  },
  works: {
    heading: "Karya Pilihan",
    description:
      "Proyek website, sistem internal, dan automasi yang dibangun untuk konteks bisnis nyata.",
  },
  whyPartner: {
    heading: "Mengapa Harus Kami?",
    description: "",
    featured: {
      label: "NECHCODE",
      title: "Partner Teknologi yang Ikut Eksekusi",
      description:
        "Kami bukan vendor biasa. Anda berkomunikasi langsung dengan praktisi yang paham konteks bisnis, bukan sekadar pengembang yang menunggu brief.",
    },
    stats: [
      {
        value: "1+",
        suffix: "Tahun",
        description:
          "Tahun pengalaman membangun solusi digital untuk berbagai skala bisnis dan organisasi.",
      },
      {
        value: "10+",
        suffix: "Proyek",
        description:
          "Proyek Website, sistem internal, dan automasi AI yang sudah berjalan di production.",
      },
    ],
    items: [],
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
        description:
          "Rancang arsitektur data dan pengalaman pengguna yang intuitif.",
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
        description:
          "Pendampingan berkelanjutan untuk stabilitas jangka panjang.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Pertanyaan yang Sering Muncul",
    description:
      "Jawaban cepat untuk hal-hal yang paling sering ditanyakan sebelum memulai kolaborasi bersama NechCode.",
    contactCta: {
      label: "Masih ada pertanyaan? Diskusikan via WhatsApp",
      href: buildWhatsAppInquiryUrl({
        sourcePage: "FAQ Section",
        serviceInterest: "Konsultasi sebelum mulai proyek",
      }),
      external: true,
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
    headingA: "Siap Menentukan langkah",
    headingEmphasis: "digital",
    headingB: "berikutnya?",
    description:
      "Pilih cara kerja yang paling cocok: mulai dari konsultasi, paket implementasi awal, atau scope custom untuk kebutuhan yang lebih kompleks.",
    primaryCta: {
      label: "Pesan Sekarang!",
      href: "/https://wa.me/6289531848511?text=Halo%20NechMin%2C%0A%0ASaya%20ingin%20diskusi%20kebutuhan%20digital%20dengan%20NechCode.%0A%0ANama%20%2F%20Brand%3A%20-%0AJenis%20bisnis%20%2F%20organisasi%3A%20-%0AKebutuhan%20utama%3A%20-%0ALayanan%20%2F%20paket%20yang%20diminati%3A%20Pesan%20sekarang%0APaket%20awal%20(jika%20ada)%3A%20-%0AEstimasi%20timeline%3A%20-%0AEstimasi%20budget%3A%20-%0ACampaign%3A%20-%0ACampaign%20slug%3A%20-%0AUrgency%20state%3A%20-%0ACTA%20origin%3A%20-%0ASumber%20halaman%3A%20Top%20Navbar%0ACatatan%20tambahan%3A%20-",
    },
    secondaryCta: {
      label: "",
      href: "",
    },
  },
  footer: {
    note: "Solusi digital praktis, scalable, dan dapat diandalkan untuk pertumbuhan jangka panjang.",
    links: [],
  },
};

const contentMap: Record<Locale, HomeContent> = {
  id: idContent,
  en: idContent,
};

export function getHomeContent(locale: Locale = defaultLocale) {
  return contentMap[locale];
}
