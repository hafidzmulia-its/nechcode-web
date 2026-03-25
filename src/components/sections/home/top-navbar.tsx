"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { HomeContent } from "@/content/home";

type TopNavbarProps = {
  brand: HomeContent["brand"];
  nav: HomeContent["nav"];
  cta: HomeContent["headerCta"];
};

export function TopNavbar({ brand, nav, cta }: TopNavbarProps) {
  const pathname = usePathname();
  const layoutContainer = "mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-outline-variant/20 bg-surface-container-lowest/85 backdrop-blur-lg">
      <div className={`${layoutContainer} grid grid-cols-[1fr_auto_1fr] items-center py-4 md:py-5`}>
        <Link href="/" aria-label={brand.name} className="justify-self-start">
          <Image
            src="/logonav.png"
            alt={brand.name}
            width={176}
            height={50}
            priority
            style={{ width: "auto", height: "auto" }}
            className="h-auto w-[150px] md:w-[176px]"
          />
        </Link>

        <div className="hidden items-center gap-10 justify-self-center md:flex">
          {nav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
              key={item.label}
              href={item.href}
              className={
                isActive
                  ? "border-b-2 border-secondary pb-1 font-headline text-lg italic text-primary"
                  : "font-headline text-lg italic text-[#1e1c11]/70 transition-colors hover:text-primary"
              }
            >
              {item.label}
              </Link>
            );
          })}
        </div>

        <a
          href={cta.href}
          target={cta.external ? "_blank" : undefined}
          rel={cta.external ? "noreferrer" : undefined}
          className="justify-self-end rounded-xl bg-primary-container px-5 py-2.5 text-sm font-semibold !text-white transition-all hover:-translate-y-0.5 hover:bg-primary active:scale-95 md:px-8 md:text-base"
        >
          {cta.label}
        </a>
      </div>
    </nav>
  );
}
