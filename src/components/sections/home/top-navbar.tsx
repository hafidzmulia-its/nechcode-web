"use client";

import { Bot, ChevronDown, Globe, Menu, Smartphone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { HomeContent } from "@/content/home";
import { servicesContent } from "@/content/services";

type TopNavbarProps = {
  brand: HomeContent["brand"];
  nav: HomeContent["nav"];
  cta: HomeContent["headerCta"];
};

export function TopNavbar({ brand, nav, cta }: TopNavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const closeMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const layoutContainer = "mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12";

  useEffect(() => {
    setMobileOpen(false);
    setDesktopServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeMenuTimeoutRef.current) {
        clearTimeout(closeMenuTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDesktopServicesOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function serviceIconById(pillarId: string) {
    if (pillarId === "web") return <Globe size={18} />;
    if (pillarId === "mobile") return <Smartphone size={18} />;
    return <Bot size={18} />;
  }

  function cancelCloseServicesMenu() {
    if (closeMenuTimeoutRef.current) {
      clearTimeout(closeMenuTimeoutRef.current);
      closeMenuTimeoutRef.current = null;
    }
  }

  function openServicesMenu() {
    cancelCloseServicesMenu();
    setDesktopServicesOpen(true);
  }

  function scheduleCloseServicesMenu() {
    cancelCloseServicesMenu();
    closeMenuTimeoutRef.current = setTimeout(() => {
      setDesktopServicesOpen(false);
    }, 500);
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-outline-variant/20 bg-surface-container-lowest/85 backdrop-blur-lg">
      <div className={`${layoutContainer} flex items-center justify-between py-4 md:py-5`}>
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

        <div className="hidden items-center gap-10 md:flex">
          {nav.map((item) => {
            if (item.href === "/services") {
              return (
                <div
                  key={item.label}
                  ref={servicesMenuRef}
                  className="relative"
                  onMouseEnter={openServicesMenu}
                  onMouseLeave={scheduleCloseServicesMenu}
                  onBlur={(event) => {
                    const nextTarget = event.relatedTarget as Node | null;
                    if (!servicesMenuRef.current?.contains(nextTarget)) {
                      scheduleCloseServicesMenu();
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={desktopServicesOpen}
                    aria-haspopup="menu"
                    onFocus={openServicesMenu}
                    className={`inline-flex items-center gap-1 border-b-2 pb-1 font-headline text-lg italic transition ${
                      pathname === "/services" || pathname?.startsWith("/services/")
                        ? "border-secondary text-primary"
                        : "border-transparent text-[#1e1c11]/70 hover:text-primary"
                    }`}
                  >
                    Services
                    <ChevronDown size={15} className={`transition ${desktopServicesOpen ? "rotate-180" : ""}`} />
                  </button>

                  {desktopServicesOpen ? (
                    <>
                      <div className="absolute left-1/2 top-full z-30 h-5 w-[760px] -translate-x-1/2" aria-hidden="true" />
                      <div
                        className="absolute left-1/2 top-full z-40 mt-5 w-[760px] -translate-x-1/2 rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-[0_24px_58px_rgba(22,34,47,0.18)]"
                        onMouseEnter={cancelCloseServicesMenu}
                        onMouseLeave={scheduleCloseServicesMenu}
                      >
                      <p className="max-w-2xl text-sm leading-relaxed text-on-surface-variant">{servicesContent.megaMenu.intro}</p>

                      <div className="mt-5 grid grid-cols-3 gap-3">
                        {servicesContent.pillars.map((pillar) => (
                          <Link
                            key={pillar.id}
                            href={`/services?pillar=${pillar.id}`}
                            className="rounded-2xl border border-outline-variant/20 bg-surface p-4 transition hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-[0_10px_24px_rgba(24,34,45,0.09)]"
                            role="menuitem"
                            onClick={() => setDesktopServicesOpen(false)}
                          >
                            <div className="mb-3 inline-flex rounded-lg bg-surface-container px-2.5 py-2 text-primary">
                              {serviceIconById(pillar.id)}
                            </div>
                            <p className="font-headline text-xl text-primary">{pillar.navbarTitle}</p>
                            <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">{pillar.navbarBody}</p>
                            <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-secondary">{pillar.navbarPriceCue}</p>
                            <span className="mt-3 inline-flex text-xs font-bold uppercase tracking-[0.12em] text-primary">
                              {pillar.navbarCtaLabel}
                            </span>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between rounded-2xl border border-outline-variant/20 bg-surface-container-low px-4 py-3">
                        <Link href={servicesContent.megaMenu.compareCta.href} className="text-sm font-bold text-primary">
                          {servicesContent.megaMenu.compareCta.label}
                        </Link>
                        <a
                          href={servicesContent.megaMenu.consultCta.href}
                          target={servicesContent.megaMenu.consultCta.external ? "_blank" : undefined}
                          rel={servicesContent.megaMenu.consultCta.external ? "noreferrer" : undefined}
                          className="rounded-xl bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] !text-white"
                        >
                          {servicesContent.megaMenu.consultCta.label}
                        </a>
                      </div>
                      </div>
                    </>
                  ) : null}
                </div>
              );
            }

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
          className="hidden rounded-xl bg-primary-container px-5 py-2.5 text-sm font-semibold !text-white transition-all hover:-translate-y-0.5 hover:bg-primary active:scale-95 md:inline-flex md:px-8 md:text-base"
        >
          {cta.label}
        </a>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant/35 bg-white text-primary md:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-outline-variant/20 bg-surface-container-lowest md:hidden">
          <div className={`${layoutContainer} space-y-2 py-4`}>
            {nav.map((item) => {
              if (item.href === "/services") {
                return (
                  <div key={`mobile-${item.label}`} className="rounded-lg border border-outline-variant/20 bg-surface-container-low px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((previous) => !previous)}
                      aria-expanded={mobileServicesOpen}
                      className="flex w-full items-center justify-between font-semibold text-primary"
                    >
                      <span>Services</span>
                      <ChevronDown size={16} className={`transition ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>

                    {mobileServicesOpen ? (
                      <div className="mt-3 space-y-2">
                        {servicesContent.pillars.map((pillar) => (
                          <Link
                            key={`mobile-pillar-${pillar.id}`}
                            href={`/services?pillar=${pillar.id}`}
                            className="block rounded-lg bg-surface px-3 py-2"
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileServicesOpen(false);
                            }}
                          >
                            <p className="text-sm font-bold text-primary">{pillar.navbarTitle}</p>
                            <p className="mt-1 text-xs text-on-surface-variant">{pillar.navbarPriceCue}</p>
                          </Link>
                        ))}

                        <a
                          href={servicesContent.megaMenu.consultCta.href}
                          target={servicesContent.megaMenu.consultCta.external ? "_blank" : undefined}
                          rel={servicesContent.megaMenu.consultCta.external ? "noreferrer" : undefined}
                          className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-bold !text-white"
                        >
                          Konsultasi via WhatsApp
                        </a>
                      </div>
                    ) : null}
                  </div>
                );
              }

              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname?.startsWith(`${item.href}/`);

              return (
                <Link
                  key={`mobile-${item.label}`}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 font-semibold ${isActive ? "bg-surface-container text-primary" : "text-on-surface-variant"}`}
                >
                  {item.label}
                </Link>
              );
            })}

            <a
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noreferrer" : undefined}
              className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-primary-container px-5 py-3 text-sm font-semibold !text-white"
            >
              {cta.label}
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
