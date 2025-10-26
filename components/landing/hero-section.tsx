'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'
import { useParallax } from '@/hooks/use-parallax'

export function HeroSection() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [ref, isInView] = useInView({ threshold: 0.3 })

  const t = useTranslations('hero')
  const router = useRouter()

  // Parallax effects
  const parallax1 = useParallax({ speed: 0.3 })
  const parallax2 = useParallax({ speed: -0.2 })
  const parallax3 = useParallax({ speed: 0.1 })

  // Примеры промптов
  const promptExamples = [
    "Create a todo app with React, TypeScript, and Tailwind CSS...",
    "Build an e-commerce store with payment integration...",
    "Make a social media dashboard with real-time updates...",
    "Design a blog platform with SEO optimization...",
    "Create a SaaS analytics dashboard with charts..."
  ]

  // Эффект live typing для placeholder
  useEffect(() => {
    if (!isInView) return

    const currentExample = promptExamples[currentPlaceholderIndex]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex < currentExample.length) {
        setDisplayedPlaceholder(currentExample.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)

        // Переход к следующему примеру через 2 секунды
        setTimeout(() => {
          setIsTyping(true)
          setCurrentPlaceholderIndex((prev) => (prev + 1) % promptExamples.length)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [currentPlaceholderIndex, isInView])

  // Сброс при фокусе
  const handleFocus = () => {
    setIsTyping(false)
    setDisplayedPlaceholder('')
  }

  const handleBlur = () => {
    if (!prompt) {
      setIsTyping(true)
      setCurrentPlaceholderIndex(0)
    }
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example.replace('...', ''))
  }

  const handleCreateProject = async () => {
    if (!prompt.trim()) {
      toast.error('Please describe your project')
      return
    }

    setIsLoading(true)

    try {
      // Generate project with AI
      const response = await fetch('/api/ai/generate-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        toast.success('Project generated successfully!')
        router.push(`/workspace/${result.projectId}`)
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to generate project')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div ref={ref as any} className={`relative container mx-auto px-4 text-center space-y-8 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      {/* Parallax background elements */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          transform: `translateY(${parallax1}px)`,
        }}
      >
        <div className="absolute top-20 left-20 w-72 h-72 bg-zinc-800/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          transform: `translateY(${parallax2}px)`,
        }}
      >
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="space-y-4 relative z-10">
        <h1 className="text-6xl font-bold text-white">
          {t('title')}
        </h1>
        <p className="text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center space-x-8 text-zinc-500">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm">{t('noCreditCard')}</span>
        </div>
        <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm">{t('freeToStart')}</span>
        </div>
        <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <span className="text-sm">{t('quickSetup')}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <Card className="glass border-zinc-800">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Textarea
                  placeholder={isTyping ? displayedPlaceholder : promptExamples[0]}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="min-h-[100px] resize-none bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 text-lg leading-relaxed"
                  disabled={isLoading}
                />

                <div className="flex justify-end">
                  <Button
                    onClick={handleCreateProject}
                    disabled={isLoading || !prompt.trim()}
                    className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 px-8 py-2 text-sm"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>{t('creating')}</span>
                      </div>
                    ) : (
                      t('create')
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Примеры промптов */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {promptExamples.map((example, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleExampleClick(example)}
              className="text-xs border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-colors"
              disabled={isLoading}
            >
              {example.replace('...', '')}
            </Button>
          ))}
        </div>

        {/* Счетчик проектов */}
        <div className="mt-8">
          <div className="inline-flex items-center space-x-2 bg-zinc-900/50 border border-zinc-700 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-zinc-300 text-sm font-medium">10,000+ projects created</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center space-x-8 text-zinc-500 relative z-10">
          <div className="text-sm">{t('noCoding')}</div>
          <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
          <div className="text-sm">{t('aiPowered')}</div>
          <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
          <div className="text-sm">{t('instantResults')}</div>
        </div>
      </div>
    </div>
  )
}
