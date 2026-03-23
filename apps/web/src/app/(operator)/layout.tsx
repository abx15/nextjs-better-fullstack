"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Users, 
  Search, 
  ClipboardList, 
  TrendingUp, 
  HelpCircle, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";

const operatorMenuItems = [
  { href: "/operator", icon: Home, label: "Dashboard" },
  { href: "/operator/customers", icon: Users, label: "Customers" },
  { href: "/operator/finder", icon: Search, label: "Scheme Finder" },
  { href: "/operator/applications", icon: ClipboardList, label: "Applications" },
  { href: "/operator/earnings", icon: TrendingUp, label: "Earnings" },
  { href: "/operator/help", icon: HelpCircle, label: "Help & Training" },
  { href: "/operator/settings", icon: Settings, label: "Settings" },
];

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-orange-600 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-orange-700 border-b border-orange-500">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🏛️</span>
              <span className="text-white font-bold text-lg">CSC Operator</span>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-orange-500">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {session?.user?.name?.charAt(0) || "O"}
                </span>
              </div>
              <div>
                <p className="text-white font-medium">{session?.user?.name || "Operator"}</p>
                <p className="text-orange-200 text-sm">CSC ID: CSC001234</p>
                <Badge variant="secondary" className="bg-orange-500 text-white mt-1">
                  Operator
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {operatorMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-orange-600"
                      : "text-orange-100 hover:bg-orange-500 hover:text-white"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-orange-500 space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-3 text-orange-100 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
            >
              <span>← Main Site</span>
            </Link>
            <Button
              onClick={() => signOut()}
              variant="ghost"
              className="w-full justify-start text-orange-100 hover:bg-orange-500 hover:text-white"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setSidebarOpen(true)}
              variant="ghost"
              size="sm"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">CSC Operator</h1>
            <div className="w-8" />
          </div>
        </div>

        {/* Page Content */}
        <div className="bg-gray-50 min-h-screen">
          {children}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
