'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useInView } from '@/hooks/use-in-view'

export function AboutSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section id="about" ref={ref} className={`container mx-auto px-4 py-24 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold text-zinc-100">Почему Nocturide</h2>
        <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
          Создано для разработчиков, которые работают быстро
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-zinc-100">Разрабатывайте быстрее чем когда-либо</h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
              Наша платформа использует передовые AI-технологии для генерации готового к продакшену кода. 
              Просто опишите, что хотите создать, и получите полноценное приложение за минуты, а не часы.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-zinc-100">Современный стек технологий</h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
              Мы поддерживаем все популярные фреймворки и библиотеки: React, Next.js, Vue.js, 
              TypeScript, Tailwind CSS и многие другие. Оставайтесь в курсе последних инструментов.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-zinc-100">Опыт для разработчиков</h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
              Создано разработчиками для разработчиков. Каждая функция разработана для повышения 
              вашей продуктивности и снижения трения в процессе разработки.
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-zinc-100">10K+</div>
                <div className="text-zinc-400">Проектов создано</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-zinc-100">5K+</div>
                <div className="text-zinc-400">Активных разработчиков</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-zinc-100">1M+</div>
                <div className="text-zinc-400">Строк кода сгенерировано</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
