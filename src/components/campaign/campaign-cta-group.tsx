import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import type { Campaign, CampaignUrgencyState } from "@/types/campaign";

type CampaignCTAGroupProps = {
  campaign: Campaign;
  urgencyState: CampaignUrgencyState;
  origin: "announcement-bar" | "homepage-inline" | "campaign-page" | "final-hours-sticky";
  compact?: boolean;
};

function buildCampaignCta(campaign: Campaign, urgencyState: CampaignUrgencyState, origin: CampaignCTAGroupProps["origin"]) {
  return buildWhatsAppInquiryUrl({
    sourcePage: `Campaign ${origin}`,
    serviceInterest: campaign.title,
    packageInterest: campaign.shortLabel,
    mainNeed: `Campaign: ${campaign.slug}`,
    campaignSlug: campaign.slug,
    campaignTitle: campaign.title,
    urgencyState,
    ctaOrigin: origin,
    additionalNote: `Saya tertarik dengan campaign ${campaign.title} dan ingin diskusi lebih lanjut.`,
  });
}

export function CampaignCTAGroup({ campaign, urgencyState, origin, compact = false }: CampaignCTAGroupProps) {
  const primaryHref = buildCampaignCta(campaign, urgencyState, origin);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={primaryHref}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 font-bold !text-white transition hover:opacity-90 ${compact ? "text-xs" : "text-sm"}`}
      >
        {campaign.ctaLabel}
      </a>
      {campaign.secondaryCtaLabel ? (
        <a
          href={campaign.secondaryCtaHref || `/campaign/${campaign.slug}`}
          className={`inline-flex items-center justify-center rounded-xl border border-primary/20 bg-surface px-4 py-2.5 font-bold text-primary transition hover:bg-surface-container-low ${compact ? "text-xs" : "text-sm"}`}
        >
          {campaign.secondaryCtaLabel}
        </a>
      ) : null}
    </div>
  );
}
