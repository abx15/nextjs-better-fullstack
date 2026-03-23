"use client";
import { useState } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Phone, 
  Video, 
  Download,
  ExternalLink,
  CheckCircle,
  Clock
} from "lucide-react";

interface TrainingSection {
  id: string;
  title: string;
  description: string;
  icon: any;
  items: TrainingItem[];
}

interface TrainingItem {
  id: string;
  title: string;
  description: string;
  type: "video" | "article" | "download";
  duration?: string;
  url?: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function OperatorHelpPage() {
  const [activeSection, setActiveSection] = useState("training");

  const trainingSections: TrainingSection[] = [
    {
      id: "basics",
      title: "SarkariSaathi कैसे use करें",
      description: "Complete guide to using SarkariSaathi platform",
      icon: BookOpen,
      items: [
        {
          id: "1",
          title: "Platform Overview",
          description: "Understanding the dashboard and navigation",
          type: "video",
          duration: "15 min",
        },
        {
          id: "2", 
          title: "Customer Registration",
          description: "How to register new customers",
          type: "video",
          duration: "10 min",
        },
        {
          id: "3",
          title: "Scheme Finding Process",
          description: "Step-by-step guide to finding schemes",
          type: "video",
          duration: "12 min",
        },
        {
          id: "4",
          title: "Application Tracking",
          description: "Managing and tracking applications",
          type: "article",
        },
      ],
    },
    {
      id: "schemes",
      title: "Popular Schemes Guide",
      description: "Detailed information about top government schemes",
      icon: FileText,
      items: [
        {
          id: "5",
          title: "PM-KISAN Complete Guide",
          description: "Eligibility, benefits, and application process",
          type: "article",
        },
        {
          id: "6",
          title: "Ayushman Bharat Explained",
          description: "Health insurance scheme details",
          type: "video",
          duration: "8 min",
        },
        {
          id: "7",
          title: "PM Awas Yojana Guide",
          description: "Housing scheme application process",
          type: "article",
        },
        {
          id: "8",
          title: "Ujjwala Yojana Details",
          description: "LPG connection scheme information",
          type: "download",
        },
      ],
    },
    {
      id: "documents",
      title: "Documents Guide",
      description: "Common documents required for scheme applications",
      icon: FileText,
      items: [
        {
          id: "9",
          title: "Aadhaar Card Guide",
          description: "How to obtain and use Aadhaar card",
          type: "article",
        },
        {
          id: "10",
          title: "Income Certificate Process",
          description: "Getting income certificate made",
          type: "video",
          duration: "6 min",
        },
        {
          id: "11",
          title: "Land Records Guide",
          description: "Understanding land records and documents",
          type: "article",
        },
        {
          id: "12",
          title: "Document Checklist",
          description: "Complete checklist of common documents",
          type: "download",
        },
      ],
    },
  ];

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I register a new customer?",
      answer: "Go to Customers page, click 'नया Customer' button, and fill the 3-step form with customer's personal, address, and profile details.",
      category: "Customer Management",
    },
    {
      id: "2",
      question: "What is the commission structure?",
      answer: "You earn ₹30 per successful application submitted. Additional bonuses: ₹500 for 50+ applications, ₹1,200 for 100+ applications, ₹2,500 for 200+ applications per month.",
      category: "Earnings",
    },
    {
      id: "3",
      question: "How do I find schemes for a customer?",
      answer: "Use the Scheme Finder page, select the customer, and click '🤖 AI से Match करें'. The system will show matched schemes based on customer profile.",
      category: "Scheme Finding",
    },
    {
      id: "4",
      question: "When do I get my commission?",
      answer: "Commission is processed within 7-10 days after the application is confirmed. Minimum withdrawal amount is ₹500.",
      category: "Earnings",
    },
    {
      id: "5",
      question: "How do I print scheme details?",
      answer: "In the Scheme Finder results, click the '📋 Print करें' button. This will open a print-friendly version in Hindi with all scheme details.",
      category: "Scheme Finding",
    },
    {
      id: "6",
      question: "What if a customer's application is rejected?",
      answer: "Check the rejection reason, help customer fix the issues, and reapply. Common issues include incomplete documents or incorrect information.",
      category: "Applications",
    },
    {
      id: "7",
      question: "How do I contact support?",
      answer: "Call our helpline at 1800-123-4567 (9 AM - 6 PM) or email support@sarkari-saathi.in. Emergency support available 24/7.",
      category: "Support",
    },
    {
      id: "8",
      question: "Can I work from home?",
      answer: "Yes, you can work from anywhere with internet access. The mobile app is also available for field work.",
      category: "General",
    },
  ];

  const supportContacts = [
    {
      type: "Helpline",
      number: "1800-123-4567",
      timing: "9 AM - 6 PM, Mon-Sat",
      description: "Technical and operational support",
    },
    {
      type: "Emergency",
      number: "1800-123-9999",
      timing: "24/7",
      description: "Critical issues and emergencies",
    },
    {
      type: "Email",
      number: "support@sarkari-saathi.in",
      timing: "Within 24 hours",
      description: "Non-urgent queries and documentation",
    },
    {
      type: "WhatsApp",
      number: "+91 9876543210",
      timing: "9 AM - 8 PM",
      description: "Quick questions and updates",
    },
  ];

  const getItemIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "article": return FileText;
      case "download": return Download;
      default: return FileText;
    }
  };

  return (
    <PageTransition>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Help & Training</h1>
          <p className="text-gray-600 mt-2">Learn how to use SarkariSaathi effectively and get support</p>
        </div>

        {/* Section Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeSection === "training" ? "default" : "ghost"}
            onClick={() => setActiveSection("training")}
            className="flex-1"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Training
          </Button>
          <Button
            variant={activeSection === "faq" ? "default" : "ghost"}
            onClick={() => setActiveSection("faq")}
            className="flex-1"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQs
          </Button>
          <Button
            variant={activeSection === "support" ? "default" : "ghost"}
            onClick={() => setActiveSection("support")}
            className="flex-1"
          >
            <Phone className="w-4 h-4 mr-2" />
            Support
          </Button>
        </div>

        {/* Training Section */}
        {activeSection === "training" && (
          <div className="space-y-8">
            {trainingSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{section.title}</h3>
                        <p className="text-sm text-gray-600">{section.description}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.items.map((item) => {
                        const ItemIcon = getItemIcon(item.type);
                        return (
                          <div key={item.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <ItemIcon className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {item.type}
                                </Badge>
                                {item.duration && (
                                  <Badge variant="outline" className="text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {item.duration}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* FAQ Section */}
        {activeSection === "faq" && (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <HelpCircle className="w-3 h-3 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Support Section */}
        {activeSection === "support" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportContacts.map((contact, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{contact.type}</h3>
                      <p className="text-lg font-medium text-orange-600 mb-1">{contact.number}</p>
                      <p className="text-sm text-gray-600 mb-2">{contact.timing}</p>
                      <p className="text-sm text-gray-500">{contact.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="md:col-span-2 border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Quick Resolution Guarantee</h3>
                    <p className="text-sm text-gray-600">We promise to resolve your issues quickly</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-gray-600">Issues resolved in first contact</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">2 hrs</div>
                    <div className="text-sm text-gray-600">Average response time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">24/7</div>
                    <div className="text-sm text-gray-600">Emergency support available</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
