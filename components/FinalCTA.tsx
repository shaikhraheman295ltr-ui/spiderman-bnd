"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import { prefersReducedMotion } from "@/lib/utils";

const RELEASE_DATE = new Date("2026-07-31T00:00:00");

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = RELEASE_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const countdown = useCountdown();

  useEffect(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tickets"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-background flex items-center justify-center overflow-hidden snap-start"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-red/10 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #E8192C 0%, transparent 50%), radial-gradient(circle at 80% 50%, #1B3EFF 0%, transparent 50%)",
          }}
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-content text-center px-6 max-w-4xl mx-auto opacity-0"
      >
        <span className="font-mono text-xs text-red tracking-[0.3em] uppercase mb-4 block">
          Marvel Studios &amp; Sony Pictures
        </span>

        <h2 className="font-display text-6xl md:text-8xl lg:text-9xl text-white tracking-wider leading-none mt-4">
          Brand New Day
        </h2>

        <p className="font-sans text-sm md:text-base text-silver mt-6 max-w-xl mx-auto leading-relaxed">
          The world may have forgotten Peter Parker. But he hasn&apos;t forgotten
          them. Experience the next chapter of the Spider-Man saga. Only in
          theaters.
        </p>

        <div className="mt-12 flex justify-center">
          <MagneticButton>Get Tickets</MagneticButton>
        </div>

        <div className="mt-16">
          <span className="font-mono text-xs text-muted tracking-[0.3em] uppercase">
            Opening in
          </span>
          <div className="mt-4 flex items-center justify-center gap-4 md:gap-8">
            <div className="flex flex-col items-center">
              <span className="font-mono text-4xl md:text-5xl text-red font-bold red-glow-text">
                {String(countdown.days).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase mt-1">
                Days
              </span>
            </div>
            <span className="font-mono text-3xl text-muted">:</span>
            <div className="flex flex-col items-center">
              <span className="font-mono text-4xl md:text-5xl text-red font-bold red-glow-text">
                {String(countdown.hours).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase mt-1">
                Hours
              </span>
            </div>
            <span className="font-mono text-3xl text-muted">:</span>
            <div className="flex flex-col items-center">
              <span className="font-mono text-4xl md:text-5xl text-red font-bold red-glow-text">
                {String(countdown.minutes).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase mt-1">
                Minutes
              </span>
            </div>
            <span className="font-mono text-3xl text-muted">:</span>
            <div className="flex flex-col items-center">
              <span className="font-mono text-4xl md:text-5xl text-red font-bold red-glow-text">
                {String(countdown.seconds).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase mt-1">
                Seconds
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-web/30">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              &copy; 2026 Marvel Studios
            </span>
            <span className="hidden md:block text-muted">|</span>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              Sony Pictures Entertainment
            </span>
            <span className="hidden md:block text-muted">|</span>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              In Theaters July 31
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
