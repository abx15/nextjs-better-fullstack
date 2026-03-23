"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Eye, EyeOff, User, Mail, Phone, Lock, MapPin, Calendar, Briefcase } from "lucide-react";
import { gsap } from "gsap";

export default function RegisterPage() {
  const router = useRouter();
  const { language, setLanguage } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    
    // Profile Info
    age: "",
    gender: "",
    state: "",
    district: "",
    pincode: "",
    caste: "general",
    occupation: "other",
    annualIncome: "",
    bplCard: false,
    rationCardType: "",
    
    // Additional Info
    isDisabled: false,
    isWidow: false,
    isSeniorCitizen: false,
    isMinority: false,
    isStudying: false,
    educationLevel: "",
    landHolding: "",
  });

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone && 
               formData.password && formData.confirmPassword && 
               formData.password === formData.confirmPassword &&
               formData.acceptTerms;
      case 2:
        return formData.age && formData.gender && formData.state && formData.district;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(step)) return;
    
    setIsLoading(true);
    
    try {
      // Create user account
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          profile: {
            age: parseInt(formData.age),
            gender: formData.gender,
            state: formData.state,
            district: formData.district,
            pincode: formData.pincode || undefined,
            caste: formData.caste,
            occupation: formData.occupation,
            annualIncome: parseInt(formData.annualIncome) || 0,
            bplCard: formData.bplCard,
            rationCardType: formData.rationCardType || undefined,
            isDisabled: formData.isDisabled,
            isWidow: formData.isWidow,
            isSeniorCitizen: formData.isSeniorCitizen,
            isMinority: formData.isMinority,
            isStudying: formData.isStudying,
            educationLevel: formData.educationLevel || undefined,
            landHolding: formData.landHolding ? parseFloat(formData.landHolding) : undefined,
          }
        }),
      });

      if (response.ok) {
        // Redirect to login
        router.push("/login?message=registration_success");
      } else {
        const error = await response.json();
        console.error("Registration failed:", error);
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu & Kashmir", "Ladakh", "Lakshadweep", "Andaman & Nicobar"
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          {language === 'hi' ? 'रजिस्टर करें' : 'Create Account'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'hi' 
            ? 'सरकारी योजनाओं का लाभ उठाने के लिए अपना खाता बनाएं' 
            : 'Create your account to access government schemes'
          }
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {language === 'hi' ? 'पूरा नाम' : 'Full Name'}
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder={language === 'hi' ? 'आपका पूरा नाम' : 'Your full name'}
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {language === 'hi' ? 'ईमेल' : 'Email'}
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder={language === 'hi' ? 'आपका ईमेल' : 'Your email'}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {language === 'hi' ? 'फोन नंबर' : 'Phone Number'}
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder={language === 'hi' ? 'आपका फोन नंबर' : 'Your phone number'}
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            {language === 'hi' ? 'पासवर्ड' : 'Password'}
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder={language === 'hi' ? 'पासवर्ड बनाएं' : 'Create password'}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            {language === 'hi' ? 'पासवर्ड की पुष्टि करें' : 'Confirm Password'}
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              placeholder={language === 'hi' ? 'पासवर्ड फिर से डालें' : 'Re-enter password'}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {language === 'hi' ? 'पासवर्ड मेल नहीं खा रहे' : 'Passwords do not match'}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => handleInputChange("acceptTerms", checked)}
          />
          <Label htmlFor="acceptTerms" className="text-sm">
            {language === 'hi' 
              ? 'मैं नियम और शर्तों से सहमत हूं' 
              : 'I agree to the terms and conditions'
            }
          </Label>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">
          {language === 'hi' ? 'अपनी प्रोफाइल जानकारी' : 'Your Profile Information'}
        </h2>
        <p className="text-muted-foreground">
          {language === 'hi' 
            ? 'बेहतर योजना सुझावों के लिए अपनी जानकारी भरें' 
            : 'Fill your information for better scheme recommendations'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="age" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {language === 'hi' ? 'उम्र' : 'Age'}
          </Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            placeholder={language === 'hi' ? 'आपकी उम्र' : 'Your age'}
            required
          />
        </div>

        <div>
          <Label htmlFor="gender">{language === 'hi' ? 'लिंग' : 'Gender'}</Label>
          <select
            id="gender"
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">{language === 'hi' ? 'चुनें' : 'Select'}</option>
            <option value="male">{language === 'hi' ? 'पुरुष' : 'Male'}</option>
            <option value="female">{language === 'hi' ? 'महिला' : 'Female'}</option>
            <option value="other">{language === 'hi' ? 'अन्य' : 'Other'}</option>
          </select>
        </div>

        <div>
          <Label htmlFor="state" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {language === 'hi' ? 'राज्य' : 'State'}
          </Label>
          <select
            id="state"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">{language === 'hi' ? 'राज्य चुनें' : 'Select state'}</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="district">{language === 'hi' ? 'जिला' : 'District'}</Label>
          <Input
            id="district"
            type="text"
            value={formData.district}
            onChange={(e) => handleInputChange("district", e.target.value)}
            placeholder={language === 'hi' ? 'आपका जिला' : 'Your district'}
            required
          />
        </div>

        <div>
          <Label htmlFor="pincode">{language === 'hi' ? 'पिनकोड' : 'Pincode'}</Label>
          <Input
            id="pincode"
            type="text"
            value={formData.pincode}
            onChange={(e) => handleInputChange("pincode", e.target.value)}
            placeholder={language === 'hi' ? 'पिनकोड (वैकल्पिक)' : 'Pincode (optional)'}
          />
        </div>

        <div>
          <Label htmlFor="caste">{language === 'hi' ? 'जाति' : 'Caste'}</Label>
          <select
            id="caste"
            value={formData.caste}
            onChange={(e) => handleInputChange("caste", e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="general">{language === 'hi' ? 'सामान्य' : 'General'}</option>
            <option value="sc">{language === 'hi' ? 'अनुसूचित जाति' : 'Scheduled Caste'}</option>
            <option value="st">{language === 'hi' ? 'अनुसूचित जनजाति' : 'Scheduled Tribe'}</option>
            <option value="obc">{language === 'hi' ? 'अन्य पिछड़ा वर्ग' : 'Other Backward Class'}</option>
          </select>
        </div>

        <div>
          <Label htmlFor="occupation" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            {language === 'hi' ? 'व्यवसाय' : 'Occupation'}
          </Label>
          <select
            id="occupation"
            value={formData.occupation}
            onChange={(e) => handleInputChange("occupation", e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="other">{language === 'hi' ? 'अन्य' : 'Other'}</option>
            <option value="farmer">{language === 'hi' ? 'किसान' : 'Farmer'}</option>
            <option value="student">{language === 'hi' ? 'छात्र' : 'Student'}</option>
            <option value="business">{language === 'hi' ? 'व्यवसायी' : 'Business'}</option>
            <option value="service">{language === 'hi' ? 'सेवा' : 'Service'}</option>
            <option value="labor">{language === 'hi' ? 'मजदूर' : 'Labor'}</option>
          </select>
        </div>

        <div>
          <Label htmlFor="annualIncome">{language === 'hi' ? 'वार्षिक आय' : 'Annual Income'}</Label>
          <Input
            id="annualIncome"
            type="number"
            value={formData.annualIncome}
            onChange={(e) => handleInputChange("annualIncome", e.target.value)}
            placeholder={language === 'hi' ? 'वार्षिक आय (रुपये)' : 'Annual income (rupees)'}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="bplCard"
            checked={formData.bplCard}
            onCheckedChange={(checked) => handleInputChange("bplCard", checked)}
          />
          <Label htmlFor="bplCard" className="text-sm">
            {language === 'hi' ? 'बीपीएल कार्ड धारक' : 'BPL Card Holder'}
          </Label>
        </div>

        {formData.bplCard && (
          <div>
            <Label htmlFor="rationCardType">{language === 'hi' ? 'राशन कार्ड प्रकार' : 'Ration Card Type'}</Label>
            <select
              id="rationCardType"
              value={formData.rationCardType}
              onChange={(e) => handleInputChange("rationCardType", e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">{language === 'hi' ? 'चुनें' : 'Select'}</option>
              <option value="yellow">{language === 'hi' ? 'पीला कार्ड' : 'Yellow Card'}</option>
              <option value="pink">{language === 'hi' ? 'गुलाबी कार्ड' : 'Pink Card'}</option>
              <option value="antyodaya">{language === 'hi' ? 'अंत्योदय कार्ड' : 'Antyodaya Card'}</option>
            </select>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isSeniorCitizen"
            checked={formData.isSeniorCitizen}
            onCheckedChange={(checked) => handleInputChange("isSeniorCitizen", checked)}
          />
          <Label htmlFor="isSeniorCitizen" className="text-sm">
            {language === 'hi' ? 'वृद्ध नागरिक (60+)' : 'Senior Citizen (60+)'}
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isDisabled"
            checked={formData.isDisabled}
            onCheckedChange={(checked) => handleInputChange("isDisabled", checked)}
          />
          <Label htmlFor="isDisabled" className="text-sm">
            {language === 'hi' ? 'दिव्यांग' : 'Disabled'}
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isWidow"
            checked={formData.isWidow}
            onCheckedChange={(checked) => handleInputChange("isWidow", checked)}
          />
          <Label htmlFor="isWidow" className="text-sm">
            {language === 'hi' ? 'विधवा' : 'Widow'}
          </Label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      <Card ref={formRef} className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl">🏛️</span>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            SarkariSaathi
          </CardTitle>
          <p className="text-muted-foreground">
            {language === 'hi' ? 'भारत का AI सरकारी योजना फाइंडर' : 'India\'s AI Government Scheme Finder'}
          </p>
        </CardHeader>
        
        <CardContent>
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${
                step >= 2 ? 'bg-primary' : 'bg-muted'
              }`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              }`}>
                2
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  {language === 'hi' ? 'पीछे' : 'Back'}
                </Button>
              )}
              
              <div className="flex gap-2 ml-auto">
                {step < 2 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!validateStep(step) || isLoading}
                    className="ml-auto"
                  >
                    {language === 'hi' ? 'अगला' : 'Next'}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      language === 'hi' ? 'रजिस्टर करें' : 'Register'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              {language === 'hi' ? 'पहले से ही खाता है?' : 'Already have an account?'}{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                {language === 'hi' ? 'लॉगिन करें' : 'Sign in'}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
