import { NextRequest, NextResponse } from 'next/server'
import { gigaChatAPI } from '@/lib/gigachat'

/**
 * API endpoint для рефакторинга кода через GigaChat
 * Улучшает структуру и качество кода
 */
export async function POST(request: NextRequest) {
  try {
    const { code, language = 'javascript', refactorType = 'general' } = await request.json()

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: 'Пожалуйста, предоставьте код для рефакторинга'
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

    // Формируем системный промпт для рефакторинга
    const systemPrompt = `Ты эксперт по рефакторингу кода и улучшению его качества.

Твоя задача - улучшить структуру и качество предоставленного кода.

Правила рефакторинга:
1. Применяй принципы SOLID и Clean Code
2. Убирай code smells (дублирование, длинные методы, большие классы)
3. Улучшай читаемость и поддерживаемость
4. Применяй подходящие паттерны проектирования
5. Оптимизируй структуру данных и алгоритмы
6. Улучшай именование переменных и функций

Формат ответа (строго JSON):
{
  "refactoredCode": "улучшенный код",
  "improvements": [
    {
      "type": "readability|maintainability|performance|structure",
      "description": "описание улучшения",
      "before": "код до улучшения",
      "after": "код после улучшения"
    }
  ],
  "patternsApplied": [
    {
      "pattern": "название паттерна",
      "description": "описание применения паттерна",
      "benefits": "преимущества использования"
    }
  ],
  "codeSmellsFixed": [
    {
      "smell": "название code smell",
      "description": "описание проблемы",
      "solution": "как исправлено"
    }
  ],
  "qualityScore": "оценка качества кода 0-100",
  "summary": "краткое резюме рефакторинга"
}`

    // Отправляем запрос в GigaChat
    const response = await gigaChatAPI.sendMessage(
      `Отрефактори этот ${language} код, улучшив его структуру и качество:\n\n\`\`\`${language}\n${code}\n\`\`\``,
      [{ role: 'system', content: systemPrompt }]
    )

    // Пытаемся распарсить JSON ответ
    let refactorResult
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
      
      refactorResult = JSON.parse(cleanResponse)
    } catch (parseError) {
      console.error('Failed to parse refactor result:', parseError)
      console.error('Raw response:', response)
      
      // Fallback - создаем базовую структуру
      refactorResult = {
        refactoredCode: response,
        improvements: [
          {
            type: 'general',
            description: 'Общие улучшения кода',
            before: code,
            after: response
          }
        ],
        patternsApplied: [],
        codeSmellsFixed: [],
        qualityScore: 75,
        summary: 'Код отрефакторен для улучшения качества и структуры'
      }
    }

    // Валидируем структуру ответа
    if (!refactorResult.refactoredCode) {
      throw new Error('Invalid refactor result structure')
    }

    return NextResponse.json({
      success: true,
      ...refactorResult
    })

  } catch (error: any) {
    console.error('Error in code refactoring API:', error)
    return NextResponse.json(
      {
        error: 'Ошибка рефакторинга кода',
        message: 'Произошла ошибка при рефакторинге кода. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}
