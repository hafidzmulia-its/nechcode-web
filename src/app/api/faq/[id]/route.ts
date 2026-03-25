import { NextResponse } from "next/server";

import {
  deleteFaqItem,
  getVerifiedAdminActor,
  updateFaqItem,
} from "@/lib/faq/repository";
import type { FaqPayload } from "@/types/faq";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const actor = await getVerifiedAdminActor(request.headers.get("authorization"));

  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const payload = (await request.json()) as Partial<FaqPayload>;
    const item = await updateFaqItem(id, payload, actor);

    return NextResponse.json({ item });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update FAQ item.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const actor = await getVerifiedAdminActor(request.headers.get("authorization"));

  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await deleteFaqItem(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete FAQ item.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
