"use client";
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  User,
  FileText,
  Printer,
  CheckCircle,
  ArrowRight,
  Brain
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Customer {
  id: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  occupation: string;
  annualIncome: string;
  category: string;
  education: string;
  familySize: string;
}

interface Scheme {
  id: string;
  name: string;
  nameHindi: string;
  category: string;
  benefit: string;
  benefitHindi: string;
  eligibility: string[];
  eligibilityHindi: string[];
  documents: string[];
  documentsHindi: string[];
  applicationMode: string;
  difficulty: string;
  deadline?: string;
  isMatched: boolean;
  matchScore?: number;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Ramesh Kumar",
    phone: "+91 9876543210",
    state: "Uttar Pradesh",
    district: "Lucknow",
    occupation: "farmer",
    annualIncome: "1-3lakh",
    category: "obc",
    education: "secondary",
    familySize: "5-7",
  },
  {
    id: "2",
    name: "Sunita Devi",
    phone: "+91 9876543211",
    state: "Bihar",
    district: "Patna",
    occupation: "homemaker",
    annualIncome: "0-1lakh",
    category: "sc",
    education: "primary",
    familySize: "2-4",
  },
];

const mockSchemes: Scheme[] = [
  {
    id: "1",
    name: "PM-KISAN",
    nameHindi: "पीएम-किसान",
    category: "Agriculture",
    benefit: "₹6,000 per year financial assistance",
    benefitHindi: "प्रति वर्ष ₹6,000 की वित्तीय सहायता",
    eligibility: ["Farmer", "Small/Marginal farmers", "Land ownership"],
    eligibilityHindi: ["किसान", "छोटे/सीमांत किसान", "भूमि स्वामित्व"],
    documents: ["Aadhaar", "Land records", "Bank account"],
    documentsHindi: ["आधार कार्ड", "भूमि रिकॉर्ड", "बैंक खाता"],
    applicationMode: "Online",
    difficulty: "Easy",
    isMatched: true,
    matchScore: 95,
  },
  {
    id: "2",
    name: "Ayushman Bharat",
    nameHindi: "आयुष्मान भारत",
    category: "Healthcare",
    benefit: "₹5 lakh health insurance per family",
    benefitHindi: "प्रति परिवार ₹5 लाख स्वास्थ्य बीमा",
    eligibility: ["BPL families", "No income tax assessment", "Rural/Urban poor"],
    eligibilityHindi: ["बीपीएल परिवार", "आयकर मूल्यांकन नहीं", "ग्रामीण/शहरी गरीब"],
    documents: ["Aadhaar", "Ration card", "Income proof"],
    documentsHindi: ["आधार कार्ड", "राशन कार्ड", "आय प्रमाण"],
    applicationMode: "Online",
    difficulty: "Easy",
    isMatched: true,
    matchScore: 88,
  },
  {
    id: "3",
    name: "PM Awas Yojana",
    nameHindi: "पीएम आवास योजना",
    category: "Housing",
    benefit: "Housing subsidy up to ₹2.67 lakh",
    benefitHindi: "आवास सब्सिडी तक ₹2.67 लाख",
    eligibility: ["No pucca house", "Income criteria", "Adult member"],
    eligibilityHindi: ["कोई पक्का मकान नहीं", "आय मानदंड", "वयस्क सदस्य"],
    documents: ["Aadhaar", "Income proof", "Land documents"],
    documentsHindi: ["आधार कार्ड", "आय प्रमाण", "भूमि दस्तावेज"],
    applicationMode: "Both",
    difficulty: "Medium",
    isMatched: false,
    matchScore: 72,
  },
];

export default function OperatorSchemeFinder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);

  useEffect(() => {
    const customerId = searchParams.get("customer");
    if (customerId) {
      setSelectedCustomerId(customerId);
      const customer = mockCustomers.find(c => c.id === customerId);
      if (customer) {
        setSelectedCustomer(customer);
        setCurrentStep(2);
        findSchemesForCustomer(customer);
      }
    }
  }, [searchParams]);

  const findSchemesForCustomer = async (customer: Customer) => {
    setLoading(true);
    try {
      // Simulate API call to find matching schemes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock AI matching logic
      const matchedSchemes = mockSchemes.map(scheme => {
        let score = 50; // Base score
        
        // Category matching
        if (customer.category === "sc" || customer.category === "st") score += 20;
        
        // Income matching
        if (customer.annualIncome === "0-1lakh" || customer.annualIncome === "1-3lakh") score += 15;
        
        // Occupation matching
        if (scheme.category === "Agriculture" && customer.occupation === "farmer") score += 25;
        if (scheme.category === "Healthcare" && customer.annualIncome === "0-1lakh") score += 20;
        
        // Education level
        if (scheme.difficulty === "Easy" && customer.education === "primary") score += 10;
        
        return {
          ...scheme,
          isMatched: score >= 70,
          matchScore: score,
        };
      });
      
      setSchemes(matchedSchemes);
      setFilteredSchemes(matchedSchemes);
    } catch (error) {
      console.error("Error finding schemes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSelect = (customerId: string) => {
    const customer = mockCustomers.find(c => c.id === customerId);
    if (customer) {
      setSelectedCustomer(customer);
      setSelectedCustomerId(customerId);
      setCurrentStep(2);
      findSchemesForCustomer(customer);
    }
  };

  const handleAIMatch = async () => {
    if (!selectedCustomer) return;
    setLoading(true);
    await findSchemesForCustomer(selectedCustomer);
  };

  const handlePrintScheme = (scheme: Scheme) => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1a3a6b; margin: 0;">🏛️ SarkariSaathi</h1>
          <p style="color: #666; margin: 5px 0;">सरकारी योजनाएं अब आसान</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #FF6B00; margin: 0 0 10px 0;">${scheme.nameHindi}</h2>
          <p style="color: #333; margin: 0; font-size: 18px; font-weight: bold;">${scheme.name}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1a3a6b; border-bottom: 2px solid #1a3a6b; padding-bottom: 5px;">लाभ / Benefit</h3>
          <p style="color: #333; margin: 10px 0; font-size: 16px;">${scheme.benefitHindi}</p>
          <p style="color: #666; margin: 5px 0; font-style: italic;">${scheme.benefit}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1a3a6b; border-bottom: 2px solid #1a3a6b; padding-bottom: 5px;">पात्रता / Eligibility</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            ${scheme.eligibilityHindi.map(elig => `<li style="margin: 5px 0; color: #333;">${elig}</li>`).join('')}
          </ul>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1a3a6b; border-bottom: 2px solid #1a3a6b; padding-bottom: 5px;">आवश्यक दस्तावेज़ / Required Documents</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            ${scheme.documentsHindi.map(doc => `<li style="margin: 5px 0; color: #333;">${doc}</li>`).join('')}
          </ul>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1a3a6b; border-bottom: 2px solid #1a3a6b; padding-bottom: 5px;">आवेदन कैसे करें / How to Apply</h3>
          <p style="color: #333; margin: 10px 0;">
            <strong>मोड:</strong> ${scheme.applicationMode === "Online" ? "ऑनलाइन" : scheme.applicationMode === "Offline" ? "ऑफलाइन" : "दोनों"}
          </p>
          <p style="color: #333; margin: 10px 0;">
            <strong>कठिनाई स्तर:</strong> ${scheme.difficulty === "Easy" ? "आसान" : scheme.difficulty === "Medium" ? "मध्यम" : "कठिन"}
          </p>
          ${scheme.deadline ? `<p style="color: #333; margin: 10px 0;"><strong>अंतिम तिथि:</strong> ${scheme.deadline}</p>` : ''}
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 30px;">
          <p style="margin: 0; color: #856404; text-align: center;">
            <strong>महत्वपूर्ण:</strong> CSC Operator की सहायता से आवेदन करें
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            SarkariSaathi द्वारा • ${new Date().toLocaleDateString('hi-IN')}
          </p>
        </div>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleApplyScheme = (schemeId: string) => {
    // Navigate to application tracker with scheme and customer
    router.push(`/operator/applications/new?scheme=${schemeId}&customer=${selectedCustomerId}`);
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = schemes.filter(scheme => 
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.nameHindi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSchemes(filtered);
    } else {
      setFilteredSchemes(schemes);
    }
  }, [searchTerm, schemes]);

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">किस customer के लिए योजनाएं खोजें?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="नाम या मोबाइल नंबर से खोजें"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-3">
          {mockCustomers
            .filter(customer => 
              customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              customer.phone.includes(searchTerm)
            )
            .map((customer) => (
              <div
                key={customer.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedCustomerId === customer.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleCustomerSelect(customer.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                      <p className="text-sm text-gray-600">{customer.phone}</p>
                      <p className="text-xs text-gray-500">
                        {customer.district}, {customer.state} • {customer.occupation}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
        </div>

        {selectedCustomer && (
          <div className="border-t pt-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Selected Customer</h3>
              <div className="text-sm text-gray-600">
                <p><strong>Name:</strong> {selectedCustomer.name}</p>
                <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                <p><strong>Location:</strong> {selectedCustomer.district}, {selectedCustomer.state}</p>
                <p><strong>Occupation:</strong> {selectedCustomer.occupation}</p>
                <p><strong>Income:</strong> {selectedCustomer.annualIncome}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {selectedCustomer?.name} - सूचीबद्ध योजनाएं
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="योजनाओं में खोजें..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={handleAIMatch}
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Brain className="w-4 h-4 mr-2" />
              🤖 AI से Match करें
            </Button>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">AI matching schemes for customer...</p>
            </div>
          )}

          {!loading && filteredSchemes.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No schemes found</h3>
              <p className="text-gray-500">Try adjusting your search or criteria</p>
            </div>
          )}

          {!loading && filteredSchemes.length > 0 && (
            <div className="space-y-4">
              {filteredSchemes.map((scheme) => (
                <Card key={scheme.id} className={`border-l-4 ${
                  scheme.isMatched ? "border-green-500" : "border-gray-300"
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{scheme.nameHindi}</h3>
                          {scheme.isMatched && (
                            <Badge className="bg-green-100 text-green-800">
                              ✅ Matched ({scheme.matchScore}%)
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{scheme.name}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">लाभ:</h4>
                            <p className="text-sm text-gray-600">{scheme.benefitHindi}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Benefit:</h4>
                            <p className="text-sm text-gray-600">{scheme.benefit}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline">{scheme.category}</Badge>
                          <Badge variant="outline">{scheme.applicationMode}</Badge>
                          <Badge variant={scheme.difficulty === "Easy" ? "default" : "secondary"}>
                            {scheme.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePrintScheme(scheme)}
                      >
                        <Printer className="w-4 h-4 mr-2" />
                        📋 Print करें
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApplyScheme(scheme.id)}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        ✅ Apply किया
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <PageTransition>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Scheme Finder</h1>
          <p className="text-gray-600 mt-2">Find and apply for government schemes for your customers</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step === currentStep
                    ? "bg-orange-600 text-white"
                    : step < currentStep
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}>
                  {step < currentStep ? "✓" : step}
                </div>
                {step < 2 && (
                  <div className={`w-12 h-1 mx-2 transition-colors ${
                    step < currentStep ? "bg-green-600" : "bg-gray-300"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={() => {
              if (currentStep === 2) {
                setCurrentStep(1);
                setSelectedCustomer(null);
                setSelectedCustomerId("");
              }
            }}
            disabled={currentStep === 1}
          >
            ← Back
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
