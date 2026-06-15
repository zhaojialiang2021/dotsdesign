import type { ReactNode } from 'react'
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
  return (
    <DotsMessage role={role} contentType="text" className={className}>
      <div className={`dots-message-bubble dots-message-bubble--${role}`}>
        {children}
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
