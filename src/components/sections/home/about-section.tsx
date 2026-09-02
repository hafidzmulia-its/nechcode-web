import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { layoutContainer } from "@/config/layout";
import type { HomeContent } from "@/content/home";

type AboutSectionProps = {
  about: HomeContent["about"];
};

export function AboutSection({ about }: AboutSectionProps) {
  void about;

  return (
    <section
      id="about"
      className="w-full overflow-hidden bg-white py-16 md:py-20 lg:py-24"
    >
      <div className={layoutContainer}>
        <Reveal y={-40} x={0} delay={0.5} duration={0.5} once={false}>
          <div className="mx-auto max-w-[1320px]">
            <p className="text-center text-[clamp(1.05rem,1.3vw,1.3rem)] font-medium text-[#202020]">
              About NechCode
            </p>

            <h2 className="mx-auto mt-6 max-w-[44ch] text-center font-sans text-[clamp(1.7rem,2.85vw,2.7rem)] font-normal uppercase leading-[1.12] tracking-[0.012em] text-[#101010] lg:max-w-[42ch]">
              Good Technology Isn&apos;t The Most Complicated,
              <br />
              But The Most Useful For Your Team
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-[1230px] grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <Reveal x={-60} y={0} delay={0.5} duration={0.5} once={false}>
            <div className="relative aspect-[1.48/1] w-full overflow-hidden bg-[#f5f5f5]">
              <Image
                src="/img/bg_about.JPG"
                alt="About NechCode"
                fill
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal x={60} y={0} delay={0.5} duration={0.5} once={false}>
            <div className="max-w-[620px]">
              <h3 className="font-sans text-[clamp(2rem,3vw,3.6rem)] font-semibold leading-[1.28] tracking-[-0.02em] text-[#2a67a1]">
                Our Story that Innovate Locally, Deliver Globally
              </h3>

              <p className="mt-7 text-[clamp(1.05rem,1.25vw,1.28rem)] leading-[1.6] text-[#2a2a2a]">
                NechCode comes from a combination of the words Next, Technology,
                and Code - symbolizing a new generation of technology built
                through code, innovation, and digital systems to create future
                solutions.
              </p>

              <p className="mt-8 text-[clamp(1.05rem,1.25vw,1.28rem)] leading-[1.6] text-[#2a2a2a]">
                We are here as a Technology Solution that focuses on developing
                software, digital systems, AI and automation - to help
                businesses, MSMEs, organizations and society develop in the
                digital era.
              </p>

              <Link
                href="/about"
                className="mt-10 inline-flex items-center gap-6 border border-[#2a67a1] px-7 py-4 text-[clamp(1.05rem,1.15vw,1.2rem)] font-medium text-[#2a67a1] transition-colors duration-200 hover:bg-[#2a67a1] hover:text-white"
              >
                <span>About Us</span>
                <span
                  aria-hidden="true"
                  className="text-[1.65rem] leading-none"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal y={20} delay={0.1} duration={0.42} once={false}>
          <div className="mt-16 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen">
            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_60%,#07131f_0%,#0d2237_52%,#143252_100%)] px-8 py-10 md:px-12 md:py-12 lg:px-16 lg:py-14">
              <div className="grid min-h-[221px] grid-cols-1 items-center gap-0 md:grid-cols-3">
                <div className="flex flex-col items-center justify-center py-6 text-center md:py-0">
                  <p className="text-[clamp(3rem,4.8vw,4.1rem)] font-light leading-none text-white">
                    1+
                  </p>
                  <p className="mt-6 text-[clamp(1.1rem,1.35vw,1.4rem)] font-light text-white/55">
                    Years of Service
                  </p>
                </div>

                <div className="mx-auto h-px w-full max-w-[18rem] bg-white/70 md:hidden" />

                <div className="relative flex flex-col items-center justify-center py-6 text-center md:py-0 md:before:absolute md:before:bottom-0 md:before:left-0 md:before:top-0 md:before:w-px md:before:bg-white/70 md:after:absolute md:after:bottom-0 md:after:right-0 md:after:top-0 md:after:w-px md:after:bg-white/70">
                  <p className="text-[clamp(3rem,4.8vw,4.1rem)] font-light leading-none text-white">
                    10+
                  </p>
                  <p className="mt-6 text-[clamp(1.1rem,1.35vw,1.4rem)] font-light text-white/55">
                    Projects Completed
                  </p>
                </div>

                <div className="mx-auto h-px w-full max-w-[18rem] bg-white/70 md:hidden" />

                <div className="flex flex-col items-center justify-center py-6 text-center md:py-0">
                  <p className="text-[clamp(3rem,4.8vw,4.1rem)] font-light leading-none text-white">
                    85%
                  </p>
                  <p className="mt-6 text-[clamp(1.1rem,1.35vw,1.4rem)] font-light text-white/55">
                    Client Satisfaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
