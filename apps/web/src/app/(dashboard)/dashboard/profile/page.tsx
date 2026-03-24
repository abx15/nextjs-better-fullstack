"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit,
  Save,
  X,
  Shield,
  Globe,
  FileText,
  Download
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "राज कुमार",
    email: "raj.kumar@example.com",
    phone: "+91 9876543210",
    state: "बिहार",
    district: "पटना",
    pincode: "800001",
    age: 28,
    gender: "पुरुष",
    caste: "अन्य पिछड़ा वर्ग",
    religion: "हिंदू",
    annualIncome: 300000,
    bplCard: false,
    rationCardType: "एपीएल",
    occupation: "छात्र",
    educationLevel: "स्नातक",
    isProfileComplete: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">मेरी प्रोफाइल</h1>
            <p className="text-gray-600 mt-1">अपनी जानकारी देखें और अपडेट करें</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "सहेजा जा रहा है..." : "सहेजें"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  रद्द करें
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                संपादित करें
              </Button>
            )}
          </div>
        </div>

        {/* Profile Completion Status */}
        <Card className="p-6 mb-6 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">प्रोफाइल स्थिति</h3>
                <p className="text-sm text-gray-600">आपकी प्रोफाइल 100% पूर्ण है</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              सत्यापित
            </Badge>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                व्यक्तिगत जानकारी
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">पूरा नाम</Label>
                  {isEditing ? (
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium">{profile.name}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">ईमेल</Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {profile.email}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">फोन नंबर</Label>
                  {isEditing ? (
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {profile.phone}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">आयु</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {profile.age} वर्ष
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">लिंग</Label>
                  {isEditing ? (
                    <select
                      value={profile.gender}
                      onChange={(e) => setProfile({...profile, gender: e.target.value})}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="पुरुष">पुरुष</option>
                      <option value="महिला">महिला</option>
                      <option value="अन्य">अन्य</option>
                    </select>
                  ) : (
                    <p className="font-medium">{profile.gender}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">जाति</Label>
                  {isEditing ? (
                    <select
                      value={profile.caste}
                      onChange={(e) => setProfile({...profile, caste: e.target.value})}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="अन्य पिछड़ा वर्ग">अन्य पिछड़ा वर्ग</option>
                      <option value="अनुसूचित जाति">अनुसूचित जाति</option>
                      <option value="अनुसूचित जनजाति">अनुसूचित जनजाति</option>
                      <option value="सामान्य">सामान्य</option>
                    </select>
                  ) : (
                    <p className="font-medium">{profile.caste}</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Address Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                पता जानकारी
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">राज्य</Label>
                  {isEditing ? (
                    <Input
                      value={profile.state}
                      onChange={(e) => setProfile({...profile, state: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium">{profile.state}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">जिला</Label>
                  {isEditing ? (
                    <Input
                      value={profile.district}
                      onChange={(e) => setProfile({...profile, district: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium">{profile.district}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">पिनकोड</Label>
                  {isEditing ? (
                    <Input
                      value={profile.pincode}
                      onChange={(e) => setProfile({...profile, pincode: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium">{profile.pincode}</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Socio-Economic Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                सामाजिक-आर्थिक जानकारी
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">वार्षिक आय</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={profile.annualIncome}
                      onChange={(e) => setProfile({...profile, annualIncome: parseInt(e.target.value)})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium">₹{profile.annualIncome.toLocaleString('hi-IN')}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">व्यवसाय</Label>
                  {isEditing ? (
                    <Input
                      value={profile.occupation}
                      onChange={(e) => setProfile({...profile, occupation: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium">{profile.occupation}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">शिक्षा स्तर</Label>
                  {isEditing ? (
                    <select
                      value={profile.educationLevel}
                      onChange={(e) => setProfile({...profile, educationLevel: e.target.value})}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="8वीं तक">8वीं तक</option>
                      <option value="10वीं">10वीं</option>
                      <option value="12वीं">12वीं</option>
                      <option value="स्नातक">स्नातक</option>
                      <option value="स्नातकोत्तर">स्नातकोत्तर</option>
                    </select>
                  ) : (
                    <p className="font-medium">{profile.educationLevel}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">राशन कार्ड प्रकार</Label>
                  {isEditing ? (
                    <select
                      value={profile.rationCardType}
                      onChange={(e) => setProfile({...profile, rationCardType: e.target.value})}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="एपीएल">एपीएल</option>
                      <option value="बीपीएल">बीपीएल</option>
                      <option value="एएवाई">एएवाई</option>
                    </select>
                  ) : (
                    <p className="font-medium">{profile.rationCardType}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">त्वरित कार्य</h3>
              <div className="space-y-3">
                <Link href="/dashboard/profile/setup">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="w-4 h-4 mr-2" />
                    प्रोफाइल अपडेट करें
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  प्रोफाइल डाउनलोड करें
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="w-4 h-4 mr-2" />
                  भाषा बदलें
                </Button>
              </div>
            </Card>

            {/* Document Status */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">दस्तावेज़ स्थिति</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">आधार कार्ड</span>
                  <Badge className="bg-green-100 text-green-800">अपलोडेड</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">पैन कार्ड</span>
                  <Badge className="bg-green-100 text-green-800">अपलोडेड</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">वोटर आईडी</span>
                  <Badge className="bg-yellow-100 text-yellow-800">लंबित</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">राशन कार्ड</span>
                  <Badge className="bg-green-100 text-green-800">अपलोडेड</Badge>
                </div>
              </div>
            </Card>

            {/* Eligibility Score */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <h3 className="font-semibold mb-2">पात्रता स्कोर</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">85/100</div>
              <p className="text-sm text-gray-600">
                आप 15 योजनाओं के लिए पात्र हैं
              </p>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                योजनाएँ देखें
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
