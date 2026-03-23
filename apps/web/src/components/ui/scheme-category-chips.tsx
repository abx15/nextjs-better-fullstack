import React from 'react'
import { Button } from './button'
import { Badge } from './badge'
import { cn } from '@/lib/utils'

interface SchemeCategoryChipsProps {
  active?: string
  onChange?: (category: string) => void
  language?: 'hi' | 'en'
  className?: string
  showAll?: boolean
}

const categories = [
  {
    id: 'all',
    icon: '🏛️',
    name: 'All Schemes',
    nameHindi: 'सभी योजनाएं',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    id: 'kisan',
    icon: '🌾',
    name: 'Farmers',
    nameHindi: 'किसान',
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    id: 'shiksha',
    icon: '🎓',
    name: 'Education',
    nameHindi: 'शिक्षा',
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    id: 'swasth',
    icon: '🏥',
    name: 'Health',
    nameHindi: 'स्वास्थ्य',
    color: 'bg-red-100 text-red-800 border-red-200'
  },
  {
    id: 'awas',
    icon: '🏠',
    name: 'Housing',
    nameHindi: 'आवास',
    color: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  {
    id: 'rojgar',
    icon: '💼',
    name: 'Employment',
    nameHindi: 'रोज़गार',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  },
  {
    id: 'mahila',
    icon: '👩',
    name: 'Women',
    nameHindi: 'महिला',
    color: 'bg-pink-100 text-pink-800 border-pink-200'
  },
  {
    id: 'vridh',
    icon: '👴',
    name: 'Senior Citizens',
    nameHindi: 'वृद्ध नागरिक',
    color: 'bg-gray-100 text-gray-800 border-gray-200'
  },
  {
    id: 'divyang',
    icon: '♿',
    name: 'Disabled',
    nameHindi: 'दिव्यांग',
    color: 'bg-teal-100 text-teal-800 border-teal-200'
  },
  {
    id: 'finance',
    icon: '💰',
    name: 'Finance',
    nameHindi: 'वित्त',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  {
    id: 'vyapar',
    icon: '🏭',
    name: 'Business',
    nameHindi: 'व्यापार',
    color: 'bg-cyan-100 text-cyan-800 border-cyan-200'
  }
]

export function SchemeCategoryChips({ 
  active = 'all',
  onChange,
  language = 'hi',
  className = '',
  showAll = true
}: SchemeCategoryChipsProps) {
  const displayCategories = showAll 
    ? categories 
    : categories.filter(cat => cat.id !== 'all')
  
  const handleCategoryClick = (categoryId: string) => {
    if (onChange) {
      onChange(categoryId)
    }
  }
  
  return (
    <div className={cn('w-full', className)}>
      {/* Horizontal scrollable container */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {displayCategories.map((category) => {
          const isActive = active === category.id
          const displayName = language === 'hi' ? category.nameHindi : category.name
          
          return (
            <Button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'flex items-center gap-2 whitespace-nowrap transition-all duration-200 hover:scale-105',
                isActive 
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md' 
                  : 'hover:bg-primary/10 hover:border-primary hover:text-primary'
              )}
            >
              {/* Icon */}
              <span className="text-sm">{category.icon}</span>
              
              {/* Name */}
              <span className="font-medium text-sm">
                {displayName}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
              )}
            </Button>
          )
        })}
      </div>
      
      {/* Scroll indicators */}
      <div className="flex justify-between mt-1 px-1">
        <div className="w-8 h-1 bg-gradient-to-r from-background to-transparent" />
        <div className="w-8 h-1 bg-gradient-to-l from-background to-transparent" />
      </div>
    </div>
  )
}

// Grid version for desktop
export function SchemeCategoryGrid({ 
  active = 'all',
  onChange,
  language = 'hi',
  className = '',
  showAll = true
}: SchemeCategoryChipsProps) {
  const displayCategories = showAll 
    ? categories 
    : categories.filter(cat => cat.id !== 'all')
  
  const handleCategoryClick = (categoryId: string) => {
    if (onChange) {
      onChange(categoryId)
    }
  }
  
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3', className)}>
      {displayCategories.map((category) => {
        const isActive = active === category.id
        const displayName = language === 'hi' ? category.nameHindi : category.name
        
        return (
          <Button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            variant={isActive ? 'default' : 'outline'}
            className={cn(
              'flex flex-col items-center gap-2 p-4 h-auto transition-all duration-200 hover:scale-105',
              isActive 
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md' 
                : 'hover:bg-primary/10 hover:border-primary hover:text-primary'
            )}
          >
            {/* Icon */}
            <span className="text-2xl">{category.icon}</span>
            
            {/* Name */}
            <span className="font-medium text-sm text-center">
              {displayName}
            </span>
            
            {/* Active indicator */}
            {isActive && (
              <div className="w-2 h-2 bg-primary-foreground rounded-full" />
            )}
          </Button>
        )
      })}
    </div>
  )
}

// Compact pill version
export function SchemeCategoryPills({ 
  active = 'all',
  onChange,
  language = 'hi',
  className = '',
  showAll = true
}: SchemeCategoryChipsProps) {
  const displayCategories = showAll 
    ? categories 
    : categories.filter(cat => cat.id !== 'all')
  
  const handleCategoryClick = (categoryId: string) => {
    if (onChange) {
      onChange(categoryId)
    }
  }
  
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {displayCategories.map((category) => {
        const isActive = active === category.id
        const displayName = language === 'hi' ? category.nameHindi : category.name
        
        return (
          <Badge
            key={category.id}
            variant={isActive ? 'default' : 'outline'}
            className={cn(
              'cursor-pointer transition-all duration-200 hover:scale-105 px-3 py-1',
              isActive 
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                : 'hover:bg-primary/10 hover:border-primary hover:text-primary'
            )}
            onClick={() => handleCategoryClick(category.id)}
          >
            <span className="flex items-center gap-1">
              <span className="text-xs">{category.icon}</span>
              <span className="text-xs font-medium">
                {displayName}
              </span>
            </span>
          </Badge>
        )
      })}
    </div>
  )
}

// Category card for featured sections
export function CategoryCard({ 
  category,
  count,
  isActive,
  onClick,
  language = 'hi'
}: {
  category: typeof categories[0]
  count?: number
  isActive?: boolean
  onClick?: () => void
  language?: 'hi' | 'en'
}) {
  const displayName = language === 'hi' ? category.nameHindi : category.name
  
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-lg border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        isActive 
          ? 'border-primary bg-primary/5' 
          : 'border-border hover:border-primary/50'
      )}
    >
      {/* Icon */}
      <div className="text-4xl mb-3">{category.icon}</div>
      
      {/* Title */}
      <h3 className="font-bold text-lg mb-2">{displayName}</h3>
      
      {/* Count */}
      {count !== undefined && (
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">{count}</span>
          <span className="text-sm text-muted-foreground">
            {language === 'hi' ? 'योजनाएं' : 'schemes'}
          </span>
        </div>
      )}
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}

// Filter dropdown version
export function CategoryFilterDropdown({ 
  active = 'all',
  onChange,
  language = 'hi'
}: Pick<SchemeCategoryChipsProps, 'active' | 'onChange' | 'language'>) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  
  const activeCategory = categories.find(cat => cat.id === active)
  const displayActive = language === 'hi' ? activeCategory?.nameHindi : activeCategory?.name
  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <span>{activeCategory?.icon}</span>
        <span>{displayActive}</span>
        <span className="text-xs">▼</span>
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-lg shadow-lg z-50">
          <div className="max-h-64 overflow-y-auto">
            {categories.map((category) => {
              const displayName = language === 'hi' ? category.nameHindi : category.name
              const isActive = active === category.id
              
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    onChange?.(category.id)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted transition-colors',
                    isActive && 'bg-primary/10 text-primary'
                  )}
                >
                  <span>{category.icon}</span>
                  <span className="text-sm font-medium">{displayName}</span>
                  {isActive && (
                    <div className="w-2 h-2 bg-primary rounded-full ml-auto" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
