'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Bug, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  Copy, 
  Download,
  RefreshCw,
  Search,
  Code,
  Clock,
  Zap
} from 'lucide-react'

interface DebugResult {
  issue: string
  solution: string
  code?: string
  explanation: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: 'syntax' | 'logic' | 'performance' | 'security' | 'best-practice'
  qaMockery?: string
  teamThreat?: string
  ceoWarning?: string
}

interface DebugAssistantProps {
  code: string
  language: string
  errorMessage?: string
  onDebugComplete?: (result: DebugResult) => void
  className?: string
}

export function DebugAssistant({ 
  code, 
  language, 
  errorMessage, 
  onDebugComplete, 
  className 
}: DebugAssistantProps) {
  const [isDebugging, setIsDebugging] = useState(false)
  const [debugResult, setDebugResult] = useState<DebugResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [customError, setCustomError] = useState('')

  const handleDebug = async () => {
    if (!code.trim()) {
      setError('Пожалуйста, введите код для отладки')
      return
    }

    setIsDebugging(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/debug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code: code.trim(),
          language: language || 'javascript',
          errorMessage: errorMessage || customError || null
        }),
      })

      if (!response.ok) {
        throw new Error('Ошибка при отладке кода')
      }

      const result = await response.json()
      setDebugResult(result)
      
      if (onDebugComplete) {
        onDebugComplete(result)
      }

    } catch (error) {
      console.error('Debug error:', error)
      setError('Произошла ошибка при отладке кода. Попробуйте еще раз.')
    } finally {
      setIsDebugging(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-800/50'
      case 'high': return 'text-orange-400 bg-orange-900/20 border-orange-800/50'
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800/50'
      case 'low': return 'text-blue-400 bg-blue-900/20 border-blue-800/50'
      default: return 'text-zinc-400 bg-zinc-900/20 border-zinc-800/50'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />
      case 'high': return <Bug className="w-4 h-4" />
      case 'medium': return <AlertTriangle className="w-4 h-4" />
      case 'low': return <Lightbulb className="w-4 h-4" />
      default: return <Bug className="w-4 h-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'syntax': return <Code className="w-4 h-4" />
      case 'logic': return <Search className="w-4 h-4" />
      case 'performance': return <Zap className="w-4 h-4" />
      case 'security': return <AlertTriangle className="w-4 h-4" />
      case 'best-practice': return <CheckCircle className="w-4 h-4" />
      default: return <Bug className="w-4 h-4" />
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Bug className="w-5 h-5 text-red-500" />
            <span>AI Отладчик</span>
            <Badge variant="secondary" className="text-xs">
              GigaChat
            </Badge>
          </CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setDebugResult(null)
              setError(null)
              setCustomError('')
            }}
            className="text-zinc-400 hover:text-zinc-200"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Debug Input */}
        <div className="p-4 border-b border-zinc-800 space-y-4">
          {/* Error Message Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Сообщение об ошибке (опционально)
            </label>
            <Textarea
              value={customError}
              onChange={(e) => setCustomError(e.target.value)}
              placeholder="Опишите ошибку, которую вы получаете..."
              className="min-h-[80px] resize-none"
              disabled={isDebugging}
            />
          </div>

          {/* Debug Button */}
          <Button
            onClick={handleDebug}
            disabled={isDebugging || !code.trim()}
            className="w-full"
          >
            {isDebugging ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Анализируем код...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Bug className="w-4 h-4" />
                <span>Найти и исправить ошибки</span>
              </div>
            )}
          </Button>
          
          {error && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Debug Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {debugResult && (
            <div className="space-y-4">
              {/* Issue Header */}
              <div className={`p-4 rounded-lg border ${getSeverityColor(debugResult.severity)}`}>
                <div className="flex items-start space-x-3">
                  {getSeverityIcon(debugResult.severity)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium uppercase">
                        {debugResult.severity}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {debugResult.category}
                      </Badge>
                    </div>
                    <h4 className="text-sm font-medium text-zinc-200 mb-2">
                      Проблема:
                    </h4>
                    <p className="text-sm text-zinc-300">
                      {debugResult.issue}
                    </p>
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800/50">
                <h4 className="text-sm font-medium text-zinc-200 mb-2 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Решение:</span>
                </h4>
                <p className="text-sm text-zinc-400 mb-3">
                  {debugResult.solution}
                </p>
                
                {debugResult.code && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500">Исправленный код:</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyCode(debugResult.code!)}
                        className="text-zinc-400 hover:text-zinc-200"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <pre className="text-xs bg-zinc-900/50 p-3 rounded overflow-x-auto">
                      <code>{debugResult.code}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Explanation */}
              <div className="p-4 bg-zinc-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-zinc-200 mb-2 flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  <span>Объяснение:</span>
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {debugResult.explanation}
                </p>
              </div>

              {/* QA Mockery */}
              {debugResult.qaMockery && (
                <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
                  <h4 className="text-sm font-medium text-red-300 mb-2 flex items-center space-x-2">
                    <Bug className="w-4 h-4 text-red-400" />
                    <span>🔥 QA высмеивание:</span>
                  </h4>
                  <p className="text-sm text-red-200 leading-relaxed">
                    {debugResult.qaMockery}
                  </p>
                </div>
              )}

              {/* Team Threat */}
              {debugResult.teamThreat && (
                <div className="p-4 bg-orange-900/20 border border-orange-800/50 rounded-lg">
                  <h4 className="text-sm font-medium text-orange-300 mb-2 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    <span>⚠️ Угроза команде:</span>
                  </h4>
                  <p className="text-sm text-orange-200 leading-relaxed">
                    {debugResult.teamThreat}
                  </p>
                </div>
              )}

              {/* CEO Warning */}
              {debugResult.ceoWarning && (
                <div className="p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
                  <h4 className="text-sm font-medium text-yellow-300 mb-2 flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>⚡ Предупреждение CEO:</span>
                  </h4>
                  <p className="text-sm text-yellow-200 leading-relaxed">
                    {debugResult.ceoWarning}
                  </p>
                </div>
              )}
            </div>
          )}

          {!debugResult && !isDebugging && (
            <div className="text-center py-8">
              <Bug className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm mb-2">
                Нажмите "Найти и исправить ошибки" для анализа
              </p>
              <p className="text-zinc-600 text-xs">
                AI поможет найти проблемы в коде и предложит решения
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
