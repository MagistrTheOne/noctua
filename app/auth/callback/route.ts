import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const callbackUrl = searchParams.get('callbackUrl') || '/workspace'

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin?error=Invalid token', request.url))
  }

  try {
    const session = await auth.api.verifyEmail({
      body: {
        token,
      },
    })

    if (session) {
      return NextResponse.redirect(new URL(callbackUrl, request.url))
    } else {
      return NextResponse.redirect(new URL('/auth/signin?error=Verification failed', request.url))
    }
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.redirect(new URL('/auth/signin?error=Verification failed', request.url))
  }
}
