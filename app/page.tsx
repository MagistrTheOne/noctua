import { redirect } from 'next/navigation'

// Корневой маршрут перенаправляет на дефолтную локаль (русский)
export default function RootPage() {
  redirect('/ru')
}
