"use client";

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs tracking-[0.3em] text-muted uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}
