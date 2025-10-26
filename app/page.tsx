import { HeroSection } from '@/components/landing/hero-section'
import { NavigationBar } from '@/components/landing/navigation-bar'
import { FeaturesGrid } from '@/components/landing/features-grid'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
      <NavigationBar />
      <main className="container mx-auto px-4 py-16">
        <HeroSection />
        <FeaturesGrid />
      </main>
      <footer className="border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-zinc-400">
          <p>MagistrTheOne © 2025</p>
        </div>
      </footer>
    </div>
  )
}