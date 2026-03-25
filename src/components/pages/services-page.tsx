import { Reveal } from "@/components/shared/reveal";
import { SiteFooter } from "@/components/sections/home/site-footer";
import { TopNavbar } from "@/components/sections/home/top-navbar";
import type { HomeContent } from "@/content/home";

type ServicesPageProps = {
  content: HomeContent;
};

const coreServices = [
  {
    title: "Website & Landing Pages",
    description:
      "Website bisnis dan landing page editorial-clean yang fokus pada kejelasan pesan, kredibilitas, dan konversi.",
    bullets: ["Brand-aligned UI", "Performance-first", "SEO baseline"],
  },
  {
    title: "Business Systems & Internal Tools",
    description:
      "Dashboard dan tools internal untuk merapikan alur operasional tim agar keputusan lebih cepat dan berbasis data.",
    bullets: ["Admin panel", "Role-based access", "Operational reporting"],
  },
  {
    title: "AI-Assisted Workflows",
    description:
      "Workflow AI, chatbot, dan automasi proses yang membantu tim merespons lebih cepat dan konsisten.",
    bullets: ["Prompt workflow", "Knowledge routing", "Human-in-the-loop"],
  },
  {
    title: "Integrations & Custom Solutions",
    description:
      "Integrasi lintas tools dan pengembangan solusi custom untuk kebutuhan operasional yang tidak bisa diselesaikan template umum.",
    bullets: ["Payment/CRM integration", "Automation bridge", "Maintenance support"],
  },
];

const waysToWork = [
  {
    title: "Consultation First",
    description: "Sesi konsultasi untuk memetakan prioritas, risiko, dan urutan implementasi paling efisien.",
  },
  {
    title: "Entry Package",
    description: "Paket awal untuk website atau chatbot sebagai langkah cepat sebelum scale-up.",
  },
  {
    title: "Strategic Custom Build",
    description: "Scope end-to-end untuk sistem, integrasi, dan automation yang disesuaikan konteks bisnis.",
  },
];

const problemsSolved = [
  "Proses manual berulang yang membebani tim",
  "Website ada tapi tidak menggerakkan bisnis",
  "Data bisnis tersebar dan sulit dipakai",
  "Sistem lama sulit di-scale",
];

export function ServicesPage({ content }: ServicesPageProps) {
  return (
    <div className="selection:bg-secondary-container selection:text-on-secondary-container">
      <TopNavbar brand={content.brand} nav={content.nav} cta={content.headerCta} />

      <main className="pb-20">
        <section className="w-full bg-surface">
          <div className="mx-auto w-full max-w-[1360px] px-6 py-20 md:px-8 lg:px-10 xl:px-12">
            <Reveal once y={18} className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Services</p>
              <h1 className="font-headline text-5xl leading-tight text-primary md:text-7xl">
                Solusi Digital untuk <span className="serif-italic">Operasional dan Pertumbuhan</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-on-surface-variant">
                NechCode membantu bisnis, UMKM, organisasi, dan institusi membangun fondasi digital yang dapat dipakai tim sehari-hari dan siap dikembangkan bertahap.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="w-full bg-gradient-to-b from-surface-container-low/60 to-surface py-10 md:py-16">
          <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-6 px-6 md:grid-cols-2 md:px-8 lg:px-10 xl:px-12">
            {coreServices.map((service, index) => (
              <Reveal key={service.title} y={16} delay={index * 0.04} duration={0.34} className="h-full">
                <article className="h-full rounded-[1.8rem] border border-outline-variant/20 bg-surface-container-lowest p-7 shadow-[0_10px_24px_rgba(24,34,45,0.06)]">
                  <h2 className="mb-3 font-headline text-3xl text-primary">{service.title}</h2>
                  <p className="mb-5 text-sm leading-relaxed text-on-surface-variant">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.bullets.map((bullet) => (
                      <span key={bullet} className="rounded-full bg-surface-container px-3 py-1 text-xs font-semibold text-primary">
                        {bullet}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="w-full bg-surface py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
            <div className="grid gap-10 rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-8 md:grid-cols-2 md:p-10">
              <Reveal y={16}>
                <h3 className="mb-4 font-headline text-4xl text-primary">Masalah yang Kami Selesaikan</h3>
                <ul className="space-y-3 text-on-surface-variant">
                  {problemsSolved.map((problem) => (
                    <li key={problem} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal y={16} delay={0.08}>
                <h3 className="mb-4 font-headline text-4xl text-primary">Pendekatan Kerja</h3>
                <p className="mb-6 text-on-surface-variant">
                  Discovery singkat, prioritas yang jelas, iterasi mingguan, dan keputusan teknis yang transparan.
                </p>
                <a
                  href={content.headerCta.href}
                  target={content.headerCta.external ? "_blank" : undefined}
                  rel={content.headerCta.external ? "noreferrer" : undefined}
                  className="inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold !text-white visited:!text-white hover:!text-white transition hover:opacity-90"
                >
                  Diskusikan Kebutuhan
                </a>
              </Reveal>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {waysToWork.map((item, index) => (
                <Reveal key={item.title} y={14} delay={index * 0.04} duration={0.3}>
                  <article className="rounded-[1.25rem] border border-outline-variant/20 bg-surface-container-lowest p-6">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Ways to Work</p>
                    <h4 className="mb-2 font-headline text-2xl text-primary">{item.title}</h4>
                    <p className="text-sm text-on-surface-variant">{item.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter brand={content.brand} footer={content.footer} />
    </div>
  );
}
