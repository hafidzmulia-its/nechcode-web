import Image from "next/image";
import Link from "next/link";

import { ConsultSection } from "@/components/sections/home/consult-section";
import { PrincipleSection } from "@/components/sections/home/principle-section";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type AboutPageProps = {
  content: HomeContent;
};

const teamMembers = [
  {
    name: "Hafidz Mulia",
    role: "CEO & Founder",
    image: "/img/hafidz.jpg",
  },
  {
    name: "Fajar Adie",
    role: "CTO",
    image: "/img/dios.jpeg",
  },
  {
    name: "Rizqi Fauzan",
    role: "COO",
    image: "/img/risqii.jpeg",
  },
  {
    name: "Reinasya Diar",
    role: "CMO",
    image: "/img/reina.PNG",
  },
  {
    name: "Natalya Divanda",
    role: "CSO",
    image: "/img/reina.PNG",
  },
];

export function AboutPage({ content }: AboutPageProps) {
  return (
    <div className="bg-white text-[#0D0D0D] selection:bg-[#8fdcff] selection:text-[#07131d]">
      <AboutHero brand={content.brand} />

      <main className="bg-white">
        <StorySection />
        <PrincipleSection services={content.services} />
        <TeamSection />
        <ConsultSection />
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}

function AboutHero({ brand }: { brand: HomeContent["brand"] }) {
  return (
    <section
      id="about-hero"
      className="relative isolate min-h-screen overflow-hidden bg-[#020202]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/img/bg_home.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <Image
          src="/img/bg_home_blur1.png"
          alt=""
          width={860}
          height={1004}
          priority
          className="pointer-events-none absolute -left-36 top-[-18%] z-[3] h-[178%] w-auto max-w-none [filter:brightness(1.55)_saturate(1)]"
        />
        <Image
          src="/img/bg_home_blur2.png"
          alt=""
          width={1080}
          height={1004}
          priority
          className="pointer-events-none absolute -right-48 top-[-20%] z-[3] h-[182%] w-auto max-w-none [filter:brightness(1.45)_saturate(1)]"
        />
      </div>
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_38%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.18)_34%,rgba(0,0,0,0.86)_79%),linear-gradient(90deg,rgba(5,24,35,0.2)_0%,rgba(0,0,0,0.16)_42%,rgba(29,50,62,0.16)_100%)]" />

      <header className="relative z-10 grid w-full grid-cols-[1fr_auto] items-center gap-6 px-6 py-8 md:px-10 md:py-8 lg:grid-cols-[1fr_auto_1fr] lg:px-[70px] lg:py-[50px]">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${brand.name} home`}
        >
          <Image
            src="/logo-aseli.png"
            alt=""
            width={42}
            height={42}
            priority
            className="h-10 w-10 object-contain"
          />
          <span className="text-[22px] font-bold tracking-tight text-[#1782c4]">
            {brand.name}
          </span>
        </Link>

        <nav className="hidden flex-wrap items-center gap-8 text-[21px] font-medium uppercase tracking-normal text-white lg:flex lg:gap-[60px]">
          <a
            href="#about-story"
            className="transition-colors hover:text-[#9fe8ff]"
          >
            About Us
          </a>
          <Link
            href="#services"
            className="transition-colors hover:text-[#9fe8ff]"
          >
            Services
          </Link>
          <a href="#consult" className="transition-colors hover:text-[#9fe8ff]">
            Contact
          </a>
        </nav>

        <Link
          href="#consult"
          className="hidden justify-self-end border border-white/70 px-[18px] py-[10px] text-[19px] font-medium !text-white transition-colors duration-200 visited:!text-white hover:border-[#9fe8ff] hover:bg-white/10 hover:!text-white lg:inline-flex"
        >
          Get Your Service
        </Link>
      </header>

      <div className="relative z-10 flex min-h-[calc(100vh-128px)] flex-col px-6 pb-12 md:px-[15.2vw] lg:min-h-[calc(100vh-160px)] lg:pb-16">
        <div className="flex flex-1 items-center">
          <h1 className="font-sans text-[clamp(2.65rem,12vw,5.4rem)] font-light uppercase leading-[1.1] tracking-[0.04em] text-[#a8ecff] sm:tracking-[0.065em] lg:leading-[1.18] lg:tracking-[0.085em]">
            Hi!
            <br />
            We Are NechCode
          </h1>
        </div>

        <a
          href="#about-story"
          className="mx-auto flex flex-col items-center gap-2 text-[16px] font-medium uppercase text-white transition hover:text-[#9fe8ff]"
        >
          <span>Scroll</span>
          <span className="h-3 w-3 rotate-45 border-b-2 border-r-2 border-white" />
        </a>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="about-story" className="bg-white pt-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8 lg:px-10">
        <Reveal once y={18} className="text-center">
          <p className="font-body text-[18px] font-normal text-[#101010]">
            About NechCode
          </p>
          <h2 className="mx-auto mt-6 max-w-[48ch] font-sans text-[clamp(1.85rem,2vw,2.4rem)] font-normal uppercase leading-[1.42] tracking-[0.03em] text-black">
            Good Technology Isn&apos;t The Most Complicated,
            <br />
            But The Most Useful For Your Team
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1fr] lg:gap-14">
          <Reveal once y={18}>
            <div className="relative aspect-[1.48/1] w-full overflow-hidden">
              <Image
                src="/img/bg_about.JPG"
                alt="NechCode team story"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal once y={18} delay={0.06}>
            <div className="max-w-[34rem]">
              <h3 className="font-body text-[clamp(1.75rem,2.1vw,2rem)] font-semibold leading-[1.35] tracking-[0.02em] text-[#1D5A8D]">
                Our Story that Innovate Locally,
                <br />
                Deliver Globally
              </h3>
              <div className="mt-9 space-y-7 font-body text-[17px] font-light leading-[1.45] tracking-[0.02em] text-[#171717]">
                <p>
                  NechCode comes from a combination of the words Next,
                  Technology, and Code - symbolizing a new generation of
                  technology built through code, innovation, and digital systems
                  to create future solutions.
                </p>
                <p>
                  We are here as a Technology Solution that focuses on
                  developing software, digital systems, AI and automation - to
                  help businesses, MSMEs, organizations and society develop in
                  the digital era.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <section id="vision" className="mt-24 bg-[#061B2B] py-12 text-white">
        <div className="mx-auto w-full max-w-[1120px] px-6 text-center">
          <div className="flex items-center justify-center gap-10">
            <div className="h-px flex-1 bg-white/80" />
            <p className="font-body text-[24px] font-normal">Our Vision</p>
            <div className="h-px flex-1 bg-white/80" />
          </div>
          <p className="mx-auto mt-8 max-w-[46ch] font-sans text-[clamp(1.6rem,1.5vw,2rem)] font-normal uppercase leading-[1.55] tracking-[0.035em]">
            Empowering Businesses and Organizations Throughout Indonesia Through
            Accessible, Reliable and Impactful Digital Technology Solutions
          </p>
        </div>
      </section>
    </section>
  );
}

function TeamSection() {
  const memberTextStyle = {
    backgroundImage: "linear-gradient(90deg, #FFFFFF 0%, #BAF2FF 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    fontFamily: "var(--font-manrope)",
  } as const;

  return (
    <section id="team" className="bg-white pb-28 pt-8">
      <div className="mx-auto w-full max-w-[1300px] px-6 md:px-8 lg:px-10">
        <Reveal once y={18}>
          <h2 className="font-sans text-[clamp(2rem,2.7vw,2.65rem)] font-normal uppercase leading-none tracking-[0.02em] text-black">
            Meet Our Team
          </h2>
          <p className="mt-4 font-body text-[20px] font-normal text-black">
            The People Behind NechCode
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <Reveal key={member.name} once y={18} delay={index * 0.05}>
              <article className="relative aspect-[0.78/1] overflow-hidden bg-[#08131A]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(217,217,217,0)_0%,rgba(0,0,0,0.88)_100%)] px-7 pb-9 pt-24">
                  <h3 className="text-[22px] font-semibold leading-[1.1]">
                    <span className="inline-block" style={memberTextStyle}>
                      {member.name}
                    </span>
                  </h3>
                  <p className="mt-2 text-[16px] font-semibold leading-[1.1]">
                    <span className="inline-block" style={memberTextStyle}>
                      {member.role}
                    </span>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
