import Image from "next/image";
import Link from "next/link";

import { layoutContainer } from "@/config/layout";
import { siteConfig } from "@/config/site";
import type { HomeContent } from "@/content/home";

type SiteFooterProps = {
  brand: HomeContent["brand"];
  footer: HomeContent["footer"];
};

const socialLinks = [
  { ...siteConfig.socials.instagram, iconSrc: "/img/instagram_icon.png" },
  { ...siteConfig.socials.tiktok, iconSrc: "/img/tiktok_icon.png" },
  { ...siteConfig.socials.linkedin, iconSrc: "/img/linkedln_icon.png" },
] as const;

const aboutLinks = [
  { label: "About NechCode", href: "/about" },
  { label: "Our Vision", href: "/about#vision" },
  { label: "Our Principles", href: "/#principles" },
  { label: "Our Team", href: "/about#team" },
] as const;

const serviceLinks = [
  { label: "Website & Landing Pages", href: "/services/web" },
  { label: "Mobile Applications", href: "/services/mobile" },
  { label: "AI Automation & Chatbot", href: "/services/ai" },
  { label: "Predictive Data", href: "/services/predictive-data" },
] as const;

export function SiteFooter({ brand, footer }: SiteFooterProps) {
  void footer;

  return (
    <footer className="w-full bg-black text-white">
      <div className={`${layoutContainer} py-16 md:py-20 lg:py-24`}>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.42fr)_minmax(280px,0.5fr)] lg:gap-12">
          <div>
            <Link
              href="/"
              aria-label={brand.name}
              className="inline-flex shrink-0"
            >
              <Image
                src="/logonav.png"
                alt={brand.name}
                width={320}
                height={88}
                priority
                className="h-auto w-[210px] md:w-[250px] lg:w-[300px]"
              />
            </Link>

            <div className="mt-10 flex items-center gap-5">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#2B67A1] transition-transform hover:-translate-y-0.5"
                >
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-body text-[clamp(1.5rem,1.8vw,2rem)] font-semibold text-white">
              About us
            </h3>
            <nav className="mt-8 flex flex-col gap-5">
              {aboutLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-body text-[clamp(1.2rem,1.25vw,1.45rem)] font-normal text-white/66 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-body text-[clamp(1.5rem,1.8vw,2rem)] font-semibold text-white">
              Services
            </h3>
            <nav className="mt-8 flex flex-col gap-5">
              {serviceLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-body text-[clamp(1.2rem,1.25vw,1.45rem)] font-normal text-white/66 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-14 md:mt-16">
          <Image
            src="/img/asset_line.png"
            alt=""
            width={1600}
            height={2}
            sizes="100vw"
            className="block h-auto w-full opacity-20"
          />
        </div>

        <p className="mt-12 text-center font-body text-[clamp(1.2rem,1.2vw,1.5rem)] font-normal text-white/92">
          © 2026 {brand.name} I All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
