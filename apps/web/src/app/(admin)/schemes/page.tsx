"use client";
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Users
} from "lucide-react";
import Link from "next/link";

interface Scheme {
  id: string;
  name: string;
  nameHindi: string;
  category: string;
  level: "central" | "state";
  state?: string;
  views: number;
  applications: number;
  isActive: boolean;
  createdAt: string;
}

const mockSchemes: Scheme[] = [
  {
    id: "1",
    name: "PM-KISAN",
    nameHindi: "पीएम-किसान",
    category: "Agriculture",
    level: "central",
    views: 15420,
    applications: 3420,
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2", 
    name: "Ayushman Bharat",
    nameHindi: "आयुष्मान भारत",
    category: "Healthcare",
    level: "central",
    views: 12350,
    applications: 2890,
    isActive: true,
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "PM Awas Yojana",
    nameHindi: "पीएम आवास योजना",
    category: "Housing",
    level: "central",
    views: 10890,
    applications: 2340,
    isActive: true,
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    name: "UP Kisan Relief",
    nameHindi: "यूपी किसान राहत",
    category: "Agriculture",
    level: "state",
    state: "Uttar Pradesh",
    views: 8760,
    applications: 1560,
    isActive: true,
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    name: "Ujjwala Yojana",
    nameHindi: "उज्ज्वला योजना",
    category: "Energy",
    level: "central",
    views: 9870,
    applications: 1980,
    isActive: false,
    createdAt: "2024-02-15",
  },
  {
    id: "6",
    name: "Maharashtra Farm Loan",
    nameHindi: "महाराष्ट्र कृषि ऋण",
    category: "Agriculture",
    level: "state",
    state: "Maharashtra",
    views: 6540,
    applications: 1230,
    isActive: true,
    createdAt: "2024-03-01",
  },
];

const categoryColors: Record<string, string> = {
  "Agriculture": "bg-green-100 text-green-800",
  "Healthcare": "bg-blue-100 text-blue-800",
  "Housing": "bg-purple-100 text-purple-800",
  "Energy": "bg-orange-100 text-orange-800",
  "Education": "bg-pink-100 text-pink-800",
  "Employment": "bg-indigo-100 text-indigo-800",
};

export default function SchemesManager() {
  const [schemes, setSchemes] = useState<Scheme[]>(mockSchemes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [selectedSchemes, setSelectedSchemes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const itemsPerPage = 20;

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.nameHindi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || scheme.level === selectedLevel;
    const matchesActive = !showActiveOnly || scheme.isActive;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesActive;
  });

  const totalPages = Math.ceil(filteredSchemes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSchemes = filteredSchemes.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSchemes(paginatedSchemes.map(scheme => scheme.id));
    } else {
      setSelectedSchemes([]);
    }
  };

  const handleSelectScheme = (schemeId: string, checked: boolean) => {
    if (checked) {
      setSelectedSchemes([...selectedSchemes, schemeId]);
    } else {
      setSelectedSchemes(selectedSchemes.filter(id => id !== schemeId));
    }
  };

  const toggleSchemeStatus = async (schemeId: string) => {
    setSchemes(schemes.map(scheme => 
      scheme.id === schemeId 
        ? { ...scheme, isActive: !scheme.isActive }
        : scheme
    ));
  };

  const deleteScheme = async (schemeId: string) => {
    if (confirm("Are you sure you want to delete this scheme?")) {
      setSchemes(schemes.filter(scheme => scheme.id !== schemeId));
    }
  };

  const bulkActivate = () => {
    setSchemes(schemes.map(scheme => 
      selectedSchemes.includes(scheme.id)
        ? { ...scheme, isActive: true }
        : scheme
    ));
    setSelectedSchemes([]);
    setShowBulkActions(false);
  };

  const bulkDeactivate = () => {
    setSchemes(schemes.map(scheme => 
      selectedSchemes.includes(scheme.id)
        ? { ...scheme, isActive: false }
        : scheme
    ));
    setSelectedSchemes([]);
    setShowBulkActions(false);
  };

  const bulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedSchemes.length} schemes?`)) {
      setSchemes(schemes.filter(scheme => !selectedSchemes.includes(scheme.id)));
      setSelectedSchemes([]);
      setShowBulkActions(false);
    }
  };

  useEffect(() => {
    setShowBulkActions(selectedSchemes.length > 0);
  }, [selectedSchemes]);

  return (
    <PageTransition>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">योजनाएं प्रबंधन</h1>
            <p className="text-gray-600 mt-2">Manage government schemes</p>
          </div>
          <Link href="/admin/schemes/new">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              नई योजना जोड़ें
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="नाम से खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Employment">Employment</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                  <SelectItem value="state">State</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active-only"
                  checked={showActiveOnly}
                  onCheckedChange={setShowActiveOnly}
                />
                <label htmlFor="active-only" className="text-sm font-medium">
                  Active Only
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {showBulkActions && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {selectedSchemes.length} schemes selected
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={bulkActivate}>
                    Activate All
                  </Button>
                  <Button size="sm" variant="outline" onClick={bulkDeactivate}>
                    Deactivate All
                  </Button>
                  <Button size="sm" variant="destructive" onClick={bulkDelete}>
                    Delete Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <Checkbox
                        checked={selectedSchemes.length === paginatedSchemes.length && paginatedSchemes.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Active
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedSchemes.map((scheme) => (
                    <tr key={scheme.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <Checkbox
                          checked={selectedSchemes.includes(scheme.id)}
                          onCheckedChange={(checked) => handleSelectScheme(scheme.id, checked as boolean)}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        #{scheme.id}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {scheme.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {scheme.nameHindi}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={categoryColors[scheme.category] || "bg-gray-100 text-gray-800"}>
                          {scheme.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={scheme.level === "central" ? "default" : "secondary"}>
                          {scheme.level === "central" ? "Central" : "State"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {scheme.state || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1 text-gray-400" />
                          {scheme.views.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-gray-400" />
                          {scheme.applications.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Switch
                          checked={scheme.isActive}
                          onCheckedChange={() => toggleSchemeStatus(scheme.id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link href={`/admin/schemes/${scheme.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteScheme(scheme.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSchemes.length)} of{" "}
                {filteredSchemes.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
