"use client";

import Image from "next/image";
import { Maximize2, Minimize2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import type { HomeContent } from "@/content/home";
import type { PortfolioItem } from "@/types/portfolio";

type SelectedWorksSectionProps = {
  works: HomeContent["works"];
  items: PortfolioItem[];
};

function statusLabel(item: PortfolioItem) {
  return item.published ? "Dipublikasikan" : "Dalam Pengembangan";
}

function getItemCategories(item: PortfolioItem) {
  if (Array.isArray(item.categories) && item.categories.length > 0) {
    return item.categories;
  }

  return [item.category, item.categorySecondary].filter(
    (value): value is string => Boolean(value && value.trim().length > 0),
  );
}

function getItemTypes(item: PortfolioItem) {
  if (!Array.isArray(item.types)) {
    return [];
  }

  return item.types.filter((value) => value && value.trim().length > 0);
}

function getClientContext(item: PortfolioItem) {
  return getItemCategories(item)[0] ?? "Business Client";
}

function getProjectType(item: PortfolioItem) {
  return getItemTypes(item)[0] ?? "Custom Solution";
}

export function SelectedWorksSection({ works, items }: SelectedWorksSectionProps) {
  const sorted = useMemo(() => [...items].sort((a, b) => a.order - b.order), [items]);
  const featured = sorted[0];
  const gallery = sorted.slice(0, 4);
  const [activeId, setActiveId] = useState<string | null>(featured?.id ?? null);
  const [isImmersive, setIsImmersive] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!featured) {
    return null;
  }

  const active = gallery.find((item) => item.id === activeId) ?? featured;
  const activeCategories = getItemCategories(active);

  function handleContentWheel(event: React.WheelEvent<HTMLDivElement>) {
    const element = contentRef.current;

    if (!element) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = element;
    const atTop = scrollTop <= 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
    const scrollingDown = event.deltaY > 0;
    const scrollingUp = event.deltaY < 0;

    // Hand off wheel delta to the page when inner content has reached its bounds.
    if ((scrollingDown && atBottom) || (scrollingUp && atTop)) {
      event.preventDefault();
      window.scrollBy({ top: event.deltaY, behavior: "auto" });
    }
  }

  function handleSelectWork(itemId: string) {
    setActiveId(itemId);

    // Keep the active project card in view when selecting from the lower gallery grid.
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  const content = (
    <div
      ref={contentRef}
      onWheel={handleContentWheel}
      className="h-full overflow-auto pr-1"
    >
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Karya Pilihan</p>
          <h3 className="font-headline text-4xl text-primary md:text-5xl">Karya Terpilih</h3>
          <p className="mt-2 max-w-xl text-sm text-on-surface-variant md:text-base">{works.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/portfolio"
            className="inline-flex w-fit rounded-xl border border-primary/20 bg-[linear-gradient(120deg,rgba(29,90,141,0.08),rgba(88,230,255,0.2))] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary transition hover:border-primary/35 hover:bg-[linear-gradient(120deg,rgba(29,90,141,0.12),rgba(88,230,255,0.28))]"
          >
            Lihat Semua Portfolio
          </a>
          <button
            type="button"
            onClick={() => setIsImmersive((prev) => !prev)}
            aria-label={isImmersive ? "Minimize tampilan karya" : "Perbesar tampilan karya"}
            className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-[linear-gradient(120deg,rgba(29,90,141,0.08),rgba(88,230,255,0.2))] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-primary transition hover:border-primary/35 hover:bg-[linear-gradient(120deg,rgba(29,90,141,0.12),rgba(88,230,255,0.28))]"
          >
            {isImmersive ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            {isImmersive ? "Kecilkan" : "Layar Penuh"}
          </button>
        </div>
      </div>

      <div
        style={{
          opacity: 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {isImmersive ? (
          <article className="mb-6 overflow-hidden rounded-[1.6rem] border border-outline-variant/20 bg-surface-container-low p-4 md:p-5">
            <div className="relative mb-4 min-h-[320px] overflow-hidden rounded-xl bg-surface-container md:min-h-[400px]">
              <Image
                src={active.imageUrl}
                alt={active.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 90vw"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-end">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">Tampilan Proyek Detail</p>
                <h4 className="mb-2 font-headline text-3xl leading-tight text-primary md:text-4xl">{active.title}</h4>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant/75">
                  Konteks: {getClientContext(active)} • Tipe Proyek: {getProjectType(active)}
                </p>
                <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">{active.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                {activeCategories.slice(0, 2).map((category) => (
                  <span key={category} className="rounded-full bg-surface-container-high px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {category}
                  </span>
                ))}
                <span className="rounded-full bg-secondary-container/45 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-secondary-container">
                  {statusLabel(active)}
                </span>
              </div>
            </div>
          </article>
        ) : (
          <article className="mb-6 grid grid-cols-1 gap-5 overflow-hidden rounded-[1.6rem] border border-outline-variant/20 bg-surface-container-low p-5 md:grid-cols-[1.1fr_1fr]">
            <div className="relative min-h-[250px] overflow-hidden rounded-xl bg-surface-container">
              <Image
                src={active.imageUrl}
                alt={active.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">Proyek Unggulan</p>
                <h4 className="mb-2 font-headline text-3xl leading-tight text-primary">{active.title}</h4>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant/75">
                  Konteks: {getClientContext(active)} • Tipe Proyek: {getProjectType(active)}
                </p>
                <p className="text-sm leading-relaxed text-on-surface-variant">{active.description}</p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {activeCategories.slice(0, 2).map((category) => (
                  <span key={category} className="rounded-full bg-surface-container-high px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {category}
                  </span>
                ))}
                <span className="rounded-full bg-secondary-container/45 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-secondary-container">
                  {statusLabel(active)}
                </span>
              </div>
            </div>
          </article>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {gallery.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSelectWork(item.id)}
            className={`group overflow-hidden rounded-[1.2rem] border bg-surface text-left shadow-[0_8px_20px_rgba(24,34,45,0.06)] transition ${
              active.id === item.id
                ? "border-primary/45 ring-2 ring-primary/25"
                : "border-outline-variant/20 hover:border-primary/25"
            }`}
          >
            <div className="relative h-40 overflow-hidden bg-surface-container-low">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 24vw"
              />
            </div>
            <div className="p-4">
              <h5 className="mb-1 font-headline text-2xl leading-tight text-primary">{item.title}</h5>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-on-surface-variant/75">
                {getClientContext(item)} • {getProjectType(item)}
              </p>
              <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-on-surface-variant">{item.description}</p>
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide">
                <span className="text-secondary">{getItemCategories(item)[0] ?? "General"}</span>
                <span className="text-on-surface-variant">Status: {statusLabel(item)}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="karya" className="relative w-full overflow-hidden bg-gradient-to-b from-surface via-surface-container-low/30 to-surface py-16 md:py-20">
     <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-surface-container/45 to-transparent" />
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        <ContainerScroll
          titleComponent={
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Portfolio Showcase</p>
              <h2 className="font-headline text-4xl leading-tight text-primary md:text-6xl">
                Jelajahi Karya di Dalam{" "}
                <span className="serif-italic">
                  Mode Interaktif <span className="md:hidden">Mobile</span>
                  <span className="hidden md:inline">Laptop</span>
                </span>
              </h2>
            </div>
          }
        >
          <div className="relative h-full rounded-xl">
            {content}
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}
