import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import type { HomeContent } from "@/content/home";

type PrincipleSectionProps = {
  services: HomeContent["services"];
};

const principleCards = [
  {
    title: "Practical Over Hype",
    description:
      "We prioritize solutions that teams use daily and have real operational impact.",
    icon: "/img/asset_clock.png",
    titleClassName: "max-w-[10ch]",
  },
  {
    title: "Founder-Level Ownership",
    description:
      "Product direction, architecture, and execution are kept hands-on to keep decisions consistent.",
    icon: "/img/asset_centang.png",
    titleClassName: "max-w-[13ch]",
  },
  {
    title: "Clear Communication",
    description:
      "Weekly updates are made concise and can be understood by business and technical teams.",
    icon: "/img/asset_hand.png",
    titleClassName: "max-w-[13ch]",
  },
  {
    title: "Long-Term Thinking",
    description:
      "We design systems with maintainability, extensibility, and future operational needs in mind.",
    icon: "/img/asset_thinking.png",
    titleClassName: "max-w-[10ch]",
  },
] as const;

export function PrincipleSection({ services }: PrincipleSectionProps) {
  return (
    <section
      id="principles"
      className="relative w-full overflow-hidden bg-white py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1296px] px-6 md:px-8 lg:px-0">
        <Reveal y={20} duration={0.42} once={false}>
          <div className="mx-auto mb-16 max-w-5xl text-center">
            <p className="font-body text-[20px] font-normal text-black">
              {services.eyebrow || "Our Principles"}
            </p>
            <h2 className="mx-auto mt-6 max-w-[34ch] text-center font-sans text-[clamp(1.85rem,2.5vw,2.35rem)] font-normal uppercase leading-[1.35] tracking-[0.03em] text-black">
              THE WAY WE WORK WITH YOU TO CREATE
              <br />
              THE PERFECT PRODUCT
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {principleCards.map((card, index) => (
            <Reveal
              key={card.title}
              y={22}
              delay={index * 0.06}
              duration={0.4}
              once={false}
            >
              <div className="relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[9px] px-7 py-6 shadow-[0_14px_40px_rgba(7,18,26,0.16)] lg:min-h-[25rem]">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/img/asset_card.png"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>

                <Image
                  src={card.icon}
                  alt=""
                  width={58}
                  height={58}
                  className="relative z-10 h-[3.6rem] w-[3.6rem] object-contain"
                />

                <h3
                  className={`relative z-10 mt-6 text-balance font-body text-[22px] font-medium leading-[1.18] tracking-[-0.02em] text-transparent ${card.titleClassName}`}
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #FFFFFF 0%, #BAF2FF 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  {card.title}
                </h3>

                <div className="relative z-10 mt-5 h-[2px] w-[7.5rem] bg-white" />

                <p className="relative z-10 mt-6 max-w-[18ch] text-pretty font-body text-[16px] font-normal leading-[1.5] text-white">
                  {card.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
