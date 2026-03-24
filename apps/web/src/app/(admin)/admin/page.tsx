"use client";
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from "recharts";
import { 
  Users, 
  FileText, 
  ClipboardList, 
  Crown,
  TrendingUp,
  Plus,
  Download,
  Send
} from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  activeSchemes: number;
  applicationsToday: number;
  premiumUsers: number;
  userGrowth: number;
  applicationGrowth: number;
  premiumGrowth: number;
}

interface ActivityItem {
  id: string;
  type: "user" | "scheme" | "premium" | "application";
  message: string;
  timestamp: string;
}

const COLORS = ["#1a3a6b", "#FF6B00", "#138808", "#dc2626", "#7c3aed"];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) return <div className="p-6">Loading dashboard...</div>;

  const [newUsersData] = useState([
    { date: "Jan 1", count: 120 },
    { date: "Jan 7", count: 145 },
    { date: "Jan 14", count: 168 },
    { date: "Jan 21", count: 192 },
    { date: "Jan 28", count: 210 },
    { date: "Feb 4", count: 235 },
    { date: "Feb 11", count: 258 },
    { date: "Feb 18", count: 280 },
    { date: "Feb 25", count: 302 },
    { date: "Mar 4", count: 325 },
    { date: "Mar 11", count: 348 },
    { date: "Mar 18", count: 372 },
    { date: "Mar 25", count: 395 },
    { date: "Apr 1", count: 420 },
    { date: "Apr 8", count: 445 },
    { date: "Apr 15", count: 468 },
    { date: "Apr 22", count: 492 },
    { date: "Apr 29", count: 515 },
    { date: "May 6", count: 538 },
    { date: "May 13", count: 562 },
    { date: "May 20", count: 585 },
    { date: "May 27", count: 608 },
    { date: "Jun 3", count: 632 },
    { date: "Jun 10", count: 655 },
    { date: "Jun 17", count: 678 },
    { date: "Jun 24", count: 702 },
    { date: "Jul 1", count: 725 },
    { date: "Jul 8", count: 748 },
    { date: "Jul 15", count: 772 },
    { date: "Jul 22", count: 795 },
    { date: "Jul 29", count: 818 },
  ]);

  const [popularSchemes] = useState([
    { name: "PM-KISAN", applications: 12450 },
    { name: "Ayushman Bharat", applications: 10230 },
    { name: "PM Awas", applications: 8920 },
    { name: "Ujjwala Yojana", applications: 7680 },
    { name: "PM Ujjwala", applications: 6540 },
    { name: "Swachh Bharat", applications: 5420 },
    { name: "Digital India", applications: 4320 },
    { name: "Skill India", applications: 3210 },
    { name: "Make in India", applications: 2180 },
    { name: "Startup India", applications: 1560 },
  ]);

  const [stateWiseUsers] = useState([
    { name: "Uttar Pradesh", value: 12500 },
    { name: "Maharashtra", value: 8900 },
    { name: "Bihar", value: 7200 },
    { name: "West Bengal", value: 6800 },
    { name: "Madhya Pradesh", value: 5400 },
    { name: "Others", value: 9434 },
  ]);

  const [applicationsOverTime] = useState([
    { date: "Jun 1", count: 180 },
    { date: "Jun 7", count: 195 },
    { date: "Jun 14", count: 210 },
    { date: "Jun 21", count: 198 },
    { date: "Jun 28", count: 225 },
    { date: "Jul 5", count: 240 },
    { date: "Jul 12", count: 235 },
    { date: "Jul 19", count: 258 },
    { date: "Jul 26", count: 272 },
    { date: "Aug 2", count: 268 },
    { date: "Aug 9", count: 285 },
    { date: "Aug 16", count: 302 },
    { date: "Aug 23", count: 298 },
    { date: "Aug 30", count: 315 },
    { date: "Sep 6", count: 328 },
    { date: "Sep 13", count: 342 },
    { date: "Sep 20", count: 355 },
    { date: "Sep 27", count: 368 },
    { date: "Oct 4", count: 382 },
    { date: "Oct 11", count: 395 },
    { date: "Oct 18", count: 408 },
    { date: "Oct 25", count: 422 },
    { date: "Nov 1", count: 435 },
    { date: "Nov 8", count: 448 },
    { date: "Nov 15", count: 462 },
    { date: "Nov 22", count: 475 },
    { date: "Nov 29", count: 488 },
    { date: "Dec 6", count: 502 },
    { date: "Dec 13", count: 515 },
    { date: "Dec 20", count: 528 },
    { date: "Dec 27", count: 542 },
  ]);

  const [recentActivity] = useState<ActivityItem[]>([
    { id: "1", type: "user", message: "✅ New user registered — Ramesh Kumar, UP", timestamp: "2 min ago" },
    { id: "2", type: "scheme", message: "📋 PM-KISAN scheme updated by admin", timestamp: "1 hr ago" },
    { id: "3", type: "premium", message: "💎 Premium subscription — Sunita Devi", timestamp: "3 hr ago" },
    { id: "4", type: "application", message: "📊 23 new applications submitted today", timestamp: "5 hr ago" },
    { id: "5", type: "user", message: "✅ New user registered — Amit Sharma, MH", timestamp: "6 hr ago" },
    { id: "6", type: "scheme", message: "📋 Ayushman Bharat scheme updated", timestamp: "8 hr ago" },
    { id: "7", type: "premium", message: "💎 Premium subscription — Rajesh Singh", timestamp: "12 hr ago" },
    { id: "8", type: "application", message: "📊 PM Awas applications spike detected", timestamp: "1 day ago" },
    { id: "9", type: "user", message: "✅ New user registered — Priya Patel, GJ", timestamp: "1 day ago" },
    { id: "10", type: "scheme", message: "📋 New scheme added: Student Scholarship", timestamp: "2 days ago" },
  ]);

  return (
    <PageTransition>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor and manage SarkariSaathi platform</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Users className="w-5 h-5" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stats.totalUsers.toLocaleString()}</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+{stats.userGrowth}% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Active Schemes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stats.activeSchemes.toLocaleString()}</div>
              <div className="text-sm opacity-90">Across all categories</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Applications Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stats.applicationsToday}</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+{stats.applicationGrowth}% from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Premium Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stats.premiumUsers.toLocaleString()}</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+{stats.premiumGrowth}% growth</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>नए Users (पिछले 30 दिन)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={newUsersData.slice(-30)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#1a3a6b" 
                    strokeWidth={2}
                    dot={{ fill: "#1a3a6b" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>सबसे popular योजनाएं (Top 10)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={popularSchemes} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#FF6B00" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>State-wise Users (Top 5 + Others)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stateWiseUsers}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stateWiseUsers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applications over time (Last 30 days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={applicationsOverTime.slice(-30)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#138808" 
                    fill="#138808" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                    <Badge variant="secondary" className="ml-3">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                नई योजना जोड़ें
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Report download
              </Button>
              <Button variant="outline" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Bulk reminder भेजें
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
