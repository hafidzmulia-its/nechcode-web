import { NextResponse } from "next/server";

import {
  createPortfolioItem,
  getVerifiedAdminActor,
  isPortfolioWriteEnabled,
  listAdminPortfolioItems,
  listPublicPortfolioItems,
  verifyAdminBearerToken,
} from "@/lib/portfolio/repository";
import type { PortfolioPayload } from "@/types/portfolio";

export async function GET(request: Request) {
  const isAdminMode = new URL(request.url).searchParams.get("mode") === "admin";

  if (isAdminMode) {
    const isAuthorized = await verifyAdminBearerToken(request.headers.get("authorization"));

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await listAdminPortfolioItems();

    return NextResponse.json({ items, writeEnabled: isPortfolioWriteEnabled() });
  }

  const items = await listPublicPortfolioItems();

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const actor = await getVerifiedAdminActor(request.headers.get("authorization"));

  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as PortfolioPayload;
    const item = await createPortfolioItem(payload, actor);

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create portfolio item.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
