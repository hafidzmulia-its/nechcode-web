import type { HomeContent } from "@/content/home";

import { CampaignHomepageInlineSlot } from "@/components/campaign/campaign-homepage-inline-slot";
import { FinalCtaSection } from "@/components/sections/home/final-cta-section";
import { HeroSection } from "@/components/sections/home/hero-section";
import { ProcessSection } from "@/components/sections/home/process-section";
import { ServicesSection } from "@/components/sections/home/services-section";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import { TrustStripSection } from "@/components/sections/home/trust-strip-section";
import { WhyPartnerSection } from "@/components/sections/home/why-partner-section";

type HomePageProps = {
  content: HomeContent;
};

export function HomePage({ content }: HomePageProps) {
  return (
    <div className="selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar brand={content.brand} nav={content.nav} cta={content.headerCta} />

      <main className="relative pt-0">
        <HeroSection hero={content.hero} />
        <CampaignHomepageInlineSlot />
        <TrustStripSection trustStrip={content.trustStrip} />
        <ServicesSection services={content.services} />
        <WhyPartnerSection whyPartner={content.whyPartner} />
        <ProcessSection process={content.process} />
        <FinalCtaSection cta={content.cta} />
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
