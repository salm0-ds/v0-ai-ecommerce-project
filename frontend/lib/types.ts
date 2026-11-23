// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: ProductCategory
  tags: string[]
  benefits: string[]
  ingredients: Ingredient[]
  rating: number
  reviewCount: number
  inStock: boolean
  subscriptionAvailable: boolean
  subscriptionDiscount: number
  servings: number
  servingSize: string
  certifications: string[]
}

export type ProductCategory = 'sleep' | 'gut-health' | 'focus' | 'energy' | 'stress' | 'hydration'

export interface Ingredient {
  name: string
  amount: string
  dailyValue?: string
  description?: string
}

// Order Types
export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: Address
  trackingNumber?: string
  trackingUrl?: string
  estimatedDelivery?: string
  createdAt: string
  updatedAt: string
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  isSubscription: boolean
}

export interface Address {
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

// Chat/AI Types
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  actions?: AIAction[]
  cards?: AICard[]
}

export interface AIAction {
  intent: AIIntent
  data?: Record<string, unknown>
}

export type AIIntent = 
  | 'ProductRecommendation'
  | 'OrderTracking'
  | 'CancelOrder'
  | 'RefundRequest'
  | 'FAQ'
  | 'SubscriptionManagement'
  | 'WellnessQuiz'
  | 'EscalateToHuman'

export interface AICard {
  type: 'product' | 'order' | 'tracking' | 'refund' | 'recommendation-stack' | 'quick-actions'
  data: unknown
}

export interface ProductCard {
  type: 'product'
  data: {
    product: Product
    reason?: string
  }
}

export interface OrderCard {
  type: 'order'
  data: {
    order: Order
  }
}

export interface TrackingCard {
  type: 'tracking'
  data: {
    order: Order
    steps: TrackingStep[]
  }
}

export interface TrackingStep {
  status: string
  location?: string
  timestamp: string
  completed: boolean
  current: boolean
}

export interface RefundCard {
  type: 'refund'
  data: {
    order: Order
    eligible: boolean
    reason?: string
    estimatedAmount?: number
  }
}

export interface RecommendationStackCard {
  type: 'recommendation-stack'
  data: {
    title: string
    description: string
    products: Product[]
    totalPrice: number
    subscriptionPrice: number
  }
}

export interface QuickActionsCard {
  type: 'quick-actions'
  data: {
    actions: QuickAction[]
  }
}

export interface QuickAction {
  label: string
  value: string
  icon?: string
}

// Wellness Quiz Types
export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
  multiSelect?: boolean
}

export interface QuizOption {
  id: string
  label: string
  value: string
  icon?: string
}

export interface QuizResult {
  goals: string[]
  recommendedProducts: Product[]
  personalizedStack: {
    name: string
    products: Product[]
    monthlyPrice: number
    subscriptionPrice: number
  }
}

// Analytics Types
export interface SupportAnalytics {
  ticketsAutomated: number
  ticketsAutomatedChange: number
  refundDeflectionRate: number
  refundDeflectionChange: number
  avgResponseTime: string
  avgResponseTimeChange: number
  retentionSaves: number
  retentionSavesChange: number
  upsellConversions: number
  upsellConversionsChange: number
  customerSatisfaction: number
  customerSatisfactionChange: number
}

// API Response Types
export interface APIResponse<T> {
  data: T
  success: boolean
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
