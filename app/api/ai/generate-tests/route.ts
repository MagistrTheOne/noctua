import { NextRequest, NextResponse } from 'next/server'
import { gigaChatAPI } from '@/lib/gigachat'

/**
 * API endpoint для генерации тестов через GigaChat
 * Создает unit/integration тесты для предоставленного кода
 */
export async function POST(request: NextRequest) {
  try {
    const { code, language = 'javascript', testFramework = 'jest' } = await request.json()

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: 'Пожалуйста, предоставьте код для генерации тестов'
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

    // Формируем системный промпт для генерации тестов
    const systemPrompt = `Ты эксперт по тестированию кода и созданию качественных тестов.

Твоя задача - создать comprehensive тесты для предоставленного кода.

Правила генерации тестов:
1. Создавай unit тесты для всех функций и методов
2. Покрывай edge cases и boundary conditions
3. Тестируй как успешные, так и неуспешные сценарии
4. Используй подходящий фреймворк для языка ${language}
5. Добавляй моки для внешних зависимостей
6. Создавай интеграционные тесты где необходимо

Формат ответа (строго JSON):
{
  "unitTests": [
    {
      "name": "название теста",
      "description": "описание что тестирует",
      "code": "код теста",
      "testCases": [
        {
          "input": "входные данные",
          "expected": "ожидаемый результат",
          "description": "описание тест-кейса"
        }
      ]
    }
  ],
  "integrationTests": [
    {
      "name": "название интеграционного теста",
      "description": "описание интеграционного теста",
      "code": "код интеграционного теста"
    }
  ],
  "mocks": [
    {
      "name": "название мока",
      "description": "описание мока",
      "code": "код мока"
    }
  ],
  "coverage": "оценка покрытия тестами",
  "recommendations": "рекомендации по улучшению тестов"
}`

    // Отправляем запрос в GigaChat
    const response = await gigaChatAPI.sendMessage(
      `Создай тесты для этого ${language} кода используя ${testFramework}:\n\n\`\`\`${language}\n${code}\n\`\`\``,
      [{ role: 'system', content: systemPrompt }]
    )

    // Пытаемся распарсить JSON ответ
    let testResult
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
      
      testResult = JSON.parse(cleanResponse)
    } catch (parseError) {
      console.error('Failed to parse test result:', parseError)
      console.error('Raw response:', response)
      
      // Fallback - создаем базовую структуру
      testResult = {
        unitTests: [
          {
            name: 'Basic functionality test',
            description: 'Тестирует основную функциональность',
            code: response,
            testCases: []
          }
        ],
        integrationTests: [],
        mocks: [],
        coverage: 'Базовое покрытие тестами',
        recommendations: 'Рекомендуется добавить больше edge cases и boundary conditions'
      }
    }

    // Валидируем структуру ответа
    if (!Array.isArray(testResult.unitTests)) {
      throw new Error('Invalid test result structure')
    }

    return NextResponse.json({
      success: true,
      ...testResult
    })

  } catch (error: any) {
    console.error('Error in test generation API:', error)
    return NextResponse.json(
      {
        error: 'Ошибка генерации тестов',
        message: 'Произошла ошибка при генерации тестов. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}
