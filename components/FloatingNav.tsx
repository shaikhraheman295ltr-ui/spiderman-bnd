"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Hero", href: "#hero-root" },
  { label: "Synopsis", href: "#synopsis" },
  { label: "Cast", href: "#cast" },
  { label: "Gallery", href: "#gallery" },
  { label: "Trailer", href: "#trailer" },
];

const EXTRA_ITEMS = [
  { label: "Secrets", href: "#secret-files" },
  { label: "Tickets", href: "#tickets" },
];

export default function FloatingNav() {
  const navRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("Hero");
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#hero-root",
        start: "bottom top",
        onEnter: () => setVisible(true),
        onLeaveBack: () => setVisible(false),
      });

      NAV_ITEMS.forEach((item) => {
        const section = document.querySelector(item.href);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActive(item.label);
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!visible) {
      gsap.to(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [visible]);

  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const closeMs = 150;

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        const dd = document.querySelector(".t-dropdown");
        if (dd && dd.classList.contains("is-open")) {
          dd.classList.remove("is-open");
          dd.classList.add("is-closing");
          setTimeout(() => dd.classList.remove("is-closing"), closeMs);
          setMoreOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleMore = () => {
    const dd = document.querySelector(".t-dropdown");
    if (!dd) return;
    if (moreOpen) {
      dd.classList.remove("is-open");
      dd.classList.add("is-closing");
      setTimeout(() => dd.classList.remove("is-closing"), closeMs);
    } else {
      dd.classList.remove("is-closing");
      dd.classList.add("is-open");
    }
    setMoreOpen(!moreOpen);
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-nav",
        "bg-surface/80 backdrop-blur-xl border border-web/50 rounded-full",
        "px-2 py-1.5 flex items-center gap-1 shadow-2xl shadow-black/50",
        "opacity-0"
      )}
    >
      {NAV_ITEMS.map((item, i) => (
        <button
          key={item.label}
          ref={(el) => { itemRefs.current[i] = el; }}
          onClick={() => scrollTo(item.href)}
          className={cn(
            "px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase rounded-full",
            "transition-all duration-300",
            active === item.label
              ? "bg-red text-white shadow-lg shadow-red/30"
              : "text-muted hover:text-white"
          )}
        >
          {item.label}
        </button>
      ))}

      <div ref={moreRef} className="relative">
        <button
          onClick={toggleMore}
          className={cn(
            "px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase rounded-full",
            "transition-all duration-300",
            moreOpen ? "bg-red/20 text-red" : "text-muted hover:text-white"
          )}
        >
          More
        </button>
        <div
          className="t-dropdown absolute top-full right-0 mt-2 min-w-[140px] bg-surface/95 backdrop-blur-xl border border-web/50 rounded-xl overflow-hidden shadow-2xl shadow-black/50"
          data-origin="top-right"
        >
          {EXTRA_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                scrollTo(item.href);
                toggleMore();
              }}
              className={cn(
                "w-full text-left px-4 py-2.5 font-mono text-[10px] tracking-wider uppercase",
                "transition-colors duration-200",
                active === item.label
                  ? "bg-red/10 text-red"
                  : "text-muted hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
