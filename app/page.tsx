import { HeroSection } from '@/components/landing/hero-section'
import { NavigationBar } from '@/components/landing/navigation-bar'
import { FeaturesGrid } from '@/components/landing/features-grid'
import { AboutSection } from '@/components/landing/about-section'
import { TemplatesSection } from '@/components/landing/templates-section'
import { ContactSection } from '@/components/landing/contact-section'
import { Footer } from '@/components/landing/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <NavigationBar />
      <main>
        <section className="min-h-screen flex items-center justify-center">
          <HeroSection />
        </section>
        <section className="min-h-screen flex items-center justify-center">
          <FeaturesGrid />
        </section>
        <section className="min-h-screen flex items-center justify-center">
          <AboutSection />
        </section>
        <section className="min-h-screen flex items-center justify-center">
          <TemplatesSection />
        </section>
        <section className="min-h-screen flex items-center justify-center">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  )
}