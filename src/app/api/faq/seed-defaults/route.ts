import { NextResponse } from "next/server";

import {
  getVerifiedAdminActor,
  seedDefaultFaqItems,
} from "@/lib/faq/repository";

export async function POST(request: Request) {
  const actor = await getVerifiedAdminActor(request.headers.get("authorization"));

  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await seedDefaultFaqItems(actor);

    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to seed default FAQ items.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
