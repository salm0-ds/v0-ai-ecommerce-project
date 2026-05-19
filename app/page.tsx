import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturedProductsSection } from '@/components/sections/featured-products-section'
import { SocialProofSection } from '@/components/sections/social-proof-section'
import { ScienceTrustSection } from '@/components/sections/science-trust-section'
import { mockProducts } from '@/lib/mock-data'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header onOpenChat={() => {}} />

      <HeroSection />

      <FeaturedProductsSection products={mockProducts} />

      <SocialProofSection />

      <ScienceTrustSection />

      <Footer />
    </main>
  )
}
