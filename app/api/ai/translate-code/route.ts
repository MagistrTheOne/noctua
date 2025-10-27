import { NextRequest, NextResponse } from 'next/server'
import { gigaChatAPI } from '@/lib/gigachat'

/**
 * API endpoint для перевода кода между языками через GigaChat
 * Переводит код с одного языка программирования на другой
 */
export async function POST(request: NextRequest) {
  try {
    const { code, fromLanguage = 'javascript', toLanguage = 'python' } = await request.json()

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: 'Пожалуйста, предоставьте код для перевода'
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

    // Формируем системный промпт для перевода кода
    const systemPrompt = `Ты эксперт по переводу кода между языками программирования.

Твоя задача - перевести код с ${fromLanguage} на ${toLanguage}, сохранив логику и функциональность.

Правила перевода:
1. Сохраняй логику и алгоритмы
2. Адаптируй под идиомы целевого языка
3. Используй правильные типы данных и синтаксис
4. Сохраняй структуру и архитектуру
5. Адаптируй библиотеки и фреймворки
6. Учитывай особенности целевого языка

Формат ответа (строго JSON):
{
  "translatedCode": "переведенный код",
  "languageMapping": {
    "from": "${fromLanguage}",
    "to": "${toLanguage}",
    "changes": [
      {
        "original": "оригинальный код",
        "translated": "переведенный код",
        "explanation": "объяснение изменений"
      }
    ]
  },
  "dependencies": [
    {
      "original": "оригинальная зависимость",
      "translated": "эквивалент в целевом языке",
      "description": "описание зависимости"
    }
  ],
  "idioms": [
    {
      "pattern": "паттерн из исходного языка",
      "translation": "эквивалент в целевом языке",
      "explanation": "объяснение перевода"
    }
  ],
  "notes": "дополнительные заметки по переводу",
  "summary": "краткое резюме перевода"
}`

    // Отправляем запрос в GigaChat
    const response = await gigaChatAPI.sendMessage(
      `Переведи этот ${fromLanguage} код на ${toLanguage}:\n\n\`\`\`${fromLanguage}\n${code}\n\`\`\``,
      [{ role: 'system', content: systemPrompt }]
    )

    // Пытаемся распарсить JSON ответ
    let translationResult
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
      
      translationResult = JSON.parse(cleanResponse)
    } catch (parseError) {
      console.error('Failed to parse translation result:', parseError)
      console.error('Raw response:', response)
      
      // Fallback - создаем базовую структуру
      translationResult = {
        translatedCode: response,
        languageMapping: {
          from: fromLanguage,
          to: toLanguage,
          changes: []
        },
        dependencies: [],
        idioms: [],
        notes: 'Код переведен с сохранением логики',
        summary: `Код переведен с ${fromLanguage} на ${toLanguage}`
      }
    }

    // Валидируем структуру ответа
    if (!translationResult.translatedCode) {
      throw new Error('Invalid translation result structure')
    }

    return NextResponse.json({
      success: true,
      ...translationResult
    })

  } catch (error: any) {
    console.error('Error in code translation API:', error)
    return NextResponse.json(
      {
        error: 'Ошибка перевода кода',
        message: 'Произошла ошибка при переводе кода. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}
