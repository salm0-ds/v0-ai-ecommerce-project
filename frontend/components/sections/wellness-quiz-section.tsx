'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Check, Sparkles, Moon, Brain, Zap, Leaf, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const quizQuestions = [
  {
    id: '1',
    question: 'What are your primary wellness goals?',
    description: 'Select all that apply',
    multiSelect: true,
    options: [
      { id: 'sleep', label: 'Better Sleep', icon: Moon, color: 'text-indigo-500' },
      { id: 'focus', label: 'Mental Focus', icon: Brain, color: 'text-amber-500' },
      { id: 'energy', label: 'More Energy', icon: Zap, color: 'text-orange-500' },
      { id: 'gut', label: 'Gut Health', icon: Leaf, color: 'text-green-500' },
      { id: 'stress', label: 'Stress Relief', icon: Heart, color: 'text-rose-500' },
    ],
  },
  {
    id: '2',
    question: 'How would you describe your current sleep quality?',
    options: [
      { id: 'great', label: 'Great - I sleep well most nights' },
      { id: 'ok', label: 'Okay - Room for improvement' },
      { id: 'poor', label: 'Poor - I struggle to fall or stay asleep' },
      { id: 'terrible', label: 'Terrible - Chronic sleep issues' },
    ],
  },
  {
    id: '3',
    question: 'How often do you experience afternoon energy crashes?',
    options: [
      { id: 'never', label: 'Never - Energy is consistent' },
      { id: 'sometimes', label: 'Sometimes - Once or twice a week' },
      { id: 'often', label: 'Often - Most days' },
      { id: 'daily', label: 'Daily - Always hit a wall' },
    ],
  },
  {
    id: '4',
    question: 'Any dietary preferences we should know about?',
    description: 'Select all that apply',
    multiSelect: true,
    options: [
      { id: 'none', label: 'No restrictions' },
      { id: 'vegan', label: 'Vegan' },
      { id: 'gluten', label: 'Gluten-Free' },
      { id: 'keto', label: 'Keto' },
      { id: 'organic', label: 'Prefer Organic' },
    ],
  },
]

interface WellnessQuizSectionProps {
  onComplete?: (answers: Record<string, string[]>) => void
}

export function WellnessQuizSection({ onComplete }: WellnessQuizSectionProps) {
  const [isStarted, setIsStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [isComplete, setIsComplete] = useState(false)

  const currentQuestion = quizQuestions[currentStep]
  const progress = ((currentStep + 1) / quizQuestions.length) * 100

  const handleSelect = (optionId: string) => {
    const questionId = currentQuestion.id
    const currentAnswers = answers[questionId] || []

    if (currentQuestion.multiSelect) {
      if (currentAnswers.includes(optionId)) {
        setAnswers({
          ...answers,
          [questionId]: currentAnswers.filter((a) => a !== optionId),
        })
      } else {
        setAnswers({
          ...answers,
          [questionId]: [...currentAnswers, optionId],
        })
      }
    } else {
      setAnswers({
        ...answers,
        [questionId]: [optionId],
      })
    }
  }

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
      onComplete?.(answers)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isOptionSelected = (optionId: string) => {
    return (answers[currentQuestion?.id] || []).includes(optionId)
  }

  const canProceed = (answers[currentQuestion?.id] || []).length > 0

  if (!isStarted) {
    return (
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Personalized for You</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4 text-balance">
            Find your perfect wellness stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Take our 60-second quiz and get AI-powered supplement recommendations tailored to your unique goals and lifestyle.
          </p>
          
          <Button size="lg" onClick={() => setIsStarted(true)} className="gap-2">
            Start Quiz
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Takes less than 60 seconds • No email required
          </p>
        </div>
      </section>
    )
  }

  if (isComplete) {
    return (
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-accent" />
          </div>
          
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Your personalized stack is ready!
          </h2>
          <p className="text-muted-foreground mb-8">
            Based on your goals, we&apos;ve curated the perfect combination of supplements for you.
          </p>
          
          <div className="p-6 rounded-2xl bg-card border border-border/50 text-left mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Your Recommended Stack</h3>
            </div>
            <div className="space-y-3">
              {['Deep Sleep Complex', 'Focus Flow Nootropic', 'Daily Energy Adaptogen'].map((product) => (
                <div key={product} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-medium">{product}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly with subscription</p>
                <p className="text-2xl font-bold">£89.99 <span className="text-sm font-normal text-muted-foreground line-through">£112.99</span></p>
              </div>
              <Button className="gap-2">
                Add Stack to Cart
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <Button variant="outline" onClick={() => { setIsStarted(false); setIsComplete(false); setCurrentStep(0); setAnswers({}) }}>
            Retake Quiz
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentStep + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-card rounded-2xl border border-border/50 p-8">
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            {currentQuestion.question}
          </h3>
          {currentQuestion.description && (
            <p className="text-muted-foreground mb-6">{currentQuestion.description}</p>
          )}

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const IconComponent = 'icon' in option ? option.icon : null
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left',
                    isOptionSelected(option.id)
                      ? 'border-accent bg-accent/5'
                      : 'border-border/50 hover:border-border bg-transparent hover:bg-secondary/30'
                  )}
                >
                  <div className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                    isOptionSelected(option.id)
                      ? 'border-accent bg-accent'
                      : 'border-muted-foreground/30'
                  )}>
                    {isOptionSelected(option.id) && (
                      <Check className="w-4 h-4 text-accent-foreground" />
                    )}
                  </div>
                  {IconComponent && (
                    <IconComponent className={cn('w-5 h-5', 'color' in option ? option.color : '')} />
                  )}
                  <span className="font-medium">{option.label}</span>
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="gap-2"
            >
              {currentStep === quizQuestions.length - 1 ? 'See Results' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
