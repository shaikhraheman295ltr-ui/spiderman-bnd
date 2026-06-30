"use client";

import { useRef, useEffect, lazy, Suspense } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/utils";

const ThreeSpine = lazy(() => import("@/components/ThreeSpine"));

const QUOTES = [
  {
    text: "The world may have forgotten Peter Parker. But he hasn't forgotten them.",
  },
  {
    text: "When you're invisible, you see the truth. When you're forgotten, you remember what matters.",
  },
  {
    text: "A hero doesn't need the world to remember. A hero remembers the world.",
  },
];

export default function SpineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const overlay = overlayRef.current;
    const quote = quoteRef.current;
    if (!el || !overlay || !quote) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const quoteItems = quote.querySelectorAll<HTMLDivElement>(".quote-item");

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;

          quoteItems.forEach((item, i) => {
            const start = i * 0.33;
            const end = start + 0.33;
            const mid = (start + end) / 2;
            const dist = Math.abs(progress - mid);
            const opacity = dist < 0.15 ? 1 - dist / 0.15 : 0;
            item.style.opacity = String(Math.max(0, opacity));
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="spine"
      ref={sectionRef}
      className="relative w-full h-[300vh] bg-background overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <ThreeSpine />
          </Suspense>
        </div>

        <div
          ref={overlayRef}
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,15,0.6) 100%)",
          }}
        />

        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10">
          <SectionLabel className="text-center">The Hero Within</SectionLabel>
        </div>

        <div
          ref={quoteRef}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
          {QUOTES.map((q, i) => (
            <div
              key={i}
              className="quote-item absolute text-center max-w-3xl px-6"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <p className="font-editorial italic text-2xl md:text-4xl lg:text-5xl text-white leading-relaxed">
                &ldquo;{q.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex gap-2">
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              Scroll to reveal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
