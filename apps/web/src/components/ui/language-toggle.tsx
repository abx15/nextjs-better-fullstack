import React, { useState } from 'react'
import { Button } from './button'
import { useUserStore } from '@/store/user-store'
import { Globe } from 'lucide-react'

interface LanguageToggleProps {
  size?: 'sm' | 'lg' | 'default' | 'xs'
  variant?: 'default' | 'outline' | 'ghost'
  showIcon?: boolean
}

export function LanguageToggle({ 
  size = 'default', 
  variant = 'outline',
  showIcon = true 
}: LanguageToggleProps) {
  const { language, setLanguage } = useUserStore()
  const [isAnimating, setIsAnimating] = useState(false)
  
  const handleLanguageChange = () => {
    setIsAnimating(true)
    const newLanguage = language === 'hi' ? 'en' : 'hi'
    setLanguage(newLanguage)
    
    // Save to localStorage
    localStorage.setItem('sarkari-language', newLanguage)
    
    // Reset animation
    setTimeout(() => setIsAnimating(false), 300)
  }
  
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-xs',
    default: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLanguageChange}
      className={`
        relative overflow-hidden transition-all duration-300
        ${sizeClasses[size]}
        ${isAnimating ? 'scale-95' : 'scale-100'}
        ${variant === 'default' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}
        ${variant === 'outline' ? 'border-2 hover:bg-primary hover:text-primary-foreground' : ''}
        ${variant === 'ghost' ? 'hover:bg-primary/10' : ''}
      `}
    >
      {/* Animated background effect */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
        transform -skew-x-12 transition-transform duration-700
        ${isAnimating ? 'translate-x-full' : '-translate-x-full'}
      `} />
      
      <div className="relative flex items-center gap-2">
        {showIcon && (
          <Globe className={`
            w-4 h-4 transition-transform duration-300
            ${isAnimating ? 'rotate-180' : 'rotate-0'}
          `} />
        )}
        
        <span className={`
          font-medium transition-all duration-300
          ${isAnimating ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}
        `}>
          {language === 'hi' ? 'हिंदी' : 'EN'}
        </span>
        
        {/* Language indicator dots */}
        <div className="flex gap-1">
          <div className={`
            w-1.5 h-1.5 rounded-full transition-all duration-300
            ${language === 'hi' ? 'bg-primary-foreground' : 'bg-transparent'}
          `} />
          <div className={`
            w-1.5 h-1.5 rounded-full transition-all duration-300
            ${language === 'en' ? 'bg-primary-foreground' : 'bg-transparent'}
          `} />
        </div>
      </div>
      
      {/* Hover tooltip */}
      <div className="
        absolute -bottom-8 left-1/2 transform -translate-x-1/2
        bg-gray-900 text-white text-xs px-2 py-1 rounded
        opacity-0 hover:opacity-100 transition-opacity duration-200
        pointer-events-none whitespace-nowrap
        z-50
      ">
        {language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
      </div>
    </Button>
  )
}

// Standalone toggle for use in different contexts
export function LanguageTogglePill() {
  const { language, setLanguage } = useUserStore()
  
  const handleLanguageChange = () => {
    const newLanguage = language === 'hi' ? 'en' : 'hi'
    setLanguage(newLanguage)
    localStorage.setItem('sarkari-language', newLanguage)
  }
  
  return (
    <div className="inline-flex items-center bg-muted rounded-lg p-1">
      <button
        onClick={handleLanguageChange}
        className={`
          px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
          ${language === 'hi' 
            ? 'bg-primary text-primary-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
          }
        `}
      >
        हिंदी
      </button>
      <button
        onClick={handleLanguageChange}
        className={`
          px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
          ${language === 'en' 
            ? 'bg-primary text-primary-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
          }
        `}
      >
        EN
      </button>
    </div>
  )
}

// Compact version for mobile
export function LanguageToggleCompact() {
  const { language, setLanguage } = useUserStore()
  
  const handleLanguageChange = () => {
    const newLanguage = language === 'hi' ? 'en' : 'hi'
    setLanguage(newLanguage)
    localStorage.setItem('sarkari-language', newLanguage)
  }
  
  return (
    <button
      onClick={handleLanguageChange}
      className="
        p-2 rounded-lg hover:bg-muted transition-colors duration-200
        text-sm font-medium
      "
    >
      <span className="flex items-center gap-1">
        <Globe className="w-4 h-4" />
        {language === 'hi' ? 'हिंदी' : 'EN'}
      </span>
    </button>
  )
}
