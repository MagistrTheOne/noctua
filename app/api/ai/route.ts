import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { gigaChatAPI } from '@/lib/gigachat'

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { message, type, code, language, context } = body

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    let response: string

    switch (type) {
      case 'explain':
        if (!code || !language) {
          return NextResponse.json({ error: 'Code and language are required for explanation' }, { status: 400 })
        }
        response = await gigaChatAPI.explainCode(code, language)
        break

      case 'refactor':
        if (!code || !language) {
          return NextResponse.json({ error: 'Code and language are required for refactoring' }, { status: 400 })
        }
        response = await gigaChatAPI.refactorCode(code, language, body.instructions)
        break

      case 'generate':
        if (!language) {
          return NextResponse.json({ error: 'Language is required for code generation' }, { status: 400 })
        }
        response = await gigaChatAPI.generateCode(message, language)
        break

      case 'fix':
        if (!code || !language) {
          return NextResponse.json({ error: 'Code and language are required for fixing' }, { status: 400 })
        }
        response = await gigaChatAPI.fixCode(code, language, body.error)
        break

      default:
        response = await gigaChatAPI.sendMessage(message, context)
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('AI API error:', error)
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    )
  }
}
