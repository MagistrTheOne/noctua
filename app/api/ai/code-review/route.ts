import { NextRequest, NextResponse } from 'next/server'
import { gigaChatAPI } from '@/lib/gigachat'

/**
 * API endpoint для ревью кода через GigaChat
 * Анализирует код и предоставляет рекомендации по улучшению
 */
export async function POST(request: NextRequest) {
  try {
    const { code, language = 'javascript' } = await request.json()

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: 'Пожалуйста, предоставьте код для анализа'
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

    // Формируем системный промпт для ревью кода
    const systemPrompt = `Ты эксперт по ревью кода и качеству программного обеспечения.

Твоя задача - проанализировать предоставленный код и дать детальную оценку.

Правила анализа:
1. Оценивай код по шкале 0-100 баллов
2. Ищи ошибки, предупреждения и возможности для улучшения
3. Проверяй соответствие best practices для языка ${language}
4. Анализируй читаемость, производительность и безопасность
5. Предлагай конкретные улучшения с примерами кода

Формат ответа (строго JSON):
{
  "score": число от 0 до 100,
  "issues": [
    {
      "type": "error|warning|suggestion",
      "message": "описание проблемы",
      "line": номер строки (если применимо),
      "severity": "high|medium|low"
    }
  ],
  "suggestions": [
    {
      "title": "название рекомендации",
      "description": "подробное описание",
      "code": "пример улучшенного кода (опционально)"
    }
  ],
  "summary": "краткое резюме анализа"
}`

    // Отправляем запрос в GigaChat
    const response = await gigaChatAPI.sendMessage(
      `Проанализируй этот ${language} код:\n\n\`\`\`${language}\n${code}\n\`\`\``,
      [{ role: 'system', content: systemPrompt }]
    )

    // Пытаемся распарсить JSON ответ
    let reviewResult
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
      
      reviewResult = JSON.parse(cleanResponse)
    } catch (parseError) {
      console.error('Failed to parse review result:', parseError)
      console.error('Raw response:', response)
      
      // Fallback - создаем базовую структуру
      reviewResult = {
        score: 70,
        issues: [],
        suggestions: [
          {
            title: 'Общий анализ',
            description: response,
            code: null
          }
        ],
        summary: 'Код проанализирован. Рекомендуется внимательно изучить предложения по улучшению.'
      }
    }

    // Валидируем структуру ответа
    if (!reviewResult.score || !Array.isArray(reviewResult.issues) || !Array.isArray(reviewResult.suggestions)) {
      throw new Error('Invalid review result structure')
    }

    return NextResponse.json({
      success: true,
      ...reviewResult
    })

  } catch (error: any) {
    console.error('Error in code review API:', error)
    return NextResponse.json(
      {
        error: 'Ошибка анализа кода',
        message: 'Произошла ошибка при анализе кода. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}
