'use client'

import { useState } from 'react'
import { Star, Plus, Sparkles, Check, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Product } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProductGridCardProps {
  product: Product
  onAskAI?: (product: Product) => void
}

export function ProductGridCard({ product, onAskAI }: ProductGridCardProps) {
  const [isSubscription, setIsSubscription] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const displayPrice = isSubscription 
    ? product.price * (1 - product.subscriptionDiscount / 100) 
    : product.price

  const categoryIcons: Record<string, string> = {
    'sleep': '🌙',
    'gut-health': '🌿',
    'focus': '🧠',
    'energy': '⚡',
    'stress': '🧘',
    'hydration': '💧',
  }

  return (
    <div 
      className="group relative bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bestseller Badge */}
      {product.tags.includes('bestseller') && (
        <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
          Bestseller
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-secondary/50 to-secondary/20 p-8 flex items-center justify-center">
        <span className="text-7xl opacity-60 transition-transform duration-300 group-hover:scale-110">
          {categoryIcons[product.category] || '✨'}
        </span>
        
        {/* AI Explain Button */}
        {onAskAI && (
          <button
            onClick={() => onAskAI(product)}
            className={cn(
              'absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full',
              'bg-card/90 backdrop-blur-sm border border-border/50',
              'text-xs font-medium text-foreground/80 hover:text-foreground',
              'transition-all duration-200',
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            )}
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Ask AI
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {product.category.replace('-', ' ')}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Name & Description */}
        <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.shortDescription}
        </p>

        {/* Benefits Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.benefits.slice(0, 2).map((benefit) => (
            <span 
              key={benefit}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/50 text-xs text-foreground/70"
            >
              <Check className="w-3 h-3 text-accent" />
              {benefit}
            </span>
          ))}
        </div>

        {/* Ingredients Preview */}
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4">
          <Info className="w-3.5 h-3.5" />
          {product.ingredients.length} key ingredients
        </button>

        {/* Subscription Toggle */}
        {product.subscriptionAvailable && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 mb-4">
            <div className="flex items-center gap-2">
              <Switch 
                checked={isSubscription} 
                onCheckedChange={setIsSubscription}
                id={`sub-${product.id}`}
              />
              <label htmlFor={`sub-${product.id}`} className="text-sm font-medium cursor-pointer">
                Subscribe & Save
              </label>
            </div>
            <span className="text-xs font-semibold text-accent">
              -{product.subscriptionDiscount}%
            </span>
          </div>
        )}

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                £{displayPrice.toFixed(2)}
              </span>
              {isSubscription && (
                <span className="text-sm text-muted-foreground line-through">
                  £{product.price.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {product.servings} servings • {product.servingSize}
            </p>
          </div>
          
          <Button className="gap-1.5">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
          {product.certifications.slice(0, 3).map((cert) => (
            <span 
              key={cert}
              className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
