"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import type { HomeContent } from "@/content/home";

type FaqSectionProps = {
  faq: HomeContent["faq"];
};

export function FaqSection({ faq }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative w-full overflow-hidden bg-[#F5EEDC] py-24 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#efe4cc]/70 to-transparent" />
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="rounded-[2rem] border border-[rgba(29,90,141,0.08)] bg-[#EFE4CC] px-6 py-12 shadow-[0_12px_28px_rgba(34,46,58,0.07)] md:px-8 md:py-14">
          <div className="mx-auto max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 text-center font-headline text-4xl text-primary md:text-5xl"
            >
              Tanya Jawab
            </motion.h2>

            <div className="space-y-4">
              {faq.items.map((item, index) => {
                const isOpen = index === openIndex;
                return (
                  <motion.div
                    key={item.question}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.32, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden rounded-2xl border border-[rgba(29,90,141,0.09)] bg-[#FBF7EE] shadow-[0_8px_18px_rgba(34,48,60,0.055)]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-body text-base font-bold text-primary">{item.question}</span>
                      <span
                        className={`material-symbols-outlined text-primary transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        expand_more
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p className="px-6 pb-6 text-sm leading-relaxed text-[#45515b] md:text-base">{item.answer}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.32, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-center"
            >
              <a href={faq.contactCta.href} className="text-sm font-bold text-primary underline underline-offset-4">
                {faq.contactCta.label}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
