import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SocialIcon } from "@/components/shared/social-icon";
import { layoutContainer } from "@/config/layout";
import { siteConfig } from "@/config/site";
import type { HomeContent } from "@/content/home";

type SiteFooterProps = {
  brand: HomeContent["brand"];
  footer: HomeContent["footer"];
};

const footerLinks = [
  siteConfig.socials.instagram,
  siteConfig.socials.tiktok,
  siteConfig.socials.linkedin,
  {
    platform: "WhatsApp",
    label: "WhatsApp",
    href: `https://wa.me/${siteConfig.whatsappNumber}`,
  },
];

export function SiteFooter({ brand, footer }: SiteFooterProps) {
  return (
    <footer className="w-full bg-[#2E3036]">
      <div className={`${layoutContainer} py-10 md:py-12 lg:py-14`}>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-start lg:gap-10">
              <Link href="/" aria-label={brand.name} className="inline-flex shrink-0">
                <Image
                  src="/logonav.png"
                  alt={brand.name}
                  width={320}
                  height={88}
                  priority
                  className="h-auto w-[210px] md:w-[260px] lg:w-[280px]"
                />
              </Link>

              <p className="max-w-[34rem] text-[1.05rem] leading-[1.5] text-white/95 md:text-[1.15rem]">
                {footer.note}
              </p>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-white/50 md:mt-10 md:text-[1.02rem]">
              © 2026 {brand.name}. Solusi digital praktis untuk bisnis, UMKM,
              organisasi, dan institusi di Indonesia.
            </p>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            {footerLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="flex h-11 w-11 items-center justify-center bg-[#F4F1EA] text-[#2E3036] transition-transform hover:-translate-y-0.5 md:h-12 md:w-12"
              >
                {item.platform === "WhatsApp" ? (
                  <MessageCircle size={18} strokeWidth={2.2} aria-hidden="true" />
                ) : (
                  <SocialIcon platform={item.platform} />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
