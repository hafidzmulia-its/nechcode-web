import { NextResponse } from "next/server";

import {
  createFaqItem,
  getVerifiedAdminActor,
  isFaqWriteEnabled,
  listAdminFaqItems,
  listPublicFaqItems,
  verifyAdminBearerToken,
} from "@/lib/faq/repository";
import type { FaqPayload } from "@/types/faq";

export async function GET(request: Request) {
  const isAdminMode = new URL(request.url).searchParams.get("mode") === "admin";

  if (isAdminMode) {
    const isAuthorized = await verifyAdminBearerToken(request.headers.get("authorization"));

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await listAdminFaqItems();

    return NextResponse.json({ items, writeEnabled: isFaqWriteEnabled() });
  }

  const items = await listPublicFaqItems();

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const actor = await getVerifiedAdminActor(request.headers.get("authorization"));

  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as FaqPayload;
    const item = await createFaqItem(payload, actor);

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create FAQ item.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
