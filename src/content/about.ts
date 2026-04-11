export type AboutMission = string;

export type AboutPrinciple = {
  title: string;
  description: string;
};

export type AboutCapability = {
  icon: string;
  title: string;
  description: string;
};

export const aboutContent = {
  vision:
    "Memberdayakan bisnis dan organisasi di seluruh Indonesia melalui solusi teknologi digital yang aksesibel, andal, dan berdampak.",
  missions: [
    "Menyediakan solusi digital yang praktis dan terjangkau untuk bisnis dan organisasi.",
    "Membantu UMKM dan institusi mengadopsi teknologi digital secara efektif.",
    "Membangun platform web dan sistem yang andal untuk operasional bisnis.",
    "Mengintegrasikan tools modern seperti AI chatbot dan layanan otomatisasi.",
  ] satisfies AboutMission[],
  capabilities: [
    {
      icon: "language",
      title: "Website & Landing Page",
      description:
        "Dari company profile, katalog produk, hingga landing page lead generation — kami bangun dengan struktur yang rapi, cepat, dan siap dipakai.",
    },
    {
      icon: "phone_android",
      title: "Mobile App",
      description:
        "Aplikasi mobile untuk validasi ide, operasional lapangan, atau produk digital terintegrasi yang hadir langsung di perangkat pengguna.",
    },
    {
      icon: "smart_toy",
      title: "AI & Otomatisasi",
      description:
        "Chatbot FAQ, lead capture otomatis, routing percakapan, hingga workflow AI lintas tools — kami bantu kurangi pekerjaan berulang tim Anda.",
    },
  ] satisfies AboutCapability[],
  principles: [
    {
      title: "Practical Over Hype",
      description:
        "Kami memprioritaskan solusi yang dipakai tim harian dan memberi dampak operasional nyata.",
    },
    {
      title: "Founder-Level Ownership",
      description:
        "Arah produk, arsitektur, dan eksekusi dijaga langsung agar keputusan tetap konsisten.",
    },
    {
      title: "Clear Communication",
      description:
        "Update mingguan dibuat ringkas dan bisa dipahami tim bisnis maupun tim teknis.",
    },
    {
      title: "Long-Term Thinking",
      description:
        "Solusi dirancang agar mudah dirawat, mudah dikembangkan, dan tetap relevan saat bisnis Anda tumbuh.",
    },
  ] satisfies AboutPrinciple[],
  quoteAuthor: "Faisal N., Founder",
};
