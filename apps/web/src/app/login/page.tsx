"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useUserStore } from "@/store/user-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { gsap } from "gsap";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, setLanguage } = useUserStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for success message from registration
    const message = searchParams.get("message");
    if (message === "registration_success") {
      setSuccessMessage(
        language === 'hi' 
          ? "रजी आपका रजिस्ट्रेशन सफल हुआ! अब लॉगिन करें।" 
          : "Registration successful! Please log in."
      );
    }

    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [searchParams, language]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError(language === 'hi' ? 'सभरे फ़ील्ड भरें' : 'Please fill all fields');
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(language === 'hi' ? 'ईमेल या पासवर्ड गलत है' : 'Invalid email or password');
      } else {
        // Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(language === 'hi' ? 'लॉगिन में समस्या हुई' : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Social login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      <Card ref={formRef} className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl">🏛️</span>
          </div>
          <CardTitle className="text-2xl font-bold text-primary mb-2">
            {language === 'hi' ? 'लॉगिन करें' : 'Sign In'}
          </CardTitle>
          <p className="text-muted-foreground">
            {language === 'hi' 
              ? 'अपने SarkariSaathi खाते में लॉगिन करें' 
              : 'Sign in to your SarkariSaathi account'
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-800">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c-.87-2.6-3.3-4.53-6.01-4.53z"/>
              </svg>
              {language === 'hi' ? 'Google से लॉगिन करें' : 'Sign in with Google'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin("github")}
              disabled={isLoading}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957.266 1.983.399 3.003.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 7.288-6.087 7.288-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              {language === 'hi' ? 'GitHub से लॉगिन करें' : 'Sign in with GitHub'}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {language === 'hi' ? 'या' : 'OR'}
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {language === 'hi' ? 'ईमेल या फोन' : 'Email or Phone'}
              </Label>
              <Input
                id="email"
                type="text"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder={language === 'hi' ? 'ईमेल या फोन नंबर' : 'Email or phone number'}
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
                  placeholder={language === 'hi' ? 'आपका पासवर्ड' : 'Your password'}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange("rememberMe", checked)}
                />
                <Label htmlFor="rememberMe" className="text-sm">
                  {language === 'hi' ? 'मुझे याद रखें' : 'Remember me'}
                </Label>
              </div>
              <Link 
                href="/forgot-password" as="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                {language === 'hi' ? 'पासवर्ड भूल गया?' : 'Forgot password?'}
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                language === 'hi' ? 'लॉगिन करें' : 'Sign In'
              )}
            </Button>
          </form>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {language === 'hi' ? 'खाता नहीं है?' : "Don't have an account?"}{" "}
              <Link href="/register" as="/register" className="text-primary hover:underline font-medium">
                {language === 'hi' ? 'रजिस्टर करें' : 'Register'}
              </Link>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>🔒 {language === 'hi' ? 'सुरक्षित' : 'Secure'}</span>
              <span>✅ {language === 'hi' ? 'निःशुल्क' : 'Free'}</span>
              <span>🇮🇳 {language === 'hi' ? 'भारत सरकार' : 'Bharat Sarkar'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
