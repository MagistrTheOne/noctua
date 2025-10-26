import { SignUpForm } from '@/components/auth/signup-form'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/workspace')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Create your account</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Start building amazing projects with AI
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}
