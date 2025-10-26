'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-4">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-white">500</h1>
          <h2 className="text-2xl font-semibold text-zinc-300">Server Error</h2>
          <p className="text-zinc-400 leading-relaxed">
            Something went wrong on our end. We're working to fix this issue.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={reset}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100"
            >
              Try Again
            </Button>
            
            <Button asChild className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100">
              <Link href="/">
                Go Home
              </Link>
            </Button>
          </div>
          
          <div className="text-sm text-zinc-500">
            Still having issues? Contact us at{' '}
            <a 
              href="mailto:maxonyushko71@gmail.com" 
              className="text-zinc-400 hover:text-white transition-colors"
            >
              maxonyushko71@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
