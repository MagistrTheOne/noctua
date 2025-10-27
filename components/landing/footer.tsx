'use client'

import { Github, Twitter, Mail } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-100">Продукт</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  Возможности
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  Тарифы
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  Шаблоны
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  Документация
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  AI Демо
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-100">Компания</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  Блог
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  Карьера
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-100">Правовая информация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  Условия использования
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  Безопасность
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  Политика cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-100">Связаться</h3>
            <div className="flex space-x-4">
              <Link 
                href="https://github.com/nocturide" 
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link 
                href="https://twitter.com/nocturide" 
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link 
                href="mailto:hello@nocturide.dev" 
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-zinc-400 text-sm">
                hello@nocturide.dev
              </p>
              <p className="text-zinc-400 text-sm">
                Krasnodar, Russia
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-zinc-100 mb-2">Nocturide</h3>
              <p className="text-zinc-400 text-sm">
                AI-powered web development environment
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-zinc-500 text-sm">
                © 2025 Nocturide by MagistrTheOne. Krasnodar, Russia.
              </p>
              <p className="text-zinc-500 text-sm">
                Все права защищены.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
