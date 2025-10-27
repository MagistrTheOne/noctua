'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'

export function UseCasesSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const t = useTranslations('useCases')

  const useCases = [
    {
      title: t('startup.title'),
      description: t('startup.description'),
      icon: '🚀',
      color: 'bg-blue-500',
    },
    {
      title: t('freelancers.title'),
      description: t('freelancers.description'),
      icon: '💼',
      color: 'bg-green-500',
    },
    {
      title: t('agencies.title'),
      description: t('agencies.description'),
      icon: '🏢',
      color: 'bg-purple-500',
    },
    {
      title: t('education.title'),
      description: t('education.description'),
      icon: '🎓',
      color: 'bg-orange-500',
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {useCases.map((useCase, index) => (
          <Card
            key={index}
            className={`glass border-zinc-800 hover:bg-zinc-900/60 transition-all duration-300 hover:scale-105 group ${
              isInView ? 'animate-fade-in-up' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-8 text-center space-y-4">
              {/* Icon */}
              <div className="flex justify-center">
                <div className={`w-16 h-16 ${useCase.color} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                  {useCase.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white">{useCase.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {useCase.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to action */}
      <div className={`mt-16 text-center transition-all duration-500 ${isInView ? 'animate-fade-in' : ''}`}>
        <Card className="glass border-zinc-800 max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold text-lg">Perfect for everyone</span>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-zinc-400 mb-6">
              Whether you're a startup founder, freelancer, agency, or educator, Nocturide adapts to your workflow and helps you build faster.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-500">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Startups & MVPs</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Freelance Projects</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Team Development</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Learning & Teaching</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
