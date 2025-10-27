import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code2, Globe, ShoppingCart, BarChart3, Users, FileText, Zap, Database } from 'lucide-react'

export default function TemplatesPage() {
  const templates = [
    {
      title: 'E-commerce Store',
      description: 'Complete online store with payment integration, inventory management, and admin dashboard',
      icon: ShoppingCart,
      category: 'Business',
      tech: ['Next.js', 'Stripe', 'Prisma', 'Tailwind'],
      featured: true
    },
    {
      title: 'SaaS Dashboard',
      description: 'Analytics dashboard with charts, user management, and subscription handling',
      icon: BarChart3,
      category: 'SaaS',
      tech: ['React', 'Chart.js', 'Auth0', 'PostgreSQL'],
      featured: true
    },
    {
      title: 'Social Media App',
      description: 'Real-time social platform with posts, comments, likes, and notifications',
      icon: Users,
      category: 'Social',
      tech: ['Next.js', 'Socket.io', 'Redis', 'AWS'],
      featured: false
    },
    {
      title: 'Blog Platform',
      description: 'SEO-optimized blog with CMS, comments, and newsletter integration',
      icon: FileText,
      category: 'Content',
      tech: ['Next.js', 'MDX', 'Vercel', 'Mailchimp'],
      featured: false
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio with animations, contact form, and project showcase',
      icon: Globe,
      category: 'Portfolio',
      tech: ['React', 'Framer Motion', 'EmailJS', 'Vercel'],
      featured: false
    },
    {
      title: 'API Documentation',
      description: 'Interactive API docs with code examples, testing, and versioning',
      icon: Code2,
      category: 'Developer',
      tech: ['Next.js', 'Swagger', 'Prism', 'GitHub'],
      featured: false
    },
    {
      title: 'Task Management',
      description: 'Kanban board with team collaboration, time tracking, and reporting',
      icon: Zap,
      category: 'Productivity',
      tech: ['React', 'DnD', 'WebSocket', 'MongoDB'],
      featured: false
    },
    {
      title: 'Data Analytics',
      description: 'Business intelligence platform with data visualization and insights',
      icon: Database,
      category: 'Analytics',
      tech: ['Python', 'FastAPI', 'D3.js', 'PostgreSQL'],
      featured: false
    }
  ]

  const categories = ['All', 'Business', 'SaaS', 'Social', 'Content', 'Portfolio', 'Developer', 'Productivity', 'Analytics']

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-zinc-100">Project Templates</h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Jumpstart your development with production-ready templates. 
            Each template includes complete code, documentation, and deployment guides.
          </p>
          <div className="flex items-center justify-center space-x-2 text-zinc-500 text-sm">
            <span>Curated by:</span>
            <span className="text-zinc-300">MagistrTheOne</span>
            <span>•</span>
            <span>Senior Full-Stack Developer</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === 'All' ? 'default' : 'outline'}
              className={`${
                category === 'All' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => {
            const IconComponent = template.icon
            return (
              <Card key={index} className="glass-card hover:border-zinc-600/50 transition-all duration-300 hover:scale-105">
                {template.featured && (
                  <div className="absolute -top-3 left-4">
                    <Badge className="bg-blue-600 text-white">Featured</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-zinc-800/50 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-zinc-100">{template.title}</CardTitle>
                      <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {template.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {template.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs bg-zinc-800 text-zinc-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      Use Template
                    </Button>
                    <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-zinc-100">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <Card className="glass-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-zinc-100 mb-4">Need a Custom Template?</h3>
              <p className="text-zinc-400 mb-6">
                Can't find what you're looking for? Our AI can generate custom templates 
                based on your specific requirements.
              </p>
              <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                Generate Custom Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
