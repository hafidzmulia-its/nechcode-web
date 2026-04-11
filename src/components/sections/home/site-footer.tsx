import Image from "next/image";
import Link from "next/link";

import { layoutContainer } from "@/config/layout";
import type { HomeContent } from "@/content/home";

type SiteFooterProps = {
  brand: HomeContent["brand"];
  footer: HomeContent["footer"];
};

export function SiteFooter({ brand, footer }: SiteFooterProps) {
  return (
    <footer className="w-full bg-[#EFE4CC]">
      <div className={`${layoutContainer} py-12 md:py-16`}>
        <div className="mb-8">
          <Link href="/" aria-label={brand.name} className="inline-flex">
            <Image
              src="/logonav.png"
              alt={brand.name}
              width={198}
              height={56}
              className="h-auto w-[168px] md:w-[198px]"
            />
          </Link>
        </div>

        <p className="mb-8 max-w-md font-body text-sm leading-relaxed text-on-surface-variant">
          {footer.note}
        </p>

        <div className="border-t border-outline-variant/20 pt-6">
          <p className="text-sm text-on-surface-variant">
            © 2026 {brand.name}. Solusi digital praktis untuk bisnis, UMKM,
            organisasi, dan institusi di Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
