import Image from "next/image";

import { layoutContainerBleed } from "@/config/layout";
import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type FinalCtaSectionProps = {
  cta: HomeContent["cta"];
};

function normalizeHref(href: string) {
  if (href.startsWith("/https://") || href.startsWith("/http://")) {
    return href.slice(1);
  }

  return href;
}

export function FinalCtaSection({ cta }: FinalCtaSectionProps) {
  const primaryHref = normalizeHref(cta.primaryCta.href);

  return (
    <section
      id="kontak"
      className="relative w-full overflow-hidden bg-[#F6EEDB] pt-10 pb-0 sm:pt-12 sm:pb-0 lg:pt-16 lg:pb-0"
    >
      <div className={layoutContainerBleed}>
        <Reveal y={22} duration={0.42}>
          <div className="relative min-h-[600px] overflow-hidden bg-[#F6EEDB] px-6 pt-14 pb-40 sm:min-h-[660px] sm:px-8 sm:pt-16 sm:pb-46 md:px-10 md:pt-20 md:pb-52 lg:min-h-[760px] lg:px-12 lg:pt-24 lg:pb-56">
            <div className="pointer-events-none absolute inset-x-0 -bottom-3 h-[52%] sm:-bottom-4 sm:h-[54%] md:-bottom-5 md:h-[56%] lg:-bottom-6 lg:h-[58%]">
              <Image
                src="/img/asset8_7.png"
                alt="Characters for final CTA"
                fill
                priority
                className="object-contain object-bottom"
                sizes="100vw"
              />
            </div>

            <div className="relative z-10 mx-auto flex max-w-[880px] flex-col items-center text-center">
              <Reveal y={16} delay={0.06} duration={0.38}>
                <h2 className="font-headline text-[clamp(2.8rem,5.8vw,5rem)] font-bold leading-[0.98] text-brand-accent">
                  {cta.headingA}
                  <br />
                  {cta.headingEmphasis} {cta.headingB}
                </h2>
              </Reveal>

              <Reveal y={14} delay={0.12} duration={0.38}>
                <p className="mt-8 max-w-[30ch] text-[clamp(1.05rem,1.9vw,1.5rem)] leading-[1.45] text-[#1e1c11]">
                  Tunggu apalagi? Hubungi kami sekarang untuk memulai perjalanan
                  digital Anda bersama kami!
                </p>
              </Reveal>

              <Reveal y={12} delay={0.18} duration={0.38}>
                <a
                  href={primaryHref}
                  target={cta.primaryCta.external ? "_blank" : undefined}
                  rel={cta.primaryCta.external ? "noreferrer" : undefined}
                  className="mt-10 inline-flex items-center justify-center rounded-full bg-brand-accent px-8 py-3.5 text-[clamp(1rem,1.7vw,1.25rem)] font-medium !text-white transition-all hover:bg-[#cf692f] hover:shadow-[0_12px_30px_rgba(217,125,85,0.28)] active:scale-95 sm:px-10"
                >
                  {cta.primaryCta.label}
                </a>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
