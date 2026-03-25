"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { gsap } from "gsap";

export default function ForgotPasswordPage() {
  const { language, setLanguage } = useUserStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError(language === 'hi' ? 'ईमेल भरें' : 'Please enter your email');
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate password reset API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Password reset error:", error);
      setError(language === 'hi' ? 'समस्या हुई' : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
        {/* Mobile Header - Hidden since we have navbar now */}
        
        <div className="absolute top-4 right-4 z-10">
          <LanguageToggle />
        </div>
        
        <Card ref={formRef} className="w-full max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              <Link 
                href="/login" 
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl sm:text-4xl">🔐</span>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-primary mb-2">
                {language === 'hi' ? 'पासवर्ड भूल गया?' : 'Forgot Password?'}
              </CardTitle>
              <p className="text-muted-foreground text-sm sm:text-base">
                {language === 'hi' 
                  ? 'अपना ईमेल दर्ज करें, हम आपको पासवर्ड रीसेट लिंक भेजेंगे' 
                  : 'Enter your email address and we\'ll send you a link to reset your password'
                }
              </p>
            </div>
          </CardHeader>
        
          <CardContent className="space-y-6">
            {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2 text-sm sm:text-base">
                  <Mail className="w-4 h-4" />
                  {language === 'hi' ? 'ईमेल' : 'Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'hi' ? 'आपका ईमेल' : 'Your email address'}
                  className="h-11 sm:h-12 text-sm sm:text-base"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs sm:text-sm text-red-800">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 h-11 sm:h-12 text-sm sm:text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  language === 'hi' ? 'रीसेट लिंक भेजें' : 'Send reset link'
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2">
                  {language === 'hi' ? 'रीसेट लिंक भेज दिया गया!' : 'Reset link sent!'}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {language === 'hi' 
                    ? 'हमने आपके ईमेल पर रीसेट लिंक भेज दिया है' 
                    : 'We\'ve sent a reset link to your email'
                  }
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {language === 'hi' 
                    ? 'कृपया ईमेल देखें और निर्देशनों का पालन करें' 
                    : 'Check your email and follow the instructions'
                  }
                </p>
              </div>
              
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                className="w-full h-11 sm:h-12 text-sm sm:text-base"
              >
                {language === 'hi' ? 'दूसरा भेजें' : 'Send another'}
              </Button>
            </div>
          )}

          {/* Back to Login */}
          <div className="text-center">
            <Link 
              href="/login" 
              className="text-xs sm:text-sm text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              {language === 'hi' ? 'लॉगिन पर वापस' : 'Back to login'}
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
