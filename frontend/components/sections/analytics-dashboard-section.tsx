'use client'

import { 
  TrendingUp, 
  TrendingDown, 
  Bot, 
  ShieldCheck, 
  Clock, 
  Heart, 
  ShoppingCart,
  Star,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockAnalytics } from '@/lib/mock-data'

const metrics = [
  {
    icon: Bot,
    label: 'Tickets Automated',
    value: mockAnalytics.ticketsAutomated.toLocaleString(),
    change: mockAnalytics.ticketsAutomatedChange,
    suffix: '',
    description: 'Support queries resolved by AI',
  },
  {
    icon: ShieldCheck,
    label: 'Refund Deflection',
    value: mockAnalytics.refundDeflectionRate,
    change: mockAnalytics.refundDeflectionChange,
    suffix: '%',
    description: 'Refunds prevented through retention',
  },
  {
    icon: Clock,
    label: 'Avg Response Time',
    value: mockAnalytics.avgResponseTime,
    change: mockAnalytics.avgResponseTimeChange,
    suffix: '',
    description: 'From query to resolution',
  },
  {
    icon: Heart,
    label: 'Retention Saves',
    value: mockAnalytics.retentionSaves.toLocaleString(),
    change: mockAnalytics.retentionSavesChange,
    suffix: '',
    description: 'Customers retained this month',
  },
  {
    icon: ShoppingCart,
    label: 'Upsell Conversions',
    value: mockAnalytics.upsellConversions.toLocaleString(),
    change: mockAnalytics.upsellConversionsChange,
    suffix: '',
    description: 'Additional products recommended',
  },
  {
    icon: Star,
    label: 'Customer Satisfaction',
    value: mockAnalytics.customerSatisfaction,
    change: mockAnalytics.customerSatisfactionChange,
    suffix: '%',
    description: 'Post-interaction rating',
  },
]

export function AnalyticsDashboardSection() {
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary-foreground/80" />
            <span className="text-sm font-medium text-primary-foreground/80">Business Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary-foreground text-balance">
            AI-powered operations intelligence
          </h2>
          <p className="text-lg text-primary-foreground/70 mt-4 max-w-2xl mx-auto">
            See how our AI assistant transforms customer support into a retention and revenue engine.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric) => {
            const isPositive = metric.change > 0
            const TrendIcon = isPositive ? TrendingUp : TrendingDown
            
            return (
              <div
                key={metric.label}
                className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl border border-primary-foreground/10 p-6 hover:bg-primary-foreground/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                    <metric.icon className="w-6 h-6 text-primary-foreground/80" />
                  </div>
                  <div className={cn(
                    'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                    isPositive 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-amber-500/20 text-amber-300'
                  )}>
                    <TrendIcon className="w-3 h-3" />
                    {Math.abs(metric.change)}%
                  </div>
                </div>
                
                <div className="mb-2">
                  <p className="text-3xl font-bold text-primary-foreground">
                    {metric.value}{metric.suffix}
                  </p>
                  <p className="text-sm font-medium text-primary-foreground/80 mt-1">
                    {metric.label}
                  </p>
                </div>
                
                <p className="text-xs text-primary-foreground/50">
                  {metric.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-primary-foreground/70 mb-6">
            Transform your ecommerce support with AI-native customer intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 rounded-xl bg-primary-foreground text-primary font-medium hover:bg-primary-foreground/90 transition-colors">
              Request a Demo
            </button>
            <button className="px-6 py-3 rounded-xl bg-primary-foreground/10 text-primary-foreground font-medium border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
