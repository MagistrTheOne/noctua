'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Zap, CheckCircle, AlertCircle, Code, Copy, Download, TrendingUp } from 'lucide-react'

interface PerformanceIssue {
  type: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  line?: number
  impact: string
}

interface Optimization {
  title: string
  description: string
  code: string
  improvement: string
  complexity: string
}

interface Recommendation {
  category: string
  suggestion: string
  priority: 'high' | 'medium' | 'low'
}

interface OptimizationResult {
  performanceIssues: PerformanceIssue[]
  optimizations: Optimization[]
  recommendations: Recommendation[]
  performanceScore: number
  summary: string
}

export default function PerformanceOptimizer() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [performanceTarget, setPerformanceTarget] = useState('general')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<OptimizationResult | null>(null)
  const [error, setError] = useState('')

  const handleOptimize = async () => {
    if (!code.trim()) {
      setError('Пожалуйста, введите код для оптимизации')
      return
    }

    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/ai/optimize-performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          performanceTarget
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка оптимизации производительности')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при оптимизации')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">⚡ AI Оптимизатор производительности</h2>
        <p className="text-gray-600">Анализирует код и предлагает оптимизации для улучшения производительности</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Входные данные</CardTitle>
            <CardDescription>Введите код для анализа производительности</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Язык программирования</label>
                <Input
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="javascript"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Цель оптимизации</label>
                <Input
                  value={performanceTarget}
                  onChange={(e) => setPerformanceTarget(e.target.value)}
                  placeholder="general"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Код для анализа</label>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Введите код..."
                rows={12}
                className="font-mono text-sm"
              />
            </div>

            <Button
              onClick={handleOptimize}
              disabled={isLoading || !code.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Анализирую производительность...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Оптимизировать производительность
                </>
              )}
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Результаты анализа</CardTitle>
            <CardDescription>Проблемы производительности и рекомендации</CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                {/* Performance Score */}
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{result.performanceScore}/100</div>
                  <div className="text-sm text-gray-600 mb-4">Оценка производительности</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${result.performanceScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="font-semibold mb-2">📋 Резюме</h4>
                  <p className="text-sm text-gray-600">{result.summary}</p>
                </div>

                {/* Performance Issues */}
                {result.performanceIssues.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">⚠️ Проблемы производительности</h4>
                    <div className="space-y-3">
                      {result.performanceIssues.map((issue, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{issue.description}</h5>
                            <Badge className={getSeverityColor(issue.severity)}>
                              {issue.severity}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div><strong>Тип:</strong> {issue.type}</div>
                            {issue.line && <div><strong>Строка:</strong> {issue.line}</div>}
                            <div><strong>Влияние:</strong> {issue.impact}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optimizations */}
                {result.optimizations.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">🚀 Оптимизации</h4>
                    <div className="space-y-4">
                      {result.optimizations.map((optimization, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{optimization.title}</h5>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(optimization.code)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => downloadFile(optimization.code, `${optimization.title}.${language}`)}
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{optimization.description}</p>
                          <div className="text-sm space-y-1 mb-3">
                            <div><strong>Улучшение:</strong> {optimization.improvement}</div>
                            <div><strong>Сложность внедрения:</strong> {optimization.complexity}</div>
                          </div>
                          {optimization.code && (
                            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                              <code>{optimization.code}</code>
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">💡 Рекомендации</h4>
                    <div className="space-y-3">
                      {result.recommendations.map((rec, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{rec.category}</h5>
                            <Badge className={getPriorityColor(rec.priority)}>
                              {rec.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{rec.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Результаты анализа появятся здесь</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
