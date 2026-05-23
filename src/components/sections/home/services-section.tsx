"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { servicesContent } from "@/content/services";
import type { HomeContent } from "@/content/home";

type ServicesSectionProps = {
  services: HomeContent["services"];
};

function getServiceHref(id: string) {
  return id === "data" ? "/services/predictive-data" : `/services/${id}`;
}

export function ServicesSection({ services }: ServicesSectionProps) {
  void services;
  const [openId, setOpenId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);

  return (
    <section
      id="layanan"
      className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <Reveal y={20} duration={0.42} once={false}>
          <div className="mx-auto max-w-[58rem] text-center">
            <p className="font-body text-[clamp(1.05rem,1.4vw,1.35rem)] font-normal text-[#9A9A9A]">
              Our Services
            </p>
            <h2 className="mx-auto mt-6 max-w-[44ch] text-center font-sans text-[clamp(1.7rem,2.85vw,2.7rem)] font-normal uppercase leading-[1.12] tracking-[0.012em] text-[#352E2E] lg:max-w-[42ch]">
              YOUR ASPIRATION, OUR EXPERTISE: TAILORED
              <br />
              SERVICES FOR UNMATCHED EXCELLENCE.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 sm:mt-16">
          {servicesContent.pillars.map((pillar, index) => {
            const isOpen = openId === pillar.id;
            const isPreviewed = previewId === pillar.id;
            const isExpanded = isOpen || isPreviewed;

            return (
              <Reveal
                key={pillar.id}
                y={18}
                delay={index * 0.06}
                duration={0.38}
                once={false}
              >
                <div className="relative">
                  {index > 0 ? (
                    <div className="mb-10 sm:mb-12">
                      <Image
                        src="/img/asset_line_black.png"
                        alt=""
                        width={1600}
                        height={2}
                        sizes="100vw"
                        className="block h-auto w-full"
                      />
                    </div>
                  ) : null}

                  <div
                    className="group grid cursor-pointer grid-cols-1 gap-6 pb-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 sm:pb-12 md:grid-cols-[7.5rem_minmax(0,1fr)_5.75rem] md:items-start md:gap-8 lg:grid-cols-[7.5rem_minmax(0,1fr)_6.25rem]"
                    onClick={() => setOpenId(isOpen ? null : pillar.id)}
                    onMouseEnter={() => setPreviewId(pillar.id)}
                    onMouseLeave={() => setPreviewId(null)}
                    onFocus={() => setPreviewId(pillar.id)}
                    onBlur={() => setPreviewId(null)}
                  >
                    <div className="font-body text-[42px] font-normal leading-none tracking-[-0.03em] text-[#1D5A8D] transition-colors duration-300 group-hover:text-[#78C5F1]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="max-w-[72rem] pr-2 md:pr-6 lg:pr-10">
                    <h3
                      className="text-balance font-sans text-[32px] font-normal uppercase leading-[1.16] tracking-[0.045em] text-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #1D5A8D 0%, #78C5F1 100%)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                        }}
                      >
                        {pillar.navbarTitle}
                      </h3>

                      <div
                        className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                          maxHeight: isExpanded ? "300px" : "0px",
                          opacity: isExpanded ? 1 : 0,
                        }}
                      >
                        <p
                          className="mt-8 max-w-[62ch] font-body text-[20px] font-light leading-[1.55] tracking-[-0.01em] text-[#171717] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          style={{
                            transform: isExpanded
                              ? "translate3d(0, 0, 0)"
                              : "translate3d(0, 12px, 0)",
                          }}
                        >
                          {pillar.navbarBody}
                        </p>
                      </div>
                    </div>

                    <div className="md:flex md:justify-end" onClick={(e) => e.stopPropagation()}>
                      <Link
                        href={getServiceHref(pillar.id)}
                        aria-label={`Lihat layanan ${pillar.navbarTitle}`}
                        className="inline-flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border border-[#1D5A8D] text-[#1D5A8D] transition-colors duration-300 group-hover:bg-[#1D5A8D] group-hover:text-white hover:bg-[#1D5A8D] hover:text-white"
                      >
                        <span className="flex translate-x-[0.05rem] items-center justify-center gap-[0.2rem] transition-transform duration-300 group-hover:translate-x-[0.16rem]">
                          <span className="block h-px w-[0.72rem] bg-current" />
                          <span className="relative -top-px text-[1.18rem] leading-none">
                            →
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
