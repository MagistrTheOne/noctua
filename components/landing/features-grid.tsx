'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'

export function FeaturesGrid() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const t = useTranslations('features')

  const features = [
    {
      title: t('aiDevelopment.title'),
      description: t('aiDevelopment.description'),
      icon: '🤖',
    },
    {
      title: t('fullstackGeneration.title'),
      description: t('fullstackGeneration.description'),
      icon: '⚡',
    },
    {
      title: t('realtimeCollaboration.title'),
      description: t('realtimeCollaboration.description'),
      icon: '👥',
    },
    {
      title: t('instantDeployment.title'),
      description: t('instantDeployment.description'),
      icon: '🚀',
    },
    {
      title: t('smartEditor.title'),
      description: t('smartEditor.description'),
      icon: '💡',
    },
    {
      title: t('enterpriseSecurity.title'),
      description: t('enterpriseSecurity.description'),
      icon: '🔒',
    },
  ]

  return (
    <div ref={ref} className={`container mx-auto px-4 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-white">{t('title')}</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className={`glass border-zinc-800 hover:bg-zinc-900/60 transition-all duration-300 hover:scale-105 group ${
              isInView ? 'animate-fade-in-up' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3 mb-2">
                <div className="text-2xl">{feature.icon}</div>
              <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-zinc-400 text-sm leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
