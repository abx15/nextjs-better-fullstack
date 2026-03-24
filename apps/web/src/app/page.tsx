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
  const { language, setLanguage } = useLanguage();

  const stats = [
    { label: language === "hi" ? "पंजीकृत उपयोगकर्ता" : "Registered Users", value: "10 लाख+", icon: Users },
    { label: language === "hi" ? "सरकारी योजनाएं" : "Government Schemes", value: "500+", icon: Target },
    { label: language === "hi" ? "सफल आवेदन" : "Successful Applications", value: "5 लाख+", icon: Award },
    { label: language === "hi" ? "राज्य कवर" : "States Covered", value: "28+", icon: TrendingUp }
  ];

  const features = [
    {
      icon: Search,
      title: language === "hi" ? "AI योजना मिलान" : "AI Scheme Matching",
      description: language === "hi" ? "हर योजना की पूरी जानकारी, पात्रता मानदंड और आवेदन प्रक्रिया" : "Complete information about every scheme, eligibility criteria and application process"
    },
    {
      icon: Shield,
      title: language === "hi" ? "100% सुरक्षित" : "100% Secure",
      description: language === "hi" ? "सभी जानकारी सरकारी स्रोतों से सत्यापित और नवीनतम" : "All information verified from government sources and up-to-date"
    },
    {
      icon: Headphones,
      title: language === "hi" ? "24/7 सहायता" : "24/7 Support",
      description: language === "hi" ? "हिंदी और अंग्रेजी में AI चैटबॉट के माध्यम से हमेशा सहायता" : "AI chatbot assistance available in Hindi and English 24/7"
    }
  ];

  const testimonials = [
    {
      name: language === "hi" ? "रमेश प्रसाद" : "Ramesh Prasad",
      role: language === "hi" ? "किसान, बिहार" : "Farmer, Bihar",
      content: language === "hi" ? "सरकारी सैथी के कारण मुझे पीएम किसान योजना का लाभ मिला। बहुत आसान प्रक्रिया थी।" : "Sarkari Saathi helped me get PM Kisan scheme benefit. Very easy process.",
      rating: 5
    },
    {
      name: language === "hi" ? "सुनीता देवी" : "Sunita Devi",
      role: language === "hi" ? "छात्रा, उत्तर प्रदेश" : "Student, Uttar Pradesh",
      content: language === "hi" ? "छात्रवृत्ति योजनाएं ढूंढना बहुत आसान हो गया। AI चैटबॉट ने बहुत मदद की।" : "Finding scholarship schemes became very easy. AI chatbot helped a lot.",
      rating: 5
    },
    {
      name: language === "hi" ? "मोहम्मद अली" : "Mohammad Ali",
      role: language === "hi" ? "व्यवसायी, गुजरात" : "Businessman, Gujarat",
      content: language === "hi" ? "उद्योग ऋण योजना मिली, मेरा व्यापार बढ़ने में मदद मिली।" : "Got industry loan scheme, helped grow my business.",
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
              {language === "hi" ? "सरकारी योजनाओं का लाभ उठाएं" : "Get Benefits of Government Schemes"}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-hindi">
              {language === "hi" ? "हर भारतीयों को सरकारी योजनाओं का लाभ दिलाने का हमारा मिशन" : "Our mission is to help every Indian get the benefits of government schemes"}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={language === "hi" ? "योजनाएं खोजें..." : "Search schemes..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-white/60 rounded-full"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-sarkari-saffron hover:bg-sarkari-saffron/90 text-white px-6 py-2 rounded-full">
                  {language === "hi" ? "खोजें" : "Search"}
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
              {language === "hi" ? "क्यों सरकारी सैथी अलग है?" : "Why Sarkari Saathi is Different?"}
            </h2>
            <p className="text-xl text-gray-600 font-hindi">
              {language === "hi" ? "AI के माध्यम से योजनाएं खोजें, आवेदन करें, और ट्रैक करें - बिल्कुल किसी झंझाझ के बिना" : "Find schemes, apply, and track with AI-powered assistance - completely hassle-free"}
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
              {language === "hi" ? "लोगों क्या कहते हैं" : "What People Are Saying"}
            </h2>
            <p className="text-xl text-gray-600 font-hindi">
              {language === "hi" ? "लाखों भारतीयों ने हमारी सेवाओं से लाभ उठाया है" : "Millions of Indians have benefited from our services"}
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
            <p className="font-hindi">&copy; {language === "hi" ? " 2026 सरकारी सैथी. सभी अधिकार सुरक्षित हैं।" : " 2026 Sarkari Saathi. All rights reserved."}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
