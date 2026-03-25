"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageToggle from "./language-toggle";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

export default function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "navbar.home" },
    { href: "/schemes", label: "navbar.schemes" },
    { href: "/about", label: "navbar.about" },
    { href: "/contact", label: "navbar.contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🏛️</span>
            <span className="text-xl font-bold text-[var(--sarkari-navy)] group-hover:text-[var(--sarkari-saffron)] transition-colors">
              SarkariSaathi
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href as any}
                className="text-sm font-medium text-foreground/70 hover:text-[var(--sarkari-navy)] transition-colors text-hindi"
              >
                {t(link.label)}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <Link
              href="/login"
              className="text-sm font-medium px-4 py-2 rounded-lg border border-[var(--sarkari-navy)] text-[var(--sarkari-navy)] hover:bg-[var(--sarkari-navy)] hover:text-white transition-all"
            >
              {t('navbar.login')}
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-[var(--sarkari-saffron)] text-white hover:bg-[var(--sarkari-saffron-dark)] transition-colors shadow-md shadow-[var(--sarkari-saffron)]/20"
            >
              {t('navbar.register')} — FREE
            </Link>
          </div>

          {/* Mobile Menu Button ... */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t border-border/50",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-4 space-y-2 bg-card">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href as any}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium py-2 px-3 rounded-lg hover:bg-muted transition-colors text-hindi"
            >
              {t(link.label)}
            </Link>
          ))}
          <div className="pt-3 border-t border-border space-y-2">
            <div className="flex items-center justify-between px-3">
              <span className="text-xs text-muted-foreground">{t('navbar.language')}:</span>
              <LanguageToggle />
            </div>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center text-sm font-medium py-2.5 rounded-lg border border-[var(--sarkari-navy)] text-[var(--sarkari-navy)]"
            >
              {t('navbar.login')}
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="block text-center text-sm font-medium py-2.5 rounded-lg bg-[var(--sarkari-saffron)] text-white"
            >
              {t('navbar.register')} — FREE
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
