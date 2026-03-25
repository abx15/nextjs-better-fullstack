import { Search, Users, Target, Award, TrendingUp, MessageCircle, FileText, Shield, Globe, Headphones, CheckCircle, BarChart3, ArrowRight, Star } from "lucide-react";
import Header from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HomePageClient, FeatureCard, TestimonialCard } from "@/components/home-page-client";

export default function HomePage() {

  // Redirection is now handled by middleware.ts for better performance and no flash
  // If you need specific client-side logic after login, use useEffect here.

  const stats = [
    { label: "Registered Users", value: "10 लाख+", icon: Users },
    { label: "Government Schemes", value: "500+", icon: Target },
    { label: "Applications Tracked", value: "5 लाख+", icon: Award },
    { label: "States Covered", value: "28+", icon: TrendingUp }
  ];

  const features = [
    {
      icon: "Search",
      title: "स्मार्ट योजना खोज",
      description: "AI-powered सरकारी योजना खोज",
      demoLink: "/schemes"
    },
    {
      icon: "MessageCircle",
      title: "AI Assistant",
      description: "हिंदी और English में सहायता",
      demoLink: "/login"
    },
    {
      icon: "FileText",
      title: "Application Tracker",
      description: "अपने आवेदनों को Track करें",
      demoLink: "/login"
    },
    {
      icon: "Shield",
      title: "Secure Platform",
      description: "100% secure और reliable",
      demoLink: "/login"
    },
    {
      icon: "Globe",
      title: "Multi-Language",
      description: "10+ Indian languages में उपलब्ध",
      demoLink: "/schemes"
    },
    {
      icon: "Headphones",
      title: "Voice Support",
      description: "Voice search और assistance",
      demoLink: "/login"
    }
  ];
  
  // Actually I should just map them properly from the new structure
  // For now I'll just replace the main ones

  const testimonials = [
    {
      name: "राम कुमार",
      role: "किसान, उत्तर प्रदेश",
      content: "SarkariSaathi ने मुझे PM-KISAN योजना मिलने में मदद की। बहुत बढ़िया platform!",
      rating: 5
    },
    {
      name: "सीमा सिंह",
      role: "छात्रा, बिहार",
      content: "Scholarship ढूंढना बहुत आसान हो गया। AI assistant ने सही योजना बताई।",
      rating: 5
    },
    {
      name: "मोहम्मद अली",
      role: "व्यवसायी, दिल्ली",
      content: "Application tracker से मेरे सभी आवेदनों का पता रहता है। Highly recommended!",
      rating: 5
    }
  ];

  const howItWorks = [
    {
      icon: Search,
      title: "योजना खोजें",
      description: "AI-powered search से आपके लिए सही योजनाएं खोजें"
    },
    {
      icon: CheckCircle,
      title: "जांचें पात्रता",
      description: "Easy eligibility check और document checklist"
    },
    {
      icon: FileText,
      title: "ऑनलाइन आवेदन",
      description: "Direct apply करें सरकारी websites पर"
    },
    {
      icon: BarChart3,
      title: "Track करें Status",
      description: "Real-time application tracking और updates"
    }
  ];

  const popularSchemes = [
    { name: "PM-KISAN", icon: "🌾", description: "किसानों के लिए ₹6,000/साल", link: "/schemes?search=pm-kisan" },
    { name: "आयुष्मान", icon: "🏥", description: "मुफ्त स्वास्थ्य बीमा ₹5 लाख तक", link: "/schemes?search=ayushman" },
    { name: "Scholarship", icon: "🎓", description: "छात्रों के लिए स्कॉलरशिप", link: "/schemes?search=scholarship" },
    { name: "PM Awas", icon: "🏠", description: "घर बनाने के लिए सब्सिडी", link: "/schemes?search=pm-awas" },
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
              SarkariSaathi - आपका सरकारी योजना साथी
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-hindi">
              500+ सरकारी योजनाएं, AI-powered search, और बहुत कुछ - बिल्कुल मुफ्त!
            </p>
            
            {/* Search Bar */}
            <HomePageClient />

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
              🚀 SarkariSaathi Features
            </h2>
            <p className="text-xl text-gray-600 font-hindi">
              सरकारी योजनाओं का सबसे आसान तरीका
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                iconName={feature.icon}
                title={feature.title}
                description={feature.description}
                demoLink={feature.demoLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sarkari-navy mb-4 font-hindi">
              🎯 कैसे काम करता है?
            </h2>
            <p className="text-xl text-gray-600 font-hindi">
              4 आसान steps में सरकारी योजनाएं पाएं
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-sarkari-navy rounded-full flex items-center justify-center mx-auto">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    {index < howItWorks.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-sarkari-navy/20 -translate-x-8"></div>
                    )}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-sarkari-saffron text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-sarkari-navy mb-2 font-hindi">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-hindi">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sarkari-saffron">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              🚀 आज ही शुरू करें!
            </h2>
            <p className="text-white/90 text-lg mb-8">
              सरकारी योजनाओं का लाभ उठाने के लिए अभी रजिस्टर करें
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="/login"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium bg-white text-sarkari-saffron hover:bg-gray-100 rounded-lg transition-colors"
              >
                🔐 लॉगिन करें
              </a>
              <a 
                href="/register"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium border-2 border-white text-white hover:bg-white hover:text-sarkari-saffron rounded-lg transition-colors"
              >
                📝 नया अकाउंट बनाएं
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sarkari-navy mb-4 font-hindi">
              💬 उपयोगकर्ताओं की प्रतिक्रिया
            </h2>
            <p className="text-xl text-gray-600 font-hindi">
              लाखों लोग SarkariSaathi से पाते हैं सही योजनाएं
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Schemes Section */}
      <section className="py-16 bg-sarkari-navy text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              🌟 Popular Government Schemes
            </h2>
            <p className="text-xl text-white/80">
              सबसे लोकप्रिय सरकारी योजनाएं
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularSchemes.map((scheme, index) => (
              <a 
                key={index} 
                href={scheme.link}
                className="block bg-white/10 border-white/20 backdrop-blur-sm p-6 hover:bg-white/15 transition-colors cursor-pointer rounded-lg"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{scheme.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{scheme.name}</h3>
                  <p className="text-white/80 text-sm">{scheme.description}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a 
              href="/schemes"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium border-2 border-white text-white hover:bg-white hover:text-sarkari-navy rounded-lg transition-colors"
            >
              सभी योजनाएं देखें <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-sarkari-saffron">SarkariSaathi</h3>
              <p className="text-gray-400 font-hindi">
                आपका सरकारी योजना साथी - सही योजना, सही समय पर
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/schemes" className="hover:text-white">All Schemes</a></li>
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Popular Schemes</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/schemes?search=pm-kisan" className="hover:text-white">PM-KISAN</a></li>
                <li><a href="/schemes?search=ayushman" className="hover:text-white">आयुष्मान भारत</a></li>
                <li><a href="/schemes?search=scholarship" className="hover:text-white">Scholarships</a></li>
                <li><a href="/schemes?search=pm-awas" className="hover:text-white">PM Awas Yojana</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/help" className="hover:text-white">Help Center</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="font-hindi">&copy; 2026 SarkariSaathi. सभी अधिकार सुरक्षित। Made with ❤️ for India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
