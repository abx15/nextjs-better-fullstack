import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface AITypingIndicatorProps {
  text?: string
  textHindi?: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
  language?: 'hi' | 'en'
}

export function AITypingIndicator({ 
  text = 'AI is thinking...',
  textHindi = 'AI सोच रहा है...',
  size = 'md',
  color = '#1a3a6b',
  language = 'hi'
}: AITypingIndicatorProps) {
  const dotsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const sizeConfig = {
    sm: {
      dotSize: 'w-2 h-2',
      spacing: 'gap-1',
      textSize: 'text-xs',
      containerPadding: 'p-2'
    },
    md: {
      dotSize: 'w-3 h-3',
      spacing: 'gap-2',
      textSize: 'text-sm',
      containerPadding: 'p-3'
    },
    lg: {
      dotSize: 'w-4 h-4',
      spacing: 'gap-3',
      textSize: 'text-base',
      containerPadding: 'p-4'
    }
  }
  
  const config = sizeConfig[size]
  const displayText = language === 'hi' ? textHindi : text
  
  useEffect(() => {
    if (!dotsRef.current) return
    
    const dots = dotsRef.current.children
    const tl = gsap.timeline({ repeat: -1 })
    
    // Create bouncing animation for each dot with stagger
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
  
  useEffect(() => {
    if (!containerRef.current) return
    
    // Fade in animation for the entire component
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    )
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className={`flex items-center gap-2 ${config.containerPadding}`}
    >
      {/* Animated Dots */}
      <div ref={dotsRef} className={`flex items-center ${config.spacing}`}>
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
      <span className={`${config.textSize} text-muted-foreground animate-pulse`}>
        {displayText}
      </span>
    </div>
  )
}

// Compact version for chat bubbles
export function AITypingCompact({ 
  color = '#1a3a6b',
  language = 'hi'
}: Pick<AITypingIndicatorProps, 'color' | 'language'>) {
  const dotsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!dotsRef.current) return
    
    const dots = dotsRef.current.children
    const tl = gsap.timeline({ repeat: -1 })
    
    tl.to(dots, {
      scale: 1.2,
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.inOut"
    })
    .to(dots, {
      scale: 1,
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.inOut"
    })
    
    return () => {
      tl.kill()
    }
  }, [])
  
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <div ref={dotsRef} className="flex items-center gap-1">
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}

// Inline version for buttons
export function AITypingInline({ 
  language = 'hi'
}: Pick<AITypingIndicatorProps, 'language'>) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span>{language === 'hi' ? 'सोच रहा है...' : 'Thinking...'}</span>
    </div>
  )
}
