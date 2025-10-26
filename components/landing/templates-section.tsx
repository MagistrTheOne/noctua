'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function TemplatesSection() {
  const templates = [
    {
      title: 'E-commerce Store',
      description: 'Complete online store with payment integration, inventory management, and admin dashboard.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      category: 'Business',
    },
    {
      title: 'Social Media App',
      description: 'Modern social platform with real-time messaging, posts, and user profiles.',
      tech: ['Next.js', 'Socket.io', 'MongoDB', 'Redis'],
      category: 'Social',
    },
    {
      title: 'Task Management',
      description: 'Collaborative project management tool with boards, timelines, and team collaboration.',
      tech: ['Vue.js', 'Express', 'MySQL', 'WebSocket'],
      category: 'Productivity',
    },
    {
      title: 'Blog Platform',
      description: 'Content management system with SEO optimization, comments, and analytics.',
      tech: ['Next.js', 'Sanity', 'Tailwind', 'Vercel'],
      category: 'Content',
    },
    {
      title: 'SaaS Dashboard',
      description: 'Analytics dashboard with charts, user management, and subscription handling.',
      tech: ['React', 'D3.js', 'Firebase', 'Stripe'],
      category: 'Analytics',
    },
    {
      title: 'Mobile App Backend',
      description: 'RESTful API for mobile applications with authentication and real-time features.',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      category: 'Backend',
    },
  ]

  const categories = ['All', 'Business', 'Social', 'Productivity', 'Content', 'Analytics', 'Backend']

  return (
    <div className="container mx-auto px-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-white">Project Templates</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Start with professionally designed templates and customize them to fit your needs
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === 'All' ? 'default' : 'outline'}
            className={`${
              category === 'All'
                ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-100'
                : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <Card key={index} className="glass border-zinc-800 hover:bg-zinc-900/60 transition-all duration-300 hover:scale-105">
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
                className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100"
                size="sm"
                onClick={() => {
                  // Redirect to signup if not authenticated, otherwise to workspace
                  window.location.href = '/auth/signup';
                }}
              >
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Card className="glass border-zinc-800 max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-white mb-4">Can't find what you're looking for?</h3>
            <p className="text-zinc-400 mb-6">
              Describe your project idea and our AI will create a custom template tailored to your specific needs.
            </p>
            <Button 
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100"
              onClick={() => {
                // Redirect to workspace for custom template creation
                window.location.href = '/auth/signup';
              }}
            >
              Create Custom Template
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
