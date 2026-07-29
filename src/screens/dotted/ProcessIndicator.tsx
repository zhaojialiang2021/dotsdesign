import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import thinkCheckComplete from '../../assets/dotted/think-check-complete.svg'
import thinkBookAnimationUrl from '../../assets/dotted/think-lottie/book.json?url'
import thinkBulbAnimationUrl from '../../assets/dotted/think-lottie/bulb.json?url'
import thinkCloudAnimationUrl from '../../assets/dotted/think-lottie/cloud.json?url'
import thinkDocAnimationUrl from '../../assets/dotted/think-lottie/doc.json?url'
import thinkEyesAnimationUrl from '../../assets/dotted/think-lottie/eyes.json?url'
import thinkGlassAnimationUrl from '../../assets/dotted/think-lottie/glass.json?url'
import thinkPenAnimationUrl from '../../assets/dotted/think-lottie/pen.json?url'
import thinkPreviewAnimationUrl from '../../assets/dotted/think-lottie/preview.json?url'
import thinkStarAnimationUrl from '../../assets/dotted/think-lottie/star.json?url'
import './ProcessIndicator.css'

export type ProcessIndicatorKind =
  | 'reading'
  | 'insight'
  | 'thinking'
  | 'document'
  | 'review'
  | 'search'
  | 'tool-call'
  | 'highlight'
  | 'complete'

const animationUrlByKind: Record<Exclude<ProcessIndicatorKind, 'complete'>, string> = {
  reading: thinkBookAnimationUrl,
  insight: thinkBulbAnimationUrl,
  thinking: thinkCloudAnimationUrl,
  document: thinkDocAnimationUrl,
  review: thinkEyesAnimationUrl,
  search: thinkGlassAnimationUrl,
  'tool-call': thinkPenAnimationUrl,
  highlight: thinkStarAnimationUrl,
}

export function ProcessIndicator({
  kind,
  playing = true,
  loop = true,
  className,
  label,
}: {
  kind: ProcessIndicatorKind
  playing?: boolean
  loop?: boolean
  className?: string
  label?: string
}) {
  const classes = ['process-indicator', `process-indicator--${kind}`, className]
    .filter(Boolean)
    .join(' ')

  if (kind === 'complete') {
    return (
      <span
        className={classes}
        role={label ? 'img' : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        <img src={thinkCheckComplete} alt="" />
      </span>
    )
  }

  return (
    <LottiePlayer
      src={animationUrlByKind[kind]}
      playing={playing}
      loop={loop}
      className={classes}
      label={label}
    />
  )
}

export function ProcessIndicatorOverview({
  playing = true,
  className,
}: {
  playing?: boolean
  className?: string
}) {
  return (
    <LottiePlayer
      src={thinkPreviewAnimationUrl}
      playing={playing}
      loop
      className={['process-indicator-overview', className].filter(Boolean).join(' ')}
      label="过程状态动画总览"
    />
  )
}

function LottiePlayer({
  src,
  playing,
  loop,
  className,
  label,
}: {
  src: string
  playing: boolean
  loop: boolean
  className: string
  label?: string
}) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!containerRef.current) return undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shouldPlay = playing && !reduceMotion
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay: shouldPlay,
      path: src,
    })
    const stopAtFirstFrame = () => animation.goToAndStop(0, true)

    if (!shouldPlay) {
      stopAtFirstFrame()
      animation.addEventListener('DOMLoaded', stopAtFirstFrame)
    }

    return () => {
      if (!shouldPlay) {
        animation.removeEventListener('DOMLoaded', stopAtFirstFrame)
      }
      animation.destroy()
    }
  }, [loop, playing, src])

  return (
    <span
      ref={containerRef}
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
