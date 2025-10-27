'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useInView } from '@/hooks/use-in-view'
import { Check } from 'lucide-react'

export function PricingSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  const plans = [
    {
      name: 'Бесплатно',
      description: 'Идеально для изучения и экспериментов',
      price: '0₽',
      period: 'навсегда',
      features: [
        '5 проектов в месяц',
        'Базовая AI генерация кода',
        'Community поддержка',
        'Стандартные шаблоны',
        'Публичные репозитории'
      ],
      cta: 'Начать',
      popular: false
    },
    {
      name: 'Pro',
      description: 'Для профессиональных разработчиков и команд',
      price: '2,990₽',
      period: 'в месяц',
      features: [
        'Неограниченные проекты',
        'Продвинутые AI модели',
        'Приоритетная поддержка',
        'Премиум шаблоны',
        'Приватные репозитории',
        'Командная работа',
        'Кастомные домены',
        'Аналитический дашборд'
      ],
      cta: 'Попробовать Pro',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'Кастомные решения для крупных организаций',
      price: 'По запросу',
      period: '',
      features: [
        'Все возможности Pro',
        'Выделенная инфраструктура',
        '24/7 телефонная поддержка',
        'Кастомные интеграции',
        'SSO & SAML',
        'Расширенная безопасность',
        'Инструменты соответствия',
        'Кастомное обучение AI'
      ],
      cta: 'Связаться с продажами',
      popular: false
    }
  ]

  return (
    <section id="pricing" ref={ref} className={`container mx-auto px-4 py-24 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold text-zinc-100">Простые тарифы</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Выберите план, который подходит вашим потребностям в разработке
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`glass-card transition-all duration-300 hover:scale-105 ${
              plan.popular ? 'border-blue-500/50 ring-2 ring-blue-500/20' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">Самый популярный</Badge>
              </div>
            )}
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-zinc-100">{plan.name}</CardTitle>
              <p className="text-zinc-400">{plan.description}</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-zinc-100">{plan.price}</span>
                <span className="text-zinc-400 ml-2">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                    : 'bg-zinc-800 hover:bg-zinc-700'
                } text-white`}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
