import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type TrustStripSectionProps = {
  trustStrip: HomeContent["trustStrip"];
};

export function TrustStripSection({ trustStrip }: TrustStripSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low/90 via-surface-container-low/70 to-surface py-16">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-surface/90" />
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustStrip.items.map((item, index) => (
            <Reveal key={item.title} y={18} delay={index * 0.06} duration={0.35}>
              <article className="rounded-[1.4rem] border border-outline-variant/18 bg-surface-container-lowest p-6 shadow-[0_8px_20px_rgba(30,28,17,0.04)]">
                <div className="mb-4 flex items-center gap-3">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={36}
                      height={36}
                      className="h-9 w-9 object-contain"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-3xl text-secondary">{item.icon}</span>
                  )}
                </div>
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
