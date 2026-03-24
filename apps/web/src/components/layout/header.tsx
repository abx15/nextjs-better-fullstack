"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Menu, 
  X, 
  Search,
  User,
  LogIn,
  Languages
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState<"hi" | "en">("hi");
  const t = useTranslation(currentLanguage);

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("schemes"), href: "/schemes" },
    { name: t("tracker"), href: "/tracker" },
    { name: t("chat"), href: "/chat" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-sarkari-navy-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-sarkari-navy rounded-lg flex items-center justify-center shadow-lg group-hover:bg-sarkari-saffron transition-colors">
              <span className="text-white font-bold text-lg">सै</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-sarkari-navy font-hindi group-hover:text-sarkari-saffron transition-colors">सरकारी सैथी</span>
              <span className="text-xs text-sarkari-green font-medium">Government Schemes Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-sarkari-saffron px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-sarkari-bg font-hindi"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-sarkari-navy-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sarkari-saffron focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link href="/login" className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-sarkari-navy-light/30 text-sarkari-navy hover:bg-sarkari-navy hover:text-white">
                  <LogIn className="w-4 h-4" />
                  <span className="font-hindi">{t("login")}</span>
                </Button>
              </Link>
              <Link href="/register" className="flex items-center gap-2">
                <Button size="sm" className="bg-sarkari-saffron hover:bg-sarkari-saffron-dark text-white shadow-md">
                  <User className="w-4 h-4" />
                  <span className="font-hindi">{t("register")}</span>
                </Button>
              </Link>
            </div>

            {/* Language Toggle */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentLanguage(currentLanguage === "hi" ? "en" : "hi")}
                className="flex items-center gap-2 border-sarkari-navy-light/30 text-sarkari-navy hover:bg-sarkari-navy hover:text-white"
              >
                <Languages className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {currentLanguage === "hi" ? "EN" : "हिंदी"}
                </span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-sarkari-bg transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-sarkari-navy" />
              ) : (
                <Menu className="w-6 h-6 text-sarkari-navy" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="fixed inset-0 z-50 bg-white">
              <div className="flex flex-col p-4 space-y-4 h-full">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder={t("searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-sarkari-navy-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sarkari-saffron focus:border-transparent"
                  />
                </div>

                {/* Mobile Navigation Links */}
                <nav className="space-y-2 flex-1">
                  {navigation.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-700 hover:text-sarkari-saffron hover:bg-sarkari-bg px-4 py-3 rounded-md text-sm font-medium transition-colors font-hindi"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-sarkari-navy-light/20">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="w-full border-sarkari-navy-light/30 text-sarkari-navy hover:bg-sarkari-navy hover:text-white">
                      <LogIn className="w-4 h-4" />
                      <span className="font-hindi">{t("login")}</span>
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" className="w-full bg-sarkari-saffron hover:bg-sarkari-saffron-dark text-white">
                      <User className="w-4 h-4" />
                      <span className="font-hindi">{t("register")}</span>
                    </Button>
                  </Link>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-sarkari-bg transition-colors"
                >
                  <X className="w-6 h-6 text-sarkari-navy" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
