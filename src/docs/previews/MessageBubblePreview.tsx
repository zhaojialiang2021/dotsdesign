import { DotsGeneratedCard } from '../../screens/dotted/DotsGeneratedCard'
import { DotsMessage, DotsMessageBubble } from '../../screens/dotted/DotsMessageBubble'

export function MessageBubblePreview() {
  return (
    <div className="docs-stage">
      <div className="docs-stage__caption">DotsMessageBubble · Live</div>
      <div className="docs-stage__inner">
        <div
          className="dots-message-surface"
          style={{
            width: 393,
            boxSizing: 'border-box',
            padding: 20,
            borderRadius: 24,
            background: 'var(--dots-bg, var(--bg-1))',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <DotsMessageBubble role="user">黑绷带面霜怎么用比较好？</DotsMessageBubble>
          <DotsMessageBubble role="user" hasTail>
            我想晚上厚涂，但又怕太闷。{'\n'}这个能每天用吗？
          </DotsMessageBubble>
          <DotsMessageBubble role="dots">可以，我按用量、手法和频率给你整理一下。</DotsMessageBubble>
          <DotsMessageBubble role="dots" hasTail>
            核心是少量预热后按压上脸。{'\n'}健康肌肤一周3-4次就够。
          </DotsMessageBubble>
          <DotsMessage role="dots" contentType="ai-card">
            <DotsGeneratedCard />
          </DotsMessage>
        </div>
      </div>
    </div>
  )
}
