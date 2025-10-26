import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-4">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-zinc-300">Page Not Found</h2>
          <p className="text-zinc-400 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100">
            <Link href="/">
              Go Home
            </Link>
          </Button>
          
          <div className="text-sm text-zinc-500">
            Need help? Contact us at{' '}
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
