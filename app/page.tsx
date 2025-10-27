import { redirect } from 'next/navigation'

// Перенаправляем на страницу с префиксом локали по умолчанию (русский)
// Это нужно для правильной работы next-intl с префиксами
export default function RootPage() {
  redirect('/ru')
}