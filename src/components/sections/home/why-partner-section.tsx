import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type WhyPartnerSectionProps = {
  whyPartner: HomeContent["whyPartner"];
};

export function WhyPartnerSection({ whyPartner }: WhyPartnerSectionProps) {
  return (
    <section id="kemitraan" className="w-full overflow-hidden bg-gradient-to-b from-surface-container-low/65 to-surface py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        <Reveal className="mb-14 text-center" y={20} duration={0.4}>
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-outline-variant/20 bg-surface-container-lowest px-4 py-2 shadow-[0_6px_14px_rgba(30,28,17,0.05)]">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Founder-Led Collaboration</span>
          </div>
          <h2 className="mb-4 font-headline text-4xl text-primary md:text-5xl">{whyPartner.heading}</h2>
          <p className="mx-auto max-w-3xl text-on-surface-variant md:text-lg">{whyPartner.description}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {whyPartner.items.map((item, index) => (
            <Reveal key={item.title} y={16} delay={index * 0.05} duration={0.34}>
              <article className="rounded-[1.25rem] border border-outline-variant/18 bg-surface-container-lowest p-6 text-center shadow-[0_8px_20px_rgba(30,28,17,0.045)]">
                <p className="mb-2 font-body text-base font-bold text-primary">{item.title}</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
