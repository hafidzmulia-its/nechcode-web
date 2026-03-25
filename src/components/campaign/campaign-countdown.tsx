"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type CountdownMode =
  | "days-hours"
  | "days-hours-minutes"
  | "hours-minutes-seconds"
  | "flip-hours-minutes-seconds";

type CampaignCountdownProps = {
  remainingMs: number;
  mode: CountdownMode;
  compact?: boolean;
  forceShowSeconds?: boolean;
};

function toParts(remainingMs: number) {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function countdownItems(mode: CountdownMode, parts: ReturnType<typeof toParts>, forceShowSeconds: boolean) {
  if (forceShowSeconds && (mode === "days-hours" || mode === "days-hours-minutes")) {
    return [
      { label: "Hari", value: parts.days },
      { label: "Jam", value: parts.hours },
      { label: "Menit", value: parts.minutes },
      { label: "Detik", value: parts.seconds },
    ];
  }

  if (mode === "days-hours") {
    return [
      { label: "Hari", value: parts.days },
      { label: "Jam", value: parts.hours },
    ];
  }

  if (mode === "days-hours-minutes") {
    return [
      { label: "Hari", value: parts.days },
      { label: "Jam", value: parts.hours },
      { label: "Menit", value: parts.minutes },
    ];
  }

  return [
    { label: "Jam", value: parts.days * 24 + parts.hours },
    { label: "Menit", value: parts.minutes },
    { label: "Detik", value: parts.seconds },
  ];
}

export function CampaignCountdown({ remainingMs, mode, compact = false, forceShowSeconds = false }: CampaignCountdownProps) {
  const items = countdownItems(mode, toParts(remainingMs), forceShowSeconds);
  const flipStyle = mode === "flip-hours-minutes-seconds";

  return (
    <div className={cn("flex items-center gap-2", compact ? "text-xs" : "text-sm")} aria-live="polite">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <motion.div
            key={`${item.label}-${item.value}`}
            initial={{ y: flipStyle ? 10 : 0, opacity: 0.55 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "rounded-lg border border-primary/15 bg-white/85 px-2.5 py-1 text-center tabular-nums",
              compact ? "min-w-[42px]" : "min-w-[58px]",
              flipStyle ? "shadow-[inset_0_-2px_0_rgba(29,90,141,0.1)]" : "",
            )}
          >
            <p suppressHydrationWarning className={cn("font-headline leading-none text-primary", compact ? "text-lg" : "text-2xl")}>{String(item.value).padStart(2, "0")}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-on-surface-variant/80">{item.label}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
