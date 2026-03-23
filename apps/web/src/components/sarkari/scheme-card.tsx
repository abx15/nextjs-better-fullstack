"use client";

import { cn } from "@/lib/utils";

interface SchemeCardProps {
  nameHindi: string;
  nameEnglish: string;
  category: string;
  ministry: string;
  benefitAmount?: string;
  difficulty?: string;
  matchPercent?: number;
  docsReady?: number;
  docsNeeded?: number;
  isSaved?: boolean;
  onSave?: () => void;
  onDetails?: () => void;
  onApply?: () => void;
  className?: string;
}

const categoryIcons: Record<string, string> = {
  kisan: "🌾",
  shiksha: "🎓",
  swasthya: "🏥",
  awas: "🏠",
  rojgar: "💼",
  mahila: "👩",
  vridh: "👴",
  divyang: "♿",
  finance: "💰",
};

const difficultyLabels: Record<string, { text: string; color: string }> = {
  easy: { text: "आसान", color: "bg-green-100 text-green-700" },
  medium: { text: "मध्यम", color: "bg-yellow-100 text-yellow-700" },
  hard: { text: "कठिन", color: "bg-red-100 text-red-700" },
};

export default function SchemeCard({
  nameHindi,
  nameEnglish,
  category,
  ministry,
  benefitAmount,
  difficulty = "medium",
  matchPercent,
  docsReady,
  docsNeeded,
  isSaved = false,
  onSave,
  onDetails,
  onApply,
  className,
}: SchemeCardProps) {
  const icon = categoryIcons[category] || "📋";
  const diff = difficultyLabels[difficulty] || difficultyLabels.medium;

  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[var(--sarkari-saffron)]/30 hover:-translate-y-1",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl flex-shrink-0">{icon}</span>
          <div className="min-w-0">
            <h3 className="font-semibold text-[var(--sarkari-navy)] text-sm leading-tight line-clamp-2 text-hindi">
              {nameHindi}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {nameEnglish}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0",
            diff.color
          )}
        >
          {diff.text}
        </span>
      </div>

      {/* Benefit */}
      {benefitAmount && (
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground text-hindi">लाभ:</span>
          <span className="text-sm font-semibold text-[var(--sarkari-green)]">
            {benefitAmount}
          </span>
        </div>
      )}

      {/* Ministry */}
      <p className="text-[11px] text-muted-foreground mb-3 text-hindi line-clamp-1">
        {ministry}
      </p>

      {/* Match Indicator */}
      {matchPercent !== undefined && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground text-hindi">पात्रता:</span>
            <span className="font-semibold text-[var(--sarkari-green)]">
              {matchPercent}% match
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--sarkari-green)] transition-all duration-500"
              style={{ width: `${matchPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Documents Status */}
      {docsReady !== undefined && docsNeeded !== undefined && (
        <div className="mb-4 flex items-center gap-3 text-xs">
          <span className="text-hindi">दस्तावेज़:</span>
          <span className="text-[var(--sarkari-green)]">✅ {docsReady} हैं</span>
          {docsNeeded > 0 && (
            <span className="text-[var(--sarkari-saffron)]">
              ❌ {docsNeeded} चाहिए
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <button
          onClick={onSave}
          className={cn(
            "text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1",
            isSaved
              ? "bg-[var(--sarkari-saffron)]/10 text-[var(--sarkari-saffron)]"
              : "hover:bg-muted text-muted-foreground"
          )}
        >
          {isSaved ? "💛" : "🤍"} Save
        </button>
        <button
          onClick={onDetails}
          className="text-xs px-3 py-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors flex items-center gap-1"
        >
          📋 Details
        </button>
        <button
          onClick={onApply}
          className="text-xs px-3 py-1.5 rounded-lg bg-[var(--sarkari-saffron)] text-white hover:bg-[var(--sarkari-saffron-dark)] transition-colors flex items-center gap-1 ml-auto font-medium"
        >
          🚀 Apply
        </button>
      </div>
    </div>
  );
}
