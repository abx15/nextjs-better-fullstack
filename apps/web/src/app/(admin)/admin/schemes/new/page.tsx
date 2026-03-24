"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewSchemePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nameHindi: "",
    nameEnglish: "",
    slug: "",
    descriptionHindi: "",
    descriptionEnglish: "",
    category: "",
    subcategory: "",
    level: "central",
    state: "All India",
    ministry: "",
    ministryHindi: "",
    benefitType: "financial",
    benefitAmount: "",
    benefitAmountHindi: "",
    eligibilityCriteria: "{}",
    documentsRequired: "[]",
    applicationMode: "both",
    applicationUrl: "",
    difficulty: "medium",
    tags: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/admin/schemes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error("Failed to create scheme");
      
      toast.success("योजना सफलतापूर्वक बनाई गई!");
      router.push("/admin/schemes");
    } catch (error) {
      console.error(error);
      toast.error("योजना बनाने में विफल");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/schemes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#1a3a6b]">नई सरकारी योजना जोड़ें</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">기본 जानकारी (Basic Info)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>योजना का नाम (Hindi)</Label>
              <Input 
                value={formData.nameHindi} 
                onChange={(e) => setFormData({...formData, nameHindi: e.target.value})}
                placeholder="उदा: पीएम-किसान सम्मान निधि"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Name of Scheme (English)</Label>
              <Input 
                value={formData.nameEnglish} 
                onChange={(e) => setFormData({...formData, nameEnglish: e.target.value})}
                placeholder="e.g. PM-KISAN Samman Nidhi"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>URL Slug (unique-id-like-this)</Label>
              <Input 
                value={formData.slug} 
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                placeholder="pm-kisan-id"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select onValueChange={(val) => setFormData({...formData, category: val})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kisan">किसान (Farmer)</SelectItem>
                  <SelectItem value="shiksha">शिक्षा (Education)</SelectItem>
                  <SelectItem value="swasthya">स्वास्थ्य (Health)</SelectItem>
                  <SelectItem value="awas">आवास (Housing)</SelectItem>
                  <SelectItem value="mahila">महिला (Women)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <Label>विवरण (Hindi Description)</Label>
            <Textarea 
              value={formData.descriptionHindi} 
              onChange={(e) => setFormData({...formData, descriptionHindi: e.target.value})}
              rows={3}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">मंत्रालय और विभाग (Ministry & Dept)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>मंत्रालय (Hindi)</Label>
              <Input 
                value={formData.ministryHindi} 
                onChange={(e) => setFormData({...formData, ministryHindi: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Ministry (English)</Label>
              <Input 
                value={formData.ministry} 
                onChange={(e) => setFormData({...formData, ministry: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Level</Label>
              <Select onValueChange={(val) => setFormData({...formData, level: val})} defaultValue="central">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="central">Central (Union)</SelectItem>
                  <SelectItem value="state">State Government</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>State (if applicable)</Label>
              <Input 
                value={formData.state} 
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">लाभ और पात्रता (Benefits & Eligibility)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Benefit Type</Label>
              <Select onValueChange={(val) => setFormData({...formData, benefitType: val})} defaultValue="financial">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financial (Cash)</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="subsidy">Subsidy</SelectItem>
                  <SelectItem value="loan">Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Benefit Amount (e.g. ₹6,000/year)</Label>
              <Input 
                value={formData.benefitAmount} 
                onChange={(e) => setFormData({...formData, benefitAmount: e.target.value})}
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/schemes">
            <Button variant="outline" type="button">रद्द करें</Button>
          </Link>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#1a3a6b] hover:bg-[#1a3a6b]/90 min-w-[120px]"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            सहेजें (Save)
          </Button>
        </div>
      </form>
    </div>
  );
}
