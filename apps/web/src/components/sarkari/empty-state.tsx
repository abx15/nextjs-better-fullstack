"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

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
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  const title = language === 'hi' ? titleHindi : (titleEnglish || titleHindi);
  const description = language === 'hi' ? descriptionHindi : (descriptionEnglish || descriptionHindi);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-6 text-center",
        className
      )}
    >
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-lg font-semibold text-foreground text-hindi">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 max-w-sm text-hindi leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 px-5 py-2 text-sm font-medium rounded-lg bg-[var(--sarkari-saffron)] text-white hover:bg-[var(--sarkari-saffron-dark)] transition-colors shadow-sm active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
