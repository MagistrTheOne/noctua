/**
 * In-memory rate limiter для демо API
 * Ограничивает количество запросов по IP адресу
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>()
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Очистка устаревших записей каждые 5 минут
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 5 * 60 * 1000)
  }

  /**
   * Проверяет лимит для IP адреса
   * @param ip - IP адрес клиента
   * @param limit - Максимальное количество запросов
   * @param windowMs - Окно времени в миллисекундах
   * @returns Объект с информацией о лимите
   */
  checkLimit(ip: string, limit: number = 3, windowMs: number = 60 * 60 * 1000): {
    allowed: boolean
    remaining: number
    resetAt: number
    retryAfter?: number
  } {
    const now = Date.now()
    const entry = this.store.get(ip)

    if (!entry || now > entry.resetTime) {
      // Создаем новую запись или сбрасываем устаревшую
      const resetTime = now + windowMs
      this.store.set(ip, {
        count: 1,
        resetTime
      })

      return {
        allowed: true,
        remaining: limit - 1,
        resetAt: resetTime
      }
    }

    if (entry.count >= limit) {
      // Лимит превышен
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000)
      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.resetTime,
        retryAfter
      }
    }

    // Увеличиваем счетчик
    entry.count++
    this.store.set(ip, entry)

    return {
      allowed: true,
      remaining: limit - entry.count,
      resetAt: entry.resetTime
    }
  }

  /**
   * Получает информацию о текущем лимите для IP
   */
  getLimitInfo(ip: string, limit: number = 3, windowMs: number = 60 * 60 * 1000) {
    const now = Date.now()
    const entry = this.store.get(ip)

    if (!entry || now > entry.resetTime) {
      return {
        count: 0,
        limit,
        resetAt: now + windowMs,
        remaining: limit
      }
    }

    return {
      count: entry.count,
      limit,
      resetAt: entry.resetTime,
      remaining: Math.max(0, limit - entry.count)
    }
  }

  /**
   * Сбрасывает лимит для IP адреса
   */
  resetLimit(ip: string) {
    this.store.delete(ip)
  }

  /**
   * Очищает устаревшие записи
   */
  private cleanup() {
    const now = Date.now()
    for (const [ip, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(ip)
      }
    }
  }

  /**
   * Получает статистику по всем IP
   */
  getStats() {
    const now = Date.now()
    const stats = {
      totalIPs: this.store.size,
      activeIPs: 0,
      expiredIPs: 0
    }

    for (const entry of this.store.values()) {
      if (now > entry.resetTime) {
        stats.expiredIPs++
      } else {
        stats.activeIPs++
      }
    }

    return stats
  }

  /**
   * Очищает все записи
   */
  clear() {
    this.store.clear()
  }

  /**
   * Уничтожает rate limiter и очищает интервалы
   */
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
    this.store.clear()
  }
}

// Создаем глобальный экземпляр rate limiter
export const rateLimiter = new RateLimiter()

// Экспортируем класс для тестирования
export { RateLimiter }

// Утилиты для работы с IP адресами
export function getClientIP(request: Request): string {
  // Пробуем получить IP из заголовков прокси
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }

  // Fallback для разработки
  return '127.0.0.1'
}

// Константы для демо API
export const DEMO_RATE_LIMITS = {
  GENERATIONS_PER_HOUR: 3,
  WINDOW_MS: 60 * 60 * 1000, // 1 час
} as const
