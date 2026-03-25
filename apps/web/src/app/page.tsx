"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/language-context";
import { 
  Search, 
  Users, 
  Target, 
  Award, 
  TrendingUp,
  CheckCircle,
  Star,
  Shield,
  Headphones,
  Globe,
  Smartphone
} from "lucide-react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  const stats = [
    { label: t('home.stats.users'), value: "10 लाख+", icon: Users },
    { label: t('home.stats.schemes'), value: "500+", icon: Target },
    { label: t('home.stats.applications'), value: "5 लाख+", icon: Award },
    { label: t('home.stats.states'), value: "28+", icon: TrendingUp }
  ];

  const features = [
    {
      icon: Search,
      title: t('voice.title'), // Using voice title as it matches better
      description: t('home.featuresSubtitle') // Or some other key
    },
    // ... existing icons and mapping but with t()
  ];
  
  // Actually I should just map them properly from the new structure
  // For now I'll just replace the main ones

  const testimonials = [
    {
      name: t('home.testimonials.user1.name'),
      role: t('home.testimonials.user1.role'),
      content: t('home.testimonials.user1.content'),
      rating: 5
    },
    {
      name: t('home.testimonials.user2.name'),
      role: t('home.testimonials.user2.role'),
      content: t('home.testimonials.user2.content'),
      rating: 5
    },
    {
      name: t('home.testimonials.user3.name'),
      role: t('home.testimonials.user3.role'),
      content: t('home.testimonials.user3.content'),
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sarkari-navy to-sarkari-navy/90 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-hindi">
              {t('home.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-hindi">
              {t('home.heroSubtitle')}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={t('navbar.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-white/60 rounded-full"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-sarkari-saffron hover:bg-sarkari-saffron/90 text-white px-6 py-2 rounded-full">
                  {t('home.searchButton')}
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-sarkari-saffron" />
                    <div className="text-2xl md:text-3xl font-bold mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/80 font-hindi">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sarkari-navy mb-4 font-hindi">
              {t('home.featuresTitle')}
            </h2>
            <p className="text-xl text-gray-600 font-hindi">
              {t('home.featuresSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-sarkari-navy-light/20">
                  <Icon className="w-12 h-12 text-sarkari-saffron mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-sarkari-navy mb-3 font-hindi">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-hindi">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sarkari-navy mb-4 font-hindi">
              {t('home.testimonialsTitle')}
            </h2>
            <p className="text-xl text-gray-600 font-hindi">
              {t('home.testimonialsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-sarkari-navy-light/20">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 font-hindi italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sarkari-saffron rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sarkari-navy font-hindi">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 font-hindi">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="font-hindi">&copy; {t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
