"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Reveal } from "@/components/shared/reveal";
import { layoutContainer } from "@/config/layout";
import type { ShowcaseItem } from "@/content/service-pages";

type ServicePortfolioProps = {
  eyebrow: string;
  title: string;
  body: string;
  items: ShowcaseItem[];
  maxColumns?: 2 | 3;
};

export function ServicePortfolio({
  eyebrow,
  title,
  body,
  items,
}: ServicePortfolioProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) {
    return null;
  }

  return (
    <section className="w-full bg-[#FFFFFF] py-20 md:py-24 lg:py-28">
      <div className={layoutContainer}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(260px,0.35fr)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:gap-14">
          <Reveal once y={16}>
            <div className="max-w-[28rem]">
              <p className="font-body text-[clamp(1.05rem,1.3vw,1.35rem)] font-normal text-[#161616]">
                {eyebrow}
              </p>
              <h2 className="mt-6 max-w-[26ch] font-sans text-[32px] font-normal uppercase leading-[1.12] tracking-[-0.02em] text-[#121212]">
                {title}
              </h2>
              <p className="mt-6 max-w-[28ch] font-body text-[1.02rem] leading-[1.7] text-[#454545]">
                {body}
              </p>
            </div>
          </Reveal>

          <Reveal once y={20} delay={0.06}>
            <div className="hidden min-h-[556px] gap-4 lg:flex xl:gap-5">
              {items.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className={`group relative block h-[556px] overflow-hidden transition-[flex-basis,width,transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                      isActive
                        ? "w-[540px] flex-[0_0_540px] border-[3px] border-[#2A9AF0] shadow-[0_16px_42px_rgba(37,113,183,0.15)]"
                        : "w-[136px] flex-[0_0_136px] border border-[#E2E2E2]"
                    }`}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1280px) 60vw, 760px"
                        className={`object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                          isActive ? "scale-100" : "scale-[1.035]"
                        }`}
                      />
                    </div>

                    <div
                      className={`absolute inset-0 transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                        isActive
                          ? "bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0)_38%,rgba(0,0,0,0.82)_100%)]"
                          : "bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.76)_100%)]"
                      }`}
                    />

                    <div
                      className={`absolute inset-x-0 bottom-0 z-10 transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                        isActive
                          ? "translate-y-0 p-8 xl:p-9"
                          : "flex h-full items-end justify-center px-3 py-8"
                      }`}
                    >
                      {isActive ? (
                        <div className="max-w-[36rem] text-white">
                          <p className="font-sans text-[clamp(2.3rem,3.3vw,3.55rem)] font-semibold uppercase leading-[0.96] tracking-[-0.04em] text-white">
                            {item.title}
                          </p>
                          <p className="mt-3 font-body text-[1.05rem] uppercase tracking-[0.06em] text-[#A8ECFF]">
                            {item.category}
                          </p>
                          <p className="mt-4 max-w-[32ch] font-body text-[1.08rem] leading-[1.38] text-white/96 xl:text-[1.14rem]">
                            {item.description}
                          </p>
                        </div>
                      ) : (
                        <span className="font-sans text-[2.35rem] font-semibold uppercase tracking-[-0.04em] text-white [writing-mode:vertical-rl]">
                          {item.title}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-5 lg:hidden">
              {items.map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className="group relative block min-h-[24rem] overflow-hidden border border-[#E6E6E6] bg-white shadow-[0_10px_24px_rgba(14,31,46,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(14,31,46,0.14)]"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.02)_38%,rgba(0,0,0,0.84)_100%)]" />

                  <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
                    <p className="font-sans text-[2rem] font-semibold uppercase leading-[0.95] tracking-[-0.04em]">
                      {item.title}
                    </p>
                    <p className="mt-2 font-body text-[0.92rem] uppercase tracking-[0.06em] text-[#A8ECFF]">
                      {item.category}
                    </p>
                    <p className="mt-4 max-w-[34ch] font-body text-[1rem] leading-[1.42] text-white/95">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
