import { Reveal } from "@/components/shared/reveal";
import { layoutContainer } from "@/config/layout";
import type { HomeContent } from "@/content/home";

type HeroSectionProps = {
  hero: HomeContent["hero"];
};

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="relative -mt-[72px] w-full overflow-hidden bg-[#16425B] pt-[72px]">
      <div
        className={`${layoutContainer} flex flex-col items-start gap-8 py-14 sm:gap-10 sm:py-16 md:gap-12 md:py-20 lg:grid lg:grid-cols-12 lg:py-24`}
      >
        {/* Left content */}
        <div className="w-full lg:col-span-6 lg:mt-4">
          <Reveal
            className="w-full"
            y={20}
            x={-18}
            duration={0.45}
            amount={0.35}
            once
          >
            {/* Badge */}
            <div className="mb-6 inline-flex rounded-full border border-[#C47B3A]/60 px-4 py-1.5 text-sm font-medium italic text-white/80">
              {hero.badge}
            </div>

            {/* Heading */}
            <h1 className="mb-6 font-sans text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-white">
              {hero.headingA}
              <br />
              {hero.headingEmphasis}
            </h1>

            {/* Description */}
            <p className="mb-10 max-w-lg text-justify text-[1.5rem] leading-relaxed text-white/80 sm:text-base">
              Hadir sebagai Solusi Teknologi dengan berfokus pada Pengembangan
              Software, sistem digital, AI dan otomatisasi, untuk membantu{" "}
              <strong className="font-bold text-white">
                Bisnis, UMKM, Organisasi, serta Masyarakat berkembang di era
                digital!
              </strong>
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
              className="inline-flex items-center justify-center rounded-2xl bg-[#E37434] px-8 py-4 text-base font-bold !text-white transition-all hover:bg-[#b36a2a] hover:shadow-[0_8px_24px_rgba(196,123,58,0.4)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C47B3A]/50"
            >
              {hero.primaryCta.label}
            </a>
          </Reveal>
        </div>

        {/* Right — 3D character */}
        <Reveal
          className="flex w-full items-center justify-center lg:col-span-6"
          y={22}
          x={18}
          delay={0.16}
          duration={0.46}
          amount={0.35}
          once
        >
          <div className="relative flex h-[320px] w-[320px] items-center justify-center rounded-full sm:h-[380px] sm:w-[380px] md:h-[420px] md:w-[420px]">
            <img
              src="/img/asset4.png"
              alt="Character 3D"
              className="absolute bottom-0 h-[95%] w-auto object-contain object-bottom"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
