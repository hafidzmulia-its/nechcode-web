"use client";

import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import { getServicePillarById, servicesContent } from "@/content/services";
import type { HomeContent } from "@/content/home";

type WebServicePageProps = {
  content: HomeContent;
};

type ShowcaseItem = {
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
};

const showcaseItems: ShowcaseItem[] = [
  {
    title: "Nestbloom",
    category: "Company Profile",
    description:
      "Nestbloom adalah platform edukasi pengasuhan di bawah naungan Kementerian Kesehatan Republik Indonesia. Platform ini dirancang untuk membantu calon pengasuh di Indonesia dalam mempersiapkan diri, baik secara fisik maupun emosional.",
    image: "/img/porto/web-1.png",
    href: "https://nestbloom.vercel.app",
  },
  {
    title: "Soulmom",
    category: "Microsite",
    description:
      "SOULMOM adalah platform digital yang dirancang untuk membantu ibu di Indonesia melakukan deteksi dini kesehatan mental pasca melahirkan secara mandiri, mudah, dan privat.",
    image: "/img/porto/web-2.png",
    href: "https://elkpd.vercel.app",
  },
  {
    title: "E-LKPD",
    category: "Katalog Produk",
    description:
      "ELKPD - E-Learning Platform adalah sebuah media pembelajaran digital inovatif berbentuk Lembar Kerja Peserta Didik Elektronik (E-LKPD).",
    image: "/img/porto/web-3.png",
    href: "https://soulmom.vercel.app",
  },
];

export function WebServicePage({ content }: WebServicePageProps) {
  const webPillar = getServicePillarById("web");
  const specialPrograms = servicesContent.specialPrograms;

  return (
    <div className="selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar
        brand={content.brand}
        nav={content.nav}
        cta={content.headerCta}
      />

      <main className="pb-24 md:pb-32">
        {/* ===================== HERO ===================== */}
        <section className="relative w-full overflow-hidden bg-primary">
          <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-secondary/15 blur-[140px]" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-secondary-container/15 blur-[130px]" />

          <div className="mx-auto w-full max-w-[1240px] px-6 pb-16 pt-16 md:px-8 md:pb-20 md:pt-20 lg:px-10 xl:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <Reveal once y={20}>
                <span className="mb-6 inline-flex items-center rounded-full border border-secondary-container/60 px-5 py-1.5 text-sm italic text-secondary-container">
                  Layanan Website
                </span>

                <h1 className="font-headline text-[2.25rem] leading-[1.12] text-white md:text-5xl lg:text-[3.25rem]">
                  Layanan digital yang bisa dimulai dari paket, lalu tumbuh
                  sesuai kebutuhan.
                </h1>

                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
                  NechCode membantu bisnis, UMKM, organisasi, dan institusi
                  membangun website yang kredibel, cepat, dan siap dipakai sejak
                  hari pertama.
                </p>

                <a
                  href="#pricing"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E37434] px-7 py-3.5 text-sm font-bold !text-white shadow-[0_10px_24px_rgba(227,116,52,0.35)] transition hover:-translate-y-0.5 hover:bg-[#c9652a]"
                >
                  Lihat Selengkapnya
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </a>
              </Reveal>

              <div className="hidden lg:flex lg:justify-center">
                <div className="relative h-[380px] w-[380px] xl:h-[420px] xl:w-[420px]">
                  <div className="absolute inset-0 rounded-full bg-white/10" />
                  <div className="absolute inset-0 animate-[float_6s_ease-in-out_infinite]">
                    <Image
                      src="/img/asset9.png"
                      alt="Ilustrasi layanan website NechCode"
                      fill
                      priority
                      sizes="420px"
                      className="object-contain p-8"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== HASIL KARYA ===================== */}
        <section className="w-full bg-surface py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={16} className="max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                Portfolio Pilihan
              </p>
              <h2 className="font-headline text-4xl leading-tight text-primary md:text-5xl lg:text-6xl">
                Hasil Karya dari Kami
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
                Beberapa website yang kami kerjakan untuk klien dari berbagai
                industri. Klik salah satu untuk melihat studi kasusnya.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {showcaseItems.map((item, index) => (
                <Reveal key={item.title} once y={18} delay={index * 0.08}>
                  <Link
                    href={item.href}
                    target="_blank"
                    className="group relative block h-full overflow-hidden rounded-[1.75rem] bg-surface-container-low shadow-[0_12px_28px_rgba(34,46,58,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(34,46,58,0.14)]"
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

        {/* ===================== PROGRAM KHUSUS ===================== */}
        <section className="w-full bg-surface pb-20 md:pb-24">
          <div className="mx-auto w-full max-w-[1240px] px-6 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={18}>
              <div
                className="rounded-[2rem] p-8 md:p-12 lg:p-14"
                style={{ backgroundColor: "#D97D55" }}
              >
                <h2 className="font-headline text-3xl font-bold text-white md:text-4xl">
                  Program Khusus untuk tahap awal!
                </h2>
                <p className="mt-3 text-base text-white/85 md:text-lg">
                  Kami membuka program ini agar Anda dapat memulai transformasi
                  digital bersama kami!
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {specialPrograms.items.map((item, index) => (
                    <Reveal key={item.title} once y={14} delay={index * 0.06}>
                      <article
                        className="h-full rounded-[1.25rem] p-6 md:p-7"
                        style={{ backgroundColor: "#F5EEDC" }}
                      >
                        <div
                          className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{ backgroundColor: "#D97D55" }}
                        >
                          <span className="material-symbols-outlined text-lg text-white">
                            {index === 0
                              ? "favorite"
                              : index === 1
                                ? "school"
                                : "storefront"}
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

                <p className="mt-8 text-sm text-white/75">
                  {specialPrograms.note}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===================== PRICING ===================== */}
        <section id="pricing" className="w-full bg-[#F5EEDC] pb-24 md:pb-32">
          <div className="mx-auto w-full max-w-[1240px] px-6 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={16} className="pb-12 pt-20 md:pt-24">
              <h2 className="font-headline text-3xl leading-snug text-primary md:text-4xl lg:text-5xl">
                Mulai dari kebutuhan dasar yang harus cepat jalan sampai
                implementasi custom yang lebih kompleks.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-stretch">
              {webPillar.packages.map((pkg, index) => {
                const isFeatured = index === 1;

                return (
                  <Reveal key={pkg.name} once y={24} delay={index * 0.09}>
                    <article
                      className={`group relative flex h-full flex-col rounded-2xl bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 md:p-8 ${
                        isFeatured
                          ? "ring-2 ring-primary shadow-[0_16px_40px_rgba(0,66,111,0.18)] hover:shadow-[0_28px_56px_rgba(0,66,111,0.24)]"
                          : "ring-1 ring-outline-variant/30 shadow-[0_4px_16px_rgba(34,46,58,0.06)] hover:shadow-[0_20px_40px_rgba(34,46,58,0.13)]"
                      }`}
                    >
                      <h3 className="font-headline text-2xl text-primary md:text-3xl">
                        {pkg.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                        {pkg.description}
                      </p>

                      <div className="mt-5 border-t border-outline-variant/20 pt-5">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
                          Spesial
                        </p>
                        <p className="mt-1 font-headline text-3xl font-bold text-primary">
                          {pkg.priceCue}
                        </p>
                        {pkg.subnote ? (
                          <p className="mt-1.5 text-xs text-on-surface-variant">
                            {pkg.subnote}
                          </p>
                        ) : null}
                      </div>

                      {pkg.features?.length ? (
                        <ul className="mt-5 flex-1 space-y-2.5">
                          {pkg.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2.5"
                            >
                              <span className="material-symbols-outlined mt-0.5 text-base text-secondary">
                                check
                              </span>
                              <span className="text-sm leading-relaxed text-on-surface-variant">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <a
                        href={pkg.cta.href}
                        target={pkg.cta.external ? "_blank" : undefined}
                        rel={pkg.cta.external ? "noreferrer" : undefined}
                        className="mt-8 block w-full rounded-full bg-primary py-3.5 text-center text-sm font-bold !text-white transition hover:opacity-90 active:scale-[0.98]"
                      >
                        {pkg.cta.label}
                      </a>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <Reveal once y={10} delay={0.12} className="mt-8">
              <p className="text-center text-sm text-on-surface-variant">
                {webPillar.microcopy}
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
