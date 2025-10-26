'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'
import { toast } from 'sonner'

interface FormData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  subject?: string
  message?: string
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const t = useTranslations('contact')

  // Real-time validation
  const validateField = (name: keyof FormData, value: string) => {
    const newErrors = { ...errors }

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (value.length < 2) {
          newErrors[name] = t('validation.minLength', { min: '2' })
        } else {
          delete newErrors[name]
        }
        break
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          newErrors.email = t('validation.email')
        } else {
          delete newErrors.email
        }
        break
      case 'subject':
      case 'message':
        if (value.length < 5) {
          newErrors[name] = t('validation.minLength', { min: '5' })
        } else {
          delete newErrors[name]
        }
        break
    }

    setErrors(newErrors)
  }

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const allErrors: FormErrors = {}
    Object.keys(formData).forEach(key => {
      validateField(key as keyof FormData, formData[key as keyof FormData])
    })

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors)
      toast.error('Please fix the errors in the form')
      return
    }

    setIsSubmitting(true)

    try {
      // Simple email redirect with form data
      const body = `Hello MagistrTheOne,

I would like to get in touch regarding Nocturide.

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

--
Sent from Nocturide Contact Form`

      const mailtoLink = `mailto:maxonyushko71@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`
      window.location.href = mailtoLink

      toast.success('Opening email client...')
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div ref={ref as any} className={`container mx-auto px-4 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : ''}`}>
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-white">{t('title')}</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <Card className="glass border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">{t('information.title')}</CardTitle>
              <CardDescription className="text-zinc-400">
                {t('information.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-300 text-sm">📧</span>
                </div>
                <div>
                  <div className="text-white font-medium">{t('information.email.title')}</div>
                  <div className="text-zinc-400 text-sm">{t('information.email.value')}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-300 text-sm">📱</span>
                </div>
                <div>
                  <div className="text-white font-medium">{t('information.telegram.title')}</div>
                  <div className="text-zinc-400 text-sm">{t('information.telegram.value')}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-300 text-sm">🐙</span>
                </div>
                <div>
                  <div className="text-white font-medium">{t('information.github.title')}</div>
                  <div className="text-zinc-400 text-sm">{t('information.github.value')}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-300 text-sm">📍</span>
                </div>
                <div>
                  <div className="text-white font-medium">{t('information.location.title')}</div>
                  <div className="text-zinc-400 text-sm">{t('information.location.value')}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">{t('support.title')}</CardTitle>
              <CardDescription className="text-zinc-400">
                {t('support.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-300">{t('support.mondayFriday')}</span>
                  <span className="text-zinc-400">{t('support.mondayFridayHours')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-300">{t('support.saturday')}</span>
                  <span className="text-zinc-400">{t('support.saturdayHours')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-300">{t('support.sunday')}</span>
                  <span className="text-zinc-400">{t('support.sundayHours')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">{t('form.title')}</CardTitle>
            <CardDescription className="text-zinc-400">
              {t('form.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm text-zinc-300">
                    {t('form.firstName')} *
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder={t('form.placeholder.firstName')}
                    className={`bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                      errors.firstName ? 'border-red-500' : ''
                    }`}
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="text-red-400 text-xs" role="alert">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm text-zinc-300">
                    {t('form.lastName')} *
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder={t('form.placeholder.lastName')}
                    className={`bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                      errors.lastName ? 'border-red-500' : ''
                    }`}
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="text-red-400 text-xs" role="alert">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-zinc-300">
                  {t('form.email')} *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('form.placeholder.email')}
                  className={`bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-400 text-xs" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm text-zinc-300">
                  {t('form.subject')} *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={t('form.placeholder.subject')}
                  className={`bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                    errors.subject ? 'border-red-500' : ''
                  }`}
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-red-400 text-xs" role="alert">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-zinc-300">
                  {t('form.message')} *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('form.placeholder.message')}
                  className={`min-h-[120px] bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                    errors.message ? 'border-red-500' : ''
                  }`}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-400 text-xs" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 disabled:opacity-50 focus:ring-2 focus:ring-zinc-500"
                aria-describedby="submit-status"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>{t('form.send')}</span>
                  </div>
                ) : (
                  t('form.send')
                )}
              </Button>

              <div id="submit-status" className="sr-only">
                {isSubmitting ? 'Sending message...' : 'Ready to send message'}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
