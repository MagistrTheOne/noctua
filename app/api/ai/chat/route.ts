import { NextRequest, NextResponse } from 'next/server'
import { gigaChatAPI } from '@/lib/gigachat'

/**
 * API endpoint для чата с GigaChat
 * Поддерживает контекстную беседу и различные типы запросов
 */
export async function POST(request: NextRequest) {
  try {
    const { message, conversation = [] } = await request.json()

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: 'Пожалуйста, предоставьте сообщение для обработки'
        },
        { status: 400 }
      )
    }

    if (message.length > 2000) {
      return NextResponse.json(
        {
          error: 'Слишком длинное сообщение',
          message: 'Сообщение не должно превышать 2000 символов'
        },
        { status: 400 }
      )
    }

    // Определяем тип запроса и формируем системный промпт
    let systemPrompt = `Ты Noctu - эксперт по разработке ПО и AI помощник для Nocturide.

Твоя роль:
- Помогать с разработкой и генерацией кода
- Объяснять технологии и архитектурные решения
- Помогать с отладкой и решением проблем
- Создавать технические задания
- Проводить ревью кода
- Генерировать проекты и компоненты

Правила ответа:
1. Отвечай на русском языке
2. Будь конкретным и практичным
3. Предлагай готовые решения с кодом
4. Если просят создать проект - генерируй полную структуру
5. Используй современные технологии (React, Next.js, TypeScript, Tailwind CSS)
6. Объясняй сложные концепции простым языком

Контекст: Пользователь работает в среде разработки Nocturide с AI-генерацией кода.`

    // Проверяем, не просит ли пользователь создать проект
    const isProjectRequest = /создай|построй|сделай|генерируй|разработай|построй.*проект|создай.*приложение|сделай.*сайт/i.test(message)

    if (isProjectRequest) {
      systemPrompt += `\n\nВАЖНО: Если пользователь просит создать проект, приложение или сайт, ответь в формате JSON с полной структурой проекта:

{
  "type": "project",
  "response": "Описание проекта и инструкции",
  "project": {
    "name": "Название проекта",
    "description": "Описание проекта",
    "files": [
      {
        "name": "package.json",
        "content": "содержимое файла"
      }
    ],
    "techStack": ["React", "TypeScript", "Tailwind CSS"]
  }
}`
    }

    // Формируем сообщения для GigaChat
    const messages = [
      {
        role: 'system',
        content: systemPrompt
      },
      ...conversation.slice(-10), // Последние 10 сообщений для контекста
      {
        role: 'user',
        content: message
      }
    ]

    // Отправляем запрос в GigaChat
    const response = await gigaChatAPI.sendMessage(message, conversation)

    // Пытаемся распарсить JSON ответ (если это проект)
    let parsedResponse
    try {
      parsedResponse = JSON.parse(response)
    } catch {
      // Если не JSON, возвращаем как обычный текст
      parsedResponse = {
        type: 'text',
        response: response
      }
    }

    // Если это проект, возвращаем его структуру
    if (parsedResponse.type === 'project' && parsedResponse.project) {
      return NextResponse.json({
        success: true,
        type: 'project',
        response: parsedResponse.response,
        project: parsedResponse.project
      })
    }

    // Обычный текстовый ответ
    return NextResponse.json({
      success: true,
      type: 'text',
      response: response
    })

  } catch (error: any) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      {
        error: 'Ошибка обработки сообщения',
        message: 'Произошла ошибка при обработке вашего запроса. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}
