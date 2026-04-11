import type { Metadata } from "next";

import { ServicesPage } from "@/components/pages/services-page";
import { getHomeContent } from "@/content/home";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Layanan digital NechCode: website, mobile app, dan AI automation — mulai dari paket awal hingga implementasi custom sesuai kebutuhan bisnis.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: `Layanan | ${siteConfig.name}`,
    description:
      "Layanan digital NechCode: website, mobile app, dan AI automation — mulai dari paket awal hingga implementasi custom sesuai kebutuhan bisnis.",
    url: `${siteConfig.url}/services`,
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ pillar?: string }>;
}) {
  const content = getHomeContent();
  const params = await searchParams;

  return <ServicesPage content={content} initialPillar={params.pillar} />;
}
