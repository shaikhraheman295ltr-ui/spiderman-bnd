"use client";

import { useRef, useEffect, lazy, Suspense } from "react";
import { gsap } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/utils";

const ThreeSpiderSuit = lazy(() => import("@/components/ThreeSpiderSuit"));

const SUIT_STAGES = [
  { label: "Classic Suit", year: "2016", desc: "The beginning. Homemade. Raw potential." },
  { label: "Iron Spider", year: "2018", desc: "Tony Stark's gift. Nanotech. Global threat." },
  { label: "Upgraded Suit", year: "2019", desc: "Far From Home. Stealth. Red & Black." },
  { label: "Brand New Suit", year: "2026", desc: "Forgotten by all. Reborn in darkness." },
];

export default function SuitSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const items = itemsRef.current.filter(Boolean);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          pin: true,
          start: "top top",
          end: "+=400%",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      items.forEach((item, i) => {
        if (!item) return;
        const prev = items[i - 1];
        if (prev) {
          tl.to(prev, { opacity: 0, scale: 0.8, duration: 0.5 }, "+=0.3");
        }
        tl.fromTo(
          item,
          { opacity: 0, y: 80, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.2"
        );
        tl.to({}, { duration: 1.5 });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="suit"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-background overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ThreeSpiderSuit />
        </Suspense>
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10">
        <SectionLabel className="text-center">Suit Evolution</SectionLabel>
      </div>

      <div className="absolute inset-0 z-content flex items-center justify-center pointer-events-none">
        {SUIT_STAGES.map((stage, i) => (
          <div
            key={stage.label}
            ref={(el) => { itemsRef.current[i] = el; }}
            className="absolute text-center max-w-lg px-6"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <span className="font-mono text-xs text-red tracking-[0.3em] uppercase">
              {stage.year}
            </span>
            <h2 className="font-display text-5xl md:text-7xl text-white mt-2 tracking-wider">
              {stage.label}
            </h2>
            <p className="font-editorial italic text-lg text-muted mt-4">
              {stage.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
