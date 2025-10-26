'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from 'react'

export function LanguageToggle() {
  const locale = useLocale()
  const t = useTranslations('navigation')
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const toggleLocale = () => {
    const newLocale = locale === 'ru' ? 'en' : 'ru'

    startTransition(() => {
      // Убираем текущий locale из пути и добавляем новый
      const newPath = pathname.replace(`/${locale}`, '') || '/'
      router.push(`/${newLocale}${newPath}`)
    })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      disabled={isPending}
      className="text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors focus:ring-2 focus:ring-zinc-500"
      aria-label={`Switch language to ${locale === 'ru' ? 'English' : 'Russian'}`}
      aria-pressed={locale === 'en'}
    >
      {locale === 'ru' ? 'EN' : 'RU'}
    </Button>
  )
}
