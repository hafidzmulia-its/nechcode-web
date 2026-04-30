"use client";

import { Reveal } from "@/components/shared/reveal";
import { servicesContent } from "@/content/services";

const ITEM_ICONS = ["favorite", "school", "storefront"] as const;

export function ServiceSpecialProgram() {
  const { specialPrograms } = servicesContent;

  return (
    <section className="w-full bg-surface pb-20 pt-16 md:pb-24 md:pt-24">
      <div className="mx-auto w-full max-w-[1240px] px-6 md:px-8 lg:px-10 xl:px-12">
        <Reveal once y={18}>
          <div className="rounded-[2rem] bg-brand-accent-soft p-8 md:p-12 lg:p-14">
            <h2
              className="font-headline text-3xl font-bold leading-[1.18] text-white md:text-4xl lg:whitespace-nowrap"
              style={{ wordSpacing: "0.14em" }}
            >
              Program Khusus untuk tahap awal!
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-white/85 md:text-lg">
              Kami membuka program ini agar Anda dapat memulai transformasi
              digital bersama kami!
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              {specialPrograms.items.map((item, index) => (
                <Reveal key={item.title} once y={14} delay={index * 0.06}>
                  <article className="h-full rounded-[1.25rem] bg-surface p-6 md:p-7">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent-soft">
                      <span className="material-symbols-outlined text-lg text-white">
                        {ITEM_ICONS[index] ?? "star"}
                      </span>
                    </div>
                    <h3 className="mb-3 font-headline text-xl font-bold text-[#1e1c11]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#1e1c11]/75">
                      {item.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 text-sm text-white/75">{specialPrograms.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
