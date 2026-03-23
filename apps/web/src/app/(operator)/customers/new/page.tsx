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
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Save, User, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface CustomerData {
  // Step 1: Personal Info
  name: string;
  phone: string;
  email: string;
  aadhaarNumber: string;
  dateOfBirth: string;
  gender: string;
  
  // Step 2: Address
  state: string;
  district: string;
  block: string;
  village: string;
  pincode: string;
  
  // Step 3: Profile Details
  occupation: string;
  annualIncome: string;
  category: string;
  education: string;
  maritalStatus: string;
  familySize: string;
}

export default function NewCustomerPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [customerData, setCustomerData] = useState<CustomerData>({
    // Step 1
    name: "",
    phone: "",
    email: "",
    aadhaarNumber: "",
    dateOfBirth: "",
    gender: "",
    
    // Step 2
    state: "",
    district: "",
    block: "",
    village: "",
    pincode: "",
    
    // Step 3
    occupation: "",
    annualIncome: "",
    category: "",
    education: "",
    maritalStatus: "",
    familySize: "",
  });

  const updateCustomerData = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(customerData.name && customerData.phone && customerData.aadhaarNumber);
      case 2:
        return !!(customerData.state && customerData.district && customerData.pincode);
      case 3:
        return !!(customerData.occupation && customerData.annualIncome);
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(3, currentStep + 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Customer created:", customerData);
      
      // Redirect to scheme finder for this customer
      router.push("/operator/finder");
    } catch (error) {
      console.error("Error creating customer:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            1
          </div>
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          Operator द्वारा बनाया जा रहा है
        </Badge>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={customerData.name}
              onChange={(e) => updateCustomerData("name", e.target.value)}
              placeholder="Customer's full name"
            />
          </div>
          <div>
            <Label htmlFor="phone">Mobile Number *</Label>
            <Input
              id="phone"
              value={customerData.phone}
              onChange={(e) => updateCustomerData("phone", e.target.value)}
              placeholder="10-digit mobile number"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={customerData.email}
              onChange={(e) => updateCustomerData("email", e.target.value)}
              placeholder="email@example.com"
            />
          </div>
          <div>
            <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
            <Input
              id="aadhaarNumber"
              value={customerData.aadhaarNumber}
              onChange={(e) => updateCustomerData("aadhaarNumber", e.target.value)}
              placeholder="12-digit Aadhaar number"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={customerData.dateOfBirth}
              onChange={(e) => updateCustomerData("dateOfBirth", e.target.value)}
            />
          </div>
          <div>
            <Label>Gender</Label>
            <RadioGroup
              value={customerData.gender}
              onValueChange={(value) => updateCustomerData("gender", value)}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            2
          </div>
          Address Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="state">State *</Label>
            <Select value={customerData.state} onValueChange={(value) => updateCustomerData("state", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                <SelectItem value="Bihar">Bihar</SelectItem>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Gujarat">Gujarat</SelectItem>
                <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                <SelectItem value="West Bengal">West Bengal</SelectItem>
                <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                <SelectItem value="Karnataka">Karnataka</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="district">District *</Label>
            <Input
              id="district"
              value={customerData.district}
              onChange={(e) => updateCustomerData("district", e.target.value)}
              placeholder="District name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="block">Block</Label>
            <Input
              id="block"
              value={customerData.block}
              onChange={(e) => updateCustomerData("block", e.target.value)}
              placeholder="Block name"
            />
          </div>
          <div>
            <Label htmlFor="village">Village/City</Label>
            <Input
              id="village"
              value={customerData.village}
              onChange={(e) => updateCustomerData("village", e.target.value)}
              placeholder="Village or city name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pincode">PIN Code *</Label>
            <Input
              id="pincode"
              value={customerData.pincode}
              onChange={(e) => updateCustomerData("pincode", e.target.value)}
              placeholder="6-digit PIN code"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            3
          </div>
          Profile Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="occupation">Occupation *</Label>
            <Select value={customerData.occupation} onValueChange={(value) => updateCustomerData("occupation", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select occupation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="farmer">Farmer</SelectItem>
                <SelectItem value="laborer">Laborer</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="government">Government Employee</SelectItem>
                <SelectItem value="private">Private Employee</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="unemployed">Unemployed</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
                <SelectItem value="homemaker">Homemaker</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="annualIncome">Annual Income *</Label>
            <Select value={customerData.annualIncome} onValueChange={(value) => updateCustomerData("annualIncome", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select income range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1lakh">Below ₹1 Lakh</SelectItem>
                <SelectItem value="1-3lakh">₹1-3 Lakh</SelectItem>
                <SelectItem value="3-5lakh">₹3-5 Lakh</SelectItem>
                <SelectItem value="5-8lakh">₹5-8 Lakh</SelectItem>
                <SelectItem value="8-12lakh">₹8-12 Lakh</SelectItem>
                <SelectItem value="12lakh+">Above ₹12 Lakh</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Social Category</Label>
            <Select value={customerData.category} onValueChange={(value) => updateCustomerData("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="obc">OBC</SelectItem>
                <SelectItem value="sc">SC</SelectItem>
                <SelectItem value="st">ST</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="education">Education</Label>
            <Select value={customerData.education} onValueChange={(value) => updateCustomerData("education", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select education" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="illiterate">Illiterate</SelectItem>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="higher-secondary">Higher Secondary</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
                <SelectItem value="postgraduate">Post Graduate</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Select value={customerData.maritalStatus} onValueChange={(value) => updateCustomerData("maritalStatus", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="familySize">Family Size</Label>
            <Select value={customerData.familySize} onValueChange={(value) => updateCustomerData("familySize", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select family size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Person</SelectItem>
                <SelectItem value="2-4">2-4 Persons</SelectItem>
                <SelectItem value="5-7">5-7 Persons</SelectItem>
                <SelectItem value="8+">8+ Persons</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <PageTransition>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">नया Customer जोड़ें</h1>
          </div>
          <p className="text-gray-600">Register a new customer for scheme assistance</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step === currentStep
                    ? "bg-orange-600 text-white"
                    : step < currentStep
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}>
                  {step < currentStep ? "✓" : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 transition-colors ${
                    step < currentStep ? "bg-green-600" : "bg-gray-300"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep === 3 ? (
            <Button
              onClick={handleSubmit}
              disabled={loading || !validateStep(3)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {loading ? "Creating..." : "Create Customer"}
              <Plus className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!validateStep(currentStep)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
