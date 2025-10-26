import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function FeaturesGrid() {
  const features = [
    {
      title: 'AI-Powered Development',
      description: 'Describe what you want to build and watch as AI generates complete, functional applications with modern architecture.',
    },
    {
      title: 'Full-Stack Generation',
      description: 'Get complete projects with frontend, backend, database schemas, and deployment configurations automatically created.',
    },
    {
      title: 'Real-Time Collaboration',
      description: 'Work together in real-time with built-in collaboration tools, comments, and version control integration.',
    },
    {
      title: 'Instant Deployment',
      description: 'Deploy your applications instantly to production with one click. No configuration or setup required.',
    },
    {
      title: 'Smart Code Editor',
      description: 'Advanced code editor with AI autocomplete, error detection, and intelligent suggestions as you type.',
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption, SOC2 compliance, and enterprise-grade authentication.',
    },
  ]

  return (
    <div className="container mx-auto px-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-white">Powerful Features</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Everything you need to build, test, and deploy your projects in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="glass border-zinc-800 hover:bg-zinc-900/60 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-zinc-400 text-sm leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
