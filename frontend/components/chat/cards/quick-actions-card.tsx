'use client'

import { cn } from '@/lib/utils'

interface QuickActionsCardProps {
  data: {
    actions: Array<{
      label: string
      value: string
      icon?: string
    }>
  }
  onAction: (action: string) => void
}

export function QuickActionsCard({ data, onAction }: QuickActionsCardProps) {
  const { actions } = data

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action.value}
          onClick={() => onAction(action.value)}
          className={cn(
            'px-3 py-1.5 rounded-full text-sm font-medium',
            'bg-secondary/50 hover:bg-secondary text-foreground/80 hover:text-foreground',
            'border border-border/50 hover:border-border',
            'transition-all duration-200'
          )}
        >
          {action.icon && <span className="mr-1.5">{action.icon}</span>}
          {action.label}
        </button>
      ))}
    </div>
  )
}
