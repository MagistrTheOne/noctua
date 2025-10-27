import { NextRequest, NextResponse } from 'next/server'

/**
 * Простой тест доступности GigaChat API
 */
export async function GET(request: NextRequest) {
  const results = {
    dns: false,
    https: false,
    oauth: false,
    errors: [] as string[]
  }

  try {
    // Тест 1: Проверка DNS резолюции
    console.log('1. Testing DNS resolution...')
    try {
      const dnsTest = await fetch('https://gigachat.devices.sberbank.ru', {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      })
      results.dns = true
      console.log('✅ DNS resolution successful')
    } catch (error) {
      results.errors.push(`DNS error: ${error}`)
      console.log('❌ DNS resolution failed:', error)
    }

    // Тест 2: Проверка HTTPS соединения
    console.log('2. Testing HTTPS connection...')
    try {
      const httpsTest = await fetch('https://gigachat.devices.sberbank.ru/api/v1/models', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        signal: AbortSignal.timeout(5000)
      })
      results.https = true
      console.log('✅ HTTPS connection successful, status:', httpsTest.status)
    } catch (error) {
      results.errors.push(`HTTPS error: ${error}`)
      console.log('❌ HTTPS connection failed:', error)
    }

    // Тест 3: Проверка OAuth endpoint
    console.log('3. Testing OAuth endpoint...')
    try {
      const oauthTest = await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'RqUID': crypto.randomUUID(),
          'Authorization': 'Basic test-key'
        },
        body: new URLSearchParams({
          scope: 'GIGACHAT_API_PERS'
        }),
        signal: AbortSignal.timeout(5000)
      })
      results.oauth = true
      console.log('✅ OAuth endpoint accessible, status:', oauthTest.status)
    } catch (error) {
      results.errors.push(`OAuth error: ${error}`)
      console.log('❌ OAuth endpoint failed:', error)
    }

    return NextResponse.json({
      success: true,
      message: 'Network connectivity test completed',
      results,
      recommendations: [
        results.dns ? '✅ DNS resolution works' : '❌ Check internet connection',
        results.https ? '✅ HTTPS connection works' : '❌ Check SSL/TLS configuration',
        results.oauth ? '✅ OAuth endpoint accessible' : '❌ Check firewall/proxy settings',
        results.errors.length === 0 ? '✅ All tests passed' : '❌ Some tests failed - check logs'
      ]
    })

  } catch (error) {
    console.error('Network test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      results,
      details: error
    }, { status: 500 })
  }
}
