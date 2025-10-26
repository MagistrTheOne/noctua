import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export default async function proxy(request: NextRequest) {
  // Защита /workspace/* routes
  if (request.nextUrl.pathname.startsWith('/workspace')) {
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      })
      
      if (!session) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }
  
  return NextResponse.next()
}
