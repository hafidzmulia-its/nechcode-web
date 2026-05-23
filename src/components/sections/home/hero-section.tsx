"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MobileNavMenu } from "@/components/shared/mobile-nav-menu";
import type { LinkItem } from "@/content/home";

const heroNavItems: LinkItem[] = [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "#consult" },
];

const heroNavCta: LinkItem = {
  label: "Get Your Service",
  href: "#consult",
};

export function HeroSection() {
  const [introStarted, setIntroStarted] = useState(false);

  const navLinkClass =
    "text-white transition-colors duration-200 hover:!text-[#1782c4] focus-visible:!text-[#1782c4] active:!text-[#1782c4]";

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setIntroStarted(true);
    }, 800);

    return () => {
      window.clearTimeout(introTimer);
    };
  }, []);

  function handleScrollNext() {
    const mainSection = document.querySelector("main");
    mainSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="home" className="relative isolate min-h-screen bg-[#020202]">
      <div
        className={`absolute inset-0 z-30 flex items-center justify-center bg-[#020202] transition-opacity duration-700 ${
          introStarted ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-4">
          <Image
            src="/logo-aseli.png"
            alt=""
            width={64}
            height={64}
            priority
            className="h-16 w-16 object-contain"
          />
          <span className="text-[34px] font-bold tracking-tight text-[#1782c4]">
            NechCode
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/img/bg_home.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center ${
            introStarted ? "animate-bg-drop" : "opacity-0"
          }`}
        />
        <Image
          src="/img/bg_home_blur1.png"
          alt=""
          width={860}
          height={1004}
          priority
          className={`pointer-events-none absolute -left-36 top-[-18%] z-[3] h-[178%] w-auto max-w-none [filter:brightness(1.55)_saturate(1)] ${
            introStarted ? "animate-blur-left-in" : "opacity-0"
          }`}
        />
        <Image
          src="/img/bg_home_blur2.png"
          alt=""
          width={1080}
          height={1004}
          priority
          className={`pointer-events-none absolute -right-48 top-[-20%] z-[3] h-[182%] w-auto max-w-none [filter:brightness(1.45)_saturate(1)] ${
            introStarted ? "animate-blur-right-in" : "opacity-0"
          }`}
        />
      </div>
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_38%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.16)_34%,rgba(0,0,0,0.84)_79%),linear-gradient(90deg,rgba(5,24,35,0.2)_0%,rgba(0,0,0,0.16)_42%,rgba(29,50,62,0.16)_100%)]" />

      <header
        className={`relative z-10 grid w-full grid-cols-[1fr_auto] items-center gap-6 px-6 py-8 md:px-10 md:py-8 lg:grid-cols-[1fr_auto_1fr] lg:px-[70px] lg:py-[50px] ${
          introStarted ? "animate-navbar-in" : "opacity-0"
        }`}
      >
        <a
          href="#home"
          className="flex items-center gap-3"
          aria-label="NechCode home"
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
            NechCode
          </span>
        </a>

        <nav className="hidden items-center gap-[60px] text-[21px] font-medium uppercase tracking-normal text-white lg:flex">
          <a href="#about" className={navLinkClass}>
            About Us
          </a>

          <a href="#layanan" className={navLinkClass}>
            SERVICES
          </a>

          <a href="#consult" className={navLinkClass}>
            Contact
          </a>
        </nav>

        <Link
          href="#consult"
          className="hidden justify-self-end border border-white/70 px-[18px] py-[10px] text-[19px] font-medium !text-white visited:!text-white hover:!text-white transition-colors duration-200 hover:border-[#9fe8ff] hover:bg-white/10 lg:inline-flex"
        >
          Get Your Service
        </Link>

        <MobileNavMenu nav={heroNavItems} cta={heroNavCta} className="justify-self-end lg:hidden" />
      </header>

      <div
        className={`relative z-10 mx-auto flex min-h-[calc(100vh-140px)] max-w-[1040px] flex-col items-center px-8 pb-[52px] pt-[82px] text-center ${
          introStarted ? "animate-hero-copy-in" : "opacity-0"
        }`}
      >
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="max-w-[860px] text-[58px] font-light uppercase leading-[1.2] tracking-[0.085em] text-[#a8ecff]">
            Turn Your Ideas Into Digital Solutions
          </h1>
          <p className="mt-[26px] max-w-[620px] text-[24px] leading-[1.28] text-white">
            Crafting Digital Excellence for a Future Beyond Imagination.
          </p>
        </div>

        <button
          type="button"
          onClick={handleScrollNext}
          className={`group mt-12 flex flex-col items-center gap-2 text-[16px] font-medium uppercase ${navLinkClass}`}
          aria-label="Scroll to next section"
        >
          <span>Scroll</span>
          <span className="h-3 w-3 rotate-45 border-b-2 border-r-2 border-white transition-[transform,border-color] duration-200 group-hover:translate-y-1 group-hover:border-[#1782c4]" />
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
