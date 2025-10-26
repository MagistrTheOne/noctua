'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, Code, Zap } from 'lucide-react'
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
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `Project ${Date.now()}`,
          description: prompt,
          settings: {
            framework: 'vanilla',
            language: 'javascript',
          },
        }),
      })

      if (response.ok) {
        const project = await response.json()
        toast.success('Project created successfully!')
        router.push(`/workspace/${project.id}`)
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to create project')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="text-center space-y-8 py-20">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          Nocturide IDE
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Build, code, and deploy your projects with AI assistance in a beautiful, 
          modern web-based IDE
        </p>
      </div>

      <Card className="glass max-w-4xl mx-auto">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2 text-zinc-300">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">Describe your project</span>
            </div>
            
            <Textarea
              placeholder="Create a todo app with React, TypeScript, and Tailwind CSS..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] resize-none bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600"
              disabled={isLoading}
            />
            
            <Button
              onClick={handleCreateProject}
              disabled={isLoading || !prompt.trim()}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Building with AI...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Build with AI</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center space-x-8 text-zinc-500">
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4" />
          <span className="text-sm">Monaco Editor</span>
        </div>
        <div className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm">AI Assistant</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4" />
          <span className="text-sm">Real-time Execution</span>
        </div>
      </div>
    </div>
  )
}
