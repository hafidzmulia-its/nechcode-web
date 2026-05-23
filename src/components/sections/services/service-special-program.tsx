"use client";

import { Reveal } from "@/components/shared/reveal";
import { servicesContent } from "@/content/services";

const PROGRAM_LAYOUT = [
  {
    key: "Penawaran Khusus UMKM",
    title: "Special Offer for MSMEs",
    className: "lg:col-start-1 lg:row-start-1",
  },
  {
    key: "Diskon Akademisi",
    title: "Academic Discount",
    className: "lg:col-start-2 lg:row-start-1 lg:translate-y-[4.25rem]",
  },
  {
    key: "Bayar Seikhlasnya",
    title: "Pay As Much As You Can",
    className: "lg:col-start-1 lg:row-start-2 lg:col-span-2 lg:mx-auto lg:mt-8 lg:w-[48.5%]",
  },
] as const;

export function ServiceSpecialProgram() {
  const { specialPrograms } = servicesContent;
  const items = PROGRAM_LAYOUT.map((layout) => {
    const match = specialPrograms.items.find((item) => item.title === layout.key);

    return match
      ? {
          title: layout.title,
          body: match.body,
          className: layout.className,
        }
      : null;
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <section className="w-full bg-[#FFFFFF] py-20 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-10 xl:px-12">
        <Reveal once y={18}>
          <div className="mx-auto max-w-[64rem] text-center">
            <p className="font-body text-[clamp(1.15rem,1.3vw,1.45rem)] font-normal uppercase tracking-[0.03em] text-[#151515]">
              Special Program
            </p>
            <h2 className="mx-auto mt-7 max-w-full font-sans text-[32px] font-normal uppercase leading-[1.18] tracking-[-0.02em] text-[#0F0F0F]">
              <span className="block whitespace-nowrap">THIS SPECIAL PROGRAM IS FOR</span>
              <span className="block whitespace-nowrap">THOSE OF YOU WHO WANT TO START</span>
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-[1080px] grid-cols-1 gap-7 md:mt-20 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-8">
          {items.map((item, index) => (
            <Reveal
              key={item.title}
              once
              y={18}
              delay={index * 0.08}
              className={item.className}
            >
              <article className="border-[3px] border-[#2F6FA8] bg-white px-9 py-9 md:px-10 md:py-10">
                <h3 className="font-sans text-[clamp(2rem,2.6vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.03em] text-[#4B8FCC]">
                  {item.title}
                </h3>

                <div className="mt-5 h-px w-[13rem] bg-[#5A5A5A]" />

                <p className="mt-8 max-w-[28ch] font-body text-[clamp(1.08rem,1.2vw,1.22rem)] leading-[1.6] text-[#202020] md:max-w-[30ch]">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
