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
  duration = 0.65,
  y = 18,
  x = 0,
  amount = 0.12,
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

    let frameId: number | null = null;
    const updatePhase = (nextPhase: Phase) => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        setPhase(nextPhase);
        frameId = null;
      });
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // No observer support or reduced motion → stay visible.
    if (
      prefersReducedMotion ||
      typeof IntersectionObserver === "undefined"
    ) {
      updatePhase("visible");
      return () => {
        if (frameId !== null) {
          window.cancelAnimationFrame(frameId);
        }
      };
    }

    // Check if the element is already within the viewport on mount.
    // If so, skip the hidden->visible animation (it would look like a flicker).
    const rect = node.getBoundingClientRect();
    const isAlreadyInView =
      rect.top < window.innerHeight && rect.bottom > 0;

    if (isAlreadyInView) {
      updatePhase("visible");
      if (once) {
        return () => {
          if (frameId !== null) {
            window.cancelAnimationFrame(frameId);
          }
        };
      }
    } else {
      updatePhase("hidden");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            updatePhase("visible");
            if (once) observer.disconnect();
          } else if (!once) {
            updatePhase("hidden");
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: amount },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
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
        : `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
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
