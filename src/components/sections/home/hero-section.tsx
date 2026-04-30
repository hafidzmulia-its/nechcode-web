import { Reveal } from "@/components/shared/reveal";
import { layoutContainer } from "@/config/layout";
import type { HomeContent } from "@/content/home";

type HeroSectionProps = {
  hero: HomeContent["hero"];
};

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="relative -mt-[72px] w-full overflow-hidden bg-brand-deep pt-[72px]">
      <div
        className={`${layoutContainer} relative z-10 flex flex-col items-start gap-10 pt-12 pb-28 sm:gap-12 sm:pt-14 sm:pb-32 md:gap-14 md:pt-16 md:pb-36 lg:grid lg:min-h-[620px] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-16 lg:pb-40 xl:min-h-[660px] xl:gap-10 xl:pt-20 xl:pb-44`}
      >
        {/* Left content */}
        <div className="w-full lg:col-span-5 lg:mt-0">
          <Reveal
            className="w-full"
            y={20}
            x={-18}
            duration={0.45}
            amount={0.35}
            once
          >
            {/* Badge */}
            <div className="mb-8 inline-flex rounded-full border border-[#E37434] px-5 py-2 text-[clamp(1rem,1.2vw,1.1rem)] font-medium italic leading-none text-white/92">
              {hero.badge}
            </div>

            {/* Heading */}
            <h1 className="mb-7 max-w-[620px] font-sans text-[clamp(2.35rem,4.2vw,4.6rem)] font-bold leading-[0.96] tracking-[-0.035em] text-white">
              {hero.headingA}
              <br />
              {hero.headingEmphasis}
            </h1>

            {/* Description */}
            <p className="mb-9 max-w-[29ch] text-left text-[clamp(0.95rem,1vw,1rem)] leading-[1.52] text-white/85 lg:max-w-[30ch]">
              Melalui{" "}
              <strong className="font-bold text-white">
                Pengembangan Software, Sistem Digital, AI, dan Otomatisasi
              </strong>
              , kami membantu Bisnis, UMKM, Organisasi serta Masyarakat
              berkembang di Era Digital!
            </p>
          </Reveal>

          <Reveal
            className="w-full"
            y={16}
            x={-14}
            delay={0.28}
            duration={0.38}
            amount={0.35}
            once
          >
            <a
              href={hero.primaryCta.href}
              target={hero.primaryCta.external ? "_blank" : undefined}
              rel={hero.primaryCta.external ? "noreferrer" : undefined}
              className="inline-flex items-center justify-center rounded-none bg-brand-accent px-6 py-3.5 text-[clamp(1rem,1.1vw,1.08rem)] font-bold !text-white transition-all hover:bg-[#b36a2a] hover:shadow-[0_8px_24px_rgba(196,123,58,0.4)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C47B3A]/50"
            >
              {hero.primaryCta.label}
            </a>
          </Reveal>
        </div>

        {/* Right — 3D character */}
        <Reveal
          className="flex w-full items-center justify-center lg:col-span-7 lg:justify-end"
          y={22}
          x={18}
          delay={0.16}
          duration={0.46}
          amount={0.35}
          once
        >
          <div className="relative flex h-[320px] w-full max-w-[640px] items-center justify-center sm:h-[390px] md:h-[420px] lg:h-[430px] lg:max-w-[520px] xl:h-[450px] xl:max-w-[545px]">
            <img
              src="/img/asset4.png"
              alt="Character 3D"
              className="absolute bottom-0 h-full w-auto max-w-full object-contain object-bottom"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
