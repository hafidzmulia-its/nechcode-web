import { notFound } from "next/navigation";

import { CampaignPage } from "@/components/pages/campaign-page";
import { getHomeContent } from "@/content/home";
import { getPublicCampaignBySlug } from "@/lib/campaign/repository";

type CampaignRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function Page({ params }: CampaignRouteProps) {
  const { slug } = await params;
  const campaign = await getPublicCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const content = getHomeContent();

  return <CampaignPage content={content} campaign={campaign} />;
}
