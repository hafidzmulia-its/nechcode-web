"use client";

import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CampaignBadge } from "@/components/campaign/campaign-badge";
import { useCampaignState } from "@/components/campaign/use-campaign-state";
import type { Campaign } from "@/types/campaign";

type CampaignAnnouncementBarProps = {
  campaign: Campaign | null;
};

function dismissKey(slug: string) {
  return `campaign-dismissed-topbar:${slug}`;
}

function formatCompactTimer(remainingMs: number) {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(days).padStart(2, "0")}H ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function CampaignAnnouncementBar({ campaign }: CampaignAnnouncementBarProps) {
  const state = useCampaignState(campaign);
  const [dismissed, setDismissed] = useState(false);

  const hidden = useMemo(() => {
    if (!campaign || !state) {
      return true;
    }

    if (state.expired || state.urgencyState === "scheduled" || state.urgencyState === "inactive") {
      return true;
    }

    if (!campaign.placements.topBar) {
      return true;
    }

    return dismissed;
  }, [campaign, dismissed, state]);

  useEffect(() => {
    if (!campaign || !campaign.isDismissible) {
      setDismissed(false);
      return;
    }

    const stored = window.localStorage.getItem(dismissKey(campaign.slug));
    setDismissed(stored === "1");
  }, [campaign?.slug, campaign?.isDismissible]);

  if (!campaign || !state || hidden) {
    return null;
  }

  return (
    <aside className="relative z-[100] w-full overflow-hidden border-b border-primary/20 bg-primary px-4 py-3 text-primary-fixed md:px-8">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col items-center justify-center gap-3 text-center md:flex-row md:gap-4 md:text-left">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] md:text-sm">
          <span className="material-symbols-outlined text-base">campaign</span>
          {campaign.showBadge ? <CampaignBadge>{campaign.shortLabel}</CampaignBadge> : null}
          <span className="text-primary-fixed">{campaign.title} aktif</span>
        </span>

        <span className="hidden text-primary-fixed/40 md:inline">|</span>

        <span className="inline-flex items-center gap-2 text-xs font-medium md:text-sm">
          Penawaran berakhir dalam
          {campaign.showCountdown ? (
            <span suppressHydrationWarning className="rounded-md bg-primary-container px-2.5 py-1 font-headline text-sm font-bold tabular-nums text-on-primary-container shadow-[inset_0_-1px_0_rgba(0,0,0,0.12)]">
              {formatCompactTimer(state.remainingMs)}
            </span>
          ) : null}
        </span>

        <a
          href={`/campaign/${campaign.slug}`}
          className="font-bold underline underline-offset-4 transition-colors hover:text-secondary-fixed"
        >
          Lihat Detail
        </a>

        {campaign.isDismissible ? (
          <button
            type="button"
            aria-label="Tutup announcement campaign"
            onClick={() => {
              window.localStorage.setItem(dismissKey(campaign.slug), "1");
              setDismissed(true);
            }}
            className="rounded-md border border-primary-fixed/35 p-1 text-primary-fixed"
          >
            <X size={14} />
          </button>
        ) : null}
      </div>
    </aside>
  );
}
