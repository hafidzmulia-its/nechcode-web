"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { LinkItem } from "@/content/home";

type MobileNavMenuProps = {
  nav: LinkItem[];
  cta?: LinkItem;
  className?: string;
};

function MobileMenuLink({
  item,
  className,
  onNavigate,
}: {
  item: LinkItem;
  className: string;
  onNavigate: () => void;
}) {
  const isInternalRoute = !item.external && item.href.startsWith("/");

  if (isInternalRoute) {
    return (
      <Link href={item.href} className={className} onClick={onNavigate}>
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
      onClick={onNavigate}
    >
      {item.label}
    </a>
  );
}

export function MobileNavMenu({
  nav,
  cta,
  className = "",
}: MobileNavMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={`relative lg:hidden ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((current) => !current)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white transition hover:border-[#9fe8ff]/60 hover:bg-white/12"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90] bg-black/35 backdrop-blur-[2px]"
          />
          <div className="absolute right-0 top-[calc(100%+12px)] z-[100] w-[min(320px,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#062131]/96 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <nav className="flex flex-col gap-2">
              {nav.map((item) => (
                <MobileMenuLink
                  key={`${item.href}-${item.label}`}
                  item={item}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-white/88 transition hover:bg-white/8 hover:text-[#9fe8ff]"
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </nav>

            {cta ? (
              <div className="mt-4 border-t border-white/10 pt-4">
                <MobileMenuLink
                  item={cta}
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#051724] transition hover:bg-[#d8f5ff]"
                  onNavigate={() => setOpen(false)}
                />
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
