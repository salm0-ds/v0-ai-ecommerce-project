'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowRight, Sparkles, Shield, Leaf, Truck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  onSubmitQuery: (query: string) => void
  isAssistantOpen: boolean
}

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

export function HeroSection({ onSubmitQuery, isAssistantOpen }: HeroSectionProps) {
  const [query, setQuery] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Rotate placeholder text
  useEffect(() => {
    if (isAssistantOpen) return
    
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderQueries.length)
    }, 3500)
    
    return () => clearInterval(interval)
  }, [isAssistantOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSubmitQuery(query.trim())
      setQuery('')
    }
  }

  const handleQuickQuery = (q: string) => {
    setQuery(q)
    onSubmitQuery(q)
    setQuery('')
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden gradient-mesh">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
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
          Store Assistant
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 text-pretty">
          Ask our AI assistant anything about sleep, focus, energy, or gut health.
        </p>

        {/* AI Search Bar */}
        <div className={cn(
          'max-w-2xl mx-auto transition-all duration-500',
          isAssistantOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        )}>
          <form onSubmit={handleSubmit} className="relative">
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
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                placeholder={placeholderQueries[placeholderIndex]}
                className={cn(
                  'w-full pl-16 pr-14 py-5 rounded-2xl',
                  'bg-card/80 backdrop-blur-sm border border-border/50',
                  'text-foreground placeholder:text-muted-foreground/60',
                  'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50',
                  'transition-all duration-300',
                  'text-lg'
                )}
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className={cn(
                  'absolute right-3 p-2.5 rounded-xl',
                  'bg-primary text-primary-foreground',
                  'hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-all duration-200',
                  'flex items-center justify-center'
                )}
                aria-label="Submit query"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Quick Query Chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['Better sleep', 'Track order', 'Focus & energy', 'Gut health'].map((chip) => (
              <button
                key={chip}
                onClick={() => handleQuickQuery(chip === 'Track order' ? 'Where is my order?' : `Help me with ${chip.toLowerCase()}`)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium',
                  'bg-secondary/50 hover:bg-secondary text-foreground/80 hover:text-foreground',
                  'border border-border/50 hover:border-border',
                  'transition-all duration-200'
                )}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-8 border-t border-border/30">
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
