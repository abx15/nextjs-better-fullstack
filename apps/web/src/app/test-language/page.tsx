"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TestLanguagePage() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          {t('welcomeBack')} - {language === 'hi' ? 'हिंदी' : 'English'}
        </h1>
        
        <div className="space-y-4">
          <p>Current Language: {language}</p>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => setLanguage('hi')}
              variant={language === 'hi' ? 'default' : 'outline'}
            >
              हिंदी
            </Button>
            <Button 
              onClick={() => setLanguage('en')}
              variant={language === 'en' ? 'default' : 'outline'}
            >
              English
            </Button>
          </div>
          
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold mb-2">Translation Test:</h2>
            <ul className="space-y-1">
              <li>Dashboard: {t('dashboard')}</li>
              <li>Finder: {t('finder')}</li>
              <li>AI Assistant: {t('aiAssistant')}</li>
              <li>Application Tracker: {t('applicationTracker')}</li>
              <li>Profile: {t('profile')}</li>
              <li>Settings: {t('settings')}</li>
              <li>Logout: {t('logout')}</li>
            </ul>
          </div>
          
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold mb-2">Date Format Test:</h2>
            <p>
              {new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
