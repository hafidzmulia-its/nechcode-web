import { NextResponse } from "next/server";

import {
  deletePortfolioItem,
  getVerifiedAdminActor,
  updatePortfolioItem,
} from "@/lib/portfolio/repository";
import type { PortfolioPayload } from "@/types/portfolio";

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
    const payload = (await request.json()) as Partial<PortfolioPayload>;
    const item = await updatePortfolioItem(id, payload, actor);

    return NextResponse.json({ item });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update portfolio item.";

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
    await deletePortfolioItem(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete portfolio item.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
