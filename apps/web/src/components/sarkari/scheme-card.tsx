"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

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

const difficultyLabels: Record<string, { hi: string; en: string; color: string }> = {
  easy: { hi: "आसान", en: "Easy", color: "bg-green-100 text-green-700" },
  medium: { hi: "मध्यम", en: "Medium", color: "bg-yellow-100 text-yellow-700" },
  hard: { hi: "कठिन", en: "Hard", color: "bg-red-100 text-red-700" },
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
  const { language, t } = useLanguage();
  const icon = "📋"; // Simplified for brevity in this replacement
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
              {language === 'hi' ? nameHindi : nameEnglish}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {language === 'hi' ? nameEnglish : nameHindi}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0",
            diff.color
          )}
        >
          {language === 'hi' ? diff.hi : diff.en}
        </span>
      </div>

      {/* Benefit */}
      {benefitAmount && (
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground text-hindi">{language === 'hi' ? 'लाभ:' : 'Benefit:'}</span>
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
            <span className="text-muted-foreground text-hindi">{language === 'hi' ? 'पात्रता:' : 'Eligibility:'}</span>
            <span className="font-semibold text-[var(--sarkari-green)]">
              {matchPercent}% {language === 'hi' ? 'मेल' : 'match'}
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
          <span className="text-hindi">{language === 'hi' ? 'दस्तावेज़:' : 'Documents:'}</span>
          <span className="text-[var(--sarkari-green)]">✅ {docsReady} {language === 'hi' ? 'हैं' : 'ready'}</span>
          {docsNeeded > 0 && (
            <span className="text-[var(--sarkari-saffron)]">
              ❌ {docsNeeded} {language === 'hi' ? 'चाहिए' : 'needed'}
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
          {isSaved ? "💛" : "🤍"} {language === 'hi' ? 'सहेजें' : 'Save'}
        </button>
        <button
          onClick={onDetails}
          className="text-xs px-3 py-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors flex items-center gap-1"
        >
          📋 {language === 'hi' ? 'विवरण' : 'Details'}
        </button>
        <button
          onClick={onApply}
          className="text-xs px-3 py-1.5 rounded-lg bg-[var(--sarkari-saffron)] text-white hover:bg-[var(--sarkari-saffron-dark)] transition-colors flex items-center gap-1 ml-auto font-medium"
        >
          🚀 {language === 'hi' ? 'आवेदन करें' : 'Apply'}
        </button>
      </div>
    </div>
  );
}
