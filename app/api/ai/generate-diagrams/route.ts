import { NextRequest, NextResponse } from 'next/server'
import { gigaChatAPI } from '@/lib/gigachat'

/**
 * API endpoint для генерации диаграмм архитектуры через GigaChat
 * Создает UML диаграммы и схемы архитектуры
 */
export async function POST(request: NextRequest) {
  try {
    const { code, language = 'javascript', diagramType = 'class' } = await request.json()

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: 'Пожалуйста, предоставьте код для генерации диаграмм'
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

    // Формируем системный промпт для генерации диаграмм
    const systemPrompt = `Ты эксперт по созданию диаграмм архитектуры и UML диаграмм.

Твоя задача - создать диаграммы архитектуры для предоставленного кода.

Правила создания диаграмм:
1. Создавай UML диаграммы классов, последовательности, компонентов
2. Используй Mermaid синтаксис для диаграмм
3. Показывай связи между компонентами
4. Визуализируй архитектуру системы
5. Создавай диаграммы базы данных где применимо
6. Показывай потоки данных и взаимодействия

Формат ответа (строго JSON):
{
  "diagrams": [
    {
      "type": "class|sequence|component|database|flowchart",
      "title": "название диаграммы",
      "description": "описание диаграммы",
      "mermaid": "Mermaid код диаграммы",
      "elements": [
        {
          "name": "название элемента",
          "type": "класс|функция|модуль|таблица",
          "description": "описание элемента"
        }
      ]
    }
  ],
  "architecture": {
    "pattern": "MVC|MVP|MVVM|Microservices|Monolith",
    "description": "описание архитектурного паттерна",
    "components": [
      {
        "name": "название компонента",
        "responsibility": "ответственность компонента",
        "dependencies": "зависимости"
      }
    ]
  },
  "databaseSchema": {
    "tables": [
      {
        "name": "название таблицы",
        "columns": [
          {
            "name": "название колонки",
            "type": "тип данных",
            "constraints": "ограничения"
          }
        ],
        "relationships": "связи с другими таблицами"
      }
    ]
  },
  "summary": "краткое резюме архитектуры"
}`

    // Отправляем запрос в GigaChat
    const response = await gigaChatAPI.sendMessage(
      `Создай диаграммы архитектуры для этого ${language} кода:\n\n\`\`\`${language}\n${code}\n\`\`\``,
      [{ role: 'system', content: systemPrompt }]
    )

    // Пытаемся распарсить JSON ответ
    let diagramResult
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
      
      diagramResult = JSON.parse(cleanResponse)
    } catch (parseError) {
      console.error('Failed to parse diagram result:', parseError)
      console.error('Raw response:', response)
      
      // Fallback - создаем базовую структуру
      diagramResult = {
        diagrams: [
          {
            type: 'class',
            title: 'Class Diagram',
            description: 'Диаграмма классов',
            mermaid: 'graph TD\n    A[Code] --> B[Analysis]\n    B --> C[Diagram]',
            elements: []
          }
        ],
        architecture: {
          pattern: 'General',
          description: 'Общая архитектура',
          components: []
        },
        databaseSchema: {
          tables: []
        },
        summary: 'Диаграммы архитектуры сгенерированы'
      }
    }

    // Валидируем структуру ответа
    if (!Array.isArray(diagramResult.diagrams)) {
      throw new Error('Invalid diagram result structure')
    }

    return NextResponse.json({
      success: true,
      ...diagramResult
    })

  } catch (error: any) {
    console.error('Error in diagram generation API:', error)
    return NextResponse.json(
      {
        error: 'Ошибка генерации диаграмм',
        message: 'Произошла ошибка при генерации диаграмм. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}
