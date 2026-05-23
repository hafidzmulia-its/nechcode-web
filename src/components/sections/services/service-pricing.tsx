"use client";

import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import type { AddOnItem, ServicePackage, ServicePillar } from "@/content/services";

type ServicePricingProps = {
  title: string;
  pillar: ServicePillar;
  showOptionLabel?: boolean;
  ctaSubnote?: string;
};

function formatAddOnName(name: string) {
  const map: Record<string, string> = {
    "Data preprocessing": "Data Pre-Processing",
    "Feature engineering": "Feature Engineering",
    "Hyperparameter tuning": "Hyperparameter Tuning",
    "Advanced model evaluation": "Advanced Model Evaluation",
    "Deployment model ke API": "Model Deployment to API",
  };

  return map[name] ?? name;
}

function formatAddOnPrice(price: string) {
  const firstPriceMatch = price.match(/Rp\s*[\d.]+/i);
  const firstPrice = firstPriceMatch?.[0] ?? price;

  return firstPrice.replace(/Rp\s*/i, "IDR ").toUpperCase();
}

export function ServicePricing({
  title,
  pillar,
  ctaSubnote,
}: ServicePricingProps) {
  const titleLines = title.split("\n");
  const hasExplicitTitleLines = titleLines.length > 1;
  const hasLongTitle = title.length > 70;
  const isMobilePillar = pillar.id === "mobile";

  return (
    <section id="pricing" className="w-full bg-[#FFFFFF] pb-24 md:pb-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-10 xl:px-12">
        <Reveal once y={16} className="mx-auto max-w-[76rem] pb-12 pt-20 text-center md:pt-24">
          <p className="font-body text-[clamp(1.1rem,1.2vw,1.35rem)] font-normal uppercase tracking-[0.03em] text-[#151515]">
            Normal Pricelist
          </p>
          <h2
            className={`mx-auto mt-7 font-sans font-normal uppercase leading-[1.2] text-[#101010] ${
              hasExplicitTitleLines
                ? "max-w-full text-[clamp(1.2rem,2.4vw,2rem)] tracking-[-0.02em]"
                : hasLongTitle
                  ? "max-w-[24ch] text-[clamp(1.25rem,2.5vw,2rem)] tracking-[-0.03em]"
                  : "max-w-[22ch] text-[clamp(2.45rem,4.8vw,4.7rem)] tracking-[-0.04em]"
            }`}
          >
            {hasExplicitTitleLines
              ? titleLines.map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))
              : title}
          </h2>
        </Reveal>

        <div
          className={`grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-5 ${
            isMobilePillar ? "md:items-start" : "md:items-stretch"
          }`}
        >
          {pillar.packages.map((pkg, index) => (
            <Reveal key={pkg.name} once y={22} delay={index * 0.08}>
              <PricingCard
                pkg={pkg}
                isFeatured={index === 1}
                ctaSubnote={ctaSubnote}
                compactLayout={isMobilePillar}
              />
            </Reveal>
          ))}
        </div>

        <Reveal once y={10} delay={0.12} className="mt-8">
          <p className="text-center text-sm text-[#767676]">{pillar.microcopy}</p>
        </Reveal>

        {pillar.addOns ? (
          <Reveal once y={14} delay={0.16} className="mt-10">
            <PredictiveAddOns items={pillar.addOns.items} />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function PredictiveAddOns({ items }: { items: AddOnItem[] }) {
  const orderedItems = [
    items[0],
    items[2],
    items[4],
    items[3],
    items[1],
  ].filter((item): item is AddOnItem => Boolean(item));

  return (
    <section className="bg-[#FFFFFF] pt-16 md:pt-20">
      <div className="mx-auto max-w-[1360px] text-center">
        <p className="font-body text-[22.4px] font-normal uppercase tracking-[0.03em] text-[#151515]">
          Add On Service
        </p>
        <h3 className="mx-auto mt-7 max-w-[28ch] font-sans text-[clamp(2.3rem,4.5vw,4.45rem)] font-normal uppercase leading-[1.22] tracking-[-0.04em] text-[#101010]">
          ADDITIONAL FEATURES TO IMPROVE THE QUALITY OF YOUR DATA ANALYSIS
        </h3>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-6">
          {orderedItems.map((item, index) => {
            const displayNumber = index < 3 ? index * 2 + 1 : (index - 2) * 2;

            return (
              <article
                key={item.name}
                className={`flex min-h-[7.25rem] items-center bg-[linear-gradient(105deg,#1D5A8D_0%,#061019_72%,#010509_100%)] px-8 text-left xl:col-span-2 ${
                  index === 3 ? "xl:col-start-2" : ""
                }`}
              >
                <span className="mr-8 shrink-0 font-sans text-[clamp(3.2rem,4.2vw,4.8rem)] font-light leading-none text-[#A8ECFF]">
                  {String(displayNumber).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-sans text-[clamp(1.5rem,2.2vw,2.45rem)] font-normal leading-[1.1] tracking-[-0.03em] text-white">
                    {formatAddOnName(item.name)}
                  </h4>
                  <p className="mt-3 font-body text-[clamp(1rem,1.2vw,1.25rem)] uppercase tracking-[0.04em] text-white/92">
                    START FROM {formatAddOnPrice(item.price)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  pkg,
  isFeatured,
  ctaSubnote,
  compactLayout = false,
}: {
  pkg: ServicePackage;
  isFeatured: boolean;
  ctaSubnote?: string;
  compactLayout?: boolean;
}) {
  const includedFeatures = getIncludedFeatures(pkg);
  const textColor = isFeatured ? "text-white" : "text-[#0D0D0D]";
  const bodyColor = isFeatured ? "text-white/72" : "text-[#8B8B8B]";
  const dividerColor = isFeatured ? "bg-white/92" : "bg-[#292929]";
  const buttonClass = isFeatured
    ? "bg-[#FFFFFF] !text-[#000000] visited:!text-[#000000] hover:!text-[#000000]"
    : "bg-[#051724] !text-[#FFFFFF] visited:!text-[#FFFFFF] hover:!text-[#FFFFFF]";
  const backgroundAsset = isFeatured
    ? "/img/rec_black_price.png"
    : "/img/rec_white_price.png";
  const titleStyle = isFeatured
    ? {
        backgroundImage: "linear-gradient(90deg, #FFFFFF 0%, #1D5A8D 100%)",
      }
    : {
        backgroundImage: "linear-gradient(90deg, #1D5A8D 0%, #78C5F1 100%)",
      };
  const articleClass = compactLayout
    ? "relative flex flex-col overflow-hidden rounded-[3rem] px-8 py-8 shadow-[0_18px_44px_rgba(25,39,52,0.08)] transition-transform duration-500 ease-out hover:-translate-y-1 md:px-10 md:py-10"
    : "relative flex min-h-[53rem] flex-col overflow-hidden rounded-[3rem] px-8 py-8 shadow-[0_18px_44px_rgba(25,39,52,0.08)] transition-transform duration-500 ease-out hover:-translate-y-1 md:px-10 md:py-10";
  const contentClass = compactLayout
    ? `relative z-10 flex flex-col ${textColor}`
    : `relative z-10 flex h-full flex-col ${textColor}`;
  const featureListClass = compactLayout
    ? "mt-8 space-y-4"
    : "mt-8 flex-1 space-y-4";
  const ctaMarginClass = compactLayout ? "mx-auto mt-8" : "mx-auto mt-10";

  return (
    <article className={articleClass}>
      <Image
        src={backgroundAsset}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
      />
      <div className={contentClass}>
        <div className="flex items-start justify-between gap-4">
          <h3
            className="text-[clamp(2rem,2.6vw,2.7rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-transparent"
            style={{
              ...titleStyle,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {pkg.name}
          </h3>

          {pkg.badge ? (
            <span className="rounded-full bg-[#2A6DA8] px-4 py-1.5 font-body text-[1rem] leading-none text-[#B8D8F7]">
              Best Choice
            </span>
          ) : null}
        </div>

        <p className="mt-6 font-sans text-[clamp(2.5rem,3.6vw,4rem)] font-semibold leading-none tracking-[-0.04em]">
          {formatPriceDisplay(pkg.priceCue)}
        </p>

        <div className={`mt-6 h-px w-full ${dividerColor}`} />

        <p className={`mt-6 max-w-[24ch] font-body text-[1.06rem] leading-[1.6] ${bodyColor}`}>
          {pkg.description}
        </p>

        <ul className={featureListClass}>
          {includedFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-4">
              <div className="relative mt-1 h-5 w-5 shrink-0">
                <Image
                  src="/img/centang_price.png"
                  alt=""
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className={`font-body text-[1.04rem] leading-[1.35] ${textColor}`}>
                {translateFeatureLabel(feature)}
              </span>
            </li>
          ))}
        </ul>

        <a
          href={pkg.cta.href}
          target={pkg.cta.external ? "_blank" : undefined}
          rel={pkg.cta.external ? "noreferrer" : undefined}
          className={`${ctaMarginClass} inline-flex min-h-[4rem] w-full max-w-[19.75rem] items-center justify-center rounded-full px-8 text-center font-body text-[1.02rem] font-semibold transition duration-300 hover:scale-[1.015] ${buttonClass}`}
        >
          Choose This package
        </a>

      {ctaSubnote ? (
        <p className={`mt-3 text-center text-xs ${isFeatured ? "text-white/58" : "text-[#8B8B8B]"}`}>
          {ctaSubnote}
        </p>
      ) : null}
      </div>
    </article>
  );
}

function formatPriceDisplay(priceCue: string) {
  const normalized = priceCue.replace(/Rp\s*/gi, "IDR ");
  return normalized.toUpperCase();
}

function getIncludedFeatures(pkg: ServicePackage) {
  if (pkg.featureRows?.length) {
    return pkg.featureRows
      .filter((row) => row.included)
      .map((row) => row.label);
  }

  return pkg.features ?? [];
}

function translateFeatureLabel(label: string) {
  const map: Record<string, string> = {
    "Contact form integration": "Contact from integration",
    "Lead Capture & CTA terstruktur": "Lead Capture & Structured CTA",
    "Optimasi performa dasar": "Base performance optimization",
    "Struktur SEO on-page": "SEO on-page structured",
    "Fitur custom operasional": "Operational custom features",
    "Integrasi API & database": "API Integration & Database",
    "Role & panel admin lanjutan": "Advanced admin roles & panels",
    "Dukungan 7 hari setelah rilis": "7 days of support after release",
    "Dukungan 30 hari setelah rilis": "30 days of support after release",
    "Hingga 5 halaman utama": "Up to 5 main pages",
  };

  return map[label] ?? label;
}
