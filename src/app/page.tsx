import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home-page";
import { getHomeContent } from "@/content/home";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NechCode | Solusi Teknologi untuk Bisnis, UMKM, dan Organisasi",
  description:
    "NechCode hadir sebagai solusi teknologi dengan berfokus pada pengembangan software, sistem digital, AI, dan otomatisasi untuk membantu bisnis, UMKM, organisasi, serta masyarakat berkembang di era digital.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default async function Page() {
  const content = getHomeContent();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description:
      "NechCode hadir sebagai solusi teknologi untuk membantu bisnis, UMKM, organisasi, serta masyarakat berkembang di era digital.",
    sameAs: [
      siteConfig.socials.linkedin.href,
      siteConfig.socials.instagram.href,
      siteConfig.socials.tiktok.href,
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pengembangan Software, Sistem Digital, AI, dan Otomatisasi",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    serviceType: "Pengembangan software, sistem digital, AI, dan otomatisasi",
    areaServed: "Indonesia",
    description:
      "NechCode hadir sebagai solusi teknologi untuk membantu bisnis, UMKM, organisasi, serta masyarakat berkembang di era digital.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <HomePage content={content} />
    </>
  );
}
