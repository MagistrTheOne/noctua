import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesGrid } from '@/components/landing/features-grid'
import { AboutSection } from '@/components/landing/about-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { FAQSection } from '@/components/landing/faq-section'
import { ContactSection } from '@/components/landing/contact-section'
import { Footer } from '@/components/landing/footer'
import { NavigationBar } from '@/components/landing/navigation-bar'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <NavigationBar />
      <HeroSection />
      <FeaturesGrid />
      <AboutSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
