"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import LanguageToggle from "@/components/sarkari/language-toggle";
import ReminderBell from "@/components/sarkari/reminder-bell";
import { useLanguage } from "@/contexts/language-context";
import { logout } from "@/actions/auth";

const sidebarItems = [
  { href: "/dashboard", icon: "🏠", labelKey: "dashboard" },
  { href: "/finder", icon: "🔍", labelKey: "finder" },
  { href: "/chat", icon: "💬", labelKey: "aiAssistant" },
  { href: "/my-schemes", icon: "📋", labelKey: "mySchemes" },
  { href: "/tracker", icon: "📊", labelKey: "applicationTracker" },
  { href: "/family", icon: "👨‍👩‍👧", labelKey: "family" },
  { href: "/documents", icon: "📄", labelKey: "documents" },
  { href: "/reminders", icon: "🔔", labelKey: "reminders" },
  { href: "/nearby", icon: "📍", labelKey: "nearby" },
  { href: "/settings", icon: "⚙️", labelKey: "settings" },
];

const bottomNavItems = [
  { href: "/dashboard", icon: "🏠", labelKey: "mobileHome" },
  { href: "/finder", icon: "🔍", labelKey: "mobileFinder" },
  { href: "/chat", icon: "💬", labelKey: "mobileChat" },
  { href: "/tracker", icon: "📊", labelKey: "mobileTracker" },
  { href: "/more", icon: "☰", labelKey: "mobileMore" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sarkari-navy"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar Content */}
        <div className="flex flex-col flex-grow bg-[#1a3a6b] pt-5 pb-4 overflow-y-auto">
          {/* Logo Area */}
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏛️</span>
              <span className="text-xl font-bold text-white">SarkariSaathi</span>
            </div>
          </div>

          {/* User Avatar + Name */}
          <div className="mt-6 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-semibold">R</span>
              </div>
              <div className="text-white">
                <div className="font-medium">रमेश कुमार</div>
                <div className="text-xs text-white/70">Premium Member</div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="mt-6 flex-1 px-2 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === `/dashboard${item.href === "/dashboard" ? "" : item.href}`;
              return (
                <a
                  key={item.href}
                  href={`/dashboard${item.href === "/dashboard" ? "" : item.href}` as any}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-[#FF6B00] text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {t(item.labelKey)}
                </a>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="px-2 pb-4 space-y-2">
            {/* Premium CTA */}
            <a
              href="/premium"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 transition-colors"
            >
              <span className="mr-3 text-lg">👑</span>
              Premium लें
            </a>

            {/* Logout */}
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="mr-3 text-lg">{isLoggingOut ? "⏳" : "🚪"}</span>
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#1a3a6b] transform transition-transform md:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile Sidebar Content (same as desktop) */}
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="flex items-center justify-between px-4 pt-5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏛️</span>
              <span className="text-xl font-bold text-white">SarkariSaathi</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white/60 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Avatar + Name */}
          <div className="mt-6 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-semibold">R</span>
              </div>
              <div className="text-white">
                <div className="font-medium">रमेश कुमार</div>
                <div className="text-xs text-white/70">Premium Member</div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="mt-6 flex-1 px-2 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const isActive = pathname === `/dashboard${item.href === "/dashboard" ? "" : item.href}`;
              return (
                <a
                  key={item.href}
                  href={`/dashboard${item.href === "/dashboard" ? "" : item.href}` as any}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-[#FF6B00] text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {t(item.labelKey)}
                </a>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="px-2 pb-4 space-y-2">
            <a
              href="/premium"
              onClick={() => setSidebarOpen(false)}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 transition-colors"
            >
              <span className="mr-3 text-lg">👑</span>
              Premium लें
            </a>

            <button 
              onClick={() => {
                setSidebarOpen(false);
                handleLogout();
              }}
              disabled={isLoggingOut}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="mr-3 text-lg">{isLoggingOut ? "⏳" : "🚪"}</span>
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:pl-64">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Hamburger + Page Title */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-lg font-semibold text-gray-900">
                  {pathname === "/dashboard" && t("dashboard")}
                  {pathname === "/dashboard/finder" && t("finder")}
                  {pathname === "/dashboard/chat" && t("aiAssistant")}
                  {pathname === "/dashboard/tracker" && t("applicationTracker")}
                  {pathname === "/dashboard/my-schemes" && t("mySchemes")}
                </h1>
              </div>

              {/* Right: LanguageToggle + ReminderBell + User Avatar dropdown */}
              <div className="flex items-center gap-3">
                <LanguageToggle />
                <ReminderBell />
                
                {/* User Avatar Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="relative h-8 w-8 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#1a3a6b] flex items-center justify-center">
                      <span className="text-white text-sm font-medium">R</span>
                    </div>
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                      <a
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t("profile")}
                      </a>
                      <a
                        href="/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t("settings")}
                      </a>
                      <div className="border-t border-gray-200" />
                      <button 
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoggingOut ? "Logging out..." : t("logout")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="page-content p-4 md:p-6">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="flex items-center justify-around h-16">
            {bottomNavItems.map((item) => {
              const isActive = pathname === `/dashboard${item.href === "/dashboard" ? "" : item.href}`;
              return (
                <a
                  key={item.href}
                  href={`/dashboard${item.href === "/dashboard" ? "" : item.href}` as any}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs transition-colors",
                    isActive
                      ? "text-[#FF6B00]"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <span className={cn(
                    "text-xl",
                    isActive ? "fill-[#FF6B00]" : "fill-none"
                  )}>
                    {item.icon}
                  </span>
                  <span className="text-xs">{t(item.labelKey)}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
