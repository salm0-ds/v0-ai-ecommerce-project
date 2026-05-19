/**
 * API Service Layer
 * 
 * This file contains the API service functions that will connect to the FastAPI backend.
 * Currently using mock data for demonstration. Replace with actual API calls when backend is ready.
 * 
 * Backend Integration Points:
 * - FastAPI backend hosted on Render
 * - Supabase PostgreSQL database
 * - OpenAI structured outputs/tool calling
 * - Optional Shopify API integration
 */

import { 
  Product, 
  Order, 
  ChatMessage, 
  SupportAnalytics, 
  QuizQuestion, 
  QuizResult,
  APIResponse 
} from './types'
import { 
  mockProducts, 
  mockOrders, 
  mockChatMessages, 
  mockAnalytics, 
  mockQuizQuestions 
} from './mock-data'

// API Base URL - Replace with your FastAPI backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Helper function for API calls
async function fetchAPI<T>(
  endpoint: string, 
  options?: RequestInit
): Promise<APIResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        // Add auth headers here when integrating with Supabase Auth
        // 'Authorization': `Bearer ${session?.access_token}`
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    return { data, success: true }
  } catch (error) {
    console.error('API Error:', error)
    return { 
      data: null as T, 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// ============================================
// PRODUCTS API
// ============================================

/**
 * Fetch all products
 * TODO: Connect to FastAPI GET /api/products
 * TODO: Integrate with Shopify API for product sync
 */
export async function getProducts(): Promise<Product[]> {
  // Mock implementation - replace with actual API call
  // const response = await fetchAPI<Product[]>('/products')
  // return response.data
  
  await simulateDelay(500)
  return mockProducts
}

/**
 * Fetch product by slug
 * TODO: Connect to FastAPI GET /api/products/{slug}
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  await simulateDelay(300)
  return mockProducts.find(p => p.slug === slug) || null
}

/**
 * Fetch products by category
 * TODO: Connect to FastAPI GET /api/products?category={category}
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  await simulateDelay(400)
  return mockProducts.filter(p => p.category === category)
}

// ============================================
// ORDERS API
// ============================================

/**
 * Fetch orders for current user
 * TODO: Connect to FastAPI GET /api/orders
 * TODO: Requires Supabase Auth integration
 */
export async function getOrders(): Promise<Order[]> {
  await simulateDelay(600)
  return mockOrders
}

/**
 * Fetch order by ID
 * TODO: Connect to FastAPI GET /api/orders/{id}
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  await simulateDelay(400)
  return mockOrders.find(o => o.id === orderId || o.orderNumber === orderId) || null
}

/**
 * Request order cancellation
 * TODO: Connect to FastAPI POST /api/orders/{id}/cancel
 */
export async function cancelOrder(orderId: string): Promise<{ success: boolean; message: string }> {
  await simulateDelay(800)
  // Mock response
  return { 
    success: true, 
    message: 'Cancellation request submitted. You will receive a confirmation email.' 
  }
}

// ============================================
// REFUNDS API
// ============================================

/**
 * Check refund eligibility
 * TODO: Connect to FastAPI GET /api/refunds/eligibility/{orderId}
 */
export async function checkRefundEligibility(orderId: string): Promise<{
  eligible: boolean
  reason?: string
  estimatedAmount?: number
}> {
  await simulateDelay(500)
  return {
    eligible: true,
    estimatedAmount: 102.58,
    reason: 'Order is within 30-day return window',
  }
}

/**
 * Request refund
 * TODO: Connect to FastAPI POST /api/refunds
 */
export async function requestRefund(orderId: string, reason: string): Promise<{ 
  success: boolean
  refundId?: string
  message: string 
}> {
  await simulateDelay(1000)
  return {
    success: true,
    refundId: 'REF-' + Date.now(),
    message: 'Refund request submitted. Processing takes 3-5 business days.',
  }
}

// ============================================
// AI CHAT API
// ============================================

/**
 * Send message to AI assistant
 * TODO: Connect to FastAPI POST /api/chat
 * TODO: Integrate with OpenAI structured outputs
 * 
 * Expected request format:
 * {
 *   message: string,
 *   conversation_id: string,
 *   context: {
 *     user_id?: string,
 *     current_page?: string,
 *     cart_items?: string[]
 *   }
 * }
 * 
 * Expected response format (OpenAI structured output):
 * {
 *   response: string,
 *   actions: [
 *     { intent: "ProductRecommendation", data: { goal: "sleep" } },
 *     { intent: "OrderTracking", data: { order_id: "123" } }
 *   ],
 *   cards: [...]
 * }
 */
export async function sendChatMessage(
  message: string, 
  conversationId?: string
): Promise<ChatMessage> {
  await simulateDelay(1500)
  
  // Mock AI response based on message content
  const response = generateMockAIResponse(message)
  
  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: response.content,
    timestamp: new Date().toISOString(),
    actions: response.actions,
    cards: response.cards,
  }
}

/**
 * Get chat history
 * TODO: Connect to FastAPI GET /api/chat/history
 */
export async function getChatHistory(conversationId: string): Promise<ChatMessage[]> {
  await simulateDelay(400)
  return mockChatMessages
}

// ============================================
// WELLNESS QUIZ API
// ============================================

/**
 * Get quiz questions
 * TODO: Connect to FastAPI GET /api/quiz/questions
 */
export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  await simulateDelay(300)
  return mockQuizQuestions
}

/**
 * Submit quiz answers and get recommendations
 * TODO: Connect to FastAPI POST /api/quiz/submit
 * TODO: Integrate with OpenAI for personalized recommendations
 */
export async function submitQuizAnswers(answers: Record<string, string[]>): Promise<QuizResult> {
  await simulateDelay(1200)
  
  // Mock personalized recommendation based on answers
  const goals = Object.values(answers).flat()
  const recommendedProducts = mockProducts.filter(p => 
    goals.some(goal => p.category === goal || p.tags.includes(goal))
  ).slice(0, 3)
  
  return {
    goals,
    recommendedProducts,
    personalizedStack: {
      name: 'Your Personalized Wellness Stack',
      products: recommendedProducts,
      monthlyPrice: recommendedProducts.reduce((sum, p) => sum + p.price, 0),
      subscriptionPrice: recommendedProducts.reduce((sum, p) => 
        sum + (p.price * (1 - p.subscriptionDiscount / 100)), 0
      ),
    },
  }
}

// ============================================
// ANALYTICS API
// ============================================

/**
 * Get support automation analytics
 * TODO: Connect to FastAPI GET /api/analytics/support
 */
export async function getSupportAnalytics(): Promise<SupportAnalytics> {
  await simulateDelay(500)
  return mockAnalytics
}

// ============================================
// HELPERS
// ============================================

function simulateDelay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function generateMockAIResponse(message: string): {
  content: string
  actions?: ChatMessage['actions']
  cards?: ChatMessage['cards']
} {
  const lowerMessage = message.toLowerCase()
  
  // Sleep-related queries
  if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('rest')) {
    return {
      content: "I understand you're looking to improve your sleep. Based on your needs, I'd recommend our Deep Sleep Complex - it's our most popular supplement with a 4.9 star rating. It combines magnesium glycinate, L-theanine, and GABA for deep, restorative sleep without morning grogginess.",
      actions: [{ intent: 'ProductRecommendation', data: { goal: 'sleep' } }],
      cards: [
        {
          type: 'product',
          data: { product: mockProducts.find(p => p.category === 'sleep'), reason: 'Based on your sleep goals' },
        },
        {
          type: 'quick-actions',
          data: {
            actions: [
              { label: 'Add to cart', value: 'add_sleep' },
              { label: 'View ingredients', value: 'ingredients_sleep' },
              { label: 'Start subscription', value: 'subscribe_sleep' },
            ],
          },
        },
      ],
    }
  }
  
  // Order tracking queries
  if (lowerMessage.includes('track') || lowerMessage.includes('order') || lowerMessage.includes('where') || lowerMessage.includes('package')) {
    const order = mockOrders[0]
    return {
      content: `I found your recent order ${order.orderNumber}. It's currently shipped and on its way to you! The estimated delivery is ${new Date(order.estimatedDelivery!).toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' })}.`,
      actions: [{ intent: 'OrderTracking', data: { order_id: order.id } }],
      cards: [
        {
          type: 'tracking',
          data: {
            order,
            steps: [
              { status: 'Order placed', timestamp: order.createdAt, completed: true, current: false },
              { status: 'Processing', timestamp: order.createdAt, completed: true, current: false },
              { status: 'Shipped', location: 'Royal Mail Sorting Centre', timestamp: order.updatedAt, completed: true, current: true },
              { status: 'Out for delivery', timestamp: '', completed: false, current: false },
              { status: 'Delivered', timestamp: '', completed: false, current: false },
            ],
          },
        },
      ],
    }
  }
  
  // Refund/cancel queries
  if (lowerMessage.includes('refund') || lowerMessage.includes('cancel') || lowerMessage.includes('return')) {
    const order = mockOrders[0]
    return {
      content: "I can help you with that. I see you have a recent order that's eligible for our 30-day satisfaction guarantee. Before we process a refund, may I ask what wasn't working for you? We might be able to find a better solution.",
      actions: [{ intent: 'RefundRequest', data: { order_id: order.id } }],
      cards: [
        {
          type: 'refund',
          data: {
            order,
            eligible: true,
            reason: 'Within 30-day return window',
            estimatedAmount: order.total,
          },
        },
        {
          type: 'quick-actions',
          data: {
            actions: [
              { label: 'Try a different product', value: 'alternative' },
              { label: 'Adjust subscription', value: 'adjust_sub' },
              { label: 'Process refund', value: 'confirm_refund' },
              { label: 'Speak to human', value: 'escalate' },
            ],
          },
        },
      ],
    }
  }
  
  // Focus/productivity queries
  if (lowerMessage.includes('focus') || lowerMessage.includes('concentration') || lowerMessage.includes('brain') || lowerMessage.includes('productivity')) {
    return {
      content: "Looking to boost your mental performance? Our Focus Flow Nootropic is specifically designed for sustained concentration. It combines Lion's Mane, Alpha-GPC, and Bacopa - clinically-studied ingredients for enhanced cognitive function without jitters or crashes.",
      actions: [{ intent: 'ProductRecommendation', data: { goal: 'focus' } }],
      cards: [
        {
          type: 'product',
          data: { product: mockProducts.find(p => p.category === 'focus'), reason: 'For enhanced focus and productivity' },
        },
      ],
    }
  }
  
  // Default response
  return {
    content: "I'm here to help! I can assist you with finding the right supplements for your goals, tracking orders, managing subscriptions, or answering questions about our products. What would you like help with?",
    cards: [
      {
        type: 'quick-actions',
        data: {
          actions: [
            { label: 'Find supplements for me', value: 'recommend' },
            { label: 'Track my order', value: 'track' },
            { label: 'Manage subscription', value: 'subscription' },
            { label: 'Speak to human', value: 'escalate' },
          ],
        },
      },
    ],
  }
}
