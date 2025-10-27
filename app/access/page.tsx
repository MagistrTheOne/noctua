'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Mail, 
  User, 
  Building, 
  MessageSquare, 
  CheckCircle, 
  ArrowLeft,
  Sparkles,
  Code,
  Zap
} from 'lucide-react'
import Link from 'next/link'

interface FormData {
  name: string
  email: string
  company: string
  role: string
  experience: string
  projectDescription: string
  goals: string
  timeline: string
}

export default function AccessRequestPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    experience: '',
    projectDescription: '',
    goals: '',
    timeline: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/access-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Ошибка при отправке заявки')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Submit error:', error)
      setError('Произошла ошибка при отправке заявки. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-card">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-zinc-100 mb-2">
              Заявка отправлена!
            </h1>
            <p className="text-zinc-400 mb-6">
              Спасибо за интерес к Nocturide. MagistrTheOne рассмотрит вашу заявку и свяжется с вами в ближайшее время.
            </p>
            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Вернуться на главную
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Попробовать демо
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold text-zinc-100 hover:text-white transition-colors">
                Nocturide
              </Link>
              <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                Полный доступ
              </Badge>
            </div>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-zinc-100 mb-4">
              Получить полный доступ
            </h1>
            <p className="text-xl text-zinc-400 mb-6">
              Расскажите о вашем проекте и получите доступ к полному функционалу Nocturide
            </p>
            <div className="flex justify-center space-x-4 text-sm text-zinc-500">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>AI генерация</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Без лимитов</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Приоритет</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-zinc-100">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>Заявка на доступ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Имя *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Ваше имя"
                      required
                      className="bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Компания
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Название компании"
                      className="bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Роль
                    </label>
                    <Input
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      placeholder="Разработчик, PM, CTO..."
                      className="bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500"
                    />
                  </div>
                </div>

                {/* Project Info */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Опыт разработки *
                  </label>
                  <Textarea
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="Расскажите о вашем опыте в разработке..."
                    required
                    className="min-h-[100px] bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Описание проекта *
                  </label>
                  <Textarea
                    value={formData.projectDescription}
                    onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                    placeholder="Опишите проект, который хотите создать с помощью Nocturide..."
                    required
                    className="min-h-[120px] bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Цели и задачи
                  </label>
                  <Textarea
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    placeholder="Какие цели вы хотите достичь с помощью Nocturide?"
                    className="min-h-[100px] bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Временные рамки
                  </label>
                  <Input
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    placeholder="Когда планируете запуск проекта?"
                    className="bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500"
                  />
                </div>

                {error && (
                  <Alert>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Отправляем заявку...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Отправить заявку</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500 mb-4">
              MagistrTheOne рассмотрит вашу заявку в течение 24 часов
            </p>
            <div className="flex justify-center space-x-6 text-xs text-zinc-600">
              <span>• Без спама</span>
              <span>• Конфиденциально</span>
              <span>• Быстрый ответ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
