'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { LanguageToggle } from './language-toggle'

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('navigation')

  return (
    <nav
      className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/95 backdrop-blur-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link
              href="#hero"
              className="text-xl font-bold text-white hover:text-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded"
              aria-label="Nocturide - Go to homepage"
            >
              Nocturide
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6" role="menubar">
            <Link
              href="#features"
              className="text-zinc-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
            >
              {t('features')}
            </Link>
            <Link
              href="#about"
              className="text-zinc-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
            >
              {t('about')}
            </Link>
            <Link
              href="#templates"
              className="text-zinc-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
            >
              {t('templates')}
            </Link>
            <Link
              href="#contact"
              className="text-zinc-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
            >
              {t('contact')}
            </Link>
            <div className="flex items-center space-x-3" role="group" aria-label="User actions">
              <LanguageToggle />
              <Button
                variant="ghost"
                className="text-zinc-300 hover:text-white hover:bg-zinc-800 text-sm focus:ring-2 focus:ring-zinc-500"
                asChild
              >
                <Link href="/auth/signin" role="menuitem">{t('signin')}</Link>
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-sm focus:ring-2 focus:ring-zinc-500"
                asChild
              >
                <Link href="/auth/signup" role="menuitem">{t('signup')}</Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-300 focus:ring-2 focus:ring-zinc-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? "✕" : "☰"}
            </Button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
          role="menu"
          aria-hidden={!isMenuOpen}
        >
          <div className="py-4 space-y-4 border-t border-zinc-800/50">
            <Link
              href="#features"
              className="block text-zinc-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('features')}
            </Link>
            <Link
              href="#about"
              className="block text-zinc-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <Link
              href="#templates"
              className="block text-zinc-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('templates')}
            </Link>
            <Link
              href="#contact"
              className="block text-zinc-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact')}
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-zinc-800/30">
              <Button
                variant="ghost"
                className="justify-start text-zinc-300 hover:text-white hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-500"
                asChild
              >
                <Link href="/auth/signin" role="menuitem" onClick={() => setIsMenuOpen(false)}>
                  {t('signin')}
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white focus:ring-2 focus:ring-zinc-500"
                asChild
              >
                <Link href="/auth/signup" role="menuitem" onClick={() => setIsMenuOpen(false)}>
                  {t('signup')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
