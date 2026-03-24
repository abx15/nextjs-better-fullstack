"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Download,
  Share2,
  Bookmark,
  Clock,
  IndianRupee,
  Building
} from "lucide-react";

export default function SchemeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [scheme, setScheme] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Fetch scheme details
    const fetchScheme = async () => {
      try {
        // Mock data for now
        const mockScheme = {
          id: params.id,
          nameHindi: "प्रधानमंत्री किसान सम्मान निधि योजना",
          nameEnglish: "Pradhan Mantri Kisan Samman Nidhi Yojana",
          descriptionHindi: "यह योजना छोटे और सीमांत किसानों को वित्तीय सहायता प्रदान करती है। पात्र किसानों को प्रति वर्ष 6,000 रुपये की तीन किस्तों में दिए जाते हैं।",
          descriptionEnglish: "This scheme provides financial assistance to small and marginal farmers. Eligible farmers receive Rs. 6,000 per year in three installments.",
          category: "कृषि",
          subcategory: "वित्तीय सहायता",
          level: "केंद्रीय",
          ministry: "कृषि एवं किसान कल्याण मंत्रालय",
          ministryHindi: "कृषि एवं किसान कल्याण मंत्रालय",
          benefitType: "प्रत्यक्ष लाभ अंतरण",
          benefitAmount: "₹6,000 प्रति वर्ष",
          benefitAmountHindi: "₹6,000 प्रति वर्ष",
          maxBenefit: 6000,
          eligibilityCriteria: {
            smallMarginalFarmer: true,
            landHolding: "≤ 2 हेक्टेयर",
            age: "18 वर्ष या अधिक",
            residency: "भारतीय नागरिक",
            incomeTax: "आयकर दाता नहीं होना चाहिए"
          },
          documentsRequired: [
            "आधार कार्ड",
            "भूमि रिकॉर्ड",
            "बैंक खाता पासबुक",
            "पहचान प्रमाण पत्र",
            "निवास प्रमाण पत्र"
          ],
          applicationMode: "ऑनलाइन और ऑफलाइन",
          applicationUrl: "https://pmkisan.gov.in",
          offlineProcess: "नजदीकी CSC केंद्र या कृषि विभाग कार्यालय में आवेदन करें",
          offlineProcessHindi: "नजदीकी CSC केंद्र या कृषि विभाग कार्यालय में आवेदन करें",
          deadline: null,
          isOngoing: true,
          difficulty: "आसान",
          tags: ["किसान", "वित्तीय सहायता", "DBT", "केंद्र सरकार"],
          totalBeneficiaries: 110000000,
          viewCount: 15420,
          applyCount: 8750,
          isActive: true,
          isVerified: true,
          createdAt: "2024-01-15T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z"
        };
        
        setScheme(mockScheme);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch scheme:", error);
        setLoading(false);
      }
    };

    if (params.id) {
      fetchScheme();
    }
  }, [params.id]);

  const handleApply = async () => {
    // Handle application logic
    router.push("/dashboard/tracker");
  };

  const handleSave = async () => {
    setIsSaved(!isSaved);
    // Handle save logic
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: scheme?.nameHindi,
        text: scheme?.descriptionHindi,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">योजना नहीं मिली</h2>
          <p className="text-gray-600 mb-4">आप जो योजना ढूंढ रहे हैं वह उपलब्ध नहीं है</p>
          <Button onClick={() => router.back()}>वापस जाएं</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                वापस
              </Button>
              <div>
                <Badge variant="secondary" className="mb-1">
                  {scheme.category}
                </Badge>
                <h1 className="text-2xl font-bold text-gray-900">
                  {scheme.nameHindi}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                शेयर
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className={`flex items-center gap-2 ${isSaved ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600 text-blue-600' : ''}`} />
                {isSaved ? 'सहेजा गया' : 'सहेजें'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scheme Overview */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">योजना का विवरण</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {scheme.descriptionHindi}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {scheme.descriptionEnglish}
              </p>
            </Card>

            {/* Benefits */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-green-600" />
                लाभ और राशि
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="text-2xl font-bold text-green-800 mb-2">
                  {scheme.benefitAmountHindi}
                </div>
                <p className="text-green-700 text-sm">
                  {scheme.benefitType}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">कुल लाभार्थी:</span>
                  <span className="font-medium">
                    {(scheme.totalBeneficiaries / 10000000).toFixed(1)} करोड़+
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">आवेदन:</span>
                  <span className="font-medium">{scheme.applyCount.toLocaleString('hi-IN')}</span>
                </div>
              </div>
            </Card>

            {/* Eligibility Criteria */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">पात्रता मानदंड</h2>
              <div className="space-y-3">
                {Object.entries(scheme.eligibilityCriteria).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {key === 'smallMarginalFarmer' && 'छोटे और सीमांत किसान'}
                        {key === 'landHolding' && 'भूमि होल्डिंग'}
                        {key === 'age' && 'आयु'}
                        {key === 'residency' && 'निवास'}
                        {key === 'incomeTax' && 'आयकर स्थिति'}
                      </p>
                      <p className="text-gray-600 text-sm">{value as string}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Required Documents */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                आवश्यक दस्तावेज़
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scheme.documentsRequired.map((doc: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Application Process */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">आवेदन प्रक्रिया</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">दस्तावेज़ तैयार करें</p>
                    <p className="text-sm text-gray-600">सभी आवश्यक दस्तावेज़ों की प्रतियां तैयार करें</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">आवेदन पत्र भरें</p>
                    <p className="text-sm text-gray-600">ऑनलाइन या ऑफलाइन आवेदन पत्र भरें</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">जमा करें</p>
                    <p className="text-sm text-gray-600">आवेदन पत्र और दस्तावेज़ जमा करें</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">4</span>
                  </div>
                  <div>
                    <p className="font-medium">प्रतीक्षा करें</p>
                    <p className="text-sm text-gray-600">सत्यापन प्रक्रिया के लिए प्रतीक्षा करें</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    ऑनलाइन आवेदन
                  </h3>
                  <Link href={scheme.applicationUrl} target="_blank" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                    यहां आवेदन करें
                  </Link>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    ऑफलाइन आवेदन
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {scheme.offlineProcessHindi}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">त्वरित जानकारी</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">विभाग</span>
                  <span className="text-sm font-medium">{scheme.ministryHindi}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">स्तर</span>
                  <Badge variant="outline">{scheme.level}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">श्रेणी</span>
                  <span className="text-sm font-medium">{scheme.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">कठिनाई</span>
                  <Badge className={
                    scheme.difficulty === 'आसान' ? 'bg-green-100 text-green-800' :
                    scheme.difficulty === 'मध्यम' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {scheme.difficulty}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">स्थिति</span>
                  <Badge className="bg-green-100 text-green-800">
                    सक्रिय
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Important Dates */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                महत्वपूर्ण तिथियां
              </h3>
              <div className="space-y-3">
                {scheme.isOngoing ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">चल रही योजना</span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    <p>अंतिम तिथि: {scheme.deadline}</p>
                  </div>
                )}
                <div className="text-sm text-gray-600">
                  <p>अंतिम अपडेट: {new Date(scheme.updatedAt).toLocaleDateString('hi-IN')}</p>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <h3 className="font-semibold mb-4">अभी आवेदन करें</h3>
              <div className="space-y-3">
                <Button 
                  onClick={handleApply}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  आवेदन करें
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/dashboard/tracker')}
                >
                  आवेदन स्थिति देखें
                </Button>
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Building className="w-4 h-4" />
                संपर्क जानकारी
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <strong>टोल फ्री नंबर:</strong> 1800-11-0000
                </p>
                <p className="text-gray-700">
                  <strong>ईमेल:</strong> support@pmkisan.gov.in
                </p>
                <p className="text-gray-700">
                  <strong>वेबसाइट:</strong> www.pmkisan.gov.in
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
