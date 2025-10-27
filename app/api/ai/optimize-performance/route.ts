import { NextRequest, NextResponse } from 'next/server'
import { gigaChatAPI } from '@/lib/gigachat'

/**
 * API endpoint для оптимизации производительности через GigaChat
 * Анализирует код и предлагает оптимизации
 */
export async function POST(request: NextRequest) {
  try {
    const { code, language = 'javascript', performanceTarget = 'general' } = await request.json()

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: 'Пожалуйста, предоставьте код для оптимизации'
        },
        { status: 400 }
      )
    }

    if (code.length > 10000) {
      return NextResponse.json(
        {
          error: 'Слишком большой код',
          message: 'Код не должен превышать 10000 символов'
        },
        { status: 400 }
      )
    }

    // Формируем системный промпт для оптимизации
    const systemPrompt = `Ты эксперт по оптимизации производительности кода.

Твоя задача - найти узкие места в коде и предложить оптимизации.

Правила анализа:
1. Ищи алгоритмические проблемы (O(n²) вместо O(n))
2. Проверяй использование памяти и утечки
3. Анализируй I/O операции и сетевые запросы
4. Ищи возможности кэширования и мемоизации
5. Проверяй использование циклов и рекурсии
6. Анализируй работу с DOM (для фронтенда)

Формат ответа (строго JSON):
{
  "performanceIssues": [
    {
      "type": "algorithm|memory|io|caching|dom",
      "severity": "critical|high|medium|low",
      "description": "описание проблемы",
      "line": номер строки,
      "impact": "влияние на производительность"
    }
  ],
  "optimizations": [
    {
      "title": "название оптимизации",
      "description": "описание оптимизации",
      "code": "оптимизированный код",
      "improvement": "ожидаемое улучшение производительности",
      "complexity": "сложность внедрения"
    }
  ],
  "recommendations": [
    {
      "category": "caching|algorithms|memory|io",
      "suggestion": "конкретная рекомендация",
      "priority": "high|medium|low"
    }
  ],
  "performanceScore": "оценка производительности 0-100",
  "summary": "краткое резюме оптимизаций"
}`

    // Отправляем запрос в GigaChat
    const response = await gigaChatAPI.sendMessage(
      `Проанализируй производительность этого ${language} кода и предложи оптимизации:\n\n\`\`\`${language}\n${code}\n\`\`\``,
      [{ role: 'system', content: systemPrompt }]
    )

    // Пытаемся распарсить JSON ответ
    let optimizationResult
    try {
      // Убираем возможные markdown обертки и извлекаем JSON
      let cleanResponse = response
      
      // Ищем JSON блок в ответе
      const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/) || 
                       response.match(/```\s*([\s\S]*?)\s*```/) ||
                       response.match(/\{[\s\S]*\}/)
      
      if (jsonMatch) {
        cleanResponse = jsonMatch[1] || jsonMatch[0]
      }
      
      // Очищаем от лишних символов
      cleanResponse = cleanResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      
      optimizationResult = JSON.parse(cleanResponse)
    } catch (parseError) {
      console.error('Failed to parse optimization result:', parseError)
      console.error('Raw response:', response)
      
      // Fallback - создаем базовую структуру
      optimizationResult = {
        performanceIssues: [],
        optimizations: [
          {
            title: 'Общие рекомендации',
            description: response,
            code: null,
            improvement: 'Улучшение производительности',
            complexity: 'medium'
          }
        ],
        recommendations: [],
        performanceScore: 70,
        summary: 'Код проанализирован на предмет оптимизации производительности'
      }
    }

    // Валидируем структуру ответа
    if (!Array.isArray(optimizationResult.optimizations)) {
      throw new Error('Invalid optimization result structure')
    }

    return NextResponse.json({
      success: true,
      ...optimizationResult
    })

  } catch (error: any) {
    console.error('Error in performance optimization API:', error)
    return NextResponse.json(
      {
        error: 'Ошибка оптимизации производительности',
        message: 'Произошла ошибка при анализе производительности. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}
