"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingSpinner({
  text = "लोड हो रहा है...",
  size = "md",
  className,
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className
      )}
    >
      <div className="relative">
        {/* Outer ring */}
        <div
          className={cn(
            sizes[size],
            "rounded-full border-2 border-muted animate-spin"
          )}
          style={{
            borderTopColor: "var(--sarkari-saffron)",
            borderRightColor: "var(--sarkari-navy)",
          }}
        />
        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[var(--sarkari-green)] animate-pulse" />
        </div>
      </div>
      {text && (
        <p className="text-sm text-muted-foreground text-hindi animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
