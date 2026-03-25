"use client";

import { useState } from "react";
import { ArrowRight, Star, Search, MessageCircle, FileText, Shield, Globe, Headphones } from "lucide-react";

export function HomePageClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/schemes?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="सरकारी योजना खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-20 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-white/60 rounded-full focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-sarkari-saffron hover:bg-sarkari-saffron/90 text-white px-6 py-2 rounded-full transition-colors"
          >
            🔍 खोजें
          </button>
        </div>
      </form>
    </div>
  );
}

export function FeatureCard({ 
  iconName, 
  title, 
  description, 
  demoLink 
}: { 
  iconName: string;
  title: string;
  description: string;
  demoLink: string;
}) {
  // Import icons dynamically to avoid passing them as props
  const icons: Record<string, any> = {
    Search,
    MessageCircle,
    FileText,
    Shield,
    Globe,
    Headphones,
  };

  const Icon = icons[iconName] || Search;
  return (
    <div className="p-6 text-center hover:shadow-lg transition-all duration-300 border-sarkari-navy-light/20 group rounded-lg bg-white">
      <div className="w-20 h-20 bg-sarkari-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sarkari-saffron/20 transition-colors">
        <Icon className="w-10 h-10 text-sarkari-saffron" />
      </div>
      <h3 className="text-xl font-semibold text-sarkari-navy mb-3 font-hindi">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 font-hindi">
        {description}
      </p>
      <button 
        onClick={() => window.location.href = demoLink}
        className="w-full border-sarkari-saffron text-sarkari-saffron hover:bg-sarkari-saffron hover:text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        और जानें <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export function TestimonialCard({ 
  name, 
  role, 
  content, 
  rating 
}: { 
  name: string;
  role: string;
  content: string;
  rating: number;
}) {
  return (
    <div className="p-6 border-sarkari-navy-light/20 hover:shadow-lg transition-shadow rounded-lg bg-white">
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 mb-4 font-hindi italic">
        "{content}"
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-sarkari-saffron rounded-full flex items-center justify-center text-white font-bold mr-3">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-sarkari-navy font-hindi">
            {name}
          </div>
          <div className="text-sm text-gray-600 font-hindi">
            {role}
          </div>
        </div>
      </div>
    </div>
  );
}
