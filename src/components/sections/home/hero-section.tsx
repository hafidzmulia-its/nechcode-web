import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type HeroSectionProps = {
  hero: HomeContent["hero"];
};

export function HeroSection({ hero }: HeroSectionProps) {
  const layoutContainer = "mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12";

  return (
    <section className="relative w-full overflow-hidden bg-surface">
      <div className={`${layoutContainer} mb-16 flex flex-col items-start gap-8 py-10 sm:gap-10 sm:py-12 md:mb-24 md:gap-12 md:py-16 lg:mb-32 lg:grid lg:grid-cols-12 lg:py-20`}>
        <div className="mt-2 w-full max-w-full sm:mt-4 lg:col-span-7 lg:mt-12">
          <Reveal className="w-full" y={20} x={-18} duration={0.45} amount={0.35} once>
            <div className="mb-5 inline-flex max-w-full rounded-full border border-secondary/30 bg-[linear-gradient(120deg,rgba(88,230,255,0.3),rgba(88,230,255,0.3))] px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase leading-tight tracking-[0.08rem] text-primary sm:mb-6 sm:px-3 sm:py-1 sm:text-xs sm:tracking-[0.05rem]">
              {hero.badge}
            </div>

            <h1 className="mb-5 max-w-none font-headline text-[clamp(1.9rem,9vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-on-surface sm:mb-6 md:mb-8 md:text-5xl lg:text-6xl">
              {hero.headingA} <span className="serif-italic font-normal text-primary-container">{hero.headingEmphasis} </span>
              {hero.headingB}
            </h1>

            <p className="mb-8 max-w-none text-[1rem] leading-relaxed text-on-surface-variant sm:max-w-xl sm:text-lg md:mb-10 md:text-xl">
              {hero.description}
            </p>
          </Reveal>

          <Reveal className="w-full" y={16} x={-14} delay={0.28} duration={0.38} amount={0.35} once>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href={hero.primaryCta.href}
                target={hero.primaryCta.external ? "_blank" : undefined}
                rel={hero.primaryCta.external ? "noreferrer" : undefined}
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-base font-bold !text-white transition-all hover:shadow-[0_12px_26px_rgba(29,90,141,0.3)] hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                target={hero.secondaryCta.external ? "_blank" : undefined}
                rel={hero.secondaryCta.external ? "noreferrer" : undefined}
                className="inline-flex w-full items-center justify-center rounded-xl border border-outline-variant/30 bg-white px-6 py-3.5 text-base font-bold transition-all hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative mt-4 w-full max-w-full lg:col-span-5 lg:mt-0 lg:max-w-3xl" y={22} x={18} delay={0.16} duration={0.46} amount={0.35} once>
          <div className="relative z-10 overflow-hidden rounded-[1.4rem] border border-outline-variant/15 bg-surface-container-low p-3 shadow-[0_12px_30px_rgba(35,46,58,0.12)] md:hidden">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-container-lowest">
              <Image src={hero.showcaseImage.src} alt={hero.showcaseImage.alt} fill className="object-cover" sizes="100vw" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {hero.illustrations3d.slice(0, 3).map((item) => (
                <div key={item.title} className="flex items-center gap-2 rounded-xl border border-outline-variant/15 bg-surface-container-lowest px-2.5 py-2">
                  <Image src={item.imageUrl} alt={item.title} width={22} height={22} className="h-[22px] w-[22px] object-contain" />
                  <span className="truncate text-[10px] font-semibold uppercase tracking-[0.04em] text-on-surface-variant">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 hidden rounded-[2rem] bg-surface-container-low p-4 shadow-2xl shadow-on-surface/5 md:block md:rotate-2 lg:p-8">
            <div className="overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-lowest">
              <div className="flex h-10 items-center gap-2 bg-surface-container-high px-4">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/30" />
              </div>

              <div className="space-y-4 p-4 sm:p-6">
                <div className="h-4 w-1/2 rounded-full bg-surface-container" />

                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 rounded-lg bg-primary-container/10" />
                  <div className="h-24 rounded-lg bg-secondary-container/20" />
                  <div className="h-24 rounded-lg bg-tertiary-container/10" />
                </div>

                <div className="relative h-32 overflow-hidden rounded-lg bg-surface-container-low sm:h-40">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB_zRJRVW10j7Idhd3_TUpdYt9Bvcq3mQDfnkcFJmWBInApbCjDOfvlYxbPXDxqYX5tFdXlKUi2pqgKxTkTeGapEUcMLMVT4chMQwtpJ-u8eevV34-OnGWBzDesBKc2qS35EU3Jy0riz0YHoBtpGEwwAQ2ELvpQE6P6HEzR5yCHz9oBjks3ZaG59XBFDkNyGwIDpP6wWuPMS3223g9TOskiRmyZ5b4z90CZK2myVRqti1bNdbQml4Q_5tOBbpw8VgBT2QN381HEmE"
                    alt="Dashboard Preview"
                    fill
                    className="h-full w-full object-cover opacity-60 mix-blend-multiply"
                    sizes="(max-width: 1024px) 100vw, 36vw"
                  />
                </div>
              </div>
            </div>

            <div className="relative mt-5 max-w-full rotate-0 rounded-2xl border border-outline-variant/10 bg-white p-5 shadow-xl md:mt-0 md:max-w-xs md:p-6 lg:absolute lg:-bottom-6 lg:left-0 lg:-rotate-3 xl:-left-12">
              <div className="mb-2 text-tertiary">
                <span className="material-symbols-outlined [font-variation-settings:'FILL'_1]">format_quote</span>
              </div>
              <p className="font-serif text-sm leading-relaxed italic text-on-surface">
                &quot;Kami membantu tim Anda bergerak lebih cepat lewat solusi digital yang jelas, stabil, dan bisa dikembangkan.&quot;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-container text-[10px] font-bold text-on-secondary-container">
                  NC
                </div>
                <div className="text-[10px] font-bold uppercase tracking-tight">Founder, NechCode</div>
              </div>
            </div>

            <div className="absolute -right-4 -top-8 hidden gap-2 rounded-2xl border border-outline-variant/20 bg-surface/90 px-3 py-2 shadow-lg backdrop-blur md:flex">
              {hero.illustrations3d.map((item) => (
                <div key={item.title} className="rounded-xl bg-surface-container-low p-2">
                  <Image src={item.imageUrl} alt={item.title} width={32} height={32} className="h-8 w-8 object-contain" />
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 -z-10 scale-125 -rotate-12 bg-[radial-gradient(#d0e4ff_1px,transparent_1px)] opacity-30 [background-size:24px_24px] sm:scale-150" />
        </Reveal>
      </div>
    </section>
  );
}
