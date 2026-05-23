"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/shared/reveal";
import { layoutContainer } from "@/config/layout";
import { buildGmailComposeUrl, siteConfig } from "@/config/site";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";

export function ConsultSection() {
  const [briefForm, setBriefForm] = useState({
    name: "",
    email: "",
    projectType: "",
    brief: "",
  });

  const whatsappLink = buildWhatsAppInquiryUrl({
    sourcePage: "Home Consult Section",
    serviceInterest: "Consultation via WhatsApp",
  });

  const briefWhatsappLink = useMemo(
    () =>
      buildWhatsAppInquiryUrl({
        sourcePage: "Home Consult Section - Brief Form",
        name: briefForm.name,
        serviceInterest: briefForm.projectType || "Project brief",
        packageInterest: briefForm.projectType,
        mainNeed: briefForm.brief,
        additionalNote: briefForm.email
          ? `Email contact: ${briefForm.email}`
          : undefined,
      }),
    [briefForm],
  );

  const briefMailtoLink = useMemo(() => {
    const lines: string[] = [];
    if (briefForm.name) lines.push(`Name: ${briefForm.name}`);
    if (briefForm.email) lines.push(`Email: ${briefForm.email}`);
    if (briefForm.projectType)
      lines.push(`Project Type: ${briefForm.projectType}`);
    if (briefForm.brief) lines.push(`\nRequirement:\n${briefForm.brief}`);
    return buildGmailComposeUrl("Project Brief NechCode", lines.join("\n"));
  }, [briefForm]);

  return (
    <section
      id="consult"
      className="relative overflow-hidden bg-[#05131D] py-16 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0">
        <Image
          src="/img/bg_consult.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_10%,rgba(31,94,135,0.28)_0%,rgba(7,22,33,0.1)_42%,rgba(2,8,12,0.82)_100%)]" />

      <div className={`relative z-10 ${layoutContainer}`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(520px,0.96fr)] lg:items-start lg:gap-14">
          <Reveal y={18} duration={0.42} once={false}>
            <div className="max-w-[41rem] pt-2">
              <h2
                className="max-w-full font-sans text-[44px] font-normal uppercase leading-[1.18] tracking-[-0.02em] text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #FFFFFF 0%, #78C5F1 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                <span className="block whitespace-nowrap">CONSULT YOUR PROJECT WITH</span>
                <span className="block whitespace-nowrap">CLEAR DIRECTION</span>
              </h2>

              <p className="mt-8 max-w-[30ch] font-body text-[20px] font-light leading-[1.55] text-white">
                Share your business context, timeline targets and priorities.
                We will help map out the most realistic solution options from
                the initial stages to implementation.
              </p>

              <div className="mt-14 border border-[rgba(255,255,255,0.72)] bg-[rgba(6,22,32,0.34)] px-7 py-8 backdrop-blur-[1px] sm:px-10 sm:py-10">
                <h3 className="font-sans text-[clamp(1.8rem,2.5vw,2.5rem)] font-normal uppercase leading-[1.15] text-white">
                  Direct Channel
                </h3>

                <div className="mt-8 space-y-4">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[3.6rem] w-full items-center justify-center rounded-[10px] bg-white px-6 py-3 text-center font-body text-[clamp(1rem,1.05vw,1.2rem)] font-normal !text-[#1C1C1C] visited:!text-[#1C1C1C] hover:!text-[#1C1C1C] transition hover:opacity-92"
                  >
                    Consultation via WhatsApp ({siteConfig.whatsappDisplayName})
                  </a>

                  <a
                    href={briefMailtoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[3.6rem] w-full items-center justify-center rounded-[10px] border border-[rgba(255,255,255,0.9)] bg-transparent px-6 py-3 text-center font-body text-[clamp(1rem,1.05vw,1.2rem)] font-normal !text-white visited:!text-white hover:!text-white transition hover:bg-white/8"
                  >
                    <span className="!text-white">Send Brief via Email</span>
                    <span
                      aria-hidden="true"
                      className="ml-4 text-[1.9rem] leading-none !text-white"
                    >
                      →
                    </span>
                  </a>
                </div>

                <p className="mt-8 max-w-[31ch] font-body text-[clamp(1rem,1.05vw,1.16rem)] font-light leading-[1.55] text-white">
                  Initial response is generally within 1x24 working hours. If
                  your need is urgent, type &quot;URGENT&quot; at the
                  beginning of the message.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal y={18} delay={0.06} duration={0.42} once={false}>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="border border-[rgba(255,255,255,0.72)] bg-[rgba(8,23,34,0.3)] px-7 py-8 backdrop-blur-[1px] sm:px-11 sm:py-10"
            >
              <h3 className="max-w-[18ch] font-sans text-[clamp(1.8rem,2.5vw,2.7rem)] font-normal uppercase leading-[1.38] text-white">
                WE LISTEN TO EVERYTHING: START BY EXPLAINING YOUR NEEDS TO US
              </h3>

              <div className="mt-10 space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={briefForm.name}
                  onChange={(event) =>
                    setBriefForm((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  className="h-[3.55rem] w-full border border-transparent bg-[rgba(64,83,96,0.52)] px-4 font-body text-[1.08rem] font-light text-white placeholder:text-[rgba(255,255,255,0.4)] outline-none transition focus:border-[#1592FF] focus:ring-2 focus:ring-[#1592FF]/35"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={briefForm.email}
                  onChange={(event) =>
                    setBriefForm((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  className="h-[3.55rem] w-full border border-transparent bg-[rgba(64,83,96,0.52)] px-4 font-body text-[1.08rem] font-light text-white placeholder:text-[rgba(255,255,255,0.4)] outline-none transition focus:border-[#1592FF] focus:ring-2 focus:ring-[#1592FF]/35"
                />
                <input
                  type="text"
                  placeholder="Project Type (e.g. Mobile Apps, etc.)"
                  value={briefForm.projectType}
                  onChange={(event) =>
                    setBriefForm((prev) => ({
                      ...prev,
                      projectType: event.target.value,
                    }))
                  }
                  className="h-[3.55rem] w-full border border-transparent bg-[rgba(64,83,96,0.52)] px-4 font-body text-[1.08rem] font-light text-white placeholder:text-[rgba(255,255,255,0.4)] outline-none transition focus:border-[#1592FF] focus:ring-2 focus:ring-[#1592FF]/35"
                />
                <textarea
                  rows={5}
                  placeholder="Describe Your Requirement"
                  value={briefForm.brief}
                  onChange={(event) =>
                    setBriefForm((prev) => ({
                      ...prev,
                      brief: event.target.value,
                    }))
                  }
                  className="min-h-[8.4rem] w-full resize-none border border-transparent bg-[rgba(64,83,96,0.52)] px-4 py-4 font-body text-[1.08rem] font-light text-white placeholder:text-[rgba(255,255,255,0.4)] outline-none transition focus:border-[#1592FF] focus:ring-2 focus:ring-[#1592FF]/35"
                />
              </div>

              <a
                href={briefWhatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex min-h-[3.8rem] items-center justify-center rounded-[10px] bg-white px-8 py-3 font-body text-[clamp(1rem,1.05vw,1.18rem)] font-normal !text-[#1C1C1C] visited:!text-[#1C1C1C] hover:!text-[#1C1C1C] transition hover:opacity-92"
              >
                <span className="!text-[#1C1C1C]">Send Brief via Whatsapp</span>
                <span aria-hidden="true" className="ml-4 text-[1.8rem] text-[#2B7BC1]">
                  →
                </span>
              </a>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
