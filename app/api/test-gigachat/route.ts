import { NextRequest, NextResponse } from 'next/server'
import { gigaChatAPI } from '@/lib/gigachat'

/**
 * Тестовый endpoint для проверки GigaChat API
 */
export async function GET(request: NextRequest) {
  try {
    console.log('Testing GigaChat API...')
    
    // Проверяем получение токена
    console.log('1. Testing OAuth token...')
    const models = await gigaChatAPI.getModels()
    console.log('Models response:', models)
    
    return NextResponse.json({
      success: true,
      message: 'GigaChat API is working!',
      models: models
    })
    
  } catch (error) {
    console.error('GigaChat test error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body
    
    console.log('Testing GigaChat message:', message)
    
    const response = await gigaChatAPI.sendMessage(message || 'Привет! Как дела?')
    
    return NextResponse.json({
      success: true,
      message: 'GigaChat message sent successfully!',
      response: response
    })
    
  } catch (error) {
    console.error('GigaChat message test error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 })
  }
}
