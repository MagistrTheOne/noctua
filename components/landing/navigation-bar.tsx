'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'
import { LanguageToggle } from './language-toggle'
import { Menu, X } from 'lucide-react'

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 z-50 w-full glass-navbar"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link
              href="#hero"
              className="text-xl font-bold text-zinc-100 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded"
              aria-label="Nocturide - Go to homepage"
            >
              Nocturide
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6" role="menubar">
            <Link
              href="#features"
              className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
            >
              Возможности
            </Link>
            <Link
              href="#about"
              className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
            >
              О платформе
            </Link>
            <Link
              href="#pricing"
              className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
            >
              Тарифы
            </Link>
            <Link
              href="#contact"
              className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
            >
              Контакты
            </Link>
            <div className="flex items-center space-x-3" role="group" aria-label="User actions">
              <LanguageToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 focus:ring-2 focus:ring-zinc-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
              className="block text-zinc-400 hover:text-zinc-100 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
            >
              Возможности
            </Link>
            <Link
              href="#about"
              className="block text-zinc-400 hover:text-zinc-100 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
            >
              О платформе
            </Link>
            <Link
              href="#pricing"
              className="block text-zinc-400 hover:text-zinc-100 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
            >
              Тарифы
            </Link>
            <Link
              href="#contact"
              className="block text-zinc-400 hover:text-zinc-100 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded px-2 py-1"
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
            >
              Контакты
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
