'use client'

import { AlertCircle, CheckCircle2, RefreshCw, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Order } from '@/lib/types'
import { cn } from '@/lib/utils'

interface RefundCardProps {
  data: {
    order: Order
    eligible: boolean
    reason?: string
    estimatedAmount?: number
  }
}

export function RefundCard({ data }: RefundCardProps) {
  const { order, eligible, reason, estimatedAmount } = data

  return (
    <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
      {/* Header */}
      <div className={cn(
        'px-4 py-3 border-b border-border/50 flex items-center gap-2',
        eligible ? 'bg-green-500/10' : 'bg-amber-500/10'
      )}>
        {eligible ? (
          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
        ) : (
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        )}
        <span className={cn(
          'text-sm font-medium',
          eligible ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
        )}>
          {eligible ? 'Refund Eligible' : 'Refund Review Required'}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium">Order {order.orderNumber}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {order.items.length} item{order.items.length > 1 ? 's' : ''} • 
              Placed {new Date(order.createdAt).toLocaleDateString('en-GB', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          {estimatedAmount && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Refund Amount</p>
              <p className="text-lg font-semibold">£{estimatedAmount.toFixed(2)}</p>
            </div>
          )}
        </div>

        {reason && (
          <div className="p-3 rounded-lg bg-secondary/30 mb-4">
            <p className="text-xs text-muted-foreground">{reason}</p>
          </div>
        )}

        {/* Order Items Preview */}
        <div className="space-y-2 mb-4">
          {order.items.slice(0, 2).map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.productName}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium">£{item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button className="flex-1" size="sm">
            {eligible ? 'Process Refund' : 'Request Review'}
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <XCircle className="w-4 h-4" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
