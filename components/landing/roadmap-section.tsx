'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'

export function RoadmapSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const t = useTranslations('roadmap')

  const quarters = [
    {
      title: t('q1.title'),
      items: t('q1.items') as unknown as string[],
      color: 'bg-blue-500',
    },
    {
      title: t('q2.title'),
      items: t('q2.items') as unknown as string[],
      color: 'bg-green-500',
    },
    {
      title: t('q3.title'),
      items: t('q3.items') as unknown as string[],
      color: 'bg-purple-500',
    },
  ]

  return (
    <div ref={ref} className={`container mx-auto px-4 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold text-white">{t('title')}</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quarters.map((quarter, index) => (
            <Card
              key={index}
              className={`glass border-zinc-800 hover:bg-zinc-900/60 transition-all duration-300 hover:scale-105 ${
                isInView ? 'animate-fade-in-up' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  {/* Timeline dot */}
                  <div className="flex justify-center">
                    <div className={`w-4 h-4 ${quarter.color} rounded-full relative`}>
                      <div className={`absolute inset-0 ${quarter.color} rounded-full animate-pulse`}></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white">{quarter.title}</h3>

                  <ul className="space-y-3">
                    {quarter.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 ${quarter.color} rounded-full mt-2 shrink-0`}></div>
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming soon hint */}
        <div className={`mt-16 text-center transition-all duration-500 ${isInView ? 'animate-fade-in' : ''}`}>
          <Card className="glass border-zinc-800 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold text-lg">More features coming soon...</span>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-zinc-400">
                We're constantly improving Nocturide based on user feedback. Join our community to influence the roadmap!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
