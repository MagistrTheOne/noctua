'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useInView } from '@/hooks/use-in-view'
import { toast } from 'sonner'

export function ContactSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({ email: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" ref={ref} className={`container mx-auto px-4 py-24 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold text-zinc-100">Свяжитесь с нами</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Есть вопросы? Мы здесь, чтобы помочь. Отправьте нам сообщение, и мы ответим как можно скорее.
        </p>
        <div className="flex items-center justify-center space-x-2 text-zinc-500 text-sm">
          <span>Контакты:</span>
          <span className="text-zinc-300">MagistrTheOne</span>
          <span>•</span>
          <span>Основатель и ведущий разработчик</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-zinc-100 text-center">Свяжитесь с нами</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Email адрес</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-zinc-300">Сообщение</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Расскажите, как мы можем помочь..."
                  className="min-h-[120px] bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 resize-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.email || !formData.message}
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Отправляем...</span>
                  </div>
                ) : (
                  'Отправить сообщение'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
