import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesGrid } from '@/components/landing/features-grid'
import { AboutSection } from '@/components/landing/about-section'
import { TemplatesSection } from '@/components/landing/templates-section'
import { UseCasesSection } from '@/components/landing/use-cases-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { ComparisonTable } from '@/components/landing/comparison-table'
import { RoadmapSection } from '@/components/landing/roadmap-section'
import { FAQSection } from '@/components/landing/faq-section'
import { ContactSection } from '@/components/landing/contact-section'
import { Footer } from '@/components/landing/footer'

export default function RussianPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <HeroSection />
      <FeaturesGrid />
      <AboutSection />
      <TemplatesSection />
      <UseCasesSection />
      <PricingSection />
      <ComparisonTable />
      <RoadmapSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
