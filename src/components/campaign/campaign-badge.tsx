import { cn } from "@/lib/utils";

type CampaignBadgeProps = {
  children: string;
  variant?: "default" | "strong";
};

export function CampaignBadge({ children, variant = "default" }: CampaignBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
        variant === "strong"
          ? "border-secondary/40 bg-secondary/15 text-primary"
          : "border-primary/20 bg-white/75 text-primary",
      )}
    >
      {children}
    </span>
  );
}
