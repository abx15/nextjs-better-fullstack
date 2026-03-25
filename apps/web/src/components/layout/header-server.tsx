import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, LogIn } from "lucide-react";

export default function HeaderServer() {
  const navigation = [
    { name: "होम", href: "/" },
    { name: "योजनाएं", href: "/schemes" },
    { name: "हमारे बारे में", href: "/about" },
    { name: "संपर्क करें", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-sarkari-navy-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
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
                href={item.href as any}
                className="text-gray-700 hover:text-sarkari-saffron px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-sarkari-bg font-hindi cursor-pointer"
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
                  placeholder="योजना खोजें..."
                  className="pl-10 pr-4 py-2 border border-sarkari-navy-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sarkari-saffron focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link href="/login" className="flex items-center gap-2 cursor-pointer">
                <Button variant="outline" size="sm" className="border-sarkari-navy-light/30 text-sarkari-navy hover:bg-sarkari-navy hover:text-white">
                  <LogIn className="w-4 h-4" />
                  <span className="font-hindi">लॉगिन</span>
                </Button>
              </Link>
              <Link href="/register" className="flex items-center gap-2 cursor-pointer">
                <Button size="sm" className="bg-sarkari-saffron hover:bg-sarkari-saffron-dark text-white shadow-md">
                  <User className="w-4 h-4" />
                  <span className="font-hindi">रजिस्टर</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
