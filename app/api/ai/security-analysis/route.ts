import { NextRequest, NextResponse } from 'next/server'
import { gigaChatAPI } from '@/lib/gigachat'

/**
 * API endpoint для анализа безопасности кода через GigaChat
 * Ищет уязвимости и проблемы безопасности
 */
export async function POST(request: NextRequest) {
  try {
    const { code, language = 'javascript', securityLevel = 'standard' } = await request.json()

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: 'Пожалуйста, предоставьте код для анализа безопасности'
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

    // Формируем системный промпт для анализа безопасности
    const systemPrompt = `Ты эксперт по безопасности кода и поиску уязвимостей.

Твоя задача - найти проблемы безопасности в предоставленном коде.

Правила анализа безопасности:
1. Ищи SQL injection уязвимости
2. Проверяй на XSS (Cross-Site Scripting)
3. Анализируй аутентификацию и авторизацию
4. Проверяй валидацию входных данных
5. Ищи проблемы с криптографией
6. Анализируй управление сессиями
7. Проверяй CORS и CSP настройки

Формат ответа (строго JSON):
{
  "vulnerabilities": [
    {
      "type": "sql-injection|xss|csrf|auth-bypass|data-exposure|crypto-weak",
      "severity": "critical|high|medium|low",
      "description": "описание уязвимости",
      "line": номер строки,
      "impact": "влияние на безопасность",
      "cve": "CVE номер если известен"
    }
  ],
  "securityIssues": [
    {
      "category": "authentication|authorization|input-validation|crypto|session",
      "description": "описание проблемы",
      "recommendation": "рекомендация по исправлению",
      "priority": "high|medium|low"
    }
  ],
  "fixes": [
    {
      "vulnerability": "название уязвимости",
      "description": "описание исправления",
      "code": "исправленный код",
      "explanation": "объяснение исправления"
    }
  ],
  "securityScore": "оценка безопасности 0-100",
  "summary": "краткое резюме анализа безопасности"
}`

    // Отправляем запрос в GigaChat
    const response = await gigaChatAPI.sendMessage(
      `Проанализируй безопасность этого ${language} кода и найди уязвимости:\n\n\`\`\`${language}\n${code}\n\`\`\``,
      [{ role: 'system', content: systemPrompt }]
    )

    // Пытаемся распарсить JSON ответ
    let securityResult
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
      
      securityResult = JSON.parse(cleanResponse)
    } catch (parseError) {
      console.error('Failed to parse security result:', parseError)
      console.error('Raw response:', response)
      
      // Fallback - создаем базовую структуру
      securityResult = {
        vulnerabilities: [],
        securityIssues: [
          {
            category: 'general',
            description: 'Общий анализ безопасности',
            recommendation: response,
            priority: 'medium'
          }
        ],
        fixes: [],
        securityScore: 70,
        summary: 'Код проанализирован на предмет проблем безопасности'
      }
    }

    // Валидируем структуру ответа
    if (!Array.isArray(securityResult.securityIssues)) {
      throw new Error('Invalid security result structure')
    }

    return NextResponse.json({
      success: true,
      ...securityResult
    })

  } catch (error: any) {
    console.error('Error in security analysis API:', error)
    return NextResponse.json(
      {
        error: 'Ошибка анализа безопасности',
        message: 'Произошла ошибка при анализе безопасности. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}
