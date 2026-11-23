'use client'

import { Package, Truck, CheckCircle2, Circle, MapPin, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Order } from '@/lib/types'
import { cn } from '@/lib/utils'

interface TrackingStep {
  status: string
  location?: string
  timestamp: string
  completed: boolean
  current: boolean
}

interface TrackingCardProps {
  data: {
    order: Order
    steps: TrackingStep[]
  }
}

export function TrackingCard({ data }: TrackingCardProps) {
  const { order, steps } = data

  return (
    <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-secondary/30 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Order {order.orderNumber}</span>
          </div>
          <span className={cn(
            'px-2 py-0.5 rounded-full text-xs font-medium',
            order.status === 'shipped' && 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
            order.status === 'delivered' && 'bg-green-500/10 text-green-600 dark:text-green-400',
            order.status === 'processing' && 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
          )}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Tracking Steps */}
      <div className="p-4">
        <div className="space-y-0">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-3">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                {step.current ? (
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <Truck className="w-3 h-3 text-accent-foreground" />
                  </div>
                ) : step.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground/30" />
                )}
                {index < steps.length - 1 && (
                  <div className={cn(
                    'w-0.5 h-8 my-1',
                    step.completed ? 'bg-accent' : 'bg-muted-foreground/20'
                  )} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <p className={cn(
                  'text-sm font-medium',
                  step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'
                )}>
                  {step.status}
                </p>
                {step.location && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {step.location}
                  </p>
                )}
                {step.timestamp && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(step.timestamp).toLocaleDateString('en-GB', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Estimated Delivery */}
        {order.estimatedDelivery && (
          <div className="mt-2 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Estimated Delivery</p>
                <p className="text-sm font-medium">
                  {new Date(order.estimatedDelivery).toLocaleDateString('en-GB', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              {order.trackingUrl && (
                <Button variant="outline" size="sm" className="gap-1.5" asChild>
                  <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer">
                    Track
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
