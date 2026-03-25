import { Reveal } from "@/components/shared/reveal";
import { servicesContent } from "@/content/services";
import type { HomeContent } from "@/content/home";

type ServicesSectionProps = {
  services: HomeContent["services"];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="layanan" className="relative w-full overflow-hidden bg-[#F5EEDC] pb-24 md:pb-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#efe4cc]/65" />
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="rounded-[2rem] border border-[rgba(29,90,141,0.08)] bg-[#EFE4CC] px-6 py-12 shadow-[0_18px_46px_rgba(36,47,58,0.08)] backdrop-blur-sm md:px-8 md:py-14 lg:px-10">
          <Reveal y={20} duration={0.42}>
            <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 font-label text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  {services.eyebrow}
                </div>
                <h2 className="font-headline text-5xl text-primary">
                  {services.headingA} <span className="serif-italic">{services.headingEmphasis}</span>.
                </h2>
              </div>
              <div className="max-w-sm font-body text-[#42505a] md:text-right">{services.description}</div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {servicesContent.pillars.map((pillar, index) => (
              <Reveal key={pillar.id} y={20} delay={index * 0.05} duration={0.38}>
                <a
                  href={`/services?pillar=${pillar.id}`}
                  className={`group flex h-full flex-col rounded-3xl border p-8 shadow-[0_10px_24px_rgba(35,46,58,0.06)] transition-all duration-500 hover:-translate-y-1 ${
                    pillar.id === "ai"
                      ? "border-[rgba(29,90,141,0.2)] bg-primary text-white hover:shadow-[0_16px_34px_rgba(29,90,141,0.22)]"
                      : "border-[rgba(29,90,141,0.08)] bg-[#FBF7EE] hover:border-secondary/35 hover:shadow-[0_14px_32px_rgba(31,48,62,0.09)]"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined mb-5 text-4xl ${
                      pillar.id === "ai" ? "text-secondary-container" : "text-primary"
                    }`}
                  >
                    {pillar.id === "web" ? "web" : pillar.id === "mobile" ? "phone_iphone" : "smart_toy"}
                  </span>
                  <h3 className={`mb-3 font-headline text-3xl ${pillar.id === "ai" ? "text-white/85" : "text-primary"}`}>
                    {pillar.navbarTitle}
                  </h3>
                  <p className={`text-sm leading-relaxed ${pillar.id === "ai" ? "text-white/85" : "text-[#42505a]"}`}>
                    {pillar.navbarBody}
                  </p>
                  <p
                    className={`mt-5 text-xs font-bold uppercase tracking-[0.16em] ${
                      pillar.id === "ai" ? "text-secondary-container" : "text-secondary"
                    }`}
                  >
                    {pillar.navbarPriceCue}
                  </p>
                  <span
                    className={`mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${
                      pillar.id === "ai" ? "!text-white" : "text-primary"
                    }`}
                  >
                    {pillar.navbarCtaLabel}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-[rgba(29,90,141,0.12)] bg-[#f8f2e6] p-5 md:p-7">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Engagement Model</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {servicesContent.waysToWork.items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[rgba(29,90,141,0.1)] bg-[#FBF7EE] p-5">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary">Ways to Work</p>
                <h4 className="mb-1 font-headline text-2xl text-primary">{item.title}</h4>
                <p className="text-sm text-[#42505a]">{item.description}</p>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
