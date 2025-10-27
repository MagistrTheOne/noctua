import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Code, Zap, Users, Shield, Rocket, Terminal, Database } from 'lucide-react'

export default function DocumentationPage() {
  const sections = [
    {
      title: 'Getting Started',
      description: 'Quick setup guide and first steps with Nocturide',
      icon: Rocket,
      articles: [
        'Installation & Setup',
        'Creating Your First Project',
        'Understanding the Interface',
        'Basic Configuration'
      ],
      status: 'Complete'
    },
    {
      title: 'AI Code Generation',
      description: 'Learn how to leverage AI for faster development',
      icon: Zap,
      articles: [
        'Writing Effective Prompts',
        'AI Model Configuration',
        'Code Review & Optimization',
        'Custom AI Training'
      ],
      status: 'Complete'
    },
    {
      title: 'Project Management',
      description: 'Organize and manage your development workflow',
      icon: Users,
      articles: [
        'Team Collaboration',
        'Version Control Integration',
        'Project Templates',
        'Deployment Strategies'
      ],
      status: 'Complete'
    },
    {
      title: 'API Reference',
      description: 'Complete API documentation for developers',
      icon: Code,
      articles: [
        'REST API Endpoints',
        'WebSocket Events',
        'Authentication',
        'Rate Limits & Quotas'
      ],
      status: 'In Progress'
    },
    {
      title: 'Security',
      description: 'Security best practices and guidelines',
      icon: Shield,
      articles: [
        'Data Protection',
        'Access Control',
        'Secure Deployment',
        'Compliance Standards'
      ],
      status: 'Complete'
    },
    {
      title: 'Integrations',
      description: 'Connect with external services and tools',
      icon: Database,
      articles: [
        'GitHub Integration',
        'Vercel Deployment',
        'Database Connections',
        'Third-party APIs'
      ],
      status: 'In Progress'
    },
    {
      title: 'CLI Tools',
      description: 'Command-line interface for power users',
      icon: Terminal,
      articles: [
        'Installation & Setup',
        'Project Commands',
        'Deployment Scripts',
        'Automation Workflows'
      ],
      status: 'Planned'
    },
    {
      title: 'Tutorials',
      description: 'Step-by-step guides and examples',
      icon: BookOpen,
      articles: [
        'Building a Todo App',
        'Creating a SaaS Dashboard',
        'E-commerce Integration',
        'Real-time Features'
      ],
      status: 'Complete'
    }
  ]

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-zinc-100">Documentation</h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Comprehensive guides, API references, and tutorials to help you build amazing applications with Nocturide.
          </p>
          <div className="flex items-center justify-center space-x-2 text-zinc-500 text-sm">
            <span>Maintained by:</span>
            <span className="text-zinc-300">MagistrTheOne</span>
            <span>•</span>
            <span>Technical Documentation Lead</span>
          </div>
        </div>

        {/* Quick Start */}
        <Card className="glass-card mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-zinc-100">Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-zinc-100">1. Create Account</h4>
                <p className="text-zinc-400 text-sm">Sign up for free and get instant access to all features</p>
                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-zinc-100">
                  Sign Up Free
                </Button>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-zinc-100">2. Start Building</h4>
                <p className="text-zinc-400 text-sm">Describe your project and let AI generate the code</p>
                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-zinc-100">
                  Try AI Generator
                </Button>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-zinc-100">3. Deploy</h4>
                <p className="text-zinc-400 text-sm">Deploy your application with one click to production</p>
                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-zinc-100">
                  Deploy Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            return (
              <Card key={index} className="glass-card hover:border-zinc-600/50 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-zinc-800/50 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-zinc-100">{section.title}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          section.status === 'Complete' 
                            ? 'border-green-700 text-green-400' 
                            : section.status === 'In Progress'
                            ? 'border-yellow-700 text-yellow-400'
                            : 'border-zinc-700 text-zinc-400'
                        }`}
                      >
                        {section.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {section.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.articles.map((article, articleIndex) => (
                      <li key={articleIndex} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                        <span className="text-zinc-300 hover:text-zinc-100 cursor-pointer transition-colors">
                          {article}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                  >
                    View Section
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Support Section */}
        <div className="text-center mt-20">
          <Card className="glass-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-zinc-100 mb-4">Need Help?</h3>
              <p className="text-zinc-400 mb-6">
                Can't find what you're looking for? Our support team and community are here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Contact Support
                </Button>
                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-zinc-100">
                  Join Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
