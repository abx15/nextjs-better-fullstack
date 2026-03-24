"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun,
  Mail,
  Phone,
  Lock,
  Smartphone,
  Volume2,
  Eye,
  Download,
  Trash2,
  LogOut
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    schemeAlerts: true,
    deadlineReminders: true,
    applicationUpdates: true,
    
    // Privacy
    profileVisibility: "public",
    showContactInfo: false,
    dataSharing: false,
    
    // Preferences
    language: "hi",
    theme: "light",
    fontSize: "medium",
    autoPlayVideos: false,
    
    // Account
    email: "raj.kumar@example.com",
    phone: "+91 9876543210",
    twoFactorEnabled: false,
    
    // Accessibility
    highContrast: false,
    reduceMotion: false,
    screenReader: false
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("notifications");

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Settings saved:", settings);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "notifications", label: "सूचनाएं", icon: Bell },
    { id: "privacy", label: "गोपनीयता", icon: Shield },
    { id: "preferences", label: "प्राथमिकताएं", icon: Globe },
    { id: "account", label: "खाता", icon: User },
    { id: "accessibility", label: "पहुंच", icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">सेटिंग्स</h1>
          <p className="text-gray-600 mt-1">अपनी प्राथमिकताएं प्रबंधित करें</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-blue-600" />
                      सूचना सेटिंग्स
                    </h2>
                    <p className="text-gray-600 mb-6">
                      चुनें कि आप किस प्रकार की सूचनाएं प्राप्त करना चाहते हैं
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">ईमेल सूचनाएं</p>
                          <p className="text-sm text-gray-600">महत्वपूर्ण अपडेट के लिए ईमेल प्राप्त करें</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, emailNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">SMS सूचनाएं</p>
                          <p className="text-sm text-gray-600">महत्वपूर्ण अलर्ट के लिए SMS प्राप्त करें</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, smsNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">पुश सूचनाएं</p>
                          <p className="text-sm text-gray-600">ब्राउज़र पुश सूचनाएं</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, pushNotifications: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">नई योजनाएं अलर्ट</p>
                        <p className="text-sm text-gray-600">नई सरकारी योजनाओं की सूचना</p>
                      </div>
                      <Switch
                        checked={settings.schemeAlerts}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, schemeAlerts: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">डेडलाइन रिमाइंडर</p>
                        <p className="text-sm text-gray-600">आवेदन डेडलाइन की याद दिलाएं</p>
                      </div>
                      <Switch
                        checked={settings.deadlineReminders}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, deadlineReminders: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">आवेदन अपडेट</p>
                        <p className="text-sm text-gray-600">आवेदन स्थिति परिवर्तन की सूचना</p>
                      </div>
                      <Switch
                        checked={settings.applicationUpdates}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, applicationUpdates: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === "privacy" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      गोपनीयता सेटिंग्स
                    </h2>
                    <p className="text-gray-600 mb-6">
                      अपनी जानकारी को कैसे साझा किया जाता है, इसे नियंत्रित करें
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="py-3">
                      <Label className="text-base font-medium">प्रोफाइल दृश्यता</Label>
                      <p className="text-sm text-gray-600 mb-3">आपकी प्रोफाइल कौन देख सकता है</p>
                      <select
                        value={settings.profileVisibility}
                        onChange={(e) =>
                          setSettings({ ...settings, profileVisibility: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="public">सार्वजनिक</option>
                        <option value="registered">केवल पंजीकृत उपयोगकर्ता</option>
                        <option value="private">निजी</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">संपर्क जानकारी दिखाएं</p>
                        <p className="text-sm text-gray-600">ईमेल और फोन नंबर सार्वजनिक रूप से दिखाएं</p>
                      </div>
                      <Switch
                        checked={settings.showContactInfo}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, showContactInfo: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">डेटा साझाकरण</p>
                        <p className="text-sm text-gray-600">बेहतर सेवाओं के लिए डेटा साझा करें</p>
                      </div>
                      <Switch
                        checked={settings.dataSharing}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, dataSharing: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      प्राथमिकताएं
                    </h2>
                    <p className="text-gray-600 mb-6">
                      अपनी ऐप अनुभव को अनुकूलित करें
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="py-3">
                      <Label className="text-base font-medium">भाषा</Label>
                      <p className="text-sm text-gray-600 mb-3">अपनी पसंदीदा भाषा चुनें</p>
                      <select
                        value={settings.language}
                        onChange={(e) =>
                          setSettings({ ...settings, language: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="hi">हिंदी</option>
                        <option value="en">English</option>
                        <option value="bn">বাংলা</option>
                        <option value="te">తెలుగు</option>
                        <option value="mr">मराठी</option>
                        <option value="ta">தமிழ்</option>
                        <option value="gu">ગુજરાતી</option>
                      </select>
                    </div>

                    <div className="py-3">
                      <Label className="text-base font-medium">थीम</Label>
                      <p className="text-sm text-gray-600 mb-3">ऐप की दिखावट चुनें</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSettings({ ...settings, theme: "light" })}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                            settings.theme === "light"
                              ? "border-blue-500 bg-blue-50 text-blue-600"
                              : "border-gray-300"
                          }`}
                        >
                          <Sun className="w-4 h-4" />
                          लाइट
                        </button>
                        <button
                          onClick={() => setSettings({ ...settings, theme: "dark" })}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                            settings.theme === "dark"
                              ? "border-blue-500 bg-blue-50 text-blue-600"
                              : "border-gray-300"
                          }`}
                        >
                          <Moon className="w-4 h-4" />
                          डार्क
                        </button>
                      </div>
                    </div>

                    <div className="py-3">
                      <Label className="text-base font-medium">फॉन्ट आकार</Label>
                      <p className="text-sm text-gray-600 mb-3">टेक्स्ट आकार समायोजित करें</p>
                      <select
                        value={settings.fontSize}
                        onChange={(e) =>
                          setSettings({ ...settings, fontSize: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="small">छोटा</option>
                        <option value="medium">मध्यम</option>
                        <option value="large">बड़ा</option>
                        <option value="extra-large">बहुत बड़ा</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">वीडियो ऑटो-प्ले</p>
                        <p className="text-sm text-gray-600">वीडियो स्वचालित रूप से चलाएं</p>
                      </div>
                      <Switch
                        checked={settings.autoPlayVideos}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, autoPlayVideos: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Account Tab */}
              {activeTab === "account" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      खाता सेटिंग्स
                    </h2>
                    <p className="text-gray-600 mb-6">
                      अपने खाते की जानकारा और सुरक्षा प्रबंधित करें
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="py-3">
                      <Label className="text-base font-medium">ईमेल पता</Label>
                      <Input
                        type="email"
                        value={settings.email}
                        onChange={(e) =>
                          setSettings({ ...settings, email: e.target.value })
                        }
                        className="mt-2"
                      />
                    </div>

                    <div className="py-3">
                      <Label className="text-base font-medium">फोन नंबर</Label>
                      <Input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) =>
                          setSettings({ ...settings, phone: e.target.value })
                        }
                        className="mt-2"
                      />
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">दो-फैक्टर प्रमाणीकरण</p>
                          <p className="text-sm text-gray-600">अतिरिक्त सुरक्षा के लिए 2FA सक्षम करें</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.twoFactorEnabled}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, twoFactorEnabled: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="w-4 h-4 mr-2" />
                        पासवर्ड बदलें
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        डेटा डाउनलोड करें
                      </Button>
                      <Button variant="destructive" className="w-full justify-start">
                        <Trash2 className="w-4 h-4 mr-2" />
                        खाता हटाएं
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Accessibility Tab */}
              {activeTab === "accessibility" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Eye className="w-5 h-5 text-blue-600" />
                      पहुंच सेटिंग्स
                    </h2>
                    <p className="text-gray-600 mb-6">
                      ऐप को अपनी आवश्यकताओं के अनुसार अनुकूलित करें
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">उच्च कंट्रास्ट</p>
                        <p className="text-sm text-gray-600">बेहतर दृश्यता के लिए उच्च कंट्रास्ट</p>
                      </div>
                      <Switch
                        checked={settings.highContrast}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, highContrast: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">गति कम करें</p>
                        <p className="text-sm text-gray-600">एनिमेशन और गति को कम करें</p>
                      </div>
                      <Switch
                        checked={settings.reduceMotion}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, reduceMotion: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">स्क्रीन रीडर</p>
                        <p className="text-sm text-gray-600">स्क्रीन रीडर समर्थन सक्षम करें</p>
                      </div>
                      <Switch
                        checked={settings.screenReader}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, screenReader: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end pt-6 border-t">
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="min-w-[120px]"
                >
                  {loading ? "सहेजा जा रहा है..." : "सेटिंग्स सहेजें"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
