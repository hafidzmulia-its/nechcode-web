"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Reveal } from "@/components/shared/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import { servicesContent, type ServicePillarId } from "@/content/services";
import type { HomeContent } from "@/content/home";

type ServicesPageProps = {
  content: HomeContent;
  initialPillar?: string;
};

function isPillarId(value: string | null): value is ServicePillarId {
  return value === "web" || value === "mobile" || value === "ai";
}

export function ServicesPage({ content, initialPillar }: ServicesPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const initialPillarCandidate = initialPillar ?? null;
  const normalizedInitialPillar: ServicePillarId = isPillarId(initialPillarCandidate)
    ? initialPillarCandidate
    : "web";

  const [activePillarId, setActivePillarId] = useState<ServicePillarId>(normalizedInitialPillar);

  useEffect(() => {
    setActivePillarId(normalizedInitialPillar);
  }, [normalizedInitialPillar]);

  const activePillar = useMemo(
    () => servicesContent.pillars.find((pillar) => pillar.id === activePillarId) ?? servicesContent.pillars[0],
    [activePillarId],
  );

  const sectionLinks = [
    { label: "Harga", href: "#pricing" },
    { label: "Cara Kerja", href: "#ways" },
    { label: "Program", href: "#programs" },
    { label: "FAQ", href: "#faq-services" },
  ];

  function pillarIcon(pillarId: ServicePillarId) {
    if (pillarId === "web") return "language";
    if (pillarId === "mobile") return "phone_iphone";
    return "smart_toy";
  }

  function handleSelectPillar(nextPillarId: ServicePillarId) {
    setActivePillarId(nextPillarId);
    router.replace(`${pathname}?pillar=${nextPillarId}`, { scroll: false });

    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        const pricingAnchor = document.getElementById("pricing-packages");
        pricingAnchor?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  return (
    <div className="selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar brand={content.brand} nav={content.nav} cta={content.headerCta} />

      <main className="pb-36 md:pb-20">
        <section className="relative w-full overflow-hidden bg-surface">
          <div className="pointer-events-none absolute -right-24 top-4 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="mx-auto w-full max-w-[1360px] px-6 py-20 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={18} className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Services</p>
              <h1 className="font-headline text-5xl leading-tight text-primary md:text-7xl">
                Layanan digital yang bisa dimulai dari paket, lalu tumbuh sesuai kebutuhan
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-2xl">
                {servicesContent.hero.body}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="sticky top-[88px] z-30 hidden w-full border-y border-outline-variant/15 bg-surface/90 backdrop-blur md:block lg:top-[92px]">
          <div className="mx-auto flex w-full max-w-[1360px] items-center gap-2 overflow-x-auto px-6 py-3 md:px-8 lg:px-10 xl:px-12">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-full border border-outline-variant/25 bg-surface-container px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary transition hover:-translate-y-0.5 hover:bg-surface-container-high"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4 md:hidden">
          <div className="pointer-events-auto mx-auto max-w-sm rounded-full border border-outline-variant/25 bg-surface-container-low/95 p-2 shadow-[0_16px_28px_rgba(30,28,17,0.14)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-1">
              {sectionLinks.map((link) => (
                <a
                  key={`mobile-${link.href}`}
                  href={link.href}
                  className="min-w-0 flex-1 rounded-full px-2 py-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-primary transition hover:bg-surface-container"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <section id="pricing" className="w-full bg-gradient-to-b from-surface-container-low/55 to-surface py-12 md:py-16">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={14} className="max-w-4xl">
              <h2 className="font-headline text-4xl text-primary md:text-5xl">{servicesContent.pricingIntro.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-on-surface-variant md:text-lg">
                {servicesContent.pricingIntro.body}
              </p>
            </Reveal>

            <Reveal y={14} delay={0.04} className="mt-8">
              <div className="grid grid-cols-1 gap-2 rounded-2xl border border-outline-variant/20 bg-surface-container-low p-2.5 md:grid-cols-3 md:gap-3">
                {servicesContent.pillars.map((pillar) => {
                  const isActive = pillar.id === activePillarId;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => handleSelectPillar(pillar.id)}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                        isActive
                          ? "border-primary bg-primary text-white shadow-[0_8px_18px_rgba(29,90,141,0.26)]"
                          : "border-outline-variant/20 bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                      aria-pressed={isActive}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`material-symbols-outlined text-base ${isActive ? "text-secondary-container" : "text-primary"}`}>
                          {pillarIcon(pillar.id)}
                        </span>
                        <div>
                          <p className={`text-sm font-bold md:text-base ${isActive ? "text-white" : "text-primary"}`}>{pillar.selectorLabel}</p>
                          <p className={`text-[11px] ${isActive ? "text-white/80" : "text-on-surface-variant"}`}>{pillar.navbarPriceCue}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal y={14} delay={0.08} className="mt-8">
              <div id="pricing-packages" className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-7 shadow-[0_12px_28px_rgba(34,46,58,0.07)] md:p-10">
                <h3 className="font-headline text-3xl text-primary md:text-4xl">{activePillar.sectionTitle}</h3>
                <p className="mt-4 max-w-4xl text-on-surface-variant">{activePillar.sectionBody}</p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch">
                  {activePillar.packages.map((pkg, index) => {
                    const isFeatured = !pkg.isCustom && index === 1;

                    return (
                      <article
                        key={`${activePillar.id}-${pkg.name}`}
                        className={`relative flex h-full flex-col rounded-[1.35rem] border p-6 shadow-[0_8px_18px_rgba(35,46,58,0.06)] transition ${
                          isFeatured
                            ? "z-10 border-primary bg-primary text-white md:scale-[1.03]"
                            : pkg.isCustom
                              ? "border-secondary/40 bg-[#e9f6f9]"
                              : "border-outline-variant/20 bg-surface-container-lowest hover:-translate-y-1"
                        }`}
                      >
                        {pkg.badge ? (
                          <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${isFeatured ? "bg-secondary text-on-secondary" : "bg-surface-container text-secondary"}`}>
                            {pkg.badge}
                          </span>
                        ) : null}

                        <p className={`mb-2 text-xs font-bold uppercase tracking-[0.16em] ${isFeatured ? "text-secondary-container" : "text-secondary"}`}>
                          Package {index + 1}
                        </p>
                        <h4 className={`font-headline text-2xl ${isFeatured ? "text-white" : "text-primary"}`}>{pkg.name}</h4>
                        <p className={`mt-3 text-sm leading-relaxed ${isFeatured ? "text-white/85" : "text-on-surface-variant"}`}>{pkg.description}</p>
                        <p className={`mt-4 font-headline text-3xl ${isFeatured ? "text-white" : "text-primary"}`}>{pkg.priceCue}</p>
                        {pkg.subnote ? <p className={`mt-2 text-xs ${isFeatured ? "text-white/80" : "text-on-surface-variant"}`}>{pkg.subnote}</p> : null}

                        {pkg.features?.length ? (
                          <ul className="mt-5 space-y-2.5">
                            {pkg.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-2.5">
                                <span className={`material-symbols-outlined text-base ${isFeatured ? "text-secondary-container" : "text-secondary"}`}>
                                  check_circle
                                </span>
                                <span className={`text-sm ${isFeatured ? "text-white/90" : "text-on-surface-variant"}`}>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        <a
                          href={pkg.cta.href}
                          target={pkg.cta.external ? "_blank" : undefined}
                          rel={pkg.cta.external ? "noreferrer" : undefined}
                          className={`mt-6 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold transition ${isFeatured ? "bg-secondary-container !text-on-secondary-container hover:bg-secondary-fixed" : "bg-primary !text-white hover:opacity-90"}`}
                        >
                          {pkg.cta.label}
                        </a>
                      </article>
                    );
                  })}
                </div>

                <p className="mt-6 text-sm text-on-surface-variant">{activePillar.microcopy}</p>
              </div>
            </Reveal>

            <Reveal y={12} delay={0.1} className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#pricing"
                className="inline-flex rounded-xl border border-outline-variant/25 bg-surface-container px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-surface-container-high"
              >
                Bandingkan Semua Opsi
              </a>
              <a
                href={servicesContent.megaMenu.consultCta.href}
                target={servicesContent.megaMenu.consultCta.external ? "_blank" : undefined}
                rel={servicesContent.megaMenu.consultCta.external ? "noreferrer" : undefined}
                className="inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-bold !text-white transition hover:opacity-90"
              >
                Konsultasi via WhatsApp
              </a>
            </Reveal>
          </div>
        </section>

        <section id="ways" className="w-full bg-surface py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <Reveal y={16}>
              <div className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-8 md:p-10">
                <h3 className="font-headline text-4xl text-primary">Cara Kerja Kami</h3>
                <p className="mt-4 max-w-3xl text-on-surface-variant">{servicesContent.waysToWork.description}</p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {servicesContent.waysToWork.items.map((item, index) => (
                    <Reveal key={item.title} y={14} delay={index * 0.04} duration={0.3}>
                      <article className="h-full rounded-[1.25rem] border border-outline-variant/20 bg-surface-container-lowest p-6">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Ways to Work</p>
                        <h4 className="mb-2 font-headline text-2xl text-primary">{item.title}</h4>
                        <p className="text-sm text-on-surface-variant">{item.description}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal y={16} delay={0.06} className="mt-8">
              <div id="programs" className="relative overflow-hidden rounded-[2rem] border border-[#7E4B00]/35 bg-tertiary p-8 text-white md:p-10">
                <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:26px_26px]" />
                <h3 className="relative font-headline text-4xl text-white">{servicesContent.specialPrograms.title}</h3>
                <p className="relative mt-4 max-w-3xl text-white/80">{servicesContent.specialPrograms.body}</p>
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {servicesContent.specialPrograms.items.map((item) => (
                    <article key={item.title} className="relative rounded-[1.25rem] border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                      <h4 className="mb-2 font-headline text-2xl text-white">{item.title}</h4>
                      <p className="text-sm text-white/80">{item.body}</p>
                    </article>
                  ))}
                </div>
                <p className="relative mt-5 text-sm font-semibold text-tertiary-fixed">{servicesContent.specialPrograms.note}</p>
              </div>
            </Reveal>

            <Reveal y={16} delay={0.08} className="mt-8">
              <div id="faq-services" className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-8 md:p-10">
                <h3 className="mb-6 font-headline text-4xl text-primary">{servicesContent.faq.heading}</h3>
                <Accordion type="single" collapsible className="space-y-3">
                  {servicesContent.faq.items.map((item, index) => (
                    <AccordionItem key={item.question} value={`service-faq-${index}`}>
                      <AccordionTrigger className="text-base text-primary hover:no-underline">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-on-surface-variant">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <a
                  href={content.headerCta.href}
                  target={content.headerCta.external ? "_blank" : undefined}
                  rel={content.headerCta.external ? "noreferrer" : undefined}
                  className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold !text-white transition hover:opacity-90"
                >
                  Diskusikan Scope
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
