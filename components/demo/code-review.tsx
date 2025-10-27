'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Code, 
  Bug, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  Copy, 
  Download,
  RefreshCw,
  Star,
  Clock,
  Upload
} from 'lucide-react'

interface CodeReviewResult {
  score: number
  issues: Array<{
    type: 'error' | 'warning' | 'suggestion'
    message: string
    line?: number
    severity: 'high' | 'medium' | 'low'
    qaMockery?: string
  }>
  suggestions: Array<{
    title: string
    description: string
    code?: string
    ceoThreat?: string
  }>
  summary: string
  qaRant?: string
  ceoWarning?: string
}

interface CodeReviewProps {
  code: string
  language: string
  onReviewComplete?: (result: CodeReviewResult) => void
  className?: string
}

export function CodeReview({ code, language, onReviewComplete, className }: CodeReviewProps) {
  const [isReviewing, setIsReviewing] = useState(false)
  const [reviewResult, setReviewResult] = useState<CodeReviewResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [userCode, setUserCode] = useState(code || '')
  const [userLanguage, setUserLanguage] = useState(language || 'javascript')

  const handleReview = async () => {
    if (!userCode.trim()) {
      setError('Пожалуйста, введите код для анализа')
      return
    }

    setIsReviewing(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/code-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code: userCode.trim(),
          language: userLanguage
        }),
      })

      if (!response.ok) {
        throw new Error('Ошибка при анализе кода')
      }

      const result = await response.json()
      setReviewResult(result)
      
      if (onReviewComplete) {
        onReviewComplete(result)
      }

    } catch (error) {
      console.error('Code review error:', error)
      setError('Произошла ошибка при анализе кода. Попробуйте еще раз.')
    } finally {
      setIsReviewing(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-900/20 border-red-800/50'
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800/50'
      case 'low': return 'text-blue-400 bg-blue-900/20 border-blue-800/50'
      default: return 'text-zinc-400 bg-zinc-900/20 border-zinc-800/50'
    }
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <Bug className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'suggestion': return <Lightbulb className="w-4 h-4" />
      default: return <Code className="w-4 h-4" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Code className="w-5 h-5 text-blue-500" />
            <span>AI Ревью кода</span>
            <Badge variant="secondary" className="text-xs">
              GigaChat
            </Badge>
          </CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setReviewResult(null)
              setError(null)
            }}
            className="text-zinc-400 hover:text-zinc-200"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Review Button */}
        <div className="p-4 border-b border-zinc-800">
          {/* Code Input Area */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-zinc-300">
                Код для анализа
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  value={userLanguage}
                  onChange={(e) => setUserLanguage(e.target.value)}
                  placeholder="javascript"
                  className="w-24 h-8 text-xs bg-zinc-900/30 border-zinc-700/50 text-zinc-100"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setUserCode(code || '')
                    setUserLanguage(language || 'javascript')
                  }}
                  className="text-zinc-400 hover:text-zinc-200"
                  title="Использовать код из редактора"
                >
                  <Upload className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <Textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder="Вставьте код для анализа..."
              className="min-h-[120px] resize-none bg-zinc-900/30 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 font-mono text-sm"
            />
          </div>

          <Button
            onClick={handleReview}
            disabled={isReviewing || !userCode.trim()}
            className="w-full"
          >
            {isReviewing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Анализируем код...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>Провести ревью кода</span>
              </div>
            )}
          </Button>
          
          {error && (
            <Alert className="mt-3">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Review Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {reviewResult && (
            <div className="space-y-4">
              {/* Score */}
              <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium">Оценка качества:</span>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(reviewResult.score)}`}>
                  {reviewResult.score}/100
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 bg-zinc-900/30 rounded-lg">
                <h4 className="text-sm font-medium text-zinc-200 mb-2">Общая оценка:</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {reviewResult.summary}
                </p>
              </div>

              {/* QA Rant */}
              {reviewResult.qaRant && (
                <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
                  <h4 className="text-sm font-medium text-red-300 mb-2">🔥 Тирада против QA:</h4>
                  <p className="text-sm text-red-200 leading-relaxed">
                    {reviewResult.qaRant}
                  </p>
                </div>
              )}

              {/* CEO Warning */}
              {reviewResult.ceoWarning && (
                <div className="p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
                  <h4 className="text-sm font-medium text-yellow-300 mb-2">⚠️ Предупреждение CEO:</h4>
                  <p className="text-sm text-yellow-200 leading-relaxed">
                    {reviewResult.ceoWarning}
                  </p>
                </div>
              )}

              {/* Issues */}
              {reviewResult.issues.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-zinc-200 mb-3">
                    Найденные проблемы ({reviewResult.issues.length})
                  </h4>
                  <div className="space-y-2">
                    {reviewResult.issues.map((issue, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${getSeverityColor(issue.severity)}`}
                      >
                        <div className="flex items-start space-x-2">
                          {getIssueIcon(issue.type)}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs font-medium uppercase">
                                {issue.type}
                              </span>
                              {issue.line && (
                                <Badge variant="outline" className="text-xs">
                                  Строка {issue.line}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm">{issue.message}</p>
                            {issue.qaMockery && (
                              <div className="mt-2 p-2 bg-red-900/20 border border-red-800/50 rounded text-xs text-red-300">
                                <strong>QA высмеивание:</strong> {issue.qaMockery}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {reviewResult.suggestions.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-zinc-200 mb-3">
                    Рекомендации ({reviewResult.suggestions.length})
                  </h4>
                  <div className="space-y-3">
                    {reviewResult.suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800/50"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="text-sm font-medium text-zinc-200">
                            {suggestion.title}
                          </h5>
                          {suggestion.code && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyCode(suggestion.code!)}
                              className="text-zinc-400 hover:text-zinc-200"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-zinc-400 mb-2">
                          {suggestion.description}
                        </p>
                        {suggestion.ceoThreat && (
                          <div className="mt-2 p-2 bg-yellow-900/20 border border-yellow-800/50 rounded text-xs text-yellow-300">
                            <strong>Угроза CEO:</strong> {suggestion.ceoThreat}
                          </div>
                        )}
                        {suggestion.code && (
                          <pre className="text-xs bg-zinc-900/50 p-2 rounded overflow-x-auto">
                            <code>{suggestion.code}</code>
                          </pre>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!reviewResult && !isReviewing && (
            <div className="text-center py-8">
              <Code className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm">
                Нажмите "Провести ревью кода" для анализа
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
