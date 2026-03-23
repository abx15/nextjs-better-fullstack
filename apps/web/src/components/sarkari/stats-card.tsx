"use client";

import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: string;
  value: string | number;
  label: string;
  labelHindi?: string;
  trend?: { value: number; isUp: boolean };
  className?: string;
}

export default function StatsCard({
  icon,
  value,
  label,
  labelHindi,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              trend.isUp
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {trend.isUp ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">
        {labelHindi && (
          <span className="text-hindi block">{labelHindi}</span>
        )}
        <span>{label}</span>
      </p>
    </div>
  );
}
