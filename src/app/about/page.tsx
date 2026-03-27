import type { Metadata } from "next";

import { AboutPage } from "@/components/pages/about-page";
import { getHomeContent } from "@/content/home";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali NechCode — tim yang membantu bisnis Indonesia membangun web app kustom, sistem internal, dan automasi workflow yang rapi dan siap dikembangkan jangka panjang.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: `Tentang Kami | ${siteConfig.name}`,
    description:
      "Kenali NechCode — tim yang membantu bisnis Indonesia membangun web app kustom, sistem internal, dan automasi workflow yang rapi dan siap dikembangkan jangka panjang.",
    url: `${siteConfig.url}/about`,
  },
};

export default function Page() {
  const content = getHomeContent();

  return <AboutPage content={content} />;
}
