"use client";

import { useUserStore } from "@/store/user-store";

export default function LanguageToggle() {
  const { language, setLanguage } = useUserStore();

  return (
    <button
      onClick={() => setLanguage(language === "hi" ? "en" : "hi")}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm font-medium transition-all duration-200 hover:bg-muted"
      aria-label="Toggle language"
    >
      <span className={language === "hi" ? "font-semibold text-[var(--sarkari-saffron)]" : "text-muted-foreground"}>
        हिं
      </span>
      <span className="text-muted-foreground">/</span>
      <span className={language === "en" ? "font-semibold text-[var(--sarkari-navy)]" : "text-muted-foreground"}>
        EN
      </span>
    </button>
  );
}
