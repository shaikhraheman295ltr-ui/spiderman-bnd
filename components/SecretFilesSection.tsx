"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/utils";

export default function SecretFilesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector(".secret-content"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
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
      id="secret-files"
      ref={sectionRef}
      className="relative w-full bg-background py-32 overflow-hidden snap-start"
    >
      <div className="relative z-content max-w-6xl mx-auto px-6">
        <SectionLabel className="block text-center mb-4">
          Classified
        </SectionLabel>
        <h2 className="font-display text-5xl md:text-7xl text-white text-center tracking-wider mb-16 secret-content">
          Secret Files
        </h2>

        <div
          ref={containerRef}
          className="secret-content relative aspect-[16/9] max-w-4xl mx-auto rounded-sm overflow-hidden border border-web/30 cursor-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            setIsHovering(true);
            document.querySelector(".t-icon-swap")?.setAttribute("data-state", "b");
          }}
          onMouseLeave={() => {
            setIsHovering(false);
            document.querySelector(".t-icon-swap")?.setAttribute("data-state", "a");
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center cinematic-image"
            style={{
              backgroundImage: "url(/images/gallery/1.jpg)",
              filter: "blur(8px) grayscale(50%)",
            }}
          />

          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(/images/gallery/1.jpg)",
              WebkitMaskImage: isHovering
                ? `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, black 40%, transparent 70%)`
                : "none",
              maskImage: isHovering
                ? `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, black 40%, transparent 70%)`
                : "none",
              transition: isHovering
                ? "none"
                : "mask-image 0.5s ease, -webkit-mask-image 0.5s ease",
            }}
          />

          {!isHovering && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="font-mono text-sm text-red tracking-[0.3em] uppercase">
                  Move your cursor to reveal
                </span>
                <div className="t-icon-swap mt-4 flex justify-center" data-state="a">
                  <span className="t-icon" data-icon="a">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8192C" strokeWidth="1.5">
                      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                      <path d="M13 13l6 6" />
                    </svg>
                  </span>
                  <span className="t-icon" data-icon="b">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8192C" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              TOP SECRET
            </span>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              EYES ONLY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
