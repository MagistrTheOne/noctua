'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCreateProject = async () => {
    if (!prompt.trim()) {
      toast.error('Please describe your project')
      return
    }

    setIsLoading(true)

    try {
      // Generate project with AI
      const response = await fetch('/api/ai/generate-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        toast.success('Project generated successfully!')
        router.push(`/workspace/${result.projectId}`)
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to generate project')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-white">
          What will you build today?
        </h1>
        <p className="text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          Create stunning apps and websites by describing what you want to build.
          Our AI will generate the code, structure, and everything you need.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <Card className="glass border-zinc-800">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Textarea
                  placeholder="Create a todo app with React, TypeScript, and Tailwind CSS..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] resize-none bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 text-lg leading-relaxed"
                  disabled={isLoading}
                />

                <div className="flex justify-end">
                  <Button
                    onClick={handleCreateProject}
                    disabled={isLoading || !prompt.trim()}
                    className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 px-8 py-2 text-sm"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Creating...</span>
                      </div>
                    ) : (
                      'Create'
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex items-center justify-center space-x-8 text-zinc-500">
          <div className="text-sm">No coding needed</div>
          <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
          <div className="text-sm">AI-powered</div>
          <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
          <div className="text-sm">Instant results</div>
        </div>
      </div>
    </div>
  )
}
