'use client'

import { useState } from 'react'
import { 
  Shield, 
  FlaskConical, 
  Microscope, 
  Award, 
  ChevronDown,
  ExternalLink,
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'

const trustPillars = [
  {
    icon: Shield,
    title: 'Third-Party Tested',
    description: 'Every batch is independently verified for purity, potency, and safety by ISO-certified laboratories.',
    details: [
      'Heavy metal testing',
      'Microbial contamination screening',
      'Identity verification',
      'Potency confirmation',
    ],
  },
  {
    icon: FlaskConical,
    title: 'Clinical Dosing',
    description: 'We use the exact doses shown effective in peer-reviewed clinical studies. No pixie dusting.',
    details: [
      'Research-backed formulations',
      'Therapeutic-level dosing',
      'Bioavailability optimized',
      'Synergistic combinations',
    ],
  },
  {
    icon: Microscope,
    title: 'Transparent Sourcing',
    description: 'We trace every ingredient back to its origin. Full transparency on where and how it was produced.',
    details: [
      'Supplier verification',
      'Origin documentation',
      'Sustainable practices',
      'Quality audits',
    ],
  },
  {
    icon: Award,
    title: 'GMP Certified',
    description: 'Manufactured in FDA-registered, GMP-certified facilities following pharmaceutical-grade standards.',
    details: [
      'FDA registered facility',
      'Current Good Manufacturing Practices',
      'Regular compliance audits',
      'Quality control protocols',
    ],
  },
]

const ingredients = [
  {
    name: 'Magnesium Glycinate',
    category: 'Sleep Support',
    benefits: 'Highly bioavailable form that supports relaxation and deep sleep without digestive discomfort.',
    studies: 12,
    dosing: '400mg per serving',
  },
  {
    name: 'Ashwagandha KSM-66',
    category: 'Stress & Energy',
    benefits: 'Patented full-spectrum extract shown to reduce cortisol by up to 30% in clinical trials.',
    studies: 24,
    dosing: '600mg per serving',
  },
  {
    name: "Lion's Mane Extract",
    category: 'Cognitive Support',
    benefits: 'Fruiting body extract standardized for beta-glucans. Supports nerve growth factor production.',
    studies: 18,
    dosing: '500mg per serving',
  },
  {
    name: 'Probiotic Blend',
    category: 'Gut Health',
    benefits: '12 clinically-studied strains with delayed-release technology for maximum colonization.',
    studies: 45,
    dosing: '50 Billion CFU',
  },
]

export function ScienceTrustSection() {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null)
  const [expandedIngredient, setExpandedIngredient] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Science-First Approach
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-2 text-balance">
            Transparency you can trust
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            We believe you deserve to know exactly what you&apos;re putting in your body and why it works.
          </p>
        </div>

        {/* Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {trustPillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="bg-card rounded-2xl border border-border/50 overflow-hidden"
            >
              <button
                onClick={() => setExpandedPillar(expandedPillar === index ? null : index)}
                className="w-full flex items-start gap-4 p-6 text-left hover:bg-secondary/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <pillar.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pillar.description}</p>
                </div>
                <ChevronDown className={cn(
                  'w-5 h-5 text-muted-foreground transition-transform flex-shrink-0',
                  expandedPillar === index && 'rotate-180'
                )} />
              </button>
              <div className={cn(
                'overflow-hidden transition-all duration-300',
                expandedPillar === index ? 'max-h-48' : 'max-h-0'
              )}>
                <div className="px-6 pb-6 pt-0">
                  <div className="grid grid-cols-2 gap-2">
                    {pillar.details.map((detail) => (
                      <div 
                        key={detail}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ingredient Spotlight */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-foreground">
              Ingredient spotlight
            </h3>
            <a 
              href="#" 
              className="flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              View all ingredients
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <div
                key={ingredient.name}
                className="bg-card rounded-xl border border-border/50 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedIngredient(expandedIngredient === index ? null : index)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="font-semibold text-foreground">{ingredient.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                        {ingredient.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{ingredient.dosing}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-foreground">{ingredient.studies} studies</p>
                      <p className="text-xs text-muted-foreground">Peer-reviewed</p>
                    </div>
                    <ChevronDown className={cn(
                      'w-5 h-5 text-muted-foreground transition-transform',
                      expandedIngredient === index && 'rotate-180'
                    )} />
                  </div>
                </button>
                <div className={cn(
                  'overflow-hidden transition-all duration-300',
                  expandedIngredient === index ? 'max-h-40' : 'max-h-0'
                )}>
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                      {ingredient.benefits}
                    </p>
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                    >
                      <FileText className="w-4 h-4" />
                      View research
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
