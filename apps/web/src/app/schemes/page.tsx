"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter,
  Users,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  IndianRupee,
  GraduationCap,
  Briefcase,
  Heart,
  Home
} from "lucide-react";

export default function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "सभी योजनाएं", icon: Home },
    { id: "education", name: "शिक्षा", icon: GraduationCap },
    { id: "agriculture", name: "कृषि", icon: Heart },
    { id: "business", name: "व्यवसाय", icon: Briefcase },
    { id: "health", name: "स्वास्थ्य", icon: Heart },
  ];

  const schemes = [
    {
      id: 1,
      title: "प्रधानमंत्री किसान सम्मान निधि",
      category: "agriculture",
      description: "किसानों को प्रत्यक्ष आय समर्थन के लिए सरकार द्वारा प्रदान की जाने वाली योजना",
      eligibility: "सभी छोटे और सीमांत किसान",
      benefit: "₹6,000 प्रति वर्ष",
      deadline: "31 मार्च 2026",
      state: "सभी राज्य",
      rating: 4.5,
      applicants: "15.2 लाख"
    },
    {
      id: 2,
      title: "राष्ट्रीय छात्रवृत्ति पोर्टल",
      category: "education",
      description: "वित्तीय सहायता की आवश्यकता वाले छात्रों को छात्रवृत्ति प्रदान करने की योजना",
      eligibility: "आर्थिक रूप से कमजोर छात्र",
      benefit: "₹12,000 प्रति वर्ष",
      deadline: "30 अप्रैल 2026",
      state: "सभी राज्य",
      rating: 4.8,
      applicants: "8.5 लाख"
    },
    {
      id: 3,
      title: "प्रधानमंत्री रोजगार योजना",
      category: "business",
      description: "बेरोजगार युवाओं को रोजगार प्रदान करने के लिए प्रोत्साहन",
      eligibility: "शिक्षित बेरोजगार युवा",
      benefit: "₹7,000-9,000 प्रति माह",
      deadline: "चालू",
      state: "सभी राज्य",
      rating: 4.2,
      applicants: "22.1 लाख"
    },
    {
      id: 4,
      title: "आयुष्मान भारत",
      category: "health",
      description: "गरीब परिवारों को निःशुल्क स्वास्थ्य बीमा प्रदान करने की योजना",
      eligibility: "गरीब परिवार",
      benefit: "₹5 लाख तक का बीमा",
      deadline: "चालू",
      state: "सभी राज्य",
      rating: 4.6,
      applicants: "18.7 लाख"
    },
    {
      id: 5,
      title: "उज्जवाला भारत",
      category: "business",
      description: "छोटे व्यवसायियों को वित्तीय सहायता प्रदान करने की योजना",
      eligibility: "सूक्ष्म व्यवसायी",
      benefit: "₹10 लाख तक का ऋण",
      deadline: "चालू",
      state: "सभी राज्य",
      rating: 4.4,
      applicants: "12.3 लाख"
    },
    {
      id: 6,
      title: "बेटी बचाओ बेटी पढ़ाओ",
      category: "education",
      description: "बालिकाओं की शिक्षा और सुरक्षा को बढ़ावा देने की योजना",
      eligibility: "बालिकाओं वाले परिवार",
      benefit: "₹1,500 प्रति माह",
      deadline: "चालू",
      state: "सभी राज्य",
      rating: 4.7,
      applicants: "9.8 लाख"
    }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : Home;
  };

  return (
    <div className="min-h-screen bg-sarkari-bg">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="bg-navy-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-hindi">
              सरकारी योजनाएं
            </h1>
            <p className="text-xl text-blue-100 mb-8 font-hindi">
              आपके लिए उपयुक्त योजनाएं खोजें और आवेदन करें
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="योजनाएं खोजें..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-0 rounded-lg focus:ring-2 focus:ring-sarkari-saffron"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 ${
                      selectedCategory === category.id 
                        ? "bg-sarkari-saffron hover:bg-sarkari-saffron-dark text-white" 
                        : "border-white text-white hover:bg-white hover:text-sarkari-navy"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => {
            const CategoryIcon = getCategoryIcon(scheme.category);
            return (
              <Card key={scheme.id} className="overflow-hidden hover:shadow-lg transition-shadow border-sarkari-navy-light/20">
                {/* Card Header */}
                <div className="bg-sarkari-navy text-white p-4">
                  <div className="flex items-center justify-between mb-2">
                    <CategoryIcon className="w-6 h-6 text-sarkari-saffron" />
                    <Badge className="bg-sarkari-saffron text-white">
                      {scheme.applicants}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold font-hindi line-clamp-2">
                    {scheme.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <p className="text-gray-600 mb-4 text-sm font-hindi line-clamp-3">
                    {scheme.description}
                  </p>

                  {/* Scheme Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-sarkari-green" />
                      <span className="text-sm text-gray-700 font-hindi">पात्रता: {scheme.eligibility}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-sarkari-saffron" />
                      <span className="text-sm text-gray-700 font-hindi">लाभ: {scheme.benefit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-sarkari-navy" />
                      <span className="text-sm text-gray-700 font-hindi">अंतिम तिथि: {scheme.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sarkari-navy" />
                      <span className="text-sm text-gray-700 font-hindi">{scheme.state}</span>
                    </div>
                  </div>

                  {/* Rating and Apply Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-sarkari-saffron fill-current" />
                      <span className="text-sm font-medium text-gray-700">{scheme.rating}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-sarkari-saffron hover:bg-sarkari-saffron-dark text-white"
                    >
                      आवेदन करें
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2 font-hindi">
              कोई योजना नहीं मिली
            </h3>
            <p className="text-gray-500 font-hindi">
              अपनी खोज शर्तों को बदलें या दूसरी श्रेणी आजमाएं
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-sarkari-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-hindi">
            उपयुक्त योजना नहीं मिली?
          </h2>
          <p className="text-xl text-blue-100 mb-8 font-hindi">
            हमारे AI सहायता के साथ बात करें और व्यक्तिगत योजनाएं पाएं
          </p>
          <Button 
            size="lg" 
            className="bg-sarkari-saffron hover:bg-sarkari-saffron-dark text-white px-8"
          >
            AI सहायता
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
