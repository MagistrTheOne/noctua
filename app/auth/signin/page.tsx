import { auth } from '@/lib/auth'
import { SignInForm } from '@/components/auth/signin-form'

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: {
      cookie: '',
    },
  })

  if (session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Already signed in</h1>
          <p className="text-muted-foreground">Redirecting to workspace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to your Nocturide account
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}
