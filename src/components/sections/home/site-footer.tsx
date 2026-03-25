import { Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { HomeContent } from "@/content/home";

type SiteFooterProps = {
  brand: HomeContent["brand"];
  footer: HomeContent["footer"];
};

export function SiteFooter({ brand, footer }: SiteFooterProps) {
  const socialLinks = footer.links.filter((item) =>
    /linkedin|instagram|tiktok|twitter|\bx\b/i.test(item.label),
  );
  const legalLinks = footer.links.filter((item) =>
    /kebijakan|syarat|ketentuan|privasi|legal/i.test(item.label),
  );

  function getSocialIcon(label: string) {
    const normalized = label.toLowerCase();

    if (normalized.includes("linkedin")) {
      return <Linkedin size={18} strokeWidth={2.2} aria-hidden="true" />;
    }

    if (normalized.includes("instagram")) {
      return <Instagram size={18} strokeWidth={2.2} aria-hidden="true" />;
    }

    if (normalized.includes("tiktok")) {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M16.75 3.5h-3.2v10.09a2.85 2.85 0 1 1-2.23-2.78v-3.2A6.05 6.05 0 1 0 16.75 13V7.98a7.72 7.72 0 0 0 4.5 1.45v-3.2a4.52 4.52 0 0 1-4.5-2.73Z" />
        </svg>
      );
    }

    if (normalized.includes("twitter") || normalized === "x" || normalized.includes(" x ")) {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M18.24 2.25h3.42l-7.48 8.55L23 21.75h-6.88l-5.39-7.02-6.15 7.02H1.16l8-9.15L1 2.25h7.05l4.87 6.42 5.32-6.42Zm-1.21 17.43h1.9L7.02 4.22H4.98l12.05 15.46Z" />
        </svg>
      );
    }

    return null;
  }

  return (
    <footer className="mt-20 w-full rounded-t-xl bg-surface-container-low">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col items-start justify-between gap-12 px-6 py-16 md:flex-row md:items-center md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-sm space-y-6">
          <Link href="/" aria-label={brand.name} className="inline-flex">
            <Image
              src="/logonav.png"
              alt={brand.name}
              width={198}
              height={56}
              style={{ width: "auto", height: "auto" }}
              className="h-auto w-[168px] md:w-[198px]"
            />
          </Link>
          <p className="font-body text-sm leading-relaxed text-on-surface-variant">
            {footer.note}
          </p>
          <div className="flex gap-6">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                title={item.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(29,90,141,0.14)] bg-[#FBF7EE] text-[#1D5A8D] transition-all hover:-translate-y-0.5 hover:border-[rgba(29,90,141,0.28)] hover:text-[#00BCD4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low"
              >
                {getSocialIcon(item.label)}
              </a>
            ))}
          </div>
          {/* <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-on-surface-variant">
            {socialLinks.map((item) => (
              <a key={`label-${item.label}`} href={item.href} target="_blank" rel="noreferrer" className="hover:text-primary">
                {item.label}
              </a>
            ))}
          </div> */}
        </div>

        <div className="grid grid-cols-2 gap-12 md:gap-20">
          <div className="space-y-4">
            <p className="font-body text-sm font-bold text-primary">Navigasi</p>
            <ul className="space-y-3 text-sm">
              <li><a href="/services" className="text-on-surface-variant transition-colors hover:text-primary">Services</a></li>
              <li><a href="/portfolio" className="text-on-surface-variant transition-colors hover:text-primary">Portfolio</a></li>
              <li><a href="/about" className="text-on-surface-variant transition-colors hover:text-primary">About</a></li>
              <li><a href="/contact" className="text-on-surface-variant transition-colors hover:text-primary">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="font-body text-sm font-bold text-primary">Legal</p>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-on-surface-variant transition-colors hover:text-primary">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1360px] px-6 pb-12 md:px-8 lg:px-10 xl:px-12">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/20 pt-8 md:flex-row">
          <p className="text-sm text-on-surface-variant">
            © {new Date().getFullYear()} {brand.name}. Solusi digital praktis untuk bisnis, UMKM, organisasi, dan institusi di Indonesia.
          </p>
          <p className="text-xs text-on-surface-variant/80">Berbasis di Surabaya</p>
        </div>
      </div>
    </footer>
  );
}
