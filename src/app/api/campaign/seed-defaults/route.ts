import { NextResponse } from "next/server";

import {
  getVerifiedAdminActor,
  seedDefaultCampaignItems,
} from "@/lib/campaign/repository";

export async function POST(request: Request) {
  const actor = await getVerifiedAdminActor(request.headers.get("authorization"));

  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await seedDefaultCampaignItems(actor);

    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to seed default campaign items.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
