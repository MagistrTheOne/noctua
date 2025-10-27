import { NextRequest, NextResponse } from 'next/server'
import { rateLimiter, getClientIP, DEMO_RATE_LIMITS } from '@/lib/rate-limiter'
import { gigaChatAPI } from '@/lib/gigachat'
import { findMatchingTemplate, templateToProject } from '@/lib/project-templates'

/**
 * Демо API для генерации проектов без авторизации
 * Использует заготовленные шаблоны + GigaChat как fallback
 */
export async function POST(request: NextRequest) {
  try {
    // Получаем IP адрес клиента
    const clientIP = getClientIP(request)
    
    // Проверяем rate limit
    const rateLimitCheck = rateLimiter.checkLimit(
      clientIP,
      DEMO_RATE_LIMITS.GENERATIONS_PER_HOUR,
      DEMO_RATE_LIMITS.WINDOW_MS
    )

    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Превышен лимит запросов',
          message: `Вы можете сделать ${DEMO_RATE_LIMITS.GENERATIONS_PER_HOUR} запросов в час. Зарегистрируйтесь для большего.`,
          resetAt: rateLimitCheck.resetAt,
          retryAfter: rateLimitCheck.retryAfter,
          remaining: rateLimitCheck.remaining
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitCheck.retryAfter?.toString() || '3600',
            'X-RateLimit-Limit': DEMO_RATE_LIMITS.GENERATIONS_PER_HOUR.toString(),
            'X-RateLimit-Remaining': rateLimitCheck.remaining.toString(),
            'X-RateLimit-Reset': rateLimitCheck.resetAt.toString()
          }
        }
      )
    }

    // Получаем данные из запроса
    const body = await request.json()
    const { prompt } = body

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: 'Пожалуйста, предоставьте описание проекта'
        },
        { status: 400 }
      )
    }

    if (prompt.length > 1000) {
      return NextResponse.json(
        {
          error: 'Слишком длинный промпт',
          message: 'Описание проекта не должно превышать 1000 символов'
        },
        { status: 400 }
      )
    }

    // Сначала пытаемся найти подходящий шаблон
    const matchingTemplate = findMatchingTemplate(prompt)
    
    if (matchingTemplate) {
      // Используем заготовленный шаблон
      const project = templateToProject(matchingTemplate, prompt)
      
      return NextResponse.json({
        ...project,
        rateLimitInfo: {
          remaining: rateLimitCheck.remaining,
          resetAt: rateLimitCheck.resetAt,
          limit: DEMO_RATE_LIMITS.GENERATIONS_PER_HOUR
        },
        source: 'template' // Указываем что использовался шаблон
      }, {
        headers: {
          'X-RateLimit-Limit': DEMO_RATE_LIMITS.GENERATIONS_PER_HOUR.toString(),
          'X-RateLimit-Remaining': rateLimitCheck.remaining.toString(),
          'X-RateLimit-Reset': rateLimitCheck.resetAt.toString()
        }
      })
    }

    // Если шаблон не найден, используем GigaChat как fallback
    try {
      const project = await gigaChatAPI.generateProject(prompt)
      
      // Ограничиваем проект для демо версии
      const limitedProject = {
        ...project,
        files: project.files.slice(0, 5), // Максимум 5 файлов в демо
        demo: true,
        message: 'Зарегистрируйтесь для полного доступа ко всем файлам',
        rateLimitInfo: {
          remaining: rateLimitCheck.remaining,
          resetAt: rateLimitCheck.resetAt,
          limit: DEMO_RATE_LIMITS.GENERATIONS_PER_HOUR
        },
        source: 'gigachat' // Указываем что использовался GigaChat
      }

      return NextResponse.json(limitedProject, {
        headers: {
          'X-RateLimit-Limit': DEMO_RATE_LIMITS.GENERATIONS_PER_HOUR.toString(),
          'X-RateLimit-Remaining': rateLimitCheck.remaining.toString(),
          'X-RateLimit-Reset': rateLimitCheck.resetAt.toString()
        }
      })
    } catch (gigaChatError) {
      console.error('GigaChat error:', gigaChatError)
      
      // Если GigaChat недоступен, возвращаем базовый шаблон
      const fallbackTemplate = findMatchingTemplate('todo app') || findMatchingTemplate('задачи')
      if (fallbackTemplate) {
        const project = templateToProject(fallbackTemplate, prompt)
        
        return NextResponse.json({
          ...project,
          message: 'GigaChat временно недоступен. Показан пример проекта.',
          rateLimitInfo: {
            remaining: rateLimitCheck.remaining,
            resetAt: rateLimitCheck.resetAt,
            limit: DEMO_RATE_LIMITS.GENERATIONS_PER_HOUR
          },
          source: 'fallback'
        }, {
          headers: {
            'X-RateLimit-Limit': DEMO_RATE_LIMITS.GENERATIONS_PER_HOUR.toString(),
            'X-RateLimit-Remaining': rateLimitCheck.remaining.toString(),
            'X-RateLimit-Reset': rateLimitCheck.resetAt.toString()
          }
        })
      }
      
      throw gigaChatError
    }

  } catch (error) {
    console.error('Demo API error:', error)
    
    return NextResponse.json(
      {
        error: 'Ошибка генерации проекта',
        message: 'Произошла ошибка при генерации проекта. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}

/**
 * GET метод для получения информации о rate limit
 */
export async function GET(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)
    const limitInfo = rateLimiter.getLimitInfo(
      clientIP,
      DEMO_RATE_LIMITS.GENERATIONS_PER_HOUR,
      DEMO_RATE_LIMITS.WINDOW_MS
    )

    return NextResponse.json({
      ip: clientIP,
      limit: limitInfo.limit,
      remaining: limitInfo.remaining,
      resetAt: limitInfo.resetAt,
      windowMs: DEMO_RATE_LIMITS.WINDOW_MS
    })

  } catch (error) {
    console.error('Rate limit info error:', error)
    
    return NextResponse.json(
      {
        error: 'Ошибка получения информации о лимитах'
      },
      { status: 500 }
    )
  }
}
