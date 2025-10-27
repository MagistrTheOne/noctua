import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-zinc-100">Privacy Policy</h1>
          <p className="text-xl text-zinc-400">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="flex items-center justify-center space-x-2 text-zinc-500 text-sm">
            <span>Last updated:</span>
            <span className="text-zinc-300">January 15, 2025</span>
            <span>•</span>
            <span>Contact:</span>
            <span className="text-zinc-300">MagistrTheOne</span>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">Account Information</h3>
                <p className="text-zinc-400">We collect your email address, name, and profile information when you create an account.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">Usage Data</h3>
                <p className="text-zinc-400">We track how you use our platform to improve our services and provide better AI-generated code.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">Project Data</h3>
                <p className="text-zinc-400">Your project code and descriptions are processed by our AI systems to generate better results.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Provide and improve our AI-powered development platform</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Generate personalized code suggestions and templates</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Communicate with you about updates and new features</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Ensure platform security and prevent abuse</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-zinc-400">
                We implement industry-standard security measures to protect your data, including encryption in transit and at rest, 
                regular security audits, and access controls. Your code and personal information are never shared with third parties 
                without your explicit consent.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Access and download your data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Request data deletion</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Opt out of marketing communications</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Export your projects and code</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-zinc-300">
                <p>Email: privacy@nocturide.dev</p>
                <p>Contact: MagistrTheOne, Founder</p>
                <p>Location: Krasnodar, Russia</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
