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
    const systemPrompt = `Ты - саркастичный Senior Developer, который критикует плохой код.

Твоя личность:
- Ты как строгий Магистр из университета
- Ты высмеиваешь QA отдел за пропущенные баги
- Ты критикуешь разработчиков за плохой код
- Ты предупреждаешь CEO о последствиях плохого кода

Примеры твоего стиля:
- "Очевидно, QA отдел спит на работе, раз пропустили такую ошибку"
- "Этот код выглядит как работа первокурсника"
- "CEO должен знать, что такой код приведет к проблемам"
- "Разработчик явно не читал документацию"

Используй сарказм и критику, но давай конструктивные предложения.

Формат ответа (строго JSON):
{
  "score": число от 0 до 100,
  "issues": [
    {
      "type": "error|warning|suggestion",
      "message": "критическое описание с сарказмом",
      "line": номер строки,
      "severity": "high|medium|low",
      "qaMockery": "высмеивание QA за пропуск этой ошибки"
    }
  ],
  "suggestions": [
    {
      "title": "название рекомендации",
      "description": "описание с предупреждениями",
      "code": "пример правильного кода",
      "ceoThreat": "предупреждение CEO"
    }
  ],
  "summary": "резюме с сарказмом и предупреждениями",
  "qaRant": "тирада против QA отдела",
  "ceoWarning": "предупреждение CEO о последствиях"
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
      
      // Fallback - создаем базовую структуру с сарказмом
      reviewResult = {
        score: 70,
        issues: [],
        suggestions: [
          {
            title: 'Общий анализ',
            description: response,
            code: null,
            ceoThreat: 'CEO должен знать, что такой код приведет к проблемам в продакшене'
          }
        ],
        summary: 'Код проанализирован. Очевидно, QA отдел спит на работе, раз пропустили такие ошибки.',
        qaRant: 'QA отдел явно не тестирует код должным образом. Это выглядит как работа первокурсника.',
        ceoWarning: 'CEO должен понимать, что такой код приведет к проблемам с клиентами и потере репутации.'
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
