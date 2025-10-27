'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useInView } from '@/hooks/use-in-view'

export function HeroSection() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isImproving, setIsImproving] = useState(false)
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [ref, isInView] = useInView({ threshold: 0.3 })

  // Состояния для анимации заголовка
  const [titleText, setTitleText] = useState('')
  const [isTitleTyping, setIsTitleTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  
  const router = useRouter()

  const fullTitle = "Создавайте приложения с ИИ"

  // Примеры промптов
  const promptExamples = [
    "Создай приложение для управления задачами с React, TypeScript и Tailwind CSS",
    "Построй интернет-магазин с корзиной покупок и системой оплаты",
    "Сделай дашборд с графиками и аналитикой для бизнеса",
    "Создай блог с системой комментариев и управлением контентом",
    "Построй CRM систему для управления клиентами и продажами"
    "Сделай сайт портфолио(React,next)"
  ]

  // Эффект анимации заголовка
  useEffect(() => {
    if (isTitleTyping && titleText.length < fullTitle.length) {
      const timeout = setTimeout(() => {
        setTitleText(fullTitle.slice(0, titleText.length + 1))
      }, 100) // 100мс на символ
      return () => clearTimeout(timeout)
    } else if (isTitleTyping && titleText.length === fullTitle.length) {
      // Завершили печатание, начинаем мигание курсора
      setIsTitleTyping(false)
    }
  }, [titleText, isTitleTyping, fullTitle])

  // Эффект мигания курсора
  useEffect(() => {
    if (!isTitleTyping) {
      const interval = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 500) // Мигание каждые 500мс
      return () => clearInterval(interval)
    }
  }, [isTitleTyping])

  // Эффект live typing для placeholder
  useEffect(() => {
    const currentExample = promptExamples[currentPlaceholderIndex]
    
    if (isTyping) {
      if (displayedPlaceholder.length < currentExample.length) {
        const timeout = setTimeout(() => {
          setDisplayedPlaceholder(currentExample.slice(0, displayedPlaceholder.length + 1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayedPlaceholder.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedPlaceholder(displayedPlaceholder.slice(0, -1))
        }, 30)
        return () => clearTimeout(timeout)
      } else {
        setIsTyping(true)
        setCurrentPlaceholderIndex((prev) => (prev + 1) % promptExamples.length)
      }
    }
  }, [displayedPlaceholder, isTyping, currentPlaceholderIndex, promptExamples])

  const handleImprovePrompt = async () => {
    if (!prompt.trim()) {
      toast.error('Пожалуйста, введите описание проекта')
      return
    }

    setIsImproving(true)
    try {
      const response = await fetch('/api/ai/improve-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Ошибка улучшения промпта')
      }

      const data = await response.json()
      setPrompt(data.improvedPrompt)
      toast.success('Промпт улучшен! Теперь можно генерировать проект.')
    } catch (error) {
      console.error('Improve prompt error:', error)
      toast.error('Ошибка при улучшении промпта. Попробуйте еще раз.')
    } finally {
      setIsImproving(false)
    }
  }

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-zinc-950 via-neutral-950 to-black">
      <div className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-100 leading-tight">
              {titleText}
              <span className={`inline-block w-1 h-16 bg-blue-500 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Современная среда веб-разработки с AI-генерацией кода, совместной работой в реальном времени и мгновенным развертыванием
            </p>
          </div>

          {/* Prompt input */}
          <Card className="max-w-3xl mx-auto glass-card">
            <CardContent className="p-8">
              <div className="space-y-6">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={displayedPlaceholder}
                  className="min-h-[140px] bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 resize-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                  disabled={isLoading}
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleImprovePrompt}
                    disabled={isImproving || !prompt.trim()}
                    variant="outline"
                    className="w-full sm:w-auto border-zinc-600/50 text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100 font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isImproving ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-zinc-400/30 border-t-zinc-400 rounded-full animate-spin" />
                        <span>Улучшаем...</span>
                      </div>
                    ) : (
                      'Улучшить промпт'
                    )}
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Генерируем проект...</span>
                      </div>
                    ) : (
                      'Начать создавать'
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => router.push('/demo')}
              className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200"
            >
              Попробовать демо
            </Button>
            <Button
              onClick={() => router.push('/auth/signup')}
              variant="outline"
              className="w-full sm:w-auto border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100 font-semibold py-4 px-8 rounded-lg transition-all duration-200"
            >
              Получить полный доступ
            </Button>
          </div>
          
          {/* Info text */}
          <div className="text-center space-y-2">
            <p className="text-sm text-zinc-500">
              Бесплатное демо: 3 генерации в час • Полный доступ требует одобрения от MagistrTheOne
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-zinc-600">
              <span>• Без регистрации</span>
              <span>• Требуется одобрение</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
