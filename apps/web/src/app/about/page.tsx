"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Target,
  Users,
  Shield,
  Award,
  Globe,
  Heart,
  BookOpen,
  Headphones,
  CheckCircle,
  Star,
  TrendingUp,
  MapPin,
  Mail,
  Phone
} from "lucide-react";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const stats = [
    { label: "पंजीकृत उपयोगकर्ता", value: "10 लाख+", icon: Users },
    { label: "सरकारी योजनाएं", value: "500+", icon: Target },
    { label: "सफल आवेदन", value: "5 लाख+", icon: Award },
    { label: "राज्य कवरेज", value: "28+", icon: Globe },
  ];

  const values = [
    {
      icon: Shield,
      title: "विश्वसनीयता",
      description: "हम सभी जानकारी को सरकारी स्रोतों से सत्यापित करते हैं और 100% शुद्धता सुनिश्चित करते हैं।"
    },
    {
      icon: Heart,
      title: "जन-केंद्रित",
      description: "हमारा मिशन हर भारतीय को सरकारी योजनाओं का लाभ दिलाना है, विशेष रूप से ग्रामीण और कमजोर वर्गों को।"
    },
    {
      icon: BookOpen,
      title: "शिक्षा",
      description: "हम उपयोगकर्ताओं को योजनाओं के बारे में शिक्षित करते हैं ताकि वे सूचित निर्णय ले सकें।"
    },
    {
      icon: Headphones,
      title: "24/7 समर्थन",
      description: "हमारी AI सहायता हिंदी और अंग्रेजी में 24/7 उपलब्ध है ताकि आपको हमेशा मदद मिल सके।"
    }
  ];

  const team = [
    {
      name: "Arun Kumar Bind",
      role: "संस्थापक और CEO",
      image: "/team/arun.jpg",
      description: "दृढ़ संकल्प और नवाचार के साथ भारत के डिजिटल भविष्य को आकार दे रहे हैं।"
    },
    {
      name: "राजेश कुमार",
      role: "सह-संस्थापक",
      image: "/team/ceo.jpg",
      description: "15 वर्षों का अनुभव सरकारी योजनाओं और डिजिटल ट्रांसफॉर्मेशन में।"
    },
    {
      name: "प्रिया शर्मा",
      role: "CTO",
      image: "/team/cto.jpg",
      description: "AI और मशीन लर्निंग विशेषज्ञ, IIT दिल्ली स्नातकोत्तर।"
    },
    {
      name: "नेहा सिंह",
      role: "CMO",
      image: "/team/cmo.jpg",
      description: "डिजिटल मार्केटिंग और ब्रांडिंग विशेषज्ञ, ग्रामीण विकास पर केंद्रित।"
    }
  ];

  return (
    <div className="min-h-screen bg-sarkari-bg">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="bg-navy-gradient text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-hindi">
              हमारे बारे में जानें
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto font-hindi">
              सरकारी सैथी का मिशन हर भारतीय को सरकारी योजनाओं का लाभ दिलाना है। हम AI और टेक्नॉलॉजी के माध्यम से इस प्रक्रिया को सरल बना रहे हैं।
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-sarkari-saffron mx-auto mb-2 sm:mb-4" />
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-sarkari-navy mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-hindi">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-sarkari-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-sarkari-navy mb-4 sm:mb-6 font-hindi">
                हमारा मिशन
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 font-hindi">
                सरकारी सैथी की स्थापना 2024 में एक सरल विचार के साथ हुई थी - हर भारतीय को सरकारी योजनाओं का लाभ दिलाना। हमारा मानना है कि कोई भी योग्य व्यक्ति जानकारी की कमी के कारण सरकारी योजनाओं से वंचित नहीं रहना चाहिए।
              </p>
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 font-hindi">
                हम AI के माध्यम से योजनाओं को वर्गीकृत करते हैं, व्यक्तिगत जानकारी प्रदान करते हैं, और आवेदन प्रक्रिया को सरल बनाते हैं। हमारा लक्ष्य है कि 2026 तक 50 लाख से अधिक भारतीयों को सरकारी योजनाओं का लाभ दिलाएं।
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  size="lg" 
                  className="bg-sarkari-saffron hover:bg-sarkari-saffron-dark text-white text-sm sm:text-base"
                >
                  हमारी कहानी जानें
                </Button>
                <Link href={"/contact" as any}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-sarkari-navy text-sarkari-navy hover:bg-sarkari-navy hover:text-white text-sm sm:text-base"
                  >
                    संपर्क करें
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 text-center border-sarkari-navy-light/20">
                <Target className="w-8 h-8 sm:w-12 sm:h-12 text-sarkari-saffron mx-auto mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-sarkari-navy mb-2 font-hindi">
                  500+ योजनाएं
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-hindi">
                  केंद्र और राज्य सरकार की सभी प्रमुख योजनाएं
                </p>
              </Card>
              <Card className="p-4 sm:p-6 text-center border-sarkari-navy-light/20">
                <Users className="w-8 h-8 sm:w-12 sm:h-12 text-sarkari-saffron mx-auto mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-sarkari-navy mb-2 font-hindi">
                  10 लाख+ उपयोगकर्ता
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-hindi">
                  भारत भर में भरोसह उपयोगकर्ता
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sarkari-navy mb-3 sm:mb-4 font-hindi">
              हमारे मूल्य
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-hindi">
              हमारे काम की नींव और हमारी सेवाओं के पीछे के सिद्धांत
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow border-sarkari-navy-light/20">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-sarkari-saffron mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-sarkari-navy mb-2 sm:mb-3 font-hindi">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-hindi">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-sarkari-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sarkari-navy mb-3 sm:mb-4 font-hindi">
              हमारी टीम
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-hindi">
              हमारी टीम भारत को बेहतर बनाने के लिए प्रतिबद्ध है
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border-sarkari-navy-light/20">
                <div className="bg-sarkari-navy h-32 sm:h-40 lg:h-48 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-sarkari-saffron rounded-full flex items-center justify-center">
                    <span className="text-white text-lg sm:text-xl lg:text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-sarkari-navy mb-2 font-hindi">
                    {member.name}
                  </h3>
                  <p className="text-sarkari-saffron font-medium mb-2 sm:mb-3 font-hindi text-sm sm:text-base">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm font-hindi">
                    {member.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-navy-gradient text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-hindi">
            हमारे साथ जुड़ें
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 font-hindi">
            हमारे मिशन का हिस्सा बनने और भारत को बेहतर बनाने में हमारी मदद करें
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-sarkari-saffron hover:bg-sarkari-saffron-dark text-white text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              support@sarkarisaathi.in
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-sarkari-navy text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              1800-123-4567
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
