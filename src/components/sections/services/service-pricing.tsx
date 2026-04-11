"use client";

import { Reveal } from "@/components/shared/reveal";
import type { ServicePackage, ServicePillar } from "@/content/services";

type ServicePricingProps = {
  title: string;
  pillar: ServicePillar;
  /** Tampilkan label "Opsi N" di atas nama paket (dipakai di AI). */
  showOptionLabel?: boolean;
  /** Subnote kecil di bawah tombol CTA (dipakai di Mobile). */
  ctaSubnote?: string;
};

export function ServicePricing({
  title,
  pillar,
  showOptionLabel = false,
  ctaSubnote,
}: ServicePricingProps) {
  return (
    <section id="pricing" className="w-full bg-[#F5EEDC] pb-24 md:pb-32">
      <div className="mx-auto w-full max-w-[1240px] px-6 md:px-8 lg:px-10 xl:px-12">
        <Reveal once y={16} className="pb-12 pt-20 md:pt-24">
          <h2 className="font-headline text-3xl leading-snug text-primary md:text-4xl lg:text-5xl">
            {title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-stretch">
          {pillar.packages.map((pkg, index) => (
            <Reveal key={pkg.name} once y={24} delay={index * 0.09}>
              <PricingCard
                pkg={pkg}
                index={index}
                isFeatured={index === 1}
                showOptionLabel={showOptionLabel}
                ctaSubnote={ctaSubnote}
              />
            </Reveal>
          ))}
        </div>

        <Reveal once y={10} delay={0.12} className="mt-8">
          <p className="text-center text-sm text-on-surface-variant">
            {pillar.microcopy}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

type PricingCardProps = {
  pkg: ServicePackage;
  index: number;
  isFeatured: boolean;
  showOptionLabel: boolean;
  ctaSubnote?: string;
};

function PricingCard({
  pkg,
  index,
  isFeatured,
  showOptionLabel,
  ctaSubnote,
}: PricingCardProps) {
  const cardClass = isFeatured
    ? "ring-2 ring-primary shadow-[0_16px_40px_rgba(0,66,111,0.18)] hover:shadow-[0_28px_56px_rgba(0,66,111,0.24)]"
    : "ring-1 ring-outline-variant/30 shadow-[0_4px_16px_rgba(34,46,58,0.06)] hover:shadow-[0_20px_40px_rgba(34,46,58,0.13)]";

  return (
    <article
      className={`group relative flex h-full flex-col rounded-2xl bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 md:p-8 ${cardClass}`}
    >
      {pkg.badge ? (
        <span className="mb-4 inline-flex w-fit items-center rounded-full bg-secondary-container px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-on-secondary-container">
          {pkg.badge}
        </span>
      ) : null}

      {showOptionLabel ? (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
          Opsi {index + 1}
        </p>
      ) : null}

      <h3 className="font-headline text-2xl text-primary md:text-3xl">
        {pkg.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
        {pkg.description}
      </p>

      <PriceBlock pkg={pkg} />

      <PackageFeatures pkg={pkg} />

      <a
        href={pkg.cta.href}
        target={pkg.cta.external ? "_blank" : undefined}
        rel={pkg.cta.external ? "noreferrer" : undefined}
        className="mt-8 block w-full rounded-full bg-primary py-3.5 text-center text-sm font-bold !text-white transition hover:opacity-90 active:scale-[0.98]"
      >
        {pkg.cta.label}
      </a>

      {ctaSubnote ? (
        <p className="mt-3 text-center text-xs text-on-surface-variant/60">
          {ctaSubnote}
        </p>
      ) : null}
    </article>
  );
}

function PriceBlock({ pkg }: { pkg: ServicePackage }) {
  // Paket custom (mobile): cuma tampilkan "Konsultasi Scope" label saja.
  if (pkg.isCustom && !pkg.priceCue.toLowerCase().includes("konsultasi")) {
    return (
      <div className="mt-5 border-t border-outline-variant/20 pt-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
          Konsultasi Scope
        </p>
      </div>
    );
  }

  // Paket custom (ai "Mulai dari konsultasi"): tampilkan priceCue sebagai headline.
  if (pkg.isCustom) {
    return (
      <div className="mt-5 border-t border-outline-variant/20 pt-5">
        <p className="font-headline text-2xl font-bold text-primary">
          {pkg.priceCue}
        </p>
      </div>
    );
  }

  // Paket reguler: label "Spesial" + harga besar + subnote opsional.
  return (
    <div className="mt-5 border-t border-outline-variant/20 pt-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
        Spesial
      </p>
      <p className="mt-1 font-headline text-3xl font-bold text-primary">
        {pkg.priceCue}
      </p>
      {pkg.subnote ? (
        <p className="mt-1.5 text-xs text-on-surface-variant">{pkg.subnote}</p>
      ) : null}
    </div>
  );
}

function PackageFeatures({ pkg }: { pkg: ServicePackage }) {
  // Web pakai featureRows (boolean included). Mobile & AI pakai features (string[]).
  if (pkg.featureRows?.length) {
    return (
      <ul className="mt-5 flex-1 space-y-2.5">
        {pkg.featureRows.map((row) => (
          <li key={row.label} className="flex items-start gap-2.5">
            <span
              className={`material-symbols-outlined mt-0.5 text-base ${row.included ? "text-secondary" : "text-outline-variant/40"}`}
            >
              check
            </span>
            <span
              className={`text-sm leading-relaxed ${row.included ? "text-on-surface-variant" : "text-outline-variant/50"}`}
            >
              {row.label}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  if (pkg.features?.length) {
    return (
      <ul className="mt-5 flex-1 space-y-2.5">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span className="material-symbols-outlined mt-0.5 text-base text-secondary">
              check
            </span>
            <span className="text-sm leading-relaxed text-on-surface-variant">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return null;
}
