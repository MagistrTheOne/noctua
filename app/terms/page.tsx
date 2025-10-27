import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-zinc-100">Terms of Service</h1>
          <p className="text-xl text-zinc-400">
            Please read these terms carefully before using Nocturide. By using our service, you agree to these terms.
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
              <CardTitle className="text-2xl text-zinc-100">Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">
                By accessing and using Nocturide, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">Use License</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">Permitted Uses</h3>
                <ul className="space-y-2 text-zinc-400">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Create and develop software applications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Use AI-generated code for commercial and personal projects</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Collaborate with team members on projects</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">Prohibited Uses</h3>
                <ul className="space-y-2 text-zinc-400">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Generate malicious code or malware</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Violate intellectual property rights</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Attempt to reverse engineer our AI models</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-zinc-400">
                You retain full ownership of the code and applications you create using Nocturide. Our AI-generated code 
                is provided to you under a permissive license that allows commercial use. You are responsible for ensuring 
                your projects comply with applicable laws and regulations.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-zinc-400">
                We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We may perform maintenance, 
                updates, or modifications that temporarily affect availability. We will provide reasonable notice for planned 
                maintenance when possible.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">
                Nocturide is provided "as is" without warranties of any kind. We shall not be liable for any direct, indirect, 
                incidental, special, or consequential damages resulting from the use or inability to use our service. 
                Our total liability shall not exceed the amount paid by you for the service in the 12 months preceding the claim.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-zinc-400">
                Either party may terminate this agreement at any time. Upon termination, you will lose access to the service, 
                but you retain ownership of all code and projects you have created. We may terminate accounts that violate 
                these terms or engage in prohibited activities.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400 mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-zinc-300">
                <p>Email: legal@nocturide.dev</p>
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
