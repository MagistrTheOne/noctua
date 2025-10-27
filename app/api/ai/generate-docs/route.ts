import { NextRequest, NextResponse } from 'next/server'
import { gigaChatAPI } from '@/lib/gigachat'

/**
 * API endpoint для генерации документации через GigaChat
 * Создает JSDoc, README и API документацию
 */
export async function POST(request: NextRequest) {
  try {
    const { code, language = 'javascript', docType = 'jsdoc' } = await request.json()

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: 'Пожалуйста, предоставьте код для генерации документации'
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

    // Формируем системный промпт для генерации документации
    const systemPrompt = `Ты эксперт по созданию технической документации для кода.

Твоя задача - создать comprehensive документацию для предоставленного кода.

Правила создания документации:
1. Создавай JSDoc комментарии для всех функций и классов
2. Описывай параметры, возвращаемые значения и исключения
3. Добавляй примеры использования
4. Создавай README с описанием проекта
5. Генерируй API документацию где применимо
6. Используй правильный формат для языка ${language}

Формат ответа (строго JSON):
{
  "documentedCode": "код с добавленной документацией",
  "jsdocComments": [
    {
      "function": "название функции",
      "description": "описание функции",
      "parameters": [
        {
          "name": "имя параметра",
          "type": "тип параметра",
          "description": "описание параметра"
        }
      ],
      "returns": "описание возвращаемого значения",
      "example": "пример использования"
    }
  ],
  "readme": {
    "title": "название проекта",
    "description": "описание проекта",
    "installation": "инструкции по установке",
    "usage": "примеры использования",
    "api": "описание API"
  },
  "apiDocs": [
    {
      "endpoint": "API endpoint",
      "method": "HTTP метод",
      "description": "описание endpoint",
      "parameters": "параметры запроса",
      "response": "формат ответа"
    }
  ],
  "summary": "краткое резюме документации"
}`

    // Отправляем запрос в GigaChat
    const response = await gigaChatAPI.sendMessage(
      `Создай документацию для этого ${language} кода:\n\n\`\`\`${language}\n${code}\n\`\`\``,
      [{ role: 'system', content: systemPrompt }]
    )

    // Пытаемся распарсить JSON ответ
    let docResult
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
      
      docResult = JSON.parse(cleanResponse)
    } catch (parseError) {
      console.error('Failed to parse documentation result:', parseError)
      console.error('Raw response:', response)
      
      // Fallback - создаем базовую структуру
      docResult = {
        documentedCode: response,
        jsdocComments: [],
        readme: {
          title: 'Project Documentation',
          description: 'Документация для проекта',
          installation: 'Инструкции по установке',
          usage: 'Примеры использования',
          api: 'Описание API'
        },
        apiDocs: [],
        summary: 'Документация сгенерирована для кода'
      }
    }

    // Валидируем структуру ответа
    if (!docResult.documentedCode) {
      throw new Error('Invalid documentation result structure')
    }

    return NextResponse.json({
      success: true,
      ...docResult
    })

  } catch (error: any) {
    console.error('Error in documentation generation API:', error)
    return NextResponse.json(
      {
        error: 'Ошибка генерации документации',
        message: 'Произошла ошибка при генерации документации. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}
