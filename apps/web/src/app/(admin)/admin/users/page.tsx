"use client";
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Shield,
  Crown,
  Ban,
  CheckCircle,
  UserCheck
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  role: "user" | "admin" | "operator";
  isPremium: boolean;
  isBanned: boolean;
  joinedAt: string;
  lastActive: string;
  applicationsCount: number;
  chatSessionsCount: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Ramesh Kumar",
    email: "ramesh@example.com",
    phone: "+91 9876543210",
    state: "Uttar Pradesh",
    role: "user",
    isPremium: true,
    isBanned: false,
    joinedAt: "2024-01-15",
    lastActive: "2024-07-29T10:30:00Z",
    applicationsCount: 12,
    chatSessionsCount: 45,
  },
  {
    id: "2",
    name: "Sunita Devi",
    email: "sunita@example.com",
    phone: "+91 9876543211",
    state: "Bihar",
    role: "user",
    isPremium: false,
    isBanned: false,
    joinedAt: "2024-02-20",
    lastActive: "2024-07-28T15:45:00Z",
    applicationsCount: 8,
    chatSessionsCount: 23,
  },
  {
    id: "3",
    name: "Amit Sharma",
    email: "amit@example.com",
    phone: "+91 9876543212",
    state: "Maharashtra",
    role: "operator",
    isPremium: false,
    isBanned: false,
    joinedAt: "2024-03-10",
    lastActive: "2024-07-29T09:15:00Z",
    applicationsCount: 156,
    chatSessionsCount: 89,
  },
  {
    id: "4",
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "+91 9876543213",
    state: "Gujarat",
    role: "user",
    isPremium: true,
    isBanned: false,
    joinedAt: "2024-01-25",
    lastActive: "2024-07-27T14:20:00Z",
    applicationsCount: 15,
    chatSessionsCount: 67,
  },
  {
    id: "5",
    name: "Admin User",
    email: "admin@sarkari-saathi.in",
    phone: "+91 9876543214",
    state: "Delhi",
    role: "admin",
    isPremium: false,
    isBanned: false,
    joinedAt: "2023-12-01",
    lastActive: "2024-07-29T11:00:00Z",
    applicationsCount: 0,
    chatSessionsCount: 234,
  },
];

const roleColors: Record<string, string> = {
  "user": "bg-blue-100 text-blue-800",
  "admin": "bg-red-100 text-red-800",
  "operator": "bg-orange-100 text-orange-800",
};

export default function UsersManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedPremium, setSelectedPremium] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const itemsPerPage = 20;

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesPremium = selectedPremium === "all" || 
                         (selectedPremium === "yes" && user.isPremium) ||
                         (selectedPremium === "no" && !user.isPremium);
    const matchesState = selectedState === "all" || user.state === selectedState;
    
    return matchesSearch && matchesRole && matchesPremium && matchesState;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const changeUserRole = async (userId: string, newRole: "user" | "admin" | "operator") => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;

    try {
      await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Failed to change role:", error);
    }
  };

  const toggleUserPremium = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    try {
      await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isPremium: !user.isPremium }),
      });
      setUsers(users.map(u => u.id === userId ? { ...u, isPremium: !u.isPremium } : u));
    } catch (error) {
      console.error("Failed to toggle premium:", error);
    }
  };

  const toggleUserBan = async (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isBanned: !user.isBanned } : user
    ));
  };

  const viewUserProfile = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <PageTransition>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Users Manager</h1>
          <p className="text-gray-600 mt-2">Manage user accounts and permissions</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="name/email/phone"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPremium} onValueChange={setSelectedPremium}>
                <SelectTrigger>
                  <SelectValue placeholder="Premium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="yes">Premium</SelectItem>
                  <SelectItem value="no">Regular</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                  <SelectItem value="Bihar">Bihar</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Gujarat">Gujarat</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Premium
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                          {user.isBanned && (
                            <Badge variant="destructive" className="mt-1">
                              <Ban className="w-3 h-3 mr-1" />
                              Banned
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.phone}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.state}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={roleColors[user.role]}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={user.isPremium ? "default" : "secondary"}>
                          {user.isPremium ? (
                            <>
                              <Crown className="w-3 h-3 mr-1" />
                              Yes
                            </>
                          ) : (
                            "No"
                          )}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {formatDate(user.joinedAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => viewUserProfile(user)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => changeUserRole(user.id, "user")}>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Make User
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => changeUserRole(user.id, "operator")}>
                                <Shield className="w-4 h-4 mr-2" />
                                Make Operator
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => changeUserRole(user.id, "admin")}>
                                <Crown className="w-4 h-4 mr-2" />
                                Make Admin
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleUserPremium(user.id)}>
                                <Crown className="w-4 h-4 mr-2" />
                                {user.isPremium ? "Remove Premium" : "Give Premium"}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => toggleUserBan(user.id)}
                                className={user.isBanned ? "text-green-600" : "text-red-600"}
                              >
                                {user.isBanned ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Unban User
                                  </>
                                ) : (
                                  <>
                                    <Ban className="w-4 h-4 mr-2" />
                                    Ban User
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} results
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

        {/* User Detail Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>User Profile Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Name</Label>
                    <p className="text-lg font-semibold">{selectedUser.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <p>{selectedUser.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Phone</Label>
                    <p>{selectedUser.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">State</Label>
                    <p>{selectedUser.state}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Role</Label>
                    <Badge className={roleColors[selectedUser.role]}>
                      {selectedUser.role}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Premium Status</Label>
                    <Badge variant={selectedUser.isPremium ? "default" : "secondary"}>
                      {selectedUser.isPremium ? "Premium" : "Regular"}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Joined Date</Label>
                    <p>{formatDate(selectedUser.joinedAt)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Last Active</Label>
                    <p>{formatLastActive(selectedUser.lastActive)}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Activity Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{selectedUser.applicationsCount}</p>
                      <p className="text-sm text-gray-600">Applications Submitted</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{selectedUser.chatSessionsCount}</p>
                      <p className="text-sm text-gray-600">Chat Sessions</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Recent Applications (Last 5)</h3>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">No recent applications found</div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowUserModal(false)}>
                    Close
                  </Button>
                  <Button 
                    variant={selectedUser.isBanned ? "default" : "destructive"}
                    onClick={() => {
                      toggleUserBan(selectedUser.id);
                      setShowUserModal(false);
                    }}
                  >
                    {selectedUser.isBanned ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Unban User
                      </>
                    ) : (
                      <>
                        <Ban className="w-4 h-4 mr-2" />
                        Ban User
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
