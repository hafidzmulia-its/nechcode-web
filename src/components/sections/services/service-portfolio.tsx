"use client";

import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import type { ShowcaseItem } from "@/content/service-pages";

type ServicePortfolioProps = {
  eyebrow: string;
  title: string;
  body: string;
  items: ShowcaseItem[];
  /** Maksimal kolom grid di breakpoint lg. Default 3. */
  maxColumns?: 2 | 3;
};

export function ServicePortfolio({
  eyebrow,
  title,
  body,
  items,
  maxColumns = 3,
}: ServicePortfolioProps) {
  // Grid class mengikuti jumlah item — untuk 2 item, limit width biar tidak meregang.
  const gridClass =
    maxColumns === 3
      ? "mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      : "mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:max-w-3xl";

  return (
    <section className="w-full bg-surface py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        <Reveal once y={16} className="max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {eyebrow}
          </p>
          <h2 className="font-headline text-4xl leading-tight text-primary md:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
            {body}
          </p>
        </Reveal>

        <div className={gridClass}>
          {items.map((item, index) => (
            <Reveal key={item.title} once y={18} delay={index * 0.08}>
              <Link
                href={item.href}
                target="_blank"
                className="group relative block h-full overflow-hidden rounded-[1.75rem] bg-[#FFFFFF] shadow-[0_12px_28px_rgba(34,46,58,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(34,46,58,0.14)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="material-symbols-outlined text-lg">
                      arrow_outward
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
                    {item.category}
                  </p>
                  <h3 className="font-headline text-2xl text-primary transition-colors group-hover:text-secondary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                    {item.description}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary transition-all group-hover:gap-2.5 group-hover:text-secondary">
                    Lihat Detail
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
