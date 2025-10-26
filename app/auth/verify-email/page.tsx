import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-react'
import Link from 'next/link'

export default async function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <Mail className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-4">Check your email</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            We've sent you a verification link to complete your account setup
          </p>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle>What's next?</CardTitle>
            <CardDescription>
              Click the verification link in your email to activate your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
              <p>• Check your spam folder if you don't see the email</p>
              <p>• The link will expire in 24 hours</p>
              <p>• Make sure to use the same email you signed up with</p>
            </div>

            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/auth/signin">
                  Back to sign in
                </Link>
              </Button>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/auth/signup">
                  Create another account
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
