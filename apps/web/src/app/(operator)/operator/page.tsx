"use client";
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Plus,
  ArrowRight,
  AlertCircle,
  Clock
} from "lucide-react";
import Link from "next/link";

interface Customer {
  id: string;
  name: string;
  phone: string;
  state: string;
  lastVisit: string;
  schemesApplied: number;
}

interface Alert {
  id: string;
  customerName: string;
  schemeName: string;
  daysAgo: number;
  status: "pending" | "follow_up" | "approved";
}

export default function OperatorDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentCustomers, setRecentCustomers] = useState<Customer[]>([]);
  const [pendingAlerts, setPendingAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, customersRes, appsRes] = await Promise.all([
        fetch("/api/operator/stats"),
        fetch("/api/operator/customers"),
        fetch("/api/operator/applications")
      ]);

      const statsData = await statsRes.json();
      const customersData = await customersRes.json();
      const appsData = await appsRes.json();

      setStats(statsData.stats);
      setRecentCustomers(customersData.customers || []);
      setPendingAlerts(appsData.applications || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) return <div className="p-6">Loading dashboard...</div>;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return "Today";
    if (diffInHours < 48) return "Yesterday";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const getAlertColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "follow_up": return "bg-orange-100 text-orange-800";
      case "approved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PageTransition>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Operator Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your CSC operations and help customers</p>
        </div>

        {/* Today's Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Users className="w-5 h-5" />
                Customers Helped
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stats.todayApplications}</div>
              <div className="text-sm opacity-90">Today's total</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stats.totalApplications}</div>
              <div className="text-sm opacity-90">Successfully completed</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Wallet Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₹{stats.walletBalance}</div>
              <div className="text-sm opacity-90">Commission earned</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Action */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ➕ नया Customer जोड़ें
                </h3>
                <p className="text-gray-600">
                  Walk-in customer ke liye - Register new customers and help them find schemes
                </p>
              </div>
              <Link href="/operator/customers/new">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  नया Customer →
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Customers */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {customer.state} • Last visit: {formatDate(customer.lastVisit)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.schemesApplied} schemes
                      </div>
                      <Link href={`/operator/customers/${customer.id}`}>
                        <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                          View →
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/operator/customers">
                  <Button variant="outline" size="sm">
                    View All Customers
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Pending Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Pending Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{alert.customerName}</span>
                        <Badge className={getAlertColor(alert.status)}>
                          {alert.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">{alert.schemeName}</div>
                      <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(alert.createdAt || new Date())}
                      </div>
                    </div>
                    <div className="text-right">
                      {alert.status === "pending" && (
                        <Button variant="outline" size="sm" className="text-orange-600 hover:text-orange-700">
                          Follow up
                        </Button>
                      )}
                      {alert.status === "follow_up" && (
                        <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
                          Check status
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/operator/applications">
                  <Button variant="outline" size="sm">
                    View All Applications
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card className="p-4">
            <div className="center">
              <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="center">
              <div className="text-2xl font-bold text-gray-900">{stats.completedApplications}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="center">
              <div className="text-2xl font-bold text-gray-900">{stats.pendingApplications}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="center">
              <div className="text-2xl font-bold text-gray-900">₹{stats.totalEarnings}</div>
              <div className="text-sm text-gray-600">Total Earnings</div>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
