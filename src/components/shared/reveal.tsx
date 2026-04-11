"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  amount?: number;
  once?: boolean;
};

type Phase = "initial" | "hidden" | "visible";

export function Reveal({
  children,
  className,
  style,
  delay = 0,
  duration = 0.45,
  y = 28,
  x = 0,
  amount = 0.2,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  // "initial" = SSR/pre-mount, render visible (no hydration mismatch)
  // "hidden"  = post-mount, element not yet intersected
  // "visible" = element intersected and animated in
  const [phase, setPhase] = useState<Phase>("initial");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No IO support → stay visible.
    if (typeof IntersectionObserver === "undefined") {
      setPhase("visible");
      return;
    }

    // Check if the element is already within the viewport on mount.
    // If so, skip the hidden->visible animation (it would look like a flicker).
    const rect = node.getBoundingClientRect();
    const isAlreadyInView =
      rect.top < window.innerHeight && rect.bottom > 0;

    if (isAlreadyInView) {
      setPhase("visible");
      if (once) return;
    } else {
      setPhase("hidden");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPhase("visible");
            if (once) observer.disconnect();
          } else if (!once) {
            setPhase("hidden");
          }
        }
      },
      { threshold: amount },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [amount, once]);

  const isHidden = phase === "hidden";

  const baseTransform = isHidden
    ? `translate3d(${x}px, ${y}px, 0)`
    : "translate3d(0, 0, 0)";

  const combinedStyle: CSSProperties = {
    ...style,
    opacity: isHidden ? 0 : 1,
    transform: style?.transform
      ? `${baseTransform} ${style.transform}`
      : baseTransform,
    transition:
      phase === "initial"
        ? style?.transition
        : `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    willChange: phase === "visible" ? "auto" : "opacity, transform",
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={combinedStyle}
    >
      {children}
    </div>
  );
}
