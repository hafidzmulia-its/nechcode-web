import Image from "next/image";

import type { HomeContent } from "@/content/home";

type AboutSectionProps = {
  about: HomeContent["about"];
};

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="tentang" className="w-full bg-surface pb-24 md:pb-36">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low px-6 py-12 shadow-[0_18px_44px_rgba(24,34,45,0.08)] md:px-8 md:py-14 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="relative">
              <div className="relative aspect-square rotate-3 overflow-hidden rounded-[3rem] bg-surface-container-high">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmtuj6l-9uoFOL_LEvxysoIKaImg3Am2uzp1DrPJxRZ3MOeTWkrSVW-4sYc6Al3zGmJ0HXmOG1mfVCE3pDEInnxR-RX7HE15LoC74K1-XlnYpcoZFN9Q6t51OFrZP7sUCftoYZC7lldam-P32NjP2bOo_-9KzjwbPPE3enCqoYwRNeFXVMpXasVH_vYp6DZgYm_MmYwKUdohsKmHSzDUSJ92hCKMTxACWj1i0fObjUoIFirce4b2jrFgrqYuQ2S6qOzjWOwVmIB2Y"
                  alt="Founder NechCode"
                  fill
                  className="-rotate-3 scale-110 object-cover grayscale transition-all duration-1000 hover:grayscale-0"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>

              <div className="absolute -bottom-8 -left-8 max-w-xs rounded-2xl border-4 border-surface bg-tertiary-fixed p-8 text-on-tertiary-fixed shadow-xl">
                <div className="newsreader mb-2 text-2xl italic">&quot;{about.quote}&quot;</div>
                <div className="font-label text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {about.quoteAuthor}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6 font-label text-xs font-bold uppercase tracking-[0.2em] text-tertiary-container">
                {about.eyebrow}
              </div>
              <h2 className="mb-8 font-headline text-5xl leading-tight text-primary">
                {about.headingA} <span className="serif-italic">{about.headingEmphasis}</span> {about.headingB}
              </h2>
              <p className="mb-6 font-body text-lg leading-relaxed text-on-surface-variant">{about.descriptionA}</p>
              <p className="mb-10 font-body text-lg leading-relaxed text-on-surface-variant">{about.descriptionB}</p>
              <div className="grid grid-cols-2 gap-8 border-t border-outline-variant/20 py-8">
                <div>
                  <div className="mb-1 font-headline text-4xl text-primary">10+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Tahun Pengalaman</div>
                </div>
                <div>
                  <div className="mb-1 font-headline text-4xl text-primary">45+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Solusi Terdeploy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
