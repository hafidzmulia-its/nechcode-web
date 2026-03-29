import { Reveal } from "@/components/shared/reveal";
import { SocialIcon } from "@/components/shared/social-icon";
import { layoutContainer } from "@/config/layout";
import { getSocialLinks } from "@/config/site";
import type { HomeContent } from "@/content/home";

type FinalCtaSectionProps = {
  cta: HomeContent["cta"];
};

export function FinalCtaSection({ cta }: FinalCtaSectionProps) {
  const socials = getSocialLinks();

  return (
    <section id="kontak" className="relative w-full overflow-hidden bg-[#F5EEDC] py-24 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#efe4cc]/75 to-transparent" />
      <div className={layoutContainer}>
        <Reveal y={22} duration={0.42}>
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(29,90,141,0.09)] bg-[#EFE4CC] px-8 py-20 text-center shadow-[0_14px_30px_rgba(36,49,61,0.07)] md:px-12 md:py-24">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/8" />
            <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-primary/7" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <Reveal y={16} delay={0.08} duration={0.35}>
                <h2 className="mb-8 font-headline text-5xl leading-tight text-primary md:text-7xl">
                  {cta.headingA} <br />
                  <span className="text-secondary">{cta.headingEmphasis.toLowerCase()}</span> {cta.headingB}
                </h2>
                <p className="mb-12 text-xl text-[#43515b]">{cta.description}</p>
                <div className="mb-10 flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-primary/80">
                  <span className="rounded-full border border-primary/15 bg-white/65 px-3 py-1">Discovery singkat & fokus prioritas</span>
                  <span className="rounded-full border border-primary/15 bg-white/65 px-3 py-1">Timeline transparan per sprint</span>
                  <span className="rounded-full border border-primary/15 bg-white/65 px-3 py-1">Pendampingan pasca rilis</span>
                </div>
              </Reveal>

              <Reveal y={12} delay={0.18} duration={0.32}>
                <div className="flex flex-col items-center justify-center gap-4">
                  <a
                    href={cta.primaryCta.href}
                    target={cta.primaryCta.external ? "_blank" : undefined}
                    rel={cta.primaryCta.external ? "noreferrer" : undefined}
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
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
                    {socials.map((item) => (
                      <a
                        key={item.platform}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/25 bg-white/75 text-primary transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:text-secondary"
                        aria-label={`${item.platform} ${item.handle}`}
                        title={`${item.platform} / ${item.handle}`}
                      >
                        <SocialIcon platform={item.platform} />
                      </a>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-[#43515b]">Ingin lihat proses kerja kami dulu? Jelajahi selected works lalu kembali saat siap diskusi.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
