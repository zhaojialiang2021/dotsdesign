import { useCallback, useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode, type RefObject, type UIEvent as ReactUIEvent, type WheelEvent as ReactWheelEvent } from 'react'
import lottie from 'lottie-web'
import thinkAddCircle from '../assets/dotted/think-add-circle.svg'
import thinkBack from '../assets/dotted/think-back.svg'
import thinkCamera from '../assets/dotted/think-camera.svg'
import thinkCloudAnimationUrl from '../assets/dotted/think-lottie/cloud.json?url'
import thinkDescending from '../assets/dotted/think-descending.svg'
import thinkGlassAnimationUrl from '../assets/dotted/think-lottie/glass.json?url'
import thinkPenAnimationUrl from '../assets/dotted/think-lottie/pen.json?url'
import thinkInternet from '../assets/dotted/think-internet.svg'
import thinkMessageVoice from '../assets/dotted/think-message-voice.svg'
import thinkMore from '../assets/dotted/think-more.svg'
import thinkNoteSingle from '../assets/dotted/think-note-single.svg'
import thinkResponseArrow from '../assets/dotted/think-response-arrow.svg'
import thinkResponseAvatar1 from '../assets/dotted/think-response-avatar-1.png'
import thinkResponseAvatar2 from '../assets/dotted/think-response-avatar-2.png'
import thinkResponseCopy from '../assets/dotted/think-response-copy.svg'
import thinkResponseDislike from '../assets/dotted/think-response-dislike.svg'
import thinkResponseRefresh from '../assets/dotted/think-response-refresh.svg'
import thinkResponseShare from '../assets/dotted/think-response-share.svg'
import thinkStatusCap from '../assets/dotted/think-status-cap.svg'
import thinkStatusCellular from '../assets/dotted/think-status-cellular.svg'
import thinkStatusWifi from '../assets/dotted/think-status-wifi.svg'
import sourceImage1 from '../assets/dotted/source-image-1.png'
import sourceImage2 from '../assets/dotted/source-image-2.png'
import sourceImage3 from '../assets/dotted/source-image-3.png'
import sourceImageSailormmoon1 from '../assets/dotted/source-image-sailormmoon-1.png'
import sourceImageSailormmoon2 from '../assets/dotted/source-image-sailormmoon-2.png'
import sourceImageSailormmoon3 from '../assets/dotted/source-image-sailormmoon-3.png'
import sourceLike from '../assets/dotted/source-like.svg'
import sourceLogoAlice from '../assets/dotted/source-logo-alice.png'
import sourceLogoBreeze from '../assets/dotted/source-logo-breeze.png'
import sourceLogoSailormmoon from '../assets/dotted/source-logo-sailormmoon.png'
import sourceLogoYt from '../assets/dotted/source-logo-yt.png'
import sourceQuote from '../assets/dotted/source-quote.svg'
import thinkUserAvatar from '../assets/dotted/think-user-avatar.svg'
import { DotsMessageBubble, type DotsMessageRole } from './dotted/DotsMessageBubble'

export type DottedDemoMode = 'default' | 'streaming-reply'
export type DottedDemoStep = 'thinking' | 'judging-think' | 'context' | 'think' | 'toolcall' | 'think-compact' | 'toolcall-search' | 'think-plan' | 'response' | 'complete'
export type DottedThinkingTransitionStyle = 'soft' | 'float' | 'blur' | 'breathe'
export type DottedStreamingVariant = 'default' | 'span-mask'
type DottedProcessKind = 'think' | 'toolcall' | 'thinkCompact' | 'toolcallSearch' | 'thinkPlan'

type DotsHistoryMessage = {
  id: string
  type: 'message'
  role: DotsMessageRole
  text: string
  isThinking?: boolean
  isJudging?: boolean
  isJudgingHold?: boolean
  isDeepThinking?: boolean
  isDeepThinkingTitleComplete?: boolean
  isStreaming?: boolean
  thinkingStageIndex?: number
  thinkingProgress?: number
  deepThinkingTitle?: string
  deepThinkingBody?: string
  deepThinkingTitleProgress?: number
  deepThinkingKind?: DottedProcessKind
  previousDeepThinkingTitle?: string
  previousDeepThinkingBody?: string
  previousDeepThinkingKind?: DottedProcessKind
  isFinalResponse?: boolean
  isFinalResponseComplete?: boolean
}

type DotsHistoryItem = DotsHistoryMessage
type DottedSheetMode = 'thinking' | 'sources'

const getDeepThinkingWidth = (kind: DottedProcessKind | undefined, progress = 1) => (
  kind === 'thinkCompact' ? 52 + 180 * progress : 52 + 309 * progress
)

type DottedProcessRow = {
  kind?: DottedProcessKind
  icon: string
  title: string
  detail: string
  last?: boolean
  lottieUrl?: string
  lottiePlaying?: boolean
}

const streamingReplyChunks = [
  '上海三天、轻松节奏、预算不设限，',
  '那就往“慢而精”的方向做：',
  '先把当前的顶级去处捞出来，排成一条动线。',
]

const streamingReplyTextFull = streamingReplyChunks.join('')
const streamingReplyCharacters = Array.from(streamingReplyTextFull)
const simpleJudgmentText = '正在构思上海三日行程安排与景点推荐'
const simpleJudgmentCharacters = Array.from(simpleJudgmentText)
const deepThinkingTitleText = '上海三日行程，融合奢华餐饮与住宿选项'
const deepThinkingBodyText = '考虑到这些地点在城市中的分布较散，加上本次旅行本身偏向奢华出行语境，使用专车或私家车作为主要交通方式会更合理。'
const toolCallTitleText = '整合酒店建议、天气提示与预定指南'
const toolCallBodyText = '在行程主线方面，我计划将苏州河畔的宝格丽酒店作为前两晚的主要下榻地。其修复后的 1930 年代商会大楼，以及 Antonio Citterio 操刀的室内设计，都非常符合他对设计感的偏好。第 3 天则将养云安缦作为一个可选的禅意隐居式体验，不过核心行程仍会保持在市中心，方便抵达与游览。'
const compactThinkTitleText = '浏览旅行目的地与预定信息'
const searchToolCallTitleText = '搜索上海酒店真实入住体验'
const searchToolCallBodyText = [
  '笔记｜古北 老钱 希尔顿 三合一体验',
  '笔记｜上海璞丽酒店入住体验',
  '网页｜马蜂窝：上海宝格丽｜月下的仲秋雅集',
  '网页｜携程：上海嘉佩乐酒店住上5层独栋小楼了！',
  '更多内容检索中...',
].join('\n')
const planThinkTitleText = '现在为用户创建一份3天的奢华行程安排'
const planThinkBodyText = '包括宝格丽酒店住宿、Ultraviolet晚餐和新荣记等高端体验，核心思路不是“景点打卡”，而是：老上海建筑肌理 + 当代艺术 + 顶级酒店体验 + 私人专车 + 稀缺餐厅。'
const finalResponseText = [
  '上海的顶配玩法我给你排好了，一条“外滩 → 法租界 → 西岸 → 安缦养云”的动线，越走越松弛，最后一天直接归隐郊野。先上地图，行程细节和订位提醒在下面。\n',
  '',
  '🏠 住哪里',
  '我把大本营放在宝格丽：苏州河畔、Antonio Citterio 设计，楼下就是米其林 Il Ristorante Niko Romito 和顶级 SPA。两个同级备选看气质：半岛是外滩老派奢华的天花板；建业里嘉佩乐则是法租界石库门独栋别墅，适合第二天直接下楼慢逛。\n',
  '',
  '📒 必须提前订的三样',
  'Ultraviolet：全球仅 10 个位子的沉浸式三星，人均六千往上，通常要提前数周放位。订不到的话，Day 2 晚上需要整体重排。',
  '8½ Otto e Mezzo Bombana：上海二星意大利菜，提前一周订窗景位。',
  '安缦养云：房量少，第三天如果要住一晚，越早订越好。\n',
  '',
  '几个可换的选项',
  '晚餐不想连着吃西餐，Day 1 可换新荣记、福和慧；想再加一顿，Da Vittorio 也很稳。\n',
  '',
  '两个实用提醒',
  '七月的上海又闷又晒，正午尽量安排在室内，把外滩和法租界的步行放到傍晚。全程建议订一辆专车带司机，法租界到西岸这条线打车会来回折腾，有车才谈得上轻松。',
].join('\n')
const finalResponseBlocks = [
  { type: 'paragraph', text: '上海的顶配玩法我给你排好了，一条“外滩 → 法租界 → 西岸 → 安缦养云”的动线，越走越松弛，最后一天直接归隐郊野。先上地图，行程细节和订位提醒在下面。' },
  { type: 'heading', text: '🏠 住哪里' },
  { type: 'paragraph', text: '我把大本营放在宝格丽：苏州河畔、Antonio Citterio 设计，楼下就是米其林 Il Ristorante Niko Romito 和顶级 SPA。两个同级备选看气质：半岛是外滩老派奢华的天花板；建业里嘉佩乐则是法租界石库门独栋别墅，适合第二天直接下楼慢逛。' },
  { type: 'heading', text: '📒 必须提前订的三样' },
  { type: 'bullet', text: 'Ultraviolet：全球仅 10 个位子的沉浸式三星，人均六千往上，通常要提前数周放位。订不到的话，Day 2 晚上需要整体重排。' },
  { type: 'bullet', text: '8½ Otto e Mezzo Bombana：上海二星意大利菜，提前一周订窗景位。' },
  { type: 'bullet', text: '安缦养云：房量少，第三天如果要住一晚，越早订越好。' },
  { type: 'heading', text: '几个可换的选项' },
  { type: 'paragraph', text: '晚餐不想连着吃西餐，Day 1 可换新荣记、福和慧；想再加一顿，Da Vittorio 也很稳。' },
  { type: 'heading', text: '两个实用提醒' },
  { type: 'paragraph', text: '七月的上海又闷又晒，正午尽量安排在室内，把外滩和法租界的步行放到傍晚。全程建议订一辆专车带司机，法租界到西岸这条线打车会来回折腾，有车才谈得上轻松。' },
] as const
const finalResponseSections = [
  { blocks: [0], list: false },
  { blocks: [1, 2], list: false },
  { blocks: [3, 4, 5, 6], list: true },
  { blocks: [7, 8], list: false },
  { blocks: [9, 10], list: false },
] as const

const countCharacters = (text: string) => Array.from(text).length

function getStreamSpanIndex(characterOffset: number) {
  return Math.floor(characterOffset / 14)
}

function DottedStreamingSpanText({
  text,
  spanKey,
  enabled,
  spanStartIndex = 0,
}: {
  text: string
  spanKey: string
  enabled: boolean
  spanStartIndex?: number
}) {
  if (!enabled) return text

  const characters = Array.from(text)
  const segments: string[] = []
  for (let index = 0; index < characters.length; index += 14) {
    segments.push(characters.slice(index, index + 14).join(''))
  }

  return (
    <>
      {segments.map((segment, index) => (
        <span
          className="dotted-demo__stream-span"
          key={`${spanKey}-${index}`}
          style={{ '--stream-span-index': spanStartIndex + index } as CSSProperties}
        >
          {segment}
        </span>
      ))}
    </>
  )
}

function DottedStreamingReveal({
  as = 'div',
  enabled,
  complete = false,
  className,
  children,
  ...restProps
}: {
  as?: 'div' | 'span'
  enabled: boolean
  complete?: boolean
  children: ReactNode
} & HTMLAttributes<HTMLDivElement | HTMLSpanElement>) {
  const revealRef = useRef<HTMLDivElement | HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const completeRef = useRef(complete)

  useEffect(() => {
    completeRef.current = complete
  }, [complete])

  useEffect(() => {
    if (!enabled) return undefined

    const container = revealRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!container || !canvas || !context) return undefined

    let animationFrame = 0
    let lastTimestamp = 0
    let smoothY = 0
    let fadeCanvas: HTMLCanvasElement | null = null
    let fadeHeight = 81
    let canvasWidth = 0
    let canvasHeight = 0
    let isDone = false

    const prepareCanvas = () => {
      const rect = container.getBoundingClientRect()
      const computedStyle = window.getComputedStyle(container)
      const parsedLineHeight = Number.parseFloat(computedStyle.lineHeight)
      const lineHeight = Number.isFinite(parsedLineHeight) ? parsedLineHeight : 27
      const width = Math.max(1, Math.ceil(rect.width))
      const height = Math.max(1200, Math.ceil(container.scrollHeight + lineHeight * 4))

      if (width === canvasWidth && height === canvasHeight && fadeCanvas) return

      canvasWidth = width
      canvasHeight = height
      fadeHeight = Math.max(1, Math.round(lineHeight * 3))
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      canvas.style.width = `${canvasWidth}px`
      canvas.style.height = `${canvasHeight}px`

      fadeCanvas = document.createElement('canvas')
      fadeCanvas.width = canvasWidth
      fadeCanvas.height = fadeHeight
      const fadeContext = fadeCanvas.getContext('2d')
      if (!fadeContext) return

      const imageData = fadeContext.createImageData(canvasWidth, fadeHeight)
      const data = imageData.data
      const contentLeft = Math.max(0, Number.parseFloat(computedStyle.paddingLeft) || 0)
      const textWidth = Math.max(1, canvasWidth - contentLeft - (Number.parseFloat(computedStyle.paddingRight) || 0))

      for (let py = 0; py < fadeHeight; py += 1) {
        const yRatio = py / fadeHeight
        for (let px = 0; px < canvasWidth; px += 1) {
          const xRatio = Math.max(0, Math.min(1, (px - contentLeft) / textWidth))
          const alpha = Math.min(1, (yRatio ** 0.7) * 0.72 + (xRatio ** 0.8) * 0.28)
          const index = (py * canvasWidth + px) * 4
          data[index] = 255
          data[index + 1] = 255
          data[index + 2] = 255
          data[index + 3] = Math.round(alpha * 255)
        }
      }
      fadeContext.putImageData(imageData, 0, 0)
    }

    const getTargetY = () => {
      const spans = container.querySelectorAll<HTMLElement>('.dotted-demo__stream-span')
      const lastSpan = spans[spans.length - 1]
      if (!lastSpan) return 0
      return lastSpan.offsetTop + lastSpan.offsetHeight
    }

    const drawMask = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const delta = Math.min((timestamp - lastTimestamp) / 1000, 0.08)
      lastTimestamp = timestamp

      prepareCanvas()

      const targetY = getTargetY()
      const alpha = 1 - 0.93 ** (delta * 60)
      smoothY += (targetY - smoothY) * alpha

      context.clearRect(0, 0, canvasWidth, canvasHeight)
      if (!completeRef.current || targetY - smoothY > 0.5) {
        if (fadeCanvas) context.drawImage(fadeCanvas, 0, Math.round(smoothY))
        const belowY = Math.round(smoothY) + fadeHeight
        if (belowY < canvasHeight) {
          context.fillStyle = '#ffffff'
          context.fillRect(0, belowY, canvasWidth, canvasHeight - belowY)
        }
        canvas.style.opacity = '1'
        isDone = false
      } else if (!isDone) {
        canvas.style.transition = 'opacity .4s'
        canvas.style.opacity = '0'
        isDone = true
      }

      animationFrame = window.requestAnimationFrame(drawMask)
    }

    canvas.style.transition = 'none'
    canvas.style.opacity = completeRef.current ? '0' : '1'
    context.fillStyle = '#ffffff'
    prepareCanvas()
    context.fillRect(0, 0, canvasWidth, canvasHeight)
    animationFrame = window.requestAnimationFrame(drawMask)

    return () => {
      window.cancelAnimationFrame(animationFrame)
    }
  }, [enabled])

  const revealClassName = ['dotted-demo__stream-reveal', className].filter(Boolean).join(' ')
  const setRevealRef = (node: HTMLDivElement | HTMLSpanElement | null) => {
    revealRef.current = node
  }

  if (as === 'span') {
    return (
      <span ref={setRevealRef} className={revealClassName} {...restProps}>
        {children}
        {enabled && <canvas ref={canvasRef} className="dotted-demo__stream-canvas" aria-hidden="true" />}
      </span>
    )
  }

  return (
    <div ref={setRevealRef} className={revealClassName} {...restProps}>
      {children}
      {enabled && <canvas ref={canvasRef} className="dotted-demo__stream-canvas" aria-hidden="true" />}
    </div>
  )
}
const sourceItems = [
  {
    author: 'Yt',
    logo: sourceLogoYt,
    title: '可是上海就是不缺有意思的地方啊',
    excerpt: [
      '预算无上限的上海三日旅行，主打一个“极致体验、',
      '深度沉浸、舒适不赶路”。这条路线融合了魔都的百年风华、梧桐区的文艺腔调以及顶奢的食宿享受，让你全方位感受上海的独特魅力。',
    ],
    images: [sourceImage1, sourceImage2, sourceImage3],
    sourceType: '笔记',
    likes: '2387',
  },
  {
    author: 'sailormmoon',
    logo: sourceLogoSailormmoon,
    title: '上海宝格丽妥妥top1',
    excerpt: ['上海宝格丽服务真的太好了，一分钱真一分货'],
    images: [sourceImageSailormmoon1, sourceImageSailormmoon2, sourceImageSailormmoon3],
    sourceType: '笔记',
    likes: '2387',
  },
  {
    author: 'alice',
    logo: sourceLogoAlice,
    excerpt: [
      '上海的奢华旅行早已超越了单纯的“买买买”，更在于',
      '对极致空间、私密体验和在地文化的深度探索。为你整理了一份涵盖顶奢住宿、米其林美食与私密体验的魔都高奢指南。',
    ],
    sourceType: '评论',
    likes: '2387',
  },
  {
    author: 'Breeze',
    logo: sourceLogoBreeze,
    excerpt: [
      '上海的Fine Dining 极具竞争力，从隐秘的本帮菜公',
      '馆到全球顶尖的创意料理，每一口都是美学。',
    ],
    sourceType: '评论',
    likes: '2387',
  },
] as const
const deepThinkingTitleCharacters = Array.from(deepThinkingTitleText)
const deepThinkingBodyCharacters = Array.from(deepThinkingBodyText)
const toolCallTitleCharacters = Array.from(toolCallTitleText)
const toolCallBodyCharacters = Array.from(toolCallBodyText)
const compactThinkTitleCharacters = Array.from(compactThinkTitleText)
const searchToolCallTitleCharacters = Array.from(searchToolCallTitleText)
const searchToolCallBodyCharacters = Array.from(searchToolCallBodyText)
const planThinkTitleCharacters = Array.from(planThinkTitleText)
const planThinkBodyCharacters = Array.from(planThinkBodyText)
const finalResponseCharacters = Array.from(finalResponseText)
const processTransitionDelayMs = 1000

const thinkingStages = [
  { label: '判断中...', animationUrl: thinkCloudAnimationUrl },
  { label: '工具调用中...', animationUrl: thinkPenAnimationUrl },
  { label: '检索中...', animationUrl: thinkGlassAnimationUrl },
]

function DottedToolSearchRows({
  text,
  streamingVariant = 'default',
  spanStartIndex = 0,
}: {
  text: string
  streamingVariant?: DottedStreamingVariant
  spanStartIndex?: number
}) {
  const useSpanMask = streamingVariant === 'span-mask'
  const rows = text.split('\n').filter(Boolean).reduce<Array<{ line: string; visibleLine: string; spanStartIndex: number }>>((result, line) => {
    const visibleLine = line.replace('笔记｜', '').replace('网页｜', '')
    const previousCharacters = result.reduce((total, row) => total + countCharacters(row.visibleLine), 0)
    return [
      ...result,
      {
        line,
        visibleLine,
        spanStartIndex: spanStartIndex + getStreamSpanIndex(previousCharacters),
      },
    ]
  }, [])

  return (
    <span className="dotted-demo__thinking-search-list">
      {rows.map(({ line, visibleLine, spanStartIndex: currentSpanStartIndex }, index) => {
        if (line.startsWith('笔记｜')) {
          return (
            <span className="dotted-demo__thinking-search-row" key={`${line}-${index}`}>
              <span className="dotted-demo__thinking-search-source">
                <img src={thinkNoteSingle} alt="" aria-hidden="true" />
                <span>笔记</span>
              </span>
              <span className="dotted-demo__thinking-search-divider" aria-hidden="true" />
              <span className="dotted-demo__thinking-search-text">
                <DottedStreamingSpanText text={visibleLine} spanKey={`search-${index}`} enabled={useSpanMask} spanStartIndex={currentSpanStartIndex} />
              </span>
            </span>
          )
        }

        if (line.startsWith('网页｜')) {
          return (
            <span className="dotted-demo__thinking-search-row" key={`${line}-${index}`}>
              <span className="dotted-demo__thinking-search-source dotted-demo__thinking-search-source--web">
                <img src={thinkInternet} alt="" aria-hidden="true" />
              </span>
              <span className="dotted-demo__thinking-search-text">
                <DottedStreamingSpanText text={visibleLine} spanKey={`search-${index}`} enabled={useSpanMask} spanStartIndex={currentSpanStartIndex} />
              </span>
            </span>
          )
        }

        return (
          <span className="dotted-demo__thinking-search-row dotted-demo__thinking-search-row--plain" key={`${line}-${index}`}>
            <span className="dotted-demo__thinking-search-text">
              <DottedStreamingSpanText text={visibleLine} spanKey={`search-${index}`} enabled={useSpanMask} spanStartIndex={currentSpanStartIndex} />
            </span>
          </span>
        )
      })}
    </span>
  )
}

function DottedLottieAnimation({
  src,
  className,
  loop = true,
  play = true,
}: {
  src: string
  className?: string
  loop?: boolean
  play?: boolean
}) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!containerRef.current) return undefined

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay: play,
      path: src,
    })
    const stopAtFirstFrame = () => {
      animation.goToAndStop(0, true)
    }
    if (!play) {
      stopAtFirstFrame()
      animation.addEventListener('DOMLoaded', stopAtFirstFrame)
    }

    return () => {
      if (!play) {
        animation.removeEventListener('DOMLoaded', stopAtFirstFrame)
      }
      animation.destroy()
    }
  }, [loop, play, src])

  return <span ref={containerRef} className={className} aria-hidden="true" />
}

function DottedChatStream({
  items,
  streamRef,
  onSourcesClick,
  onThinkingClick,
  thinkingTransitionStyle = 'soft',
  streamingVariant = 'default',
}: {
  items: DotsHistoryItem[]
  streamRef?: RefObject<HTMLDivElement | null>
  onSourcesClick?: () => void
  onThinkingClick?: () => void
  thinkingTransitionStyle?: DottedThinkingTransitionStyle
  streamingVariant?: DottedStreamingVariant
}) {
  const useSpanMask = streamingVariant === 'span-mask'
  const handleThinkingKeyDown = (event: ReactKeyboardEvent<HTMLSpanElement>) => {
    if (!onThinkingClick) return
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    onThinkingClick()
  }

  return (
    <div className="dotted-demo__chat-stream" aria-label="Dots 历史消息" ref={streamRef}>
      {items.map((item) => {
        const messageClassName = [
          item.isThinking ? 'dots-message-row--thinking' : '',
          item.isJudging ? 'dots-message-row--judging' : '',
          item.isJudgingHold ? 'dots-message-row--judging-hold' : '',
          item.isDeepThinking ? 'dots-message-row--deep-thinking' : '',
          item.isStreaming ? 'dots-message-row--streaming' : '',
        ]
          .filter(Boolean)
          .join(' ')

        return (
          item.isFinalResponse ? (
            <div key={item.id} className="dots-message-row dots-message-row--dots dots-message-row--response">
              <DottedFinalResponseCard complete={item.isFinalResponseComplete} onSourcesClick={onSourcesClick} streamingVariant={streamingVariant}>{item.text}</DottedFinalResponseCard>
            </div>
          ) : (
            <DotsMessageBubble key={item.id} role={item.role} className={messageClassName}>
              {item.isThinking ? (
              <DottedStreamingReveal
                as="span"
                enabled={useSpanMask}
                complete={item.isDeepThinking ? item.isDeepThinkingTitleComplete : item.isJudgingHold}
                key={item.id}
                className={[
                  'dotted-demo__thinking',
                  item.isDeepThinking ? `dotted-demo__thinking--transition-${thinkingTransitionStyle}` : '',
                  item.isDeepThinking ? 'dotted-demo__thinking--clickable' : '',
                  item.isJudging ? 'dotted-demo__thinking--judging' : '',
                  item.isJudgingHold ? 'dotted-demo__thinking--judging-hold' : '',
                  item.isDeepThinking ? 'dotted-demo__thinking--deep' : '',
                  item.deepThinkingKind === 'toolcall' ? 'dotted-demo__thinking--toolcall' : '',
                  item.deepThinkingKind === 'thinkCompact' ? 'dotted-demo__thinking--think-compact' : '',
                  item.deepThinkingKind === 'toolcallSearch' ? 'dotted-demo__thinking--toolcall-search' : '',
                  item.deepThinkingKind === 'thinkPlan' ? 'dotted-demo__thinking--think-plan' : '',
                  item.isDeepThinkingTitleComplete ? 'dotted-demo__thinking--deep-title-complete' : '',
                ].filter(Boolean).join(' ')}
                role={item.isDeepThinking ? 'button' : undefined}
                tabIndex={item.isDeepThinking ? 0 : undefined}
                onClick={item.isDeepThinking ? onThinkingClick : undefined}
                onKeyDown={item.isDeepThinking ? handleThinkingKeyDown : undefined}
                aria-label={item.text || '判断中'}
                style={
                  item.isDeepThinking
                    ? ({
                        '--thinking-deep-width': `${getDeepThinkingWidth(item.deepThinkingKind, item.deepThinkingTitleProgress ?? 0)}px`,
                      } as CSSProperties)
                    : item.isJudging
                    ? ({
                        '--thinking-width': `${52 + 251 * (item.thinkingProgress ?? 0)}px`,
                        '--thinking-copy-width': `${243 * (item.thinkingProgress ?? 0)}px`,
                      } as CSSProperties)
                    : undefined
                }
              >
                <DottedLottieAnimation
                  src={thinkingStages[item.deepThinkingKind === 'toolcallSearch' ? 2 : item.deepThinkingKind === 'toolcall' ? 1 : item.thinkingStageIndex ?? 0].animationUrl}
                  className="dotted-demo__thinking-lottie"
                />
                {item.isDeepThinking ? (
                  <>
                    <span className="dotted-demo__thinking-deep-title">
                      <DottedStreamingSpanText text={item.deepThinkingTitle ?? ''} spanKey={`${item.id}-title`} enabled={useSpanMask} />
                    </span>
                    {item.deepThinkingKind === 'toolcallSearch' ? (
                      <DottedToolSearchRows text={item.deepThinkingBody ?? ''} streamingVariant={streamingVariant} spanStartIndex={getStreamSpanIndex(countCharacters(item.deepThinkingTitle ?? ''))} />
                    ) : (
                      <span className="dotted-demo__thinking-deep-body">
                        <DottedStreamingSpanText text={item.deepThinkingBody ?? ''} spanKey={`${item.id}-body`} enabled={useSpanMask} spanStartIndex={getStreamSpanIndex(countCharacters(item.deepThinkingTitle ?? ''))} />
                      </span>
                    )}
                  </>
                ) : (
                  item.isJudging && (
                    <span className="dotted-demo__thinking-copy">
                      <DottedStreamingSpanText text={item.text} spanKey={`${item.id}-judging`} enabled={useSpanMask} />
                    </span>
                  )
                )}
              </DottedStreamingReveal>
              ) : item.isStreaming ? (
                <DottedStreamingReveal
                  as="span"
                  enabled={useSpanMask}
                  complete={item.text.length >= streamingReplyTextFull.length}
                  className="dotted-demo__streaming-text"
                >
                  <DottedStreamingSpanText text={item.text} spanKey={`${item.id}-streaming`} enabled={useSpanMask} />
                </DottedStreamingReveal>
              ) : (
                item.text
              )}
            </DotsMessageBubble>
          )
        )
      })}
    </div>
  )
}

function getProcessAnimationUrl(kind: DottedProcessKind) {
  if (kind === 'toolcallSearch') return thinkGlassAnimationUrl
  if (kind === 'toolcall') return thinkPenAnimationUrl
  return thinkCloudAnimationUrl
}

function getThinkingProcessRows({
  currentKind,
  currentTitle,
  currentBody,
  isThinkingComplete,
}: {
  currentKind: DottedProcessKind
  currentTitle: string
  currentBody: string
  isThinkingComplete: boolean
}): DottedProcessRow[] {
  const baseRows: Array<DottedProcessRow & { kind: DottedProcessKind }> = [
    {
      kind: 'think',
      icon: '💭',
      title: deepThinkingTitleText,
      detail: deepThinkingBodyText,
    },
    {
      kind: 'toolcall',
      icon: '✍️',
      title: toolCallTitleText,
      detail: toolCallBodyText,
    },
    {
      kind: 'thinkCompact',
      icon: '💭',
      title: compactThinkTitleText,
      detail: '',
    },
    {
      kind: 'toolcallSearch',
      icon: '🔍',
      title: searchToolCallTitleText,
      detail: searchToolCallBodyText,
    },
    {
      kind: 'thinkPlan',
      icon: '💭',
      title: planThinkTitleText,
      detail: planThinkBodyText,
    },
  ]
  const currentIndex = Math.max(0, baseRows.findIndex((row) => row.kind === currentKind))

  return baseRows.slice(0, currentIndex + 1).map((row, index, rows) => {
    const isCurrent = index === rows.length - 1
    return {
      ...row,
      title: isCurrent ? currentTitle || row.title : row.title,
      detail: isCurrent ? currentBody || row.detail : row.detail,
      last: true,
      lottieUrl: getProcessAnimationUrl(row.kind),
      lottiePlaying: isCurrent && !isThinkingComplete,
    }
  }).map((row, index, rows) => ({
    ...row,
    last: index === rows.length - 1,
  }))
}

function DottedFinalResponseCard({
  children,
  complete = false,
  onSourcesClick,
  streamingVariant = 'default',
}: {
  children: ReactNode
  complete?: boolean
  onSourcesClick?: () => void
  streamingVariant?: DottedStreamingVariant
}) {
  const streamedText = String(children)
  const visibleCount = Array.from(streamedText).length
  const useSpanMask = streamingVariant === 'span-mask'

  return (
    <article className="dotted-demo__response-card" aria-label="Dots 最终回答">
      <div className="dotted-demo__response-main">
        <button className="dotted-demo__response-status" type="button" onClick={onSourcesClick}>
          <span>参考小红书与全网内容</span>
          <span className="dotted-demo__response-avatars" aria-hidden="true">
            <img src={thinkResponseAvatar1} alt="" />
            <img src={thinkResponseAvatar2} alt="" />
          </span>
          <img className="dotted-demo__response-arrow" src={thinkResponseArrow} alt="" aria-hidden="true" />
        </button>
        <DottedStreamingReveal
          enabled={useSpanMask}
          complete={complete}
          className="dotted-demo__response-content"
        >
          {finalResponseSections.map((section, sectionIndex) => {
            const renderedBlocks = section.blocks.map((blockIndex) => {
              const block = finalResponseBlocks[blockIndex]
              const blockLength = Array.from(block.text).length
              const previousLength = finalResponseBlocks
                .slice(0, blockIndex)
                .reduce((total, previousBlock) => total + Array.from(previousBlock.text).length, 0)
              const visibleLength = Math.max(0, Math.min(visibleCount - previousLength, blockLength))
              const visibleText = Array.from(block.text).slice(0, visibleLength).join('')
              if (!visibleText) return null

              if (block.type === 'heading') {
                return (
                  <h3 key={`${block.type}-${blockIndex}`}>
                    <DottedStreamingSpanText text={visibleText} spanKey={`${block.type}-${blockIndex}`} enabled={useSpanMask} spanStartIndex={getStreamSpanIndex(previousLength)} />
                  </h3>
                )
              }

              if (block.type === 'bullet') {
                return (
                  <div className="dotted-demo__response-bullet" key={`${block.type}-${blockIndex}`}>
                    <span aria-hidden="true" />
                    <p>
                      <DottedStreamingSpanText text={visibleText} spanKey={`${block.type}-${blockIndex}`} enabled={useSpanMask} spanStartIndex={getStreamSpanIndex(previousLength)} />
                    </p>
                  </div>
                )
              }

              return (
                <p key={`${block.type}-${blockIndex}`}>
                  <DottedStreamingSpanText text={visibleText} spanKey={`${block.type}-${blockIndex}`} enabled={useSpanMask} spanStartIndex={getStreamSpanIndex(previousLength)} />
                </p>
              )
            }).filter(Boolean)

            if (!renderedBlocks.length) return null

            return (
              <section
                className={[
                  'dotted-demo__response-section',
                  section.list ? 'dotted-demo__response-section--list' : '',
                ].filter(Boolean).join(' ')}
                key={`section-${sectionIndex}`}
              >
                {renderedBlocks}
              </section>
            )
          })}
        </DottedStreamingReveal>
      </div>
      {complete && (
        <div className="dotted-demo__response-actions">
          <div className="dotted-demo__response-action-group">
            <button type="button" aria-label="复制">
              <img src={thinkResponseCopy} alt="" aria-hidden="true" />
            </button>
            <button type="button" aria-label="分享">
              <img src={thinkResponseShare} alt="" aria-hidden="true" />
            </button>
          </div>
          <div className="dotted-demo__response-action-group">
            <button type="button" aria-label="不喜欢">
              <img src={thinkResponseDislike} alt="" aria-hidden="true" />
            </button>
            <button type="button" aria-label="重新生成">
              <img src={thinkResponseRefresh} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </article>
  )
}

function DottedSourcesSheet({
  mode,
  onClose,
  currentThinkingKind,
  currentThinkingTitle,
  currentThinkingBody,
  isThinkingComplete,
}: {
  mode: DottedSheetMode
  onClose: () => void
  currentThinkingKind: DottedProcessKind
  currentThinkingTitle: string
  currentThinkingBody: string
  isThinkingComplete: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedProcessIndexes, setExpandedProcessIndexes] = useState<number[]>([])
  const dragStartYRef = useRef<number | null>(null)
  const sourceProcessRows: DottedProcessRow[] = [
    {
      kind: 'think',
      icon: '💭',
      title: deepThinkingTitleText,
      detail: deepThinkingBodyText,
      lottieUrl: thinkCloudAnimationUrl,
    },
    {
      kind: 'toolcall',
      icon: '✍️',
      title: toolCallTitleText,
      detail: toolCallBodyText,
      lottieUrl: thinkPenAnimationUrl,
    },
    {
      kind: 'thinkCompact',
      icon: '💭',
      title: compactThinkTitleText,
      detail: '',
      lottieUrl: thinkCloudAnimationUrl,
    },
    {
      kind: 'toolcallSearch',
      icon: '🔍',
      title: searchToolCallTitleText,
      detail: searchToolCallBodyText,
      lottieUrl: thinkGlassAnimationUrl,
    },
    {
      kind: 'thinkPlan',
      icon: '💭',
      title: planThinkTitleText,
      detail: planThinkBodyText,
      lottieUrl: thinkCloudAnimationUrl,
      last: true,
    },
  ]
  const thinkingProcessRows = getThinkingProcessRows({
    currentKind: currentThinkingKind,
    currentTitle: currentThinkingTitle,
    currentBody: currentThinkingBody,
    isThinkingComplete,
  })
  const processRows = mode === 'thinking' ? thinkingProcessRows : sourceProcessRows
  const sheetTitle = mode === 'thinking' ? (isThinkingComplete ? '思考结束' : '思考中') : '思考过程'
  const dialogLabel = mode === 'thinking' ? sheetTitle : '思考过程'

  const handleSheetPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('button')) return
    dragStartYRef.current = event.clientY
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const expandSheetFromDrag = () => {
    setIsExpanded(true)
  }

  const closeSheetFromDrag = () => {
    dragStartYRef.current = null
    onClose()
  }

  const handleSheetPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (dragStartYRef.current === null) return

    const deltaY = dragStartYRef.current - event.clientY
    if (deltaY < -96) {
      closeSheetFromDrag()
      return
    }

    if (!isExpanded && deltaY > 24) {
      expandSheetFromDrag()
    }
  }

  const handleSheetPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    if (dragStartYRef.current === null) return

    const deltaY = dragStartYRef.current - event.clientY
    dragStartYRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (deltaY < -96) {
      closeSheetFromDrag()
      return
    }

    if (deltaY > 32) {
      expandSheetFromDrag()
      return
    }
  }

  const handleSheetPointerCancel = (event: ReactPointerEvent<HTMLElement>) => {
    dragStartYRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const handleSheetWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!isExpanded && event.deltaY > 0) {
      setIsExpanded(true)
    }
  }

  const handleSheetContentScroll = (event: ReactUIEvent<HTMLDivElement>) => {
    if (!isExpanded && event.currentTarget.scrollTop > 0) {
      setIsExpanded(true)
    }
  }

  return (
    <div className="dotted-demo__sheet-layer" aria-modal="true" role="dialog" aria-label={dialogLabel}>
      <button className="dotted-demo__sheet-scrim" type="button" aria-label={`关闭${dialogLabel}`} onClick={onClose} />
      <section
        className={[
          'dotted-demo__sources-sheet',
          mode === 'thinking' ? 'dotted-demo__sources-sheet--thinking' : '',
          isExpanded ? 'dotted-demo__sources-sheet--expanded' : '',
        ].filter(Boolean).join(' ')}
        data-node-id={mode === 'thinking' ? '8:1257' : '12:1153'}
        onPointerDown={handleSheetPointerDown}
        onPointerMove={handleSheetPointerMove}
        onPointerUp={handleSheetPointerUp}
        onPointerCancel={handleSheetPointerCancel}
      >
        <div className="dotted-demo__sheet-grabber" aria-hidden="true">
          <span />
        </div>
        <div
          className="dotted-demo__sheet-content"
          onWheel={handleSheetWheel}
          onScroll={handleSheetContentScroll}
        >
          <div className="dotted-demo__sheet-block">
            <header className="dotted-demo__sheet-header">
              <h2>{sheetTitle}</h2>
            </header>
            <div className="dotted-demo__process-card">
              {processRows.map((row, index) => {
                const isRowExpanded = expandedProcessIndexes.includes(index)
                const hasExpandableContent = Boolean(row.detail)
                const rowContent = (
                  <>
                    <div className="dotted-demo__process-progress" aria-hidden="true">
                      <span className="dotted-demo__process-icon">
                        {row.lottieUrl ? (
                          <DottedLottieAnimation
                            src={row.lottieUrl}
                            className="dotted-demo__process-lottie"
                            play={row.lottiePlaying === true}
                          />
                        ) : row.icon}
                      </span>
                      {!row.last && <span className="dotted-demo__process-line" />}
                    </div>
                    <div className="dotted-demo__process-text">
                      <span className="dotted-demo__process-summary">
                        <span>{row.title}</span>
                        {mode === 'sources' && hasExpandableContent && (
                          <span
                            className={[
                              'dotted-demo__process-chevron',
                              isRowExpanded ? 'dotted-demo__process-chevron--open' : '',
                            ].filter(Boolean).join(' ')}
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      {(mode === 'thinking' || isRowExpanded) && row.detail && (
                        <span className="dotted-demo__process-detail-motion">
                          {row.kind === 'toolcallSearch' ? (
                            <DottedToolSearchRows text={row.detail} />
                          ) : (
                            <span className="dotted-demo__process-detail">
                              {row.detail}
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </>
                )

                return mode === 'thinking' || !hasExpandableContent ? (
                  <div
                    className={[
                      'dotted-demo__process-row',
                      'dotted-demo__process-row--static',
                    ].filter(Boolean).join(' ')}
                    key={`${row.title}-${index}`}
                  >
                    {rowContent}
                  </div>
                ) : (
                  <button
                    className={[
                      'dotted-demo__process-row',
                      isRowExpanded ? 'dotted-demo__process-row--expanded' : '',
                    ].filter(Boolean).join(' ')}
                    key={row.title}
                    type="button"
                    onClick={() => {
                      setExpandedProcessIndexes((current) => (
                        current.includes(index)
                          ? current.filter((expandedIndex) => expandedIndex !== index)
                          : [...current, index]
                      ))
                    }}
                  >
                    {rowContent}
                  </button>
                )
              })}
            </div>
          </div>

          {mode === 'sources' && <div className="dotted-demo__source-block">
            <div className="dotted-demo__source-sticky">
              <h3>参考来源 · 128</h3>
              <div className="dotted-demo__source-tabs" aria-label="来源筛选">
                <button type="button">全部</button>
                <button type="button">笔记 106</button>
                <button type="button">评论 16</button>
                <button type="button">全网 6</button>
              </div>
            </div>
            {sourceItems.map((item) => (
              <article className="dotted-demo__source-card" key={item.author}>
                <header className="dotted-demo__source-footer">
                  <span className="dotted-demo__source-logo">
                    <img src={item.logo} alt="" />
                  </span>
                  <span className="dotted-demo__source-name">{item.author}</span>
                </header>
                <div className="dotted-demo__source-copy">
                  {'title' in item && item.title && <h4>{item.title}</h4>}
                  <div className="dotted-demo__source-excerpt">
                    <div className="dotted-demo__source-excerpt-row">
                      <img src={sourceQuote} alt="" aria-hidden="true" />
                      <p>{item.excerpt[0]}</p>
                    </div>
                    {item.excerpt.slice(1).map((line) => (
                      <p className="dotted-demo__source-excerpt-line" key={line}>{line}</p>
                    ))}
                  </div>
                </div>
                {'images' in item && item.images && (
                  <div className="dotted-demo__source-images">
                    {item.images.map((imageUrl) => (
                      <img src={imageUrl} alt="" key={imageUrl} />
                    ))}
                    <span>共9张</span>
                  </div>
                )}
                <footer className="dotted-demo__source-meta">
                  <span>来自{item.sourceType} 2天前</span>
                  <span>
                    <img src={sourceLike} alt="" aria-hidden="true" />
                    {item.likes}
                  </span>
                </footer>
              </article>
            ))}
          </div>}
        </div>
      </section>
    </div>
  )
}

export function DottedDemoScreen({
  demoMode = 'default',
  demoStep,
  continueAfterStep = false,
  paused = false,
  resumeSignal = 0,
  onStepChange,
  thinkingTransitionStyle = 'float',
  streamingVariant = 'default',
}: {
  demoMode?: DottedDemoMode
  demoStep?: DottedDemoStep
  continueAfterStep?: boolean
  paused?: boolean
  resumeSignal?: number
  onStepChange?: (step: DottedDemoStep) => void
  thinkingTransitionStyle?: DottedThinkingTransitionStyle
  streamingVariant?: DottedStreamingVariant
} = {}) {
  const chatStreamRef = useRef<HTMLDivElement>(null)
  const jumpToBottomDismissedRef = useRef(false)
  const handledResumeSignalRef = useRef(0)
  const playbackSnapshotRef = useRef({
    phase: 'thinking' as 'thinking' | 'judging' | 'judgingHold' | 'streaming' | 'think' | 'thinkHold' | 'toolcall' | 'toolcallHold' | 'thinkCompact' | 'thinkCompactHold' | 'toolcallSearch' | 'toolcallSearchHold' | 'thinkPlan' | 'thinkPlanHold' | 'response' | 'done',
    simpleLength: 0,
    streamingLength: 0,
    deepTitleLength: 0,
    deepBodyLength: 0,
    finalResponseLength: 0,
  })
  const [simpleJudgmentReplyText, setSimpleJudgmentReplyText] = useState('')
  const [streamingReplyText, setStreamingReplyText] = useState('')
  const [deepThinkingTitle, setDeepThinkingTitle] = useState('')
  const [deepThinkingBody, setDeepThinkingBody] = useState('')
  const [finalResponseReplyText, setFinalResponseReplyText] = useState('')
  const [deepThinkingKind, setDeepThinkingKind] = useState<DottedProcessKind>('think')
  const [previousThinking, setPreviousThinking] = useState<{ kind: DottedProcessKind; title: string; body: string } | null>(null)
  const [streamingPhase, setStreamingPhase] = useState<'thinking' | 'judging' | 'judgingHold' | 'streaming' | 'think' | 'thinkHold' | 'toolcall' | 'toolcallHold' | 'thinkCompact' | 'thinkCompactHold' | 'toolcallSearch' | 'toolcallSearchHold' | 'thinkPlan' | 'thinkPlanHold' | 'response' | 'done'>('thinking')
  const [thinkingStageIndex, setThinkingStageIndex] = useState(0)
  const [showJumpToBottom, setShowJumpToBottom] = useState(false)
  const [activeSheetMode, setActiveSheetMode] = useState<DottedSheetMode | null>(null)
  const isStreamingReplyDemo = demoMode === 'streaming-reply'

  useEffect(() => {
    playbackSnapshotRef.current = {
      phase: streamingPhase,
      simpleLength: simpleJudgmentReplyText.length,
      streamingLength: streamingReplyText.length,
      deepTitleLength: deepThinkingTitle.length,
      deepBodyLength: deepThinkingBody.length,
      finalResponseLength: finalResponseReplyText.length,
    }
  }, [
    deepThinkingBody,
    deepThinkingTitle,
    finalResponseReplyText,
    simpleJudgmentReplyText,
    streamingPhase,
    streamingReplyText,
  ])

  useEffect(() => {
    if (!onStepChange) return

    const currentStep: DottedDemoStep =
      streamingPhase === 'judging' || streamingPhase === 'judgingHold'
        ? 'judging-think'
        : streamingPhase === 'streaming'
        ? 'context'
        : streamingPhase === 'think' || streamingPhase === 'thinkHold'
        ? 'think'
        : streamingPhase === 'toolcall' || streamingPhase === 'toolcallHold'
        ? 'toolcall'
        : streamingPhase === 'thinkCompact' || streamingPhase === 'thinkCompactHold'
        ? 'think-compact'
        : streamingPhase === 'toolcallSearch' || streamingPhase === 'toolcallSearchHold'
        ? 'toolcall-search'
        : streamingPhase === 'thinkPlan' || streamingPhase === 'thinkPlanHold'
        ? 'think-plan'
        : streamingPhase === 'response'
        ? 'response'
        : streamingPhase === 'done'
        ? 'complete'
        : 'thinking'

    onStepChange(currentStep)
  }, [onStepChange, streamingPhase])

  useEffect(() => {
    const timers: number[] = []
    const showPreviousThinking = (kind: DottedProcessKind, title: string, body = '') => {
      setPreviousThinking({ kind, title, body })
      timers.push(window.setTimeout(() => setPreviousThinking(null), 220))
    }
    const getProcessConfig = (kind: DottedProcessKind) => {
      if (kind === 'toolcall') return { titleCharacters: toolCallTitleCharacters, bodyCharacters: toolCallBodyCharacters, holdPhase: 'toolcallHold' as const }
      if (kind === 'thinkCompact') return { titleCharacters: compactThinkTitleCharacters, bodyCharacters: [], holdPhase: 'thinkCompactHold' as const }
      if (kind === 'toolcallSearch') return { titleCharacters: searchToolCallTitleCharacters, bodyCharacters: searchToolCallBodyCharacters, holdPhase: 'toolcallSearchHold' as const }
      if (kind === 'thinkPlan') return { titleCharacters: planThinkTitleCharacters, bodyCharacters: planThinkBodyCharacters, holdPhase: 'thinkPlanHold' as const }
      return { titleCharacters: deepThinkingTitleCharacters, bodyCharacters: deepThinkingBodyCharacters, holdPhase: 'thinkHold' as const }
    }
    const getNextProcessKind = (kind: DottedProcessKind): DottedProcessKind | 'response' => {
      if (kind === 'think') return 'toolcall'
      if (kind === 'toolcall') return 'thinkCompact'
      if (kind === 'thinkCompact') return 'toolcallSearch'
      if (kind === 'toolcallSearch') return 'thinkPlan'
      return 'response'
    }
    const runResponse = () => {
      let finalResponseCursor = 0
      setDeepThinkingTitle('')
      setDeepThinkingBody('')
      setFinalResponseReplyText('')
      setPreviousThinking(null)
      setStreamingPhase('response')

      const typeFinalResponseCharacter = () => {
        finalResponseCursor += 1
        setFinalResponseReplyText(finalResponseCharacters.slice(0, finalResponseCursor).join(''))
        if (finalResponseCursor >= finalResponseCharacters.length) {
          setStreamingPhase('done')
          return
        }

        timers.push(window.setTimeout(typeFinalResponseCharacter, 12))
      }

      typeFinalResponseCharacter()
    }
    const runProcessFromKind = (kind: DottedProcessKind, titleStart = 0, bodyStart = 0) => {
      let titleCursor = titleStart
      let bodyCursor = bodyStart
      const { titleCharacters, bodyCharacters, holdPhase } = getProcessConfig(kind)
      setDeepThinkingKind(kind)
      setDeepThinkingTitle(titleCharacters.slice(0, titleCursor).join(''))
      setDeepThinkingBody(bodyCharacters.slice(0, bodyCursor).join(''))
      setStreamingPhase(kind)

      const completeCurrentProcess = () => {
        setStreamingPhase(holdPhase)
        timers.push(window.setTimeout(() => {
          const nextKind = getNextProcessKind(kind)
          if (nextKind === 'response') {
            runResponse()
            return
          }

          showPreviousThinking(
            kind,
            titleCharacters.join(''),
            bodyCharacters.join(''),
          )
          runProcessFromKind(nextKind)
        }, processTransitionDelayMs))
      }

      const typeBodyCharacter = () => {
        bodyCursor += 1
        setDeepThinkingBody(bodyCharacters.slice(0, bodyCursor).join(''))
        if (bodyCursor >= bodyCharacters.length) {
          completeCurrentProcess()
          return
        }

        timers.push(window.setTimeout(typeBodyCharacter, kind === 'toolcallSearch' ? 22 : kind === 'toolcall' ? 24 : 28))
      }

      const typeTitleCharacter = () => {
        if (titleCursor < titleCharacters.length) {
          titleCursor += 1
          setDeepThinkingTitle(titleCharacters.slice(0, titleCursor).join(''))
        }
        if (titleCursor >= titleCharacters.length) {
          if (kind === 'thinkCompact') {
            setStreamingPhase('thinkCompactHold')
            timers.push(window.setTimeout(() => {
              showPreviousThinking('thinkCompact', compactThinkTitleText)
              runProcessFromKind('toolcallSearch')
            }, processTransitionDelayMs))
            return
          }

          typeBodyCharacter()
          return
        }

        timers.push(window.setTimeout(typeTitleCharacter, kind === 'think' || kind === 'thinkCompact' ? 36 : 34))
      }

      typeTitleCharacter()
    }

    if (paused) {
      return () => timers.forEach((timerId) => window.clearTimeout(timerId))
    }

    if (resumeSignal > handledResumeSignalRef.current) {
      handledResumeSignalRef.current = resumeSignal
      timers.push(window.setTimeout(() => {
        const snapshot = playbackSnapshotRef.current

        if (snapshot.phase === 'judging' || snapshot.phase === 'judgingHold') {
          let cursor = snapshot.simpleLength
          setStreamingPhase('judging')

          const continueJudgment = () => {
            cursor += 1
            setSimpleJudgmentReplyText(simpleJudgmentCharacters.slice(0, cursor).join(''))
            if (cursor >= simpleJudgmentCharacters.length) {
              setStreamingPhase('judgingHold')
              timers.push(window.setTimeout(() => {
                let replyCursor = snapshot.streamingLength
                setStreamingPhase('streaming')

                const continueContext = () => {
                  replyCursor += 1
                  setStreamingReplyText(streamingReplyCharacters.slice(0, replyCursor).join(''))
                  if (replyCursor >= streamingReplyCharacters.length) {
                    runProcessFromKind('think')
                    return
                  }

                  timers.push(window.setTimeout(continueContext, 38))
                }

                continueContext()
              }, snapshot.phase === 'judgingHold' ? 0 : 2000))
              return
            }

            timers.push(window.setTimeout(continueJudgment, 34))
          }

          continueJudgment()
          return
        }

        if (snapshot.phase === 'streaming') {
          let replyCursor = snapshot.streamingLength

          const continueContext = () => {
            replyCursor += 1
            setStreamingReplyText(streamingReplyCharacters.slice(0, replyCursor).join(''))
            if (replyCursor >= streamingReplyCharacters.length) {
              runProcessFromKind('think')
              return
            }

            timers.push(window.setTimeout(continueContext, 38))
          }

          continueContext()
          return
        }

        if (snapshot.phase === 'think' || snapshot.phase === 'thinkHold') {
          runProcessFromKind('think', snapshot.deepTitleLength, snapshot.deepBodyLength)
          return
        }

        if (snapshot.phase === 'toolcall' || snapshot.phase === 'toolcallHold') {
          runProcessFromKind('toolcall', snapshot.deepTitleLength, snapshot.deepBodyLength)
          return
        }

        if (snapshot.phase === 'thinkCompact' || snapshot.phase === 'thinkCompactHold') {
          runProcessFromKind('thinkCompact', snapshot.deepTitleLength, 0)
          return
        }

        if (snapshot.phase === 'toolcallSearch' || snapshot.phase === 'toolcallSearchHold') {
          runProcessFromKind('toolcallSearch', snapshot.deepTitleLength, snapshot.deepBodyLength)
          return
        }

        if (snapshot.phase === 'thinkPlan' || snapshot.phase === 'thinkPlanHold') {
          runProcessFromKind('thinkPlan', snapshot.deepTitleLength, snapshot.deepBodyLength)
          return
        }

        if (snapshot.phase === 'response') {
          let finalResponseCursor = snapshot.finalResponseLength

          const continueFinalResponse = () => {
            finalResponseCursor += 1
            setFinalResponseReplyText(finalResponseCharacters.slice(0, finalResponseCursor).join(''))
            if (finalResponseCursor >= finalResponseCharacters.length) {
              setStreamingPhase('done')
              return
            }

            timers.push(window.setTimeout(continueFinalResponse, 12))
          }

          continueFinalResponse()
        }
      }, 0))
      return () => timers.forEach((timerId) => window.clearTimeout(timerId))
    }

    if (!isStreamingReplyDemo) {
      timers.push(window.setTimeout(() => {
        setStreamingReplyText('')
        setSimpleJudgmentReplyText('')
        setDeepThinkingTitle('')
        setDeepThinkingBody('')
        setFinalResponseReplyText('')
        setDeepThinkingKind('think')
        setPreviousThinking(null)
        setStreamingPhase('thinking')
        setThinkingStageIndex(0)
      }, 0))
      return () => timers.forEach((timerId) => window.clearTimeout(timerId))
    }

    if (continueAfterStep && demoStep) {
      timers.push(window.setTimeout(() => {
        setStreamingReplyText(demoStep === 'thinking' || demoStep === 'judging-think' ? '' : streamingReplyTextFull)
        setSimpleJudgmentReplyText(demoStep === 'thinking' ? '' : simpleJudgmentText)
        setDeepThinkingTitle('')
        setDeepThinkingBody('')
        setFinalResponseReplyText('')
        setPreviousThinking(null)
        setThinkingStageIndex(0)

        if (demoStep === 'thinking' || demoStep === 'judging-think') {
          let cursor = 0
          setStreamingPhase('judging')

          const typeJudgmentCharacter = () => {
            cursor += 1
            setSimpleJudgmentReplyText(simpleJudgmentCharacters.slice(0, cursor).join(''))
            if (cursor >= simpleJudgmentCharacters.length) {
              setStreamingPhase('judgingHold')
              timers.push(window.setTimeout(() => {
                let replyCursor = 0
                setStreamingPhase('streaming')

                const typeContextCharacter = () => {
                  replyCursor += 1
                  setStreamingReplyText(streamingReplyCharacters.slice(0, replyCursor).join(''))
                  if (replyCursor >= streamingReplyCharacters.length) {
                    runProcessFromKind('think')
                    return
                  }

                  timers.push(window.setTimeout(typeContextCharacter, 38))
                }

                typeContextCharacter()
              }, 2000))
              return
            }

            timers.push(window.setTimeout(typeJudgmentCharacter, 34))
          }

          typeJudgmentCharacter()
          return
        }

        if (demoStep === 'context') {
          let replyCursor = 0
          setStreamingPhase('streaming')

          const typeContextCharacter = () => {
            replyCursor += 1
            setStreamingReplyText(streamingReplyCharacters.slice(0, replyCursor).join(''))
            if (replyCursor >= streamingReplyCharacters.length) {
              runProcessFromKind('think')
              return
            }

            timers.push(window.setTimeout(typeContextCharacter, 38))
          }

          typeContextCharacter()
          return
        }

        if (demoStep === 'response') {
          runResponse()
          return
        }

        if (demoStep === 'complete') {
          setStreamingReplyText(streamingReplyTextFull)
          setSimpleJudgmentReplyText(simpleJudgmentText)
          setFinalResponseReplyText(finalResponseText)
          setStreamingPhase('done')
          return
        }

        const nextKind = demoStep === 'think-plan' ? 'thinkPlan' : demoStep === 'toolcall-search' ? 'toolcallSearch' : demoStep === 'toolcall' ? 'toolcall' : demoStep === 'think-compact' ? 'thinkCompact' : 'think'
        runProcessFromKind(nextKind)
      }, 0))
      return () => timers.forEach((timerId) => window.clearTimeout(timerId))
    }

    if (demoStep === 'thinking') {
      timers.push(window.setTimeout(() => {
        setStreamingReplyText('')
        setSimpleJudgmentReplyText('')
        setDeepThinkingTitle('')
        setDeepThinkingBody('')
        setFinalResponseReplyText('')
        setDeepThinkingKind('think')
        setPreviousThinking(null)
        setStreamingPhase('thinking')
        setThinkingStageIndex(0)
      }, 0))
      return () => timers.forEach((timerId) => window.clearTimeout(timerId))
    }

    if (demoStep === 'judging-think') {
      timers.push(window.setTimeout(() => {
        let cursor = 0
        setStreamingReplyText('')
        setSimpleJudgmentReplyText('')
        setDeepThinkingTitle('')
        setDeepThinkingBody('')
        setFinalResponseReplyText('')
        setDeepThinkingKind('think')
        setPreviousThinking(null)
        setStreamingPhase('judging')
        setThinkingStageIndex(0)

        const typeJudgmentCharacter = () => {
          cursor += 1
          setSimpleJudgmentReplyText(simpleJudgmentCharacters.slice(0, cursor).join(''))
          if (cursor >= simpleJudgmentCharacters.length) {
            setStreamingPhase('judgingHold')
            return
          }

          timers.push(window.setTimeout(typeJudgmentCharacter, 34))
        }

        typeJudgmentCharacter()
      }, 0))
      return () => timers.forEach((timerId) => window.clearTimeout(timerId))
    }

    if (demoStep === 'context') {
      timers.push(window.setTimeout(() => {
        let replyCursor = 0
        setStreamingReplyText('')
        setSimpleJudgmentReplyText(simpleJudgmentText)
        setDeepThinkingTitle('')
        setDeepThinkingBody('')
        setFinalResponseReplyText('')
        setDeepThinkingKind('think')
        setPreviousThinking(null)
        setStreamingPhase('streaming')
        setThinkingStageIndex(0)

        const typeContextCharacter = () => {
          replyCursor += 1
          setStreamingReplyText(streamingReplyCharacters.slice(0, replyCursor).join(''))
          if (replyCursor >= streamingReplyCharacters.length) {
            return
          }

          timers.push(window.setTimeout(typeContextCharacter, 38))
        }

        typeContextCharacter()
      }, 0))
      return () => timers.forEach((timerId) => window.clearTimeout(timerId))
    }

    if (demoStep === 'think' || demoStep === 'toolcall' || demoStep === 'think-compact' || demoStep === 'toolcall-search' || demoStep === 'think-plan') {
      timers.push(window.setTimeout(() => {
        let titleCursor = 0
        const nextKind = demoStep === 'think-plan' ? 'thinkPlan' : demoStep === 'toolcall-search' ? 'toolcallSearch' : demoStep === 'toolcall' ? 'toolcall' : demoStep === 'think-compact' ? 'thinkCompact' : 'think'
        const titleCharacters = nextKind === 'thinkPlan' ? planThinkTitleCharacters : nextKind === 'toolcallSearch' ? searchToolCallTitleCharacters : nextKind === 'toolcall' ? toolCallTitleCharacters : nextKind === 'thinkCompact' ? compactThinkTitleCharacters : deepThinkingTitleCharacters
        const bodyCharacters = nextKind === 'thinkPlan' ? planThinkBodyCharacters : nextKind === 'toolcallSearch' ? searchToolCallBodyCharacters : nextKind === 'toolcall' ? toolCallBodyCharacters : nextKind === 'thinkCompact' ? [] : deepThinkingBodyCharacters
        setStreamingReplyText(streamingReplyTextFull)
        setSimpleJudgmentReplyText(simpleJudgmentText)
        setDeepThinkingTitle('')
        setDeepThinkingBody('')
        setFinalResponseReplyText('')
        setDeepThinkingKind(nextKind)
        setPreviousThinking(null)
        setStreamingPhase(nextKind)
        setThinkingStageIndex(0)

        const typeDeepTitleCharacter = () => {
          titleCursor += 1
          setDeepThinkingTitle(titleCharacters.slice(0, titleCursor).join(''))
          if (titleCursor >= titleCharacters.length) {
            if (nextKind === 'thinkCompact') {
              setStreamingPhase('thinkCompactHold')
              return
            }

            let bodyCursor = 0

            const typeDeepBodyCharacter = () => {
              bodyCursor += 1
              setDeepThinkingBody(bodyCharacters.slice(0, bodyCursor).join(''))
              if (bodyCursor >= bodyCharacters.length) {
                setStreamingPhase(nextKind === 'thinkPlan' ? 'thinkPlanHold' : nextKind === 'toolcallSearch' ? 'toolcallSearchHold' : nextKind === 'toolcall' ? 'toolcallHold' : 'thinkHold')
                return
              }

              timers.push(window.setTimeout(typeDeepBodyCharacter, 28))
            }

            typeDeepBodyCharacter()
            return
          }

          timers.push(window.setTimeout(typeDeepTitleCharacter, 36))
        }

        typeDeepTitleCharacter()
      }, 0))
      return () => timers.forEach((timerId) => window.clearTimeout(timerId))
    }

    if (demoStep === 'response') {
      timers.push(window.setTimeout(() => {
        let responseCursor = 0
        setStreamingReplyText(streamingReplyTextFull)
        setSimpleJudgmentReplyText(simpleJudgmentText)
        setDeepThinkingTitle('')
        setDeepThinkingBody('')
        setDeepThinkingKind('thinkPlan')
        setFinalResponseReplyText('')
        setPreviousThinking(null)
        setStreamingPhase('response')

        const typeFinalResponseCharacter = () => {
          responseCursor += 1
          setFinalResponseReplyText(finalResponseCharacters.slice(0, responseCursor).join(''))
          if (responseCursor >= finalResponseCharacters.length) {
            setStreamingPhase('done')
            return
          }

          timers.push(window.setTimeout(typeFinalResponseCharacter, 12))
        }

        typeFinalResponseCharacter()
      }, 0))
      return () => timers.forEach((timerId) => window.clearTimeout(timerId))
    }

    if (demoStep === 'complete') {
      timers.push(window.setTimeout(() => {
        setStreamingReplyText(streamingReplyTextFull)
        setSimpleJudgmentReplyText(simpleJudgmentText)
        setDeepThinkingTitle('')
        setDeepThinkingBody('')
        setDeepThinkingKind('thinkPlan')
        setFinalResponseReplyText(finalResponseText)
        setPreviousThinking(null)
        setStreamingPhase('done')
        setThinkingStageIndex(0)
      }, 0))
      return () => timers.forEach((timerId) => window.clearTimeout(timerId))
    }

    timers.push(window.setTimeout(() => {
      let cursor = 0
      setStreamingReplyText('')
      setSimpleJudgmentReplyText('')
      setDeepThinkingTitle('')
      setDeepThinkingBody('')
      setFinalResponseReplyText('')
      setDeepThinkingKind('think')
      setPreviousThinking(null)
      setStreamingPhase('judging')
      setThinkingStageIndex(0)

      const intervalId = window.setInterval(() => {
        cursor += 1
        setSimpleJudgmentReplyText(simpleJudgmentCharacters.slice(0, cursor).join(''))
        if (cursor >= simpleJudgmentCharacters.length) {
          window.clearInterval(intervalId)
          setStreamingPhase('judgingHold')

          timers.push(window.setTimeout(() => {
            let replyCursor = 0
            setStreamingPhase('streaming')

            const typeReplyCharacter = () => {
              replyCursor += 1
              setStreamingReplyText(streamingReplyCharacters.slice(0, replyCursor).join(''))
              if (replyCursor >= streamingReplyCharacters.length) {
                let titleCursor = 0
                setDeepThinkingKind('think')
                setStreamingPhase('think')

                const typeDeepTitleCharacter = () => {
                  titleCursor += 1
                  setDeepThinkingTitle(deepThinkingTitleCharacters.slice(0, titleCursor).join(''))
                  if (titleCursor >= deepThinkingTitleCharacters.length) {
                    let bodyCursor = 0

                    const typeDeepBodyCharacter = () => {
                      bodyCursor += 1
                      setDeepThinkingBody(deepThinkingBodyCharacters.slice(0, bodyCursor).join(''))
                      if (bodyCursor >= deepThinkingBodyCharacters.length) {
                        setStreamingPhase('thinkHold')
                        timers.push(window.setTimeout(() => {
                          let toolTitleCursor = 0
                          showPreviousThinking('think', deepThinkingTitleText, deepThinkingBodyText)
                          setDeepThinkingKind('toolcall')
                          setDeepThinkingTitle('')
                          setDeepThinkingBody('')
                          setStreamingPhase('toolcall')

                          const typeToolTitleCharacter = () => {
                            toolTitleCursor += 1
                            setDeepThinkingTitle(toolCallTitleCharacters.slice(0, toolTitleCursor).join(''))
                            if (toolTitleCursor >= toolCallTitleCharacters.length) {
                              let toolBodyCursor = 0

                              const typeToolBodyCharacter = () => {
                                toolBodyCursor += 1
                                setDeepThinkingBody(toolCallBodyCharacters.slice(0, toolBodyCursor).join(''))
                                if (toolBodyCursor >= toolCallBodyCharacters.length) {
                                  setStreamingPhase('toolcallHold')
                                  timers.push(window.setTimeout(() => {
                                    let compactTitleCursor = 0
                                    showPreviousThinking('toolcall', toolCallTitleText, toolCallBodyText)
                                    setDeepThinkingKind('thinkCompact')
                                    setDeepThinkingTitle('')
                                    setDeepThinkingBody('')
                                    setStreamingPhase('thinkCompact')

                                    const typeCompactThinkTitleCharacter = () => {
                                      compactTitleCursor += 1
                                      setDeepThinkingTitle(compactThinkTitleCharacters.slice(0, compactTitleCursor).join(''))
                                      if (compactTitleCursor >= compactThinkTitleCharacters.length) {
                                        setStreamingPhase('thinkCompactHold')
                                        timers.push(window.setTimeout(() => {
                                          let searchToolTitleCursor = 0
                                          showPreviousThinking('thinkCompact', compactThinkTitleText)
                                          setDeepThinkingKind('toolcallSearch')
                                          setDeepThinkingTitle('')
                                          setDeepThinkingBody('')
                                          setStreamingPhase('toolcallSearch')

                                          const typeSearchToolTitleCharacter = () => {
                                            searchToolTitleCursor += 1
                                            setDeepThinkingTitle(searchToolCallTitleCharacters.slice(0, searchToolTitleCursor).join(''))
                                            if (searchToolTitleCursor >= searchToolCallTitleCharacters.length) {
                                              let searchToolBodyCursor = 0

                                              const typeSearchToolBodyCharacter = () => {
                                                searchToolBodyCursor += 1
                                                setDeepThinkingBody(searchToolCallBodyCharacters.slice(0, searchToolBodyCursor).join(''))
                                                if (searchToolBodyCursor >= searchToolCallBodyCharacters.length) {
                                                  setStreamingPhase('toolcallSearchHold')
                                                  timers.push(window.setTimeout(() => {
                                                    let planThinkTitleCursor = 0
                                                    showPreviousThinking('toolcallSearch', searchToolCallTitleText, searchToolCallBodyText)
                                                    setDeepThinkingKind('thinkPlan')
                                                    setDeepThinkingTitle('')
                                                    setDeepThinkingBody('')
                                                    setStreamingPhase('thinkPlan')

                                                    const typePlanThinkTitleCharacter = () => {
                                                      planThinkTitleCursor += 1
                                                      setDeepThinkingTitle(planThinkTitleCharacters.slice(0, planThinkTitleCursor).join(''))
                                                      if (planThinkTitleCursor >= planThinkTitleCharacters.length) {
                                                        let planThinkBodyCursor = 0

                                                        const typePlanThinkBodyCharacter = () => {
                                                          planThinkBodyCursor += 1
                                                          setDeepThinkingBody(planThinkBodyCharacters.slice(0, planThinkBodyCursor).join(''))
                                                          if (planThinkBodyCursor >= planThinkBodyCharacters.length) {
                                                            setStreamingPhase('thinkPlanHold')
                                                            timers.push(window.setTimeout(() => {
                                                              let finalResponseCursor = 0
                                                              setDeepThinkingTitle('')
                                                              setDeepThinkingBody('')
                                                              setFinalResponseReplyText('')
                                                              setStreamingPhase('response')

                                                              const typeFinalResponseCharacter = () => {
                                                                finalResponseCursor += 1
                                                                setFinalResponseReplyText(finalResponseCharacters.slice(0, finalResponseCursor).join(''))
                                                                if (finalResponseCursor >= finalResponseCharacters.length) {
                                                                  setStreamingPhase('done')
                                                                  return
                                                                }

                                                                timers.push(window.setTimeout(typeFinalResponseCharacter, 12))
                                                              }

                                                              typeFinalResponseCharacter()
                                                            }, processTransitionDelayMs))
                                                            return
                                                          }

                                                          timers.push(window.setTimeout(typePlanThinkBodyCharacter, 28))
                                                        }

                                                        typePlanThinkBodyCharacter()
                                                        return
                                                      }

                                                      timers.push(window.setTimeout(typePlanThinkTitleCharacter, 36))
                                                    }

                                                    typePlanThinkTitleCharacter()
                                                  }, processTransitionDelayMs))
                                                  return
                                                }

                                                timers.push(window.setTimeout(typeSearchToolBodyCharacter, 22))
                                              }

                                              typeSearchToolBodyCharacter()
                                              return
                                            }

                                            timers.push(window.setTimeout(typeSearchToolTitleCharacter, 34))
                                          }

                                          typeSearchToolTitleCharacter()
                                        }, processTransitionDelayMs))
                                        return
                                      }

                                      timers.push(window.setTimeout(typeCompactThinkTitleCharacter, 36))
                                    }

                                    typeCompactThinkTitleCharacter()
                                  }, processTransitionDelayMs))
                                  return
                                }

                                timers.push(window.setTimeout(typeToolBodyCharacter, 24))
                              }

                              typeToolBodyCharacter()
                              return
                            }

                            timers.push(window.setTimeout(typeToolTitleCharacter, 34))
                          }

                          typeToolTitleCharacter()
                        }, processTransitionDelayMs))
                        return
                      }

                      timers.push(window.setTimeout(typeDeepBodyCharacter, 28))
                    }

                    typeDeepBodyCharacter()
                    return
                  }

                  timers.push(window.setTimeout(typeDeepTitleCharacter, 36))
                }

                typeDeepTitleCharacter()
                return
              }

              timers.push(window.setTimeout(typeReplyCharacter, 38))
            }

            typeReplyCharacter()
          }, 2000))
        }
      }, 34)

      timers.push(intervalId)
    }, 0))

    return () => timers.forEach((timerId) => window.clearTimeout(timerId))
  }, [continueAfterStep, demoStep, isStreamingReplyDemo, paused, resumeSignal])

  useEffect(() => {
    if (streamingPhase === 'done') return undefined

    const frameId = window.requestAnimationFrame(() => {
      const chatStream = chatStreamRef.current
      if (chatStream) {
        chatStream.scrollTop = chatStream.scrollHeight
      }
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [streamingPhase, simpleJudgmentReplyText, deepThinkingTitle, deepThinkingBody])

  const updateJumpToBottomVisibility = useCallback(() => {
    const chatStream = chatStreamRef.current
    if (!chatStream) return

    const responseVisible = Boolean(finalResponseReplyText) || streamingPhase === 'response' || streamingPhase === 'done'
    const scrollDistanceToBottom = chatStream.scrollHeight - chatStream.scrollTop - chatStream.clientHeight
    const hasOverflow = chatStream.scrollHeight - chatStream.clientHeight > 24
    const shouldShow = responseVisible && hasOverflow && scrollDistanceToBottom > 96 && !jumpToBottomDismissedRef.current

    setShowJumpToBottom(shouldShow)
  }, [finalResponseReplyText, streamingPhase])

  useEffect(() => {
    const chatStream = chatStreamRef.current
    if (!chatStream) return undefined

    const handleScroll = () => {
      const scrollDistanceToBottom = chatStream.scrollHeight - chatStream.scrollTop - chatStream.clientHeight
      if (scrollDistanceToBottom > 96 && jumpToBottomDismissedRef.current) {
        jumpToBottomDismissedRef.current = false
      }
      updateJumpToBottomVisibility()
    }

    chatStream.addEventListener('scroll', handleScroll, { passive: true })
    return () => chatStream.removeEventListener('scroll', handleScroll)
  }, [updateJumpToBottomVisibility])

  useEffect(() => {
    if (streamingPhase === 'response' && !finalResponseReplyText) {
      jumpToBottomDismissedRef.current = false
    }

    const frameId = window.requestAnimationFrame(updateJumpToBottomVisibility)
    return () => window.cancelAnimationFrame(frameId)
  }, [finalResponseReplyText, streamingPhase, updateJumpToBottomVisibility])

  const handleJumpToBottom = () => {
    const chatStream = chatStreamRef.current
    if (!chatStream) return

    jumpToBottomDismissedRef.current = true
    setShowJumpToBottom(false)
    chatStream.scrollTo({
      top: chatStream.scrollHeight,
      behavior: 'smooth',
    })
  }

  const simpleJudgmentProgress = simpleJudgmentReplyText.length / simpleJudgmentCharacters.length
  const activeDeepTitleLength = deepThinkingKind === 'thinkPlan' ? planThinkTitleCharacters.length : deepThinkingKind === 'toolcallSearch' ? searchToolCallTitleCharacters.length : deepThinkingKind === 'toolcall' ? toolCallTitleCharacters.length : deepThinkingKind === 'thinkCompact' ? compactThinkTitleCharacters.length : deepThinkingTitleCharacters.length
  const deepThinkingTitleProgress = deepThinkingTitle.length / activeDeepTitleLength
  const chatItems: DotsHistoryItem[] = [
    {
      id: 'user-query',
      type: 'message',
      role: 'user',
      text: '帮我做一个上海三日轻松旅行攻略，预算无上限',
    },
    ...(streamingReplyText || streamingPhase === 'streaming' || deepThinkingTitle || deepThinkingBody
      ? [
          {
            id: 'dots-streaming-reply',
            type: 'message' as const,
            role: 'dots' as const,
            text: streamingReplyText,
            isStreaming: streamingPhase === 'streaming',
          },
          ...(deepThinkingTitle || deepThinkingBody || streamingPhase === 'think' || streamingPhase === 'thinkHold' || streamingPhase === 'toolcall' || streamingPhase === 'toolcallHold' || streamingPhase === 'thinkCompact' || streamingPhase === 'thinkCompactHold' || streamingPhase === 'toolcallSearch' || streamingPhase === 'toolcallSearchHold' || streamingPhase === 'thinkPlan' || streamingPhase === 'thinkPlanHold'
            ? [
                {
                  id: 'dots-deep-thinking',
                  type: 'message' as const,
                  role: 'dots' as const,
                  text: `${deepThinkingTitle}${deepThinkingBody}`,
                  isThinking: true,
                  isDeepThinking: true,
                  isDeepThinkingTitleComplete: deepThinkingTitleProgress >= 1,
                  thinkingStageIndex,
                  deepThinkingTitle,
                  deepThinkingBody,
                  deepThinkingTitleProgress,
                  deepThinkingKind,
                  previousDeepThinkingTitle: previousThinking?.title,
                  previousDeepThinkingBody: previousThinking?.body,
                  previousDeepThinkingKind: previousThinking?.kind,
                },
              ]
            : []),
          ...(finalResponseReplyText || streamingPhase === 'response'
            ? [
                {
                  id: 'dots-final-response',
                  type: 'message' as const,
                  role: 'dots' as const,
                  text: finalResponseReplyText,
                  isFinalResponse: true,
                  isFinalResponseComplete: streamingPhase === 'done',
                },
              ]
            : []),
        ]
      : [
          {
            id: 'dots-thinking',
            type: 'message' as const,
            role: 'dots' as const,
            text: simpleJudgmentReplyText,
            isThinking: true,
            isJudging: streamingPhase === 'judging' || streamingPhase === 'judgingHold',
            isJudgingHold: streamingPhase === 'judgingHold',
            thinkingStageIndex,
            thinkingProgress: simpleJudgmentProgress,
          },
        ]),
  ]

  return (
    <div className="dotted-demo-page dots-message-surface" data-node-id="3:4417">
      <div className="dotted-demo">
        <div className="dotted-demo__topbar" data-node-id="2:380">
          <div className="dotted-demo__statusbar" data-node-id="2:381">
            <div className="dotted-demo__status-time">9:41</div>
            <div className="dotted-demo__status-levels" aria-hidden="true">
              <img className="dotted-demo__cellular" src={thinkStatusCellular} alt="" />
              <img className="dotted-demo__wifi" src={thinkStatusWifi} alt="" />
              <span className="dotted-demo__battery">
                <img className="dotted-demo__battery-cap" src={thinkStatusCap} alt="" />
                <span className="dotted-demo__battery-fill" />
              </span>
            </div>
          </div>

          <nav className="dotted-demo__nav" aria-label="点点导航" data-node-id="2:382">
            <div className="dotted-demo__nav-left">
              <button className="dotted-demo__nav-btn" type="button" aria-label="返回">
                <img src={thinkBack} alt="" aria-hidden="true" />
              </button>
              <div className="dotted-demo__avatar-title">
                <img className="dotted-demo__avatar" src={thinkUserAvatar} alt="" aria-hidden="true" />
                <div className="dotted-demo__title">点点</div>
              </div>
            </div>
            <button className="dotted-demo__nav-btn" type="button" aria-label="更多">
              <img src={thinkMore} alt="" aria-hidden="true" />
            </button>
          </nav>
        </div>

        <main className="dotted-demo__dialog" aria-label="点点对话区">
          <DottedChatStream
            items={chatItems}
            streamRef={chatStreamRef}
            onSourcesClick={() => setActiveSheetMode('sources')}
            onThinkingClick={() => setActiveSheetMode('thinking')}
            thinkingTransitionStyle={thinkingTransitionStyle}
            streamingVariant={streamingVariant}
          />
        </main>

        {showJumpToBottom && (
          <button className="dotted-demo__jump-bottom" type="button" aria-label="跳转到回答底部" onClick={handleJumpToBottom}>
            <img src={thinkDescending} alt="" aria-hidden="true" />
          </button>
        )}

        <div className="dotted-demo__dock">
          <div className="dotted-demo__composer" data-node-id="3:4437">
            <div className="dotted-demo__composer-main">
              <div className="dotted-demo__composer-placeholder">
                <img src={thinkMessageVoice} alt="" aria-hidden="true" />
                <span>发消息或按住说话...</span>
              </div>
              <div className="dotted-demo__composer-actions">
                <button className="dotted-demo__composer-icon" type="button" aria-label="拍照">
                  <img src={thinkCamera} alt="" aria-hidden="true" />
                </button>
                <button className="dotted-demo__composer-icon" type="button" aria-label="添加">
                  <img src={thinkAddCircle} alt="" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="dotted-demo__watermark">内容由AI生成</div>
          <div className="dotted-demo__home-indicator" aria-hidden="true" />
        </div>

        {activeSheetMode && (
          <DottedSourcesSheet
            mode={activeSheetMode}
            currentThinkingKind={deepThinkingKind}
            currentThinkingTitle={deepThinkingTitle}
            currentThinkingBody={deepThinkingBody}
            isThinkingComplete={streamingPhase === 'response' || streamingPhase === 'done'}
            onClose={() => setActiveSheetMode(null)}
          />
        )}
      </div>
    </div>
  )
}
