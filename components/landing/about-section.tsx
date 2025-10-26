import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AboutSection() {
  const stats = [
    { label: 'Projects Created', value: '10,000+' },
    { label: 'Active Users', value: '5,000+' },
    { label: 'Lines Generated', value: '1M+' },
    { label: 'Countries', value: '50+' },
  ]

  return (
    <div className="container mx-auto px-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-white">About Nocturide</h2>
        <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
          We're revolutionizing how developers build applications by combining the power of AI with modern web technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Built for the Future</h3>
          <p className="text-zinc-400 leading-relaxed">
            Nocturide IDE represents the next generation of development tools. We've eliminated the barriers 
            between idea and implementation, allowing developers to focus on creativity rather than boilerplate code.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Our AI-powered platform understands context, generates production-ready code, and adapts to your 
            specific needs. Whether you're building a simple website or a complex enterprise application, 
            Nocturide accelerates your development process.
          </p>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-zinc-300">Always up-to-date with latest technologies</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-zinc-300">Enterprise-grade security and reliability</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="glass border-zinc-800 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Card className="glass border-zinc-800 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Our Mission</CardTitle>
            <CardDescription className="text-zinc-400 text-lg">
              To democratize software development by making advanced AI tools accessible to developers of all skill levels.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400 leading-relaxed">
              We believe that the future of development lies in the seamless integration of human creativity 
              and artificial intelligence. By removing the complexity of setup, configuration, and boilerplate code, 
              we enable developers to focus on what truly matters: building innovative solutions that make a difference.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
