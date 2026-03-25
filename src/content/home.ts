import { buildMailto, getSocialLinks, siteConfig } from "@/config/site";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
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
    label: "Diskusikan Kebutuhan",
    href: buildWhatsAppInquiryUrl({
      sourcePage: "Top Navbar",
      serviceInterest: "Diskusi kebutuhan awal",
    }),
    external: true,
  },
  hero: {
    badge: "Founder-Led Technology Partner",
    headingA: "Solusi Digital",
    headingEmphasis: "Praktis dan Terarah",
    headingB: "untuk Bisnis, UMKM, Organisasi, dan Institusi.",
    description:
      "NechCode membantu tim Anda membangun website, sistem internal, dan alur kerja berbasis AI yang rapi, mudah dipakai, dan siap dikembangkan jangka panjang.",
    primaryCta: {
      label: "Konsultasi via WhatsApp",
      href: buildWhatsAppInquiryUrl({
        sourcePage: "Hero",
        serviceInterest: "Website / Sistem Internal / AI Workflow",
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
    headingA: "Layanan inti kami untuk",
    headingEmphasis: "operasional yang lebih rapi",
    description:
      "Mulai dari website dan landing page, sistem internal, AI-assisted workflows, sampai integrasi dan custom solution. Anda bisa mulai dari paket entry-level atau scope strategis yang lebih kompleks.",
  },
  trustStrip: {
    items: [
      {
        icon: "developer_mode",
        title: "Website yang Fokus Konversi",
        description: "Pesan jelas, performa cepat, siap dipakai sebagai mesin akuisisi.",
        imageUrl: "https://img.icons8.com/?id=M2rB4aGrYYOq&format=png&size=96",
      },
      {
        icon: "psychology",
        title: "AI Workflow yang Relevan",
        description: "Otomasi tugas repetitif dengan kontrol manusia tetap di jalur.",
        imageUrl: "https://img.icons8.com/?id=269UT6k4i79F&format=png&size=96",
      },
      {
        icon: "biotech",
        title: "Sistem Internal untuk Tim",
        description: "Dashboard dan tools operasional agar keputusan lebih cepat.",
      },
      {
        icon: "handshake",
        title: "Kemitraan Jangka Panjang",
        description: "Founder-led execution dengan komunikasi langsung dan terukur.",
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
    headingA: "Dibangun oleh Praktisi",
    headingEmphasis: "yang ikut eksekusi",
    headingB: "dari awal sampai jalan.",
    descriptionA:
      "NechCode cocok untuk tim yang butuh partner teknologi yang bisa menerjemahkan kebutuhan bisnis menjadi roadmap implementasi yang realistis, bukan hanya daftar fitur.",
    descriptionB:
      "Model kerja kami sederhana: discovery yang jelas, prioritas sprint yang terukur, dan pendampingan setelah rilis agar solusi benar-benar dipakai.",
    quote: "Teknologi yang baik bukan yang paling rumit, tapi yang paling berguna untuk tim Anda.",
    quoteAuthor: "Faisal N., Founder",
  },
  works: {
    heading: "Karya Pilihan",
    description: "Proyek website, sistem internal, dan automasi yang dibangun untuk konteks bisnis nyata.",
  },
  whyPartner: {
    heading: "Mengapa Bermitra dengan Kami?",
    description:
      "Kami menjaga standar premium front-end sekaligus memastikan keputusan teknis tetap praktis untuk operasional harian.",
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
        description: "Setiap keputusan teknis diarahkan ke efisiensi dan dampak bisnis.",
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
    headingA: "Siap Menentukan",
    headingEmphasis: "Langkah Digital",
    headingB: "Berikutnya?",
    description:
      "Pilih cara kerja yang paling cocok: mulai dari konsultasi, paket implementasi awal, atau scope custom untuk kebutuhan yang lebih kompleks.",
    primaryCta: {
      label: "Konsultasi via WhatsApp",
      href: buildWhatsAppInquiryUrl({
        sourcePage: "Final CTA Primary",
        serviceInterest: "Diskusi kebutuhan dan opsi solusi",
      }),
      external: true,
    },
    secondaryCta: {
      label: "Kirim Brief Proyek via Email",
      href: buildMailto("Brief Proyek NechCode"),
    },
  },
  footer: {
    note: "Solusi digital praktis, scalable, dan dapat diandalkan untuk pertumbuhan jangka panjang.",
    links: [
      { label: "Kebijakan Privasi", href: "#" },
      { label: "Syarat & Ketentuan", href: "#" },
      ...getSocialLinks().map((item) => ({
        label: `${item.label} (${item.handle})`,
        href: item.href,
        external: true,
      })),
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
