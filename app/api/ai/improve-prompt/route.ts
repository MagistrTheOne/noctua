import { NextRequest, NextResponse } from 'next/server'
import { gigaChatAPI } from '@/lib/gigachat'

/**
 * API endpoint для улучшения промпта пользователя
 */
export async function POST(request: NextRequest) {
  try {
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        {
          error: 'Неверный формат JSON',
          message: 'Пожалуйста, проверьте формат запроса'
        },
        { status: 400 }
      )
    }
    
    const { prompt } = body

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: 'Пожалуйста, предоставьте промпт для улучшения'
        },
        { status: 400 }
      )
    }

    if (prompt.length > 1000) {
      return NextResponse.json(
        {
          error: 'Слишком длинный промпт',
          message: 'Промпт не должен превышать 1000 символов'
        },
        { status: 400 }
      )
    }

    // Используем GigaChat для улучшения промпта
    const improvedPrompt = await gigaChatAPI.improvePrompt(prompt)

    return NextResponse.json({
      success: true,
      originalPrompt: prompt,
      improvedPrompt: improvedPrompt
    })

  } catch (error: any) {
    console.error('Error improving prompt:', error)
    return NextResponse.json(
      {
        error: 'Ошибка улучшения промпта',
        message: 'Произошла ошибка при обработке запроса. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}
