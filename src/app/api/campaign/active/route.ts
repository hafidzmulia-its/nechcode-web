import { NextResponse } from "next/server";

import { getActiveCampaignPlacements } from "@/lib/campaign/repository";
import { resolveCampaignUrgencyState } from "@/lib/campaign/urgency";

export async function GET() {
  const placements = await getActiveCampaignPlacements();

  const withUrgency = {
    topBar: placements.topBar
      ? {
          ...placements.topBar,
          urgencyState: resolveCampaignUrgencyState(placements.topBar),
        }
      : null,
    homepageInline: placements.homepageInline
      ? {
          ...placements.homepageInline,
          urgencyState: resolveCampaignUrgencyState(placements.homepageInline),
        }
      : null,
    stickyFinalHours: placements.stickyFinalHours
      ? {
          ...placements.stickyFinalHours,
          urgencyState: resolveCampaignUrgencyState(placements.stickyFinalHours),
        }
      : null,
  };

  return NextResponse.json(withUrgency);
}
