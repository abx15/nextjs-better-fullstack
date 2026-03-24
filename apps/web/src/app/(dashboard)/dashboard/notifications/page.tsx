"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Info,
  Filter,
  Search,
  Trash2,
  Archive,
  Check,
  Settings
} from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "scheme",
      title: "नई कृषि योजना उपलब्ध",
      message: "प्रधानमंत्री कृषि सिंचाई योजना के लिए आवेदन शुरू हो गए हैं। आप इस योजना के लिए पात्र हो सकते हैं।",
      time: "2 घंटे पहले",
      read: false,
      priority: "high",
      action: "योजना देखें"
    },
    {
      id: 2,
      type: "deadline",
      title: "आवेदन डेडलाइन याद दिलाना",
      message: "पीएम किसान सम्मान निधि योजना के लिए आवेदन की अंतिम तिथि 15 अप्रैल है।",
      time: "5 घंटे पहले",
      read: false,
      priority: "high",
      action: "अभी आवेदन करें"
    },
    {
      id: 3,
      type: "application",
      title: "आवेदन स्थिति अपडेट",
      message: "आपके शिक्षा छात्रवृत्ति आवेदन की स्थिति 'सत्यापन के अधीन' में बदल गई है।",
      time: "1 दिन पहले",
      read: true,
      priority: "medium",
      action: "स्थिति देखें"
    },
    {
      id: 4,
      type: "system",
      title: "प्रोफाइल अपडेट सफल",
      message: "आपकी प्रोफाइल सफलतापूर्वक अपडेट की गई है। अब आप अधिक योजनाओं के लिए पात्र हैं।",
      time: "2 दिन पहले",
      read: true,
      priority: "low",
      action: "प्रोफाइल देखें"
    },
    {
      id: 5,
      type: "reminder",
      title: "दस्तावेज़ अपलोड याद दिलाना",
      message: "आपके आवेदन के लिए कुछ दस्तावेज़ अभी तक अपलोड नहीं किए गए हैं।",
      time: "3 दिन पहले",
      read: false,
      priority: "medium",
      action: "दस्तावेज़ अपलोड करें"
    }
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === "all" || notification.type === filter;
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "scheme": return <Info className="w-5 h-5 text-blue-500" />;
      case "deadline": return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "application": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "reminder": return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    return (
      <Badge className={styles[priority as keyof typeof styles]}>
        {priority === "high" ? "उच्च" : priority === "medium" ? "मध्यम" : "निम्न"}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">सूचनाएं</h1>
                <p className="text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} अपठित सूचनाएं` : "सभी सूचनाएं पढ़ी गईं"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <Check className="w-4 h-4 mr-2" />
                सभी पढ़ें
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                सेटिंग्स
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filters and Search */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="सूचनाएं खोजें..."
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
                सभी ({notifications.length})
              </Button>
              <Button
                variant={filter === "scheme" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("scheme")}
              >
                योजनाएं
              </Button>
              <Button
                variant={filter === "deadline" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("deadline")}
              >
                डेडलाइन
              </Button>
              <Button
                variant={filter === "application" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("application")}
              >
                आवेदन
              </Button>
            </div>
          </div>
        </Card>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? "कोई सूचना नहीं मिली" : "कोई सूचना नहीं है"}
              </h3>
              <p className="text-gray-600">
                {searchTerm 
                  ? "आपकी खोज से मेल खाने वाली कोई सूचना नहीं मिली" 
                  : "आपके पास कोई सूचना नहीं है। हम आपको महत्वपूर्ण अपडेट भेजेंगे।"
                }
              </p>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`p-6 transition-all ${
                  !notification.read 
                    ? 'border-l-4 border-l-blue-500 bg-blue-50' 
                    : 'border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`font-semibold text-gray-900 ${
                            !notification.read ? 'font-bold' : ''
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              नया
                            </Badge>
                          )}
                          {getPriorityBadge(notification.priority)}
                        </div>
                        
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {notification.time}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            {notification.action && (
                              <Button variant="outline" size="sm">
                                {notification.action}
                              </Button>
                            )}
                            
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <MarkAsRead className="w-4 h-4 mr-1" />
                                पढ़ें
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline">
              और सूचनाएं लोड करें
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
