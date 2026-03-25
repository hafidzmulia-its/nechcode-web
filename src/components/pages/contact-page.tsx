import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/shared/reveal";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import type { HomeContent } from "@/content/home";

type ContactPageProps = {
  content: HomeContent;
};

export function ContactPage({ content }: ContactPageProps) {
  return (
    <div className="selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar brand={content.brand} nav={content.nav} cta={content.headerCta} />

      <main className="pb-20">
        <section className="w-full bg-surface py-20">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={18} className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Contact</p>
              <h1 className="font-headline text-5xl leading-tight text-primary md:text-7xl">
                Let&apos;s Build Something <span className="serif-italic">Useful</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-on-surface-variant">
                Ceritakan konteks bisnis Anda. Kami akan bantu memetakan kebutuhan, opsi solusi, dan langkah implementasi paling realistis.
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
                  <p>Email: <a className="font-semibold text-primary underline underline-offset-4" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
                  <p>WhatsApp: <a className="font-semibold text-primary underline underline-offset-4" href={siteConfig.whatsapp} target="_blank" rel="noreferrer">Start Chat</a></p>
                  <p>Domain: {siteConfig.domain}</p>
                </div>
              </div>
            </Reveal>

            <Reveal y={16} delay={0.06}>
              <form className="rounded-[1.8rem] border border-outline-variant/20 bg-surface-container-lowest p-7 shadow-[0_10px_24px_rgba(24,34,45,0.06)]">
                <h2 className="mb-4 font-headline text-3xl text-primary">Brief Form</h2>
                <div className="space-y-3">
                  <input type="text" placeholder="Nama" className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  <input type="email" placeholder="Email" className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  <input type="text" placeholder="Jenis Proyek (Website, System, Automation)" className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  <textarea placeholder="Jelaskan kebutuhan Anda secara singkat" rows={5} className="w-full rounded-xl border border-outline-variant/35 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Project Brief NechCode")}`}
                  className="mt-5 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Kirim via Email
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
