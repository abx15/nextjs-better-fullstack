"use client";
import { useState } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, Save, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface EligibilityCriteria {
  key: string;
  value: string;
}

interface Document {
  nameHindi: string;
  nameEnglish: string;
  required: boolean;
  whereToGet?: string;
  cost?: string;
  timeRequired?: string;
}

export default function NewSchemePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [eligibilityCriteria, setEligibilityCriteria] = useState<EligibilityCriteria[]>([
    { key: "minAge", value: "18" },
  ]);
  const [documents, setDocuments] = useState<Document[]>([
    {
      nameHindi: "आधार कार्ड",
      nameEnglish: "Aadhaar Card",
      required: true,
      whereToGet: "आधार केंद्र",
      cost: "फ्री",
      timeRequired: "15 दिन",
    },
  ]);

  const [formData, setFormData] = useState({
    // Tab 1: Basic Info
    nameHindi: "",
    nameEnglish: "",
    descriptionHindi: "",
    descriptionEnglish: "",
    category: "",
    ministryHindi: "",
    ministryEnglish: "",
    level: "central" as "central" | "state",
    state: "",

    // Tab 2: Benefit & Eligibility
    benefitType: "cash" as "cash" | "subsidy" | "loan" | "insurance" | "service",
    benefitAmountHindi: "",
    benefitAmountEnglish: "",
    maxBenefitAmount: "",
    difficulty: "medium" as "easy" | "medium" | "hard",
    isOngoing: true,
    deadline: "",
    totalBeneficiaries: "",

    // Tab 3: Documents & Application
    applicationMode: "online" as "online" | "offline" | "both",
    applicationUrl: "",
    offlineProcessHindi: "",
    offlineProcessEnglish: "",

    // Tab 4: Settings
    isActive: true,
    isVerified: false,
  });

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addEligibilityCriteria = () => {
    setEligibilityCriteria([...eligibilityCriteria, { key: "", value: "" }]);
  };

  const removeEligibilityCriteria = (index: number) => {
    setEligibilityCriteria(eligibilityCriteria.filter((_, i) => i !== index));
  };

  const updateEligibilityCriteria = (index: number, field: "key" | "value", value: string) => {
    const updated = [...eligibilityCriteria];
    updated[index][field] = value;
    setEligibilityCriteria(updated);
  };

  const addDocument = () => {
    setDocuments([...documents, {
      nameHindi: "",
      nameEnglish: "",
      required: false,
    }]);
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const updateDocument = (index: number, field: keyof Document, value: any) => {
    const updated = [...documents];
    updated[index] = { ...updated[index], [field]: value };
    setDocuments(updated);
  };

  const handleSubmit = (action: "draft" | "publish") => {
    console.log("Form submitted:", { formData, tags, eligibilityCriteria, documents, action });
    // Here you would make an API call to save the scheme
    if (action === "publish") {
      router.push("/admin/schemes");
    }
  };

  return (
    <PageTransition>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">नई योजना जोड़ें</h1>
          <p className="text-gray-600 mt-2">Add a new government scheme to the platform</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">बुनियादी जानकारी</TabsTrigger>
            <TabsTrigger value="benefit">लाभ और पात्रता</TabsTrigger>
            <TabsTrigger value="documents">दस्तावेज़ और आवेदन</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Tab 1: Basic Info */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>बुनियादी जानकारी (Basic Info)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nameHindi">Name Hindi *</Label>
                    <Input
                      id="nameHindi"
                      value={formData.nameHindi}
                      onChange={(e) => setFormData({ ...formData, nameHindi: e.target.value })}
                      placeholder="योजना का नाम हिंदी में"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nameEnglish">Name English *</Label>
                    <Input
                      id="nameEnglish"
                      value={formData.nameEnglish}
                      onChange={(e) => setFormData({ ...formData, nameEnglish: e.target.value })}
                      placeholder="Scheme name in English"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="descriptionHindi">Description Hindi *</Label>
                    <Textarea
                      id="descriptionHindi"
                      value={formData.descriptionHindi}
                      onChange={(e) => setFormData({ ...formData, descriptionHindi: e.target.value })}
                      placeholder="योजना का विवरण हिंदी में"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="descriptionEnglish">Description English *</Label>
                    <Textarea
                      id="descriptionEnglish"
                      value={formData.descriptionEnglish}
                      onChange={(e) => setFormData({ ...formData, descriptionEnglish: e.target.value })}
                      placeholder="Scheme description in English"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="housing">Housing</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="employment">Employment</SelectItem>
                        <SelectItem value="energy">Energy</SelectItem>
                        <SelectItem value="women">Women Welfare</SelectItem>
                        <SelectItem value="senior">Senior Citizens</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ministryHindi">Ministry Hindi *</Label>
                    <Input
                      id="ministryHindi"
                      value={formData.ministryHindi}
                      onChange={(e) => setFormData({ ...formData, ministryHindi: e.target.value })}
                      placeholder="मंत्रालय का नाम हिंदी में"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ministryEnglish">Ministry English *</Label>
                    <Input
                      id="ministryEnglish"
                      value={formData.ministryEnglish}
                      onChange={(e) => setFormData({ ...formData, ministryEnglish: e.target.value })}
                      placeholder="Ministry name in English"
                    />
                  </div>
                  <div>
                    <Label>Level *</Label>
                    <RadioGroup
                      value={formData.level}
                      onValueChange={(value: "central" | "state") => setFormData({ ...formData, level: value })}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="central" id="central" />
                        <Label htmlFor="central">Central</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="state" id="state" />
                        <Label htmlFor="state">State</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {formData.level === "state" && (
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Enter state name"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Benefit & Eligibility */}
          <TabsContent value="benefit">
            <Card>
              <CardHeader>
                <CardTitle>लाभ और पात्रता (Benefit & Eligibility)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="benefitType">Benefit Type *</Label>
                    <Select value={formData.benefitType} onValueChange={(value: any) => setFormData({ ...formData, benefitType: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="subsidy">Subsidy</SelectItem>
                        <SelectItem value="loan">Loan</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="maxBenefitAmount">Max Benefit Amount</Label>
                    <Input
                      id="maxBenefitAmount"
                      type="number"
                      value={formData.maxBenefitAmount}
                      onChange={(e) => setFormData({ ...formData, maxBenefitAmount: e.target.value })}
                      placeholder="Maximum benefit amount (optional)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="benefitAmountHindi">Benefit Amount Hindi</Label>
                    <Input
                      id="benefitAmountHindi"
                      value={formData.benefitAmountHindi}
                      onChange={(e) => setFormData({ ...formData, benefitAmountHindi: e.target.value })}
                      placeholder="लाभ की राशि हिंदी में"
                    />
                  </div>
                  <div>
                    <Label htmlFor="benefitAmountEnglish">Benefit Amount English</Label>
                    <Input
                      id="benefitAmountEnglish"
                      value={formData.benefitAmountEnglish}
                      onChange={(e) => setFormData({ ...formData, benefitAmountEnglish: e.target.value })}
                      placeholder="Benefit amount in English"
                    />
                  </div>
                </div>

                <div>
                  <Label>Eligibility Criteria</Label>
                  <div className="space-y-2 mt-2">
                    {eligibilityCriteria.map((criteria, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          placeholder="Key (e.g., minAge, maxIncome)"
                          value={criteria.key}
                          onChange={(e) => updateEligibilityCriteria(index, "key", e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          placeholder="Value (e.g., 18, 500000)"
                          value={criteria.value}
                          onChange={(e) => updateEligibilityCriteria(index, "value", e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeEligibilityCriteria(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addEligibilityCriteria}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Row
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Difficulty</Label>
                  <RadioGroup
                    value={formData.difficulty}
                    onValueChange={(value: "easy" | "medium" | "hard") => setFormData({ ...formData, difficulty: value })}
                    className="flex space-x-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="easy" id="easy" />
                      <Label htmlFor="easy">Easy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hard" id="hard" />
                      <Label htmlFor="hard">Hard</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isOngoing"
                      checked={formData.isOngoing}
                      onCheckedChange={(checked) => setFormData({ ...formData, isOngoing: checked })}
                    />
                    <Label htmlFor="isOngoing">Is Ongoing</Label>
                  </div>
                  <div>
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      disabled={formData.isOngoing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalBeneficiaries">Total Beneficiaries</Label>
                    <Input
                      id="totalBeneficiaries"
                      type="number"
                      value={formData.totalBeneficiaries}
                      onChange={(e) => setFormData({ ...formData, totalBeneficiaries: e.target.value })}
                      placeholder="Total beneficiaries (optional)"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Documents & Application */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>दस्तावेज़ और आवेदन (Documents & Application)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Documents Required</Label>
                  <div className="space-y-4 mt-2">
                    {documents.map((doc, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Name Hindi</Label>
                            <Input
                              value={doc.nameHindi}
                              onChange={(e) => updateDocument(index, "nameHindi", e.target.value)}
                              placeholder="दस्तावेज़ का नाम हिंदी में"
                            />
                          </div>
                          <div>
                            <Label>Name English</Label>
                            <Input
                              value={doc.nameEnglish}
                              onChange={(e) => updateDocument(index, "nameEnglish", e.target.value)}
                              placeholder="Document name in English"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={doc.required}
                              onCheckedChange={(checked) => updateDocument(index, "required", checked)}
                            />
                            <Label>Required</Label>
                          </div>
                          <div className="flex justify-end">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeDocument(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <Label>Where to get (Hindi)</Label>
                            <Input
                              value={doc.whereToGet || ""}
                              onChange={(e) => updateDocument(index, "whereToGet", e.target.value)}
                              placeholder="कहाँ से प्राप्त करें"
                            />
                          </div>
                          <div>
                            <Label>Cost</Label>
                            <Input
                              value={doc.cost || ""}
                              onChange={(e) => updateDocument(index, "cost", e.target.value)}
                              placeholder="Cost"
                            />
                          </div>
                          <div>
                            <Label>Time Required</Label>
                            <Input
                              value={doc.timeRequired || ""}
                              onChange={(e) => updateDocument(index, "timeRequired", e.target.value)}
                              placeholder="Time required"
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                    <Button type="button" variant="outline" onClick={addDocument}>
                      <Plus className="w-4 h-4 mr-2" />
                      दस्तावेज़ जोड़ें
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="applicationMode">Application Mode</Label>
                  <Select value={formData.applicationMode} onValueChange={(value: any) => setFormData({ ...formData, applicationMode: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.applicationMode !== "offline" && (
                  <div>
                    <Label htmlFor="applicationUrl">Application URL</Label>
                    <Input
                      id="applicationUrl"
                      value={formData.applicationUrl}
                      onChange={(e) => setFormData({ ...formData, applicationUrl: e.target.value })}
                      placeholder="https://example.com/apply"
                    />
                  </div>
                )}

                {formData.applicationMode !== "online" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="offlineProcessHindi">Offline Process Hindi</Label>
                      <Textarea
                        id="offlineProcessHindi"
                        value={formData.offlineProcessHindi}
                        onChange={(e) => setFormData({ ...formData, offlineProcessHindi: e.target.value })}
                        placeholder="ऑफलाइन आवेदन प्रक्रिया हिंदी में"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="offlineProcessEnglish">Offline Process English</Label>
                      <Textarea
                        id="offlineProcessEnglish"
                        value={formData.offlineProcessEnglish}
                        onChange={(e) => setFormData({ ...formData, offlineProcessEnglish: e.target.value })}
                        placeholder="Offline application process in English"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4: Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Tags</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tag and press Enter"
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <Button type="button" onClick={addTag}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label htmlFor="isActive">Is Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isVerified"
                      checked={formData.isVerified}
                      onCheckedChange={(checked) => setFormData({ ...formData, isVerified: checked })}
                    />
                    <Label htmlFor="isVerified">Is Verified</Label>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => handleSubmit("draft")}>
                      <Save className="w-4 h-4 mr-2" />
                      Save as Draft
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleSubmit("publish")}>
                      <Eye className="w-4 h-4 mr-2" />
                      Publish ✅
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
}
