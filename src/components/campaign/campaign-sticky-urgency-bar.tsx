"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CampaignCountdown } from "@/components/campaign/campaign-countdown";
import { CampaignCTAGroup } from "@/components/campaign/campaign-cta-group";
import { useCampaignState } from "@/components/campaign/use-campaign-state";
import type { Campaign } from "@/types/campaign";

type CampaignStickyUrgencyBarProps = {
  campaign: Campaign | null;
};

function dismissKey(slug: string) {
  return `campaign-dismissed-sticky:${slug}`;
}

export function CampaignStickyUrgencyBar({ campaign }: CampaignStickyUrgencyBarProps) {
  const state = useCampaignState(campaign);
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const alwaysOnRouteOpen = Boolean(campaign?.placementSettings?.stickyAlwaysOnRouteOpen);

  useEffect(() => {
    if (!campaign || !campaign.isDismissible) {
      setDismissed(false);
      return;
    }

    if (alwaysOnRouteOpen) {
      setDismissed(false);
      return;
    }

    const stored = window.sessionStorage.getItem(dismissKey(campaign.slug));
    setDismissed(stored === "1");
  }, [campaign?.slug, campaign?.isDismissible, alwaysOnRouteOpen, pathname]);

  if (!campaign || !state || dismissed || state.expired || !campaign.placements.stickyFinalHours) {
    return null;
  }

  if (!alwaysOnRouteOpen && state.urgencyState !== "final-hours" && state.urgencyState !== "final-six-hours") {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[76px] z-[70] px-3 md:top-[92px] md:px-6">
      <div className="pointer-events-auto mx-auto w-full max-w-[1280px] rounded-2xl border border-primary/30 bg-[linear-gradient(120deg,rgba(29,90,141,0.95),rgba(12,70,117,0.95))] px-4 py-3 text-white shadow-[0_16px_30px_rgba(16,39,61,0.25)]">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-secondary-container">
            {alwaysOnRouteOpen
              ? "Campaign aktif saat ini"
              : state.urgencyState === "final-six-hours"
                ? "Batch hampir ditutup"
                : "Batch berakhir kurang dari 24 jam"}
          </p>
          <CampaignCountdown remainingMs={state.remainingMs} mode={state.countdownMode} compact />
          <div className="ml-auto">
            <CampaignCTAGroup campaign={campaign} urgencyState={state.urgencyState} origin="final-hours-sticky" compact />
          </div>
          {campaign.isDismissible ? (
            <button
              type="button"
              aria-label="Tutup sticky campaign"
              onClick={() => {
                window.sessionStorage.setItem(dismissKey(campaign.slug), "1");
                setDismissed(true);
              }}
              className="rounded-md border border-white/35 p-1"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
