'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, TestTube, CheckCircle, AlertCircle, Code, Copy, Download } from 'lucide-react'

interface TestCase {
  input: string
  expected: string
  description: string
}

interface UnitTest {
  name: string
  description: string
  code: string
  testCases: TestCase[]
}

interface TestResult {
  unitTests: UnitTest[]
  integrationTests: Array<{
    name: string
    description: string
    code: string
  }>
  mocks: Array<{
    name: string
    description: string
    code: string
  }>
  coverage: string
  recommendations: string
}

export default function TestGenerator() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [testFramework, setTestFramework] = useState('jest')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<TestResult | null>(null)
  const [error, setError] = useState('')

  const handleGenerateTests = async () => {
    if (!code.trim()) {
      setError('Пожалуйста, введите код для генерации тестов')
      return
    }

    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/ai/generate-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          testFramework
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка генерации тестов')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при генерации тестов')
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">🧪 AI Генератор тестов</h2>
        <p className="text-gray-600">Автоматически создает unit и integration тесты для вашего кода</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Входные данные</CardTitle>
            <CardDescription>Введите код для генерации тестов</CardDescription>
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
                <label className="block text-sm font-medium mb-2">Фреймворк тестирования</label>
                <Input
                  value={testFramework}
                  onChange={(e) => setTestFramework(e.target.value)}
                  placeholder="jest"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Код для тестирования</label>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Введите код..."
                rows={12}
                className="font-mono text-sm"
              />
            </div>

            <Button
              onClick={handleGenerateTests}
              disabled={isLoading || !code.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Генерирую тесты...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4 mr-2" />
                  Сгенерировать тесты
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
            <CardTitle>Результаты</CardTitle>
            <CardDescription>Сгенерированные тесты и рекомендации</CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                {/* Coverage & Recommendations */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">📊 Покрытие тестами</h4>
                    <p className="text-sm text-gray-600">{result.coverage}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">💡 Рекомендации</h4>
                    <p className="text-sm text-gray-600">{result.recommendations}</p>
                  </div>
                </div>

                {/* Unit Tests */}
                {result.unitTests.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">🧪 Unit тесты</h4>
                    <div className="space-y-4">
                      {result.unitTests.map((test, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{test.name}</h5>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(test.code)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => downloadFile(test.code, `${test.name}.test.${language}`)}
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                          
                          {test.testCases.length > 0 && (
                            <div className="space-y-2">
                              <h6 className="text-sm font-medium">Тест-кейсы:</h6>
                              {test.testCases.map((testCase, caseIndex) => (
                                <div key={caseIndex} className="text-xs bg-gray-50 p-2 rounded">
                                  <div><strong>Входные данные:</strong> {testCase.input}</div>
                                  <div><strong>Ожидаемый результат:</strong> {testCase.expected}</div>
                                  <div><strong>Описание:</strong> {testCase.description}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <pre className="mt-3 text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                            <code>{test.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Integration Tests */}
                {result.integrationTests.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">🔗 Integration тесты</h4>
                    <div className="space-y-4">
                      {result.integrationTests.map((test, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{test.name}</h5>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(test.code)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => downloadFile(test.code, `${test.name}.integration.test.${language}`)}
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                            <code>{test.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mocks */}
                {result.mocks.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">🎭 Моки</h4>
                    <div className="space-y-4">
                      {result.mocks.map((mock, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{mock.name}</h5>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(mock.code)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => downloadFile(mock.code, `${mock.name}.mock.${language}`)}
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{mock.description}</p>
                          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                            <code>{mock.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <TestTube className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Результаты появятся здесь после генерации тестов</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
