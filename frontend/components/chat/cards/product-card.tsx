'use client'

import Image from 'next/image'
import { Star, Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  data: {
    product: Product
    reason?: string
  }
}

export function ProductCard({ data }: ProductCardProps) {
  const { product, reason } = data
  
  if (!product) return null

  const discountedPrice = product.subscriptionAvailable 
    ? product.price * (1 - product.subscriptionDiscount / 100) 
    : product.price

  return (
    <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
      {reason && (
        <div className="px-4 py-2 bg-accent/10 border-b border-border/50 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-medium text-accent">{reason}</span>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex gap-4">
          {/* Product Image Placeholder */}
          <div className="w-20 h-20 rounded-lg bg-secondary/50 flex-shrink-0 flex items-center justify-center">
            <span className="text-2xl text-muted-foreground/40">
              {product.category === 'sleep' && '🌙'}
              {product.category === 'gut-health' && '🌿'}
              {product.category === 'focus' && '🧠'}
              {product.category === 'energy' && '⚡'}
              {product.category === 'stress' && '🧘'}
              {product.category === 'hydration' && '💧'}
            </span>
          </div>
          
          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-foreground truncate">
              {product.name}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {product.shortDescription}
            </p>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount.toLocaleString()})
              </span>
            </div>
          </div>
        </div>
        
        {/* Benefits */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {product.benefits.slice(0, 2).map((benefit) => (
            <span 
              key={benefit}
              className="px-2 py-0.5 rounded-md bg-secondary/50 text-xs text-foreground/70"
            >
              {benefit}
            </span>
          ))}
        </div>
        
        {/* Price & Action */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold">
                £{discountedPrice.toFixed(2)}
              </span>
              {product.subscriptionAvailable && (
                <span className="text-xs text-muted-foreground line-through">
                  £{product.price.toFixed(2)}
                </span>
              )}
            </div>
            {product.subscriptionAvailable && (
              <span className="text-xs text-accent font-medium">
                Save {product.subscriptionDiscount}% with subscription
              </span>
            )}
          </div>
          
          <Button size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
