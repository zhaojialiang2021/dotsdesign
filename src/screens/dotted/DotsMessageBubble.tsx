import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import dotsMessageTail from '../../assets/dotted/dots-message-tail.svg'
import dotsMessageTailUser from '../../assets/dotted/dots-message-tail-user.svg'

export type DotsMessageRole = 'user' | 'dots'
export type DotsMessageContentType = 'text' | 'ai-card'

export function DotsMessage({
  role,
  contentType = 'text',
  children,
  className = '',
}: {
  role: DotsMessageRole
  contentType?: DotsMessageContentType
  children: ReactNode
  className?: string
}) {
  const rowClassName = [
    'dots-message-row',
    `dots-message-row--${role}`,
    `dots-message-row--${contentType}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={rowClassName}>{children}</div>
}

export function DotsMessageBubble({
  role,
  children,
  hasTail = false,
  className = '',
}: {
  role: DotsMessageRole
  children: ReactNode
  hasTail?: boolean
  className?: string
}) {
  const contentRef = useRef<HTMLSpanElement>(null)
  const [isMultiLine, setIsMultiLine] = useState(false)

  useLayoutEffect(() => {
    const content = contentRef.current
    if (!content) return undefined

    const updateLineState = () => {
      const lineRects = Array.from(content.getClientRects()).filter((rect) => rect.width > 0 && rect.height > 0)
      setIsMultiLine(lineRects.length > 1)
    }

    const frame = window.requestAnimationFrame(updateLineState)
    const resizeObserver = new ResizeObserver(updateLineState)
    resizeObserver.observe(content)

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
    }
  }, [children])

  const bubbleClassName = [
    'dots-message-bubble',
    `dots-message-bubble--${role}`,
    isMultiLine ? 'dots-message-bubble--multi-line' : 'dots-message-bubble--single-line',
  ].join(' ')

  return (
    <DotsMessage role={role} contentType="text" className={className}>
      <div className={bubbleClassName}>
        <span className="dots-message-bubble__content" ref={contentRef}>{children}</span>
        {hasTail && (
          <img
            className={`dots-message-tail dots-message-tail--${role}`}
            src={role === 'user' ? dotsMessageTailUser : dotsMessageTail}
            alt=""
            aria-hidden="true"
            draggable={false}
          />
        )}
      </div>
    </DotsMessage>
  )
}
