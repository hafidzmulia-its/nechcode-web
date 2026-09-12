type SmoothScrollOptions = {
  duration?: number;
  offset?: number;
};

let cancelActiveScroll: (() => void) | null = null;

export function smoothScrollToElement(
  element: HTMLElement,
  { duration = 850, offset = 0 }: SmoothScrollOptions = {},
) {
  cancelActiveScroll?.();

  const startY = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;
  const targetY = Math.min(
    Math.max(0, element.getBoundingClientRect().top + startY - offset),
    Math.max(0, documentHeight - window.innerHeight),
  );
  const distance = targetY - startY;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion || Math.abs(distance) < 1) {
    window.scrollTo(0, targetY);
    return;
  }

  let animationFrame = 0;
  let startTime: number | null = null;

  const interruptKeys = new Set([
    "ArrowDown",
    "ArrowUp",
    "End",
    "Home",
    "PageDown",
    "PageUp",
    " ",
  ]);

  function cleanup() {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", handleKeyDown);
    if (cancelActiveScroll === cancel) cancelActiveScroll = null;
  }

  function cancel() {
    window.cancelAnimationFrame(animationFrame);
    cleanup();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (interruptKeys.has(event.key)) cancel();
  }

  function step(timestamp: number) {
    startTime ??= timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const easedProgress =
      progress < 0.5
        ? 4 * progress ** 3
        : 1 - ((-2 * progress + 2) ** 3) / 2;

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      animationFrame = window.requestAnimationFrame(step);
    } else {
      cleanup();
    }
  }

  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", handleKeyDown);
  cancelActiveScroll = cancel;
  animationFrame = window.requestAnimationFrame(step);
}
