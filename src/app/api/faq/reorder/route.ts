import { NextResponse } from "next/server";

import {
  getVerifiedAdminActor,
  reorderFaqItems,
} from "@/lib/faq/repository";

type ReorderPayload = {
  ids: string[];
};

export async function POST(request: Request) {
  const actor = await getVerifiedAdminActor(request.headers.get("authorization"));

  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as ReorderPayload;

    if (!Array.isArray(payload.ids) || payload.ids.length === 0) {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    await reorderFaqItems(payload.ids, actor);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to reorder FAQ items.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
