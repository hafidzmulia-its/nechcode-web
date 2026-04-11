"use client";

import { useRef, useState } from "react";

import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type FaqSectionProps = {
  faq: HomeContent["faq"];
};

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-[rgba(29,90,141,0.09)] bg-[#FBF7EE] shadow-[0_8px_18px_rgba(34,48,60,0.055)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-body text-base font-bold text-primary">{question}</span>
        <span
          className={`material-symbols-outlined text-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          expand_more
        </span>
      </button>

      <div
        ref={bodyRef}
        style={{
          maxHeight: isOpen ? "500px" : "0",
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.28s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <p className="px-6 pb-6 text-sm leading-relaxed text-[#45515b] md:text-base">{answer}</p>
      </div>
    </div>
  );
}

export function FaqSection({ faq }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative w-full overflow-hidden bg-[#F5EEDC] py-24 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#efe4cc]/70 to-transparent" />
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="rounded-[2rem] border border-[rgba(29,90,141,0.08)] bg-[#EFE4CC] px-6 py-12 shadow-[0_12px_28px_rgba(34,46,58,0.07)] md:px-8 md:py-14">
          <div className="mx-auto max-w-3xl">
            <Reveal y={18} duration={0.36} className="mb-12 text-center">
              <h2 className="font-headline text-4xl text-primary md:text-5xl">
                Tanya Jawab
              </h2>
            </Reveal>

            <div className="space-y-4">
              {faq.items.map((item, index) => (
                <Reveal key={item.question} y={16} delay={index * 0.04} duration={0.32}>
                  <FaqItem
                    question={item.question}
                    answer={item.answer}
                    isOpen={index === openIndex}
                    onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
                  />
                </Reveal>
              ))}
            </div>

            <Reveal y={12} delay={0.15} duration={0.32} className="mt-8 text-center">
              <a
                href={faq.contactCta.href}
                target={faq.contactCta.external ? "_blank" : undefined}
                rel={faq.contactCta.external ? "noreferrer" : undefined}
                className="text-sm font-bold text-primary underline underline-offset-4"
              >
                {faq.contactCta.label}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
