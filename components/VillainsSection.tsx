"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/utils";

const VILLAINS = [
  {
    name: "Scorpion",
    alias: "Mac Gargan",
    image: "/images/villains/1.jpg",
    desc: "Fueled by vengeance. Armed with a mechanical tail capable of piercing steel. The Scorpion stalks the shadows of New York, waiting for Spider-Man to resurface.",
  },
  {
    name: "The Hand",
    alias: "Ancient Order",
    image: "/images/villains/2.jpg",
    desc: "An ancient ninja cult with roots stretching back centuries. The Hand has risen from the shadows, seeking a mystic artifact hidden beneath New York.",
  },
  {
    name: "Mysterio",
    alias: "Quentin Beck",
    image: "/images/villains/3.jpg",
    desc: "Dead? Or waiting? The master of illusion left a legacy of chaos. Someone — or something — now wears the fishbowl. And they know Peter's secret.",
  },
];

export default function VillainsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const isReduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (isReduced) {
        panelsRef.current.forEach((p) => {
          if (p) gsap.set(p, { yPercent: 0 });
        });
        textRef.current.forEach((t) => {
          if (t) gsap.set(t, { opacity: 1, y: 0 });
        });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            pin: true,
            start: "top top",
            end: "+=300%",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        panelsRef.current.forEach((panel, i) => {
          if (!panel) return;
          const imgContainer = panel.querySelector<HTMLDivElement>(".villain-image");
          const textContainer = textRef.current[i];

          tl.fromTo(
            panel,
            { yPercent: 100 },
            { yPercent: 0, duration: 0.6, ease: "power2.out" }
          );

          if (imgContainer) {
            tl.fromTo(
              imgContainer,
              { scale: 1.3 },
              { scale: 1, duration: 0.8, ease: "power2.out" },
              "-=0.4"
            );
          }

          if (textContainer) {
            tl.fromTo(
              textContainer,
              { opacity: 0, x: -40 },
              { opacity: 1, x: 0, duration: 0.5 },
              "-=0.4"
            );
          }

          if (i < VILLAINS.length - 1) {
            tl.to({}, { duration: 0.8 });
          }
        });

        return () => tl.kill();
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            pin: true,
            start: "top top",
            end: "+=300%",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        panelsRef.current.forEach((panel, i) => {
          if (!panel) return;
          const textContainer = textRef.current[i];

          tl.fromTo(
            panel,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
          );

          if (textContainer) {
            tl.fromTo(
              textContainer,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.5 },
              "-=0.3"
            );
          }

          if (i < VILLAINS.length - 1) {
            tl.to({}, { duration: 0.8 });
          }
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="villains"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-background overflow-hidden"
    >
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20">
        <SectionLabel className="text-center">Threats Rising</SectionLabel>
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {VILLAINS.map((villain, i) => (
          <div
            key={villain.name}
            ref={(el) => { panelsRef.current[i] = el; }}
            className="villain-panel relative flex-1 overflow-hidden"

          >
            <div
              className="villain-image absolute inset-0 cinematic-image"
              style={{
                backgroundImage: `url(${villain.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />

            <div
              ref={(el) => { textRef.current[i] = el; }}
              className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-2xl"
            >
              <span className="font-mono text-xs text-red tracking-[0.3em] uppercase mb-2">
                0{i + 1}
              </span>
              <h2 className="font-display text-5xl md:text-7xl text-white tracking-wider">
                {villain.name}
              </h2>
              <p className="font-editorial italic text-base text-muted mt-2">
                {villain.alias}
              </p>
              <p className="font-sans text-sm md:text-base text-silver mt-4 leading-relaxed max-w-lg">
                {villain.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
