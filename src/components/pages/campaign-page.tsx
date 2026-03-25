import Image from "next/image";

import { CampaignEligibilityNote } from "@/components/campaign/campaign-eligibility-note";
import { CampaignFaq } from "@/components/campaign/campaign-faq";
import { CampaignHeroCountdown } from "@/components/campaign/campaign-hero-countdown";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import type { HomeContent } from "@/content/home";
import type { Campaign } from "@/types/campaign";

type CampaignPageProps = {
  content: HomeContent;
  campaign: Campaign;
};

export function CampaignPage({ content, campaign }: CampaignPageProps) {
  const featureCards = [
    {
      id: "feature-ucapan",
      title: "Ucapan Digital",
      description: "Kumpulan pesan tulus dari teman dan keluarga dalam interface yang elegan dan interaktif.",
      icon: "chat_bubble",
      image: {
        imageUrl: "/img/aset1.png",
        imageAlt: "Preview aset 1",
      },
    },
    {
      id: "feature-album",
      title: "Album Perayaan Online",
      description: "Simpan momen berharga dalam galeri digital yang mudah dibagikan ke keluarga dan teman dekat.",
      icon: "photo_library",
      image: {
        imageUrl: "/img/aset2.png",
        imageAlt: "Preview aset 2",
      },
    },
    {
      id: "feature-site",
      title: "Microsite Perayaan",
      description: "Halaman khusus yang merangkum cerita wisuda dalam format web yang personal dan berkesan.",
      icon: "language",
      image: {
        imageUrl: "/img/aset3.png",
        imageAlt: "Preview aset 3",
      },
    },
  ];

  return (
    <div className="selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar brand={content.brand} nav={content.nav} cta={content.headerCta} />

      <main className="pb-24">
        <CampaignHeroCountdown campaign={campaign} />

        <section className="w-full bg-gradient-to-b from-surface-container-low/60 to-surface py-10 md:py-14">
          <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-6 px-6 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 xl:px-12">
            <article className="rounded-[1.8rem] border border-outline-variant/20 bg-surface-container-lowest p-6 md:p-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Tentang Campaign</p>
              <h2 className="font-headline text-3xl text-primary md:text-4xl">{campaign.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-on-surface-variant md:text-base">{campaign.body}</p>

              <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-outline-variant/20 bg-surface p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">Yang termasuk</p>
                  <p className="mt-2 text-sm text-on-surface-variant">Ucapan digital, album online, atau microsite perayaan sesuai konteks hadiah.</p>
                </div>
                <div className="rounded-xl border border-outline-variant/20 bg-surface p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">Peluang saat ini</p>
                  <p className="mt-2 text-sm text-on-surface-variant">Batch aktif dengan slot produksi terbatas. Semakin dekat deadline, prioritas slot akan ditutup bertahap.</p>
                </div>
              </div>
            </article>

            <CampaignEligibilityNote audience={campaign.audience} termsShort={campaign.termsShort} />
          </div>
        </section>

        <section id="contoh" className="w-full bg-surface-container-low py-16 md:py-24">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h3 className="font-headline text-4xl font-bold text-primary">Semua Yang Kamu Butuhkan</h3>
              <p className="mt-3 text-on-surface-variant">Kado digital yang tidak hanya sekadar link, tapi pengalaman personal yang berkesan.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featureCards.map((card, index) => (
                <article key={card.id} className={`flex h-full flex-col justify-between rounded-[1.4rem] bg-surface-container-lowest p-8 shadow-[0_10px_26px_rgba(35,46,58,0.08)] transition-transform duration-500 hover:-translate-y-1 ${index === 1 ? "md:translate-y-8" : ""}`}>
                  <div>
                    <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${index === 0 ? "bg-primary-fixed text-primary" : index === 1 ? "bg-secondary-fixed text-on-secondary-container" : "bg-tertiary-fixed text-tertiary"}`}>
                      <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                    </div>
                    <h4 className="font-headline text-3xl text-primary">{card.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{card.description}</p>
                  </div>

                  {card.image ? (
                    <div className="relative mt-6 aspect-video overflow-hidden rounded-xl bg-surface-container-low">
                      <Image src={card.image.imageUrl} alt={card.image.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="packages" className="w-full bg-surface py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="font-headline text-4xl font-bold text-primary md:text-5xl">Pilih Paket Spesial Batch April</h3>
                <p className="mt-3 text-on-surface-variant">Investasi untuk mengabadikan momen wisuda secara digital dan personal.</p>
              </div>
              <div className="rounded-full bg-surface-container-low p-1.5">
                <span className="inline-flex rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">Personal</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <article className="flex h-full flex-col rounded-[1.4rem] bg-surface-container-low p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">Essential</p>
                <h4 className="mt-2 font-headline text-3xl text-primary">Basic</h4>
                <p className="mt-5 text-4xl font-black text-primary">Rp 149k <span className="text-base font-normal text-on-surface-variant">/site</span></p>
                <ul className="mt-8 flex-grow space-y-3 text-sm text-on-surface-variant">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-base">check_circle</span>Microsite 1 halaman</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-base">check_circle</span>Hingga 50 ucapan</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-base">check_circle</span>Galeri 10 foto</li>
                </ul>
                <a href={campaign.ctaHref || `/campaign/${campaign.slug}`} className="mt-8 inline-flex justify-center rounded-full border-2 border-primary px-6 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white">Pilih Paket</a>
              </article>

              <article className="relative z-10 flex h-full scale-[1.02] flex-col rounded-[1.4rem] bg-primary p-8 shadow-[0_20px_40px_rgba(29,90,141,0.3)]">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-on-secondary">Paling Populer</span>
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">Elevated Experience</p>
                <h4 className="mt-2 font-headline text-3xl text-white">Pro</h4>
                <p className="mt-5 text-4xl font-black text-white">Rp 299k <span className="text-base font-normal text-white/75">/site</span></p>
                <ul className="mt-8 flex-grow space-y-3 text-sm text-white/90">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary-fixed text-base">stars</span>Microsite full custom</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary-fixed text-base">stars</span>Ucapan tanpa batas</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary-fixed text-base">stars</span>Galeri HD + video</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary-fixed text-base">stars</span>Domain custom 1 tahun</li>
                </ul>
                <a href={campaign.ctaHref || `/campaign/${campaign.slug}`} className="mt-8 inline-flex justify-center rounded-full bg-secondary-fixed px-6 py-3 text-sm font-bold text-on-secondary-container transition hover:opacity-90">Pesan Sekarang</a>
              </article>

              <article className="flex h-full flex-col rounded-[1.4rem] bg-surface-container-low p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">Bespoke Solution</p>
                <h4 className="mt-2 font-headline text-3xl text-primary">Custom</h4>
                <p className="mt-5 text-3xl font-black text-primary">Konsultasi</p>
                <p className="mt-8 flex-grow text-sm text-on-surface-variant">Untuk hadiah kolektif, kebutuhan organisasi, atau microsite dengan pengalaman yang sepenuhnya disesuaikan.</p>
                <a href={campaign.ctaHref || `/campaign/${campaign.slug}`} className="mt-8 inline-flex justify-center rounded-full border-2 border-primary px-6 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white">Konsultasi</a>
              </article>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface py-8 md:py-12">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <CampaignFaq campaign={campaign} />
            {campaign.termsLong ? (
              <div className="mt-6 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Syarat & Ketentuan</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">{campaign.termsLong}</p>
              </div>
            ) : null}
          </div>
        </section>

        <section className="w-full px-6 pb-4 pt-8 md:px-8 lg:px-10 xl:px-12">
          <div className="mx-auto w-full max-w-[1360px] overflow-hidden rounded-[2rem] bg-primary p-10 text-center md:p-16">
            <h3 className="mx-auto max-w-3xl font-headline text-4xl font-bold text-white md:text-5xl">Abadikan Momen Wisuda Batch April Ini dengan Elegan</h3>
            <p className="mx-auto mt-4 max-w-2xl text-primary-fixed">Jangan biarkan momen sekali seumur hidup berlalu tanpa jejak digital yang berkesan. Ambil slot Anda sekarang.</p>
            <a
              href={campaign.ctaHref || `/campaign/${campaign.slug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 font-headline text-lg font-bold !text-on-secondary transition hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined">message</span>
              {campaign.ctaLabel}
            </a>
          </div>
        </section>
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
