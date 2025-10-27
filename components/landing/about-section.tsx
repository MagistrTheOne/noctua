'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'

export function AboutSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const t = useTranslations('about')

  const stats = [
    { label: t('stats.projects.label'), value: t('stats.projects.value') },
    { label: t('stats.users.label'), value: t('stats.users.value') },
    { label: t('stats.lines.label'), value: t('stats.lines.value') },
    { label: t('stats.countries.label'), value: t('stats.countries.value') },
  ]

  return (
    <div ref={ref} className={`container mx-auto px-4 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-white">{t('title')}</h2>
        <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">{t('builtForFuture')}</h3>
          <p className="text-zinc-400 leading-relaxed">
            {t('builtForFutureText1')}
          </p>
          <p className="text-zinc-400 leading-relaxed">
            {t('builtForFutureText2')}
          </p>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-zinc-300">{t('alwaysUpdated')}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-zinc-300">{t('enterpriseSecurity')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`glass border-zinc-800 text-center transition-all duration-300 hover:scale-105 ${
                isInView ? 'animate-fade-in-up' : ''
              }`}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Card className={`glass border-zinc-800 max-w-4xl mx-auto transition-all duration-500 ${isInView ? 'animate-fade-in' : ''}`}>
          <CardHeader>
            <CardTitle className="text-white text-2xl">{t('missionTitle')}</CardTitle>
            <CardDescription className="text-zinc-400 text-lg">
              {t('missionSubtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400 leading-relaxed">
              {t('missionText')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
