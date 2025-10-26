'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ContactSection() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-white">Get in Touch</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Have questions? Need support? We're here to help you succeed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <Card className="glass border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
              <CardDescription className="text-zinc-400">
                Reach out to us through any of these channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-300 text-sm">📧</span>
                </div>
                <div>
                  <div className="text-white font-medium">Email</div>
                  <div className="text-zinc-400 text-sm">maxonyushko71@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-300 text-sm">📱</span>
                </div>
                <div>
                  <div className="text-white font-medium">Telegram</div>
                  <div className="text-zinc-400 text-sm">@MagistrTheOne</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-300 text-sm">🐙</span>
                </div>
                <div>
                  <div className="text-white font-medium">GitHub</div>
                  <div className="text-zinc-400 text-sm">MagistrTheOne</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-300 text-sm">📍</span>
                </div>
                <div>
                  <div className="text-white font-medium">Location</div>
                  <div className="text-zinc-400 text-sm">Krasnodar, Russia</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Support Hours</CardTitle>
              <CardDescription className="text-zinc-400">
                When you can expect a response
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-300">Monday - Friday</span>
                  <span className="text-zinc-400">9:00 AM - 6:00 PM UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-300">Saturday</span>
                  <span className="text-zinc-400">10:00 AM - 4:00 PM UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-300">Sunday</span>
                  <span className="text-zinc-400">Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Send us a Message</CardTitle>
            <CardDescription className="text-zinc-400">
              Fill out the form below and we'll get back to you within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-300">First Name</label>
                  <Input
                    placeholder="John"
                    className="bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-300">Last Name</label>
                  <Input
                    placeholder="Doe"
                    className="bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-300">Email</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-300">Subject</label>
                <Input
                  placeholder="How can we help?"
                  className="bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-300">Message</label>
                <Textarea
                  placeholder="Tell us more about your question or feedback..."
                  className="min-h-[120px] bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100"
                onClick={(e) => {
                  e.preventDefault();
                  // Simple contact form - redirect to email
                  window.location.href = 'mailto:maxonyushko71@gmail.com?subject=Contact from Nocturide&body=Hello MagistrTheOne, I would like to get in touch regarding Nocturide.';
                }}
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
