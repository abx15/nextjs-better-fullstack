"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ApplicationTimeline from "@/components/sarkari/application-timeline";
import EmptyState from "@/components/sarkari/empty-state";

interface Application {
  id: string;
  schemeId: string;
  schemeName: string;
  schemeCategory: string;
  ministry: string;
  status: "applied" | "under_review" | "approved" | "rejected" | "cancelled";
  appliedAt: Date;
  updatedAt: Date;
  referenceNo?: string;
  notes?: string;
  rejectionReason?: string;
  timeline: Array<{
    status: string;
    date: Date;
    note?: string;
  }>;
  benefitAmount?: string;
  nextInstallment?: {
    amount: string;
    expectedDate: Date;
  };
}

export default function ApplicationTrackerPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [newApplication, setNewApplication] = useState({
    schemeName: "",
    applicationDate: new Date().toISOString().split('T')[0],
    referenceNo: "",
    notes: "",
  });
  const [updateForm, setUpdateForm] = useState({
    status: "",
    referenceNo: "",
    notes: "",
    rejectionReason: "",
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/applications");
      
      // Check if response is ok and content type is JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      
      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      // Mock data for demo
      const mockApplications: Application[] = [
        {
          id: "1",
          schemeId: "pm-kisan",
          schemeName: "पीएम-किसान सम्मान निधि",
          schemeCategory: "kisan",
          ministry: "कृषि एवं किसान कल्याण मंत्रालय",
          status: "approved",
          appliedAt: new Date("2026-01-15"),
          updatedAt: new Date("2026-01-20"),
          referenceNo: "PMKISAN2026/UP/001234",
          benefitAmount: "₹6,000/साल",
          nextInstallment: {
            amount: "₹2,000",
            expectedDate: new Date("2026-04-01"),
          },
          timeline: [
            { status: "applied", date: new Date("2026-01-15"), note: "ऑनलाइन आवेदन किया" },
            { status: "under_review", date: new Date("2026-01-16"), note: "आवेदन मिला" },
            { status: "approved", date: new Date("2026-01-20"), note: "स्वीकृत" },
          ],
        },
        {
          id: "2",
          schemeId: "ayushman",
          schemeName: "आयुष्मान भारत",
          schemeCategory: "swasthya",
          ministry: "स्वास्थ्य एवं परिवार कल्याण मंत्रालय",
          status: "under_review",
          appliedAt: new Date("2026-02-10"),
          updatedAt: new Date("2026-02-12"),
          referenceNo: "AYU2026/UP/005678",
          benefitAmount: "₹5 लाख/साल",
          timeline: [
            { status: "applied", date: new Date("2026-02-10"), note: "ऑनलाइन आवेदन किया" },
            { status: "under_review", date: new Date("2026-02-12"), note: "समीक्षा में" },
          ],
        },
        {
          id: "3",
          schemeId: "pm-awas",
          schemeName: "प्रधानमंत्री आवास योजना",
          schemeCategory: "awas",
          ministry: "आवास और शहरी कार्य मंत्रालय",
          status: "rejected",
          appliedAt: new Date("2026-01-05"),
          updatedAt: new Date("2026-01-25"),
          referenceNo: "PMAWAS2026/UP/009012",
          rejectionReason: "आय प्रमाण पत्र गलत था",
          timeline: [
            { status: "applied", date: new Date("2026-01-05"), note: "ऑनलाइन आवेदन किया" },
            { status: "under_review", date: new Date("2026-01-10"), note: "दस्तावेज़ जांच" },
            { status: "rejected", date: new Date("2026-01-25"), note: "अस्वीकृत" },
          ],
        },
      ];
      setApplications(mockApplications);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === "applied").length,
    under_review: applications.filter(a => a.status === "under_review").length,
    approved: applications.filter(a => a.status === "approved").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  };

  const filteredApplications = selectedStatus === "all" 
    ? applications 
    : applications.filter(a => a.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-blue-100 text-blue-700";
      case "under_review": return "bg-yellow-100 text-yellow-700";
      case "approved": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      case "cancelled": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "applied": return "आवेदन किया";
      case "under_review": return "समीक्षा में";
      case "approved": return "स्वीकृत ✅";
      case "rejected": return "अस्वीकृत ❌";
      case "cancelled": return "रद्द";
      default: return status;
    }
  };

  const handleAddApplication = async () => {
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApplication),
      });
      
      if (response.ok) {
        setShowAddModal(false);
        setNewApplication({
          schemeName: "",
          applicationDate: new Date().toISOString().split('T')[0],
          referenceNo: "",
          notes: "",
        });
        fetchApplications();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to add application:", error);
    }
  };

  const handleUpdateApplication = async () => {
    if (!selectedApplication) return;
    
    try {
      const response = await fetch(`/api/applications/${selectedApplication.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateForm),
      });
      
      if (response.ok) {
        setShowUpdateModal(false);
        setSelectedApplication(null);
        setUpdateForm({
          status: "",
          referenceNo: "",
          notes: "",
          rejectionReason: "",
        });
        fetchApplications();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to update application:", error);
    }
  };

  const handleDeleteApplication = async (applicationId: string) => {
    if (!confirm("क्या आप इस आवेदन को delete करना चाहते हैं?")) return;
    
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        fetchApplications();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  };

  const openUpdateModal = (application: Application) => {
    setSelectedApplication(application);
    setUpdateForm({
      status: application.status,
      referenceNo: application.referenceNo || "",
      notes: application.notes || "",
      rejectionReason: application.rejectionReason || "",
    });
    setShowUpdateModal(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* TOP STATS BAR */}
      <div className="flex flex-wrap gap-1 md:gap-2">
        <button
          onClick={() => setSelectedStatus("all")}
          className={`px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
            selectedStatus === "all"
              ? "bg-[#1a3a6b] text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          📊 कुल: {stats.total}
        </button>
        <button
          onClick={() => setSelectedStatus("applied")}
          className={`px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
            selectedStatus === "applied"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          📤 Applied: {stats.applied}
        </button>
        <button
          onClick={() => setSelectedStatus("under_review")}
          className={`px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
            selectedStatus === "under_review"
              ? "bg-yellow-500 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          ⏳ Under Review: {stats.under_review}
        </button>
        <button
          onClick={() => setSelectedStatus("approved")}
          className={`px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
            selectedStatus === "approved"
              ? "bg-green-500 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          ✅ Approved: {stats.approved}
        </button>
        <button
          onClick={() => setSelectedStatus("rejected")}
          className={`px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
            selectedStatus === "rejected"
              ? "bg-red-500 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          ❌ Rejected: {stats.rejected}
        </button>
      </div>

      {/* APPLICATIONS LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
        {filteredApplications.map((application) => (
          <Card
            key={application.id}
            className="p-3 md:p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => openUpdateModal(application)}
          >
            <div className="flex justify-between items-start mb-2 md:mb-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm md:text-base font-semibold text-gray-800 truncate">
                  {application.schemeName}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 truncate">
                  {application.ministry}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                  getStatusColor(application.status)
                }`}
              >
                {getStatusLabel(application.status)}
              </span>
            </div>

            <div className="space-y-1 md:space-y-2">
              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-gray-500">Applied:</span>
                <span className="text-gray-700">
                  {new Date(application.appliedAt).toLocaleDateString("hi-IN")}
                </span>
              </div>
              
              {application.referenceNo && (
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-gray-500">Ref No:</span>
                  <span className="text-gray-700 font-mono text-xs truncate ml-2">
                    {application.referenceNo}
                  </span>
                </div>
              )}
              
              {application.benefitAmount && (
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-gray-500">Benefit:</span>
                  <span className="text-green-600 font-medium">
                    {application.benefitAmount}
                  </span>
                </div>
              )}
            </div>

            {application.notes && (
              <div className="mt-2 md:mt-3 p-2 bg-gray-50 rounded text-xs md:text-sm text-gray-600">
                <span className="font-medium">Notes:</span> {application.notes}
              </div>
            )}

            <div className="mt-2 md:mt-3 flex justify-between items-center">
              <button className="text-xs md:text-sm text-[#1a3a6b] hover:text-[#1a3a6b]/80 font-medium">
                View Details →
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteApplication(application.id);
                }}
                className="text-xs md:text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* ADD APPLICATION BUTTON */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-full shadow-lg flex items-center justify-center text-xl md:text-2xl font-bold transition-colors z-10"
      >
        +
      </button>

      {/* ADD APPLICATION MODAL */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="w-[95%] md:w-full max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">Add New Application</DialogTitle>
            <DialogDescription className="text-sm md:text-base">
              Enter the details of your government scheme application.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Scheme Name *
              </label>
              <Input
                value={newApplication.schemeName}
                onChange={(e) => setNewApplication({ ...newApplication, schemeName: e.target.value })}
                placeholder="e.g., PM-KISAN Samman Nidhi"
                className="text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Application Date *
              </label>
              <Input
                type="date"
                value={newApplication.applicationDate}
                onChange={(e) => setNewApplication({ ...newApplication, applicationDate: e.target.value })}
                className="text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Reference Number
              </label>
              <Input
                value={newApplication.referenceNo}
                onChange={(e) => setNewApplication({ ...newApplication, referenceNo: e.target.value })}
                placeholder="Application reference number"
                className="text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={newApplication.notes}
                onChange={(e) => setNewApplication({ ...newApplication, notes: e.target.value })}
                placeholder="Additional notes or documents required"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="w-full sm:w-auto text-sm md:text-base"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddApplication}
              disabled={!newApplication.schemeName || !newApplication.applicationDate}
              className="w-full sm:w-auto bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-sm md:text-base"
            >
              Add Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* UPDATE APPLICATION MODAL */}
      <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
        <DialogContent className="w-[95%] md:w-full max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">Status Update करें</DialogTitle>
            <DialogDescription className="text-sm md:text-base">
              अपने आवेदन का नवीनतम स्टेटस अपडेट करें
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Status</label>
              <Select value={updateForm.status} onValueChange={(value) => setUpdateForm({ ...updateForm, status: value })}>
                <SelectTrigger className="text-sm md:text-base">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="applied">आवेदन किया</SelectItem>
                  <SelectItem value="under_review">समीक्षा में</SelectItem>
                  <SelectItem value="approved">स्वीकृत</SelectItem>
                  <SelectItem value="rejected">अस्वीकृत</SelectItem>
                  <SelectItem value="cancelled">रद्द</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {updateForm.status === "rejected" && (
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Rejection reason</label>
                <Textarea
                  placeholder="Why was it rejected?"
                  value={updateForm.rejectionReason}
                  onChange={(e) => setUpdateForm({ ...updateForm, rejectionReason: e.target.value })}
                  className="text-sm md:text-base"
                />
              </div>
            )}
            
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Reference number</label>
              <Input
                placeholder="Update reference number"
                value={updateForm.referenceNo}
                onChange={(e) => setUpdateForm({ ...updateForm, referenceNo: e.target.value })}
                className="text-sm md:text-base"
              />
            </div>
            
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Notes</label>
              <Textarea
                placeholder="Update notes"
                value={updateForm.notes}
                onChange={(e) => setUpdateForm({ ...updateForm, notes: e.target.value })}
                className="text-sm md:text-base"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowUpdateModal(false)} className="w-full sm:w-auto text-sm md:text-base">
              Cancel
            </Button>
            <Button onClick={handleUpdateApplication} className="w-full sm:w-auto bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-sm md:text-base">
              Update करें
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
