'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'

export function Footer() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const t = useTranslations('footer')

  const footerLinks = {
    product: [
      { name: t('product.features'), href: '#features' },
      { name: t('product.templates'), href: '#templates' },
      { name: t('product.pricing'), href: '#pricing' },
      { name: t('product.api'), href: '/docs/api' },
    ],
    company: [
      { name: t('company.about'), href: '#about' },
      { name: t('company.blog'), href: '/blog' },
      { name: t('company.careers'), href: '/careers' },
      { name: t('company.contact'), href: '#contact' },
    ],
    resources: [
      { name: t('resources.documentation'), href: '/docs' },
      { name: t('resources.help'), href: '/help' },
      { name: t('resources.community'), href: '/community' },
      { name: t('resources.status'), href: '/status' },
    ],
    legal: [
      { name: t('legal.privacy'), href: '/privacy' },
      { name: t('legal.terms'), href: '/terms' },
      { name: t('legal.cookies'), href: '/cookies' },
      { name: t('legal.gdpr'), href: '/gdpr' },
    ],
  }

  const socialLinks = [
    { name: 'Telegram', href: 'https://t.me/MagistrTheOne', icon: '📱' },
    { name: 'GitHub', href: 'https://github.com/MagistrTheOne', icon: '🐙' },
    { name: 'Email', href: 'mailto:maxonyushko71@gmail.com', icon: '📧' },
  ]

  return (
    <footer ref={ref as any} className="border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">Nocturide</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              {t('bottom.madeBy').replace('MagistrTheOne | 2025 | Krasnodar', 'MagistrTheOne | 2025 | Krasnodar')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-800 p-2"
                  asChild
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <span className="text-lg">{social.icon}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">{t('product.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">{t('company.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">{t('resources.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">{t('legal.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-zinc-800/50">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h3 className="text-white font-semibold">{t('newsletter.title')}</h3>
            <p className="text-zinc-400 text-sm">
              {t('newsletter.subtitle')}
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-3 py-2 bg-zinc-900/50 border border-zinc-700 rounded-md text-zinc-100 placeholder:text-zinc-500 text-sm focus:outline-none focus:border-zinc-600"
              />
              <Button
                size="sm"
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100"
                onClick={() => {
                  // Simple email subscription - redirect to contact
                  window.location.href = '#contact';
                }}
              >
                {t('newsletter.subscribe')}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-zinc-400 text-sm">
              {t('bottom.copyright')}
            </div>
            <div className="flex items-center space-x-6 text-sm text-zinc-400">
              <span>{t('bottom.madeBy')}</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{t('bottom.status')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}