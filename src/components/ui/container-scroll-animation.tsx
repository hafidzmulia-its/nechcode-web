"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ContainerScrollProps = {
  titleComponent: ReactNode;
  children: ReactNode;
};

export function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth <= 768);
    }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const total = rect.height + windowH;
      const scrolled = windowH - rect.top;
      setProgress(Math.min(1, Math.max(0, scrolled / total)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rotate = 18 - progress * 18;
  const scale = isMobile
    ? 0.9 + progress * 0.1
    : 1.06 - progress * 0.06;
  const translateY = -progress * 96;

  return (
    <div ref={containerRef} className="relative flex min-h-[52rem] items-center justify-center p-2 md:min-h-[72rem] md:p-16">
      <div className="relative w-full py-10 md:py-24" style={{ perspective: "1000px" }}>
        {/* Header */}
        <div
          className="mx-auto mb-8 max-w-5xl text-center md:mb-10"
          style={{
            transform: `translateY(${translateY}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          {titleComponent}
        </div>

        {/* Card */}
        <div
          style={{
            transform: `rotateX(${rotate}deg) scale(${scale})`,
            boxShadow:
              "0 0 #0000004d, 0 10px 20px #0000003a, 0 35px 38px #0000002a, 0 76px 55px #0000001a, 0 122px 70px #0000000f",
            transition: "transform 0.1s linear",
          }}
          className="mx-auto w-full max-w-6xl rounded-[2rem] border-4 border-[#6b6b6b] bg-[#262626] p-2 md:rounded-[2.2rem] md:p-5"
        >
          <div className="mb-3 flex items-center justify-between rounded-xl border border-white/10 bg-[#313131] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 md:px-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/35" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/12" />
            </div>
            <span>NechCode Works</span>
          </div>
          <div className="h-[34rem] w-full overflow-hidden rounded-2xl bg-surface-container-lowest p-3 md:h-[46rem] md:p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
