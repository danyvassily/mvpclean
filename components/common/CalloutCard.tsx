"use client"

import { cn } from "@/lib/utils"

interface CalloutCardProps {
  title?: string
  message: string
  type?: 'info' | 'warning' | 'coming-soon'
  className?: string
  icon?: React.ReactNode
}

export function CalloutCard({
  title,
  message,
  type = 'info',
  className,
  icon
}: CalloutCardProps) {
  const typeStyles = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-900',
      title: 'text-blue-900',
      message: 'text-blue-700'
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 text-amber-900',
      title: 'text-amber-900',
      message: 'text-amber-700'
    },
    'coming-soon': {
      container: 'bg-gray-900/90 border-gray-700/50 text-gray-100 backdrop-blur-sm',
      title: 'text-gray-100',
      message: 'text-gray-300'
    }
  }

  const styles = typeStyles[type]

  const defaultIcon = type === 'coming-soon' ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) : type === 'warning' ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )

  return (
    <div className={cn(
      "relative rounded-xl border-2 p-6 shadow-lg",
      styles.container,
      type === 'coming-soon' && "grain-subtle",
      className
    )}>
      <div className="flex items-start space-x-3">
        <div className={cn("flex-shrink-0 mt-0.5", styles.title)}>
          {icon || defaultIcon}
        </div>
        
        <div className="flex-1 space-y-1">
          {title && (
            <h3 className={cn("font-semibold text-sm", styles.title)}>
              {title}
            </h3>
          )}
          
          <p className={cn("text-sm leading-relaxed", styles.message)}>
            {message}
          </p>
        </div>
      </div>

      {type === 'coming-soon' && (
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  )
}
