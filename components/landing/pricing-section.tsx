'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'
import Link from 'next/link'

export function PricingSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const t = useTranslations('pricing')

  const plans = [
    {
      name: t('free.name'),
      price: t('free.price'),
      period: t('free.period'),
      features: t('free.features').split(','),
      button: t('free.button'),
      href: '/auth/signup',
    },
    {
      name: t('pro.name'),
      price: t('pro.price'),
      period: t('pro.period'),
      features: t('pro.features').split(','),
      button: t('pro.button'),
      href: '/auth/signup?plan=pro',
      popular: t('pro.popular'),
      highlighted: true,
    },
    {
      name: t('enterprise.name'),
      price: t('enterprise.price'),
      period: t('enterprise.period'),
      features: t('enterprise.features').split(','),
      button: t('enterprise.button'),
      href: '#contact',
    },
  ]

  return (
    <div ref={ref as any} className={`container mx-auto px-4 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-white">{t('title')}</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`glass border-zinc-800 hover:bg-zinc-900/60 transition-all duration-300 hover:scale-105 relative ${
              plan.highlighted ? 'border-zinc-600 shadow-lg shadow-zinc-900/50' : ''
            } ${isInView ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-linear-to-r from-zinc-800 to-zinc-700 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {plan.popular}
                </span>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && (
                  <span className="text-zinc-400 text-lg">/{plan.period}</span>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-linear-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 border-zinc-600 text-white'
                    : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100'
                }`}
                asChild
              >
                <Link href={plan.href}>
                  {plan.button}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ hint */}
      <div className={`mt-16 text-center transition-all duration-500 ${isInView ? 'animate-fade-in' : ''}`}>
        <p className="text-zinc-400 mb-4">
          Have questions about pricing or need a custom plan?
        </p>
        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white" asChild>
          <Link href="#contact">Contact Sales</Link>
        </Button>
      </div>
    </div>
  )
}
