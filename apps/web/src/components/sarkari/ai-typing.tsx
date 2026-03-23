"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AITypingProps {
  className?: string;
  text?: string;
}

export default function AITypingIndicator({
  className,
  text = "AI सोच रहा है...",
}: AITypingProps) {
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple CSS animation fallback — GSAP can be added later
    const dots = dotsRef.current?.querySelectorAll(".typing-dot");
    if (!dots) return;

    dots.forEach((dot, i) => {
      (dot as HTMLElement).style.animationDelay = `${i * 0.15}s`;
    });
  }, []);

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className
      )}
    >
      <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-2.5">
        <span className="text-base">🤖</span>
        <span className="text-xs text-hindi">{text}</span>
        <div ref={dotsRef} className="flex items-center gap-1 ml-1">
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[var(--sarkari-navy)] animate-bounce" />
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[var(--sarkari-navy)] animate-bounce" />
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[var(--sarkari-navy)] animate-bounce" />
        </div>
      </div>
    </div>
  );
}
