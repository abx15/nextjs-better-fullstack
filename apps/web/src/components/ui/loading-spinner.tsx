import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  textHindi?: string
  color?: string
  language?: 'hi' | 'en'
  className?: string
}

export function LoadingSpinner({ 
  size = 'md',
  text = 'Loading...',
  textHindi = 'लोड हो रहा है...',
  color = '#1a3a6b',
  language = 'hi',
  className = ''
}: LoadingSpinnerProps) {
  const spinnerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const sizeConfig = {
    sm: {
      spinnerSize: 'w-6 h-6',
      textSize: 'text-xs',
      borderSize: 'border-2',
      gap: 'gap-2'
    },
    md: {
      spinnerSize: 'w-8 h-8',
      textSize: 'text-sm',
      borderSize: 'border-3',
      gap: 'gap-3'
    },
    lg: {
      spinnerSize: 'w-12 h-12',
      textSize: 'text-base',
      borderSize: 'border-4',
      gap: 'gap-4'
    }
  }
  
  const config = sizeConfig[size]
  const displayText = language === 'hi' ? textHindi : text
  
  useEffect(() => {
    if (!spinnerRef.current) return
    
    // Create continuous rotation animation
    gsap.to(spinnerRef.current, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: "none"
    })
    
    return () => {
      gsap.killTweensOf(spinnerRef.current)
    }
  }, [])
  
  useEffect(() => {
    if (!containerRef.current) return
    
    // Fade in animation
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    )
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className={`flex items-center justify-center ${config.gap} ${className}`}
    >
      {/* Spinner */}
      <div 
        ref={spinnerRef}
        className={`${config.spinnerSize} rounded-full ${config.borderSize} border-transparent border-t-current`}
        style={{ borderTopColor: color }}
      />
      
      {/* Text */}
      {displayText && (
        <span className={`${config.textSize} text-muted-foreground animate-pulse`}>
          {displayText}
        </span>
      )}
    </div>
  )
}

// Dots variant
export function LoadingDots({ 
  size = 'md',
  text,
  textHindi,
  color = '#1a3a6b',
  language = 'hi',
  className = ''
}: Omit<LoadingSpinnerProps, 'text' | 'textHindi'> & {
  text?: string
  textHindi?: string
}) {
  const dotsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const sizeConfig = {
    sm: {
      dotSize: 'w-1 h-1',
      textSize: 'text-xs',
      gap: 'gap-1'
    },
    md: {
      dotSize: 'w-2 h-2',
      textSize: 'text-sm',
      gap: 'gap-2'
    },
    lg: {
      dotSize: 'w-3 h-3',
      textSize: 'text-base',
      gap: 'gap-3'
    }
  }
  
  const config = sizeConfig[size]
  const displayText = language === 'hi' ? textHindi : text
  
  useEffect(() => {
    if (!dotsRef.current) return
    
    const dots = dotsRef.current.children
    const tl = gsap.timeline({ repeat: -1 })
    
    // Create staggered animation for dots
    tl.to(dots, {
      y: -8,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.inOut"
    })
    .to(dots, {
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.inOut"
    })
    
    return () => {
      tl.kill()
    }
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className={`flex items-center justify-center ${config.gap} ${className}`}
    >
      {/* Dots */}
      <div ref={dotsRef} className={`flex items-center ${config.gap}`}>
        <div 
          className={`${config.dotSize} rounded-full`}
          style={{ backgroundColor: color }}
        />
        <div 
          className={`${config.dotSize} rounded-full`}
          style={{ backgroundColor: color }}
        />
        <div 
          className={`${config.dotSize} rounded-full`}
          style={{ backgroundColor: color }}
        />
      </div>
      
      {/* Text */}
      {displayText && (
        <span className={`${config.textSize} text-muted-foreground`}>
          {displayText}
        </span>
      )}
    </div>
  )
}

// Pulse variant
export function LoadingPulse({ 
  size = 'md',
  text,
  textHindi,
  color = '#1a3a6b',
  language = 'hi',
  className = ''
}: Omit<LoadingSpinnerProps, 'text' | 'textHindi'> & {
  text?: string
  textHindi?: string
}) {
  const pulseRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const sizeConfig = {
    sm: {
      pulseSize: 'w-4 h-4',
      textSize: 'text-xs',
      gap: 'gap-2'
    },
    md: {
      pulseSize: 'w-6 h-6',
      textSize: 'text-sm',
      gap: 'gap-3'
    },
    lg: {
      pulseSize: 'w-8 h-8',
      textSize: 'text-base',
      gap: 'gap-4'
    }
  }
  
  const config = sizeConfig[size]
  const displayText = language === 'hi' ? textHindi : text
  
  useEffect(() => {
    if (!pulseRef.current) return
    
    // Create pulse animation
    gsap.to(pulseRef.current, {
      scale: 1.2,
      opacity: 0.3,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    })
    
    return () => {
      gsap.killTweensOf(pulseRef.current)
    }
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className={`flex items-center justify-center ${config.gap} ${className}`}
    >
      {/* Pulse Circle */}
      <div 
        ref={pulseRef}
        className={`${config.pulseSize} rounded-full`}
        style={{ backgroundColor: color }}
      />
      
      {/* Text */}
      {displayText && (
        <span className={`${config.textSize} text-muted-foreground animate-pulse`}>
          {displayText}
        </span>
      )}
    </div>
  )
}

// Skeleton variant for content loading
export function LoadingSkeleton({ 
  lines = 3,
  className = ''
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className="h-4 bg-muted rounded animate-pulse"
          style={{ 
            width: index === lines - 1 ? '60%' : '100%',
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
    </div>
  )
}

// Full page loader
export function FullPageLoader({ 
  text = 'Loading...',
  textHindi = 'लोड हो रहा है...',
  language = 'hi'
}: Pick<LoadingSpinnerProps, 'text' | 'textHindi' | 'language'>) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    )
  }, [])
  
  const displayText = language === 'hi' ? textHindi : text
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-lg font-medium text-foreground">
          {displayText}
        </p>
      </div>
    </div>
  )
}
