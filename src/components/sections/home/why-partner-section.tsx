import Image from "next/image";

import { layoutContainer } from "@/config/layout";
import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type WhyPartnerSectionProps = {
  whyPartner: HomeContent["whyPartner"];
};

export function WhyPartnerSection({ whyPartner }: WhyPartnerSectionProps) {
  const [firstStat, secondStat] = whyPartner.stats;

  return (
    <section
      id="kemitraan"
      className="w-full overflow-hidden bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className={layoutContainer}>
        <Reveal y={24} duration={0.45}>
          <div className="relative hidden lg:block">
            <div className="relative aspect-[1682/664] w-full">
              <Image
                src="/img/asset5.png"
                alt={whyPartner.heading}
                fill
                priority
                className="object-contain object-top"
                sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 960px, 100vw"
              />
            </div>

            <div className="absolute left-[47.5%] top-[24%] bottom-[12%] flex w-[38%] flex-col justify-between desktop:left-[49%] desktop:top-[25%] desktop:bottom-[14%] desktop:w-[34%]">
              <div>
                <p className="text-[clamp(1.6rem,2vw,2.15rem)] font-semibold leading-[1.25] text-[#1e1c11] desktop:text-[clamp(1.9rem,1.9vw,2.35rem)]">
                  Kami <span className="text-brand-accent">bukan</span> vendor
                  biasa.
                </p>
                <p className="mt-4 max-w-[24ch] text-[clamp(1rem,1.15vw,1.22rem)] leading-[1.45] text-[#1e1c11] desktop:max-w-[26ch] desktop:text-[clamp(1.05rem,1vw,1.18rem)]">
                  Anda berkomunikasi langsung dengan praktisi yang paham konteks
                  bisnis, bukan sekadar pengembang yang menunggu brief.
                </p>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] items-start gap-x-8 desktop:gap-x-10">
                <div className="pr-2 desktop:pr-4">
                  <p className="font-headline text-[clamp(4rem,5vw,5.6rem)] leading-none text-brand-accent desktop:text-[clamp(4.5rem,4.4vw,6.2rem)]">
                    {firstStat?.value}
                  </p>
                  <p className="mt-4 max-w-[18ch] text-[1.08rem] leading-[1.4] text-[#1e1c11] desktop:max-w-[20ch]">
                    {firstStat?.description}
                  </p>
                </div>

                <div className="h-full min-h-[9rem] bg-[#1e1c11]/18" />

                <div className="pl-2 desktop:pl-4">
                  <p className="font-headline text-[clamp(4rem,5vw,5.6rem)] leading-none text-brand-accent desktop:text-[clamp(4.5rem,4.4vw,6.2rem)]">
                    {secondStat?.value}
                  </p>
                  <p className="mt-4 max-w-[18ch] text-[1.08rem] leading-[1.4] text-[#1e1c11] desktop:max-w-[20ch]">
                    {secondStat?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal y={24} duration={0.45}>
          <div className="lg:hidden">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[420px]">
              <Image
                src="/img/asset5_mobile.png"
                alt={whyPartner.heading}
                fill
                className="object-contain object-bottom"
                sizes="(min-width: 640px) 420px, 92vw"
              />
            </div>

            <div className="mx-auto mt-6 max-w-[680px]">
              <h2 className="font-headline text-[clamp(2rem,8vw,2.8rem)] leading-[1.05] text-[#1e1c11]">
                {whyPartner.heading}
              </h2>
              <p className="mt-4 text-2xl font-semibold leading-[1.25] text-[#1e1c11] sm:text-[2rem]">
                Kami <span className="text-brand-accent">bukan</span> vendor
                biasa.
              </p>
              <p className="mt-4 text-base leading-[1.55] text-[#1e1c11] sm:text-lg">
                Anda berkomunikasi langsung dengan praktisi yang paham konteks
                bisnis, bukan sekadar pengembang yang menunggu brief.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-8 border-t border-[#1e1c11]/12 pt-8 sm:grid-cols-2 sm:gap-6">
                <div>
                  <p className="font-headline text-6xl leading-none text-brand-accent sm:text-7xl">
                    {firstStat?.value}
                  </p>
                  <p className="mt-4 text-sm leading-[1.55] text-[#1e1c11] sm:text-base">
                    {firstStat?.description}
                  </p>
                </div>

                <div>
                  <p className="font-headline text-6xl leading-none text-brand-accent sm:text-7xl">
                    {secondStat?.value}
                  </p>
                  <p className="mt-4 text-sm leading-[1.55] text-[#1e1c11] sm:text-base">
                    {secondStat?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
