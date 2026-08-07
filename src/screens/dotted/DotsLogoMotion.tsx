import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import dotsLogoMotionUrl from '../../assets/dotted/ask-dots-island/dots-logo-motion.json?url'

export function DotsLogoMotion({ className }: { className: string }) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!containerRef.current) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: !reduceMotion,
      path: dotsLogoMotionUrl,
    })
    const stopAtFirstFrame = () => animation.goToAndStop(0, true)

    if (reduceMotion) animation.addEventListener('DOMLoaded', stopAtFirstFrame)

    return () => {
      if (reduceMotion) animation.removeEventListener('DOMLoaded', stopAtFirstFrame)
      animation.destroy()
    }
  }, [])

  return <span ref={containerRef} className={className} aria-hidden="true" />
}
