'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'

export function ComparisonTable() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const t = useTranslations('comparison')

  const comparisonData = [
    {
      feature: t('features.setupTime'),
      traditional: t('features.setupTraditional'),
      nocturide: t('features.setupNocturide'),
    },
    {
      feature: t('features.codeQuality'),
      traditional: t('features.codeTraditional'),
      nocturide: t('features.codeNocturide'),
    },
    {
      feature: t('features.deployment'),
      traditional: t('features.deploymentTraditional'),
      nocturide: t('features.deploymentNocturide'),
    },
    {
      feature: t('features.cost'),
      traditional: t('features.costTraditional'),
      nocturide: t('features.costNocturide'),
    },
    {
      feature: t('features.learning'),
      traditional: t('features.learningTraditional'),
      nocturide: t('features.learningNocturide'),
    },
  ]

  return (
    <div ref={ref} className={`container mx-auto px-4 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">{t('title')}</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          See how Nocturide compares to traditional development approaches
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Header */}
          <div className="md:col-start-2 text-center">
            <h3 className="text-2xl font-bold text-white mb-8">{t('nocturide')}</h3>
          </div>

          {/* Comparison rows */}
          {comparisonData.map((item, index) => (
            <div key={index} className="contents">
              {/* Feature */}
              <div className="md:col-start-1 bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 flex items-center">
                <span className="text-white font-medium">{item.feature}</span>
              </div>

              {/* Traditional */}
              <div className="bg-zinc-900/20 border border-zinc-800 rounded-lg p-4 flex items-center justify-center text-center">
                <span className="text-zinc-400 text-sm">{item.traditional}</span>
              </div>

              {/* Nocturide */}
              <div className="bg-linear-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-lg p-4 flex items-center justify-center text-center relative">
                <span className="text-white font-medium text-sm">{item.nocturide}</span>
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Best
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom summary */}
        <div className={`mt-12 text-center transition-all duration-500 ${isInView ? 'animate-fade-in' : ''}`}>
          <Card className="glass border-zinc-800 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold text-lg">95% Faster Development</span>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-zinc-400">
                Nocturide reduces development time from months to minutes while maintaining enterprise-grade quality and security.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
