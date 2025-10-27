import { NextRequest, NextResponse } from 'next/server'
import { rateLimiter, getClientIP } from '@/lib/rate-limiter'

/**
 * DEV ONLY: Сброс rate limit для тестирования
 * Работает только в development режиме
 */
export async function POST(request: NextRequest) {
  // Проверяем что мы в development режиме
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Доступно только в development режиме' },
      { status: 403 }
    )
  }

  try {
    const clientIP = getClientIP(request)
    
    // Сбрасываем лимит для IP
    rateLimiter.resetLimit(clientIP)
    
    return NextResponse.json({
      success: true,
      message: `Rate limit сброшен для IP: ${clientIP}`,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error resetting rate limit:', error)
    return NextResponse.json(
      { error: 'Ошибка сброса rate limit' },
      { status: 500 }
    )
  }
}

/**
 * GET: Получить информацию о rate limit
 */
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Доступно только в development режиме' },
      { status: 403 }
    )
  }

  try {
    const clientIP = getClientIP(request)
    const stats = rateLimiter.getStats()
    
    return NextResponse.json({
      clientIP,
      stats,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error getting rate limit info:', error)
    return NextResponse.json(
      { error: 'Ошибка получения информации о rate limit' },
      { status: 500 }
    )
  }
}
