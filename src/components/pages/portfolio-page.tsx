"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/shared/reveal";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import type { HomeContent } from "@/content/home";
import type { PortfolioItem } from "@/types/portfolio";

type PortfolioPageProps = {
  content: HomeContent;
  items: PortfolioItem[];
};

const filters = [
  "All",
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

export function PortfolioPage({ content, items }: PortfolioPageProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const normalized = useMemo(() => {
    return [...items]
      .sort((a, b) => a.order - b.order)
      .map((item) => ({
        ...item,
        mvpCategory: mapToMvpCategory(item),
        tags: mapTags(item),
        status: item.published ? "Published" : "In Development",
      }));
  }, [items]);

  const featured = normalized[0];
  const filtered = normalized.filter((item) => activeFilter === "All" || item.mvpCategory === activeFilter);

  return (
    <div className="selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar brand={content.brand} nav={content.nav} cta={content.headerCta} />

      <main className="pb-24">
        <section className="w-full bg-surface">
          <div className="mx-auto w-full max-w-[1360px] px-6 py-20 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={18} className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Portfolio</p>
              <h1 className="font-headline text-5xl leading-tight text-primary md:text-7xl">
                Karya Terpilih dengan Outcome yang <span className="serif-italic">Terukur</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-on-surface-variant">
                Template ini mengikuti pattern 21st: featured project kuat di atas, filter kategori jelas, lalu grid karya yang rapi dan mudah dipindai.
              </p>
            </Reveal>
          </div>
        </section>

        {featured ? (
          <section className="w-full bg-gradient-to-b from-surface-container-low/55 to-surface py-8 md:py-10">
            <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
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
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Featured Work</p>
                      <h2 className="mb-3 font-headline text-4xl text-primary">{featured.title}</h2>
                      <p className="mb-5 text-sm leading-relaxed text-on-surface-variant">{featured.description}</p>
                      <div className="mb-5 flex flex-wrap gap-2">
                        {featured.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-surface-container px-3 py-1 text-xs font-semibold text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-outline-variant/25 bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                        {featured.mvpCategory}
                      </span>
                      <span className="rounded-full bg-secondary-container/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-secondary-container">
                        {featured.status}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          </section>
        ) : null}

        <section className="w-full bg-surface py-10 md:py-14">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <div className="mb-8 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                    activeFilter === filter
                      ? "bg-primary text-white"
                      : "border border-outline-variant/30 bg-surface-container-lowest text-primary hover:bg-surface-container-low"
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
                      <p className="mb-4 text-sm leading-relaxed text-on-surface-variant">{item.description}</p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-surface-container px-3 py-1 text-[11px] font-semibold text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-secondary">{item.mvpCategory}</span>
                        <span className="text-xs font-semibold text-on-surface-variant">{item.status}</span>
                      </div>
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
