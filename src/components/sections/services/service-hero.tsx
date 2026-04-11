"use client";

import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import type { ServicePageHero } from "@/content/service-pages";

type ServiceHeroProps = {
  hero: ServicePageHero;
  /** Href tombol CTA "Lihat Selengkapnya". Default `#pricing`. */
  ctaHref?: string;
  ctaLabel?: string;
};

export function ServiceHero({
  hero,
  ctaHref = "#pricing",
  ctaLabel = "Lihat Selengkapnya",
}: ServiceHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#16425B]">
      <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-secondary/15 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-secondary-container/15 blur-[130px]" />

      <div className="mx-auto w-full max-w-[1240px] px-6 pb-16 pt-16 md:px-8 md:pb-20 md:pt-20 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal once y={20}>
            <span className="mb-6 inline-flex items-center rounded-full border border-secondary-container/60 px-5 py-1.5 text-sm italic text-secondary-container">
              {hero.eyebrow}
            </span>

            <h1 className="font-headline text-[2.25rem] leading-[1.12] text-white md:text-5xl lg:text-[3.25rem]">
              {hero.title}
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
              {hero.description}
            </p>

            <a
              href={ctaHref}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E37434] px-7 py-3.5 text-sm font-bold !text-white shadow-[0_10px_24px_rgba(227,116,52,0.35)] transition hover:-translate-y-0.5 hover:bg-[#c9652a]"
            >
              {ctaLabel}
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </a>
          </Reveal>

          <div className="hidden lg:flex lg:justify-center">
            <div className="relative h-[380px] w-[380px] xl:h-[420px] xl:w-[420px]">
              <div className="absolute inset-0 rounded-full bg-white/10" />
              {hero.visual.kind === "image" ? (
                <div className="absolute inset-0 animate-[float_6s_ease-in-out_infinite]">
                  <Image
                    src={hero.visual.src}
                    alt={hero.visual.alt}
                    fill
                    priority
                    sizes="420px"
                    className="object-contain p-8"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[160px] text-white/20">
                    {hero.visual.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
