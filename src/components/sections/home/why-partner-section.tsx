import Image from "next/image";

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
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
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

            <div className="absolute left-[47.5%] top-[27%] max-w-[34%]">
              <p className="text-[clamp(1.6rem,2vw,2.15rem)] font-semibold leading-[1.25] text-[#1e1c11]">
                Kami <span className="text-brand-accent">bukan</span> vendor
                biasa.
              </p>
              <p className="mt-4 text-[clamp(1rem,1.15vw,1.22rem)] leading-[1.45] text-[#1e1c11]">
                Anda berkomunikasi langsung dengan praktisi yang paham konteks
                bisnis, bukan sekadar pengembang yang menunggu brief.
              </p>
            </div>

            <div className="absolute left-[47.5%] top-[57%] flex w-[42%] items-start">
              <div className="flex-1 pr-10">
                <p className="font-headline text-[clamp(4rem,5vw,5.6rem)] leading-none text-brand-accent">
                  {firstStat?.value}
                </p>
                <p className="mt-4 max-w-[18ch] text-[1.08rem] leading-[1.4] text-[#1e1c11]">
                  {firstStat?.description}
                </p>
              </div>

              <div className="mx-2 h-32 w-px bg-[#1e1c11]/18" />

              <div className="flex-1 pl-10">
                <p className="font-headline text-[clamp(4rem,5vw,5.6rem)] leading-none text-brand-accent">
                  {secondStat?.value}
                </p>
                <p className="mt-4 max-w-[18ch] text-[1.08rem] leading-[1.4] text-[#1e1c11]">
                  {secondStat?.description}
                </p>
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
