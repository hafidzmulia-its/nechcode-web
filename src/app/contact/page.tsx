import type { Metadata } from "next";

import { ContactPage } from "@/components/pages/contact-page";
import { getHomeContent } from "@/content/home";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Hubungi NechCode untuk konsultasi gratis seputar web app, sistem internal, atau automasi workflow. Ceritakan kebutuhan bisnis Anda, kami bantu wujudkan.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: `Hubungi Kami | ${siteConfig.name}`,
    description:
      "Hubungi NechCode untuk konsultasi gratis seputar web app, sistem internal, atau automasi workflow. Ceritakan kebutuhan bisnis Anda, kami bantu wujudkan.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function Page() {
  const content = getHomeContent();

  return <ContactPage content={content} />;
}
