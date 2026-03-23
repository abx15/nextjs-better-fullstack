"use client";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: string;
  titleHindi: string;
  titleEnglish?: string;
  descriptionHindi?: string;
  descriptionEnglish?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  icon = "📋",
  titleHindi,
  titleEnglish,
  descriptionHindi,
  descriptionEnglish,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-6 text-center",
        className
      )}
    >
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-lg font-semibold text-foreground text-hindi">
        {titleHindi}
      </h3>
      {titleEnglish && (
        <p className="text-sm text-muted-foreground mt-1">{titleEnglish}</p>
      )}
      {descriptionHindi && (
        <p className="text-sm text-muted-foreground mt-2 max-w-sm text-hindi">
          {descriptionHindi}
        </p>
      )}
      {descriptionEnglish && (
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          {descriptionEnglish}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-5 py-2 text-sm font-medium rounded-lg bg-[var(--sarkari-saffron)] text-white hover:bg-[var(--sarkari-saffron-dark)] transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
