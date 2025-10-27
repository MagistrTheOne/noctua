import { HeroSection } from '@/components/landing/hero-section'
import { NavigationBar } from '@/components/landing/navigation-bar'
import { FeaturesGrid } from '@/components/landing/features-grid'
import { ComparisonTable } from '@/components/landing/comparison-table'
import { AboutSection } from '@/components/landing/about-section'
import { TemplatesSection } from '@/components/landing/templates-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { RoadmapSection } from '@/components/landing/roadmap-section'
import { UseCasesSection } from '@/components/landing/use-cases-section'
import { FAQSection } from '@/components/landing/faq-section'
import { ContactSection } from '@/components/landing/contact-section'
import { Footer } from '@/components/landing/footer'
import { ErrorBoundary } from '@/components/error-boundary'

export default function EnHomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 scroll-smooth">
      <NavigationBar />
      <main>
        <section id="hero" className="min-h-screen flex items-center justify-center">
          <ErrorBoundary sectionName="HeroSection">
            <HeroSection />
          </ErrorBoundary>
        </section>

        <section id="features" className="min-h-screen flex items-center justify-center">
          <ErrorBoundary sectionName="FeaturesGrid">
            <FeaturesGrid />
          </ErrorBoundary>
        </section>

        <section className="py-20">
          <ErrorBoundary sectionName="ComparisonTable">
            <ComparisonTable />
          </ErrorBoundary>
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center">
          <ErrorBoundary sectionName="AboutSection">
            <AboutSection />
          </ErrorBoundary>
        </section>

        <section id="templates" className="min-h-screen flex items-center justify-center">
          <ErrorBoundary sectionName="TemplatesSection">
            <TemplatesSection />
          </ErrorBoundary>
        </section>

        <section id="pricing" className="min-h-screen flex items-center justify-center">
          <ErrorBoundary sectionName="PricingSection">
            <PricingSection />
          </ErrorBoundary>
        </section>

        <section id="roadmap" className="py-20">
          <ErrorBoundary sectionName="RoadmapSection">
            <RoadmapSection />
          </ErrorBoundary>
        </section>

        <section className="py-20">
          <ErrorBoundary sectionName="UseCasesSection">
            <UseCasesSection />
          </ErrorBoundary>
        </section>

        <section className="py-20">
          <ErrorBoundary sectionName="FAQSection">
            <FAQSection />
          </ErrorBoundary>
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center">
          <ErrorBoundary sectionName="ContactSection">
            <ContactSection />
          </ErrorBoundary>
        </section>
      </main>

      <ErrorBoundary sectionName="Footer">
        <Footer />
      </ErrorBoundary>
    </div>
  )
}
