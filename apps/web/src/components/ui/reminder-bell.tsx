import React, { useState, useRef, useEffect } from 'react'
import { Button } from './button'
import { Badge } from './badge'
import { Card, CardContent } from './card'
import { Bell, Check, ExternalLink, Calendar } from 'lucide-react'
import { useUserStore } from '@/store/user-store'

interface Reminder {
  id: string
  type: string
  title: string
  titleHindi: string
  message: string
  messageHindi: string
  dueDate: Date
  isRead: boolean
  schemeId?: string
}

interface ReminderBellProps {
  reminders?: Reminder[]
  onMarkAllRead?: () => void
  onViewAll?: () => void
  maxDisplay?: number
  language?: 'hi' | 'en'
}

export function ReminderBell({ 
  reminders = [],
  onMarkAllRead,
  onViewAll,
  maxDisplay = 5,
  language = 'hi'
}: ReminderBellProps) {
  const { user } = useUserStore()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const unreadCount = reminders.filter(r => !r.isRead).length
  const displayReminders = reminders.slice(0, maxDisplay)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return language === 'hi' ? 'आज' : 'Today'
    } else if (diffDays === 1) {
      return language === 'hi' ? 'कल' : 'Tomorrow'
    } else if (diffDays < 7) {
      return language === 'hi' ? `${diffDays} दिन` : `${diffDays} days`
    } else {
      return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
        month: 'short',
        day: 'numeric'
      })
    }
  }
  
  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <Calendar className="w-4 h-4 text-red-500" />
      case 'benefit':
        return <Check className="w-4 h-4 text-green-500" />
      case 'document':
        return <Bell className="w-4 h-4 text-blue-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }
  
  const getReminderColor = (type: string) => {
    switch (type) {
      case 'deadline':
        return 'border-red-200 bg-red-50'
      case 'benefit':
        return 'border-green-200 bg-green-50'
      case 'document':
        return 'border-blue-200 bg-blue-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }
  
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2"
      >
        <Bell className="w-5 h-5" />
        
        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs min-w-[20px]"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>
      
      {/* Dropdown */}
      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 z-50 shadow-lg border-2">
          <CardContent className="p-0">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">
                  {language === 'hi' ? 'अनुस्मारण' : 'Reminders'}
                </h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && onMarkAllRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onMarkAllRead}
                      className="text-xs"
                    >
                      {language === 'hi' ? 'सब पढ़ें' : 'Mark all read'}
                    </Button>
                  )}
                </div>
              </div>
              {unreadCount > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'hi' 
                    ? `${unreadCount} नए अनुस्मारण` 
                    : `${unreadCount} new reminders`
                  }
                </p>
              )}
            </div>
            
            {/* Reminders List */}
            <div className="max-h-96 overflow-y-auto">
              {displayReminders.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">
                    {language === 'hi' ? 'कोई अनुस्मारण नहीं' : 'No reminders'}
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {displayReminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`p-3 hover:bg-muted/50 transition-colors cursor-pointer ${getReminderColor(reminder.type)}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getReminderIcon(reminder.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-medium text-sm truncate">
                              {!reminder.isRead && (
                                <span className="w-2 h-2 bg-primary rounded-full inline-block mr-2"></span>
                              )}
                              {language === 'hi' ? reminder.titleHindi : reminder.title}
                            </h4>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatDate(reminder.dueDate)}
                            </span>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {language === 'hi' ? reminder.messageHindi : reminder.message}
                          </p>
                          
                          {reminder.schemeId && (
                            <div className="flex items-center gap-1 mt-2">
                              <ExternalLink className="w-3 h-3 text-primary" />
                              <span className="text-xs text-primary">
                                {language === 'hi' ? 'योजना देखें' : 'View scheme'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            {reminders.length > maxDisplay && (
              <div className="p-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onViewAll}
                  className="w-full text-sm"
                >
                  {language === 'hi' ? 'सभी देखें →' : 'View all →'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Compact version for mobile
export function ReminderBellCompact({ 
  reminders = [],
  language = 'hi'
}: Omit<ReminderBellProps, 'onMarkAllRead' | 'onViewAll' | 'maxDisplay'>) {
  const unreadCount = reminders.filter(r => !r.isRead).length
  
  return (
    <Button variant="ghost" size="sm" className="relative p-2">
      <Bell className="w-4 h-4" />
      
      {unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        </div>
      )}
    </Button>
  )
}
