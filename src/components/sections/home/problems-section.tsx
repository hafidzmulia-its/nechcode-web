import Image from "next/image";

import { layoutContainer } from "@/config/layout";
import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type ProblemsSectionProps = {
  problems: HomeContent["problems"];
};

export function ProblemsSection({ problems }: ProblemsSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-cream/85 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#f2e9d7]/65" />
      <div className={layoutContainer}>
        <div className="rounded-[2rem] border border-[rgba(29,90,141,0.08)] bg-brand-cream px-6 py-12 shadow-[0_18px_44px_rgba(43,56,70,0.08)] md:px-8 md:py-14 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5" y={20} x={-14} duration={0.4}>
              <h2 className="mb-6 font-headline text-4xl leading-tight text-primary md:text-5xl">{problems.heading}</h2>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-[#3f4a52] md:text-lg">{problems.description}</p>

              <ul className="space-y-5">
                {problems.items.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="material-symbols-outlined mt-0.5 text-secondary">priority_high</span>
                    <div>
                      <p className="mb-1 font-body text-base font-bold text-primary">{item.title}</p>
                      <p className="text-sm text-[#4b5660]">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="lg:col-span-7" y={20} x={14} delay={0.1} duration={0.42}>
              <div className="rounded-[1.5rem] border border-[rgba(29,90,141,0.1)] bg-brand-cream-soft p-6 shadow-[0_14px_32px_rgba(37,50,62,0.08)] md:p-8">
                <div className="mb-6 rounded-xl border border-[rgba(29,90,141,0.1)] bg-[#f2ece0] p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Indikator Umum</p>
                  <ul className="space-y-2 text-sm text-[#41505b]">
                    <li>Tim mengulang input data yang sama di beberapa tools.</li>
                    <li>Laporan penting baru tersedia di akhir minggu atau akhir bulan.</li>
                    <li>Follow-up pelanggan masih bergantung pada proses manual.</li>
                  </ul>
                </div>
                <div className="mt-6 rounded-xl border border-[rgba(126,75,0,0.12)] bg-[#F2ECE0] p-6">
                  <div className="flex items-center justify-center gap-5">
                    <Image
                      src="https://img.icons8.com/?id=M2rB4aGrYYOq&format=png&size=96"
                      alt="Web Analytics 3D"
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain"
                    />
                    <Image
                      src="https://img.icons8.com/?id=269UT6k4i79F&format=png&size=96"
                      alt="Automation 3D"
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain"
                    />
                    <Image
                      src="https://img.icons8.com/?id=kqDWzgE2rzsi&format=png&size=96"
                      alt="3D Object"
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain"
                    />
                  </div>
                  <p className="mt-4 text-center text-xs font-bold uppercase tracking-wider text-[#7E4B00]/75">
                    Visualisasi Arsitektur Solusi
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
