"use client";

import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import Image from "next/image";

import { useCampaignState } from "@/components/campaign/use-campaign-state";
import type { Campaign } from "@/types/campaign";

type CampaignHeroCountdownProps = {
  campaign: Campaign;
};

export function CampaignHeroCountdown({ campaign }: CampaignHeroCountdownProps) {
  const state = useCampaignState(campaign);

  if (!state || state.expired || state.urgencyState === "scheduled") {
    return null;
  }

  const primaryHref = buildWhatsAppInquiryUrl({
    sourcePage: "Campaign hero",
    serviceInterest: campaign.title,
    packageInterest: campaign.shortLabel,
    campaignSlug: campaign.slug,
    campaignTitle: campaign.title,
    urgencyState: state.urgencyState,
    ctaOrigin: "campaign-page-hero",
    additionalNote: `Saya ingin pesan campaign ${campaign.title}.`,
  });

  const totalSeconds = Math.max(0, Math.floor(state.remainingMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const heroImage = campaign.galleryItems[0]?.imageUrl;
  const heroImageAlt = campaign.galleryItems[0]?.imageAlt || "Campaign visual";

  return (
    <section className="relative overflow-hidden px-6 py-20 text-center md:px-8 md:py-32 lg:px-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2 opacity-20">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-secondary-fixed blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[30%] rounded-full bg-primary-fixed blur-[100px]" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl">
        <span className="inline-block rounded-full bg-secondary-fixed px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-on-secondary-fixed">
          {campaign.shortLabel}
        </span>

        <h1 className="mt-6 font-headline text-4xl font-bold leading-[1.1] tracking-tight text-primary md:text-7xl">
          {campaign.headline}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
          {campaign.subheadline}
        </p>

        {campaign.showCountdown ? (
          <div className="mx-auto mt-8 grid max-w-lg grid-cols-4 gap-4 pt-2">
            <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-[0_20px_40px_rgba(30,28,17,0.06)]">
              <p suppressHydrationWarning className="font-headline text-3xl font-bold text-primary">{String(days).padStart(2, "0")}</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-on-surface-variant">Hari</p>
            </div>
            <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-[0_20px_40px_rgba(30,28,17,0.06)]">
              <p suppressHydrationWarning className="font-headline text-3xl font-bold text-primary">{String(hours).padStart(2, "0")}</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-on-surface-variant">Jam</p>
            </div>
            <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-[0_20px_40px_rgba(30,28,17,0.06)]">
              <p suppressHydrationWarning className="font-headline text-3xl font-bold text-primary">{String(minutes).padStart(2, "0")}</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-on-surface-variant">Menit</p>
            </div>
            <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-[0_20px_40px_rgba(30,28,17,0.06)]">
              <p suppressHydrationWarning className="font-headline text-3xl font-bold text-primary">{String(seconds).padStart(2, "0")}</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-on-surface-variant">Detik</p>
            </div>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={primaryHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 font-headline text-lg font-bold !text-white transition hover:opacity-90"
          >
            {campaign.ctaLabel || "Pesan Sekarang"}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </a>
          <a
            href={campaign.secondaryCtaHref || `/campaign/${campaign.slug}#contoh`}
            className="inline-flex items-center justify-center rounded-full bg-surface-container-high px-10 py-4 font-headline text-lg font-bold text-primary transition hover:bg-surface-container-highest"
          >
            {campaign.secondaryCtaLabel || "Eksplorasi Katalog"}
          </a>
        </div>
      </div>

      {/* {heroImage ? (
        <div className="relative mx-auto mt-20 w-full max-w-6xl px-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border-8 border-surface-container-lowest bg-surface-container-low shadow-[0_20px_40px_rgba(30,28,17,0.06)]">
            <Image
              src={heroImage}
              alt={heroImageAlt}
              fill
              className="object-cover grayscale-[20%] sepia-[10%]"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>
        </div>
      ) : null} */}
    </section>
  );
}
