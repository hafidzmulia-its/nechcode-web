import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type FinalCtaSectionProps = {
  cta: HomeContent["cta"];
};

export function FinalCtaSection({ cta }: FinalCtaSectionProps) {
  return (
    <section
      id="kontak"
      className="relative w-full overflow-hidden bg-surface py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        <Reveal y={22} duration={0.42}>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-deep px-8 py-16 md:px-16 md:py-20">
            {/* Left character — asset7 */}
            <div className="pointer-events-none absolute bottom-0 left-0 hidden h-[85%] w-[220px] lg:block xl:w-[260px]">
              <Image
                src="/img/asset7.png"
                alt="Character left"
                fill
                className="object-contain object-bottom"
                sizes="260px"
              />
            </div>

            {/* Right character — asset8 */}
            <div className="pointer-events-none absolute bottom-0 right-0 hidden h-[75%] w-[180px] lg:block xl:w-[220px]">
              <Image
                src="/img/asset8.png"
                alt="Character right"
                fill
                className="object-contain object-bottom"
                sizes="220px"
              />
            </div>

            {/* Center content */}
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <Reveal y={16} delay={0.06} duration={0.38}>
                <h2 className="mb-6 font-headline text-4xl font-bold leading-tight !text-white md:text-5xl lg:text-6xl">
                  {cta.headingA} {cta.headingEmphasis} {cta.headingB}
                </h2>
              </Reveal>

              <Reveal y={14} delay={0.12} duration={0.38}>
                <p className="mb-4 text-base leading-relaxed text-white/80 md:text-lg">
                  {cta.description}
                </p>
                <p className="mb-8 text-sm text-white/60 md:text-base">
                  Tunggu apalagi? Hubungi kami sekarang untuk memulai perjalanan
                  digital Anda bersama kami!
                </p>
              </Reveal>

              <Reveal y={12} delay={0.18} duration={0.38}>
                <Link
                  href={cta.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-brand-accent-soft px-10 py-4 text-base font-bold !text-white transition-all hover:bg-[#b36a2a] hover:shadow-[0_12px_30px_rgba(217,125,85,0.4)] active:scale-95"
                >
                  {cta.primaryCta.label}
                </Link>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
