"use client";

import { useEffect, useState } from "react";

import { CampaignInlineStrip } from "@/components/campaign/campaign-inline-strip";
import type { Campaign } from "@/types/campaign";

type ActiveCampaignResponse = {
  homepageInline: Campaign | null;
};

export function CampaignHomepageInlineSlot() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      const response = await fetch("/api/campaign/active", { cache: "no-store" });
      const data = (await response.json()) as ActiveCampaignResponse;

      if (active) {
        setCampaign(data.homepageInline ?? null);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  return <CampaignInlineStrip campaign={campaign} />;
}
