"use client";

import { useMemo, useState } from "react";
import { Instagram, Linkedin } from "lucide-react";

import { buildMailto, getSocialLinks, siteConfig } from "@/config/site";
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
        additionalNote: briefForm.email ? `Email kontak: ${briefForm.email}` : undefined,
      }),
    [briefForm],
  );

  function getSocialIcon(platform: string) {
    const normalized = platform.toLowerCase();

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

    if (normalized === "x" || normalized.includes("twitter")) {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M18.24 2.25h3.42l-7.48 8.55L23 21.75h-6.88l-5.39-7.02-6.15 7.02H1.16l8-9.15L1 2.25h7.05l4.87 6.42 5.32-6.42Zm-1.21 17.43h1.9L7.02 4.22H4.98l12.05 15.46Z" />
        </svg>
      );
    }

    return null;
  }
 

  return (
    <div className="selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar brand={content.brand} nav={content.nav} cta={content.headerCta} />

      <main className="pb-20">
        <section className="w-full bg-surface py-20">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={18} className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Contact</p>
              <h1 className="font-headline text-5xl leading-tight text-primary md:text-7xl">
                Konsultasi Proyek dengan <span className="serif-italic">Arah yang Jelas</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-on-surface-variant">
                Ceritakan konteks bisnis, target timeline, dan prioritas Anda. Kami akan bantu memetakan opsi solusi paling realistis untuk tahap awal sampai implementasi.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="w-full bg-gradient-to-b from-surface-container-low/55 to-surface py-10 md:py-14">
          <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-6 px-6 md:grid-cols-2 md:px-8 lg:px-10 xl:px-12">
            <Reveal y={16}>
              <div className="rounded-[1.8rem] border border-outline-variant/20 bg-surface-container-lowest p-7 shadow-[0_10px_24px_rgba(24,34,45,0.06)]">
                <h2 className="mb-4 font-headline text-3xl text-primary">Direct Channel</h2>
                <div className="space-y-3 text-sm text-on-surface-variant">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold !text-white visited:!text-white hover:!text-white transition hover:opacity-90"
                  >
                    Konsultasi via WhatsApp ({siteConfig.whatsappDisplayName})
                  </a>
                  <p>Email alternatif: <a className="font-semibold text-primary underline underline-offset-4" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
                  <p>Domain: {siteConfig.domain}</p>
                  <p className="pt-1 text-xs">Respon awal umumnya dalam 1x24 jam kerja. Jika kebutuhan Anda mendesak, tulis kata "URGENT" di awal pesan WhatsApp.</p>
                </div>
                <div className="mt-5 border-t border-outline-variant/20 pt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">Social</p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {socialLinks.map((item) => (
                      <a
                        key={item.platform}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${item.platform} ${item.handle}`}
                        title={`${item.platform} / ${item.handle}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(29,90,141,0.14)] bg-[#FBF7EE] text-[#1D5A8D] transition-all hover:-translate-y-0.5 hover:border-[rgba(29,90,141,0.28)] hover:text-[#00BCD4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low"
                      >
                        {getSocialIcon(item.platform)}
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
                <h2 className="mb-4 font-headline text-3xl text-primary">Brief Form</h2>
                <p className="mb-4 text-sm text-on-surface-variant">
                  Cocok untuk kebutuhan yang sudah lebih jelas. Isi poin inti agar kami bisa menyiapkan rekomendasi scope awal dengan cepat.
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nama"
                    value={briefForm.name}
                    onChange={(event) => setBriefForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={briefForm.email}
                    onChange={(event) => setBriefForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <input
                    type="text"
                    placeholder="Jenis Proyek (Website, System, Automation)"
                    value={briefForm.projectType}
                    onChange={(event) => setBriefForm((prev) => ({ ...prev, projectType: event.target.value }))}
                    className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <textarea
                    placeholder="Jelaskan kebutuhan Anda secara singkat"
                    rows={5}
                    value={briefForm.brief}
                    onChange={(event) => setBriefForm((prev) => ({ ...prev, brief: event.target.value }))}
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
                <a href={buildMailto("Project Brief NechCode")} className="mt-4 block text-sm font-bold text-primary underline underline-offset-4">
                  atau kirim via Email
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
