import { NextResponse } from "next/server";

import {
  createCampaignItem,
  getVerifiedAdminActor,
  isCampaignWriteEnabled,
  listAdminCampaignItems,
  listPublicCampaignItems,
  verifyAdminBearerToken,
} from "@/lib/campaign/repository";
import type { CampaignPayload } from "@/types/campaign";

export async function GET(request: Request) {
  const isAdminMode = new URL(request.url).searchParams.get("mode") === "admin";

  if (isAdminMode) {
    const isAuthorized = await verifyAdminBearerToken(request.headers.get("authorization"));

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await listAdminCampaignItems();

    return NextResponse.json({ items, writeEnabled: isCampaignWriteEnabled() });
  }

  const items = await listPublicCampaignItems();

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const actor = await getVerifiedAdminActor(request.headers.get("authorization"));

  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as CampaignPayload;
    const item = await createCampaignItem(payload, actor);

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create campaign item.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
