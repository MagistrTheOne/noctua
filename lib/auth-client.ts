import { createAuthClient } from 'better-auth/client'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  // Добавляем правильную конфигурацию для Better Auth
  fetchOptions: {
    credentials: 'include',
  },
})
