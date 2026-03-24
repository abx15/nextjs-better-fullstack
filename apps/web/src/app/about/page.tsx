"use client";

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
      name: "राजेश कुमार",
      role: "संस्थापक और CEO",
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
      name: "अमित पटेल",
      role: "COO",
      image: "/team/coo.jpg",
      description: "ऑपरेशन्स और उपयोगकर्ता अनुभव प्रबंधन में 12 वर्षों का अनुभव।"
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
      <div className="bg-navy-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-hindi">
              हमारे बारे में जानें
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto font-hindi">
              सरकारी सैथी का मिशन हर भारतीय को सरकारी योजनाओं का लाभ दिलाना है। हम AI और टेक्नॉलॉजी के माध्यम से इस प्रक्रिया को सरल बना रहे हैं।
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-12 h-12 text-sarkari-saffron mx-auto mb-4" />
                  <div className="text-3xl font-bold text-sarkari-navy mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-hindi">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-sarkari-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-sarkari-navy mb-6 font-hindi">
                हमारा मिशन
              </h2>
              <p className="text-lg text-gray-700 mb-6 font-hindi">
                सरकारी सैथी की स्थापना 2024 में एक सरल विचार के साथ हुई थी - हर भारतीय को सरकारी योजनाओं का लाभ दिलाना। हमारा मानना है कि कोई भी योग्य व्यक्ति जानकारी की कमी के कारण सरकारी योजनाओं से वंचित नहीं रहना चाहिए।
              </p>
              <p className="text-lg text-gray-700 mb-6 font-hindi">
                हम AI के माध्यम से योजनाओं को वर्गीकृत करते हैं, व्यक्तिगत जानकारी प्रदान करते हैं, और आवेदन प्रक्रिया को सरल बनाते हैं। हमारा लक्ष्य है कि 2026 तक 50 लाख से अधिक भारतीयों को सरकारी योजनाओं का लाभ दिलाएं।
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-sarkari-saffron hover:bg-sarkari-saffron-dark text-white"
                >
                  हमारी कहानी जानें
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-sarkari-navy text-sarkari-navy hover:bg-sarkari-navy hover:text-white"
                >
                  संपर्क करें
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center border-sarkari-navy-light/20">
                <Target className="w-12 h-12 text-sarkari-saffron mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sarkari-navy mb-2 font-hindi">
                  500+ योजनाएं
                </h3>
                <p className="text-gray-600 font-hindi">
                  केंद्र और राज्य सरकार की सभी प्रमुख योजनाएं
                </p>
              </Card>
              <Card className="p-6 text-center border-sarkari-navy-light/20">
                <Users className="w-12 h-12 text-sarkari-saffron mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sarkari-navy mb-2 font-hindi">
                  10 लाख+ उपयोगकर्ता
                </h3>
                <p className="text-gray-600 font-hindi">
                  भारत भर में भरोसह उपयोगकर्ता
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sarkari-navy mb-4 font-hindi">
              हमारे मूल्य
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-hindi">
              हमारे काम की नींव और हमारी सेवाओं के पीछे के सिद्धांत
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-sarkari-navy-light/20">
                  <Icon className="w-12 h-12 text-sarkari-saffron mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-sarkari-navy mb-3 font-hindi">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-hindi">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-sarkari-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sarkari-navy mb-4 font-hindi">
              हमारी टीम
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-hindi">
              हमारी टीम भारत को बेहतर बनाने के लिए प्रतिबद्ध है
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border-sarkari-navy-light/20">
                <div className="bg-sarkari-navy h-48 flex items-center justify-center">
                  <div className="w-24 h-24 bg-sarkari-saffron rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-sarkari-navy mb-2 font-hindi">
                    {member.name}
                  </h3>
                  <p className="text-sarkari-saffron font-medium mb-3 font-hindi">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm font-hindi">
                    {member.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-navy-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-hindi">
            हमारे साथ जुड़ें
          </h2>
          <p className="text-xl text-blue-100 mb-8 font-hindi">
            हमारे मिशन का हिस्सा बनने और भारत को बेहतर बनाने में हमारी मदद करें
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-sarkari-saffron hover:bg-sarkari-saffron-dark text-white"
            >
              <Mail className="w-5 h-5 mr-2" />
              support@sarkarisaathi.in
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-sarkari-navy"
            >
              <Phone className="w-5 h-5 mr-2" />
              1800-123-4567
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
