'use client'

import { useState } from 'react'
import { Star, Plus, Sparkles, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProductGridCardProps {
  product: Product
  onAskAI?: (product: Product) => void
}

const categoryIcons: Record<string, string> = {
  sleep: '🌙',
  'gut-health': '🌿',
  focus: '🧠',
  energy: '⚡',
  stress: '🧘',
  hydration: '💧',
}

export function ProductGridCard({ product, onAskAI }: ProductGridCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative bg-card rounded-xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-border flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bestseller badge */}
      {product.tags.includes('bestseller') && (
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-semibold uppercase tracking-wide">
          Bestseller
        </div>
      )}

      {/* Product image area — compact */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary/50 to-secondary/20 flex items-center justify-center">
        <span className="text-5xl opacity-60 transition-transform duration-300 group-hover:scale-110">
          {categoryIcons[product.category] || '✨'}
        </span>

        {/* Ask AI button */}
        {onAskAI && (
          <button
            onClick={() => onAskAI(product)}
            className={cn(
              'absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full',
              'bg-card/90 backdrop-blur-sm border border-border/50',
              'text-[11px] font-medium text-foreground/80 hover:text-foreground',
              'transition-all duration-200',
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            )}
          >
            <Sparkles className="w-3 h-3 text-accent" />
            Ask AI
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            {product.category.replace('-', ' ')}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-medium">{product.rating}</span>
            <span className="text-[11px] text-muted-foreground">
              ({product.reviewCount >= 1000 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})
            </span>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-sm text-foreground mb-1 group-hover:text-accent transition-colors leading-snug">
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-[12px] text-muted-foreground line-clamp-1 mb-2.5">
          {product.shortDescription}
        </p>

        {/* Top benefit pill */}
        <div className="flex gap-1.5 mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/50 text-[11px] text-foreground/70">
            <Check className="w-2.5 h-2.5 text-accent shrink-0" />
            {product.benefits[0]}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div>
            <span className="text-base font-bold">£{product.price.toFixed(2)}</span>
            <p className="text-[10px] text-muted-foreground">{product.servings} servings</p>
          </div>
          <Button size="sm" className="gap-1 h-8 text-xs px-3">
            <Plus className="w-3.5 h-3.5" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
