import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode, type RefObject, type UIEvent as ReactUIEvent, type WheelEvent as ReactWheelEvent } from 'react'
import lottie from 'lottie-web'
import thinkAddCircle from '../assets/dotted/think-add-circle.svg'
import thinkBack from '../assets/dotted/think-back.svg'
import thinkCamera from '../assets/dotted/think-camera.svg'
import thinkCheckComplete from '../assets/dotted/think-check-complete.svg'
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
export type DottedToolNoteDisplayVariant = 'consistent' | 'preview-detail'
export type DottedThinkingDisplayVariant = 'single' | 'stacked'
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
  deepThinkingComplete?: boolean
  previousDeepThinkingTitle?: string
  previousDeepThinkingBody?: string
  previousDeepThinkingKind?: DottedProcessKind
  thinkingDisplayVariant?: DottedThinkingDisplayVariant
  isFinalResponse?: boolean
  isFinalResponseSummary?: boolean
  isFinalResponseComplete?: boolean
  deepThinkingSummaryCollapsing?: boolean
}

type DotsHistoryItem = DotsHistoryMessage
type DottedSheetMode = 'thinking' | 'sources'

const getDeepThinkingWidth = (kind: DottedProcessKind | undefined) => {
  void kind
  return 361
}

const processKindOrder: DottedProcessKind[] = ['think', 'toolcall', 'thinkCompact', 'toolcallSearch', 'thinkPlan']

type DottedProcessRow = {
  kind?: DottedProcessKind
  icon: string
  title: string
  detail: string
  last?: boolean
  lottieUrl?: string
  lottiePlaying?: boolean
}

type DottedFinalResponseBlock = {
  type: 'paragraph' | 'heading' | 'bullet'
  text: string
}

const streamingReplyChunks = [
  '暑期伊犁环线是个很经典的选择，',
  '我先帮你把路线框架、核心景点、住宿交通这些关键信息都搜集好，',
  '整理出一份适合六人出行的攻略。',
]

const streamingReplyTextFull = streamingReplyChunks.join('')
const streamingReplyCharacters = Array.from(streamingReplyTextFull)
const contextCharacterStep = 2
const contextCharacterDelayMs = 16
const contextToThinkDelayMs = 260
const compactThinkCompleteHoldMs = 2000
const simpleJudgmentText = '正在规划新疆伊犁环线10天行程'
const simpleJudgmentCharacters = Array.from(simpleJudgmentText)
const simpleJudgmentCopyWidthPx = 211
const deepThinkingTitleText = '规划新疆伊犁红圈10天行程'
const deepThinkingBodyText = '用户需要计划去新疆伊犁的10天旅行，和5个朋友一起，考虑到预算没有给限制，住宿推荐4星级，出行推荐自驾游，可以欣赏风景和自由摄影。'
const toolCallTitleText = '制定新疆伊犁环线10日自驾游路线'
const toolCallBodyText = [
  '网页｜那拉提旅游风景区官方网站',
  '网页｜喀拉峻国际生态旅游区官方信息',
  '网页｜夏塔景区开放时间与票务信息',
  '网页｜赛里木湖景区游客服务信息',
  '更多官方信息检索中...',
].join('\n')
const compactThinkTitleText = '查找景区开放信息和路线攻略'
const compactThinkBodyText = '我需要更多官方信息，特别是那拉提景区、喀拉峻景区、夏塔景区和赛里木湖的开放时间和票价信息。虽然目前的资料可能会变动，但我还是可以提供建议。'
const searchToolCallTitleText = '搜索景区官方网站及相关信息'
const searchToolCallBodyText = ''
const searchToolCallPreviewItems = [
  {
    title: '新疆伊犁环线10天自驾攻略，直接抄作业！',
    author: '亦一行',
    likes: '2765',
    image: sourceImage1,
    logo: sourceLogoAlice,
  },
  {
    title: '新疆伊犁环线10天9晚 （上）',
    author: 'sailormmoon',
    likes: '234',
    image: sourceImageSailormmoon1,
    logo: sourceLogoSailormmoon,
  },
  {
    title: '记录一下伊犁环线自驾详细路线',
    author: '小k',
    likes: '1634',
    image: sourceImage2,
    logo: sourceLogoYt,
  },
  {
    title: '二刷新疆伊犁9天治愈环线攻略',
    author: 'Oolong',
    likes: '67',
    image: sourceImage3,
    logo: sourceLogoBreeze,
  },
  {
    title: '新疆伊犁9天自驾🚗懒人不赶路天花板路线',
    author: '橘子汽水',
    likes: '3452',
    image: sourceImageSailormmoon2,
    logo: sourceLogoAlice,
  },
] as const
const searchToolCallWebItems = [
  '知乎：新疆自驾路线汇总（新疆自驾行必读攻略）',
  '携程：自驾新疆，应如何规划线路？',
] as const
const planThinkTitleText = '考虑提供合理的行车距离和交通建议'
const planThinkBodyText = '行车时间可以根据常见自驾估算，最终以当天导航为准。至于交通，6人客户可以考虑选择一辆较大的7座商务车或1+1车型来适应行李的需求。从乌鲁木齐进出新疆是比较方便的方式。'
const finalResponseText = [
  '6个人暑假去新疆玩10天，推荐走伊犁环线，以乌鲁木齐为起点和终点，包7座车或自驾最方便。路线可以安排为：乌鲁木齐→赛里木湖→伊宁→喀拉峻草原→琼库什台→夏塔→昭苏→那拉提草原→独库公路→乌鲁木齐。\n',
  '',
  '🚗 行程安排',
  '整体路线建议安排为：乌鲁木齐→赛里木湖→伊宁→喀拉峻草原→琼库什台→夏塔→昭苏→那拉提草原→独库公路→乌鲁木齐。第一天抵达乌鲁木齐后，可以逛国际大巴扎，品尝新疆特色美食；第二天前往赛里木湖，欣赏新疆最经典的湖泊、雪山和草原风光，晚上建议住湖边附近，方便拍摄日出和晨雾。',
  '之后前往伊宁市，途中可以打卡果子沟大桥，晚上逛六星街，体验当地民族风情。接下来几天重点游玩伊犁草原区域，喀拉峻草原以辽阔的草原和雪山背景闻名，适合拍照；琼库什台则保留了原始牧村风貌，可以体验木屋、草原、森林和星空，是行程中非常值得停留的一站。',
  '随后前往夏塔景区，近距离欣赏天山雪山和冰川景观，可以安排轻徒步，感受草原、森林和雪山结合的独特风景。之后前往那拉提草原，重点游览空中草原，体验骑马、牧场风光和哈萨克族文化。最后一天安排独库公路返程，这是整条路线的高潮，可以看到雪山、峡谷、森林和草原等多种地貌，一路拍照非常出片。\n',
  '',
  '📷 沿途景点',
  '这趟行程的核心打卡点包括：赛里木湖的蓝色湖面、果子沟大桥的公路大片、琼库什台的原始村落、夏塔的雪山冰川、那拉提的空中草原以及独库公路的壮丽景色。暑假7—8月属于新疆旅游旺季，建议提前预订车辆和住宿，同时准备防晒用品、墨镜、防风外套和舒适运动鞋。\n',
  '',
  '✨ 实用提醒',
  '费用方面，6个人包车10天，交通费用大约1万—1.5万元，人均约1700—2500元；住宿、餐饮和门票加起来，整体比较舒适的预算大约人均5000—8000元左右。这条线路节奏适中，不会太赶，既能看到新疆最经典的自然风光，也能体验当地民族文化，非常适合作为朋友暑假旅行目的地。',
].join('\n')
const finalResponseBlocks: DottedFinalResponseBlock[] = [
  { type: 'paragraph', text: '6个人暑假去新疆玩10天，推荐走伊犁环线，以乌鲁木齐为起点和终点，包7座车或自驾最方便。路线可以安排为：乌鲁木齐→赛里木湖→伊宁→喀拉峻草原→琼库什台→夏塔→昭苏→那拉提草原→独库公路→乌鲁木齐。' },
  { type: 'heading', text: '🚗 行程安排' },
  { type: 'paragraph', text: '整体路线建议安排为：乌鲁木齐→赛里木湖→伊宁→喀拉峻草原→琼库什台→夏塔→昭苏→那拉提草原→独库公路→乌鲁木齐。第一天抵达乌鲁木齐后，可以逛国际大巴扎，品尝新疆特色美食；第二天前往赛里木湖，欣赏新疆最经典的湖泊、雪山和草原风光，晚上建议住湖边附近，方便拍摄日出和晨雾。' },
  { type: 'paragraph', text: '之后前往伊宁市，途中可以打卡果子沟大桥，晚上逛六星街，体验当地民族风情。接下来几天重点游玩伊犁草原区域，喀拉峻草原以辽阔的草原和雪山背景闻名，适合拍照；琼库什台则保留了原始牧村风貌，可以体验木屋、草原、森林和星空，是行程中非常值得停留的一站。' },
  { type: 'paragraph', text: '随后前往夏塔景区，近距离欣赏天山雪山和冰川景观，可以安排轻徒步，感受草原、森林和雪山结合的独特风景。之后前往那拉提草原，重点游览空中草原，体验骑马、牧场风光和哈萨克族文化。最后一天安排独库公路返程，这是整条路线的高潮，可以看到雪山、峡谷、森林和草原等多种地貌，一路拍照非常出片。' },
  { type: 'heading', text: '📷 沿途景点' },
  { type: 'paragraph', text: '这趟行程的核心打卡点包括：赛里木湖的蓝色湖面、果子沟大桥的公路大片、琼库什台的原始村落、夏塔的雪山冰川、那拉提的空中草原以及独库公路的壮丽景色。暑假7—8月属于新疆旅游旺季，建议提前预订车辆和住宿，同时准备防晒用品、墨镜、防风外套和舒适运动鞋。' },
  { type: 'heading', text: '✨ 实用提醒' },
  { type: 'paragraph', text: '费用方面，6个人包车10天，交通费用大约1万—1.5万元，人均约1700—2500元；住宿、餐饮和门票加起来，整体比较舒适的预算大约人均5000—8000元左右。这条线路节奏适中，不会太赶，既能看到新疆最经典的自然风光，也能体验当地民族文化，非常适合作为朋友暑假旅行目的地。' },
]
const finalResponseSections = [
  { blocks: [0], list: false },
  { blocks: [1, 2, 3, 4], list: false },
  { blocks: [5, 6], list: false },
  { blocks: [7, 8], list: false },
] as const

const countCharacters = (text: string) => Array.from(text).length

function getDeepThinkingTargetTitle(kind: DottedProcessKind | undefined) {
  if (kind === 'toolcall') return toolCallTitleText
  if (kind === 'thinkCompact') return compactThinkTitleText
  if (kind === 'toolcallSearch') return searchToolCallTitleText
  if (kind === 'thinkPlan') return planThinkTitleText
  return deepThinkingTitleText
}

function getDeepThinkingTargetBody(kind: DottedProcessKind | undefined) {
  if (kind === 'toolcall') return toolCallBodyText
  if (kind === 'toolcallSearch') return searchToolCallBodyText
  if (kind === 'thinkPlan') return planThinkBodyText
  if (kind === 'thinkCompact') return compactThinkBodyText
  return deepThinkingBodyText
}

function getDeepThinkingAnimationUrl(kind: DottedProcessKind | undefined) {
  if (kind === 'toolcallSearch') return thinkGlassAnimationUrl
  if (kind === 'toolcall') return thinkPenAnimationUrl
  return thinkCloudAnimationUrl
}

function getStackDetailTargetHeight(kind: DottedProcessKind | undefined, toolNoteDisplayVariant: DottedToolNoteDisplayVariant) {
  if (kind === 'toolcall') return 28
  if (kind === 'toolcallSearch') return toolNoteDisplayVariant === 'preview-detail' ? 28 : 90
  if (kind === 'thinkPlan') return 72
  if (kind === 'thinkCompact') return 54
  return 72
}

function getTailOpacity({
  characterIndex,
  totalVisibleCharacters,
}: {
  characterIndex: number
  totalVisibleCharacters: number
}) {
  const tailSize = 10
  const distanceFromEnd = totalVisibleCharacters - characterIndex - 1
  if (distanceFromEnd >= tailSize) return 1

  const minOpacity = 0.34
  const progress = Math.max(0, distanceFromEnd) / Math.max(1, tailSize - 1)
  return minOpacity + (1 - minOpacity) * progress
}

function DottedStreamingSpanText({
  text,
  spanKey,
  enabled,
  characterStartIndex = 0,
  totalVisibleCharacters,
  complete = false,
}: {
  text: string
  spanKey: string
  enabled: boolean
  characterStartIndex?: number
  totalVisibleCharacters?: number
  complete?: boolean
}) {
  if (!enabled) return text

  const characters = Array.from(text)
  const visibleCharacters = totalVisibleCharacters ?? characterStartIndex + characters.length

  return (
    <>
      {characters.map((character, index) => {
        const characterIndex = characterStartIndex + index
        return (
        <span
          className={[
            'dotted-demo__stream-char',
            complete ? 'dotted-demo__stream-char--settle' : '',
          ].filter(Boolean).join(' ')}
          key={`${spanKey}-${characterIndex}`}
          style={{ '--stream-char-opacity': getTailOpacity({ characterIndex, totalVisibleCharacters: visibleCharacters }) } as CSSProperties}
        >
          {character}
        </span>
        )
      })}
    </>
  )
}
const sourceItems = [
  {
    author: '亦一行',
    logo: sourceLogoAlice,
    title: '新疆伊犁环线10天自驾攻略，直接抄作业！',
    excerpt: [
      '赛里木湖、果子沟、昭苏和夏塔串成一条顺路自驾线，',
      '适合第一次去伊犁的朋友直接参考。',
    ],
    images: [sourceImage1, sourceImage2, sourceImage3],
    sourceType: '笔记',
    likes: '2765',
  },
  {
    author: 'sailormmoon',
    logo: sourceLogoSailormmoon,
    title: '新疆伊犁环线10天9晚 （上）',
    excerpt: ['10天9晚按伊犁环线慢慢走，把住宿、车程和景点顺序拆得很细。'],
    images: [sourceImageSailormmoon1, sourceImageSailormmoon2, sourceImageSailormmoon3],
    sourceType: '笔记',
    likes: '234',
  },
  {
    author: '小k',
    logo: sourceLogoYt,
    title: '记录一下伊犁环线自驾详细路线',
    excerpt: [
      '从乌鲁木齐进出，把伊宁、昭苏、夏塔和那拉提按车程拆开，',
      '每天保留拍照和休息时间。',
    ],
    images: [sourceImage2, sourceImage3, sourceImage1],
    sourceType: '笔记',
    likes: '1634',
  },
  {
    author: 'Oolong',
    logo: sourceLogoBreeze,
    title: '二刷新疆伊犁9天治愈环线攻略',
    excerpt: [
      '二刷伊犁后更推荐松弛一点的路线，少赶路，多留给草原和雪山。',
    ],
    images: [sourceImage3, sourceImageSailormmoon1, sourceImageSailormmoon2],
    sourceType: '笔记',
    likes: '67',
  },
  {
    author: '橘子汽水',
    logo: sourceLogoAlice,
    title: '新疆伊犁9天自驾🚗懒人不赶路天花板路线',
    excerpt: [
      '更适合不想特种兵打卡的版本，重点放在住宿稳定、车程舒服和景色完整。',
    ],
    images: [sourceImageSailormmoon2, sourceImage1, sourceImageSailormmoon3],
    sourceType: '笔记',
    likes: '3452',
  },
] as const
const deepThinkingTitleCharacters = Array.from(deepThinkingTitleText)
const deepThinkingBodyCharacters = Array.from(deepThinkingBodyText)
const toolCallTitleCharacters = Array.from(toolCallTitleText)
const toolCallBodyCharacters = Array.from(toolCallBodyText)
const compactThinkTitleCharacters = Array.from(compactThinkTitleText)
const compactThinkBodyCharacters = Array.from(compactThinkBodyText)
const searchToolCallTitleCharacters = Array.from(searchToolCallTitleText)
const searchToolCallBodyCharacters = Array.from(searchToolCallBodyText)
const planThinkTitleCharacters = Array.from(planThinkTitleText)
const planThinkBodyCharacters = Array.from(planThinkBodyText)
const finalResponseCharacters = Array.from(finalResponseText)
const processTransitionDelayMs = 1000
const thinkingCompleteConfirmMs = 600
const thinkingSummaryMorphMs = 560
const responseStartDelayMs = 0
const toolcallSearchCompletePauseMs = 1500

const thinkingStages = [
  { label: '判断中...', animationUrl: thinkCloudAnimationUrl },
  { label: '工具调用中...', animationUrl: thinkPenAnimationUrl },
  { label: '检索中...', animationUrl: thinkGlassAnimationUrl },
]

function DottedToolSearchRows({
  text,
  streamingVariant = 'default',
  characterStartIndex = 0,
  totalVisibleCharacters,
  complete = false,
  className,
}: {
  text: string
  streamingVariant?: DottedStreamingVariant
  characterStartIndex?: number
  totalVisibleCharacters?: number
  complete?: boolean
  className?: string
}) {
  const useSpanMask = streamingVariant === 'span-mask'
  const rows = text.split('\n').filter(Boolean).reduce<Array<{ line: string; visibleLine: string; characterStartIndex: number }>>((result, line) => {
    const visibleLine = line.replace('笔记｜', '').replace('网页｜', '')
    const previousCharacters = result.reduce((total, row) => total + countCharacters(row.visibleLine), 0)
    return [
      ...result,
      {
        line,
        visibleLine,
        characterStartIndex: characterStartIndex + previousCharacters,
      },
    ]
  }, [])
  const visibleCharacters = totalVisibleCharacters ?? characterStartIndex + countCharacters(rows.map((row) => row.visibleLine).join(''))

  return (
    <span className={['dotted-demo__thinking-search-list', className].filter(Boolean).join(' ')}>
      {rows.map(({ line, visibleLine, characterStartIndex: currentCharacterStartIndex }, index) => {
        if (line.startsWith('笔记｜')) {
          return (
            <span className="dotted-demo__thinking-search-row" key={`${line}-${index}`}>
              <span className="dotted-demo__thinking-search-source">
                <img src={thinkNoteSingle} alt="" aria-hidden="true" />
                <span>笔记</span>
              </span>
              <span className="dotted-demo__thinking-search-divider" aria-hidden="true" />
              <span className="dotted-demo__thinking-search-text">
                <DottedStreamingSpanText text={visibleLine} spanKey={`search-${index}`} enabled={useSpanMask} characterStartIndex={currentCharacterStartIndex} totalVisibleCharacters={visibleCharacters} complete={complete} />
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
                <DottedStreamingSpanText text={visibleLine} spanKey={`search-${index}`} enabled={useSpanMask} characterStartIndex={currentCharacterStartIndex} totalVisibleCharacters={visibleCharacters} complete={complete} />
              </span>
            </span>
          )
        }

        return (
          <span className="dotted-demo__thinking-search-row dotted-demo__thinking-search-row--plain" key={`${line}-${index}`}>
            <span className="dotted-demo__thinking-search-text">
              <DottedStreamingSpanText text={visibleLine} spanKey={`search-${index}`} enabled={useSpanMask} characterStartIndex={currentCharacterStartIndex} totalVisibleCharacters={visibleCharacters} complete={complete} />
            </span>
          </span>
        )
      })}
    </span>
  )
}

function DottedToolSearchPreviewRows({
  className,
  visibleCount = 3,
  webLabels = ['携程网', '马蜂窝'],
}: {
  className?: string
  visibleCount?: number
  webLabels?: [string, string]
}) {
  const normalizedVisibleCount = Math.max(0, Math.min(3, visibleCount))

  return (
    <span className={['dotted-demo__thinking-search-list', 'dotted-demo__thinking-search-list--preview', className].filter(Boolean).join(' ')}>
      {normalizedVisibleCount >= 1 ? (
        <span className="dotted-demo__thinking-search-pill">
          <span className="dotted-demo__thinking-search-avatar-stack" aria-hidden="true">
            <img src={sourceLogoAlice} alt="" />
            <img src={sourceLogoSailormmoon} alt="" />
            <img src={sourceLogoYt} alt="" />
          </span>
          <span>小红书笔记</span>
        </span>
      ) : null}
      {normalizedVisibleCount >= 2 ? (
        <span className="dotted-demo__thinking-search-pill">
          <img src={thinkInternet} alt="" aria-hidden="true" />
          <span>{webLabels[0]}</span>
        </span>
      ) : null}
      {normalizedVisibleCount >= 3 ? (
        <span className="dotted-demo__thinking-search-pill">
          <img src={thinkInternet} alt="" aria-hidden="true" />
          <span>{webLabels[1]}</span>
        </span>
      ) : null}
    </span>
  )
}

function DottedToolSearchDetailCards() {
  return (
    <span className="dotted-demo__thinking-search-detail">
      {searchToolCallPreviewItems.map((item) => (
        <span className="dotted-demo__thinking-search-detail-card" key={item.title}>
          <img className="dotted-demo__thinking-search-detail-thumb" src={item.image} alt="" aria-hidden="true" />
          <span className="dotted-demo__thinking-search-detail-copy">
            <span className="dotted-demo__thinking-search-detail-title">{item.title}</span>
            <span className="dotted-demo__thinking-search-detail-meta">
              <img src={item.logo} alt="" aria-hidden="true" />
              <span>{item.author}</span>
            </span>
          </span>
          <span className="dotted-demo__thinking-search-detail-like">
            <img src={sourceLike} alt="" aria-hidden="true" />
            <span>{item.likes}</span>
          </span>
        </span>
      ))}
      {searchToolCallWebItems.map((item) => (
        <span className="dotted-demo__thinking-search-detail-web" key={item}>
          <img src={thinkInternet} alt="" aria-hidden="true" />
          <span>{item}</span>
        </span>
      ))}
      <span className="dotted-demo__thinking-search-detail-more">展示更多 23 条内容</span>
    </span>
  )
}

function DottedThinkingCheckIcon() {
  return (
    <span className="dotted-demo__thinking-check" aria-hidden="true">
      <img src={thinkCheckComplete} alt="" />
    </span>
  )
}

function DottedDeepThinkingContent({
  item,
  streamingVariant,
  toolNoteDisplayVariant,
  thinkingDisplayVariant,
}: {
  item: DotsHistoryMessage
  streamingVariant: DottedStreamingVariant
  toolNoteDisplayVariant: DottedToolNoteDisplayVariant
  thinkingDisplayVariant: DottedThinkingDisplayVariant
}) {
  const useTailOpacity = streamingVariant === 'span-mask'
  const visibleTitle = item.deepThinkingTitle ?? ''
  const visibleBody = item.deepThinkingBody ?? ''
  const targetTitle = getDeepThinkingTargetTitle(item.deepThinkingKind)
  const targetBody = getDeepThinkingTargetBody(item.deepThinkingKind)
  const titleComplete = countCharacters(visibleTitle) >= countCharacters(targetTitle)
  const bodyComplete = countCharacters(visibleBody) >= countCharacters(targetBody)
  const shouldShowBody = Boolean(targetBody) && (!useTailOpacity || titleComplete)
  const isSummaryCollapsing = item.deepThinkingSummaryCollapsing === true
  const stackScrollRef = useRef<HTMLSpanElement | null>(null)
  const stackScrollFrameRef = useRef<number | null>(null)
  const stackScrollTargetRef = useRef(0)
  const stackScrollTimeRef = useRef<number | null>(null)
  const [stackHasScrolled, setStackHasScrolled] = useState(false)
  const activeCheckKey = thinkingDisplayVariant === 'stacked' && item.deepThinkingComplete
    ? `${item.id}-${item.deepThinkingKind}-${visibleTitle.length}-${visibleBody.length}`
    : ''
  const [activeCheckReadyKey, setActiveCheckReadyKey] = useState('')
  const activeCheckReady = activeCheckReadyKey === activeCheckKey

  useEffect(() => {
    if (!activeCheckKey) {
      return undefined
    }

    const timerId = window.setTimeout(() => setActiveCheckReadyKey(activeCheckKey), 430)
    return () => window.clearTimeout(timerId)
  }, [activeCheckKey])

  useEffect(() => {
    if (thinkingDisplayVariant !== 'stacked') return undefined

    const scrollElement = stackScrollRef.current
    if (!scrollElement) return undefined

    const frameId = window.requestAnimationFrame(() => {
      const maxScrollTop = scrollElement.scrollHeight - scrollElement.clientHeight
      if (maxScrollTop <= 0) {
        stackScrollTargetRef.current = 0
        setStackHasScrolled(false)
        return
      }

      setStackHasScrolled(maxScrollTop > 1)
      stackScrollTargetRef.current = maxScrollTop
      if (stackScrollFrameRef.current !== null) return

      stackScrollTimeRef.current = null
      const animateScroll = (now: number) => {
        const targetTop = stackScrollTargetRef.current
        const currentTop = scrollElement.scrollTop
        const delta = targetTop - currentTop

        if (Math.abs(delta) <= 0.5) {
          scrollElement.scrollTop = targetTop
          stackScrollFrameRef.current = null
          stackScrollTimeRef.current = null
          return
        }

        const previousTime = stackScrollTimeRef.current ?? now
        const elapsed = Math.max(0, now - previousTime)
        stackScrollTimeRef.current = now
        const step = Math.max(0.5, elapsed * 0.42)
        scrollElement.scrollTop = currentTop + Math.sign(delta) * Math.min(Math.abs(delta), step)
        stackScrollFrameRef.current = window.requestAnimationFrame(animateScroll)
      }

      stackScrollFrameRef.current = window.requestAnimationFrame(animateScroll)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [thinkingDisplayVariant, item.deepThinkingKind, item.deepThinkingComplete, item.deepThinkingTitle, item.deepThinkingBody])

  useEffect(() => () => {
    if (stackScrollFrameRef.current !== null) {
      window.cancelAnimationFrame(stackScrollFrameRef.current)
      stackScrollFrameRef.current = null
    }
  }, [])

  if (thinkingDisplayVariant === 'stacked' && item.deepThinkingKind) {
    const activeIndex = processKindOrder.indexOf(item.deepThinkingKind)
    const visibleProcessKinds = processKindOrder.slice(0, Math.max(activeIndex + 1, 1))
    const activeTargetTitle = getDeepThinkingTargetTitle(item.deepThinkingKind)
    const activeTargetBody = getDeepThinkingTargetBody(item.deepThinkingKind)
    const activeTitleComplete = countCharacters(visibleTitle) >= countCharacters(activeTargetTitle)
    const activeBodyComplete = !activeTargetBody || countCharacters(visibleBody) >= countCharacters(activeTargetBody)
    const shouldShowEntrySheen = !item.deepThinkingComplete && (!activeTitleComplete || !activeBodyComplete)

    return (
      <span className={['dotted-demo__thinking-stack', shouldShowEntrySheen ? 'dotted-demo__thinking-stack--streaming' : '', isSummaryCollapsing ? 'dotted-demo__thinking-stack--summary-collapse' : ''].filter(Boolean).join(' ')}>
        <span className="dotted-demo__thinking-stack-entry">
          <span className="dotted-demo__thinking-stack-entry-text">{isSummaryCollapsing ? '思考完成，参考小红书与全网内容' : '正在思考'}</span>
          {isSummaryCollapsing ? (
            <span className="dotted-demo__thinking-stack-entry-avatars" aria-hidden="true">
              <img src={thinkResponseAvatar1} alt="" />
              <img src={thinkResponseAvatar2} alt="" />
            </span>
          ) : null}
          <img className="dotted-demo__thinking-stack-entry-arrow" src={thinkResponseArrow} alt="" aria-hidden="true" />
        </span>
        <span className={['dotted-demo__thinking-stack-scroll', stackHasScrolled ? 'dotted-demo__thinking-stack-scroll--masked' : ''].filter(Boolean).join(' ')} ref={stackScrollRef}>
        {visibleProcessKinds.map((kind) => {
          const isActive = kind === item.deepThinkingKind
          const rowTitle = isActive ? visibleTitle : getDeepThinkingTargetTitle(kind)
          const rowBody = isActive ? visibleBody : getDeepThinkingTargetBody(kind)
          const rowTargetTitle = getDeepThinkingTargetTitle(kind)
          const rowTargetBody = getDeepThinkingTargetBody(kind)
          const rowTitleComplete = countCharacters(rowTitle) >= countCharacters(rowTargetTitle)
          const rowBodyComplete = countCharacters(rowBody) >= countCharacters(rowTargetBody)
          const rowShouldShowBody = Boolean(rowTargetBody) && isActive && !item.deepThinkingComplete && (!useTailOpacity || rowTitleComplete)
          const rowBodyProgress = rowTargetBody ? Math.min(1, countCharacters(rowBody) / countCharacters(rowTargetBody)) : rowShouldShowBody ? 1 : 0
          const detailTargetHeight = getStackDetailTargetHeight(kind, toolNoteDisplayVariant)
          const hasDetailContent = Boolean(rowTargetBody)
          const shouldRenderDetail = hasDetailContent
          const detailMinHeight = kind === 'toolcallSearch' && toolNoteDisplayVariant === 'preview-detail' ? 28 : 18
          const detailHeight = rowShouldShowBody && shouldRenderDetail ? Math.max(detailMinHeight, detailTargetHeight) : 0
          const rowDetailOpen = rowShouldShowBody && shouldRenderDetail
          const keepToolcallPillsDuringCollapse = kind === 'toolcall' && isActive && item.deepThinkingComplete
          const searchPreviewPillCount = rowShouldShowBody
            ? Math.min(3, Math.max(1, Math.ceil(rowBodyProgress * 3)))
            : keepToolcallPillsDuringCollapse
              ? 3
              : 0
          const isRowComplete = isActive
            ? item.deepThinkingComplete === true && activeCheckReady
            : rowTitleComplete && (!rowTargetBody || rowBodyComplete)

          return (
            <span
              className={[
                'dotted-demo__thinking-stack-row',
                isActive ? 'dotted-demo__thinking-stack-row--active' : 'dotted-demo__thinking-stack-row--collapsed',
                isRowComplete ? 'dotted-demo__thinking-stack-row--complete' : '',
                rowDetailOpen ? 'dotted-demo__thinking-stack-row--detail-open' : '',
                kind === 'toolcall' ? 'dotted-demo__thinking-stack-row--toolcall' : '',
                kind === 'toolcallSearch' ? 'dotted-demo__thinking-stack-row--search' : '',
              ].filter(Boolean).join(' ')}
              key={kind}
            >
              <span className="dotted-demo__thinking-stack-icon" aria-hidden="true">
                {isRowComplete ? (
                  <DottedThinkingCheckIcon />
                ) : (
                  <DottedLottieAnimation
                    src={kind === 'toolcall' ? thinkGlassAnimationUrl : getDeepThinkingAnimationUrl(kind)}
                    className="dotted-demo__thinking-stack-lottie"
                    play={isActive}
                  />
                )}
              </span>
              <span className="dotted-demo__thinking-stack-content">
                <span className="dotted-demo__thinking-stack-title">
                  <DottedStreamingSpanText
                    text={rowTitle}
                    spanKey={`${item.id}-${kind}-title`}
                    enabled={useTailOpacity && isActive}
                    totalVisibleCharacters={countCharacters(rowTitle)}
                    complete={!isActive || rowTitleComplete}
                  />
                </span>
                {shouldRenderDetail ? (
                  <span
                    className={[
                      'dotted-demo__thinking-stack-detail',
                      rowShouldShowBody ? 'dotted-demo__thinking-stack-detail--open' : 'dotted-demo__thinking-stack-detail--closed',
                    ].join(' ')}
                    style={{ '--thinking-stack-detail-height': `${detailHeight}px` } as CSSProperties}
                  >
                    {kind === 'toolcallSearch' && toolNoteDisplayVariant === 'preview-detail' ? (
                      <DottedToolSearchPreviewRows visibleCount={searchPreviewPillCount} className={useTailOpacity ? 'dotted-demo__stream-tail-delayed' : undefined} />
                    ) : kind === 'toolcall' ? (
                      <DottedToolSearchPreviewRows visibleCount={searchPreviewPillCount} webLabels={['知乎', '携程']} className={useTailOpacity ? 'dotted-demo__stream-tail-delayed' : undefined} />
                    ) : kind === 'toolcallSearch' ? (
                      <DottedToolSearchRows
                        text={rowBody}
                        streamingVariant={streamingVariant}
                        totalVisibleCharacters={countCharacters(rowBody)}
                        complete={rowBodyComplete}
                        className={useTailOpacity ? 'dotted-demo__stream-tail-delayed' : undefined}
                      />
                    ) : (
                      <span className={['dotted-demo__thinking-stack-body', useTailOpacity ? 'dotted-demo__stream-tail-delayed' : ''].filter(Boolean).join(' ')}>
                        <DottedStreamingSpanText
                          text={rowBody}
                          spanKey={`${item.id}-${kind}-body`}
                          enabled={useTailOpacity}
                          totalVisibleCharacters={countCharacters(rowBody)}
                          complete={rowBodyComplete}
                        />
                      </span>
                    )}
                  </span>
                ) : null}
              </span>
            </span>
          )
        })}
        </span>
      </span>
    )
  }

  const searchPreviewPillCount = shouldShowBody ? Math.min(3, Math.max(1, Math.ceil((targetBody ? countCharacters(visibleBody) / countCharacters(targetBody) : 1) * 3))) : 0

  return (
    <>
      <span className="dotted-demo__thinking-deep-title">
        <DottedStreamingSpanText
          text={visibleTitle}
          spanKey={`${item.id}-title`}
          enabled={useTailOpacity}
          totalVisibleCharacters={countCharacters(visibleTitle)}
          complete={titleComplete}
        />
      </span>
      {shouldShowBody && item.deepThinkingKind === 'toolcallSearch' && toolNoteDisplayVariant === 'preview-detail' ? (
        <DottedToolSearchPreviewRows visibleCount={searchPreviewPillCount} className={useTailOpacity ? 'dotted-demo__stream-tail-delayed' : undefined} />
      ) : shouldShowBody && item.deepThinkingKind === 'toolcall' ? (
        <DottedToolSearchDetailCards />
      ) : shouldShowBody && item.deepThinkingKind === 'toolcallSearch' ? (
        <DottedToolSearchRows
          text={visibleBody}
          streamingVariant={streamingVariant}
          totalVisibleCharacters={countCharacters(visibleBody)}
          complete={bodyComplete}
          className={useTailOpacity ? 'dotted-demo__stream-tail-delayed' : undefined}
        />
      ) : shouldShowBody ? (
        <span className={['dotted-demo__thinking-deep-body', useTailOpacity ? 'dotted-demo__stream-tail-delayed' : ''].filter(Boolean).join(' ')}>
          <DottedStreamingSpanText
            text={visibleBody}
            spanKey={`${item.id}-body`}
            enabled={useTailOpacity}
            totalVisibleCharacters={countCharacters(visibleBody)}
            complete={bodyComplete}
          />
        </span>
      ) : null}
    </>
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
  toolNoteDisplayVariant = 'consistent',
  thinkingDisplayVariant = 'single',
}: {
  items: DotsHistoryItem[]
  streamRef?: RefObject<HTMLDivElement | null>
  onSourcesClick?: () => void
  onThinkingClick?: () => void
  thinkingTransitionStyle?: DottedThinkingTransitionStyle
  streamingVariant?: DottedStreamingVariant
  toolNoteDisplayVariant?: DottedToolNoteDisplayVariant
  thinkingDisplayVariant?: DottedThinkingDisplayVariant
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
              <DottedFinalResponseCard summaryOnly={item.isFinalResponseSummary} complete={item.isFinalResponseComplete} onSourcesClick={onSourcesClick} streamingVariant={streamingVariant}>{item.text}</DottedFinalResponseCard>
            </div>
          ) : (
            <DotsMessageBubble key={item.id} role={item.role} className={messageClassName}>
              {item.isThinking ? (
              <span
                key={item.id}
                className={[
                  'dotted-demo__thinking',
                  item.isDeepThinking ? `dotted-demo__thinking--transition-${thinkingTransitionStyle}` : '',
                  item.isDeepThinking ? 'dotted-demo__thinking--clickable' : '',
                  item.isJudging ? 'dotted-demo__thinking--judging' : '',
                  item.isJudgingHold ? 'dotted-demo__thinking--judging-hold' : '',
                  item.isDeepThinking ? 'dotted-demo__thinking--deep' : '',
                  item.deepThinkingKind === 'toolcall' ? 'dotted-demo__thinking--toolcall' : '',
                  item.deepThinkingKind === 'thinkCompact' && !item.deepThinkingBody ? 'dotted-demo__thinking--think-compact' : '',
                  item.deepThinkingKind === 'toolcallSearch' ? 'dotted-demo__thinking--toolcall-search' : '',
                  item.deepThinkingKind === 'thinkPlan' ? 'dotted-demo__thinking--think-plan' : '',
                  item.thinkingDisplayVariant === 'stacked' ? 'dotted-demo__thinking--stacked' : '',
                  item.isDeepThinkingTitleComplete ? 'dotted-demo__thinking--deep-title-complete' : '',
                  useSpanMask ? 'dotted-demo__thinking--tail-stream' : '',
                ].filter(Boolean).join(' ')}
                role={item.isDeepThinking ? 'button' : undefined}
                tabIndex={item.isDeepThinking ? 0 : undefined}
                onClick={item.isDeepThinking ? onThinkingClick : undefined}
                onKeyDown={item.isDeepThinking ? handleThinkingKeyDown : undefined}
                aria-label={item.text || '判断中'}
                style={
                  item.isDeepThinking
                    ? ({
                        '--thinking-deep-width': `${thinkingDisplayVariant === 'stacked' ? 361 : getDeepThinkingWidth(item.deepThinkingKind)}px`,
                      } as CSSProperties)
                    : item.isJudging
                    ? ({
                        '--thinking-width': `${52 + simpleJudgmentCopyWidthPx * (item.thinkingProgress ?? 0)}px`,
                        '--thinking-copy-width': `${simpleJudgmentCopyWidthPx * (item.thinkingProgress ?? 0)}px`,
                      } as CSSProperties)
                    : undefined
                }
              >
                <DottedLottieAnimation
                  src={thinkingStages[item.deepThinkingKind === 'toolcallSearch' ? 2 : item.deepThinkingKind === 'toolcall' ? 1 : item.thinkingStageIndex ?? 0].animationUrl}
                  className="dotted-demo__thinking-lottie"
                />
                {item.isDeepThinking ? (
                  <DottedDeepThinkingContent
                    item={item}
                    streamingVariant={streamingVariant}
                    toolNoteDisplayVariant={toolNoteDisplayVariant}
                    thinkingDisplayVariant={thinkingDisplayVariant}
                  />
                ) : (
                  item.isJudging && (
                    <span className="dotted-demo__thinking-copy">
                      <DottedStreamingSpanText text={item.text} spanKey={`${item.id}-judging`} enabled={useSpanMask} totalVisibleCharacters={countCharacters(item.text)} complete={item.isJudgingHold} />
                    </span>
                  )
                )}
              </span>
              ) : item.isStreaming ? (
                <span className="dotted-demo__streaming-text">
                  <DottedStreamingSpanText text={item.text} spanKey={`${item.id}-streaming`} enabled={useSpanMask} totalVisibleCharacters={countCharacters(item.text)} complete={item.text.length >= streamingReplyTextFull.length} />
                </span>
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
      detail: compactThinkBodyText,
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
  summaryOnly = false,
  onSourcesClick,
  streamingVariant = 'default',
}: {
  children: ReactNode
  complete?: boolean
  summaryOnly?: boolean
  onSourcesClick?: () => void
  streamingVariant?: DottedStreamingVariant
}) {
  const streamedText = String(children)
  const visibleCount = Array.from(streamedText).length
  const useSpanMask = streamingVariant === 'span-mask'

  return (
    <article className={['dotted-demo__response-card', summaryOnly ? 'dotted-demo__response-card--summary' : ''].filter(Boolean).join(' ')} aria-label="Dots 最终回答">
      <div className="dotted-demo__response-main">
        <button className="dotted-demo__response-status" type="button" onClick={onSourcesClick}>
          <span>思考完成，参考小红书与全网内容</span>
          <span className="dotted-demo__response-avatars" aria-hidden="true">
            <img src={thinkResponseAvatar1} alt="" />
            <img src={thinkResponseAvatar2} alt="" />
          </span>
          <img className="dotted-demo__response-arrow" src={thinkResponseArrow} alt="" aria-hidden="true" />
        </button>
        {!summaryOnly && <div className="dotted-demo__response-content">
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
                    <DottedStreamingSpanText text={visibleText} spanKey={`${block.type}-${blockIndex}`} enabled={useSpanMask} characterStartIndex={previousLength} totalVisibleCharacters={visibleCount} complete={complete} />
                  </h3>
                )
              }

              if (block.type === 'bullet') {
                return (
                  <div className="dotted-demo__response-bullet" key={`${block.type}-${blockIndex}`}>
                    <span aria-hidden="true" />
                    <p>
                      <DottedStreamingSpanText text={visibleText} spanKey={`${block.type}-${blockIndex}`} enabled={useSpanMask} characterStartIndex={previousLength} totalVisibleCharacters={visibleCount} complete={complete} />
                    </p>
                  </div>
                )
              }

              return (
                <p key={`${block.type}-${blockIndex}`}>
                  <DottedStreamingSpanText text={visibleText} spanKey={`${block.type}-${blockIndex}`} enabled={useSpanMask} characterStartIndex={previousLength} totalVisibleCharacters={visibleCount} complete={complete} />
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
        </div>}
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
  toolNoteDisplayVariant = 'consistent',
}: {
  mode: DottedSheetMode
  onClose: () => void
  currentThinkingKind: DottedProcessKind
  currentThinkingTitle: string
  currentThinkingBody: string
  isThinkingComplete: boolean
  toolNoteDisplayVariant?: DottedToolNoteDisplayVariant
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
      detail: compactThinkBodyText,
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
                          {row.kind === 'toolcallSearch' && toolNoteDisplayVariant === 'preview-detail' ? (
                            <DottedToolSearchDetailCards />
                          ) : row.kind === 'toolcall' ? (
                            <DottedToolSearchDetailCards />
                          ) : row.kind === 'toolcallSearch' ? (
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
  toolNoteDisplayVariant = 'consistent',
  thinkingDisplayVariant = 'single',
}: {
  demoMode?: DottedDemoMode
  demoStep?: DottedDemoStep
  continueAfterStep?: boolean
  paused?: boolean
  resumeSignal?: number
  onStepChange?: (step: DottedDemoStep) => void
  thinkingTransitionStyle?: DottedThinkingTransitionStyle
  streamingVariant?: DottedStreamingVariant
  toolNoteDisplayVariant?: DottedToolNoteDisplayVariant
  thinkingDisplayVariant?: DottedThinkingDisplayVariant
} = {}) {
  const chatStreamRef = useRef<HTMLDivElement>(null)
  const jumpToBottomDismissedRef = useRef(false)
  const handledResumeSignalRef = useRef(0)
  const playbackSnapshotRef = useRef({
    phase: 'thinking' as 'thinking' | 'judging' | 'judgingHold' | 'streaming' | 'think' | 'thinkHold' | 'toolcall' | 'toolcallHold' | 'thinkCompact' | 'thinkCompactHold' | 'toolcallSearch' | 'toolcallSearchHold' | 'thinkPlan' | 'thinkPlanHold' | 'thinkingComplete' | 'thinkingSummary' | 'response' | 'done',
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
  const [streamingPhase, setStreamingPhase] = useState<'thinking' | 'judging' | 'judgingHold' | 'streaming' | 'think' | 'thinkHold' | 'toolcall' | 'toolcallHold' | 'thinkCompact' | 'thinkCompactHold' | 'toolcallSearch' | 'toolcallSearchHold' | 'thinkPlan' | 'thinkPlanHold' | 'thinkingComplete' | 'thinkingSummary' | 'response' | 'done'>('thinking')
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
        : streamingPhase === 'thinkingComplete' || streamingPhase === 'thinkingSummary' || streamingPhase === 'response'
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
      if (kind === 'thinkCompact') return { titleCharacters: compactThinkTitleCharacters, bodyCharacters: compactThinkBodyCharacters, holdPhase: 'thinkCompactHold' as const }
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
      setFinalResponseReplyText('')
      setPreviousThinking(null)

      const typeFinalResponseCharacter = () => {
        finalResponseCursor += 1
        setFinalResponseReplyText(finalResponseCharacters.slice(0, finalResponseCursor).join(''))
        if (finalResponseCursor >= finalResponseCharacters.length) {
          setStreamingPhase('done')
          return
        }

        timers.push(window.setTimeout(typeFinalResponseCharacter, 12))
      }

      setStreamingPhase('thinkingComplete')
      timers.push(window.setTimeout(() => {
        setStreamingPhase('thinkingSummary')

        timers.push(window.setTimeout(() => {
          setDeepThinkingTitle('')
          setDeepThinkingBody('')
          setStreamingPhase('response')
          timers.push(window.setTimeout(typeFinalResponseCharacter, responseStartDelayMs))
        }, thinkingSummaryMorphMs))
      }, thinkingCompleteConfirmMs))
    }
    const showContext = (startLength = 0, continueToThink = true) => {
      let replyCursor = Math.min(startLength, streamingReplyCharacters.length)
      setStreamingReplyText(streamingReplyCharacters.slice(0, replyCursor).join(''))
      setStreamingPhase('streaming')

      const typeContextCharacter = () => {
        replyCursor = Math.min(streamingReplyCharacters.length, replyCursor + contextCharacterStep)
        setStreamingReplyText(streamingReplyCharacters.slice(0, replyCursor).join(''))
        if (replyCursor >= streamingReplyCharacters.length) {
          if (continueToThink) {
            timers.push(window.setTimeout(() => runProcessFromKind('think'), contextToThinkDelayMs))
          }
          return
        }

        timers.push(window.setTimeout(typeContextCharacter, contextCharacterDelayMs))
      }

      timers.push(window.setTimeout(typeContextCharacter, 24))
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
        const enterHoldAndContinue = () => {
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

        if (kind === 'toolcallSearch') {
          timers.push(window.setTimeout(enterHoldAndContinue, toolcallSearchCompletePauseMs))
          return
        }

        if (kind === 'thinkCompact') {
          setStreamingPhase('thinkCompactHold')
          timers.push(window.setTimeout(() => {
            showPreviousThinking('thinkCompact', compactThinkTitleText, compactThinkBodyText)
            runProcessFromKind('toolcallSearch')
          }, compactThinkCompleteHoldMs))
          return
        }

        enterHoldAndContinue()
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
          if (bodyCharacters.length === 0) {
            completeCurrentProcess()
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
                showContext(snapshot.streamingLength)
              }, snapshot.phase === 'judgingHold' ? 0 : 2000))
              return
            }

            timers.push(window.setTimeout(continueJudgment, 34))
          }

          continueJudgment()
          return
        }

        if (snapshot.phase === 'streaming') {
          showContext(snapshot.streamingLength)
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
          runProcessFromKind('thinkCompact', snapshot.deepTitleLength, snapshot.deepBodyLength)
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

        if (snapshot.phase === 'thinkingComplete' || snapshot.phase === 'thinkingSummary') {
          runResponse()
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

          if (finalResponseCursor <= 0) {
            timers.push(window.setTimeout(continueFinalResponse, responseStartDelayMs))
            return
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
                showContext()
              }, 2000))
              return
            }

            timers.push(window.setTimeout(typeJudgmentCharacter, 34))
          }

          typeJudgmentCharacter()
          return
        }

        if (demoStep === 'context') {
          showContext()
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
        setStreamingReplyText('')
        setSimpleJudgmentReplyText(simpleJudgmentText)
        setDeepThinkingTitle('')
        setDeepThinkingBody('')
        setFinalResponseReplyText('')
        setDeepThinkingKind('think')
        setPreviousThinking(null)
        setStreamingPhase('streaming')
        setThinkingStageIndex(0)
        showContext(0, false)
      }, 0))
      return () => timers.forEach((timerId) => window.clearTimeout(timerId))
    }

    if (demoStep === 'think' || demoStep === 'toolcall' || demoStep === 'think-compact' || demoStep === 'toolcall-search' || demoStep === 'think-plan') {
      timers.push(window.setTimeout(() => {
        let titleCursor = 0
        const nextKind = demoStep === 'think-plan' ? 'thinkPlan' : demoStep === 'toolcall-search' ? 'toolcallSearch' : demoStep === 'toolcall' ? 'toolcall' : demoStep === 'think-compact' ? 'thinkCompact' : 'think'
        const titleCharacters = nextKind === 'thinkPlan' ? planThinkTitleCharacters : nextKind === 'toolcallSearch' ? searchToolCallTitleCharacters : nextKind === 'toolcall' ? toolCallTitleCharacters : nextKind === 'thinkCompact' ? compactThinkTitleCharacters : deepThinkingTitleCharacters
        const bodyCharacters = nextKind === 'thinkPlan' ? planThinkBodyCharacters : nextKind === 'toolcallSearch' ? searchToolCallBodyCharacters : nextKind === 'toolcall' ? toolCallBodyCharacters : nextKind === 'thinkCompact' ? compactThinkBodyCharacters : deepThinkingBodyCharacters
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
            let bodyCursor = 0

            const typeDeepBodyCharacter = () => {
              bodyCursor += 1
              setDeepThinkingBody(bodyCharacters.slice(0, bodyCursor).join(''))
              if (bodyCursor >= bodyCharacters.length) {
                const holdPhase = nextKind === 'thinkPlan' ? 'thinkPlanHold' : nextKind === 'toolcallSearch' ? 'toolcallSearchHold' : nextKind === 'toolcall' ? 'toolcallHold' : nextKind === 'thinkCompact' ? 'thinkCompactHold' : 'thinkHold'
                if (nextKind === 'toolcallSearch') {
                  timers.push(window.setTimeout(() => setStreamingPhase(holdPhase), toolcallSearchCompletePauseMs))
                  return
                }

                setStreamingPhase(holdPhase)
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

        timers.push(window.setTimeout(typeFinalResponseCharacter, responseStartDelayMs))
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
            showContext(0, false)
            timers.push(window.setTimeout(() => {
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
                                        let compactBodyCursor = 0

                                        const typeCompactThinkBodyCharacter = () => {
                                          compactBodyCursor += 1
                                          setDeepThinkingBody(compactThinkBodyCharacters.slice(0, compactBodyCursor).join(''))
                                          if (compactBodyCursor >= compactThinkBodyCharacters.length) {
                                            setStreamingPhase('thinkCompactHold')
                                            timers.push(window.setTimeout(() => {
                                              let searchToolTitleCursor = 0
                                              showPreviousThinking('thinkCompact', compactThinkTitleText, compactThinkBodyText)
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
                                                      timers.push(window.setTimeout(() => {
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
                                                                    runResponse()
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
                                                      }, toolcallSearchCompletePauseMs))
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
                                            }, compactThinkCompleteHoldMs))
                                            return
                                          }

                                          timers.push(window.setTimeout(typeCompactThinkBodyCharacter, 28))
                                        }

                                        typeCompactThinkBodyCharacter()
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
            }, Math.ceil(streamingReplyCharacters.length / contextCharacterStep) * contextCharacterDelayMs + contextToThinkDelayMs))
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
  const deepThinkingComplete = (
    (deepThinkingKind === 'think' && streamingPhase === 'thinkHold')
    || (deepThinkingKind === 'toolcall' && streamingPhase === 'toolcallHold')
    || (deepThinkingKind === 'thinkCompact' && streamingPhase === 'thinkCompactHold')
    || (deepThinkingKind === 'toolcallSearch' && streamingPhase === 'toolcallSearchHold')
    || (deepThinkingKind === 'thinkPlan' && streamingPhase === 'thinkPlanHold')
    || (deepThinkingKind === 'thinkPlan' && streamingPhase === 'thinkingComplete')
    || (deepThinkingKind === 'thinkPlan' && streamingPhase === 'thinkingSummary')
  )
  const shouldRenderDeepThinking = streamingPhase !== 'response'
    && streamingPhase !== 'done'
    && (
      Boolean(deepThinkingTitle)
      || Boolean(deepThinkingBody)
      || streamingPhase === 'think'
      || streamingPhase === 'thinkHold'
      || streamingPhase === 'toolcall'
      || streamingPhase === 'toolcallHold'
      || streamingPhase === 'thinkCompact'
      || streamingPhase === 'thinkCompactHold'
      || streamingPhase === 'toolcallSearch'
      || streamingPhase === 'toolcallSearchHold'
      || streamingPhase === 'thinkPlan'
      || streamingPhase === 'thinkPlanHold'
      || streamingPhase === 'thinkingComplete'
    )
  const chatItems: DotsHistoryItem[] = [
    {
      id: 'user-query',
      type: 'message',
      role: 'user',
      text: '帮我安排和五个朋友的暑假十天左右的新疆旅游计划，主要想玩伊犁环线，帮我安排行程规划和打卡攻略。',
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
          ...(shouldRenderDeepThinking
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
                  deepThinkingComplete,
                  previousDeepThinkingTitle: previousThinking?.title,
                  previousDeepThinkingBody: previousThinking?.body,
                  previousDeepThinkingKind: previousThinking?.kind,
                  thinkingDisplayVariant,
                  deepThinkingSummaryCollapsing: streamingPhase === 'thinkingSummary',
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
                  isFinalResponseSummary: streamingPhase === 'thinkingSummary',
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
            toolNoteDisplayVariant={toolNoteDisplayVariant}
            thinkingDisplayVariant={thinkingDisplayVariant}
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
            isThinkingComplete={streamingPhase === 'thinkingComplete' || streamingPhase === 'thinkingSummary' || streamingPhase === 'response' || streamingPhase === 'done'}
            toolNoteDisplayVariant={toolNoteDisplayVariant}
            onClose={() => setActiveSheetMode(null)}
          />
        )}
      </div>
    </div>
  )
}
