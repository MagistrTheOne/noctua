import { useEffect, useState } from 'react'

interface UseParallaxOptions {
  speed?: number
  enabled?: boolean
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.5, enabled = true } = options
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (!enabled) return

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      setOffset(scrolled * speed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed, enabled])

  return offset
}
