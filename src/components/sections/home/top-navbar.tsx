"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { CampaignAnnouncementBar } from "@/components/campaign/campaign-announcement-bar";
import { CampaignStickyUrgencyBar } from "@/components/campaign/campaign-sticky-urgency-bar";
import { layoutContainer } from "@/config/layout";
import type { HomeContent } from "@/content/home";
import type { Campaign } from "@/types/campaign";

type TopNavbarProps = {
  brand: HomeContent["brand"];
  nav: HomeContent["nav"];
  cta: HomeContent["headerCta"];
};

const layananDropdown = [
  { label: "Web Packages", href: "/services/web" },
  { label: "Mobile Apps", href: "/services/mobile" },
  { label: "AI Automation & Chatbot", href: "/services/ai" },
];

function isNavItemActive(href: string, pathname: string | null): boolean {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname?.startsWith(`${href}/`) === true;
}

export function TopNavbar({ brand, nav, cta }: TopNavbarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileLayananOpen, setMobileLayananOpen] = useState(false);
  const [topBarCampaign, setTopBarCampaign] = useState<Campaign | null>(null);
  const [stickyCampaign, setStickyCampaign] = useState<Campaign | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadCampaignPlacements() {
      try {
        const response = await fetch("/api/campaign/active", {
          cache: "no-store",
        });
        const data = (await response.json()) as {
          topBar: Campaign | null;
          stickyFinalHours: Campaign | null;
        };

        if (!mounted) return;

        setTopBarCampaign(data.topBar ?? null);
        setStickyCampaign(data.stickyFinalHours ?? null);
      } catch {
        if (!mounted) return;
        setTopBarCampaign(null);
        setStickyCampaign(null);
      }
    }

    void loadCampaignPlacements();
    const interval = window.setInterval(() => {
      void loadCampaignPlacements();
    }, 60000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const isLayananActive = pathname?.startsWith("/services") === true;

  return (
    <>
      <CampaignAnnouncementBar campaign={topBarCampaign} />
      <nav className="sticky top-0 z-50 w-full bg-transparent px-6 pt-4 pb-2 md:px-16 md:pt-5">
        <div className="relative flex items-center justify-between rounded-full border border-[#1d5a8d]/30 bg-[#f8f6f2] px-5 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.10)] md:px-8 md:py-3">
          <Link href="/" aria-label={brand.name} className="justify-self-start">
            <Image
              src="/logonav.png"
              alt={brand.name}
              width={176}
              height={50}
              priority
              className="h-auto w-[120px] md:w-[150px]"
            />
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {nav.map((item) => {
              const isLayanan = item.label === "Layanan";
              const isActive = isLayanan
                ? isLayananActive
                : isNavItemActive(item.href, pathname);

              if (isLayanan) {
                return (
                  <div key={item.label} className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 font-headline text-base transition-all ${
                        isActive
                          ? "bg-[#16425B] font-semibold !text-white"
                          : "font-normal text-[#1e1c11]/70 hover:bg-[#16425B] hover:!text-white"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-[#1d5a8d]/15 bg-[#f8f6f2] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                        {layananDropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setDropdownOpen(false)}
                            className="block px-5 py-3 font-sans text-sm font-medium text-[#1e1c11]/80 transition-colors hover:bg-[#16425B] hover:!text-white"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={
                    isActive
                      ? "rounded-lg bg-[#16425B] px-3 py-1.5 font-headline text-base font-semibold !text-white"
                      : "rounded-lg px-3 py-1.5 font-headline text-base font-normal text-[#1e1c11]/70 transition-all hover:bg-[#16425B] hover:!text-white"
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
            aria-label="Toggle menu"
            suppressHydrationWarning
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant/35 bg-white text-primary md:hidden"
          >
            {mounted && mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mounted && mobileOpen ? (
          <div className="border-t border-outline-variant/20 bg-surface-container-lowest md:hidden">
            <div className={`${layoutContainer} space-y-2 py-4`}>
              {nav.map((item) => {
                const isLayanan = item.label === "Layanan";
                const isActive = isLayanan
                  ? isLayananActive
                  : isNavItemActive(item.href, pathname);

                if (isLayanan) {
                  return (
                    <div key={item.label}>
                      <button
                        type="button"
                        onClick={() => setMobileLayananOpen((prev) => !prev)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 font-semibold ${
                          isActive
                            ? "bg-surface-container text-primary"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={15}
                          className={`transition-transform duration-200 ${mobileLayananOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileLayananOpen && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#16425B]/20 pl-3">
                          {layananDropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => {
                                setMobileLayananOpen(false);
                                setMobileOpen(false);
                              }}
                              className="block rounded-lg px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-[#16425B] hover:!text-white"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

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
      <CampaignStickyUrgencyBar campaign={stickyCampaign} />
    </>
  );
}
