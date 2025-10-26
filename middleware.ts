import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n'

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'ru',

  // Automatically detect user's locale based on headers
  localeDetection: true
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ru|en)/:path*', '/((?!api|_next/static|_next/image|favicon.ico).*)']
}
