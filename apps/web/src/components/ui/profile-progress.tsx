import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Progress } from './progress'
import { Button } from './button'
import { User, CheckCircle, Circle, ArrowRight } from 'lucide-react'

interface ProfileProgressBarProps {
  percentage: number
  steps?: Array<{
    id: string
    title: string
    titleHindi: string
    completed: boolean
  }>
  language?: 'hi' | 'en'
  showCTA?: boolean
}

const defaultSteps = [
  {
    id: 'basic',
    title: 'Basic Information',
    titleHindi: 'बेसिक जानकारी',
    completed: true
  },
  {
    id: 'personal',
    title: 'Personal Details',
    titleHindi: 'व्यक्तिगत विवरण',
    completed: true
  },
  {
    id: 'address',
    title: 'Address Information',
    titleHindi: 'पता जानकारी',
    completed: false
  },
  {
    id: 'income',
    title: 'Income Details',
    titleHindi: 'आय विवरण',
    completed: false
  },
  {
    id: 'documents',
    title: 'Document Upload',
    titleHindi: 'दस्तावेज़ अपलोड',
    completed: false
  }
]

export function ProfileProgressBar({ 
  percentage, 
  steps = defaultSteps,
  language = 'hi',
  showCTA = true 
}: ProfileProgressBarProps) {
  const completedSteps = steps.filter(step => step.completed).length
  const totalSteps = steps.length
  
  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2">
          <User className="w-5 h-5 text-primary" />
          <span>{language === 'hi' ? 'प्रोफाइल पूर्णता' : 'Profile Completion'}</span>
        </CardTitle>
        
        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-muted-foreground/20"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
              className="text-primary transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-3xl font-bold text-primary">{percentage}%</span>
              <p className="text-xs text-muted-foreground">
                {language === 'hi' ? 'पूर्ण' : 'Complete'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {language === 'hi' 
            ? `${completedSteps} / ${totalSteps} चरण पूर्ण` 
            : `${completedSteps} / ${totalSteps} steps completed`
          }
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Linear Progress */}
        <div>
          <Progress value={percentage} className="h-3" />
        </div>
        
        {/* Steps List */}
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                step.completed ? 'bg-green-50 border border-green-200' : 'bg-muted/50'
              }`}
            >
              <div className="flex-shrink-0">
                {step.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1">
                <h4 className={`text-sm font-medium ${
                  step.completed ? 'text-green-800' : 'text-muted-foreground'
                }`}>
                  {language === 'hi' ? step.titleHindi : step.title}
                </h4>
                {step.completed && (
                  <p className="text-xs text-green-600">
                    {language === 'hi' ? 'पूर्ण' : 'Completed'}
                  </p>
                )}
              </div>
              
              {!step.completed && index === completedSteps && (
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        {showCTA && percentage < 100 && (
          <div className="pt-4 border-t">
            <Button className="w-full bg-primary hover:bg-primary/90">
              <span className="flex items-center gap-2">
                {language === 'hi' ? 'प्रोफाइल पूरा करें' : 'Complete Profile'}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              {language === 'hi' 
                ? 'बेहतर योजना सुझावों के लिए अपनी प्रोफाइल पूरी करें' 
                : 'Complete your profile for better scheme recommendations'
              }
            </p>
          </div>
        )}
        
        {percentage === 100 && (
          <div className="pt-4 border-t">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-green-800">
                {language === 'hi' ? 'प्रोफाइल पूर्ण!' : 'Profile Complete!'}
              </h4>
              <p className="text-sm text-green-600 mt-1">
                {language === 'hi' 
                  ? 'अब आप सभी योजनाओं के लिए पात्र हैं' 
                  : 'You are now eligible for all schemes'
                }
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
