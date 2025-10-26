import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Sparkles, Zap, Terminal, FileText, GitBranch } from 'lucide-react'

export function FeaturesGrid() {
  const features = [
    {
      icon: Code,
      title: 'Monaco Editor',
      description: 'Full-featured code editor with syntax highlighting, IntelliSense, and multi-language support.',
    },
    {
      icon: Sparkles,
      title: 'AI Assistant',
      description: 'Get help with your code using advanced AI that understands your project context.',
    },
    {
      icon: Terminal,
      title: 'Integrated Terminal',
      description: 'Run commands, install packages, and execute your code directly in the browser.',
    },
    {
      icon: FileText,
      title: 'File Management',
      description: 'Organize your project files with drag-and-drop, context menus, and real-time sync.',
    },
    {
      icon: GitBranch,
      title: 'Version Control',
      description: 'Built-in Git integration for tracking changes and collaborating with others.',
    },
    {
      icon: Zap,
      title: 'Real-time Execution',
      description: 'See your changes instantly with live preview and hot reload capabilities.',
    },
  ]

  return (
    <section id="features" className="py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold text-white">Powerful Features</h2>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Everything you need to build, test, and deploy your projects in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="glass hover:bg-zinc-900/60 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-zinc-400">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
