"use client";
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Plus,
  User,
  Phone,
  MapPin,
  Calendar,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface Customer {
  id: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  lastVisit: string;
  schemesApplied: number;
  createdAt: string;
  aadhaarNumber?: string;
  email?: string;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Ramesh Kumar",
    phone: "+91 9876543210",
    state: "Uttar Pradesh",
    district: "Lucknow",
    lastVisit: "2024-07-29T10:30:00Z",
    schemesApplied: 3,
    createdAt: "2024-01-15",
    aadhaarNumber: "123456789012",
    email: "ramesh@example.com",
  },
  {
    id: "2",
    name: "Sunita Devi",
    phone: "+91 9876543211",
    state: "Bihar",
    district: "Patna",
    lastVisit: "2024-07-28T15:45:00Z",
    schemesApplied: 2,
    createdAt: "2024-02-20",
    aadhaarNumber: "234567890123",
  },
  {
    id: "3",
    name: "Amit Sharma",
    phone: "+91 9876543212",
    state: "Maharashtra",
    district: "Mumbai",
    lastVisit: "2024-07-27T09:15:00Z",
    schemesApplied: 1,
    createdAt: "2024-03-10",
    email: "amit@example.com",
  },
  {
    id: "4",
    name: "Priya Patel",
    phone: "+91 9876543213",
    state: "Gujarat",
    district: "Ahmedabad",
    lastVisit: "2024-07-26T14:20:00Z",
    schemesApplied: 4,
    createdAt: "2024-01-25",
    aadhaarNumber: "345678901234",
  },
  {
    id: "5",
    name: "Mohan Singh",
    phone: "+91 9876543214",
    state: "Rajasthan",
    district: "Jaipur",
    lastVisit: "2024-07-25T11:30:00Z",
    schemesApplied: 2,
    createdAt: "2024-04-05",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         (customer.aadhaarNumber && customer.aadhaarNumber.includes(searchTerm));
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return "Today";
    if (diffInHours < 48) return "Yesterday";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const handleSearch = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
  };

  return (
    <PageTransition>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
            <p className="text-gray-600 mt-2">Manage your customer database and help them find schemes</p>
          </div>
          <Link href="/operator/customers/new">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              नया Customer
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="नाम या मोबाइल नंबर से खोजें"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {filteredCustomers.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                कोई customer नहीं मिला
              </h3>
              <p className="text-gray-500 mb-6">
                नया customer जोड़ने के लिए ऊपर button दबाएं
              </p>
              <Link href="/operator/customers/new">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  नया Customer जोड़ें
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {customer.phone}
                            </div>
                            {customer.email && (
                              <div className="flex items-center gap-1">
                                <span className="w-4 h-4 flex items-center justify-center">📧</span>
                                {customer.email}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{customer.district}</div>
                            <div className="text-xs text-gray-500">{customer.state}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">Last visit</div>
                            <div className="text-xs text-gray-500">{formatDate(customer.lastVisit)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-orange-100 rounded flex items-center justify-center">
                            <span className="text-orange-600 text-xs">📋</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{customer.schemesApplied} schemes</div>
                            <div className="text-xs text-gray-500">Applied</div>
                          </div>
                        </div>
                      </div>

                      {customer.aadhaarNumber && (
                        <div className="mt-3">
                          <Badge variant="outline" className="text-xs">
                            Aadhaar: ****{customer.aadhaarNumber.slice(-4)}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Link href={`/operator/customers/${customer.id}`}>
                        <Button variant="outline" size="sm">
                          View Profile
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                      <Link href={`/operator/finder?customer=${customer.id}`}>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          Find Schemes
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{customers.length}</div>
              <div className="text-sm text-gray-600">Total Customers</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {customers.filter(c => c.schemesApplied > 0).length}
              </div>
              <div className="text-sm text-gray-600">Active Applicants</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {customers.reduce((sum, c) => sum + c.schemesApplied, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {customers.filter(c => {
                  const lastVisit = new Date(c.lastVisit);
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                  return lastVisit > thirtyDaysAgo;
                }).length}
              </div>
              <div className="text-sm text-gray-600">Active (30 days)</div>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
