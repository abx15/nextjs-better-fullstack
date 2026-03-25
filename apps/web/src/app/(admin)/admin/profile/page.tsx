"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
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
  Settings,
  Users,
  BarChart3,
  Eye,
  EyeOff,
  Crown,
  Building
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function AdminProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    name: "अडमिन यूजर",
    email: "admin@sarkarisaathi.in",
    phone: "+91 9876543210",
    department: "योजना प्रबंधन",
    jurisdiction: "राष्ट्रीय स्तर",
    role: "SUPER_ADMIN",
    permissions: {
      canManageUsers: true,
      canManageSchemes: true,
      canViewAnalytics: true,
      canManageOperators: true,
      canSystemSettings: true
    },
    lastActivity: new Date().toISOString(),
    adminSince: "2024-01-15"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Implement API call to update admin profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <Badge className="bg-purple-600 text-white"><Crown className="w-3 h-3 mr-1" />सुपर एडमिन</Badge>;
      case 'ADMIN':
        return <Badge className="bg-blue-600 text-white"><Shield className="w-3 h-3 mr-1" />एडमिन</Badge>;
      default:
        return <Badge className="bg-gray-600 text-white">{role}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">एडमिन प्रोफाइल</h1>
            <p className="text-gray-600 mt-1">व्यवस्थापकीय जानकारी और अनुमतियाँ</p>
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
            {/* Admin Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                व्यवस्थापकीय जानकारी
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
                  <Label className="text-sm text-gray-600">विभाग</Label>
                  {isEditing ? (
                    <Input
                      value={profile.department}
                      onChange={(e) => setProfile({...profile, department: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      {profile.department}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">अधिकार क्षेत्र</Label>
                  {isEditing ? (
                    <select
                      value={profile.jurisdiction}
                      onChange={(e) => setProfile({...profile, jurisdiction: e.target.value})}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="राष्ट्रीय स्तर">राष्ट्रीय स्तर</option>
                      <option value="राज्य स्तर">राज्य स्तर</option>
                      <option value="जिला स्तर">जिला स्तर</option>
                    </select>
                  ) : (
                    <p className="font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {profile.jurisdiction}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">भूमिका</Label>
                  <div className="mt-1">
                    {getRoleBadge(profile.role)}
                  </div>
                </div>
              </div>
            </Card>

            {/* Permissions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                अनुमतियाँ
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium">उपयोगकर्ता प्रबंधन</p>
                      <p className="text-sm text-gray-500">उपयोगकर्ताओं को जोड़ना, संपादित करना और हटाना</p>
                    </div>
                  </div>
                  {isEditing ? (
                    <Switch
                      checked={profile.permissions.canManageUsers}
                      onCheckedChange={(checked) => 
                        setProfile({
                          ...profile,
                          permissions: { ...profile.permissions, canManageUsers: checked }
                        })
                      }
                    />
                  ) : (
                    <Badge className={profile.permissions.canManageUsers ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {profile.permissions.canManageUsers ? "सक्षम" : "अक्षम"}
                    </Badge>
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium">योजना प्रबंधन</p>
                      <p className="text-sm text-gray-500">योजनाओं को जोड़ना, संपादित करना और प्रबंधित करना</p>
                    </div>
                  </div>
                  {isEditing ? (
                    <Switch
                      checked={profile.permissions.canManageSchemes}
                      onCheckedChange={(checked) => 
                        setProfile({
                          ...profile,
                          permissions: { ...profile.permissions, canManageSchemes: checked }
                        })
                      }
                    />
                  ) : (
                    <Badge className={profile.permissions.canManageSchemes ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {profile.permissions.canManageSchemes ? "सक्षम" : "अक्षम"}
                    </Badge>
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium">एनालिटिक्स देखें</p>
                      <p className="text-sm text-gray-500">सिस्टम एनालिटिक्स और रिपोर्ट तक पहुंच</p>
                    </div>
                  </div>
                  {isEditing ? (
                    <Switch
                      checked={profile.permissions.canViewAnalytics}
                      onCheckedChange={(checked) => 
                        setProfile({
                          ...profile,
                          permissions: { ...profile.permissions, canViewAnalytics: checked }
                        })
                      }
                    />
                  ) : (
                    <Badge className={profile.permissions.canViewAnalytics ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {profile.permissions.canViewAnalytics ? "सक्षम" : "अक्षम"}
                    </Badge>
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium">ऑपरेटर प्रबंधन</p>
                      <p className="text-sm text-gray-500">CSC ऑपरेटरों को प्रबंधित करना</p>
                    </div>
                  </div>
                  {isEditing ? (
                    <Switch
                      checked={profile.permissions.canManageOperators}
                      onCheckedChange={(checked) => 
                        setProfile({
                          ...profile,
                          permissions: { ...profile.permissions, canManageOperators: checked }
                        })
                      }
                    />
                  ) : (
                    <Badge className={profile.permissions.canManageOperators ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {profile.permissions.canManageOperators ? "सक्षम" : "अक्षम"}
                    </Badge>
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium">सिस्टम सेटिंग्स</p>
                      <p className="text-sm text-gray-500">सिस्टम व्यापक सेटिंग्स और विन्यास</p>
                    </div>
                  </div>
                  {isEditing ? (
                    <Switch
                      checked={profile.permissions.canSystemSettings}
                      onCheckedChange={(checked) => 
                        setProfile({
                          ...profile,
                          permissions: { ...profile.permissions, canSystemSettings: checked }
                        })
                      }
                    />
                  ) : (
                    <Badge className={profile.permissions.canSystemSettings ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {profile.permissions.canSystemSettings ? "सक्षम" : "अक्षम"}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admin Status */}
            <Card className="p-6 border-l-4 border-l-purple-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">एडमिन स्थिति</h3>
                {getRoleBadge(profile.role)}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">एडमिन के रूप में:</span>
                  <span className="text-sm font-medium">{profile.adminSince}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">अंतिम गतिविधि:</span>
                  <span className="text-sm font-medium">आज</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">त्वरित कार्य</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  उपयोगकर्ता प्रबंधन
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  एनालिटिक्स देखें
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  सिस्टम सेटिंग्स
                </Button>
              </div>
            </Card>

            {/* Security */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">सुरक्षा</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  पासवर्ड बदलें
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  2FA सेटिंग्स
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  लॉगिन इतिहास
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
