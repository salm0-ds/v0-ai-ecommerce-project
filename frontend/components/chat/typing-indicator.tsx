'use client'

import { Sparkles } from 'lucide-react'

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-accent" />
      </div>
      <div className="bg-secondary/50 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-muted-foreground/60 typing-dot" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/60 typing-dot" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/60 typing-dot" />
        </div>
      </div>
    </div>
  )
}
