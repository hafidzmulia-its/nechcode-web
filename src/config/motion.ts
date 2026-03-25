import type { Transition, Variants } from "framer-motion";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const revealViewport = {
  once: true,
  amount: 0.2,
} as const;

export const revealTransition: Transition = {
  duration: 0.7,
  ease: motionEase,
};

export const subtleTransition: Transition = {
  duration: 0.5,
  ease: motionEase,
};

export const hoverLiftTransition: Transition = {
  duration: 0.45,
  ease: motionEase,
};

export function createRevealVariants(offset = 28): Variants {
  return {
    hidden: { opacity: 0, y: offset },
    visible: { opacity: 1, y: 0 },
  };
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export function createFadeUpVariant(offset = 22): Variants {
  return {
    hidden: { opacity: 0, y: offset },
    visible: { opacity: 1, y: 0 },
  };
}

export const floatingTransition: Transition = {
  duration: 7.2,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "mirror",
  ease: "easeInOut",
};
