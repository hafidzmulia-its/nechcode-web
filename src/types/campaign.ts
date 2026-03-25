export type CampaignStatus =
  | "draft"
  | "scheduled"
  | "active"
  | "paused"
  | "expired"
  | "archived";

export type CampaignUrgencyMode = "automatic" | "force-awareness" | "force-final-hours";

export type CampaignUrgencyState =
  | "awareness"
  | "push"
  | "final-hours"
  | "final-six-hours"
  | "scheduled"
  | "expired"
  | "inactive";

export type CampaignType =
  | "seasonal"
  | "academic"
  | "umkm"
  | "bayar-seikhlasnya"
  | "service-promo"
  | "launch"
  | "other";

export type CampaignPlacements = {
  topBar: boolean;
  homepageInline: boolean;
  stickyFinalHours: boolean;
  dedicatedPage: boolean;
  modalOptional: boolean;
};

export type CampaignPlacementSettings = {
  allowOverlap?: boolean;
  homepageWeight?: "normal" | "strong";
  stickyAlwaysOnRouteOpen?: boolean;
};

export type CampaignGalleryItem = {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  caption?: string;
};

export type CampaignFaqItem = {
  question: string;
  answer: string;
};

export type CampaignAnalyticsPlaceholder = {
  utmCampaign?: string;
  goalName?: string;
  sourceNote?: string;
};

export type Campaign = {
  id: string;
  title: string;
  slug: string;
  status: CampaignStatus;
  shortLabel: string;
  headline: string;
  subheadline: string;
  description: string;
  body: string;
  ctaLabel: string;
  secondaryCtaLabel?: string;
  ctaHref?: string;
  secondaryCtaHref?: string;
  campaignType: CampaignType;
  audience: string;
  placementSettings?: CampaignPlacementSettings;
  startAt: string;
  endAt: string;
  timezone: string;
  urgencyMode: CampaignUrgencyMode;
  slotLimit?: number;
  slotUsed?: number;
  showCountdown: boolean;
  showBadge: boolean;
  isDismissible: boolean;
  placements: CampaignPlacements;
  visualVariant?: "default" | "highlight" | "editorial";
  themeVariant?: "cream" | "blue" | "warm";
  termsShort?: string;
  termsLong?: string;
  galleryItems: CampaignGalleryItem[];
  faqItems: CampaignFaqItem[];
  priority: number;
  createdAt?: string;
  updatedAt?: string;
  updatedByEmail?: string;
  updatedByUid?: string;
  analyticsPlaceholder?: CampaignAnalyticsPlaceholder;
};

export type CampaignPayload = Omit<Campaign, "id">;
