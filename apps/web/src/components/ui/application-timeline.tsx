import React from 'react'
import { Card, CardContent } from './card'
import { Badge } from './badge'
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react'

interface TimelineStep {
  id: string
  title: string
  titleHindi: string
  status: 'completed' | 'current' | 'pending' | 'rejected'
  date?: Date
  description?: string
  descriptionHindi?: string
}

interface ApplicationTimelineProps {
  steps: TimelineStep[]
  currentStatus: string
  language?: 'hi' | 'en'
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

const defaultSteps: TimelineStep[] = [
  {
    id: 'applied',
    title: 'Applied',
    titleHindi: 'आवेदन किया',
    status: 'completed',
    date: new Date('2024-01-15'),
    description: 'Application submitted successfully',
    descriptionHindi: 'आवेदन सफलतापूर्वक जमा किया गया'
  },
  {
    id: 'received',
    title: 'Received',
    titleHindi: 'प्राप्त हुआ',
    status: 'completed',
    date: new Date('2024-01-18'),
    description: 'Application received by department',
    descriptionHindi: 'विभाग द्वारा आवेदन प्राप्त हुआ'
  },
  {
    id: 'review',
    title: 'Under Review',
    titleHindi: 'समीक्षा में',
    status: 'current',
    description: 'Your application is being reviewed',
    descriptionHindi: 'आपका आवेदन समीक्षा किया जा रहा है'
  },
  {
    id: 'decision',
    title: 'Decision',
    titleHindi: 'निर्णय',
    status: 'pending',
    description: 'Final decision will be communicated',
    descriptionHindi: 'अंतिम निर्णय संवादित किया जाएगा'
  },
  {
    id: 'benefit',
    title: 'Benefit Disbursed',
    titleHindi: 'लाभ वितरित',
    status: 'pending',
    description: 'Benefit amount will be transferred',
    descriptionHindi: 'लाभ राशि हस्तांतरित की जाएगी'
  }
]

export function ApplicationTimeline({ 
  steps = defaultSteps,
  currentStatus,
  language = 'hi',
  orientation = 'horizontal',
  className = ''
}: ApplicationTimelineProps) {
  const getStepIcon = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'current':
        return <Clock className="w-5 h-5 text-primary animate-pulse" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-gray-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }
  
  const getStepColor = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-600 text-green-800'
      case 'current':
        return 'bg-primary/10 border-primary text-primary'
      case 'rejected':
        return 'bg-red-100 border-red-600 text-red-800'
      case 'pending':
        return 'bg-gray-100 border-gray-400 text-gray-600'
      default:
        return 'bg-gray-100 border-gray-400 text-gray-600'
    }
  }
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  if (orientation === 'vertical') {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex gap-4">
                {/* Icon and Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStepColor(step.status)}`}>
                    {getStepIcon(step.status)}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-0.5 h-16 mt-2 ${
                      step.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">
                      {language === 'hi' ? step.titleHindi : step.title}
                    </h3>
                    {step.status === 'current' && (
                      <Badge variant="outline" className="text-xs">
                        {language === 'hi' ? 'वर्तमान' : 'Current'}
                      </Badge>
                    )}
                  </div>
                  
                  {step.date && (
                    <p className="text-xs text-muted-foreground mb-2">
                      {formatDate(step.date)}
                    </p>
                  )}
                  
                  <p className="text-sm text-muted-foreground">
                    {language === 'hi' ? step.descriptionHindi : step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
          <div 
            className="absolute top-5 left-0 h-0.5 bg-green-600 transition-all duration-500"
            style={{ 
              width: `${(steps.filter(s => s.status === 'completed').length / (steps.length - 1)) * 100}%` 
            }}
          />
          
          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center gap-3 flex-1">
                {/* Step Circle */}
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center relative z-10 ${getStepColor(step.status)}`}>
                  {getStepIcon(step.status)}
                  {step.status === 'current' && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping" />
                  )}
                </div>
                
                {/* Step Content */}
                <div className="text-center max-w-[120px]">
                  <h4 className="font-semibold text-xs mb-1">
                    {language === 'hi' ? step.titleHindi : step.title}
                  </h4>
                  
                  {step.date && (
                    <p className="text-xs text-muted-foreground mb-1">
                      {formatDate(step.date)}
                    </p>
                  )}
                  
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {language === 'hi' ? step.descriptionHindi : step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Current Status Summary */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            {getStepIcon(steps.find(s => s.status === 'current')?.status || 'pending')}
            <div>
              <h3 className="font-semibold text-sm">
                {language === 'hi' ? 'वर्तमान स्थिति' : 'Current Status'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'hi' 
                  ? steps.find(s => s.status === 'current')?.titleHindi || 'प्रक्रिया में'
                  : steps.find(s => s.status === 'current')?.title || 'In Progress'
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Compact version for mobile cards
export function ApplicationTimelineCompact({ 
  steps = defaultSteps,
  currentStatus,
  language = 'hi'
}: Omit<ApplicationTimelineProps, 'orientation' | 'className'>) {
  const currentStep = steps.find(s => s.status === 'current')
  const completedSteps = steps.filter(s => s.status === 'completed').length
  
  return (
    <div className="p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">
          {language === 'hi' ? 'आवेदन स्थिति' : 'Application Status'}
        </h3>
        <Badge variant="outline" className="text-xs">
          {completedSteps}/{steps.length} {language === 'hi' ? 'पूर्ण' : 'complete'}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary flex items-center justify-center">
          <Clock className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="font-medium text-sm">
            {language === 'hi' ? currentStep?.titleHindi : currentStep?.title}
          </p>
          <p className="text-xs text-muted-foreground">
            {language === 'hi' ? currentStep?.descriptionHindi : currentStep?.description}
          </p>
        </div>
      </div>
    </div>
  )
}
