'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'

export function FAQSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const t = useTranslations('faq')

  const faqItems = [
    {
      question: t('questions.whatIs.question'),
      answer: t('questions.whatIs.answer'),
    },
    {
      question: t('questions.howWorks.question'),
      answer: t('questions.howWorks.answer'),
    },
    {
      question: t('questions.cost.question'),
      answer: t('questions.cost.answer'),
    },
    {
      question: t('questions.security.question'),
      answer: t('questions.security.answer'),
    },
    {
      question: t('questions.support.question'),
      answer: t('questions.support.answer'),
    },
    {
      question: t('questions.export.question'),
      answer: t('questions.export.answer'),
    },
  ]

  return (
    <div ref={ref} className={`container mx-auto px-4 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold text-white">{t('title')}</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Find answers to the most common questions about Nocturide
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="glass border-zinc-800">
          <CardContent className="p-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-zinc-800 last:border-b-0"
                >
                  <AccordionTrigger
                    className="text-left text-white hover:text-zinc-200 hover:no-underline py-4 focus:ring-2 focus:ring-zinc-500"
                    aria-describedby={`faq-answer-${index}`}
                  >
                    <span className="text-base font-medium">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-zinc-400 leading-relaxed pb-4"
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                  >
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Still have questions CTA */}
        <div className={`mt-12 text-center transition-all duration-500 ${isInView ? 'animate-fade-in' : ''}`}>
          <Card className="glass border-zinc-800 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold text-lg">Still have questions?</span>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-zinc-400 mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:maxonyushko71@gmail.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg transition-colors"
                >
                  📧 Send Email
                </a>
                <a
                  href="https://t.me/MagistrTheOne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  💬 Telegram Support
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
