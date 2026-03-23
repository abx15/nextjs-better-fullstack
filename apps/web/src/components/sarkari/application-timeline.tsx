"use client";

import { cn } from "@/lib/utils";

interface TimelineStep {
  label: string;
  date?: string;
  status: "completed" | "active" | "pending";
}

interface ApplicationTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export default function ApplicationTimeline({
  steps,
  className,
}: ApplicationTimelineProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex flex-col items-center relative">
            {/* Connector line */}
            {index > 0 && (
              <div
                className={cn(
                  "absolute top-3 right-1/2 w-full h-0.5 -z-10",
                  step.status === "completed" || step.status === "active"
                    ? "bg-[var(--sarkari-green)]"
                    : "bg-muted"
                )}
              />
            )}

            {/* Dot */}
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 transition-all",
                step.status === "completed" &&
                  "bg-[var(--sarkari-green)] text-white",
                step.status === "active" &&
                  "bg-[var(--sarkari-saffron)] text-white ring-4 ring-[var(--sarkari-saffron)]/20",
                step.status === "pending" && "bg-muted text-muted-foreground"
              )}
            >
              {step.status === "completed" ? "✓" : index + 1}
            </div>

            {/* Label */}
            <p
              className={cn(
                "text-[10px] mt-1.5 text-center leading-tight text-hindi",
                step.status === "active"
                  ? "font-semibold text-[var(--sarkari-saffron)]"
                  : step.status === "completed"
                  ? "text-[var(--sarkari-green)]"
                  : "text-muted-foreground"
              )}
            >
              {step.label}
            </p>

            {/* Date */}
            {step.date && (
              <p className="text-[9px] text-muted-foreground mt-0.5">
                {step.date}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
