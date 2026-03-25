import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-background)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[color:var(--color-brand)] text-white shadow-[0_18px_40px_rgba(29,90,141,0.24)] hover:-translate-y-0.5 hover:bg-[#174a75]",
        secondary:
          "bg-white/88 text-[color:var(--color-ink)] shadow-[0_12px_28px_rgba(17,38,58,0.12)] hover:-translate-y-0.5 hover:bg-white",
        outline:
          "border border-[color:var(--color-border)] bg-transparent text-[color:var(--color-ink)] hover:bg-white/55",
        ghost:
          "text-[color:var(--color-ink-soft)] hover:bg-white/45 hover:text-[color:var(--color-ink)]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs uppercase tracking-[0.18em]",
        lg: "h-12 px-6 text-sm",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
