import { NextRequest, NextResponse } from 'next/server'
import { gigaChatAPI } from '@/lib/gigachat'

/**
 * API endpoint для отладки кода через GigaChat
 * Анализирует код и находит ошибки, предлагает решения
 */
export async function POST(request: NextRequest) {
  try {
    const { code, language = 'javascript', errorMessage } = await request.json()

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: 'Пожалуйста, предоставьте код для отладки'
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

    // Формируем системный промпт для отладки
    const systemPrompt = `Ты эксперт по отладке кода и решению проблем в программировании.

Твоя задача - найти ошибки в предоставленном коде и предложить решения.

Правила анализа:
1. Ищи синтаксические ошибки, логические ошибки, проблемы производительности
2. Проверяй безопасность кода
3. Предлагай конкретные исправления с примерами кода
4. Объясняй причины ошибок простым языком
5. Учитывай специфику языка ${language}

Формат ответа (строго JSON):
{
  "issue": "краткое описание найденной проблемы",
  "solution": "пошаговое решение проблемы",
  "code": "исправленный код (если применимо)",
  "explanation": "подробное объяснение проблемы и решения",
  "severity": "critical|high|medium|low",
  "category": "syntax|logic|performance|security|best-practice"
}`

    // Формируем запрос с учетом сообщения об ошибке
    let userMessage = `Проанализируй этот ${language} код на предмет ошибок:\n\n\`\`\`${language}\n${code}\n\`\`\``
    
    if (errorMessage) {
      userMessage += `\n\nДополнительная информация об ошибке: ${errorMessage}`
    }

    // Отправляем запрос в GigaChat
    const response = await gigaChatAPI.sendMessage(
      userMessage,
      [{ role: 'system', content: systemPrompt }]
    )

    // Пытаемся распарсить JSON ответ
    let debugResult
    try {
      // Убираем возможные markdown обертки
      const cleanResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      debugResult = JSON.parse(cleanResponse)
    } catch (parseError) {
      console.error('Failed to parse debug result:', parseError)
      
      // Fallback - создаем базовую структуру
      debugResult = {
        issue: 'Общий анализ кода',
        solution: response,
        code: null,
        explanation: 'Код проанализирован. Рекомендуется внимательно изучить предложения по улучшению.',
        severity: 'medium',
        category: 'best-practice'
      }
    }

    // Валидируем структуру ответа
    if (!debugResult.issue || !debugResult.solution) {
      throw new Error('Invalid debug result structure')
    }

    return NextResponse.json({
      success: true,
      ...debugResult
    })

  } catch (error: any) {
    console.error('Error in debug API:', error)
    return NextResponse.json(
      {
        error: 'Ошибка отладки кода',
        message: 'Произошла ошибка при отладке кода. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}
