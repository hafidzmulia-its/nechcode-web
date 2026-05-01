"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/shared/reveal";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import { layoutContainer } from "@/config/layout";
import type { HomeContent } from "@/content/home";
import type { PortfolioItem } from "@/types/portfolio";

type PortfolioPageProps = {
  content: HomeContent;
  items: PortfolioItem[];
};

const filters = [
  "Semua",
  "Institutional & Research",
  "Business & Organization Websites",
  "Systems & Internal Tools",
  "Social Impact Projects",
  "Developer Projects",
  "Upcoming / In Development",
] as const;

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

function mapToMvpCategory(item: PortfolioItem) {
  const source = `${getItemCategories(item).join(" ")} ${getItemTypes(item).join(" ")}`.toLowerCase();

  if (/research|institution|campus|lab/.test(source)) {
    return "Institutional & Research";
  }
  if (/dashboard|admin|system|tool|erp/.test(source)) {
    return "Systems & Internal Tools";
  }
  if (/social|impact|donation|community/.test(source)) {
    return "Social Impact Projects";
  }
  if (/dev|developer|engineering/.test(source)) {
    return "Developer Projects";
  }
  if (/upcoming|in development|concept/.test(source)) {
    return "Upcoming / In Development";
  }

  return "Business & Organization Websites";
}

function mapTags(item: PortfolioItem) {
  const base = [...getItemCategories(item), ...getItemTypes(item)];
  const source = `${item.title} ${item.description}`.toLowerCase();

  if (/dashboard|admin/.test(source)) {
    base.push("Dashboard", "Admin Panel");
  }
  if (/automation|ai/.test(source)) {
    base.push("Automation");
  }
  if (/payment|gateway/.test(source)) {
    base.push("Payment Gateway");
  }
  if (/landing|website|profile/.test(source)) {
    base.push("Landing Page");
  }

  return Array.from(new Set(base)).slice(0, 4);
}

function getClientContext(item: PortfolioItem) {
  return getItemCategories(item)[0] ?? "Business Client";
}

function getProjectType(item: PortfolioItem) {
  return getItemTypes(item)[0] ?? "Custom Digital Build";
}

function getScopeLabel(item: PortfolioItem) {
  const source = `${getItemCategories(item).join(" ")} ${getItemTypes(item).join(" ")}`.toLowerCase();

  if (/chatbot|ai|automation/.test(source)) {
    return "Scope: Discovery, Workflow Design, Build, Iteration";
  }

  if (/dashboard|admin|system|tool|erp/.test(source)) {
    return "Scope: Discovery, UI/UX, System Build, Handover";
  }

  return "Scope: Strategy, UI/UX, Development, Launch";
}

function getOutcomeLabel(item: PortfolioItem) {
  const match = item.description.match(/(\d+%)/);

  if (match?.[1]) {
    return `Outcome: efisiensi operasional +${match[1]}`;
  }

  return "Outcome: target KPI disepakati bersama klien";
}

export function PortfolioPage({ content, items }: PortfolioPageProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Semua");

  const normalized = useMemo(() => {
    return [...items]
      .sort((a, b) => a.order - b.order)
      .map((item) => ({
        ...item,
        mvpCategory: mapToMvpCategory(item),
        tags: mapTags(item),
        clientContext: getClientContext(item),
        projectType: getProjectType(item),
        scopeLabel: getScopeLabel(item),
        outcomeLabel: getOutcomeLabel(item),
        status: item.published ? "Dipublikasikan" : "Dalam Pengembangan",
      }));
  }, [items]);

  const featured = normalized[0];
  const filtered = normalized.filter((item) => activeFilter === "Semua" || item.mvpCategory === activeFilter);

  return (
    <div className="selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar brand={content.brand} nav={content.nav} cta={content.headerCta} />

      <main className="pb-24">
        <section className="relative w-full overflow-hidden bg-surface">
          <div className={`${layoutContainer} py-20`}>
            <Reveal once y={18} className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Portfolio</p>
              <h1 className="font-headline text-5xl leading-tight text-primary md:text-7xl">
                Karya Terpilih dengan Outcome yang <span className="serif-italic">Terukur</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-on-surface-variant">
                Rangkaian proyek website, sistem internal, workflow AI, dan integrasi custom yang dirancang untuk menyelesaikan masalah operasional nyata dengan scope jelas.
              </p>
            </Reveal>
          </div>
        </section>

        {featured ? (
          <section className="w-full bg-gradient-to-b from-surface-container-low/55 to-surface py-8 md:py-10">
            <div className={layoutContainer}>
              <Reveal y={18}>
                <article className="grid grid-cols-1 gap-7 overflow-hidden rounded-[2rem] border border-outline-variant/20 bg-surface-container-lowest p-7 shadow-[0_16px_36px_rgba(24,34,45,0.09)] md:grid-cols-[1.2fr_1fr]">
                  <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-surface-container-low">
                    <Image
                      src={featured.imageUrl}
                      alt={featured.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Karya Unggulan</p>
                      <h2 className="mb-3 font-headline text-4xl text-primary">{featured.title}</h2>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-on-surface-variant/75">
                        Konteks: {featured.clientContext} • Tipe Proyek: {featured.projectType}
                      </p>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant/75">{featured.scopeLabel}</p>
                      <p className="mb-5 text-sm leading-relaxed text-on-surface-variant">{featured.description}</p>
                      <div className="mb-5 flex flex-wrap gap-2">
                        {featured.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-primary/15 bg-[linear-gradient(120deg,rgba(29,90,141,0.08),rgba(88,230,255,0.16))] px-3 py-1 text-xs font-semibold text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-outline-variant/25 bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                        {featured.mvpCategory}
                      </span>
                      <span className="rounded-full bg-[linear-gradient(120deg,rgba(29,90,141,0.14),rgba(88,230,255,0.34))] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                        Status: {featured.status}
                      </span>
                    </div>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-secondary">{featured.outcomeLabel}</p>
                  </div>
                </article>
              </Reveal>
            </div>
          </section>
        ) : null}

        <section className="w-full bg-surface py-10 md:py-14">
          <div className={layoutContainer}>
            <div className="mb-8 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                    activeFilter === filter
                      ? "bg-[linear-gradient(135deg,var(--primary-container),var(--primary),var(--secondary))] text-white shadow-[0_8px_18px_rgba(29,90,141,0.24)]"
                      : "border border-primary/20 bg-surface-container-lowest text-primary hover:border-primary/35 hover:bg-[linear-gradient(120deg,rgba(29,90,141,0.07),rgba(88,230,255,0.16))]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item, index) => (
                <Reveal key={item.id} y={16} delay={index * 0.03} duration={0.32}>
                  <article className="group h-full overflow-hidden rounded-[1.5rem] border border-outline-variant/20 bg-surface-container-lowest shadow-[0_10px_24px_rgba(24,34,45,0.06)]">
                    <div className="relative h-48 overflow-hidden bg-surface-container-low">
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="mb-2 font-headline text-3xl leading-tight text-primary">{item.title}</h3>
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant/75">
                        {item.clientContext} • {item.projectType}
                      </p>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant/75">{item.scopeLabel}</p>
                      <p className="mb-4 text-sm leading-relaxed text-on-surface-variant">{item.description}</p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-primary/15 bg-[linear-gradient(120deg,rgba(29,90,141,0.08),rgba(88,230,255,0.16))] px-3 py-1 text-[11px] font-semibold text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-secondary">{item.mvpCategory}</span>
                        <span className="text-xs font-semibold text-on-surface-variant">Status: {item.status}</span>
                      </div>
                      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-secondary">{item.outcomeLabel}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
