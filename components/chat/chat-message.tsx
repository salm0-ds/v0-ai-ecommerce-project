'use client'

import { Sparkles, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ChatMessage as ChatMessageType } from '@/lib/types'
import { ProductCard } from './cards/product-card'
import { TrackingCard } from './cards/tracking-card'
import { RefundCard } from './cards/refund-card'
import { QuickActionsCard } from './cards/quick-actions-card'

interface ChatMessageProps {
  message: ChatMessageType
  onQuickAction: (action: string) => void
}

export function ChatMessage({ message, onQuickAction }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant'

  return (
    <div
      className={cn(
        'flex gap-3',
        isAssistant ? 'flex-row' : 'flex-row-reverse'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
          isAssistant ? 'bg-accent/10' : 'bg-primary/10'
        )}
      >
        {isAssistant ? (
          <Sparkles className="w-4 h-4 text-accent" />
        ) : (
          <User className="w-4 h-4 text-primary" />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          'flex-1 max-w-[85%]',
          isAssistant ? 'items-start' : 'items-end'
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-3',
            isAssistant 
              ? 'bg-secondary/50 rounded-tl-sm' 
              : 'bg-primary text-primary-foreground rounded-tr-sm'
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        {/* Cards */}
        {message.cards && message.cards.length > 0 && (
          <div className="mt-3 space-y-3">
            {message.cards.map((card, index) => (
              <div key={index}>
                {card.type === 'product' && (
                  <ProductCard data={card.data as { product: any; reason?: string }} />
                )}
                {card.type === 'tracking' && (
                  <TrackingCard data={card.data as { order: any; steps: any[] }} />
                )}
                {card.type === 'refund' && (
                  <RefundCard data={card.data as any} />
                )}
                {card.type === 'quick-actions' && (
                  <QuickActionsCard 
                    data={card.data as { actions: any[] }} 
                    onAction={onQuickAction}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p className="text-xs text-muted-foreground mt-1.5 px-1">
          {new Date(message.timestamp).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}
