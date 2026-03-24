"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Bookmark, 
  Search, 
  Filter,
  ExternalLink,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Trash2
} from "lucide-react";

export default function MySchemesPage() {
  const [schemes, setSchemes] = useState([
    {
      id: 1,
      name: "प्रधानमंत्री किसान सम्मान निधि योजना",
      category: "कृषि",
      status: "applied",
      appliedDate: "2024-01-15",
      deadline: "2024-03-31",
      benefit: "₹6,000 प्रति वर्ष",
      progress: 75
    },
    {
      id: 2,
      name: "प्रधानमंत्री आवास योजना",
      category: "आवास",
      status: "approved",
      appliedDate: "2024-01-10",
      deadline: "2024-02-28",
      benefit: "₹2.67 लाख तक",
      progress: 100
    },
    {
      id: 3,
      name: "राष्ट्रीय स्वास्थ्य बीमा योजना",
      category: "स्वास्थ्य",
      status: "pending",
      appliedDate: "2024-02-01",
      deadline: "2024-04-15",
      benefit: "₹5 लाख तक",
      progress: 25
    },
    {
      id: 4,
      name: "शिक्षा छात्रवृत्ति योजना",
      category: "शिक्षा",
      status: "rejected",
      appliedDate: "2024-01-20",
      deadline: "2024-02-15",
      benefit: "₹12,000 प्रति वर्ष",
      progress: 0,
      rejectionReason: "दस्तावेज़ अधूरे नहीं थे"
    }
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSchemes = schemes.filter(scheme => {
    const matchesFilter = filter === "all" || scheme.status === filter;
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      applied: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800"
    };
    
    const labels = {
      applied: "आवेदन किया गया",
      approved: "स्वीकृति",
      pending: "लंबित",
      rejected: "अस्वीकृत"
    };

    return (
      <Badge className={styles[status as keyof typeof styles]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied": return <Clock className="w-4 h-4" />;
      case "approved": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <AlertCircle className="w-4 h-4" />;
      case "rejected": return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">मेरी योजनाएं</h1>
          <p className="text-gray-600">जिन योजनाओं के लिए आपने आवेदन किया है</p>
        </div>

        {/* Filters and Search */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="योजनाएं खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                सभी ({schemes.length})
              </Button>
              <Button
                variant={filter === "applied" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("applied")}
              >
                आवेदन किया गया
              </Button>
              <Button
                variant={filter === "approved" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("approved")}
              >
                स्वीकृति
              </Button>
              <Button
                variant={filter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("pending")}
              >
                लंबित
              </Button>
              <Button
                variant={filter === "rejected" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("rejected")}
              >
                अस्वीकृत
              </Button>
            </div>
          </div>
        </Card>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {scheme.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{scheme.category}</Badge>
                    {getStatusBadge(scheme.status)}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">लाभ:</span>
                  <span className="font-medium text-green-600">{scheme.benefit}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">आवेदन तिथि:</span>
                  <span className="font-medium">{scheme.appliedDate}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">अंतिम तिथि:</span>
                  <span className="font-medium">{scheme.deadline}</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">प्रगति</span>
                    <span className="font-medium">{scheme.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        scheme.status === "approved" ? "bg-green-500" :
                        scheme.status === "rejected" ? "bg-red-500" :
                        scheme.status === "pending" ? "bg-yellow-500" :
                        "bg-blue-500"
                      }`}
                      style={{ width: `${scheme.progress}%` }}
                    />
                  </div>
                </div>

                {/* Rejection Reason */}
                {scheme.status === "rejected" && scheme.rejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-red-800">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">अस्वीकृति का कारण:</span>
                    </div>
                    <p className="text-red-700 text-sm mt-1">{scheme.rejectionReason}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3 border-t">
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    विवरण देखें
                  </Button>
                  {scheme.status === "pending" && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      रिमाइंडर सेट करें
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSchemes.length === 0 && (
          <Card className="p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              कोई योजना नहीं मिली
            </h3>
            <p className="text-gray-600">
              {searchTerm || filter !== "all" 
                ? "आपकी खोज से मेल खाने वाली कोई योजना नहीं मिली।"
                : "आपने अभी तक कोई योजना के लिए आवेदन नहीं किया है।"
              }
            </p>
            <Button className="mt-4">
              योजनाएं खोजें
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
