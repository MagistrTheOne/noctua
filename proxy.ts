import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export const config = {
  matcher: ['/workspace/:path*', '/api/projects/:path*', '/api/files/:path*', '/api/webcontainer/:path*'],
}

export default async function proxy(request: NextRequest) {
  // Защита /workspace/* routes
  if (request.nextUrl.pathname.startsWith('/workspace')) {
    try {
      const token = await getToken({ req: request })

      if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  // Защита API роутов (дополнительная проверка)
  if (request.nextUrl.pathname.startsWith('/api/projects') ||
      request.nextUrl.pathname.startsWith('/api/files') ||
      request.nextUrl.pathname.startsWith('/api/webcontainer')) {
    try {
      const token = await getToken({ req: request })

      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    } catch (error) {
      console.error('API auth check failed:', error)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}
