import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, Users, Zap, Heart, Globe, Code, Rocket } from 'lucide-react'

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior Full-Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead development of AI-powered features and core platform functionality.',
      requirements: ['React/Next.js', 'Node.js', 'TypeScript', 'AI/ML Integration'],
      featured: true
    },
    {
      title: 'AI/ML Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Design and implement AI models for code generation and optimization.',
      requirements: ['Python', 'TensorFlow/PyTorch', 'NLP', 'Code Analysis'],
      featured: true
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Create intuitive user experiences for our development platform.',
      requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      featured: false
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Build and maintain our cloud infrastructure and deployment pipelines.',
      requirements: ['AWS/GCP', 'Docker', 'Kubernetes', 'CI/CD'],
      featured: false
    },
    {
      title: 'Technical Writer',
      department: 'Content',
      location: 'Remote',
      type: 'Part-time',
      experience: '2+ years',
      description: 'Create comprehensive documentation and tutorials for developers.',
      requirements: ['Technical Writing', 'Markdown', 'API Documentation', 'Tutorials'],
      featured: false
    },
    {
      title: 'Community Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Build and engage our developer community across platforms.',
      requirements: ['Social Media', 'Community Building', 'Developer Relations', 'Content Creation'],
      featured: false
    }
  ]

  const benefits = [
    {
      icon: Globe,
      title: 'Remote First',
      description: 'Work from anywhere in the world with flexible hours'
    },
    {
      icon: Zap,
      title: 'Cutting Edge Tech',
      description: 'Work with the latest AI and web technologies'
    },
    {
      icon: Users,
      title: 'Small Team',
      description: 'Make a real impact in a close-knit, talented team'
    },
    {
      icon: Heart,
      title: 'Mission Driven',
      description: 'Help democratize software development for everyone'
    },
    {
      icon: Code,
      title: 'Open Source',
      description: 'Contribute to open source projects and share knowledge'
    },
    {
      icon: Rocket,
      title: 'Fast Growth',
      description: 'Rapid career advancement in a growing startup'
    }
  ]

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-zinc-100">Join Our Team</h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Help us build the future of AI-powered development. 
            We're looking for passionate individuals who want to make a difference.
          </p>
          <div className="flex items-center justify-center space-x-2 text-zinc-500 text-sm">
            <span>Founded by:</span>
            <span className="text-zinc-300">MagistrTheOne</span>
            <span>•</span>
            <span>CEO & Founder</span>
          </div>
        </div>

        {/* Company Culture */}
        <Card className="glass-card mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-zinc-100">Our Culture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="text-center space-y-4">
                    <div className="w-16 h-16 bg-zinc-800/50 rounded-xl flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-100">{benefit.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-zinc-100 mb-8">Open Positions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {openPositions.map((position, index) => (
              <Card key={index} className="glass-card hover:border-zinc-600/50 transition-all duration-300 hover:scale-105">
                {position.featured && (
                  <div className="absolute -top-3 left-4">
                    <Badge className="bg-blue-600 text-white">Featured</Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <CardTitle className="text-xl text-zinc-100 mb-2">{position.title}</CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-zinc-400">
                        <span>{position.department}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{position.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                        {position.type}
                      </Badge>
                      <div className="text-xs text-zinc-500">{position.experience}</div>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {position.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-100 mb-2">Key Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {position.requirements.map((req, reqIndex) => (
                          <Badge key={reqIndex} variant="secondary" className="text-xs bg-zinc-800 text-zinc-300">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                        Apply Now
                      </Button>
                      <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-zinc-100">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <Card className="glass-card mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-zinc-100">Application Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">Apply</h3>
                <p className="text-zinc-400 text-sm">Submit your application with resume and portfolio</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">Initial Review</h3>
                <p className="text-zinc-400 text-sm">We review your application within 48 hours</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">Interview</h3>
                <p className="text-zinc-400 text-sm">Technical and cultural fit interview with the team</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">Decision</h3>
                <p className="text-zinc-400 text-sm">Final decision and offer within one week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-zinc-100 mb-4">Don't See Your Role?</h3>
              <p className="text-zinc-400 mb-6">
                We're always looking for exceptional talent. If you think you'd be a great fit, 
                we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Send General Application
                </Button>
                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-zinc-100">
                  Contact MagistrTheOne
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
