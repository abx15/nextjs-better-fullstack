import React, { useEffect, useRef } from 'react'
import { Card, CardContent } from './card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { gsap } from 'gsap'

interface StatsCardProps {
  title: string
  titleHindi: string
  value: number
  icon: React.ReactNode
  color?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  prefix?: string
  suffix?: string
  language?: 'hi' | 'en'
  animate?: boolean
}

export function StatsCard({ 
  title,
  titleHindi,
  value,
  icon,
  color = '#1a3a6b',
  trend,
  prefix = '',
  suffix = '',
  language = 'hi',
  animate = true
}: StatsCardProps) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const currentValueRef = useRef(0)
  
  useEffect(() => {
    if (!animate || !valueRef.current) return
    
    const targetValue = value
    const duration = 2
    const startTime = Date.now()
    
    const animateValue = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      currentValueRef.current = Math.floor(targetValue * easeOutQuart)
      
      if (valueRef.current) {
        valueRef.current.textContent = formatNumber(currentValueRef.current)
      }
      
      if (progress < 1) {
        requestAnimationFrame(animateValue)
      }
    }
    
    animateValue()
  }, [value, animate])
  
  useEffect(() => {
    if (!cardRef.current) return
    
    // Entrance animation
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
    )
  }, [])
  
  const formatNumber = (num: number) => {
    if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toLocaleString('en-IN')
  }
  
  const getTrendIcon = () => {
    if (!trend) return null
    
    if (trend.isPositive) {
      return <TrendingUp className="w-4 h-4 text-green-600" />
    } else if (trend.value < 0) {
      return <TrendingDown className="w-4 h-4 text-red-600" />
    } else {
      return <Minus className="w-4 h-4 text-gray-600" />
    }
  }
  
  const getTrendColor = () => {
    if (!trend) return 'text-gray-600'
    
    if (trend.isPositive) {
      return 'text-green-600'
    } else if (trend.value < 0) {
      return 'text-red-600'
    }
    return 'text-gray-600'
  }
  
  return (
    <Card ref={cardRef} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <CardContent className="p-6">
        {/* Icon */}
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <div style={{ color }}>
              {icon}
            </div>
          </div>
          
          {/* Trend */}
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        
        {/* Value */}
        <div className="mb-2">
          <div className="flex items-baseline gap-1">
            {prefix && (
              <span className="text-2xl font-bold text-muted-foreground">
                {prefix}
              </span>
            )}
            <span 
              ref={valueRef}
              className="text-3xl font-bold"
              style={{ color }}
            >
              {animate ? '0' : formatNumber(value)}
            </span>
            {suffix && (
              <span className="text-lg font-semibold text-muted-foreground">
                {suffix}
              </span>
            )}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-sm font-medium text-muted-foreground">
          {language === 'hi' ? titleHindi : title}
        </h3>
      </CardContent>
    </Card>
  )
}

// Compact version for mobile
export function StatsCardCompact({ 
  title,
  titleHindi,
  value,
  icon,
  color = '#1a3a6b',
  language = 'hi'
}: Omit<StatsCardProps, 'trend' | 'prefix' | 'suffix' | 'animate'>) {
  const valueRef = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    if (!valueRef.current) return
    
    const targetValue = value
    const duration = 1.5
    const startTime = Date.now()
    
    const animateValue = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(targetValue * easeOutQuart)
      
      if (valueRef.current) {
        valueRef.current.textContent = currentValue.toLocaleString('en-IN')
      }
      
      if (progress < 1) {
        requestAnimationFrame(animateValue)
      }
    }
    
    animateValue()
  }, [value])
  
  return (
    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}20` }}
      >
        <div style={{ color }}>
          {icon}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="text-xl font-bold" style={{ color }}>
          <span ref={valueRef}>0</span>
        </div>
        <h3 className="text-xs text-muted-foreground truncate">
          {language === 'hi' ? titleHindi : title}
        </h3>
      </div>
    </div>
  )
}

// Large hero version
export function StatsCardHero({ 
  title,
  titleHindi,
  value,
  icon,
  color = '#1a3a6b',
  language = 'hi'
}: Omit<StatsCardProps, 'trend' | 'prefix' | 'suffix' | 'animate'>) {
  const valueRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!valueRef.current) return
    
    const targetValue = value
    const duration = 2.5
    const startTime = Date.now()
    
    const animateValue = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(targetValue * easeOutQuart)
      
      if (valueRef.current) {
        valueRef.current.textContent = currentValue.toLocaleString('en-IN')
      }
      
      if (progress < 1) {
        requestAnimationFrame(animateValue)
      }
    }
    
    animateValue()
  }, [value])
  
  useEffect(() => {
    if (!containerRef.current) return
    
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    )
  }, [])
  
  return (
    <div ref={containerRef} className="text-center">
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        style={{ backgroundColor: `${color}20` }}
      >
        <div style={{ color, fontSize: '2rem' }}>
          {icon}
        </div>
      </div>
      
      <div 
        ref={valueRef}
        className="text-4xl md:text-5xl font-bold mb-2"
        style={{ color }}
      >
        0
      </div>
      
      <h3 className="text-lg font-semibold text-foreground">
        {language === 'hi' ? titleHindi : title}
      </h3>
    </div>
  )
}
