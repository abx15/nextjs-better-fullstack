"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SchemeCard from "@/components/sarkari/scheme-card";
import StatsCard from "@/components/sarkari/stats-card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [matchedSchemes, setMatchedSchemes] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    approved: 0,
    pending: 0,
    saved: 0,
  });
  const [reminders, setReminders] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        
        setStats(data.stats || {
          total: 8,
          applied: 3,
          approved: 2,
          pending: 2,
          saved: 5,
        });
        
        setMatchedSchemes(data.topSchemes || []);
        setReminders(data.reminders || []);
        setRecentActivity(data.recentActivity || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Set mock data for demo
        setStats({
          total: 8,
          applied: 3,
          approved: 2,
          pending: 2,
          saved: 5,
        });
        setReminders([
          {
            id: 1,
            title: "PM-KISAN Installment",
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            type: "installment",
            icon: "💰",
          },
          {
            id: 2,
            title: "Ayushman Card Renewal",
            dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
            type: "renewal",
            icon: "🏥",
          },
        ]);
        setRecentActivity([
          {
            id: 1,
            description: "PM-KISAN में Apply किया ✅",
            time: "2 दिन पहले",
            icon: "📋",
          },
          {
            id: 2,
            description: "Ayushman Bharat Save किया 💾",
            time: "आज",
            icon: "💾",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDateInHindi = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const date = new Date().toLocaleDateString('hi-IN', options);
    return date;
  };

  const quickChatQuestions = [
    "PM-KISAN पैसा कब आएगा?",
    "आयुष्मान card कैसे बनेगा?",
    "मेरे लिए कौन सी योजनाएं हैं?",
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. WELCOME CARD */}
      <Card className="p-6 bg-gradient-to-r from-[#1a3a6b] to-[#1a3a6b]/90 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              नमस्ते, रमेश कुमार जी! 🙏
            </h2>
            <p className="text-white/80">{formatDateInHindi()}</p>
          </div>
          <div className="text-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeOpacity="0.2"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#FF6B00"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.8)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">80%</span>
              </div>
            </div>
            <p className="text-sm text-white/80 mt-2">प्रोफाइल पूरा करें</p>
          </div>
        </div>
      </Card>

      {/* 2. MATCHED SCHEMES HIGHLIGHT */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#1a3a6b]">
            🎉 आपके लिए {matchedSchemes.length} योजनाएं मिली हैं!
          </h3>
        </div>

        {matchedSchemes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {matchedSchemes.slice(0, 3).map((scheme) => (
                <SchemeCard
                  key={scheme.id}
                  nameHindi={scheme.nameHindi}
                  nameEnglish={scheme.nameEnglish}
                  category={scheme.category}
                  ministry={scheme.ministry}
                  benefitAmount={scheme.benefitAmount}
                  difficulty={scheme.difficulty}
                  matchPercent={scheme.matchPercent}
                  docsReady={scheme.docsReady}
                  docsNeeded={scheme.docsNeeded}
                  isSaved={scheme.isSaved}
                  onSave={() => console.log("Save scheme:", scheme.id)}
                  onDetails={() => console.log("View details:", scheme.id)}
                  onApply={() => console.log("Apply for scheme:", scheme.id)}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/my-schemes">
                <Button variant="outline">सभी देखें →</Button>
              </Link>
              <Link href="/dashboard/finder">
                <Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90">
                  🤖 नई खोज करें
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🔍</div>
            <h4 className="text-lg font-medium text-gray-600 mb-2">
              अभी AI से अपनी योजनाएं खोजें
            </h4>
            <Link href="/dashboard/finder">
              <Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90">
                योजनाएं खोजें →
              </Button>
            </Link>
          </div>
        )}
      </Card>

      {/* 3. QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon="📊"
          value={stats.total}
          label="Total Applications"
          labelHindi="कुल आवेदन"
        />
        <StatsCard
          icon="✅"
          value={stats.approved}
          label="Approved"
          labelHindi="स्वीकृत"
        />
        <StatsCard
          icon="⏳"
          value={stats.pending}
          label="Pending"
          labelHindi="विचाराधीन"
        />
        <StatsCard
          icon="💾"
          value={stats.saved}
          label="Saved"
          labelHindi="सहेजा गया"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 4. UPCOMING REMINDERS */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-[#1a3a6b] mb-4">
            ⏰ आने वाली deadlines
          </h3>
          <div className="space-y-3">
            {reminders.map((reminder: any) => {
              const daysUntilDue = Math.ceil(
                (new Date(reminder.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
              );
              
              let bgColor = "bg-blue-50 border-blue-200";
              if (daysUntilDue < 7) bgColor = "bg-red-50 border-red-200";
              else if (daysUntilDue < 30) bgColor = "bg-yellow-50 border-yellow-200";

              return (
                <div
                  key={reminder.id}
                  className={`p-3 rounded-lg border ${bgColor}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{reminder.icon}</span>
                      <div>
                        <p className="font-medium text-gray-800">{reminder.title}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(reminder.dueDate).toLocaleDateString("hi-IN")}
                        </p>
                      </div>
                    </div>
                    <Badge variant={daysUntilDue < 7 ? "destructive" : "secondary"}>
                      {daysUntilDue} दिन
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/dashboard/reminders">
            <Button variant="outline" className="w-full mt-4">
              सभी देखें →
            </Button>
          </Link>
        </Card>

        {/* 5. AI QUICK ACCESS */}
        <Card className="p-6 border-l-4 border-l-[#1a3a6b]">
          <h3 className="text-xl font-bold text-[#1a3a6b] mb-2">
            💬 AI साथी से पूछें
          </h3>
          <p className="text-gray-600 mb-4">
            कोई भी सरकारी योजना का सवाल हिंदी में पूछें
          </p>
          
          <div className="space-y-2 mb-4">
            {quickChatQuestions.map((question, index) => (
              <Link
                key={index}
                href={`/dashboard/chat?q=${encodeURIComponent(question)}`}
              >
                <div className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 cursor-pointer transition-colors">
                  {question}
                </div>
              </Link>
            ))}
          </div>

          <Link href="/dashboard/chat">
            <Button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90">
              AI साथी खोलें →
            </Button>
          </Link>
        </Card>
      </div>

      {/* 6. RECENT ACTIVITY */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-[#1a3a6b] mb-4">
          हाल की गतिविधि
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity: any) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-2xl">{activity.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.description}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
