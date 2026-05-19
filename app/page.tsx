'use client'

import { useState, useCallback } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturedProductsSection } from '@/components/sections/featured-products-section'
import { WellnessQuizSection } from '@/components/sections/wellness-quiz-section'
import { SocialProofSection } from '@/components/sections/social-proof-section'
import { ScienceTrustSection } from '@/components/sections/science-trust-section'
import { PersonalizationSection } from '@/components/sections/personalization-section'
import { AnalyticsDashboardSection } from '@/components/sections/analytics-dashboard-section'
import { AIAssistantPanel } from '@/components/chat/ai-assistant-panel'
import { ChatMessage, Product } from '@/lib/types'
import { mockProducts, mockChatMessages } from '@/lib/mock-data'
import { sendChatMessage } from '@/lib/api'

export default function HomePage() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Handle opening the chat with an initial query
  const handleOpenChatWithQuery = useCallback(async (query: string) => {
    setIsAssistantOpen(true)
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    
    try {
      // Get AI response
      const response = await sendChatMessage(query)
      setMessages(prev => [...prev, response])
    } catch (error) {
      console.error('[v0] Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Handle submitting a message from the chat panel
  const handleSubmitMessage = useCallback(async (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    
    try {
      // Get AI response
      const response = await sendChatMessage(message)
      setMessages(prev => [...prev, response])
    } catch (error) {
      console.error('[v0] Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Handle quick actions from chat cards
  const handleQuickAction = useCallback(async (action: string) => {
    const actionMessages: Record<string, string> = {
      'recommend': 'I want personalized supplement recommendations',
      'track': 'Where is my order?',
      'sleep': 'Help me improve my sleep',
      'subscription': 'I want to manage my subscription',
      'add_sleep': 'Add the Deep Sleep Complex to my cart',
      'ingredients_sleep': 'Tell me about the ingredients in the Deep Sleep Complex',
      'subscribe_sleep': 'I want to subscribe to the Deep Sleep Complex',
      'alternative': 'Can you recommend an alternative product?',
      'adjust_sub': 'I want to adjust my subscription frequency',
      'confirm_refund': 'Please process my refund request',
      'escalate': 'I would like to speak with a human support agent',
    }
    
    const message = actionMessages[action] || action
    await handleSubmitMessage(message)
  }, [handleSubmitMessage])

  // Handle Ask AI from product cards
  const handleAskAIAboutProduct = useCallback((product: Product) => {
    const query = `Tell me more about ${product.name}. What are the benefits and who is it best for?`
    handleOpenChatWithQuery(query)
  }, [handleOpenChatWithQuery])

  return (
    <main className="min-h-screen">
      <Header onOpenChat={() => setIsAssistantOpen(true)} />
      
      <HeroSection 
        onSubmitQuery={handleOpenChatWithQuery}
        isAssistantOpen={isAssistantOpen}
      />
      
      <FeaturedProductsSection 
        products={mockProducts} 
        onAskAI={handleAskAIAboutProduct}
      />
      
      <WellnessQuizSection />
      
      <SocialProofSection />
      
      <ScienceTrustSection />
      
      <PersonalizationSection />
      
      <AnalyticsDashboardSection />
      
      <Footer />

      {/* AI Assistant Panel */}
      <AIAssistantPanel
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        messages={messages}
        isLoading={isLoading}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSubmit={handleSubmitMessage}
        onQuickAction={handleQuickAction}
      />
    </main>
  )
}
