import Image from "next/image";
import Link from "next/link";

import { SocialIcon } from "@/components/shared/social-icon";
import { layoutContainer } from "@/config/layout";
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

  return (
    <footer className="mt-20 w-full rounded-t-xl bg-surface-container">
      <div className={`${layoutContainer} flex flex-col items-start justify-between gap-12 py-16 md:flex-row md:items-center`}>
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
                <SocialIcon platform={item.label} />
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

      <div className={`${layoutContainer} pb-12`}>
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
