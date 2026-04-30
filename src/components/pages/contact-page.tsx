"use client";

import { useMemo, useState } from "react";

import { SocialIcon } from "@/components/shared/social-icon";
import { layoutContainer } from "@/config/layout";
import {
  buildGmailComposeUrl,
  buildMailto,
  getSocialLinks,
  siteConfig,
} from "@/config/site";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { Reveal } from "@/components/shared/reveal";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import type { HomeContent } from "@/content/home";

type ContactPageProps = {
  content: HomeContent;
};

export function ContactPage({ content }: ContactPageProps) {
  const socialLinks = getSocialLinks();
  const [briefForm, setBriefForm] = useState({
    name: "",
    email: "",
    projectType: "",
    brief: "",
  });

  const whatsappLink = buildWhatsAppInquiryUrl({
    sourcePage: "Contact Page",
    serviceInterest: "Diskusi kebutuhan proyek",
  });

  const briefWhatsappLink = useMemo(
    () =>
      buildWhatsAppInquiryUrl({
        sourcePage: "Contact Page - Brief Form",
        name: briefForm.name,
        serviceInterest: briefForm.projectType || "Brief proyek digital",
        packageInterest: briefForm.projectType,
        mainNeed: briefForm.brief,
        additionalNote: briefForm.email
          ? `Email kontak: ${briefForm.email}`
          : undefined,
      }),
    [briefForm],
  );

  const briefMailtoLink = useMemo(() => {
    const lines: string[] = [];
    if (briefForm.name) lines.push(`Nama: ${briefForm.name}`);
    if (briefForm.email) lines.push(`Email: ${briefForm.email}`);
    if (briefForm.projectType)
      lines.push(`Jenis Proyek: ${briefForm.projectType}`);
    if (briefForm.brief) lines.push(`\nKebutuhan:\n${briefForm.brief}`);
    return buildGmailComposeUrl("Project Brief NechCode", lines.join("\n"));
  }, [briefForm]);

  return (
    <div className="bg-[#FFFFFF] selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar
        brand={content.brand}
        nav={content.nav}
        cta={content.headerCta}
      />

      <main className="bg-[#FFFFFF] pb-20">
        <section className="w-full bg-[#FFFFFF]">
          <div className={layoutContainer}>
            <Reveal once y={18} className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                Contact
              </p>
              <h1 className="font-headline text-5xl leading-tight text-primary md:text-7xl">
                Konsultasi Proyek dengan{" "}
                <span className="serif-italic">Arah yang Jelas</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-on-surface-variant">
                Ceritakan konteks bisnis, target timeline, dan prioritas Anda.
                Kami akan bantu memetakan opsi solusi paling realistis untuk
                tahap awal sampai implementasi.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="w-full bg-[#FFFFFF] py-10 md:py-14">
          <div
            className={`${layoutContainer} grid grid-cols-1 gap-6 md:grid-cols-2`}
          >
            <Reveal y={16}>
              <div className="rounded-[1.8rem] border border-outline-variant/20 bg-surface-container-lowest p-7 shadow-[0_10px_24px_rgba(24,34,45,0.06)]">
                <h2 className="mb-4 font-headline text-3xl text-primary">
                  Direct Channel
                </h2>
                <div className="space-y-3 text-sm text-on-surface-variant">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold !text-white visited:!text-white hover:!text-white transition hover:opacity-90"
                  >
                    Konsultasi via WhatsApp ({siteConfig.whatsappDisplayName})
                  </a>
                  <a
                    href={buildGmailComposeUrl("Konsultasi Proyek NechCode")}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-outline-variant/30 bg-[#FFFFFF] px-5 py-3 text-sm font-bold text-primary transition hover:bg-surface-container"
                  >
                    Kirim Brief via Email
                  </a>
                  <p>
                    Email resmi:{" "}
                    <a
                      className="font-semibold text-primary underline underline-offset-4"
                      href={`mailto:${siteConfig.email}`}
                    >
                      {siteConfig.email}
                    </a>
                  </p>
                  <p className="pt-1 text-xs">
                    Respon awal umumnya dalam 1x24 jam kerja. Jika kebutuhan
                    Anda mendesak, tulis kata "URGENT" di awal pesan WhatsApp.
                  </p>
                </div>
                <div className="mt-5 border-t border-outline-variant/20 pt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    Social
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {socialLinks.map((item) => (
                      <a
                        key={item.platform}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${item.platform} ${item.handle}`}
                        title={`${item.platform} / ${item.handle}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(29,90,141,0.14)] bg-brand-cream-soft text-[#1D5A8D] transition-all hover:-translate-y-0.5 hover:border-[rgba(29,90,141,0.28)] hover:text-[#00BCD4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low"
                      >
                        <SocialIcon platform={item.platform} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal y={16} delay={0.06}>
              <form
                onSubmit={(event) => event.preventDefault()}
                className="rounded-[1.8rem] border border-outline-variant/20 bg-surface-container-lowest p-7 shadow-[0_10px_24px_rgba(24,34,45,0.06)]"
              >
                <h2 className="mb-4 font-headline text-3xl text-primary">
                  Brief Form
                </h2>
                <p className="mb-4 text-sm text-on-surface-variant">
                  Cocok untuk kebutuhan yang sudah lebih jelas. Isi poin inti
                  agar kami bisa menyiapkan rekomendasi scope awal dengan cepat.
                </p>
                <p className="mb-4 text-xs text-on-surface-variant">
                  Jelaskan kebutuhan Anda secara singkat. Contoh: Saya ingin
                  mengintegrasikan sistem stok gudang ke website e-commerce.
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nama"
                    value={briefForm.name}
                    onChange={(event) =>
                      setBriefForm((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={briefForm.email}
                    onChange={(event) =>
                      setBriefForm((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <input
                    type="text"
                    placeholder="Jenis Proyek (Website, System, Automation)"
                    value={briefForm.projectType}
                    onChange={(event) =>
                      setBriefForm((prev) => ({
                        ...prev,
                        projectType: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <textarea
                    placeholder="Jelaskan kebutuhan Anda secara singkat"
                    rows={5}
                    value={briefForm.brief}
                    onChange={(event) =>
                      setBriefForm((prev) => ({
                        ...prev,
                        brief: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <a
                  href={briefWhatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold !text-white visited:!text-white hover:!text-white transition hover:opacity-90"
                >
                  Kirim Brief via WhatsApp
                </a>
                <a
                  href={briefMailtoLink}
                  className="mt-4 block text-sm font-bold text-primary underline underline-offset-4"
                >
                  Kirim Brief via Email
                </a>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
