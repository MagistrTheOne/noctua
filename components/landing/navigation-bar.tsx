'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/95 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">Nocturide</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-zinc-300 hover:text-white transition-colors text-sm">
              Features
            </Link>
            <Link href="#about" className="text-zinc-300 hover:text-white transition-colors text-sm">
              About
            </Link>
            <Link href="#templates" className="text-zinc-300 hover:text-white transition-colors text-sm">
              Templates
            </Link>
            <Link href="#contact" className="text-zinc-300 hover:text-white transition-colors text-sm">
              Contact
            </Link>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-zinc-800 text-sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-sm" asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-zinc-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-zinc-800/50">
            <Link href="#features" className="block text-zinc-300 hover:text-white transition-colors text-sm">
              Features
            </Link>
            <Link href="#about" className="block text-zinc-300 hover:text-white transition-colors text-sm">
              About
            </Link>
            <Link href="#templates" className="block text-zinc-300 hover:text-white transition-colors text-sm">
              Templates
            </Link>
            <Link href="#contact" className="block text-zinc-300 hover:text-white transition-colors text-sm">
              Contact
            </Link>
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start text-zinc-300 hover:text-white hover:bg-zinc-800" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white" asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
