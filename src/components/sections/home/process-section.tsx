import type { HomeContent } from "@/content/home";
import { Reveal } from "@/components/shared/reveal";

type ProcessSectionProps = {
  process: HomeContent["process"];
};

export function ProcessSection({ process }: ProcessSectionProps) {
  return (
    <section id="alur" className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low/55 to-surface py-24 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-surface-container/45 to-transparent" />
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        <Reveal y={18} duration={0.38}>
          <h2 className="mb-14 font-headline text-4xl text-primary md:text-5xl">{process.heading}</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-6">
          {process.steps.map((step, index) => (
            <Reveal key={step.title} y={16} delay={index * 0.05} duration={0.34}>
              <article className="relative">
                <p className="pointer-events-none absolute -top-8 left-0 font-headline text-6xl font-bold text-primary/10">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="relative z-10 mb-3 font-body text-lg font-bold text-primary">{step.title}</h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
