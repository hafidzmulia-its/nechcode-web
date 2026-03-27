import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home-page";
import { getHomeContent } from "@/content/home";
import { siteConfig } from "@/config/site";
import { listPublicFaqItems } from "@/lib/faq/repository";
import { listPublicPortfolioItems } from "@/lib/portfolio/repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NechCode | Web App Kustom, Sistem Internal, dan Automasi Workflow untuk Operasional Bisnis",
  description:
    "NechCode membangun web app kustom, sistem internal, dan automasi workflow untuk tim yang ingin mengurangi kerja admin manual serta meningkatkan efisiensi operasional.",
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
  const faqItems = await listPublicFaqItems();
  const portfolioItems = await listPublicPortfolioItems();
  const pageContent = {
    ...content,
    faq: {
      ...content.faq,
      items: faqItems.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description:
      "NechCode membantu tim Anda membangun website, sistem internal, dan alur kerja berbasis AI yang rapi, mudah dipakai, dan siap dikembangkan jangka panjang.",
    sameAs: [
      siteConfig.socials.linkedin.href,
      siteConfig.socials.instagram.href,
      siteConfig.socials.tiktok.href,
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website, Sistem Internal, dan Alur Kerja Berbasis AI",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    serviceType: "Pengembangan website, sistem internal, dan alur kerja berbasis AI",
    areaServed: "Indonesia",
    description:
      "NechCode membantu tim Anda membangun website, sistem internal, dan alur kerja berbasis AI yang rapi, mudah dipakai, dan siap dikembangkan jangka panjang.",
  };

  const faqJsonLd =
    pageContent.faq.items.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pageContent.faq.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}
      <HomePage content={pageContent} portfolioItems={portfolioItems} />
    </>
  );
}
