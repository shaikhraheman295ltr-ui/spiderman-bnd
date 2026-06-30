"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/utils";

const SYNOPSIS_TEXT =
  "The world has forgotten Peter Parker. The spell erased every memory, every connection, every trace of Spider-Man from existence. Now he walks alone through New York, a ghost in the city that raised him. But darkness is rising. Ancient forces gather. And when the city needs him most, a hero must decide: remain invisible, or become the symbol they've forgotten. Spider-Man rises. A Brand New Day begins.";

export default function SynopsisSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const textEl = textRef.current;
    if (!el || !textEl) return;

    if (prefersReducedMotion()) {
      const words = textEl.querySelectorAll<HTMLSpanElement>(".word");
      words.forEach((w) => (w.style.opacity = "1"));
      return;
    }

    const ctx = gsap.context(() => {
      const words = textEl.querySelectorAll<HTMLSpanElement>(".word");
      gsap.fromTo(
        words,
        { opacity: 0, y: 40, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            pin: true,
            start: "top top",
            end: "+=300%",
            scrub: 2,
            invalidateOnRefresh: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="synopsis"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-background flex items-center justify-center overflow-hidden snap-start"
    >
      <div className="absolute inset-0 bg-gradient-radial from-red/5 via-transparent to-transparent opacity-30" />

      <div className="relative z-content max-w-5xl mx-auto px-6 py-32">
        <SectionLabel className="block text-center mb-8">
          Story
        </SectionLabel>

        <div ref={textRef} className="text-center">
          <p className="text-lg md:text-2xl lg:text-3xl font-editorial text-white leading-relaxed max-w-4xl mx-auto">
            {SYNOPSIS_TEXT.split(" ").map((word, i) => (
              <span
                key={i}
                className="word inline-block mr-[0.3em] opacity-0"
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-16 text-center">
          <span className="font-mono text-xs text-red tracking-[0.3em] uppercase">
            Marvel Studios &amp; Sony Pictures
          </span>
          <div className="mt-2 font-mono text-[10px] text-muted tracking-widest uppercase">
            MCU Phase 6 &bull; Film 5
          </div>
        </div>
      </div>
    </section>
  );
}
