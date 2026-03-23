"use client";
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Calendar, 
  Download, 
  DollarSign,
  BarChart3,
  Target,
  Clock
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Earning {
  id: string;
  date: string;
  customerName: string;
  schemeName: string;
  commission: number;
  status: "completed" | "pending" | "failed";
}

interface MonthlyEarning {
  month: string;
  earnings: number;
  applications: number;
}

export default function OperatorEarningsPage() {
  const [earnings, setEarnings] = useState<Earning[]>([
    {
      id: "1",
      date: "2024-07-29",
      customerName: "Ramesh Kumar",
      schemeName: "PM-KISAN",
      commission: 30,
      status: "completed",
    },
    {
      id: "2",
      date: "2024-07-28",
      customerName: "Sunita Devi",
      schemeName: "Ayushman Bharat",
      commission: 30,
      status: "completed",
    },
    {
      id: "3",
      date: "2024-07-27",
      customerName: "Amit Sharma",
      schemeName: "PM Awas",
      commission: 30,
      status: "pending",
    },
    {
      id: "4",
      date: "2024-07-26",
      customerName: "Priya Patel",
      schemeName: "Ujjwala Yojana",
      commission: 30,
      status: "completed",
    },
    {
      id: "5",
      date: "2024-07-25",
      customerName: "Mohan Singh",
      schemeName: "PM-KISAN",
      commission: 30,
      status: "completed",
    },
  ]);

  const [monthlyData] = useState<MonthlyEarning[]>([
    { month: "Jan", earnings: 2400, applications: 80 },
    { month: "Feb", earnings: 2700, applications: 90 },
    { month: "Mar", earnings: 3000, applications: 100 },
    { month: "Apr", earnings: 3300, applications: 110 },
    { month: "Jun", earnings: 3600, applications: 120 },
    { month: "Jul", earnings: 3900, applications: 130 },
  ]);

  const [summaryStats, setSummaryStats] = useState({
    thisMonth: 3600,
    totalEarned: 18000,
    pending: 1200,
    applicationsThisMonth: 120,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleWithdrawalRequest = () => {
    console.log("Withdrawal request initiated");
    // Here you would integrate with Dodo Payments
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["Date", "Customer", "Scheme", "Commission", "Status"],
      ...earnings.map(e => [
        formatDate(e.date),
        e.customerName,
        e.schemeName,
        e.commission.toString(),
        e.status
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "earnings.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <PageTransition>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
          <p className="text-gray-600 mt-2">Track your commission and earnings</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₹{summaryStats.thisMonth.toLocaleString()}</div>
              <div className="text-sm opacity-90">From {summaryStats.applicationsThisMonth} applications</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Total Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₹{summaryStats.totalEarned.toLocaleString()}</div>
              <div className="text-sm opacity-90">All time earnings</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₹{summaryStats.pending.toLocaleString()}</div>
              <div className="text-sm opacity-90">Awaiting confirmation</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Target className="w-5 h-5" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{summaryStats.applicationsThisMonth}</div>
              <div className="text-sm opacity-90">This month</div>
            </CardContent>
          </Card>
        </div>

        {/* Commission Structure */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-orange-600" />
              Commission Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Current Rates</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Per application submitted</span>
                    <span className="font-semibold text-orange-600">₹30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum monthly earnings</span>
                    <span className="font-semibold text-orange-600">₹500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment processing time</span>
                    <span className="font-semibold text-orange-600">7-10 days</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Bonus Tiers</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">50+ applications/month</span>
                    <span className="font-semibold text-green-600">+₹500 bonus</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">100+ applications/month</span>
                    <span className="font-semibold text-green-600">+₹1,200 bonus</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">200+ applications/month</span>
                    <span className="font-semibold text-green-600">+₹2,500 bonus</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Monthly Earnings (Last 6 months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, "Earnings"]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar dataKey="earnings" fill="#FF6B00" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Earnings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {earnings.map((earning) => (
                  <div key={earning.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{earning.customerName}</div>
                      <div className="text-sm text-gray-600">{earning.schemeName}</div>
                      <div className="text-xs text-gray-400">{formatDate(earning.date)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">₹{earning.commission}</div>
                      <Badge className={getStatusColor(earning.status)}>
                        {earning.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-8">
          <Button onClick={handleExportCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button 
            onClick={handleWithdrawalRequest}
            className="bg-orange-600 hover:bg-orange-700"
            disabled={summaryStats.thisMonth < 500}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Withdrawal Request
            {summaryStats.thisMonth < 500 && (
              <span className="ml-2 text-xs">(Min: ₹500)</span>
            )}
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
