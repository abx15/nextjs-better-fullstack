"use client";
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Clock, Info, CheckCircle, X, Calendar, Link2 } from "lucide-react";

interface Reminder {
  id: string;
  type: "deadline" | "document" | "new_scheme" | "installment" | "approval" | "rejection";
  title: string;
  titleHindi: string;
  message: string;
  messageHindi: string;
  dueDate: string | null;
  isRead: boolean;
  schemeId: string | null;
  createdAt: string;
}

const reminderTypes = {
  deadline: { icon: Clock, color: "red", label: "Deadline" },
  document: { icon: Clock, color: "yellow", label: "Document" },
  new_scheme: { icon: Clock, color: "blue", label: "New Scheme" },
  installment: { icon: Clock, color: "green", label: "Installment" },
  approval: { icon: CheckCircle, color: "green", label: "Approval" },
  rejection: { icon: X, color: "red", label: "Rejection" },
};

const getUrgencyColor = (dueDate: string | null, isRead: boolean) => {
  if (isRead) return "border-gray-400 bg-gray-50";
  if (!dueDate) return "border-blue-400 bg-blue-50";
  
  const daysUntil = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntil < 7) return "border-red-400 bg-red-50";
  if (daysUntil < 30) return "border-yellow-400 bg-yellow-50";
  return "border-blue-400 bg-blue-50";
};

const getUrgencyBadge = (dueDate: string | null) => {
  if (!dueDate) return { color: "blue", text: "जानकारी" };
  
  const daysUntil = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntil < 7) return { color: "red", text: "Urgent" };
  if (daysUntil < 30) return { color: "yellow", text: "Upcoming" };
  return { color: "blue", text: "जानकारी" };
};

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchReminders();
  }, [activeFilter]);

  const fetchReminders = async () => {
    try {
      const response = await fetch(`/api/reminders?filter=${activeFilter}`);
      if (response.ok) {
        const data = await response.json();
        setReminders(data.reminders || []);
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/reminders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      fetchReminders();
    } catch (error) {
      console.error("Error marking reminder as read:", error);
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      await fetch(`/api/reminders/${id}`, {
        method: "DELETE",
      });
      fetchReminders();
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/reminders/read-all", {
        method: "PATCH",
      });
      fetchReminders();
    } catch (error) {
      console.error("Error marking all reminders as read:", error);
    }
  };

  const stats = {
    urgent: reminders.filter(r => {
      if (!r.dueDate || r.isRead) return false;
      const daysUntil = Math.ceil((new Date(r.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil < 7;
    }).length,
    upcoming: reminders.filter(r => {
      if (!r.dueDate || r.isRead) return false;
      const daysUntil = Math.ceil((new Date(r.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil >= 7 && daysUntil < 30;
    }).length,
    info: reminders.filter(r => !r.dueDate && !r.isRead).length,
    read: reminders.filter(r => r.isRead).length,
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reminders</h1>
          <p className="text-gray-600">Stay updated with your scheme deadlines and notifications</p>
        </div>

        {/* Summary Pills */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full border transition-colors ${
              activeFilter === "all" 
                ? "border-gray-800 bg-gray-800 text-white" 
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            सभी ({reminders.length})
          </button>
          <button
            onClick={() => setActiveFilter("unread")}
            className={`px-4 py-2 rounded-full border transition-colors ${
              activeFilter === "unread" 
                ? "border-red-500 bg-red-500 text-white" 
                : "border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
            }`}
          >
            🔴 Urgent: {stats.urgent}
          </button>
          <button
            onClick={() => setActiveFilter("deadline")}
            className={`px-4 py-2 rounded-full border transition-colors ${
              activeFilter === "deadline" 
                ? "border-yellow-500 bg-yellow-500 text-white" 
                : "border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
            }`}
          >
            🟡 Upcoming: {stats.upcoming}
          </button>
          <button
            onClick={() => setActiveFilter("new_scheme")}
            className={`px-4 py-2 rounded-full border transition-colors ${
              activeFilter === "new_scheme" 
                ? "border-blue-500 bg-blue-500 text-white" 
                : "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            🔵 जानकारी: {stats.info}
          </button>
          <button
            onClick={() => setActiveFilter("benefit")}
            className={`px-4 py-2 rounded-full border transition-colors ${
              activeFilter === "benefit" 
                ? "border-green-500 bg-green-500 text-white" 
                : "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
            }`}
          >
            ✅ पढ़े: {stats.read}
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <Tabs value={activeFilter} onValueChange={setActiveFilter}>
            <TabsList>
              <TabsTrigger value="all">सभी</TabsTrigger>
              <TabsTrigger value="unread">न पढ़े</TabsTrigger>
              <TabsTrigger value="deadline">Deadline</TabsTrigger>
              <TabsTrigger value="new_scheme">नई योजना</TabsTrigger>
              <TabsTrigger value="benefit">लाभ</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button onClick={markAllAsRead} variant="outline" size="sm">
            सभी पढ़ा
          </Button>
        </div>

        {/* Reminders List */}
        {reminders.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">कोई reminder नहीं</h3>
            <p className="text-gray-500">
              जब कोई deadline आएगी या नई योजना आएगी, यहाँ दिखेगी
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reminders.map((reminder) => {
              const TypeIcon = reminderTypes[reminder.type].icon;
              const urgency = getUrgencyBadge(reminder.dueDate);
              
              return (
                <Card
                  key={reminder.id}
                  className={`border-l-4 ${getUrgencyColor(reminder.dueDate, reminder.isRead)}`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <TypeIcon className="w-5 h-5 text-gray-600" />
                        <Badge variant="secondary" className={`bg-${urgency.color}-100 text-${urgency.color}-800`}>
                          {urgency.text}
                        </Badge>
                        {reminder.dueDate && (
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(reminder.dueDate).toLocaleDateString("hi-IN")}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {!reminder.isRead && (
                          <Button
                            onClick={() => markAsRead(reminder.id)}
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                          >
                            ✅ पढ़ा
                          </Button>
                        )}
                        <Button
                          onClick={() => deleteReminder(reminder.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          ✕
                        </Button>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1">
                      {reminder.titleHindi}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {reminder.messageHindi}
                    </p>

                    {reminder.schemeId && (
                      <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                        <Link2 className="w-4 h-4 mr-1" />
                        योजना देखें
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
