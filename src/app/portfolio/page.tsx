import type { Metadata } from "next";

import { PortfolioPage } from "@/components/pages/portfolio-page";
import { getHomeContent } from "@/content/home";
import { siteConfig } from "@/config/site";
import { listPublicPortfolioItems } from "@/lib/portfolio/repository";

export const metadata: Metadata = {
  title: "Portofolio",
  description:
    "Lihat proyek-proyek yang telah NechCode bangun — website, sistem internal, dan automasi workflow untuk berbagai klien bisnis di Indonesia.",
  alternates: {
    canonical: `${siteConfig.url}/portfolio`,
  },
  openGraph: {
    title: `Portofolio | ${siteConfig.name}`,
    description:
      "Lihat proyek-proyek yang telah NechCode bangun — website, sistem internal, dan automasi workflow untuk berbagai klien bisnis di Indonesia.",
    url: `${siteConfig.url}/portfolio`,
  },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const content = getHomeContent();
  const items = await listPublicPortfolioItems();

  return <PortfolioPage content={content} items={items} />;
}
