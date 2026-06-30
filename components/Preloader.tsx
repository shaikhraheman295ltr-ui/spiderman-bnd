"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const progress = progressRef.current;
    const svg = svgRef.current;
    if (!overlay || !progress || !svg) {
      setLoaded(true);
      return;
    }

    const lines = svg.querySelectorAll<SVGPathElement>(".web-line");
    if (lines.length === 0) {
      setLoaded(true);
      return;
    }

    lines.forEach((line) => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = String(length);
      line.style.strokeDashoffset = String(length);
    });

    const tl = gsap.timeline({
      onComplete: () => setLoaded(true),
    });

    tl.to(lines, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
      stagger: 0.15,
    });

    tl.to(
      progress,
      { width: "100%", duration: 1.5, ease: "power1.out" },
      "-=1.5"
    );

    tl.to(overlay, {
      y: "-100%",
      duration: 1.2,
      ease: "power4.inOut",
      delay: 0.3,
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (loaded) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-modal flex flex-col items-center justify-center bg-background"
    >
      <svg
        ref={svgRef}
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-8"
      >
        <path
          className="web-line"
          d="M60 10 C60 10 25 28 15 55 C10 68 14 82 22 90 L60 60 Z"
          stroke="#E8192C"
          strokeWidth="2"
          fill="none"
        />
        <path
          className="web-line"
          d="M60 10 C60 10 95 28 105 55 C110 68 106 82 98 90 L60 60 Z"
          stroke="#E8192C"
          strokeWidth="2"
          fill="none"
        />
        <path
          className="web-line"
          d="M60 110 C60 110 25 92 15 65 C10 52 14 38 22 30 L60 60 Z"
          stroke="#E8192C"
          strokeWidth="2"
          fill="none"
        />
        <path
          className="web-line"
          d="M60 110 C60 110 95 92 105 65 C110 52 106 38 98 30 L60 60 Z"
          stroke="#E8192C"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="60" cy="60" r="8" fill="#FFD700" />
      </svg>

      <div className="w-48 h-[2px] bg-web rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-red rounded-full"
          style={{ width: "0%" }}
        />
      </div>

      <p className="mt-4 font-mono text-xs text-muted tracking-widest uppercase">
        Loading Spider-Verse
      </p>
    </div>
  );
}
