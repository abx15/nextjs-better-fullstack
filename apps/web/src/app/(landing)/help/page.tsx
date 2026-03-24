"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  Search, 
  Phone, 
  Mail, 
  MessageCircle,
  BookOpen,
  FileText,
  Video,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Send,
  Headphones
} from "lucide-react";

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "सभी", icon: HelpCircle },
    { id: "account", name: "खाता", icon: Users },
    { id: "schemes", name: "योजनाएं", icon: BookOpen },
    { id: "application", name: "आवेदन", icon: FileText },
    { id: "technical", name: "तकनीकी", icon: Video },
  ];

  const faqs = [
    {
      category: "account",
      question: "मैं अपना खाता कैसे बनाऊं?",
      answer: "रजिस्टर पेज पर जाएं, अपनी बुनियादी जानकारी भरें और ईमेल सत्यापन करें। प्रक्रिया में केवल 2 मिनट लगते हैं।",
      popular: true
    },
    {
      category: "schemes",
      question: "मैं उपयुक्त योजनाएं कैसे खोजूं?",
      answer: "अपनी प्रोफाइल पूरी करें और योजना खोजकर्ता का उपयोग करें। AI आपकी प्रोफाइल के अनुसार सबसे उपयुक्त योजनाएं सुझाएगा।",
      popular: true
    },
    {
      category: "application",
      question: "आवेदन की स्थिति कैसे देखें?",
      answer: "डैशबोर्ड में 'आवेदन ट्रैकर' पर जाएं। आप अपने सभी आवेदनों की वास्तविक समय स्थिति देख सकते हैं।",
      popular: true
    },
    {
      category: "account",
      question: "पासवर्ड कैसे बदलें?",
      answer: "सेटिंग्स > खाता सेटिंग्स में जाकर 'पासवर्ड बदलें' विकल्प पर क्लिक करें और निर्देशों का पालन करें।"
    },
    {
      category: "schemes",
      question: "क्या सेवाएं मुफ्त हैं?",
      answer: "हां, सरकारी सैथी की सभी मूल सेवाएं पूरी तरह मुफ्त हैं। हम कोई छिपी हुई फीस नहीं लेते हैं।"
    },
    {
      category: "technical",
      question: "वेबसाइट धीरे क्यों चल रही है?",
      answer: "धीमी गति इंटरनेट कनेक्शन या ब्राउज़र कैश के कारण हो सकती है। कैश साफ़ करें और फिर से कोशिश करें।"
    },
    {
      category: "application",
      question: "आवेदन रद्द कैसे करें?",
      answer: "आवेदन ट्रैकर में उस आवेदन को खोजें जिसे आप रद्द करना चाहते हैं और 'रद्द करें' बटन पर क्लिक करें।"
    },
    {
      category: "schemes",
      question: "नई योजनाओं की सूचना कैसे मिलेगी?",
      answer: "सेटिंग्स में सूचनाएं चालू करें। हम आपको ईमेल और SMS के माध्यम से नई योजनाओं की सूचना देंगे।"
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const helpArticles = [
    {
      title: "शुरुआती गाइड",
      description: "सरकारी सैथी का उपयोग शुरू करने के लिए पूरी गाइड",
      icon: BookOpen,
      readTime: "5 मिनट",
      category: "गाइड"
    },
    {
      title: "प्रोफाइल कैसे बनाएं",
      description: "अपनी प्रोफाइल पूरी करने का तरीका",
      icon: Users,
      readTime: "3 मिनट",
      category: "ट्यूटोरियल"
    },
    {
      title: "योजना आवेदन प्रक्रिया",
      description: "सरकारी योजनाओं के लिए आवेदन करने का पूरा प्रोसेस",
      icon: FileText,
      readTime: "7 मिनट",
      category: "प्रक्रिया"
    },
    {
      title: "वीडियो ट्यूटोरियल",
      description: "चरण-दर-चरण वीडियो गाइड",
      icon: Video,
      readTime: "10 मिनट",
      category: "वीडियो"
    }
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: "फोन सहायता",
      description: "1800-123-4567",
      timing: "सोम-शुक्र, 9AM - 6PM",
      action: "कॉल करें"
    },
    {
      icon: MessageCircle,
      title: "लाइव चैट",
      description: "तुरंत सहायता",
      timing: "24/7 उपलब्ध",
      action: "चैट करें"
    },
    {
      icon: Mail,
      title: "ईमेल सहायता",
      description: "support@sarkarisaathi.in",
      timing: "24 घंटे में जवाब",
      action: "ईमेल करें"
    },
    {
      icon: Headphones,
      title: "वीडियो कॉल",
      description: "व्यक्तिगत सहायता",
      timing: "अपॉइंटमेंट पर",
      action: "बुक करें"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-6">
              सहायता केंद्र
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              हम आपकी मदद के लिए यहां हैं। कोई भी प्रश्न हो, हमें पूछें।
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="अपना प्रश्न खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-white/70"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Help */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-blue-600 font-medium mb-1">
                  {option.description}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {option.timing}
                </p>
                <Button size="sm" className="w-full">
                  {option.action}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                अक्सर पूछे जाने वाले प्रश्न
              </h2>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <Card key={index} className="p-6 border-0 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-blue-600 mt-1" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {faq.question}
                          </h3>
                          {faq.popular && (
                            <Badge className="bg-orange-100 text-orange-800 text-xs mb-2">
                              लोकप्रिय
                            </Badge>
                          )}
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <Card className="p-12 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  कोई परिणाम नहीं मिला
                </h3>
                <p className="text-gray-600">
                  आपकी खोज से मेल खाने वाला कोई प्रश्न नहीं मिला। कृपया अन्य खोजशब्द आज़माएं।
                </p>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Help Articles */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                सहायता लेख
              </h3>
              <div className="space-y-4">
                {helpArticles.map((article, index) => {
                  const Icon = article.icon;
                  return (
                    <Card key={index} className="p-4 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {article.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {article.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Still Need Help */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                अभी भी मदद चाहिए?
              </h3>
              <p className="text-gray-700 mb-6">
                हमारी सहायता टीम आपकी सेवा में है। आप हमसे सीधे संपर्क कर सकते हैं।
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                सहायता टीम से बात करें
              </Button>
            </Card>

            {/* Community */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                समुदाय में शामिल हों
              </h3>
              <p className="text-gray-700 mb-4">
                अन्य उपयोगकर्ताओं के साथ अनुभव साझा करें और सीखें।
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  फोरम में शामिल हों
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp ग्रुप
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              हमें संदेश भेजें
            </h2>
            <p className="text-lg text-gray-600">
              कोई भी प्रश्न या सुझाव हो तो हमें बताएं
            </p>
          </div>

          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  नाम
                </label>
                <Input placeholder="आपका नाम" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ईमेल
                </label>
                <Input type="email" placeholder="आपका ईमेल" />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                विषय
              </label>
              <Input placeholder="आपका प्रश्न का विषय" />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                संदेश
              </label>
              <textarea
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="अपना संदेश यहां लिखें..."
              />
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                हम 24 घंटे के भीतर जवाब देंगे
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                संदेश भेजें
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
