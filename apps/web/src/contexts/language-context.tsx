"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useUserStore } from "@/store/user-store";

type Language = "hi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Fallback for SSR/hydration issues
    return {
      language: 'hi',
      setLanguage: () => {},
      t: (key: string) => key,
    };
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

// Import translations
import { translations } from "@/lib/i18n";

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { language, setLanguage } = useUserStore();

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value !== 'string') return key;

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = (value as string).replace(`{${k}}`, String(v));
      });
    }
    
    return value;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
