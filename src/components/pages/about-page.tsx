import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import { aboutContent } from "@/content/about";
import type { HomeContent } from "@/content/home";

type AboutPageProps = {
  content: HomeContent;
};

export function AboutPage({ content }: AboutPageProps) {
  const { about } = content;
  const { vision, missions, capabilities, principles } = aboutContent;

  return (
    <div className="bg-[#FFFFFF] selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar
        brand={content.brand}
        nav={content.nav}
        cta={content.headerCta}
      />

      <main className="bg-[#FFFFFF] pb-20">
        {/* ===================== HERO — SIAPA NECHCODE ===================== */}
        <section className="w-full bg-brand-deep py-20 md:py-24">
          <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={18}>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-secondary-container">
                Tentang NechCode
              </p>
              <h1 className="mb-5 font-headline text-5xl leading-tight text-white md:text-6xl lg:text-7xl">
                Solusi teknologi yang{" "}
                <span className="serif-italic">hadir untuk yang nyata.</span>
              </h1>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                NechCode berasal dari gabungan kata{" "}
                <strong className="text-white">Next</strong>,{" "}
                <strong className="text-white">Technology</strong>, dan{" "}
                <strong className="text-white">Code</strong> — melambangkan
                generasi baru teknologi yang dibangun melalui kode, inovasi, dan
                sistem digital untuk menciptakan solusi masa depan.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
                Kami hadir sebagai{" "}
                <strong className="text-white">Solusi Teknologi</strong> yang
                berfokus pada pengembangan software, sistem digital, AI, dan
                otomatisasi — untuk membantu{" "}
                <strong className="text-white">Bisnis, UMKM, Organisasi</strong>
                , serta Masyarakat berkembang di era digital.
              </p>
              <p className="mt-4 text-sm italic text-white/60">
                &ldquo;Innovate Locally, Deliver Globally&rdquo;
              </p>
            </Reveal>

            <Reveal y={16} delay={0.06} className="flex justify-center">
              <div className="flex h-[320px] w-[320px] items-center justify-center rounded-full bg-surface shadow-[0_24px_56px_rgba(22,66,91,0.28)] md:h-[380px] md:w-[380px] xl:h-[420px] xl:w-[420px]">
                <div className="relative h-[180px] w-[180px] md:h-[220px] md:w-[220px] xl:h-[250px] xl:w-[250px]">
                  <Image
                    src="/logo-aseli.png"
                    alt="NechCode Logo"
                    fill
                    priority
                    sizes="250px"
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===================== KENAPA KAMI HADIR ===================== */}
        <section className="w-full bg-[#FFFFFF] py-16 md:py-20">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={16} className="max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                Mengapa Kami Hadir
              </p>
              <h2 className="font-headline text-3xl leading-tight text-primary md:text-4xl lg:text-5xl">
                Banyak bisnis belum punya akses ke teknologi yang tepat — kami
                hadir untuk mengubah itu.
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              <Reveal once y={14} delay={0}>
                <div className="h-full rounded-[1.4rem] bg-brand-accent p-6 shadow-[0_4px_16px_rgba(227,116,52,0.25)]">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                    Visi
                  </p>
                  <p className="font-headline text-xl text-white md:text-2xl">
                    {vision}
                  </p>
                </div>
              </Reveal>

              <Reveal once y={14} delay={0.05}>
                <div className="h-full rounded-[1.4rem] bg-brand-accent p-6 shadow-[0_4px_16px_rgba(227,116,52,0.25)]">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                    Misi
                  </p>
                  <ul className="space-y-2.5">
                    {missions.map((mission) => (
                      <li key={mission} className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined mt-0.5 text-base text-white">
                          check
                        </span>
                        <span className="text-sm leading-relaxed text-white/90">
                          {mission}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===================== APA YANG BISA KAMI LAKUKAN ===================== */}
        <section className="w-full bg-brand-deep py-16 md:py-20">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={16} className="max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary-container">
                Apa yang Bisa Kami Lakukan
              </p>
              <h2 className="font-headline text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
                Dari website hingga AI — kami bangun apa yang bisnis Anda
                benar-benar butuhkan.
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {capabilities.map((item, index) => (
                <Reveal key={item.title} once y={18} delay={index * 0.07}>
                  <article className="flex h-full flex-col rounded-[1.4rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent">
                      <span className="material-symbols-outlined text-lg text-white">
                        {item.icon}
                      </span>
                    </div>
                    <h3 className="mb-2 font-headline text-2xl text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/70">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== PRINSIP KERJA ===================== */}
        <section className="w-full bg-[#FFFFFF] py-16 md:py-20">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={16} className="mb-8 max-w-xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                Prinsip Kerja
              </p>
              <h2 className="font-headline text-3xl leading-tight text-primary md:text-4xl lg:text-5xl">
                Cara kami bekerja bersama Anda.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {principles.map((principle, index) => (
                <Reveal
                  key={principle.title}
                  y={14}
                  delay={index * 0.04}
                  duration={0.3}
                >
                  <article className="h-full rounded-[1.4rem] border border-outline-variant/20 bg-surface-container p-6">
                    <h3 className="mb-2 font-headline text-3xl text-primary">
                      {principle.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-on-surface-variant">
                      {principle.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal
              y={16}
              delay={0.12}
              className="mt-8 flex flex-col items-center gap-6 rounded-[1.4rem] border border-outline-variant/20 bg-tertiary-fixed p-8 text-on-tertiary-fixed sm:flex-row sm:items-start"
            >
              <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-white/30 shadow-md sm:h-44 sm:w-36">
                <Image
                  src="/img/founder-fotbar.png"
                  alt="Faishal N., Founder NechCode"
                  fill
                  sizes="144px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] opacity-75">
                  Meet The Founder
                </p>
                <p className="mb-3 font-headline text-3xl italic md:text-4xl">
                  &quot;{about.quote}&quot;
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-80">
                  {about.quoteAuthor}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
