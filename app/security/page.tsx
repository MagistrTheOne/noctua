import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, Eye, Server, Key, CheckCircle } from 'lucide-react'

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All data is encrypted in transit and at rest using industry-standard AES-256 encryption'
    },
    {
      icon: Shield,
      title: 'SOC 2 Compliance',
      description: 'We maintain SOC 2 Type II compliance with regular third-party security audits'
    },
    {
      icon: Key,
      title: 'Multi-Factor Authentication',
      description: 'Optional MFA support for enhanced account security and access control'
    },
    {
      icon: Server,
      title: 'Secure Infrastructure',
      description: 'Hosted on enterprise-grade cloud infrastructure with 24/7 monitoring'
    },
    {
      icon: Eye,
      title: 'Zero-Knowledge Architecture',
      description: 'We cannot access your private code repositories or sensitive project data'
    },
    {
      icon: CheckCircle,
      title: 'Regular Security Updates',
      description: 'Continuous security patches and updates to protect against emerging threats'
    }
  ]

  const certifications = [
    { name: 'SOC 2 Type II', status: 'Certified', year: '2024' },
    { name: 'ISO 27001', status: 'In Progress', year: '2025' },
    { name: 'GDPR Compliance', status: 'Certified', year: '2024' },
    { name: 'CCPA Compliance', status: 'Certified', year: '2024' }
  ]

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-zinc-100">Security</h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Security is our top priority. Learn about our comprehensive security measures and compliance standards.
          </p>
          <div className="flex items-center justify-center space-x-2 text-zinc-500 text-sm">
            <span>Security Lead:</span>
            <span className="text-zinc-300">MagistrTheOne</span>
            <span>•</span>
            <span>Chief Security Officer</span>
          </div>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="glass-card hover:border-zinc-600/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-zinc-800/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-3">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Compliance */}
        <Card className="glass-card mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-zinc-100">Compliance & Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto ${
                    cert.status === 'Certified' 
                      ? 'bg-green-600/20 border border-green-600/50' 
                      : 'bg-yellow-600/20 border border-yellow-600/50'
                  }`}>
                    <CheckCircle className={`w-8 h-8 ${
                      cert.status === 'Certified' ? 'text-green-500' : 'text-yellow-500'
                    }`} />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100">{cert.name}</h3>
                  <Badge className={`${
                    cert.status === 'Certified' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-yellow-600 text-white'
                  }`}>
                    {cert.status}
                  </Badge>
                  <p className="text-sm text-zinc-400">{cert.year}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Practices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">Encryption</h3>
                <p className="text-zinc-400 text-sm">
                  All data is encrypted using AES-256 encryption both in transit (TLS 1.3) and at rest. 
                  Private keys are managed using hardware security modules (HSMs).
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">Access Control</h3>
                <p className="text-zinc-400 text-sm">
                  Role-based access control with principle of least privilege. All access is logged and monitored 
                  with anomaly detection.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">Data Residency</h3>
                <p className="text-zinc-400 text-sm">
                  Data is stored in secure, geographically distributed data centers with automatic backups 
                  and disaster recovery procedures.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-100">Incident Response</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">24/7 Monitoring</h3>
                <p className="text-zinc-400 text-sm">
                  Continuous monitoring of all systems with automated alerting and rapid response procedures 
                  for any security incidents.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">Vulnerability Management</h3>
                <p className="text-zinc-400 text-sm">
                  Regular security assessments, penetration testing, and vulnerability scanning with 
                  immediate patching of critical issues.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">Breach Notification</h3>
                <p className="text-zinc-400 text-sm">
                  Immediate notification procedures in case of any data breach with transparent communication 
                  to affected users and authorities.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Contact */}
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">Report Security Issues</h3>
            <p className="text-zinc-400 mb-6">
              Found a security vulnerability? We appreciate responsible disclosure and offer a bug bounty program 
              for security researchers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Report Vulnerability
              </Button>
              <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-zinc-100">
                Security@nocturide.dev
              </Button>
            </div>
            <div className="mt-6 text-sm text-zinc-500">
              Security Team: <span className="text-zinc-300">MagistrTheOne</span> • 
              <span className="text-zinc-300 ml-1">security@nocturide.dev</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
