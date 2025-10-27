'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Globe } from 'lucide-react'

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('ru')

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  // Загружаем язык из localStorage при монтировании
  useEffect(() => {
    const savedLang = localStorage.getItem('nocturide-language')
    if (savedLang && ['ru', 'en'].includes(savedLang)) {
      setCurrentLang(savedLang)
    }
  }, [])

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode)
    localStorage.setItem('nocturide-language', langCode)
    setIsOpen(false)
    // Пока что только визуальное переключение
    // Полная интернационализация будет добавлена позже
  }

  const currentLanguage = languages.find(lang => lang.code === currentLang)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="text-zinc-400 hover:text-zinc-100 focus:ring-2 focus:ring-zinc-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <span className="text-sm mr-1">{currentLanguage?.flag}</span>
        <span className="text-xs uppercase font-medium">{currentLang}</span>
      </Button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-36 glass-card rounded-lg shadow-lg z-50 border border-zinc-700/50">
          <div className="py-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-2 ${
                  currentLang === lang.code
                    ? 'text-zinc-100 bg-zinc-800/50'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
