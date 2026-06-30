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
  const [isMobile, setIsMobile] = useState(false);
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, [isMobile]);

  const handleTap = useCallback(() => {
    if (!isMobile) return;
    setTapped((p) => !p);
    const icon = document.querySelector(".t-icon-swap");
    if (icon) icon.setAttribute("data-state", tapped ? "a" : "b");
  }, [isMobile, tapped]);

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

  const revealActive = isMobile ? tapped : isHovering;

  return (
    <section
      id="secret-files"
      ref={sectionRef}
      className="relative w-full bg-background py-24 md:py-32 overflow-hidden snap-start"
    >
      <div className="relative z-content max-w-6xl mx-auto px-4 md:px-6">
        <SectionLabel className="block text-center mb-4">
          Classified
        </SectionLabel>
        <h2 className="font-display text-5xl md:text-7xl text-white text-center tracking-wider mb-12 md:mb-16 secret-content">
          Secret Files
        </h2>

        <div
          ref={containerRef}
          className={`secret-content relative aspect-video md:aspect-[16/9] max-w-4xl mx-auto rounded-sm overflow-hidden border border-web/30 ${isMobile ? "cursor-pointer" : "cursor-none"}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            if (isMobile) return;
            setIsHovering(true);
            document.querySelector(".t-icon-swap")?.setAttribute("data-state", "b");
          }}
          onMouseLeave={() => {
            if (isMobile) return;
            setIsHovering(false);
            document.querySelector(".t-icon-swap")?.setAttribute("data-state", "a");
          }}
          onClick={handleTap}
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
              WebkitMaskImage: revealActive
                ? isMobile
                  ? "none"
                  : `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, black 40%, transparent 70%)`
                : "none",
              maskImage: revealActive
                ? isMobile
                  ? "none"
                  : `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, black 40%, transparent 70%)`
                : "none",
              transition: revealActive && !isMobile
                ? "none"
                : "mask-image 0.5s ease, -webkit-mask-image 0.5s ease",
            }}
          />

          {!revealActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="font-mono text-xs md:text-sm text-red tracking-[0.3em] uppercase">
                  {isMobile ? "Tap to reveal" : "Move your cursor to reveal"}
                </span>
                <div className="t-icon-swap mt-4 flex justify-center" data-state="a">
                  <span className="t-icon" data-icon="a">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8192C" strokeWidth="1.5">
                      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                      <path d="M13 13l6 6" />
                    </svg>
                  </span>
                  <span className="t-icon" data-icon="b">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8192C" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          )}

          {isMobile && revealActive && (
            <div className="absolute top-3 right-3 z-10">
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase bg-background/60 px-2 py-1 rounded">
                Tap to hide
              </span>
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
