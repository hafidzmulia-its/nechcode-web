import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CampaignPage } from "@/components/pages/campaign-page";
import { getHomeContent } from "@/content/home";
import { siteConfig } from "@/config/site";
import { getPublicCampaignBySlug } from "@/lib/campaign/repository";

type CampaignRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: CampaignRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = await getPublicCampaignBySlug(slug);

  if (!campaign) {
    return {
      title: "Kampanye Tidak Ditemukan",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: campaign.headline,
    description: campaign.description,
    alternates: {
      canonical: `${siteConfig.url}/campaign/${slug}`,
    },
    openGraph: {
      title: `${campaign.headline} | ${siteConfig.name}`,
      description: campaign.description,
      url: `${siteConfig.url}/campaign/${slug}`,
    },
  };
}

export default async function Page({ params }: CampaignRouteProps) {
  const { slug } = await params;
  const campaign = await getPublicCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const content = getHomeContent();

  return <CampaignPage content={content} campaign={campaign} />;
}
