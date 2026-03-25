import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type ServicesSectionProps = {
  services: HomeContent["services"];
};

const waysToWork = [
  {
    title: "Consultation First",
    description: "Mulai dari konsultasi kebutuhan dan prioritas implementasi.",
  },
  {
    title: "Entry Package",
    description: "Paket awal website atau chatbot untuk validasi cepat.",
  },
  {
    title: "Custom Build",
    description: "Scope strategis untuk sistem, integrasi, dan automasi lanjutan.",
  },
];

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="layanan" className="relative w-full overflow-hidden bg-[#F5EEDC] pb-24 md:pb-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#efe4cc]/65" />
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="rounded-[2rem] border border-[rgba(29,90,141,0.08)] bg-[#EFE4CC] px-6 py-12 shadow-[0_18px_46px_rgba(36,47,58,0.08)] backdrop-blur-sm md:px-8 md:py-14 lg:px-10">
          <Reveal y={20} duration={0.42}>
            <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 font-label text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  {services.eyebrow}
                </div>
                <h2 className="font-headline text-5xl text-primary">
                  {services.headingA} <span className="serif-italic">{services.headingEmphasis}</span>.
                </h2>
              </div>
              <div className="max-w-sm font-body text-[#42505a] md:text-right">{services.description}</div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Reveal y={20} delay={0.05} duration={0.38} className="md:col-span-2">
              <div className="group flex h-full flex-col justify-between rounded-3xl border border-[rgba(29,90,141,0.08)] bg-[#FBF7EE] p-10 transition-all duration-500 hover:border-secondary/35 hover:shadow-[0_14px_32px_rgba(31,48,62,0.09)]">
                <div>
                  <span className="material-symbols-outlined mb-6 text-4xl text-primary">web</span>
                  <h3 className="mb-4 font-headline text-3xl text-primary">Website & Landing Pages</h3>
                  <p className="max-w-md text-[#42505a]">
                    Website bisnis dan landing page yang membantu tim menjelaskan value, membangun kredibilitas,
                    dan meningkatkan konversi.
                  </p>
                </div>
                <div className="mt-12 flex items-center gap-4">
                  {"Company Profile,Landing Page,Website Revamp".split(",").map((tag) => (
                    <span key={tag} className="rounded-full border border-[rgba(29,90,141,0.1)] bg-[#F2ECE0] px-4 py-1 text-xs font-bold text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal y={20} delay={0.1} duration={0.38}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-[rgba(29,90,141,0.2)] bg-primary p-10 text-white shadow-[0_14px_34px_rgba(29,90,141,0.22)]">
                <div className="relative z-10">
                  <span className="material-symbols-outlined mb-6 text-4xl text-secondary-container">smart_toy</span>
                  <h3 className="mb-4 font-headline text-3xl">AI-Assisted Workflows</h3>
                  <p className="text-white/82">
                    Chatbot, automation, dan workflow AI yang disesuaikan dengan SOP tim agar respon lebih
                    cepat dan proses lebih konsisten.
                  </p>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-10 transition-opacity group-hover:opacity-20">
                  <span className="material-symbols-outlined text-[12rem]">blur_on</span>
                </div>
              </div>
            </Reveal>

            <Reveal y={20} delay={0.16} duration={0.38}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-[rgba(126,75,0,0.14)] bg-[#F8F1E3] p-10 shadow-[0_8px_18px_rgba(70,54,31,0.06)]">
                <div>
                  <span className="material-symbols-outlined mb-6 text-4xl text-[#7E4B00]">dynamic_form</span>
                  <h3 className="mb-4 font-headline text-3xl text-[#7E4B00]">Integrations & Custom Solutions</h3>
                  <p className="text-[#4a535c]">
                    Hubungkan tools yang sudah Anda pakai sekarang, lalu bangun solusi custom untuk bottleneck
                    operasional yang paling penting.
                  </p>
                </div>
                <a
                  href="#kontak"
                  className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7E4B00] transition-all hover:gap-4 hover:text-[#6b3f00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F1E3]"
                >
                  Pelajari Selengkapnya
                  <span className="material-symbols-outlined text-sm text-[#7E4B00]">arrow_forward</span>
                </a>
              </div>
            </Reveal>

            <Reveal y={20} delay={0.22} duration={0.38} className="md:col-span-2">
              <div className="group flex h-full items-center gap-12 rounded-3xl border border-[rgba(29,90,141,0.08)] bg-[#FBF7EE] p-10 shadow-[0_10px_24px_rgba(35,46,58,0.06)]">
                <div className="relative hidden h-48 w-48 overflow-hidden rounded-2xl border border-[rgba(29,90,141,0.08)] bg-[#F2ECE0] grayscale transition-all duration-700 group-hover:grayscale-0 md:block">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiANUXTFiidGTU_jHxwKYAxYa3QvfMGGFfYJOcm3Yum8h_ya-lg23dukCtlbVu0i3OuqTUsfETZf2jYyM7ELzAlRVQyI-TTLBaG7hKXv6eOLcqTi8AQNOo4oIhMnsdn_DuEnmjYQKDXdpvlmI6S_MSqz4aQE0FJHJZbGg4E5SeW9RzKdp2-a0qN4ickoMYfxhtodxDjpVeapet2f3vtZlgnS73wI6OOknE_EEEiRFah-mT_Ty3sFvXD82-9QC5Qxics8Jz2SV0m6Y"
                    alt="Custom Solution"
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-4 font-headline text-3xl text-primary">Konsultasi Strategis</h3>
                  <p className="text-[#42505a]">
                    Mulai dari sesi konsultasi untuk memetakan opsi solusi, timeline implementasi, dan prioritas
                    scope yang paling relevan dengan target bisnis Anda.
                  </p>
                  <div className="mt-6 flex gap-4">
                    <span className="text-sm font-bold text-secondary">CTO as a Service</span>
                    <span className="text-sm font-bold text-secondary/50">•</span>
                    <span className="text-sm font-bold text-secondary">Tech Audit</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
            {waysToWork.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[rgba(29,90,141,0.1)] bg-[#FBF7EE] p-5">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary">Ways to Work</p>
                <h4 className="mb-1 font-headline text-2xl text-primary">{item.title}</h4>
                <p className="text-sm text-[#42505a]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
