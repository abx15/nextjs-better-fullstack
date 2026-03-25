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
  Building,
  Users,
  TrendingUp,
  Award,
  CheckCircle
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function OperatorProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    name: "ऑपरेटर नाम",
    email: "operator@csc.in",
    phone: "+91 9876543210",
    centerName: "शिवाजी CSC सेंटर",
    cscId: "CSC-BIHAR-1234",
    state: "बिहार",
    district: "पटना",
    address: "गाँव - मानेर, पोस्ट - मानेर, जिला - पटना",
    isVerified: true,
    totalEarnings: 45670.50,
    customersServed: 127,
    applicationsProcessed: 89,
    operatorSince: "2023-06-15",
    rating: 4.8
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Implement API call to update operator profile
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ऑपरेटर प्रोफाइल</h1>
            <p className="text-gray-600 mt-1">CSC ऑपरेटर जानकारी और प्रदर्शन</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Operator Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                ऑपरेटर जानकारी
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
                  <Label className="text-sm text-gray-600">CSC ID</Label>
                  <p className="font-medium flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    {profile.cscId}
                  </p>
                </div>
              </div>
            </Card>

            {/* Center Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                सेंटर जानकारी
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">सेंटर का नाम</Label>
                  {isEditing ? (
                    <Input
                      value={profile.centerName}
                      onChange={(e) => setProfile({...profile, centerName: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium">{profile.centerName}</p>
                  )}
                </div>
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
                  <Label className="text-sm text-gray-600">सत्यापन स्थिति</Label>
                  <div className="mt-1">
                    {profile.isVerified ? (
                      <Badge className="bg-green-100 text-green-800 flex items-center gap-1 w-fit">
                        <CheckCircle className="w-3 h-3" />
                        सत्यापित
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        लंबित
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm text-gray-600">पता</Label>
                  {isEditing ? (
                    <textarea
                      value={profile.address}
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={2}
                    />
                  ) : (
                    <p className="font-medium flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      {profile.address}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                प्रदर्शन मीट्रिक्स
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    ₹{profile.totalEarnings.toLocaleString('hi-IN')}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">कुल कमाई</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {profile.customersServed}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">सेवा प्राप्त ग्राहक</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {profile.applicationsProcessed}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">प्रोसेस्ड आवेदन</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    ⭐ {profile.rating}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">रेटिंग</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Operator Status */}
            <Card className="p-6 border-l-4 border-l-blue-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">ऑपरेटर स्थिति</h3>
                <Badge className="bg-blue-600 text-white">
                  <Award className="w-3 h-3 mr-1" />
                  CSC ऑपरेटर
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">ऑपरेटर के रूप में:</span>
                  <span className="text-sm font-medium">{profile.operatorSince}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">सत्यापन:</span>
                  <span className="text-sm font-medium text-green-600">सत्यापित</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">त्वरित कार्य</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  ग्राहक प्रबंधन
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  रिपोर्ट देखें
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  कमाई विवरण
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">हाल की गतिविधि</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">नया आवेदन प्रोसेस किया</p>
                    <p className="text-xs text-gray-500">2 घंटे पहले</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">नया ग्राहक जोड़ा</p>
                    <p className="text-xs text-gray-500">5 घंटे पहले</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">योजना अपडेट की</p>
                    <p className="text-xs text-gray-500">1 दिन पहले</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
