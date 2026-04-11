import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type WhyPartnerSectionProps = {
  whyPartner: HomeContent["whyPartner"];
};

export function WhyPartnerSection({ whyPartner }: WhyPartnerSectionProps) {
  return (
    <section
      id="kemitraan"
      className="w-full overflow-hidden bg-[#F5EEDC] py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Heading */}
        <Reveal className="mb-10 text-center" y={20} duration={0.4}>
          <h2 className="font-headline text-4xl font-bold text-[#1e1c11] md:text-5xl lg:text-6xl">
            {whyPartner.heading}
          </h2>
        </Reveal>

        {/* Main container */}
        <Reveal y={24} duration={0.45}>
          <div className="overflow-hidden rounded-2xl bg-[#16425B]">
            {/* Desktop: 4 kolom — Mobile: stack */}
            <div className="flex flex-col md:flex-row md:items-stretch">
              {/* 1. Orange square — persegi di desktop */}
              <div className="w-full shrink-0 bg-[#D97D55] p-7 md:aspect-square md:w-[220px] lg:w-[260px]">
                <p className="font-headline text-xl font-bold uppercase text-white">
                  {whyPartner.featured.label}
                </p>
                <p className="mt-4 font-sans text-sm leading-relaxed text-white/85">
                  {whyPartner.featured.description}
                </p>
              </div>

              {/* 2. Stats + character */}
              <div className="flex flex-1 flex-col gap-8 px-8 py-8 md:flex-row md:items-center md:gap-0 md:py-10">
                {/* Stat 1 */}
                <div className="flex-1 border-white/10 md:border-r md:pr-8">
                  <p className="font-headline text-6xl font-bold leading-none text-white lg:text-7xl">
                    {whyPartner.stats[0]?.value}
                  </p>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-white/70">
                    {whyPartner.stats[0]?.description}
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="flex-1 md:px-8">
                  <p className="font-headline text-6xl font-bold leading-none text-white lg:text-7xl">
                    {whyPartner.stats[1]?.value}
                  </p>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-white/70">
                    {whyPartner.stats[1]?.description}
                  </p>
                </div>

                {/* Character */}
                <div className="flex shrink-0 justify-center md:pl-4">
                  <div className="relative h-36 w-36 overflow-hidden  md:h-44 md:w-44 lg:h-52 lg:w-52">
                    <Image
                      src="/img/asset5.png"
                      alt="Character"
                      fill
                      className="object-contain object-bottom"
                      sizes="208px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
