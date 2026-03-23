"use client";

import { cn } from "@/lib/utils";

interface ProfileProgressProps {
  percentage: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ProfileProgress({
  percentage,
  showLabel = true,
  size = "md",
  className,
}: ProfileProgressProps) {
  const clampedPercent = Math.min(100, Math.max(0, percentage));
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground text-hindi">
            प्रोफ़ाइल पूर्णता
          </span>
          <span
            className={cn(
              "text-xs font-semibold",
              clampedPercent === 100
                ? "text-[var(--sarkari-green)]"
                : "text-[var(--sarkari-saffron)]"
            )}
          >
            {clampedPercent}%
          </span>
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full bg-muted overflow-hidden",
          heights[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            clampedPercent === 100
              ? "bg-[var(--sarkari-green)]"
              : "bg-saffron-gradient"
          )}
          style={{ width: `${clampedPercent}%` }}
        />
      </div>
      {showLabel && clampedPercent < 100 && (
        <p className="text-[11px] text-muted-foreground mt-1 text-hindi">
          प्रोफ़ाइल पूरा करें ताकि बेहतर योजनाएं मिलें →
        </p>
      )}
    </div>
  );
}
