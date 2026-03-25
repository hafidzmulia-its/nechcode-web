import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import type { HomeContent } from "@/content/home";

type AboutPageProps = {
  content: HomeContent;
};

const principles = [
  {
    title: "Practical Over Hype",
    description: "Kami memprioritaskan solusi yang dipakai tim harian dan memberi dampak operasional nyata.",
  },
  {
    title: "Founder-Level Ownership",
    description: "Arah produk, arsitektur, dan eksekusi dijaga langsung agar keputusan tetap konsisten.",
  },
  {
    title: "Clear Communication",
    description: "Update mingguan dibuat ringkas dan bisa dipahami tim bisnis maupun tim teknis.",
  },
  {
    title: "Long-Term Thinking",
    description: "Solusi dirancang agar mudah dirawat, mudah dikembangkan, dan tetap relevan saat bisnis Anda tumbuh.",
  },
];

export function AboutPage({ content }: AboutPageProps) {
  const { about } = content;

  return (
    <div className="selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar brand={content.brand} nav={content.nav} cta={content.headerCta} />

      <main className="pb-20">
        <section className="w-full bg-surface py-20">
          <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-12 px-6 md:grid-cols-2 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={18}>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-secondary">About</p>
              <h1 className="mb-5 font-headline text-5xl leading-tight text-primary md:text-7xl">
                Partner Teknologi Founder-Led untuk Solusi Digital yang <span className="serif-italic">Jelas Dampaknya</span>
              </h1>
              <p className="text-lg leading-relaxed text-on-surface-variant">{about.descriptionA}</p>
            </Reveal>

            <Reveal y={16} delay={0.06}>
              <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-outline-variant/20 bg-surface-container-low shadow-[0_14px_32px_rgba(24,34,45,0.08)]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmtuj6l-9uoFOL_LEvxysoIKaImg3Am2uzp1DrPJxRZ3MOeTWkrSVW-4sYc6Al3zGmJ0HXmOG1mfVCE3pDEInnxR-RX7HE15LoC74K1-XlnYpcoZFN9Q6t51OFrZP7sUCftoYZC7lldam-P32NjP2bOo_-9KzjwbPPE3enCqoYwRNeFXVMpXasVH_vYp6DZgYm_MmYwKUdohsKmHSzDUSJ92hCKMTxACWj1i0fObjUoIFirce4b2jrFgrqYuQ2S6qOzjWOwVmIB2Y"
                  alt="Founder NechCode"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="w-full bg-gradient-to-b from-surface-container-low/60 to-surface py-8 md:py-14">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <Reveal y={16}>
              <p className="mx-auto mb-8 max-w-3xl text-center text-base leading-relaxed text-on-surface-variant md:text-lg">
                {about.descriptionB}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {principles.map((principle, index) => (
                <Reveal key={principle.title} y={14} delay={index * 0.04} duration={0.3}>
                  <article className="rounded-[1.4rem] border border-outline-variant/20 bg-surface-container-lowest p-6">
                    <h2 className="mb-2 font-headline text-3xl text-primary">{principle.title}</h2>
                    <p className="text-sm leading-relaxed text-on-surface-variant">{principle.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal y={16} delay={0.12} className="mt-8 grid gap-4 rounded-[1.4rem] border border-outline-variant/20 bg-tertiary-fixed p-7 text-on-tertiary-fixed md:grid-cols-3">
              <div>
                <p className="mb-2 font-headline text-3xl italic">&quot;{about.quote}&quot;</p>
                <p className="text-xs font-bold uppercase tracking-[0.16em] opacity-80">{about.quoteAuthor}</p>
              </div>
              <div>
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] opacity-75">Strong Fit</p>
                <p className="text-sm">Bisnis, UMKM, organisasi, atau institusi yang butuh partner eksekusi dan pendampingan.</p>
              </div>
              <div>
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] opacity-75">Format Komunikasi</p>
                <p className="text-sm">Update mingguan, prioritas sprint, dan keputusan penting selalu disampaikan ringkas dengan konteks yang jelas.</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
