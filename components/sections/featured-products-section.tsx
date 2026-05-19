'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductGridCard } from '@/components/products/product-grid-card'
import { Product } from '@/lib/types'

interface FeaturedProductsSectionProps {
  products: Product[]
  onAskAI?: (product: Product) => void
}

export function FeaturedProductsSection({ products, onAskAI }: FeaturedProductsSectionProps) {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Shop Our Best
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mt-2 text-balance">
              Science-backed supplements
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Each formula is crafted with clinically-studied ingredients for maximum efficacy and bioavailability.
            </p>
          </div>
          <Button variant="outline" className="gap-2 self-start sm:self-auto">
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductGridCard
              key={product.id}
              product={product}
              onAskAI={onAskAI}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
