import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type FinalCtaSectionProps = {
  cta: HomeContent["cta"];
};

export function FinalCtaSection({ cta }: FinalCtaSectionProps) {
  return (
    <section id="kontak" className="relative w-full overflow-hidden bg-[#F5EEDC] py-24 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#efe4cc]/75 to-transparent" />
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        <Reveal y={22} duration={0.42}>
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(29,90,141,0.09)] bg-[#EFE4CC] px-8 py-20 text-center shadow-[0_14px_30px_rgba(36,49,61,0.07)] md:px-12 md:py-24">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/8" />
            <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-primary/7" />
            <div className="relative z-10 mx-auto max-w-3xl">
              {/* <Reveal y={14} duration={0.32}>
                <div className="mb-6 flex items-center justify-center gap-3">
                  <Image
                    src="https://img.icons8.com/?id=ni0ZUMLZy7EY&format=png&size=96"
                    alt="Man with laptop 3D"
                    width={44}
                    height={44}
                    className="h-11 w-11 object-contain"
                  />
                  <Image
                    src="https://img.icons8.com/?id=NVIZnI2CZTno&format=png&size=96"
                    alt="Team goal 3D"
                    width={44}
                    height={44}
                    className="h-11 w-11 object-contain"
                  />
                </div>
              </Reveal> */}

              <Reveal y={16} delay={0.08} duration={0.35}>
                <h2 className="mb-8 font-headline text-5xl leading-tight text-primary md:text-7xl">
                  {cta.headingA} <br />
                  <span className="text-secondary">{cta.headingEmphasis.toLowerCase()}</span> {cta.headingB}
                </h2>
                <p className="mb-12 text-xl text-[#43515b]">{cta.description}</p>
              </Reveal>

              <Reveal y={12} delay={0.18} duration={0.32}>
                <div className="flex flex-col items-center justify-center gap-4">
                  <a
                    href={cta.primaryCta.href}
                    className="rounded-full bg-primary px-12 py-5 text-xl font-bold !text-white visited:!text-white hover:!text-white transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFE4CC]"
                  >
                    {cta.primaryCta.label}
                  </a>
                  <a
                    href={cta.secondaryCta.href}
                    target={cta.secondaryCta.external ? "_blank" : undefined}
                    rel={cta.secondaryCta.external ? "noreferrer" : undefined}
                    className="text-sm font-bold text-primary underline underline-offset-4"
                  >
                    {cta.secondaryCta.label}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
