import { Reveal } from "@/components/shared/reveal";
import { servicesContent } from "@/content/services";
import type { HomeContent } from "@/content/home";

type ServicesSectionProps = {
  services: HomeContent["services"];
};

function getServiceHref(id: string) {
  return id === "data" ? "/services/predictive-data" : `/services/${id}`;
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section
      id="layanan"
      className="relative w-full overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal y={20} duration={0.42}>
          <div className="mb-8 text-center sm:mb-10 lg:mb-12">
            <div className="mb-4 inline-flex w-fit max-w-full items-center justify-center rounded-full border border-brand-accent px-5 py-2 text-center font-headline text-[clamp(1rem,2vw,1.35rem)] leading-none text-[#17465f] sm:px-6 lg:mb-5 lg:px-7 lg:py-2.5">
              {services.eyebrow}
            </div>
            <h2 className="mx-auto max-w-none text-balance font-headline text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] text-[#17465f] lg:whitespace-nowrap">
              Solusi Yang Kami Tawarkan
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          {servicesContent.pillars.map((pillar, index) => (
            <Reveal key={pillar.id} y={20} delay={index * 0.05} duration={0.38}>
              <div className="flex h-full flex-col rounded-2xl bg-[#16425B] px-5 py-6 text-center shadow-[0_8px_16px_rgba(15,32,42,0.28)] sm:px-6 sm:py-7 lg:px-7 lg:py-8">
                <h3 className="mb-4 text-balance font-headline text-[clamp(1.375rem,2.2vw,2rem)] leading-[1.15] text-white">
                  {pillar.navbarTitle}
                </h3>
                <p className="mx-auto mb-8 flex-1 max-w-[26ch] text-pretty text-[clamp(1rem,1.35vw,1.08rem)] leading-[1.6] text-white/78 sm:mb-9">
                  {pillar.navbarBody}
                </p>
                <a
                  href={getServiceHref(pillar.id)}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand-accent px-5 py-3.5 font-headline text-[clamp(1rem,1.8vw,1.3rem)] leading-none !text-white transition-all hover:bg-[#c7652d] hover:shadow-[0_8px_20px_rgba(227,116,52,0.28)] active:scale-95 sm:w-auto sm:min-w-[11rem]"
                >
                  <span>Lihat Paket</span>
                  <span
                    aria-hidden="true"
                    className="text-[1.35em] leading-none"
                  >
                    ›
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
