"use client";

import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type ProcessSectionProps = {
  process: HomeContent["process"];
};

const cardRotations = [-6, 3, -4, 5, -3];
const cardOffsets = [-30, 20, -20, 25, -15];

export function ProcessSection({ process }: ProcessSectionProps) {
  return (
    <section
      id="alur"
      className="relative w-full overflow-hidden bg-surface py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Heading */}
        <Reveal y={18} duration={0.38} className="mb-12 text-center md:mb-16">
          <h2 className="font-headline text-4xl font-bold text-[#1e1c11] md:text-5xl lg:text-6xl">
            {process.heading}
          </h2>
        </Reveal>

        {/* Desktop: diagonal rotated cards */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-center gap-0">
            {process.steps.map((step, index) => {
              const rotation = cardRotations[index % cardRotations.length];
              const yOffset = cardOffsets[index % cardOffsets.length];
              const isLast = index === process.steps.length - 1;

              return (
                <div key={step.title} className="relative flex items-center">
                  {/* Card */}
                  <Reveal
                    y={30}
                    delay={index * 0.1}
                    duration={0.5}
                    style={{
                      marginTop: yOffset > 0 ? yOffset : 0,
                      marginBottom: yOffset < 0 ? Math.abs(yOffset) : 0,
                      transform: `rotate(${rotation}deg)`,
                    }}
                    className="relative z-10 w-[170px] shrink-0 overflow-hidden rounded-2xl bg-brand-deep p-1 shadow-[0_12px_32px_rgba(22,66,91,0.25)] lg:w-[200px]"
                  >
                    {/* Inner card */}
                    <div className="rounded-xl bg-[#1e5a7a] p-4 lg:p-5">
                      {/* Number */}
                      <div className="mb-3 font-headline text-4xl font-bold leading-none text-white/30 lg:text-5xl">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mb-1.5 font-headline text-base font-bold leading-snug text-white lg:text-lg">
                        {step.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-white/70">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>

                  {/* Dashed connector line */}
                  {!isLast && (
                    <div className="relative z-0 mx-1 h-0.5 w-12 shrink-0 lg:w-14">
                      <svg width="100%" height="2" className="overflow-visible">
                        <line
                          x1="0"
                          y1="1"
                          x2="100%"
                          y2="1"
                          stroke="var(--brand-deep)"
                          strokeWidth="2"
                          strokeDasharray="5,4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: zigzag stack */}
        <div className="relative mt-4 block md:hidden">
          {/* Vertical connector line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 border-l-2 border-dashed border-brand-deep/30" />

          <div className="space-y-10">
            {process.steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <Reveal
                  key={step.title}
                  y={20}
                  delay={index * 0.07}
                  duration={0.4}
                  className={`relative flex items-center gap-4 ${isEven ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Center dot */}
                  <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-deep text-xs font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Card */}
                  <div className="flex-1 overflow-hidden rounded-2xl bg-brand-deep p-1 shadow-[0_8px_20px_rgba(22,66,91,0.18)]">
                    <div className="rounded-xl bg-[#1e5a7a] p-4">
                      <h3 className="mb-1.5 font-headline text-lg font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-white/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
