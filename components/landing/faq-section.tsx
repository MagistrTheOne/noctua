'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useInView } from '@/hooks/use-in-view'

export function FAQSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  const faqs = [
    {
      question: 'Как работает AI генерация кода?',
      answer: 'Наш AI анализирует описание вашего проекта и генерирует готовый к продакшену код, используя продвинутые языковые модели. Он понимает контекст, следует лучшим практикам и создает чистый, поддерживаемый код.'
    },
    {
      question: 'Какие языки программирования и фреймворки поддерживаются?',
      answer: 'Мы поддерживаем React, Next.js, Vue.js, Angular, TypeScript, JavaScript, Python, Node.js и многие другие. Наш AI адаптируется к вашему предпочтительному технологическому стеку и паттернам кодирования.'
    },
    {
      question: 'Могу ли я работать с командой в реальном времени?',
      answer: 'Да! Nocturide поддерживает совместную работу в реальном времени, где несколько разработчиков могут работать над одним проектом одновременно. Изменения синхронизируются мгновенно между всеми участниками команды.'
    },
    {
      question: 'Насколько безопасны мой код и данные?',
      answer: 'Мы серьезно относимся к безопасности. Весь код шифруется при передаче и хранении. Мы никогда не храним ваши приватные репозитории постоянно и следуем стандартным практикам безопасности индустрии.'
    },
    {
      question: 'Могу ли я развертывать проекты напрямую из Nocturide?',
      answer: 'Конечно! Вы можете развернуть на Vercel, Netlify или любой другой платформе одним кликом. Мы также предоставляем поддержку кастомных доменов и автоматические SSL сертификаты.'
    },
    {
      question: 'Что происходит, если я превышу лимиты плана?',
      answer: 'Мы уведомим вас, когда вы приближаетесь к лимитам. Вы можете обновить план в любое время или купить дополнительные кредиты для разового использования.'
    },
    {
      question: 'Предлагаете ли вы кастомное обучение AI моделей?',
      answer: 'Да, наш Enterprise план включает кастомное обучение AI моделей на основе вашей кодовой базы и стандартов кодирования. Это гарантирует, что AI генерирует код, соответствующий вашим специфическим требованиям.'
    },
    {
      question: 'Есть ли бесплатная пробная версия для платных планов?',
      answer: 'Да! Pro план включает 14-дневную бесплатную пробную версию. Кредитная карта не требуется. Вы можете отменить подписку в любое время в течение пробного периода.'
    }
  ]

  return (
    <section id="faq" ref={ref} className={`container mx-auto px-4 py-24 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold text-zinc-100">Часто задаваемые вопросы</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Ответы на популярные вопросы о Nocturide
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="glass-card border-zinc-700/50">
              <AccordionTrigger className="text-left text-zinc-100 hover:text-zinc-200 px-6 py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 px-6 pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
