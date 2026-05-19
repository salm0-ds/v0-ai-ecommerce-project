'use client'

import { useRef } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mockTestimonials } from '@/lib/mock-data'

export function SocialProofSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-20 px-4 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Real Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mt-2 text-balance">
              Transforming wellness journeys
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Join thousands of people who have optimized their health with Vitalis supplements.
            </p>
          </div>
          <div className="flex gap-2 self-start sm:self-auto">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {mockTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-[350px] sm:w-[400px] snap-start"
            >
              <div className="h-full bg-card rounded-2xl border border-border/50 p-6 flex flex-col">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-accent/20 mb-4" />
                
                {/* Content */}
                <p className="text-foreground leading-relaxed flex-1 text-balance">
                  &quot;{testimonial.content}&quot;
                </p>
                
                {/* Improvement Badge */}
                <div className="flex items-center gap-2 mt-4 px-3 py-2 rounded-lg bg-accent/10 w-fit">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">
                    {testimonial.improvement}
                  </span>
                </div>
                
                {/* Author */}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border/50">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-lg font-semibold text-muted-foreground">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                
                {/* Product Tag */}
                <div className="mt-4">
                  <span className="text-xs text-muted-foreground">
                    Reviewing: <span className="font-medium text-foreground">{testimonial.product}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-12 border-t border-border/50">
          {[
            { value: '50,000+', label: 'Happy Customers' },
            { value: '4.9', label: 'Average Rating' },
            { value: '98%', label: 'Would Recommend' },
            { value: '30-Day', label: 'Satisfaction Guarantee' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
