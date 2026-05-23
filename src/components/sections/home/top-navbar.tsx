"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { layoutContainer } from "@/config/layout";
import { MobileNavMenu } from "@/components/shared/mobile-nav-menu";
import type { HomeContent, LinkItem } from "@/content/home";

type TopNavbarProps = {
  brand: HomeContent["brand"];
  nav: HomeContent["nav"];
  cta: HomeContent["headerCta"];
};

function NavbarLink({
  item,
  className,
}: {
  item: LinkItem;
  className?: string;
}) {
  const isInternalRoute = !item.external && item.href.startsWith("/");

  if (isInternalRoute) {
    return (
      <Link href={item.href} className={className}>
        {item.label}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      className={className}
    >
      {item.label}
    </a>
  );
}

export function TopNavbar({ brand, nav, cta }: TopNavbarProps) {
  const [introStarted, setIntroStarted] = useState(false);

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setIntroStarted(true);
    }, 800);

    return () => window.clearTimeout(introTimer);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-transparent ${
        introStarted ? "animate-navbar-in" : "opacity-0"
      }`}
    >
      <div
        className={`${layoutContainer} flex min-h-[96px] items-center justify-between gap-4 py-5`}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 text-white transition-opacity hover:opacity-90"
          aria-label={`${brand.name} home`}
        >
          <Image
            src="/logo-aseli.png"
            alt={`${brand.name} logo`}
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />
          <span className="text-[22px] font-bold tracking-tight text-[#1782c4]">
            {brand.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-[60px] lg:flex">
          {nav.map((item) => (
            <NavbarLink
              key={`${item.href}-${item.label}`}
              item={item}
              className="text-[21px] font-medium uppercase tracking-normal text-white/95 transition-colors duration-200 hover:text-[#9fe8ff]"
            />
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <NavbarLink
            item={cta}
            className="inline-flex items-center justify-center border border-white/70 px-[18px] py-[10px] text-[19px] font-medium text-white transition-colors duration-200 hover:border-[#9fe8ff] hover:bg-white/10"
          />
        </div>

        <MobileNavMenu nav={nav} cta={cta} className="ml-auto" />
      </div>
    </header>
  );
}
