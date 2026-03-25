import { Instagram, Linkedin } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { getSocialLinks } from "@/config/site";
import type { HomeContent } from "@/content/home";

type FinalCtaSectionProps = {
  cta: HomeContent["cta"];
};

export function FinalCtaSection({ cta }: FinalCtaSectionProps) {
  const socials = getSocialLinks();

  function getSocialIcon(platform: string) {
    const normalized = platform.toLowerCase();

    if (normalized.includes("linkedin")) {
      return <Linkedin size={18} strokeWidth={2.2} aria-hidden="true" />;
    }

    if (normalized.includes("instagram")) {
      return <Instagram size={18} strokeWidth={2.2} aria-hidden="true" />;
    }

    if (normalized.includes("tiktok")) {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M16.75 3.5h-3.2v10.09a2.85 2.85 0 1 1-2.23-2.78v-3.2A6.05 6.05 0 1 0 16.75 13V7.98a7.72 7.72 0 0 0 4.5 1.45v-3.2a4.52 4.52 0 0 1-4.5-2.73Z" />
        </svg>
      );
    }

    if (normalized === "x" || normalized.includes("twitter")) {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M18.24 2.25h3.42l-7.48 8.55L23 21.75h-6.88l-5.39-7.02-6.15 7.02H1.16l8-9.15L1 2.25h7.05l4.87 6.42 5.32-6.42Zm-1.21 17.43h1.9L7.02 4.22H4.98l12.05 15.46Z" />
        </svg>
      );
    }

    return null;
  }

  return (
    <section id="kontak" className="relative w-full overflow-hidden bg-[#F5EEDC] py-24 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#efe4cc]/75 to-transparent" />
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
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
                        {getSocialIcon(item.platform)}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
