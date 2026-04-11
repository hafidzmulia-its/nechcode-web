"use client";

import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import {
  ServiceHero,
  ServicePortfolio,
  ServicePricing,
  ServiceSpecialProgram,
} from "@/components/sections/services";
import type { HomeContent } from "@/content/home";
import { servicePageCopy } from "@/content/service-pages";
import { getServicePillarById } from "@/content/services";

type MobileServicePageProps = {
  content: HomeContent;
};

export function MobileServicePage({ content }: MobileServicePageProps) {
  const pillar = getServicePillarById("mobile");
  const copy = servicePageCopy.mobile;

  return (
    <div className="selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar
        brand={content.brand}
        nav={content.nav}
        cta={content.headerCta}
      />

      <main className="pb-24 md:pb-32">
        <ServiceHero hero={copy.hero} />
        <ServicePortfolio {...copy.portfolio} />
        <ServiceSpecialProgram />
        <ServicePricing
          title={copy.pricing.title}
          pillar={pillar}
          ctaSubnote="Konsultasi gratis sebelum mulai"
        />
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
