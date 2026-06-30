"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { lerp } from "@/lib/utils";

export default function WebCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
    if (!visible) setVisible(true);
  }, [visible]);

  const onMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  const onMouseEnter = useCallback(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    const loop = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 40}px, ${pos.current.y - 40}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 3}px, ${mouse.current.y - 3}px)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onMouseMove, onMouseLeave, onMouseEnter]);

  if (typeof window === "undefined") return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-cursor"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="38" stroke="#E8192C" strokeWidth="1" opacity="0.4" />
          <circle cx="40" cy="40" r="32" stroke="#E8192C" strokeWidth="0.5" opacity="0.2" />
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 40 + 38 * Math.cos(rad);
            const y1 = 40 + 38 * Math.sin(rad);
            const x2 = 40 + 20 * Math.cos(rad);
            const y2 = 40 + 20 * Math.sin(rad);
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#E8192C"
                strokeWidth="0.5"
                opacity="0.3"
              />
            );
          })}
        </svg>
      </div>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-cursor"
        style={{
          width: 6,
          height: 6,
          backgroundColor: "#E8192C",
          borderRadius: "50%",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          boxShadow: "0 0 10px rgba(232,25,44,0.8)",
        }}
      />
    </>
  );
}
