import type { HomeContent } from "@/content/home";
import type { PortfolioItem } from "@/types/portfolio";

import { AboutSection } from "@/components/sections/home/about-section";
import { FaqSection } from "../sections/home/faq-section";
import { FinalCtaSection } from "@/components/sections/home/final-cta-section";
import { HeroSection } from "@/components/sections/home/hero-section";
import { ProblemsSection } from "@/components/sections/home/problems-section";
import { ProcessSection } from "@/components/sections/home/process-section";
import { SelectedWorksSection } from "../sections/home/selected-works-section";
import { ServicesSection } from "@/components/sections/home/services-section";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import { TrustStripSection } from "@/components/sections/home/trust-strip-section";
import { WhyPartnerSection } from "@/components/sections/home/why-partner-section";

type HomePageProps = {
  content: HomeContent;
  portfolioItems: PortfolioItem[];
};

export function HomePage({ content, portfolioItems }: HomePageProps) {
  return (
    <div className="selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar brand={content.brand} nav={content.nav} cta={content.headerCta} />

      <main className="relative pt-0">
        <HeroSection hero={content.hero} />
        <TrustStripSection trustStrip={content.trustStrip} />
        <ServicesSection services={content.services} />
        <WhyPartnerSection whyPartner={content.whyPartner} />
        <SelectedWorksSection works={content.works} items={portfolioItems} />
        <AboutSection about={content.about} />
        <ProblemsSection problems={content.problems} />
        <ProcessSection process={content.process} />
        <FaqSection faq={content.faq} />
        <FinalCtaSection cta={content.cta} />
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
