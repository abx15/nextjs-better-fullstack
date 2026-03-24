"use client";

import type { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/contexts/language-context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </SessionProvider>
  );
}
