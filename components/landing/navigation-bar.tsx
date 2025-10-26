'use client'

import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold text-white">Nocturide</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-zinc-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-zinc-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="#templates" className="text-zinc-300 hover:text-white transition-colors">
              Templates
            </Link>
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Sign In
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-zinc-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-zinc-800/50">
            <Link href="#features" className="block text-zinc-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#about" className="block text-zinc-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="#templates" className="block text-zinc-300 hover:text-white transition-colors">
              Templates
            </Link>
            <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Sign In
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
