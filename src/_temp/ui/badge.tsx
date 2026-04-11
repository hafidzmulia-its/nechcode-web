import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
  {
    variants: {
      variant: {
        default:
          "border-[color:var(--color-border)] bg-white/72 text-[color:var(--color-ink-soft)]",
        accent:
          "border-transparent bg-[color:var(--color-accent-soft)] text-[color:var(--color-brand)]",
        warm: "border-transparent bg-[color:var(--color-earth-soft)] text-[color:var(--color-earth)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
