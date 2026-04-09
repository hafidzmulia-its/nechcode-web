import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type TrustStripSectionProps = {
  trustStrip: HomeContent["trustStrip"];
};

export function TrustStripSection({ trustStrip }: TrustStripSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#F5EEDC] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="rounded-2xl border-2 border-[#16425B] bg-[#F5EEDC] px-6 py-10 md:px-10 md:py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {trustStrip.items.map((item, index) => (
              <Reveal key={item.title} y={16} delay={index * 0.08} duration={0.35}>
                <div className="flex items-start gap-4">
                  {/* Icon placeholder square */}
                  <div className="h-16 w-16 shrink-0 rounded-xl bg-[#D9D9D9] sm:h-20 sm:w-20" />
                  <div>
                    <p className="mb-1.5 font-sans text-base font-bold text-[#1e1c11] sm:text-lg">
                      {item.title}
                    </p>
                    <p className="text-sm leading-relaxed text-[#1e1c11]/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
