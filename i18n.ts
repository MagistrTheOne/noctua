import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
export const locales = ['ru', 'en'] as const
export type Locale = typeof locales[number]

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`./locales/${locale}.json`)).default
  }
})

// Middleware config for next-intl
export const middlewareConfig = {
  locales,
  defaultLocale: 'ru' as const,
  localePrefix: 'always' as const,
  localeDetection: true
}
