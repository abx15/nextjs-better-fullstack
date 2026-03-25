"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  HelpCircle,
  CheckCircle,
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      alert("आपका संदेश हम तक पहुंच गया है! हम जल्द ही आपसे संपर्क करेंगे।");
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "फोन",
      value: "1800-123-4567",
      description: "सोमवार से शुक्रवार, सुबह 9 बजे से शाम 7 बजे तक"
    },
    {
      icon: Mail,
      label: "ईमेल",
      value: "support@sarkarisaathi.in",
      description: "24/7 ईमेल समर्थन"
    },
    {
      icon: MapPin,
      label: "पता",
      value: "नई दिल्ली, भारत",
      description: "हेड ऑफिस: बी-25, अशोक विहार, फेज-1, नई दिल्ली"
    }
  ];

  const faqs = [
    {
      question: "मैं कैसे सरकारी योजनाओं के लिए आवेदन कर सकता हूं?",
      answer: "आप हमारी वेबसाइट पर जाकर अपनी प्रोफाइल बना सकते हैं, फिर उपयुक्त योजनाएं खोज सकते हैं और सीधे आवेदन कर सकते हैं।"
    },
    {
      question: "क्या सरकारी सैथी निःशुल्क है?",
      answer: "हां, सरकारी सैथी पूरी तरह से निःशुल्क है। हम केवल सत्यापित सरकारी स्रोतों से जानकारी प्रदान करते हैं।"
    },
    {
      question: "मुझे किसी योजना में मदद की आवश्यकता है, क्या करूं?",
      answer: "आप हमारे AI चैटबॉट का उपयोग कर सकते हैं या हमारे हेल्पलाइन पर कॉल कर सकते हैं। हमारी टीम आपकी मदद करेगी।"
    },
    {
      question: "आवेदन की स्थिति कैसे ट्रैक कर सकता हूं?",
      answer: "आप अपने डैशबोर्ड में 'आवेदन ट्रैकर' सेक्शन में जाकर अपने आवेदन की स्थिति रियल-टाइम में देख सकते हैं।"
    }
  ];

  return (
    <div className="min-h-screen bg-sarkari-bg">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="bg-navy-gradient text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-hindi">
              संपर्क करें
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto font-hindi">
              हमारी टीम से जुड़ें और अपने सवालों का हल पाएं। हम यहां आपकी सेवा में हैं।
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-6 lg:p-8 border-sarkari-navy-light/20">
              <h2 className="text-xl sm:text-2xl font-bold text-sarkari-navy mb-4 sm:mb-6 font-hindi">
                हमें संदेश भेजें
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-hindi">
                      पूरा नाम *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-sarkari-navy-light/30 focus:border-sarkari-saffron focus:ring-sarkari-saffron h-10 sm:h-12 text-sm sm:text-base"
                      placeholder="अपना पूरा नाम दर्ज करें"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-hindi">
                      ईमेल *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-sarkari-navy-light/30 focus:border-sarkari-saffron focus:ring-sarkari-saffron h-10 sm:h-12 text-sm sm:text-base"
                      placeholder="अपना ईमेल दर्ज करें"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-hindi">
                    फोन नंबर
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-sarkari-navy-light/30 focus:border-sarkari-saffron focus:ring-sarkari-saffron h-10 sm:h-12 text-sm sm:text-base"
                    placeholder="अपना फोन नंबर दर्ज करें"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-hindi">
                    विषय *
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="border-sarkari-navy-light/30 focus:border-sarkari-saffron focus:ring-sarkari-saffron h-10 sm:h-12 text-sm sm:text-base"
                    placeholder="अपना विषय दर्ज करें"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-hindi">
                    संदेश *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="border-sarkari-navy-light/30 focus:border-sarkari-saffron focus:ring-sarkari-saffron text-sm sm:text-base"
                    placeholder="अपना संदेश यहां लिखें..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sarkari-saffron hover:bg-sarkari-saffron-dark text-white py-2 sm:py-3 h-10 sm:h-12 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      भेजा रहे हैं...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      संदेश भेजें
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6 border-sarkari-navy-light/20">
              <h3 className="text-lg sm:text-xl font-semibold text-sarkari-navy mb-3 sm:mb-4 font-hindi">
                संपर्क जानकारी
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-sarkari-saffron mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-800 font-hindi text-sm sm:text-base">{info.label}</div>
                        <div className="text-gray-600 font-hindi text-sm sm:text-base">{info.value}</div>
                        <div className="text-xs sm:text-sm text-gray-500 font-hindi">{info.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-4 sm:p-6 border-sarkari-navy-light/20">
              <h3 className="text-lg sm:text-xl font-semibold text-sarkari-navy mb-3 sm:mb-4 font-hindi">
                कार्यकाली समय
              </h3>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-sarkari-saffron" />
                <div>
                  <div className="font-medium text-gray-800 font-hindi text-sm sm:text-base">सोमवार - शुक्रवार</div>
                  <div className="text-gray-600 font-hindi text-sm sm:text-base">सुबह 9:00 बजे - शाम 7:00 बजे</div>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-hindi">
                आपातकाल और छुट्टियों पर हम केवल ईमेल समर्थन प्रदान करते हैं।
              </div>
            </Card>

            <Card className="p-4 sm:p-6 border-sarkari-navy-light/20">
              <h3 className="text-lg sm:text-xl font-semibold text-sarkari-navy mb-3 sm:mb-4 font-hindi">
                हमें फॉलो करें
              </h3>
              <div className="flex gap-2 sm:gap-3">
                <a 
                  href="#" 
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-sarkari-navy text-white rounded-full flex items-center justify-center hover:bg-sarkari-saffron transition-colors"
                >
                  <Facebook className="w-3 h-3 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-sarkari-navy text-white rounded-full flex items-center justify-center hover:bg-sarkari-saffron transition-colors"
                >
                  <Twitter className="w-3 h-3 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-sarkari-navy text-white rounded-full flex items-center justify-center hover:bg-sarkari-saffron transition-colors"
                >
                  <Linkedin className="w-3 h-3 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-sarkari-navy text-white rounded-full flex items-center justify-center hover:bg-sarkari-saffron transition-colors"
                >
                  <Instagram className="w-3 h-3 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-sarkari-navy text-white rounded-full flex items-center justify-center hover:bg-sarkari-saffron transition-colors"
                >
                  <Youtube className="w-3 h-3 sm:w-5 sm:h-5" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sarkari-navy mb-3 sm:mb-4 font-hindi">
              अक्सर पूछे जाने वाले सवाल
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-hindi">
              आपके सामान्य सवालों के जवाब
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-4 sm:p-6 border-sarkari-navy-light/20">
                <div className="flex items-start gap-3 mb-2 sm:mb-3">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-sarkari-saffron mt-1 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-semibold text-sarkari-navy font-hindi">
                    {faq.question}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-hindi">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-navy-gradient text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-hindi">
            अभी शुरू करें
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 font-hindi">
            सरकारी योजनाओं का लाभ उठाने के लिए आज ही अपनी यात्रा शुरू करें
          </p>
          <Button 
            size="lg" 
            className="bg-sarkari-saffron hover:bg-sarkari-saffron-dark text-white px-6 sm:px-8 text-sm sm:text-base"
          >
            निःशुल्क साइन अप करें
          </Button>
        </div>
      </div>
    </div>
  );
}
