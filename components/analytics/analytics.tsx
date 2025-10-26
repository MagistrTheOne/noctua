'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    ym?: (counterId: number, action: string, ...args: any[]) => void
  }
}

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Google Analytics
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`
      document.head.appendChild(script)

      const configScript = document.createElement('script')
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
      `
      document.head.appendChild(configScript)

      // Track page views
      window.gtag?.('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname,
      })
    }

    // Yandex Metrika
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_YM_ID) {
      const script = document.createElement('script')
      script.innerHTML = `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${process.env.NEXT_PUBLIC_YM_ID}, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
        });
      `
      document.head.appendChild(script)

      // Track page views
      window.ym?.(parseInt(process.env.NEXT_PUBLIC_YM_ID), 'hit', pathname)
    }
  }, [pathname])

  // Track events
  const trackEvent = (category: string, action: string, label?: string) => {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      })
    }

    // Yandex Metrika
    if (window.ym && process.env.NEXT_PUBLIC_YM_ID) {
      window.ym(parseInt(process.env.NEXT_PUBLIC_YM_ID), 'reachGoal', action, {
        category,
        label
      })
    }
  }

  // Make trackEvent available globally
  useEffect(() => {
    ;(window as any).trackEvent = trackEvent
  }, [])

  return null
}
