"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = btnRef.current || linkRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }, []);

  const handleLeave = useCallback(() => {
    const el = btnRef.current || linkRef.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }, []);

  const baseClasses = cn(
    "relative inline-flex items-center justify-center gap-2 px-8 py-4",
    "border-2 border-red text-red font-display text-xl tracking-widest uppercase",
    "bg-transparent transition-colors duration-300",
    "hover:bg-red hover:text-white hover:border-red",
    "cursor-pointer overflow-hidden",
    className
  );

  if (href) {
    return (
      <a
        ref={linkRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      className={baseClasses}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </button>
  );
}
