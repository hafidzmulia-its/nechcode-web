import type { Metadata } from "next";

import { WebServicePage } from "@/components/pages/web-service-page";
import { getHomeContent } from "@/content/home";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Layanan Website",
  description:
    "Paket website NechCode: company profile, landing page, katalog, hingga sistem custom — kredibel, cepat, dan tumbuh sesuai kebutuhan tim Anda.",
  alternates: {
    canonical: `${siteConfig.url}/services/web`,
  },
  openGraph: {
    title: `Layanan Website | ${siteConfig.name}`,
    description:
      "Paket website NechCode: company profile, landing page, katalog, hingga sistem custom — kredibel, cepat, dan tumbuh sesuai kebutuhan tim Anda.",
    url: `${siteConfig.url}/services/web`,
  },
};

export default function Page() {
  const content = getHomeContent();

  return <WebServicePage content={content} />;
}
