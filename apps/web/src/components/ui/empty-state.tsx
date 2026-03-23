import React from 'react'
import { Card, CardContent } from './card'
import { Button } from './button'
import { ArrowRight, Search, FileText, Users } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  titleHindi: string
  description: string
  descriptionHindi: string
  ctaText?: string
  ctaTextHindi?: string
  ctaHref?: string
  onCTAClick?: () => void
  language?: 'hi' | 'en'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function EmptyState({ 
  icon,
  title,
  titleHindi,
  description,
  descriptionHindi,
  ctaText,
  ctaTextHindi,
  ctaHref,
  onCTAClick,
  language = 'hi',
  className = '',
  size = 'md'
}: EmptyStateProps) {
  const sizeConfig = {
    sm: {
      iconSize: 'w-12 h-12',
      titleSize: 'text-lg',
      descriptionSize: 'text-sm',
      padding: 'p-6'
    },
    md: {
      iconSize: 'w-16 h-16',
      titleSize: 'text-xl',
      descriptionSize: 'text-base',
      padding: 'p-8'
    },
    lg: {
      iconSize: 'w-20 h-20',
      titleSize: 'text-2xl',
      descriptionSize: 'text-lg',
      padding: 'p-10'
    }
  }
  
  const config = sizeConfig[size]
  const displayTitle = language === 'hi' ? titleHindi : title
  const displayDescription = language === 'hi' ? descriptionHindi : description
  const displayCTAText = language === 'hi' ? ctaTextHindi : ctaText
  
  const defaultIcon = icon || (
    <div className="w-full h-full flex items-center justify-center text-4xl">
      📭
    </div>
  )
  
  return (
    <Card className={`text-center ${config.padding} ${className}`}>
      <CardContent className="space-y-6">
        {/* Icon */}
        <div className={`mx-auto ${config.iconSize} flex items-center justify-center text-muted-foreground`}>
          {defaultIcon}
        </div>
        
        {/* Title */}
        <h3 className={`font-bold ${config.titleSize} text-foreground`}>
          {displayTitle}
        </h3>
        
        {/* Description */}
        <p className={`${config.descriptionSize} text-muted-foreground max-w-md mx-auto`}>
          {displayDescription}
        </p>
        
        {/* CTA Button */}
        {(ctaText || ctaTextHindi) && (ctaHref || onCTAClick) && (
          <Button 
            onClick={onCTAClick}
            className="bg-primary hover:bg-primary/90"
            {...(ctaHref && { asChild: true })}
          >
            {ctaHref && (
              <a href={ctaHref} className="flex items-center gap-2">
                {displayCTAText}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
            {!ctaHref && (
              <span className="flex items-center gap-2">
                {displayCTAText}
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// Predefined empty states for common use cases

export function NoSchemesFound({ language = 'hi' }: { language?: 'hi' | 'en' }) {
  return (
    <EmptyState
      icon={<Search className="w-full h-full" />}
      title="No schemes found"
      titleHindi="कोई योजना नहीं मिली"
      description="Try adjusting your filters or search terms to find more schemes."
      descriptionHindi="अधिक योजनाएं खोजने के लिए अपने फ़िल्टर या खोज शब्दों को समायोजित करें।"
      ctaText="Clear filters"
      ctaTextHindi="फ़िल्टर हटाएं"
      language={language}
    />
  )
}

export function NoApplications({ language = 'hi' }: { language?: 'hi' | 'en' }) {
  return (
    <EmptyState
      icon={<FileText className="w-full h-full" />}
      title="No applications yet"
      titleHindi="अभी तक कोई आवेदन नहीं"
      description="Start applying for government schemes that match your profile."
      descriptionHindi="अपनी प्रोफाइल से मेल खाने वाली सरकारी योजनाओं के लिए आवेदन करना शुरू करें।"
      ctaText="Browse schemes"
      ctaTextHindi="योजनाएं देखें"
      ctaHref="/schemes"
      language={language}
    />
  )
}

export function NoSavedSchemes({ language = 'hi' }: { language?: 'hi' | 'en' }) {
  return (
    <EmptyState
      icon={<div className="text-6xl">🔖</div>}
      title="No saved schemes"
      titleHindi="कोई सेव की गई योजना नहीं"
      description="Save schemes you're interested in to apply for them later."
      descriptionHindi="बाद में आवेदन करने के लिए उन योजनाओं को सेव करें जिनमें आपकी रुचि है।"
      ctaText="Explore schemes"
      ctaTextHindi="योजनाएं देखें"
      ctaHref="/schemes"
      language={language}
    />
  )
}

export function NoReminders({ language = 'hi' }: { language?: 'hi' | 'en' }) {
  return (
    <EmptyState
      icon={<div className="text-6xl">🔔</div>}
      title="No reminders"
      titleHindi="कोई अनुस्मारण नहीं"
      description="We'll notify you about important deadlines and updates."
      descriptionHindi="हम आपको महत्वपूर्ण समय सीमा और अपडेट्स के बारे में सूचित करेंगे।"
      size="sm"
      language={language}
    />
  )
}

export function NoMessages({ language = 'hi' }: { language?: 'hi' | 'en' }) {
  return (
    <EmptyState
      icon={<div className="text-6xl">💬</div>}
      title="Start a conversation"
      titleHindi="बातचीत शुरू करें"
      description="Ask our AI about any government scheme or eligibility requirements."
      descriptionHindi="हमारे AI से किसी भी सरकारी योजना या पात्रता आवश्यकताओं के बारे में पूछें।"
      ctaText="Ask something"
      ctaTextHindi="कुछ पूछें"
      language={language}
    />
  )
}

export function NoDocuments({ language = 'hi' }: { language?: 'hi' | 'en' }) {
  return (
    <EmptyState
      icon={<div className="text-6xl">📄</div>}
      title="No documents uploaded"
      titleHindi="कोई दस्तावेज़ अपलोड नहीं किया गया"
      description="Upload your documents to complete your profile and apply for schemes faster."
      descriptionHindi="अपनी प्रोफाइल को पूरा करने और योजनाओं के लिए तेजी से आवेदन करने के लिए अपने दस्तावेज़ अपलोड करें।"
      ctaText="Upload documents"
      ctaTextHindi="दस्तावेज़ अपलोड करें"
      language={language}
    />
  )
}

export function NoResults({ language = 'hi' }: { language?: 'hi' | 'en' }) {
  return (
    <EmptyState
      icon={<div className="text-6xl">🔍</div>}
      title="No results found"
      titleHindi="कोई परिणाम नहीं मिला"
      description="Try different search terms or browse all available schemes."
      descriptionHindi="विभिन्न खोज शब्दों का प्रयास करें या सभी उपलब्ध योजनाओं को ब्राउज़ करें।"
      ctaText="Browse all schemes"
      ctaTextHindi="सभी योजनाएं देखें"
      ctaHref="/schemes"
      language={language}
    />
  )
}

// Compact version for cards
export function EmptyStateCompact({ 
  icon,
  title,
  titleHindi,
  description,
  descriptionHindi,
  language = 'hi'
}: Pick<EmptyStateProps, 'icon' | 'title' | 'titleHindi' | 'description' | 'descriptionHindi' | 'language'>) {
  const displayTitle = language === 'hi' ? titleHindi : title
  const displayDescription = language === 'hi' ? descriptionHindi : description
  
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 mx-auto mb-4 text-muted-foreground">
        {icon || <div className="text-3xl">📭</div>}
      </div>
      <h4 className="font-medium text-sm mb-2">{displayTitle}</h4>
      <p className="text-xs text-muted-foreground">{displayDescription}</p>
    </div>
  )
}
