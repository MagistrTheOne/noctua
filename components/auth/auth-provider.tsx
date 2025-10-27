'use client'

import { SessionProvider } from 'next-auth/react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Для статической генерации отключаем SessionProvider
  if (typeof window === 'undefined') {
    return <>{children}</>
  }

  return <SessionProvider>{children}</SessionProvider>
}
