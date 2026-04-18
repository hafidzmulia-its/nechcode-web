import type { ServicePillarId } from "@/content/services";

export type ShowcaseItem = {
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
};

export type ServicePageHero = {
  eyebrow: string;
  title: string;
  description: string;
  /** Icon varian: gambar (path) atau material icon (name). */
  visual:
    | { kind: "image"; src: string; alt: string }
    | { kind: "icon"; name: string };
};

export type ServicePageCopy = {
  hero: ServicePageHero;
  portfolio: {
    eyebrow: string;
    title: string;
    body: string;
    items: ShowcaseItem[];
    /** Jumlah kolom grid di breakpoint lg. Default 3. */
    maxColumns?: 2 | 3;
  };
  pricing: {
    title: string;
  };
};

export const servicePageCopy: Record<ServicePillarId, ServicePageCopy> = {
  data: {
    hero: {
      eyebrow: "Layanan Predictive Data",
      title: "Ubah data Anda menjadi insight dan prediksi yang actionable.",
      description:
        "NechCode membantu bisnis, UMKM, dan peneliti menganalisis dataset dan membangun model prediksi berbasis Machine Learning — cukup siapkan data dalam format CSV, Excel, atau dataset numerik.",
      visual: {
        kind: "image",
        src: "/img/asset9.png",
        alt: "Ilustrasi layanan predictive data NechCode",
      },
    },
    portfolio: {
      eyebrow: "Portfolio Pilihan",
      title: "Hasil Karya dari Kami",
      body: "Beberapa implementasi Predictive Data yang kami kerjakan.",
      maxColumns: 2,
      items: [],
    },
    pricing: {
      title:
        "Mulai dari dataset sederhana hingga analisis Machine Learning yang kompleks.",
    },
  },
  web: {
    hero: {
      eyebrow: "Layanan Website",
      title:
        "Layanan digital yang bisa dimulai dari paket, lalu tumbuh sesuai kebutuhan.",
      description:
        "NechCode membantu bisnis, UMKM, organisasi, dan institusi membangun website yang kredibel, cepat, dan siap dipakai sejak hari pertama.",
      visual: {
        kind: "image",
        src: "/img/asset9.png",
        alt: "Ilustrasi layanan website NechCode",
      },
    },
    portfolio: {
      eyebrow: "Portfolio Pilihan",
      title: "Hasil Karya dari Kami",
      body: "Beberapa website yang kami kerjakan untuk klien dari berbagai industri. Klik salah satu untuk melihat studi kasusnya.",
      maxColumns: 3,
      items: [
        {
          title: "Nestbloom",
          category: "Company Profile",
          description:
            "Nestbloom adalah platform edukasi pengasuhan di bawah naungan Kementerian Kesehatan Republik Indonesia. Platform ini dirancang untuk membantu calon pengasuh di Indonesia dalam mempersiapkan diri, baik secara fisik maupun emosional.",
          image: "/img/porto/web-1.png",
          href: "https://nestbloom.vercel.app",
        },
        {
          title: "Soulmom",
          category: "Microsite",
          description:
            "SOULMOM adalah platform digital yang dirancang untuk membantu ibu di Indonesia melakukan deteksi dini kesehatan mental pasca melahirkan secara mandiri, mudah, dan privat.",
          image: "/img/porto/web-2.png",
          href: "https://soulmom.vercel.app ",
        },
        {
          title: "E-LKPD",
          category: "Katalog Produk",
          description:
            "ELKPD - E-Learning Platform adalah sebuah media pembelajaran digital inovatif berbentuk Lembar Kerja Peserta Didik Elektronik (E-LKPD).",
          image: "/img/porto/web-3.png",
          href: "https://elkpd.vercel.app",
        },
      ],
    },
    pricing: {
      title:
        "Mulai dari kebutuhan dasar yang harus cepat jalan sampai implementasi custom yang lebih kompleks.",
    },
  },
  mobile: {
    hero: {
      eyebrow: "Layanan Mobile Apps",
      title: "Aplikasi mobile yang dibangun dari kebutuhan nyata pengguna.",
      description:
        "NechCode membantu tim membangun mobile app yang fungsional, cepat dipakai, dan siap berkembang — dari MVP hingga produk terintegrasi penuh.",
      visual: {
        kind: "image",
        src: "/img/asset9.png",
        alt: "Ilustrasi layanan mobile NechCode",
      },
    },
    portfolio: {
      eyebrow: "Portfolio Pilihan",
      title: "Hasil Karya dari Kami",
      body: "Beberapa mobile app yang kami kerjakan untuk klien dari berbagai industri. Klik salah satu untuk melihat studi kasusnya.",
      maxColumns: 2,
      items: [
        {
          title: "Financial Tracker App",
          category: "Company Profile",
          description:
            "FinTrack adalah asisten keuangan pribadi yang dirancang untuk memberikan visibilitas penuh atas kondisi finansial Anda. Dengan sistem pemantauan kategori yang intuitif, FinTrack membantu Anda melihat ke mana setiap rupiah dialokasikan dan memastikan rencana keuangan Anda tetap berada di jalur yang benar.",
          image: "/img/porto/mobile-1.png",
          href: "#",
        },
        {
          title: "Real Keke App",
          category: "Microsite",
          description:
            "REAL KEKE (Reporting Electronic Access Live Keselamatan dan Kesehatan Kerja) adalah solusi digital terintegrasi yang dirancang khusus untuk memperkuat budaya keselamatan kerja di lingkungan Poltekkes Kemenkes Surabaya. Aplikasi ini mendigitalisasi proses pelaporan insiden guna memastikan setiap risiko di tempat kerja dapat ditangani dengan cepat, akurat, dan transparan.",
          image: "/img/porto/mobile-2.png",
          href: "https://realkeke.vercel.app",
        },
      ],
    },
    pricing: {
      title: "Mulai dari validasi ide hingga aplikasi terintegrasi penuh.",
    },
  },
  ai: {
    hero: {
      eyebrow: "Layanan AI Automation",
      title:
        "Automasi yang mengurangi kerja manual dan mempercepat respons tim.",
      description:
        "NechCode membantu bisnis mengimplementasikan AI chatbot dan workflow automation yang relevan — dari FAQ otomatis hingga sistem custom lintas tools.",
      visual: {
        kind: "image",
        src: "/img/asset9.png",
        alt: "Ilustrasi layanan AI automation NechCode",
      },
    },
    portfolio: {
      eyebrow: "Portfolio Pilihan",
      title: "Hasil Karya dari Kami",
      body: "Beberapa implementasi AI automation yang kami kerjakan untuk klien dari berbagai industri.",
      maxColumns: 2,
      items: [
        {
          title: "Thyva",
          category: "Company Profile",
          description:
            "Thyva adalah sebuah Chatbot Edukasi yang dirancang khusus untuk memberikan informasi dan pembelajaran mengenai kesehatan reproduksi, dengan fokus utama pada topik keputihan.",
          image: "/img/porto/ai-1.png",
          href: "https://thyva.vercel.app",
        },
        {
          title: "premom",
          category: "Microsite",
          description:
            "PREMOM merupakan platform edukasi prenatal dari Kementerian Kesehatan RI yang dirancang untuk membantu calon pengantin dan calon ibu mempersiapkan kondisi fisik serta emosional dalam menyambut kehamilan.",
          image: "/img/porto/ai-2.png",
          href: "https://premom.vercel.app",
        },
      ],
    },
    pricing: {
      title: "Mulai dari chatbot sederhana hingga workflow AI yang kompleks.",
    },
  },
};
