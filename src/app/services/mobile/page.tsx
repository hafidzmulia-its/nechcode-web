import type { Metadata } from "next";

import { MobileServicePage } from "@/components/pages/mobile-service-page";
import { getHomeContent } from "@/content/home";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Layanan Mobile Apps",
  description:
    "Paket mobile app NechCode: dari MVP hingga aplikasi operasional terintegrasi — dibangun untuk kebutuhan nyata pengguna.",
  alternates: {
    canonical: `${siteConfig.url}/services/mobile`,
  },
  openGraph: {
    title: `Layanan Mobile Apps | ${siteConfig.name}`,
    description:
      "Paket mobile app NechCode: dari MVP hingga aplikasi operasional terintegrasi — dibangun untuk kebutuhan nyata pengguna.",
    url: `${siteConfig.url}/services/mobile`,
  },
};

export default function Page() {
  const content = getHomeContent();

  return <MobileServicePage content={content} />;
}
