'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function TemplatesSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const t = useTranslations('templates')
  const router = useRouter()

  const templates = [
    {
      title: t('templates.ecommerce.title'),
      description: t('templates.ecommerce.description'),
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      category: t('templates.ecommerce.category'),
      prompt: 'Create an e-commerce store with React, Node.js, PostgreSQL, and Stripe payment integration',
    },
    {
      title: t('templates.social.title'),
      description: t('templates.social.description'),
      tech: ['Next.js', 'Socket.io', 'MongoDB', 'Redis'],
      category: t('templates.social.category'),
      prompt: 'Build a social media app with Next.js, Socket.io, MongoDB, and Redis for real-time features',
    },
    {
      title: t('templates.taskManagement.title'),
      description: t('templates.taskManagement.description'),
      tech: ['Vue.js', 'Express', 'MySQL', 'WebSocket'],
      category: t('templates.taskManagement.category'),
      prompt: 'Make a task management tool with Vue.js, Express, MySQL, and WebSocket for collaboration',
    },
    {
      title: t('templates.blog.title'),
      description: t('templates.blog.description'),
      tech: ['Next.js', 'Sanity', 'Tailwind', 'Vercel'],
      category: t('templates.blog.category'),
      prompt: 'Design a blog platform with Next.js, Sanity CMS, Tailwind CSS, and Vercel deployment',
    },
    {
      title: t('templates.saas.title'),
      description: t('templates.saas.description'),
      tech: ['React', 'D3.js', 'Firebase', 'Stripe'],
      category: t('templates.saas.category'),
      prompt: 'Create a SaaS dashboard with React, D3.js charts, Firebase, and Stripe subscriptions',
    },
    {
      title: t('templates.mobileBackend.title'),
      description: t('templates.mobileBackend.description'),
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      category: t('templates.mobileBackend.category'),
      prompt: 'Build a mobile app backend with Node.js, Express, MongoDB, and JWT authentication',
    },
  ]

  const categories = [
    t('all'),
    t('business'),
    t('social'),
    t('productivity'),
    t('content'),
    t('analytics'),
    t('backend')
  ]

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter(template => template.category === selectedCategory)

  const handleTemplateClick = async (template: typeof templates[0]) => {
    try {
      // Generate project with AI using template prompt
      const response = await fetch('/api/ai/generate-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: template.prompt,
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
    }
  }

  return (
    <div ref={ref} className={`container mx-auto px-4 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-white">{t('title')}</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className={`transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-100 shadow-lg scale-105'
                : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:scale-105'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <Card
            key={index}
            className={`glass border-zinc-800 hover:bg-zinc-900/60 transition-all duration-300 hover:scale-105 ${
              isInView ? 'animate-fade-in-up' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">{template.title}</CardTitle>
                <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                  {template.category}
                </span>
              </div>
              <CardDescription className="text-zinc-400 text-sm leading-relaxed">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {template.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs bg-zinc-800/50 text-zinc-400 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Button
                className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 transition-colors"
                size="sm"
                onClick={() => handleTemplateClick(template)}
              >
                {t('useTemplate')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Card className={`glass border-zinc-800 max-w-2xl mx-auto transition-all duration-500 ${isInView ? 'animate-fade-in' : ''}`}>
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-white mb-4">{t('customTitle')}</h3>
            <p className="text-zinc-400 mb-6">
              {t('customText')}
            </p>
            <Button
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 transition-colors"
              onClick={() => {
                // Redirect to signup with custom template flag
                router.push('/auth/signup?custom=true');
              }}
            >
              {t('createCustom')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
