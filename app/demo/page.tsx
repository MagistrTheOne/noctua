'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ProjectPreview } from '@/components/demo/project-preview'
import { Sparkles, Clock, Users, TrendingUp, ArrowRight, Zap, Code, FileText, Play } from 'lucide-react'
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
  source?: 'template' | 'gigachat' | 'fallback'
  techStack?: string[]
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
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

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
    const fetchRateLimit = async () => {
      try {
        const response = await fetch('/api/demo/generate')
        if (response.ok) {
          const data = await response.json()
          if (data.rateLimitInfo) {
            setRateLimitInfo(data.rateLimitInfo)
          }
        }
      } catch (error) {
        console.error('Error fetching rate limit:', error)
      }
    }

    fetchRateLimit()
  }, [])

  const handleGenerate = async () => {
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

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Ошибка генерации проекта')
      }

      const data = await response.json()
      setGeneratedProject(data)
      
      if (data.rateLimitInfo) {
        setRateLimitInfo(data.rateLimitInfo)
      }

      // Выбираем первый файл для отображения
      if (data.files && data.files.length > 0) {
        const firstFile = data.files.find((file: any) => file.type === 'file')
        if (firstFile) {
          setSelectedFile(firstFile.name)
        }
      }

    } catch (error) {
      console.error('Generation error:', error)
      setError(error instanceof Error ? error.message : 'Ошибка генерации проекта')
    } finally {
      setIsGenerating(false)
    }
  }

  const getFileContent = (fileName: string): string => {
    if (!generatedProject?.files) return ''
    
    const findFileContent = (files: any[]): string => {
      for (const file of files) {
        if (file.name === fileName && file.content) {
          return file.content
        }
        if (file.children) {
          const found = findFileContent(file.children)
          if (found) return found
        }
      }
      return ''
    }
    
    return findFileContent(generatedProject.files)
  }

  const getAllFiles = (): Array<{name: string, content: string}> => {
    if (!generatedProject?.files) return []
    
    const files: Array<{name: string, content: string}> = []
    
    const collectFiles = (fileList: any[], path = '') => {
      for (const file of fileList) {
        if (file.type === 'file' && file.content) {
          files.push({
            name: path ? `${path}/${file.name}` : file.name,
            content: file.content
          })
        }
        if (file.children) {
          collectFiles(file.children, path ? `${path}/${file.name}` : file.name)
        }
      }
    }
    
    collectFiles(generatedProject.files)
    return files
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
                AI Demo
              </Badge>
            </div>
            
            {rateLimitInfo && (
              <div className="flex items-center space-x-4 text-sm text-zinc-400">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Осталось: {rateLimitInfo.remaining}/{rateLimitInfo.limit}</span>
                </div>
                <div className="text-zinc-500">
                  Сброс: {new Date(rateLimitInfo.resetAt).toLocaleTimeString('ru-RU')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-zinc-100">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                  <span>AI Генератор проектов</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Опишите проект, который хотите создать..."
                    className="min-h-[120px] bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 resize-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    disabled={isGenerating}
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-zinc-400">Примеры запросов:</p>
                  <div className="flex flex-wrap gap-2">
                    {promptExamples.slice(0, 3).map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(example)}
                        className="text-xs bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 px-3 py-1 rounded transition-colors"
                        disabled={isGenerating}
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Генерируем...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Сгенерировать проект
                    </>
                  )}
                </Button>

                {error && (
                  <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-zinc-100">Возможности демо</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-zinc-400">
                    <Code className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">Monaco Editor</span>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-400">
                    <FileText className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Syntax Highlight</span>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-400">
                    <Play className="h-4 w-4 text-purple-400" />
                    <span className="text-sm">Live Preview</span>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-400">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">AI Generation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Project Preview */}
          <div className="space-y-6">
            {generatedProject ? (
              <>
                {/* Project Info */}
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-zinc-100">{generatedProject.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        {generatedProject.source === 'template' && (
                          <Badge className="bg-green-600/20 text-green-400 border-green-500/50">
                            Шаблон
                          </Badge>
                        )}
                        {generatedProject.source === 'gigachat' && (
                          <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/50">
                            AI генерация
                          </Badge>
                        )}
                        {generatedProject.source === 'fallback' && (
                          <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-500/50">
                            Fallback
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-400 mb-4">{generatedProject.description}</p>
                    
                    {generatedProject.techStack && (
                      <div className="space-y-2">
                        <p className="text-sm text-zinc-500">Технологии:</p>
                        <div className="flex flex-wrap gap-2">
                          {generatedProject.techStack.map((tech, index) => (
                            <Badge key={index} variant="outline" className="border-zinc-600 text-zinc-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {generatedProject.message && (
                      <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/50 rounded-lg">
                        <p className="text-blue-400 text-sm">{generatedProject.message}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Code Editor */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-zinc-100">Код проекта</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* File Selector */}
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {getAllFiles().map((file, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedFile(file.name)}
                            className={`px-3 py-1 rounded text-sm whitespace-nowrap transition-colors ${
                              selectedFile === file.name
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50'
                                : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50'
                            }`}
                          >
                            {file.name}
                          </button>
                        ))}
                      </div>

                      {/* Monaco Editor Placeholder */}
                      <div className="bg-zinc-900 rounded-lg border border-zinc-700/50 min-h-[400px] p-4">
                        <div className="text-zinc-500 text-sm mb-2">
                          Monaco Editor будет здесь
                        </div>
                        <pre className="text-zinc-300 text-sm overflow-auto max-h-[350px]">
                          {selectedFile ? getFileContent(selectedFile) : 'Выберите файл для просмотра'}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="glass-card">
                <CardContent className="py-12 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-zinc-800/50 rounded-full flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-zinc-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                        Создайте свой первый проект
                      </h3>
                      <p className="text-zinc-400 max-w-md mx-auto">
                        Опишите идею вашего проекта, и наш AI сгенерирует готовый код с современными технологиями
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}