import type { Campaign, CampaignUrgencyState } from "@/types/campaign";

export type CampaignCountdownMode =
  | "days-hours"
  | "days-hours-minutes"
  | "hours-minutes-seconds"
  | "flip-hours-minutes-seconds";

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

function toMs(value: string) {
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : NaN;
}

export function isCampaignWithinActiveWindow(campaign: Campaign, now = new Date()) {
  const nowMs = now.getTime();
  const startMs = toMs(campaign.startAt);
  const endMs = toMs(campaign.endAt);

  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) {
    return false;
  }

  return nowMs >= startMs && nowMs < endMs;
}

export function resolveCampaignUrgencyState(campaign: Campaign, now = new Date()): CampaignUrgencyState {
  const status = campaign.status;
  const nowMs = now.getTime();
  const startMs = toMs(campaign.startAt);
  const endMs = toMs(campaign.endAt);

  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || startMs >= endMs) {
    return "inactive";
  }

  if (status === "draft" || status === "archived" || status === "paused") {
    return "inactive";
  }

  if (status === "expired" || nowMs >= endMs) {
    return "expired";
  }

  if (nowMs < startMs || status === "scheduled") {
    return "scheduled";
  }

  if (campaign.urgencyMode === "force-awareness") {
    return "awareness";
  }

  if (campaign.urgencyMode === "force-final-hours") {
    return endMs - nowMs <= 6 * HOUR_MS ? "final-six-hours" : "final-hours";
  }

  const remainingMs = endMs - nowMs;

  if (remainingMs <= 6 * HOUR_MS) {
    return "final-six-hours";
  }

  if (remainingMs <= HOUR_MS * 24) {
    return "final-hours";
  }

  if (remainingMs <= DAY_MS * 7) {
    return "push";
  }

  return "awareness";
}

export function resolveCountdownMode(state: CampaignUrgencyState): CampaignCountdownMode {
  if (state === "final-six-hours") {
    return "flip-hours-minutes-seconds";
  }

  if (state === "final-hours") {
    return "hours-minutes-seconds";
  }

  if (state === "push") {
    return "days-hours-minutes";
  }

  return "days-hours";
}

export function resolveEffectiveCampaignStatus(campaign: Campaign, now = new Date()) {
  const urgency = resolveCampaignUrgencyState(campaign, now);

  if (urgency === "expired") {
    return "expired";
  }

  if (urgency === "scheduled") {
    return "scheduled";
  }

  if (urgency === "inactive") {
    return campaign.status;
  }

  return "active";
}

export function getRemainingMs(campaign: Campaign, now = new Date()) {
  const endMs = toMs(campaign.endAt);

  if (!Number.isFinite(endMs)) {
    return 0;
  }

  return Math.max(0, endMs - now.getTime());
}
