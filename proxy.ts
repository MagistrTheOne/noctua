import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export const config = {
  matcher: [
    // Auth protected routes
    '/workspace/:path*',
    '/api/projects/:path*',
    '/api/files/:path*',
    '/api/webcontainer/:path*',
    // All other routes except static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
}

export default async function proxy(request: NextRequest) {
  // Проверяем аутентификацию для защищенных роутов
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

  // Защита API роутов
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

  // Продолжаем обработку запроса
  return NextResponse.next()
}
