import type { Campaign } from "@/types/campaign";

function isoWithOffset(daysFromNow: number, hour: number) {
  const now = new Date();
  const date = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + daysFromNow,
      hour,
      0,
      0,
      0,
    ),
  );

  return date.toISOString();
}

export const defaultCampaigns: Campaign[] = [
  {
    id: "default-wisuda-april",
    title: "Site Gift Wisuda April",
    slug: "wisuda-april",
    status: "active",
    shortLabel: "Campaign April",
    headline: "Hadiah digital wisuda yang lebih personal untuk batch April",
    subheadline:
      "Mulai dari ucapan digital, album online, sampai microsite perayaan yang bisa dibagikan dan dikenang lebih lama.",
    description:
      "Campaign terbatas untuk wisudawan, keluarga, pasangan, dan sahabat yang ingin memberi hadiah digital lebih rapi dan berkesan.",
    body: "Kami bantu Anda menyiapkan format hadiah digital yang cepat dikirim, mudah dibagikan, dan tetap premium secara visual.",
    ctaLabel: "Pesan untuk Batch April",
    secondaryCtaLabel: "Lihat Contoh Format",
    ctaHref: "/campaign/wisuda-april",
    secondaryCtaHref: "/campaign/wisuda-april#contoh",
    campaignType: "academic",
    audience: "wisudawan / keluarga / pasangan / sahabat",
    placementSettings: {
      allowOverlap: false,
      homepageWeight: "strong",
      stickyAlwaysOnRouteOpen: true,
    },
    startAt: isoWithOffset(-1, 1),
    endAt: isoWithOffset(10, 15),
    timezone: "Asia/Jakarta",
    urgencyMode: "automatic",
    slotLimit: 30,
    slotUsed: 12,
    showCountdown: true,
    showBadge: true,
    isDismissible: true,
    placements: {
      topBar: true,
      homepageInline: true,
      stickyFinalHours: true,
      dedicatedPage: true,
      modalOptional: false,
    },
    visualVariant: "editorial",
    themeVariant: "cream",
    termsShort: "Slot batch April terbatas dan mengikuti ketersediaan produksi.",
    termsLong:
      "Campaign berlaku selama periode aktif. Penutupan batch mengikuti jam operasional dan slot produksi. Scope final menyesuaikan kebutuhan serta hasil diskusi.",
    galleryItems: [
      {
        id: "wisuda-gallery-1",
        title: "Ucapan Wisuda Digital",
        imageUrl:
          "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=80&auto=format&fit=crop",
        imageAlt: "Contoh ucapan wisuda digital",
        caption: "Template ucapan digital personal",
      },
      {
        id: "wisuda-gallery-2",
        title: "Album Perayaan Online",
        imageUrl:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80&auto=format&fit=crop",
        imageAlt: "Contoh album perayaan wisuda",
        caption: "Album digital mudah dibagikan",
      },
    ],
    faqItems: [
      {
        question: "Campaign ini cocok untuk siapa?",
        answer:
          "Cocok untuk wisudawan dan orang terdekat yang ingin menyiapkan hadiah digital lebih personal dalam waktu singkat.",
      },
      {
        question: "Apakah bisa custom desain dan copy?",
        answer:
          "Bisa. Kami sesuaikan tone visual dan isi pesan berdasarkan konteks penerima hadiah.",
      },
    ],
    priority: 100,
    analyticsPlaceholder: {
      utmCampaign: "wisuda-april",
      goalName: "campaign_lead_whatsapp",
      sourceNote: "Placeholder untuk tracking lanjutan",
    },
  },
];
