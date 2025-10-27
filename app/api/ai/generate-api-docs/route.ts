import { NextRequest, NextResponse } from 'next/server'
import { gigaChatAPI } from '@/lib/gigachat'

/**
 * API endpoint для генерации API документации через GigaChat
 * Создает OpenAPI/Swagger спецификации и Postman коллекции
 */
export async function POST(request: NextRequest) {
  try {
    const { code, language = 'javascript', apiType = 'rest' } = await request.json()

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: 'Пожалуйста, предоставьте код для генерации API документации'
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

    // Формируем системный промпт для генерации API документации
    const systemPrompt = `Ты эксперт по созданию API документации и спецификаций.

Твоя задача - создать comprehensive API документацию для предоставленного кода.

Правила создания API документации:
1. Создавай OpenAPI/Swagger спецификации
2. Описывай все endpoints, методы, параметры
3. Создавай примеры запросов и ответов
4. Генерируй Postman коллекции
5. Описывай схемы данных и модели
6. Добавляй коды ошибок и их описания

Формат ответа (строго JSON):
{
  "openApiSpec": {
    "openapi": "3.0.0",
    "info": {
      "title": "название API",
      "version": "версия",
      "description": "описание API"
    },
    "paths": {
      "endpoint": {
        "method": {
          "summary": "краткое описание",
          "description": "подробное описание",
          "parameters": [
            {
              "name": "имя параметра",
              "in": "query|path|header",
              "required": true,
              "schema": {
                "type": "тип данных"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "успешный ответ",
              "content": {
                "application/json": {
                  "schema": "схема ответа"
                }
              }
            }
          }
        }
      }
    }
  },
  "postmanCollection": {
    "info": {
      "name": "название коллекции",
      "description": "описание коллекции"
    },
    "item": [
      {
        "name": "название запроса",
        "request": {
          "method": "HTTP метод",
          "url": "URL запроса",
          "header": "заголовки",
          "body": "тело запроса"
        }
      }
    ]
  },
  "examples": [
    {
      "endpoint": "API endpoint",
      "method": "HTTP метод",
      "request": "пример запроса",
      "response": "пример ответа",
      "description": "описание примера"
    }
  ],
  "dataModels": [
    {
      "name": "название модели",
      "description": "описание модели",
      "properties": [
        {
          "name": "название свойства",
          "type": "тип данных",
          "description": "описание свойства"
        }
      ]
    }
  ],
  "summary": "краткое резюме API документации"
}`

    // Отправляем запрос в GigaChat
    const response = await gigaChatAPI.sendMessage(
      `Создай API документацию для этого ${language} кода:\n\n\`\`\`${language}\n${code}\n\`\`\``,
      [{ role: 'system', content: systemPrompt }]
    )

    // Пытаемся распарсить JSON ответ
    let apiDocResult
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
      
      apiDocResult = JSON.parse(cleanResponse)
    } catch (parseError) {
      console.error('Failed to parse API documentation result:', parseError)
      console.error('Raw response:', response)
      
      // Fallback - создаем базовую структуру
      apiDocResult = {
        openApiSpec: {
          openapi: '3.0.0',
          info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API документация'
          },
          paths: {}
        },
        postmanCollection: {
          info: {
            name: 'API Collection',
            description: 'Коллекция API запросов'
          },
          item: []
        },
        examples: [],
        dataModels: [],
        summary: 'API документация сгенерирована'
      }
    }

    // Валидируем структуру ответа
    if (!apiDocResult.openApiSpec) {
      throw new Error('Invalid API documentation result structure')
    }

    return NextResponse.json({
      success: true,
      ...apiDocResult
    })

  } catch (error: any) {
    console.error('Error in API documentation generation API:', error)
    return NextResponse.json(
      {
        error: 'Ошибка генерации API документации',
        message: 'Произошла ошибка при генерации API документации. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}
