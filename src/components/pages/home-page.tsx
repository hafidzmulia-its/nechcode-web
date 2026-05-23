import type { HomeContent } from "@/content/home";
import Image from "next/image";

import { AboutSection } from "@/components/sections/home/about-section";
import { ConsultSection } from "@/components/sections/home/consult-section";
import { HeroSection } from "@/components/sections/home/hero-section";
import { PrincipleSection } from "@/components/sections/home/principle-section";
import { ServicesSection } from "@/components/sections/home/services-section";
import { SiteFooter } from "@/components/sections/home/site-footer";

type HomePageProps = {
  content: HomeContent;
};

export function HomePage({ content }: HomePageProps) {
  return (
    <div>
      <div className="relative bg-[#041826]">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <div className="absolute inset-y-0 left-0 w-[49.8%]">
            <Image
              src="/img/bg_home_blur1.png"
              alt=""
              fill
              priority
              sizes="50vw"
              className="object-fill"
            />
          </div>

          <div className="absolute inset-y-0 right-0 w-[62.5%]">
            <Image
              src="/img/bg_home_blur2.png"
              alt=""
              fill
              priority
              sizes="63vw"
              className="object-fill"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[94.5%]">
            <Image
              src="/img/bg_home.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-fill"
            />
          </div>
        </div>

        <div className="relative z-10">
          <HeroSection />
        </div>
      </div>

      <main className="relative pt-0">
        <AboutSection about={content.about} />
        <PrincipleSection services={content.services} />
        <ServicesSection services={content.services} />
        <ConsultSection />
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
