import { Reveal } from "@/components/shared/reveal";
import { layoutContainer } from "@/config/layout";
import { servicesContent } from "@/content/services";
import type { HomeContent } from "@/content/home";

type ServicesSectionProps = {
  services: HomeContent["services"];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section
      id="layanan"
      className="relative w-full overflow-hidden bg-[#16425B] py-24 md:py-32"
    >
      <div className={layoutContainer}>
        <Reveal y={20} duration={0.42}>
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/70">
              {services.eyebrow}
            </div>
            <h2 className="font-headline text-4xl text-white md:text-5xl">
              {services.headingA}{" "}
              <span className="serif-italic text-[#58e6ff]">
                {services.headingEmphasis}
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {servicesContent.pillars.map((pillar, index) => (
            <Reveal key={pillar.id} y={20} delay={index * 0.05} duration={0.38}>
              <div className="flex h-full flex-col rounded-[1.4rem] border border-white/15 bg-white/10 p-8 backdrop-blur-sm">
                <h3 className="mb-3 font-headline text-2xl text-white">
                  {pillar.navbarTitle}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-white/70">
                  {pillar.navbarBody}
                </p>
                <a
                  href={pillar.id === "web" ? "/services/web" : `/services?pillar=${pillar.id}`}
                  className="inline-flex w-fit items-center justify-center rounded-xl bg-[#E37434] px-6 py-3 text-sm font-bold !text-white transition-all hover:bg-[#b36a2a] hover:shadow-[0_8px_20px_rgba(196,123,58,0.35)] active:scale-95"
                >
                  Lihat Paket!
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
