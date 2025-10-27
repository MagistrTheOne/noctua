'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useInView } from '@/hooks/use-in-view'
import { Sparkles, Code2, Rocket, Users, FolderKanban, Plug } from 'lucide-react'

export function FeaturesGrid() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  const features = [
    {
      title: 'AI-генерация кода',
      description: 'Создавайте полнофункциональные приложения с помощью искусственного интеллекта',
      icon: Sparkles,
      color: 'text-blue-500'
    },
    {
      title: 'Monaco Editor',
      description: 'Профессиональный редактор кода с подсветкой синтаксиса и автодополнением',
      icon: Code2,
      color: 'text-green-500'
    },
    {
      title: 'Мгновенный Deploy',
      description: 'Развертывайте проекты одним кликом на современной инфраструктуре',
      icon: Rocket,
      color: 'text-purple-500'
    },
    {
      title: 'Совместная работа',
      description: 'Работайте в командах с синхронизацией в реальном времени',
      icon: Users,
      color: 'text-orange-500'
    },
    {
      title: 'Шаблоны проектов',
      description: 'Готовые шаблоны для быстрого старта разработки',
      icon: FolderKanban,
      color: 'text-pink-500'
    },
    {
      title: 'Интеграции',
      description: 'Подключайтесь к популярным сервисам и API без проблем',
      icon: Plug,
      color: 'text-cyan-500'
    }
  ]

  return (
    <section id="features" ref={ref} className={`container mx-auto px-4 py-24 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      <div className="text-center space-y-4 mb-20">
        <h2 className="text-4xl font-bold text-zinc-100">Возможности платформы</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Все необходимые инструменты для современной веб-разработки в одном месте
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <Card key={index} className="glass-card hover:border-zinc-600/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-zinc-800/50 rounded-xl flex items-center justify-center mx-auto">
                  <IconComponent className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
