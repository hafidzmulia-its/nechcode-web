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

type WebServicePageProps = {
  content: HomeContent;
};

export function WebServicePage({ content }: WebServicePageProps) {
  const pillar = getServicePillarById("web");
  const copy = servicePageCopy.web;

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
        <ServicePricing title={copy.pricing.title} pillar={pillar} />
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
