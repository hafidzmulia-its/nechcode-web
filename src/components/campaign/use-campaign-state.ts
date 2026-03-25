"use client";

import { useEffect, useMemo, useState } from "react";

import { getRemainingMs, resolveCampaignUrgencyState, resolveCountdownMode } from "@/lib/campaign/urgency";
import type { Campaign, CampaignUrgencyState } from "@/types/campaign";

type CampaignState = {
  urgencyState: CampaignUrgencyState;
  remainingMs: number;
  countdownMode: "days-hours" | "days-hours-minutes" | "hours-minutes-seconds" | "flip-hours-minutes-seconds";
  expired: boolean;
};

export function useCampaignState(campaign: Campaign | null, forcedUrgency?: Campaign["urgencyMode"]) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!campaign?.showCountdown) {
      return;
    }

    const interval = window.setInterval(() => setNow(Date.now()), 1000);

    return () => window.clearInterval(interval);
  }, [campaign?.showCountdown]);

  const state = useMemo<CampaignState | null>(() => {
    if (!campaign) {
      return null;
    }

    const target = forcedUrgency ? { ...campaign, urgencyMode: forcedUrgency } : campaign;
    const urgencyState = resolveCampaignUrgencyState(target, new Date(now));
    const remainingMs = getRemainingMs(target, new Date(now));

    return {
      urgencyState,
      remainingMs,
      countdownMode: resolveCountdownMode(urgencyState),
      expired: urgencyState === "expired" || remainingMs <= 0,
    };
  }, [campaign, forcedUrgency, now]);

  return state;
}
