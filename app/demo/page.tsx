'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ProjectPreview } from '@/components/demo/project-preview'
import { Sparkles, Clock, Users, TrendingUp, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'

interface GeneratedProject {
  name: string
  description: string
  files: Array<{
    name: string
    type: 'file' | 'folder'
    content?: string
    children?: Array<any>
  }>
  demo?: boolean
  message?: string
  rateLimitInfo?: {
    remaining: number
    resetAt: number
    limit: number
  }
}

export default function DemoPage() {
  const searchParams = useSearchParams()
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedProject, setGeneratedProject] = useState<GeneratedProject | null>(null)
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    remaining: number
    resetAt: number
    limit: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Обработка проекта из URL параметров (при переходе с Hero Section)
  useEffect(() => {
    const projectParam = searchParams.get('project')
    if (projectParam) {
      try {
        const project = JSON.parse(decodeURIComponent(projectParam))
        setGeneratedProject(project)
        if (project.rateLimitInfo) {
          setRateLimitInfo(project.rateLimitInfo)
        }
        // Очищаем URL параметр
        window.history.replaceState({}, '', '/demo')
      } catch (error) {
        console.error('Error parsing project from URL:', error)
      }
    }
  }, [searchParams])

  // Примеры промптов
  const promptExamples = [
    "Создай приложение для управления задачами с React и TypeScript",
    "Построй интернет-магазин с корзиной покупок и системой оплаты",
    "Сделай дашборд с графиками и аналитикой для бизнеса",
    "Создай блог с системой комментариев и управлением контентом",
    "Построй CRM систему для управления клиентами и продажами"
  ]

  // Загружаем информацию о rate limit при монтировании
  useEffect(() => {
    fetchRateLimitInfo()
  }, [])

  const fetchRateLimitInfo = async () => {
    try {
      const response = await fetch('/api/demo/generate')
      if (response.ok) {
        const data = await response.json()
        setRateLimitInfo({
          remaining: data.remaining,
          resetAt: data.resetAt,
          limit: data.limit
        })
      }
    } catch (err) {
      console.error('Failed to fetch rate limit info:', err)
    }
  }

  const generateProject = async () => {
    if (!prompt.trim()) {
      setError('Пожалуйста, введите описание проекта')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/demo/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          setError(`Превышен лимит запросов. Попробуйте через ${Math.ceil(data.retryAfter / 60)} минут.`)
        } else {
          setError(data.message || 'Ошибка генерации проекта')
        }
        return
      }

      setGeneratedProject(data)
      setRateLimitInfo(data.rateLimitInfo)
    } catch (err) {
      setError('Ошибка при генерации проекта. Попробуйте еще раз.')
    } finally {
      setIsGenerating(false)
    }
  }

  const formatTimeRemaining = (resetAt: number) => {
    const now = Date.now()
    const remaining = Math.max(0, resetAt - now)
    const minutes = Math.ceil(remaining / (1000 * 60))
    return `${minutes} мин`
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-neutral-950 to-black">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-100">
            Попробуйте{' '}
            <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              AI-генерацию
            </span>{' '}
            кода
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Создавайте полнофункциональные приложения с помощью искусственного интеллекта. 
            Просто опишите, что хотите создать, и получите готовый код за секунды.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-zinc-100">5K+</div>
              <div className="text-sm text-zinc-400">Активных разработчиков</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-zinc-100">10K+</div>
              <div className="text-sm text-zinc-400">Проектов создано</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-8 h-8 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-zinc-100">1M+</div>
              <div className="text-sm text-zinc-400">Строк кода сгенерировано</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl text-zinc-100">Опишите ваш проект</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Например: Создай приложение для управления задачами с React, TypeScript и Tailwind CSS..."
                  className="min-h-[120px] bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 resize-none"
                />
                
                {/* Examples */}
                <div className="space-y-2">
                  <p className="text-sm text-zinc-400">Примеры:</p>
                  <div className="space-y-1">
                    {promptExamples.slice(0, 3).map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(example)}
                        className="block w-full text-left text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 p-2 rounded transition-colors"
                      >
                        • {example}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rate Limit Info */}
                {rateLimitInfo && (
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Лимит демо:</span>
                      <span className="text-zinc-300">
                        {rateLimitInfo.remaining} из {rateLimitInfo.limit} генераций
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-zinc-400">Обновится через:</span>
                      <span className="text-zinc-300">
                        {formatTimeRemaining(rateLimitInfo.resetAt)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                <Button
                  onClick={generateProject}
                  disabled={isGenerating || !prompt.trim() || (rateLimitInfo?.remaining === 0)}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Генерируем проект...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Сгенерировать проект</span>
                    </div>
                  )}
                </Button>

                {/* CTA */}
                <div className="text-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Зарегистрируйтесь для неограниченного доступа</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="h-[600px]">
            <ProjectPreview project={generatedProject} isLoading={isGenerating} />
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-zinc-100 mb-8">
            Почему выбирают Nocturide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100">AI-генерация</h3>
              <p className="text-zinc-400">
                Создавайте полнофункциональные приложения с помощью передовых AI моделей
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100">Быстрая разработка</h3>
              <p className="text-zinc-400">
                Сократите время разработки с недель до часов с помощью AI-ассистента
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100">Командная работа</h3>
              <p className="text-zinc-400">
                Работайте в командах с синхронизацией в реальном времени
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}