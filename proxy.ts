import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import createMiddleware from 'next-intl/middleware'
import { middlewareConfig } from './i18n'

// i18n middleware для поддержки мультиязычности без префиксов
const i18nMiddleware = createMiddleware(middlewareConfig)

export const config = {
  matcher: [
    // Auth protected routes
    '/workspace/:path*',
    '/api/projects/:path*',
    '/api/files/:path*',
    '/api/webcontainer/:path*',
    // i18n routes with locale prefixes
    '/',
    '/(ru|en)',
    '/(ru|en)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
}

export default async function proxy(request: NextRequest) {
  // Сначала проверяем аутентификацию для защищенных роутов
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

  // Затем применяем i18n middleware для всех остальных роутов
  return i18nMiddleware(request)
}
