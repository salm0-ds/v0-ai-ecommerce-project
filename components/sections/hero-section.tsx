'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowRight, Sparkles, Shield, Leaf, Truck, Send, X, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ChatMessage } from '@/lib/types'
import { sendChatMessage } from '@/lib/api'
import { TypingIndicator } from '@/components/chat/typing-indicator'

const trustBadges = [
  { icon: Shield, label: 'Third-Party Tested' },
  { icon: Leaf, label: 'Non-GMO' },
  { icon: Sparkles, label: 'Science-Backed' },
  { icon: Truck, label: 'UK Delivery 2-3 Days' },
]

const placeholderQueries = [
  "I need help sleeping better...",
  "Best supplements for focus?",
  "Track my order",
  "Where is my package?",
  "Help me reduce stress",
]

const quickChips = [
  { label: 'Better sleep', query: 'Help me with better sleep' },
  { label: 'Track order', query: 'Where is my order?' },
  { label: 'Focus & energy', query: 'Help me with focus and energy' },
  { label: 'Gut health', query: 'Help me with gut health' },
]

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm your Vitalis wellness assistant. Ask me anything about supplements, orders, or your health goals.",
  timestamp: new Date().toISOString(),
  cards: [
    {
      type: 'quick-actions',
      data: {
        actions: [
          { label: 'Find supplements for me', value: 'recommend' },
          { label: 'Track my order', value: 'track' },
          { label: 'Need help sleeping', value: 'sleep' },
          { label: 'Manage subscription', value: 'subscription' },
        ],
      },
    },
  ],
}

export function HeroSection() {
  const [query, setQuery] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE])
  const [chatInput, setChatInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Rotate placeholder text when chat is closed
  useEffect(() => {
    if (isChatOpen) return
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderQueries.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [isChatOpen])

  // Auto-scroll messages to bottom
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isChatOpen, isLoading])

  // Focus chat input when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => chatInputRef.current?.focus(), 100)
    }
  }, [isChatOpen])

  const submitMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMsg])
    setChatInput('')
    setIsLoading(true)

    try {
      const response = await sendChatMessage(text.trim())
      setMessages(prev => [...prev, response])
    } catch {
      // silent
    } finally {
      setIsLoading(false)
    }
  }

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    const initialQuery = query.trim()
    setQuery('')
    setIsChatOpen(true)
    // Small delay so chat panel renders before sending
    setTimeout(() => submitMessage(initialQuery), 50)
  }

  const handleChipClick = (q: string) => {
    setIsChatOpen(true)
    setTimeout(() => submitMessage(q), 50)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitMessage(chatInput)
  }

  const handleQuickAction = (value: string) => {
    const actionMessages: Record<string, string> = {
      recommend: 'I want personalized supplement recommendations',
      track: 'Where is my order?',
      sleep: 'Help me improve my sleep',
      subscription: 'I want to manage my subscription',
    }
    submitMessage(actionMessages[value] || value)
  }

  const closeChat = () => {
    setIsChatOpen(false)
    setMessages([WELCOME_MESSAGE])
    setQuery('')
    setChatInput('')
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden gradient-mesh">
      {/* Ambient background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl animate-pulse"
          style={{ animationDuration: '12s' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-foreground/80">AI-Powered Wellness</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-balance mb-6">
          AI-Powered
          {' '}Store Assistant
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 text-pretty">
          Ask our AI assistant anything about sleep, focus, energy, or gut health.
        </p>

        {/* AI Input / Inline Chat Container */}
        <div className="max-w-2xl mx-auto">
          {!isChatOpen ? (
            /* ── Collapsed: hero search bar ── */
            <div>
              <form onSubmit={handleHeroSubmit} className="relative">
                <div className="relative flex items-center">
                  <div className="absolute left-4 flex items-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholderQueries[placeholderIndex]}
                    className={cn(
                      'w-full pl-16 pr-14 py-5 rounded-2xl',
                      'bg-card/80 backdrop-blur-sm border border-border/50',
                      'text-foreground placeholder:text-muted-foreground/60',
                      'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50',
                      'transition-all duration-300 text-lg'
                    )}
                  />
                  <button
                    type="submit"
                    disabled={!query.trim()}
                    className={cn(
                      'absolute right-3 p-2.5 rounded-xl',
                      'bg-primary text-primary-foreground',
                      'hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed',
                      'transition-all duration-200 flex items-center justify-center'
                    )}
                    aria-label="Submit query"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Quick chips */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {quickChips.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => handleChipClick(chip.query)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium',
                      'bg-secondary/50 hover:bg-secondary text-foreground/80 hover:text-foreground',
                      'border border-border/50 hover:border-border',
                      'transition-all duration-200'
                    )}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ── Expanded: inline chat panel ── */
            <div
              className={cn(
                'relative rounded-2xl border border-border/60 overflow-hidden',
                'bg-card/90 backdrop-blur-md shadow-2xl',
                'flex flex-col text-left',
                'animate-in fade-in slide-in-from-bottom-4 duration-300'
              )}
              style={{ height: '420px' }}
            >
              {/* Chat header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-card/50 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">Vitalis AI</p>
                    <p className="text-[11px] text-muted-foreground leading-tight">Wellness assistant</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-green-500 ml-1" aria-label="Online" />
                </div>
                <button
                  onClick={closeChat}
                  className="p-1.5 rounded-lg hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth">
                {messages.map((msg) => (
                  <InlineChatMessage
                    key={msg.id}
                    message={msg}
                    onQuickAction={handleQuickAction}
                  />
                ))}
                {isLoading && (
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3 h-3 text-accent" />
                    </div>
                    <div className="px-3 py-2.5 rounded-2xl rounded-bl-sm bg-secondary/50 border border-border/30">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <form
                onSubmit={handleChatSubmit}
                className="shrink-0 flex items-center gap-2 px-3 py-3 border-t border-border/40 bg-card/50"
              >
                <input
                  ref={chatInputRef}
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a follow-up..."
                  className={cn(
                    'flex-1 px-4 py-2.5 rounded-xl text-sm',
                    'bg-secondary/40 border border-border/40',
                    'text-foreground placeholder:text-muted-foreground/50',
                    'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40',
                    'transition-all duration-200'
                  )}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isLoading}
                  className={cn(
                    'p-2.5 rounded-xl shrink-0',
                    'bg-primary text-primary-foreground',
                    'hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed',
                    'transition-all duration-200'
                  )}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Trust badges — always visible */}
        <div className={cn('pt-8 border-t border-border/30', isChatOpen ? 'mt-6' : 'mt-16')}>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-muted-foreground">
                <badge.icon className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Lightweight inline message renderer ─────────────────────────────────────

interface InlineChatMessageProps {
  message: ChatMessage
  onQuickAction: (value: string) => void
}

function InlineChatMessage({ message, onQuickAction }: InlineChatMessageProps) {
  const isUser = message.role === 'user'
  const quickActions = message.cards?.find(c => c.type === 'quick-actions')?.data?.actions as
    | { label: string; value: string }[]
    | undefined

  return (
    <div className={cn('flex items-end gap-2', isUser && 'flex-row-reverse')}>
      {/* Avatar */}
      <div
        className={cn(
          'w-6 h-6 rounded-full shrink-0 flex items-center justify-center',
          isUser ? 'bg-primary/20' : 'bg-accent/15'
        )}
      >
        {isUser ? (
          <User className="w-3 h-3 text-primary" />
        ) : (
          <Sparkles className="w-3 h-3 text-accent" />
        )}
      </div>

      <div className={cn('flex flex-col gap-2 max-w-[80%]', isUser && 'items-end')}>
        {/* Bubble */}
        <div
          className={cn(
            'px-3 py-2.5 rounded-2xl text-sm leading-relaxed',
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-sm'
              : 'bg-secondary/50 border border-border/30 text-foreground rounded-bl-sm'
          )}
        >
          {message.content}
        </div>

        {/* Quick action chips */}
        {quickActions && !isUser && (
          <div className="flex flex-wrap gap-1.5">
            {quickActions.map((action) => (
              <button
                key={action.value}
                onClick={() => onQuickAction(action.value)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium',
                  'bg-background/70 border border-border/50',
                  'hover:bg-secondary hover:border-border',
                  'text-foreground/80 hover:text-foreground',
                  'transition-all duration-150'
                )}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
