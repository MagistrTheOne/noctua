import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, ArrowRight, Tag } from 'lucide-react'

export default function BlogPage() {
  const posts = [
    {
      title: 'The Future of AI-Powered Development',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build software and what it means for developers.',
      author: 'MagistrTheOne',
      date: '2025-01-15',
      readTime: '8 min read',
      category: 'AI',
      featured: true,
      image: '/blog/ai-future.jpg'
    },
    {
      title: 'Building Scalable SaaS Applications with Next.js',
      excerpt: 'Best practices for creating enterprise-grade SaaS applications using modern React frameworks.',
      author: 'MagistrTheOne',
      date: '2025-01-12',
      readTime: '12 min read',
      category: 'Development',
      featured: true,
      image: '/blog/nextjs-saas.jpg'
    },
    {
      title: 'Nocturide: Behind the Scenes',
      excerpt: 'The story of how Nocturide was built, the challenges we faced, and our vision for the future.',
      author: 'MagistrTheOne',
      date: '2025-01-10',
      readTime: '6 min read',
      category: 'Company',
      featured: false,
      image: '/blog/nocturide-story.jpg'
    },
    {
      title: 'Real-time Collaboration in Web Development',
      excerpt: 'How we implemented real-time collaboration features and the technical challenges we solved.',
      author: 'MagistrTheOne',
      date: '2025-01-08',
      readTime: '10 min read',
      category: 'Technology',
      featured: false,
      image: '/blog/realtime-collab.jpg'
    },
    {
      title: 'From Idea to Production: A Developer\'s Journey',
      excerpt: 'A step-by-step guide on taking your project from initial concept to production deployment.',
      author: 'MagistrTheOne',
      date: '2025-01-05',
      readTime: '15 min read',
      category: 'Tutorial',
      featured: false,
      image: '/blog/idea-to-production.jpg'
    },
    {
      title: 'The State of Web Development in 2025',
      excerpt: 'Our predictions and insights on the web development landscape for the coming year.',
      author: 'MagistrTheOne',
      date: '2025-01-03',
      readTime: '7 min read',
      category: 'Industry',
      featured: false,
      image: '/blog/web-dev-2025.jpg'
    }
  ]

  const categories = ['All', 'AI', 'Development', 'Company', 'Technology', 'Tutorial', 'Industry']

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-zinc-100">Blog</h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Insights, tutorials, and stories from the Nocturide team. 
            Stay updated with the latest in AI-powered development.
          </p>
          <div className="flex items-center justify-center space-x-2 text-zinc-500 text-sm">
            <span>Written by:</span>
            <span className="text-zinc-300">MagistrTheOne</span>
            <span>•</span>
            <span>Founder & Technical Writer</span>
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

        {/* Featured Posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-100 mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {posts.filter(post => post.featured).map((post, index) => (
              <Card key={index} className="glass-card hover:border-zinc-600/50 transition-all duration-300 hover:scale-105">
                <div className="h-48 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-t-lg flex items-center justify-center">
                  <div className="text-4xl text-zinc-400">📝</div>
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className="bg-blue-600 text-white">Featured</Badge>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-zinc-100 hover:text-blue-400 transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-zinc-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card key={index} className="glass-card hover:border-zinc-600/50 transition-all duration-300 hover:scale-105">
                <div className="h-32 bg-linear-to-br from-zinc-800/50 to-zinc-700/50 rounded-t-lg flex items-center justify-center">
                  <div className="text-2xl text-zinc-500">📄</div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                      {post.category}
                    </Badge>
                    {post.featured && (
                      <Badge className="bg-blue-600 text-white text-xs">Featured</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg text-zinc-100 hover:text-blue-400 transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <Button variant="outline" className="w-full border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50">
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center mt-20">
          <Card className="glass-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-zinc-100 mb-4">Stay Updated</h3>
              <p className="text-zinc-400 mb-6">
                Get the latest articles, tutorials, and updates from the Nocturide team delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-zinc-900/30 border border-zinc-700/50 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
