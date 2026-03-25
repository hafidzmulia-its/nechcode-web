"use client";

import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";

import { CampaignBadge } from "@/components/campaign/campaign-badge";
import { CampaignCountdown } from "@/components/campaign/campaign-countdown";
import { useCampaignState } from "@/components/campaign/use-campaign-state";
import type { Campaign } from "@/types/campaign";

type CampaignInlineStripProps = {
  campaign: Campaign | null;
};

export function CampaignInlineStrip({ campaign }: CampaignInlineStripProps) {
  const state = useCampaignState(campaign);

  if (!campaign || !state || state.expired || state.urgencyState === "scheduled" || !campaign.placements.homepageInline) {
    return null;
  }

  const isPush = state.urgencyState === "push" || state.urgencyState === "final-hours" || state.urgencyState === "final-six-hours";
  const primaryHref = buildWhatsAppInquiryUrl({
    sourcePage: "Campaign homepage-inline",
    serviceInterest: campaign.title,
    packageInterest: campaign.shortLabel,
    campaignSlug: campaign.slug,
    campaignTitle: campaign.title,
    urgencyState: state.urgencyState,
    ctaOrigin: "homepage-inline",
    additionalNote: `Saya tertarik dengan campaign ${campaign.title} untuk batch saat ini.`,
  });
  const secondaryHref = campaign.secondaryCtaHref || `/campaign/${campaign.slug}#contoh`;

  return (
    <section className="-mt-12 mb-24 w-full px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-[1360px] rounded-[2rem] bg-surface-container-low p-1 md:p-2">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-surface-container-lowest p-8 md:p-12">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-secondary/10 to-transparent" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="lg:w-1/2">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white">
                  <span className="material-symbols-outlined text-base [font-variation-settings:'FILL'_1]">school</span>
                </span>
                {campaign.showBadge ? <CampaignBadge variant="strong">{campaign.shortLabel}</CampaignBadge> : null}
              </div>

              <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">{campaign.headline}</h2>
              <p className="mt-4 text-base leading-relaxed text-on-surface-variant md:text-lg">{campaign.subheadline}</p>

              <div className="mt-7 flex flex-wrap items-center gap-6">
                {campaign.showCountdown ? (
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">Time Remaining</p>
                    <CampaignCountdown
                      remainingMs={state.remainingMs}
                      mode={state.countdownMode}
                      forceShowSeconds
                    />
                  </div>
                ) : null}

                <div className="hidden h-10 w-px bg-outline-variant/30 md:block" />

                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">Message for Batch</p>
                  <p className="italic text-primary">&quot;The future belongs to the precise.&quot;</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex w-full flex-col gap-4 sm:flex-row lg:w-1/2">
              <a
                href={primaryHref}
                target="_blank"
                rel="noreferrer"
                className="group flex aspect-square flex-1 flex-col justify-between rounded-[1.4rem] bg-primary p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-container"
              >
                <span className="material-symbols-outlined text-4xl text-primary-fixed">auto_awesome</span>
                <div>
                  <h3 className="font-headline text-xl font-bold text-white">{campaign.ctaLabel || "Pesan untuk Batch April"}</h3>
                  <p className="mt-1 text-sm text-primary-fixed/80">Kirim brief cepat dan amankan slot campaign.</p>
                </div>
              </a>

              <a
                href={secondaryHref}
                className="group flex aspect-square flex-1 flex-col justify-between rounded-[1.4rem] bg-secondary-container p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary"
              >
                <span className="material-symbols-outlined text-4xl text-on-secondary-container transition-colors group-hover:text-white">visibility</span>
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-secondary-container transition-colors group-hover:text-white">{campaign.secondaryCtaLabel || "Lihat Contoh Format"}</h3>
                  <p className="mt-1 text-sm text-on-secondary-container/80 transition-colors group-hover:text-white/80">Lihat komposisi format digital gift untuk batch ini.</p>
                </div>
              </a>
            </div>
          </div>

          {campaign.termsShort ? <p className="mt-4 text-xs text-on-surface-variant/85">{campaign.termsShort}</p> : null}
        </div>
      </div>
    </section>
  );
}
