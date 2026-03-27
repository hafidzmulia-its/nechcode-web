import type { Metadata } from "next";

import { ServicesPage } from "@/components/pages/services-page";
import { getHomeContent } from "@/content/home";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Layanan NechCode: pembuatan web app kustom, sistem internal bisnis, automasi workflow, dan integrasi AI — untuk tim yang ingin bergerak lebih efisien.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: `Layanan | ${siteConfig.name}`,
    description:
      "Layanan NechCode: pembuatan web app kustom, sistem internal bisnis, automasi workflow, dan integrasi AI — untuk tim yang ingin bergerak lebih efisien.",
    url: `${siteConfig.url}/services`,
  },
};

type ServicesPageRouteProps = {
  searchParams: Promise<{ pillar?: string }>;
};

export default async function Page({ searchParams }: ServicesPageRouteProps) {
  const content = getHomeContent();
  const params = await searchParams;

  return <ServicesPage content={content} initialPillar={params.pillar} />;
}
