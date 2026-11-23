'use client'

import { useEffect, useRef } from 'react'
import { X, Minimize2, Sparkles, Send, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChatMessage as ChatMessageType } from '@/lib/types'
import { ChatMessage } from './chat-message'
import { TypingIndicator } from './typing-indicator'

interface AIAssistantPanelProps {
  isOpen: boolean
  onClose: () => void
  messages: ChatMessageType[]
  isLoading: boolean
  inputValue: string
  onInputChange: (value: string) => void
  onSubmit: (message: string) => void
  onQuickAction: (action: string) => void
}

export function AIAssistantPanel({
  isOpen,
  onClose,
  messages,
  isLoading,
  inputValue,
  onInputChange,
  onSubmit,
  onQuickAction,
}: AIAssistantPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSubmit(inputValue.trim())
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-background/60 backdrop-blur-sm z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed inset-x-4 bottom-4 top-20 md:inset-auto md:right-4 md:bottom-4 md:top-auto md:left-auto',
          'md:w-[440px] md:h-[600px] lg:w-[480px] lg:h-[680px]',
          'z-50 flex flex-col',
          'bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl',
          'transition-all duration-500 ease-out',
          isOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        )}
        role="dialog"
        aria-label="AI Wellness Assistant"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Vitalis Assistant</h2>
              <p className="text-xs text-muted-foreground">AI-powered support</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-lg"
              aria-label="Minimize"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-lg"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onQuickAction={onQuickAction}
            />
          ))}
          
          {isLoading && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-t border-border/50">
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Ask anything about wellness, orders, or products..."
              className={cn(
                'w-full pl-4 pr-12 py-3.5 rounded-xl',
                'bg-secondary/50 border border-border/50',
                'text-foreground placeholder:text-muted-foreground/60',
                'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50',
                'transition-all duration-200',
                'text-sm'
              )}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg',
                'bg-primary text-primary-foreground',
                'hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-all duration-200'
              )}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Powered by AI • Responses may vary
          </p>
        </div>
      </div>
    </>
  )
}
