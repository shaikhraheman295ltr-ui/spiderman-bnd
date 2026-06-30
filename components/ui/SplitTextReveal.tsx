"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
}

export default function SplitTextReveal({
  text,
  className,
  as: Tag = "p",
  delay = 0,
  stagger = 0.04,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { y: "100%", opacity: 0, rotateX: -90 },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger]);

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <Tag className="inline-flex flex-wrap">
        {words.map((word, i) => (
          <span key={i} className="word inline-block mr-[0.3em]">
            {word}
          </span>
        ))}
      </Tag>
    </div>
  );
}
