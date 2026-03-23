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
      }
    } catch (error) {
      console.error("Failed to update application:", error);
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
    <div className="space-y-6">
      {/* TOP STATS BAR */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedStatus("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedStatus === "all"
              ? "bg-[#1a3a6b] text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          📊 कुल: {stats.total}
        </button>
        <button
          onClick={() => setSelectedStatus("applied")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedStatus === "applied"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          📤 Applied: {stats.applied}
        </button>
        <button
          onClick={() => setSelectedStatus("under_review")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedStatus === "under_review"
              ? "bg-yellow-500 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          ⏳ Under Review: {stats.under_review}
        </button>
        <button
          onClick={() => setSelectedStatus("approved")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedStatus === "approved"
              ? "bg-green-500 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          ✅ Approved: {stats.approved}
        </button>
        <button
          onClick={() => setSelectedStatus("rejected")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedStatus === "rejected"
              ? "bg-red-500 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          ❌ Rejected: {stats.rejected}
        </button>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-4 border-b border-gray-200">
        {["all", "applied", "under_review", "approved", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
              selectedStatus === status
                ? "border-[#1a3a6b] text-[#1a3a6b]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {status === "all" && "सभी"}
            {status === "applied" && "Applied"}
            {status === "under_review" && "Under Review"}
            {status === "approved" && "Approved"}
            {status === "rejected" && "Rejected"}
          </button>
        ))}
      </div>

      {/* ADD APPLICATION BUTTON */}
      <div className="flex justify-end">
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-[#FF6B00] hover:bg-[#FF6B00]/90"
        >
          नया आवेदन जोड़ें +
        </Button>
      </div>

      {/* APPLICATIONS LIST */}
      {filteredApplications.length === 0 ? (
        <EmptyState
          icon="📋"
          titleHindi="कोई आवेदन नहीं मिला"
          descriptionHindi="अपना पहला आवेदन जोड़ें"
          actionLabel="नया आवेदन जोड़ें"
          onAction={() => setShowAddModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredApplications.map((application) => (
            <Card
              key={application.id}
              className={`p-6 ${
                application.status === "approved"
                  ? "border-green-200 bg-green-50"
                  : application.status === "rejected"
                  ? "border-red-200 bg-red-50"
                  : ""
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Badge className={`mb-2 ${getStatusColor(application.status)}`}>
                    {getStatusLabel(application.status)}
                  </Badge>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    {application.schemeName}
                  </h3>
                  <p className="text-sm text-gray-600">{application.ministry}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-4">
                <ApplicationTimeline
                  steps={application.timeline.map(item => ({
                    label: item.status === 'applied' ? 'आवेदन' :
                           item.status === 'under_review' ? 'मिला' :
                           item.status === 'approved' ? 'स्वीकृत' :
                           item.status === 'rejected' ? 'अस्वीकृत' : item.status,
                    date: new Date(item.date).toLocaleDateString("hi-IN", {
                      day: "numeric",
                      month: "short"
                    }),
                    status: item.status === application.status ? "active" : "completed"
                  }))}
                />
              </div>

              {/* Reference Number */}
              {application.referenceNo && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500">Reference:</p>
                  <p className="text-sm font-mono">{application.referenceNo}</p>
                </div>
              )}

              {/* Applied Date */}
              <div className="mb-4">
                <p className="text-xs text-gray-500">Applied:</p>
                <p className="text-sm">
                  {application.appliedAt.toLocaleDateString("hi-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Benefit Info (for approved) */}
              {application.status === "approved" && application.benefitAmount && (
                <div className="mb-4 p-3 bg-green-100 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    लाभ: {application.benefitAmount}
                  </p>
                  {application.nextInstallment && (
                    <p className="text-xs text-green-600 mt-1">
                      Next: {application.nextInstallment.amount} in{" "}
                      {Math.ceil(
                        (application.nextInstallment.expectedDate.getTime() - Date.now()) /
                          (1000 * 60 * 60 * 24)
                      )} days
                    </p>
                  )}
                </div>
              )}

              {/* Rejection Reason */}
              {application.status === "rejected" && application.rejectionReason && (
                <div className="mb-4 p-3 bg-red-100 rounded-lg">
                  <p className="text-sm font-medium text-red-800 mb-1">
                    अस्वीकृत क्यों हुआ:
                  </p>
                  <p className="text-sm text-red-700">{application.rejectionReason}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-xs border-red-200 text-red-700 hover:bg-red-50"
                  >
                    ठीक करके दोबारा Apply करें →
                  </Button>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log("View details:", application.id)}
                >
                  Details →
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openUpdateModal(application)}
                >
                  Status Update करें
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ADD APPLICATION MODAL */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>नया आवेदन जोड़ें</DialogTitle>
            <DialogDescription>
              अपने द्वारा आवेदन की गई योजना का विवरण दर्ज करें
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Scheme search</label>
              <Input
                placeholder="Type to search all schemes"
                value={newApplication.schemeName}
                onChange={(e) => setNewApplication({ ...newApplication, schemeName: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Application date</label>
              <Input
                type="date"
                value={newApplication.applicationDate}
                onChange={(e) => setNewApplication({ ...newApplication, applicationDate: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Reference number (optional)</label>
              <Input
                placeholder="Application reference number"
                value={newApplication.referenceNo}
                onChange={(e) => setNewApplication({ ...newApplication, referenceNo: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Notes (optional)</label>
              <Textarea
                placeholder="Any additional notes"
                value={newApplication.notes}
                onChange={(e) => setNewApplication({ ...newApplication, notes: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddApplication} className="bg-[#FF6B00] hover:bg-[#FF6B00]/90">
              आवेदन जोड़ें
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* UPDATE STATUS MODAL */}
      <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Status Update करें</DialogTitle>
            <DialogDescription>
              अपने आवेदन का नवीनतम स्टेटस अपडेट करें
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={updateForm.status} onValueChange={(value) => setUpdateForm({ ...updateForm, status: value })}>
                <SelectTrigger>
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
                <label className="text-sm font-medium">Rejection reason</label>
                <Textarea
                  placeholder="Why was it rejected?"
                  value={updateForm.rejectionReason}
                  onChange={(e) => setUpdateForm({ ...updateForm, rejectionReason: e.target.value })}
                />
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium">Reference number</label>
              <Input
                placeholder="Update reference number"
                value={updateForm.referenceNo}
                onChange={(e) => setUpdateForm({ ...updateForm, referenceNo: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                placeholder="Update notes"
                value={updateForm.notes}
                onChange={(e) => setUpdateForm({ ...updateForm, notes: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateApplication} className="bg-[#FF6B00] hover:bg-[#FF6B00]/90">
              Update करें
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
