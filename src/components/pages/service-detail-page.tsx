"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { SiteFooter } from "@/components/sections/home/site-footer";
import { MobileNavMenu } from "@/components/shared/mobile-nav-menu";
import {
  ContactServices,
  ServicePortfolio,
  ServicePricing,
  ServiceSpecialProgram,
} from "@/components/sections/services";
import type { HomeContent } from "@/content/home";
import { servicePageCopy } from "@/content/service-pages";
import {
  getServicePillarById,
  type ServicePillarId,
} from "@/content/services";

type ServiceDetailPageProps = {
  content: HomeContent;
  serviceId: ServicePillarId;
  heroImage: string;
  heroImageAlt: string;
  heroLabel: {
    left: string;
    rightTop: string;
    rightBottom?: string;
  };
  pricingOptions?: {
    showOptionLabel?: boolean;
    ctaSubnote?: string;
  };
};

const serviceLinks: Array<{
  id: ServicePillarId;
  label: string;
  href: string;
}> = [
  { id: "web", label: "WEBSITE & LANDING PAGES", href: "/services/web" },
  { id: "mobile", label: "MOBILE APPS", href: "/services/mobile" },
  { id: "ai", label: "AI AUTOMATION & CHATBOT", href: "/services/ai" },
  { id: "data", label: "PREDICTIVE DATA", href: "/services/predictive-data" },
];

const serviceHeaderNav = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "#consult" },
];

const serviceHeaderCta = {
  label: "Get Your Service",
  href: "#consult",
};

export function ServiceDetailPage({
  content,
  serviceId,
  heroImage,
  heroImageAlt,
  heroLabel,
  pricingOptions,
}: ServiceDetailPageProps) {
  const [introStarted, setIntroStarted] = useState(false);

  const pillar = getServicePillarById(serviceId);
  const copy = servicePageCopy[serviceId];
  const currentServiceIndex = serviceLinks.findIndex(
    (item) => item.id === serviceId,
  );
  const previousService =
    serviceLinks[
      (currentServiceIndex - 1 + serviceLinks.length) % serviceLinks.length
    ];
  const nextService =
    serviceLinks[(currentServiceIndex + 1) % serviceLinks.length];
  const portfolioId = `${serviceId}-portfolio`;

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setIntroStarted(true);
    }, 800);

    return () => {
      window.clearTimeout(introTimer);
    };
  }, []);

  function handleScrollNext() {
    const portfolioSection = document.getElementById(portfolioId);
    const fallbackSection = document.getElementById("special-program");
    const targetSection = portfolioSection ?? fallbackSection;

    targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-[#030608] text-white selection:bg-[#8fdcff] selection:text-[#07131d]">
      <section
        id={`${serviceId}-hero`}
        className="relative isolate min-h-screen overflow-hidden bg-[#020202]"
      >
        <IntroOverlay introStarted={introStarted} />

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

        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_34%,rgba(15,33,46,0)_0%,rgba(3,9,13,0.12)_36%,rgba(2,4,6,0.86)_80%),linear-gradient(90deg,rgba(6,25,36,0.34)_0%,rgba(0,0,0,0.08)_42%,rgba(40,21,64,0.22)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%)]" />

        <ServiceHeroHeader introStarted={introStarted} />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-118px)] w-full max-w-[1540px] flex-col px-5 pb-0 pt-2 sm:px-8 lg:px-14">
          <ServiceSelector
            currentServiceIndex={currentServiceIndex}
            previousService={previousService}
            nextService={nextService}
            introStarted={introStarted}
          />

          <div className="relative flex flex-1 items-end justify-center overflow-hidden pb-0">
            <HeroTitle label={heroLabel} introStarted={introStarted} />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 sm:px-8">
              <div
                className={`relative h-[50vw] w-full max-w-[980px] min-h-[260px] sm:h-[46vw] md:h-[42vw] lg:h-[36vw] lg:max-w-[1080px] xl:h-[34vw] ${
                  introStarted ? "animate-service-asset-rise" : "opacity-0"
                }`}
              >
                <Image
                  src={heroImage}
                  alt={heroImageAlt}
                  fill
                  priority
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 1080px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleScrollNext}
              className={`absolute bottom-14 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 bg-[linear-gradient(180deg,rgba(99,122,153,0.08)_0%,rgba(81,112,157,0.34)_100%)] px-8 py-4 text-sm font-medium uppercase tracking-[0.04em] text-white transition hover:text-[#8fdcff] md:bottom-20 md:px-12 ${
                introStarted ? "animate-hero-copy-in" : "opacity-0"
              }`}
              aria-label="Scroll to service details"
            >
              <span>Scroll</span>
              <span className="h-3 w-3 rotate-45 border-b-2 border-r-2 border-white transition-colors" />
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-white/90" />
      </section>

      <main className="pb-24 md:pb-32">
        <div id={portfolioId}>
          <ServicePortfolio {...copy.portfolio} />
        </div>
        <ServiceSpecialProgram />
        <ServicePricing
          title={copy.pricing.title}
          pillar={pillar}
          showOptionLabel={pricingOptions?.showOptionLabel}
          ctaSubnote={pricingOptions?.ctaSubnote}
        />
        <ContactServices />
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}

function IntroOverlay({ introStarted }: { introStarted: boolean }) {
  return (
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
  );
}

function ServiceHeroHeader({ introStarted }: { introStarted: boolean }) {
  return (
    <header
      className={`relative z-10 flex items-center justify-between gap-6 px-6 py-6 md:px-10 md:py-8 lg:px-[70px] lg:py-[50px] ${
        introStarted ? "animate-navbar-in" : "opacity-0"
      }`}
    >
      <Link href="/" aria-label="NechCode home" className="flex items-center gap-3">
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
      </Link>

      <Link
        href="#consult"
        className="hidden border border-white/70 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-[#9fe8ff] hover:bg-white/10 md:px-7 md:text-[19px] lg:inline-flex"
      >
        Get Your Service
      </Link>

      <MobileNavMenu
        nav={serviceHeaderNav}
        cta={serviceHeaderCta}
        className="ml-auto lg:hidden"
      />
    </header>
  );
}

function ServiceSelector({
  currentServiceIndex,
  previousService,
  nextService,
  introStarted,
}: {
  currentServiceIndex: number;
  previousService: (typeof serviceLinks)[number];
  nextService: (typeof serviceLinks)[number];
  introStarted: boolean;
}) {
  return (
    <div
      className={`mx-auto grid w-full max-w-[1120px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 pb-8 pt-2 text-center text-[12px] font-medium uppercase tracking-[0.04em] text-white/92 sm:gap-4 sm:text-[14px] md:text-[17px] lg:gap-8 lg:text-[19px] ${
        introStarted ? "animate-hero-copy-in" : "opacity-0"
      }`}
    >
      <Link
        href={previousService.href}
        aria-label={`Go to ${previousService.label}`}
        className="group shrink-0 p-1 text-white transition duration-300 hover:text-[#8fdcff]"
      >
        <ChevronLeft
          className="h-6 w-6 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(168,236,255,0.55)] sm:h-8 sm:w-8"
          strokeWidth={2.5}
        />
      </Link>

      <div className="min-w-0 overflow-x-auto">
        <div className="flex min-w-max items-center justify-center gap-4 px-1 sm:gap-5 lg:gap-8">
          {serviceLinks.map((item, index) => {
            const isActive = index === currentServiceIndex;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative shrink-0 whitespace-nowrap pb-3 transition duration-300 ${
                  isActive ? "text-white" : "text-white/88 hover:text-[#a8ecff]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-[3px] origin-left transition-all duration-300 ${
                    isActive
                      ? "scale-x-100 bg-white shadow-[0_0_12px_rgba(255,255,255,0.45)]"
                      : "scale-x-0 bg-[#a8ecff]/90 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </div>

      <Link
        href={nextService.href}
        aria-label={`Go to ${nextService.label}`}
        className="group shrink-0 p-1 text-white transition duration-300 hover:text-[#8fdcff]"
      >
        <ChevronRight
          className="h-6 w-6 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(168,236,255,0.55)] sm:h-8 sm:w-8"
          strokeWidth={2.5}
        />
      </Link>
    </div>
  );
}

function HeroTitle({
  label,
  introStarted,
}: {
  label: ServiceDetailPageProps["heroLabel"];
  introStarted: boolean;
}) {
  return (
    <div
      className={`relative z-20 mb-[28vh] w-full max-w-[1300px] px-2 sm:mb-[25vh] lg:mb-[22vh] ${
        introStarted ? "animate-hero-copy-in" : "opacity-0"
      }`}
    >
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-4">
        <div className="text-center lg:text-left">
          <p className="text-[clamp(4.5rem,10.4vw,8.2rem)] font-light uppercase leading-[0.9] tracking-[0.01em] text-[#a8ecff] [text-shadow:0_5px_10px_rgba(0,0,0,0.35)]">
            {label.left}
          </p>
        </div>

        <div className="pt-2 text-center lg:pt-24 lg:text-right">
          <p className="text-[clamp(4rem,9vw,7rem)] font-light uppercase leading-[0.9] tracking-[0.01em] text-[#a8ecff] [text-shadow:0_5px_10px_rgba(0,0,0,0.35)]">
            {label.rightTop}
          </p>
          {label.rightBottom ? (
            <p className="mt-3 text-[clamp(3.9rem,8vw,6.4rem)] font-light uppercase leading-[0.88] tracking-[0.01em] text-[#a8ecff] [text-shadow:0_5px_10px_rgba(0,0,0,0.35)]">
              {label.rightBottom}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
