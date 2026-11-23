'use client'

import { Sparkles, Moon, Brain, Zap, RefreshCw, Bell, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const personalizationExamples = [
  {
    icon: Moon,
    title: 'Sleep Optimization Plan',
    description: 'Based on your quiz responses, we created a personalized sleep stack',
    items: [
      { name: 'Deep Sleep Complex', time: 'Take 30 min before bed' },
      { name: 'Calm & Clarity Blend', time: 'Take 2 hours before bed' },
    ],
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
  },
  {
    icon: Brain,
    title: 'Cognitive Performance Stack',
    description: 'Optimized for your focus and productivity goals',
    items: [
      { name: 'Focus Flow Nootropic', time: 'Take with breakfast' },
      { name: 'Daily Energy Adaptogen', time: 'Take at noon' },
    ],
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
]

const aiFeatures = [
  {
    icon: RefreshCw,
    title: 'Smart Reorder Reminders',
    description: 'We track your usage patterns and remind you before you run out.',
  },
  {
    icon: Bell,
    title: 'Dose Timing Optimization',
    description: 'AI-suggested timing based on your schedule and goals.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Log how you feel and see trends in your wellness journey.',
  },
]

export function PersonalizationSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered Personalization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            Your wellness, optimized
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our AI learns your preferences, tracks your progress, and continuously optimizes recommendations for better results.
          </p>
        </div>

        {/* Personalization Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {personalizationExamples.map((example) => (
            <div
              key={example.title}
              className="bg-card rounded-2xl border border-border/50 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', example.bg)}>
                  <example.icon className={cn('w-6 h-6', example.color)} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{example.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{example.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {example.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-accent" />
                      </div>
                      <span className="font-medium text-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-6 gap-2">
                View Full Plan
              </Button>
            </div>
          ))}
        </div>

        {/* AI Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {aiFeatures.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-2xl bg-secondary/30 border border-border/50"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="gap-2">
            <Sparkles className="w-5 h-5" />
            Get My Personalized Plan
          </Button>
        </div>
      </div>
    </section>
  )
}
