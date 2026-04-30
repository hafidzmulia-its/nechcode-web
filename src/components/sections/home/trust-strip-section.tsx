import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type TrustStripSectionProps = {
  trustStrip: HomeContent["trustStrip"];
};

export function TrustStripSection({ trustStrip }: TrustStripSectionProps) {
  return (
    <section className="relative z-20 -mt-20 w-full overflow-hidden pb-8 sm:-mt-24 md:-mt-28 md:pb-10 lg:-mt-32 xl:-mt-36">
      <Image
        src="/img/asset_bg.png"
        alt=""
        fill
        priority
        aria-hidden="true"
        className="object-cover object-top"
      />
      <div className="relative mx-auto w-full max-w-[1360px] px-4 pt-10 sm:px-6 sm:pt-12 md:px-8 md:pt-14 lg:px-10 lg:pt-16 xl:px-12">
        <div className="rounded-[1.75rem] bg-[#F6EEDB] px-6 py-8 shadow-[0_10px_24px_rgba(15,32,42,0.25)] sm:px-8 md:px-10 md:py-9 lg:px-8 lg:py-8 xl:px-10">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-6 lg:gap-8">
            {trustStrip.items.map((item, index) => (
              <Reveal key={item.title} y={16} delay={index * 0.08} duration={0.35}>
                <div className="flex items-start gap-4 lg:gap-5">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-[6px] border-brand-accent bg-white p-2 sm:h-24 sm:w-24">
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-white p-1.5">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={64}
                          height={64}
                          className="h-full w-full object-contain"
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="max-w-[23ch] pt-1">
                    <p className="mb-1.5 font-sans text-[1.1rem] font-bold leading-tight text-[#1e1c11] sm:text-[1.25rem]">
                      {item.title}
                    </p>
                    <p className="text-[0.95rem] leading-relaxed text-[#1e1c11]/68 sm:text-[0.98rem]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
