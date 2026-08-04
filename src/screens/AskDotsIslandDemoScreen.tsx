import { useCallback, useEffect, useRef, useState, type AnimationEvent, type UIEvent } from 'react'
import backIcon from '../assets/dotted/ask-dots-island/back.svg'
import closeIcon from '../assets/dotted/ask-dots-island/close.svg'
import dotsAvatar from '../assets/dotted/ask-dots-island/dots-avatar.svg'
import filterIcon from '../assets/dotted/ask-dots-island/filter.svg'
import islandGlowBottom from '../assets/dotted/ask-dots-island/island-glow-bottom.svg'
import islandGlowTop from '../assets/dotted/ask-dots-island/island-glow-top.svg'
import likeIcon from '../assets/dotted/ask-dots-island/like.svg'
import figma01Avatar from '../assets/dotted/ask-dots-island/results/figma-01-avatar.png'
import figma01Cover from '../assets/dotted/ask-dots-island/results/figma-01-cover.png'
import figma02Avatar from '../assets/dotted/ask-dots-island/results/figma-02-avatar.png'
import figma02Cover from '../assets/dotted/ask-dots-island/results/figma-02-cover.png'
import figma03Avatar from '../assets/dotted/ask-dots-island/results/figma-03-avatar.png'
import figma03Cover from '../assets/dotted/ask-dots-island/results/figma-03-cover.png'
import figma04Avatar from '../assets/dotted/ask-dots-island/results/figma-04-avatar.png'
import figma04Cover from '../assets/dotted/ask-dots-island/results/figma-04-cover.png'
import figma05Avatar from '../assets/dotted/ask-dots-island/results/figma-05-avatar.png'
import figma05Cover from '../assets/dotted/ask-dots-island/results/figma-05-cover.png'
import figma06Avatar from '../assets/dotted/ask-dots-island/results/figma-06-avatar.png'
import figma06Cover from '../assets/dotted/ask-dots-island/results/figma-06-cover.png'
import figma07Avatar from '../assets/dotted/ask-dots-island/results/figma-07-avatar.png'
import figma07Cover from '../assets/dotted/ask-dots-island/results/figma-07-cover.png'
import figma08Avatar from '../assets/dotted/ask-dots-island/results/figma-08-avatar.png'
import figma08Cover from '../assets/dotted/ask-dots-island/results/figma-08-cover.png'
import figma09Avatar from '../assets/dotted/ask-dots-island/results/figma-09-avatar.png'
import figma09Cover from '../assets/dotted/ask-dots-island/results/figma-09-cover.png'
import figma10Avatar from '../assets/dotted/ask-dots-island/results/figma-10-avatar.png'
import figma10Cover from '../assets/dotted/ask-dots-island/results/figma-10-cover.png'
import figma11Avatar from '../assets/dotted/ask-dots-island/results/figma-11-avatar.png'
import figma11Cover from '../assets/dotted/ask-dots-island/results/figma-11-cover.png'
import figma12Avatar from '../assets/dotted/ask-dots-island/results/figma-12-avatar.png'
import figma12Cover from '../assets/dotted/ask-dots-island/results/figma-12-cover.png'
import figma13Avatar from '../assets/dotted/ask-dots-island/results/figma-13-avatar.png'
import figma13Cover from '../assets/dotted/ask-dots-island/results/figma-13-cover.png'
import figma14Avatar from '../assets/dotted/ask-dots-island/results/figma-14-avatar.png'
import figma14Cover from '../assets/dotted/ask-dots-island/results/figma-14-cover.png'
import searchDivider from '../assets/dotted/ask-dots-island/search-divider.svg'
import tabDivider from '../assets/dotted/ask-dots-island/tab-divider.svg'
import { DottedDemoScreen, type DottedEntryScenario } from './DottedDemoScreen'
import { askDotsFamilyResponse } from './dotted/askDotsFamilyResponse'
import { ProcessIndicator } from './dotted/ProcessIndicator'
import { IOSStatusBar } from './shared/IOSStatusBar'
import './AskDotsIslandDemoScreen.css'

const resultCards = [
  { id: 'figma-note-01', image: figma01Cover, avatar: figma01Avatar, author: '小怡家', title: '今日打卡上海自然博物馆，五岁娃真实体验' },
  { id: 'figma-note-02', image: figma02Cover, avatar: figma02Avatar, author: '带娃去哪玩', title: '上海自然博物馆半日游攻略。' },
  { id: 'figma-note-03', image: figma03Cover, avatar: figma03Avatar, author: '嘿Sasha', title: '北京周边宝藏小众景点，看一篇就够了！周末全家出游' },
  { id: 'figma-note-04', image: figma04Cover, avatar: figma04Avatar, author: '方方方.', title: '找到了！上海值得反复遛娃的好地方🥹' },
  { id: 'figma-note-05', image: figma05Cover, avatar: figma05Avatar, author: '小猪泡泡', title: '上海最好的地方都是免费的' },
  { id: 'figma-note-06', image: figma06Cover, avatar: figma06Avatar, author: '不吃红枣', title: '魔都最刺激的室内滑梯全在这里！' },
  { id: 'figma-note-07', image: figma07Cover, avatar: figma07Avatar, author: '小福仔翘班打游戏', title: '临港免费遛娃天花板！少年宫后悔没早来！' },
  { id: 'figma-note-08', image: figma08Cover, avatar: figma08Avatar, author: '發财vivi', title: '江浙沪最值得带娃去的8个宝藏目的地｜抄作业' },
  { id: 'figma-note-09', image: figma09Cover, avatar: figma09Avatar, author: '杏仁可颂🥐', title: '上海自然博物馆🦕4岁娃科普遛娃' },
  { id: 'figma-note-10', image: figma10Cover, avatar: figma10Avatar, author: '葡萄肉多多', title: '北京周边宝藏小众景点，看一篇就够了！周末全家出游' },
  { id: 'figma-note-11', image: figma11Cover, avatar: figma11Avatar, author: '花昔Alycia', title: '🌵 亚洲蕞大的温室花园！雨林沙漠一秒穿越' },
  { id: 'figma-note-12', image: figma12Cover, avatar: figma12Avatar, author: '小汤圆的额娘', title: '📚魔都新增免费🆓遛娃好去处 | 少儿图书馆' },
  { id: 'figma-note-13', image: figma13Cover, avatar: figma13Avatar, author: '小伞', title: '溜娃天花板｜上海宝藏公园推荐一' },
  { id: 'figma-note-14', image: figma14Cover, avatar: figma14Avatar, author: '嘻嘻嘻', title: '北京周边宝藏小众景点，看一篇就够了！周末全家出游' },
] as const

const searchTabs = ['全部', '用户', '商品', '图片', '地点'] as const
const thinkingScenario: DottedEntryScenario = {
  userQuery: '帮我总结上海周末遛娃好去处',
  judgmentText: '搜索亲子去处并过滤营销软广',
  contextText: '',
  thinkingTitle: '整理上海周末遛娃好去处',
  thinkingHoldMs: 2000,
  response: askDotsFamilyResponse,
}

function triggerLightHaptic() {
  navigator.vibrate?.(15)
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function createRandomTime() {
  const bucket = Math.random()
  if (bucket < 0.45) return `${randomBetween(3, 59)}分钟前`
  if (bucket < 0.82) return `${randomBetween(1, 23)}小时前`
  return `${randomBetween(1, 7)}天前`
}

function createRandomLikes() {
  const likes = randomBetween(86, 32800)
  if (likes < 10000) return String(likes)
  return `${(likes / 10000).toFixed(1).replace('.0', '')}万`
}

function shuffleCards<T>(items: readonly T[]) {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = randomBetween(0, index)
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex]!, shuffled[index]!]
  }
  return shuffled
}

export function AskDotsIslandDemoScreen() {
  const [view, setView] = useState<'results' | 'thinking'>('results')
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'entering' | 'leaving'>('idle')
  const [expanded, setExpanded] = useState(false)
  const [prompted, setPrompted] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [conversationStarted, setConversationStarted] = useState(false)
  const [answerPending, setAnswerPending] = useState(false)
  const [hideCompletedStatus, setHideCompletedStatus] = useState(false)
  const [renderCycleCount, setRenderCycleCount] = useState(1)
  const appendedScrollHeightRef = useRef(0)
  const [cards] = useState(() => shuffleCards(resultCards).map((card) => ({
    ...card,
    time: createRandomTime(),
    likes: createRandomLikes(),
  })))
  const cardColumns = [
    cards.filter((_, index) => index % 2 === 0),
    cards.filter((_, index) => index % 2 === 1),
  ]

  useEffect(() => {
    if (!expanded) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [expanded])

  const enterThinking = () => {
    triggerLightHaptic()
    if (!conversationStarted) {
      setConversationStarted(true)
      setAnswerPending(true)
    }
    setHideCompletedStatus(false)
    setPrompted(true)
    setExpanded(false)
    setTransitionPhase('entering')
    setView('thinking')
  }

  const handleResponseComplete = useCallback(() => {
    setAnswerPending(false)
  }, [])

  const leaveThinking = () => {
    triggerLightHaptic()
    if (!answerPending) setHideCompletedStatus(true)
    setTransitionPhase('leaving')
  }

  const handleConversationAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return

    if (transitionPhase === 'leaving') {
      setView('results')
      setTransitionPhase('idle')
      if (hideCompletedStatus) {
        setConversationStarted(false)
        setHideCompletedStatus(false)
      }
      return
    }

    if (transitionPhase === 'entering') setTransitionPhase('idle')
  }

  const dismissPrompt = () => {
    triggerLightHaptic()
    setDismissed(true)
    setExpanded(false)
  }

  const handleResultsScroll = (event: UIEvent<HTMLElement>) => {
    const scrollArea = event.currentTarget

    if (
      scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight < scrollArea.clientHeight
      && appendedScrollHeightRef.current !== scrollArea.scrollHeight
    ) {
      appendedScrollHeightRef.current = scrollArea.scrollHeight
      setRenderCycleCount((count) => count + 1)
    }

    if (answerPending || prompted || dismissed) return
    if (scrollArea.scrollTop < scrollArea.clientHeight * 0.85) return

    setPrompted(true)
    setExpanded(true)
  }

  const hasVisibleConversationStatus = conversationStarted && !hideCompletedStatus
  const islandStatusLabel = hasVisibleConversationStatus
    ? (answerPending ? '思考中' : '已总结')
    : '问点点'

  return (
    <div className="ask-dots-demo-stage">
      <IOSStatusBar className="ask-dots-demo-stage__system-status" />
      <svg className="ask-dots-demo-stage__liquid-filter" aria-hidden="true">
        <defs>
          <filter id="ask-dots-liquid-glass" x="-25%" y="-45%" width="150%" height="190%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.045" numOctaves={2} seed={8} stitchTiles="stitch" result="liquid-noise" />
            <feGaussianBlur in="liquid-noise" stdDeviation={3} result="liquid-map" />
            <feMorphology in="SourceAlpha" operator="erode" radius={8} result="glass-center-mask" />
            <feComposite in="SourceAlpha" in2="glass-center-mask" operator="out" result="glass-edge-mask" />
            <feDisplacementMap in="SourceGraphic" in2="liquid-map" scale={32} xChannelSelector="R" yChannelSelector="B" result="glass-red-displaced" />
            <feColorMatrix
              in="glass-red-displaced"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="glass-red-channel"
            />
            <feDisplacementMap in="SourceGraphic" in2="liquid-map" scale={30} xChannelSelector="R" yChannelSelector="B" result="glass-green-displaced" />
            <feColorMatrix
              in="glass-green-displaced"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="glass-green-channel"
            />
            <feDisplacementMap in="SourceGraphic" in2="liquid-map" scale={28} xChannelSelector="R" yChannelSelector="B" result="glass-blue-displaced" />
            <feColorMatrix
              in="glass-blue-displaced"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="glass-blue-channel"
            />
            <feBlend in="glass-green-channel" in2="glass-blue-channel" mode="screen" result="glass-green-blue" />
            <feBlend in="glass-red-channel" in2="glass-green-blue" mode="screen" result="glass-aberration" />
            <feGaussianBlur in="glass-aberration" stdDeviation={0.25} result="glass-refraction" />
            <feComposite in="glass-refraction" in2="glass-edge-mask" operator="in" result="glass-edge-refraction" />
            <feComposite in="SourceGraphic" in2="glass-center-mask" operator="in" result="glass-center" />
            <feComposite in="glass-edge-refraction" in2="glass-center" operator="over" result="glass-body" />
            <feSpecularLighting in="liquid-map" surfaceScale={10} specularConstant={0.85} specularExponent={40} lightingColor="var(--always-white)" result="glass-specular">
              <fePointLight x={-80} y={-120} z={180} />
            </feSpecularLighting>
            <feComposite in="glass-specular" in2="glass-edge-mask" operator="in" result="glass-edge-light" />
            <feBlend in="glass-body" in2="glass-edge-light" mode="screen" />
          </filter>
        </defs>
      </svg>

      <main className="ask-dots-demo" data-theme="light" aria-hidden={view === 'thinking'} inert={view === 'thinking' ? true : undefined}>
        <div className="ask-dots-demo__header-surface" aria-hidden="true" />
        <div
          className={`ask-dots-demo__header-mask${expanded ? ' ask-dots-demo__header-mask--visible' : ''}`}
          aria-hidden="true"
        />

        <header className="ask-dots-demo__search-row">
          <button className="ask-dots-demo__icon-button" type="button" aria-label="返回">
            <img src={backIcon} alt="" draggable={false} />
          </button>
          <div className="ask-dots-demo__search-field">
            <span className="ask-dots-demo__query">上海周末遛娃好去处</span>
            <span className="ask-dots-demo__search-actions">
              <span className="ask-dots-demo__clear-icon">
                <img src={closeIcon} alt="" draggable={false} />
              </span>
              <span className="ask-dots-demo__search-divider">
                <img src={searchDivider} alt="" draggable={false} />
              </span>
              <span className="ask-dots-demo__search-label">搜索</span>
            </span>
          </div>
        </header>

      <nav className="ask-dots-demo__tabs" aria-label="搜索分类">
        <div className="ask-dots-demo__tab-list">
          {searchTabs.map((tab, index) => (
            <button
              className={`ask-dots-demo__tab${index === 0 ? ' ask-dots-demo__tab--active' : ''}`}
              type="button"
              key={tab}
            >
              {tab}
              {index === 0 && <img src={filterIcon} alt="" draggable={false} />}
            </button>
          ))}
        </div>
      </nav>

      <section className="ask-dots-demo__results-scroll" aria-label="搜索结果" onScroll={handleResultsScroll}>
        <div className="ask-dots-demo__results">
          {cardColumns.map((column, columnIndex) => (
            <div className="ask-dots-demo__result-column" key={columnIndex === 0 ? 'left' : 'right'}>
              {Array.from({ length: renderCycleCount }, (_, cycleIndex) => column.map((card) => (
                <article
                  className="ask-dots-demo__result-card"
                  data-card-id={card.id}
                  data-card-cycle={cycleIndex}
                  key={`${cycleIndex}-${card.id}`}
                >
                  <img
                    className="ask-dots-demo__result-image"
                    src={card.image}
                    alt={card.title}
                    draggable={false}
                  />
                  <div className="ask-dots-demo__result-copy">
                    <h2>{card.title}</h2>
                    <div className="ask-dots-demo__result-meta">
                      <div className="ask-dots-demo__author">
                        <img src={card.avatar} alt="" draggable={false} />
                        <span>
                          <b>{card.author}</b>
                          <small>{card.time}</small>
                        </span>
                      </div>
                      <span className="ask-dots-demo__likes">
                        <span className="ask-dots-demo__like-icon">
                          <img src={likeIcon} alt="" draggable={false} />
                        </span>
                        {card.likes}
                      </span>
                    </div>
                  </div>
                </article>
              )))}
            </div>
          ))}
        </div>
      </section>

      <aside
        className={`ask-dots-demo__island${expanded ? ' ask-dots-demo__island--expanded' : ''}`}
        aria-label={answerPending ? '点点正在思考' : hasVisibleConversationStatus ? '点点已总结' : '问点点总结提示'}
      >
        <span className="ask-dots-demo__island-liquid" aria-hidden="true">
          <span className="ask-dots-demo__island-glow ask-dots-demo__island-glow--bottom">
            <img src={islandGlowBottom} alt="" draggable={false} />
          </span>
          <span className="ask-dots-demo__island-glow ask-dots-demo__island-glow--top">
            <img src={islandGlowTop} alt="" draggable={false} />
          </span>
        </span>

        <span className="ask-dots-demo__island-logo" aria-hidden="true">
          {answerPending ? (
            <ProcessIndicator
              kind="thinking"
              playing
              className="ask-dots-demo__island-thinking"
            />
          ) : (
            <img
              className="ask-dots-demo__island-dots-logo"
              src={dotsAvatar}
              alt=""
              draggable={false}
            />
          )}
        </span>

        <span className="ask-dots-demo__island-copy" aria-hidden="true">
          <span className={`ask-dots-demo__island-copy-label${answerPending ? ' ask-dots-demo__island-copy-label--pending' : ''}`}>
            {islandStatusLabel}
          </span>
          <span className="ask-dots-demo__island-copy-question">
            需要我帮你总结下上海周末遛娃好去处吗？
          </span>
        </span>

        <button
          className="ask-dots-demo__island-trigger"
          type="button"
          aria-label={answerPending ? '查看思考中的回答' : hasVisibleConversationStatus ? '查看已总结的回答' : '问点点'}
          onClick={enterThinking}
        >
          <span className="ask-dots-demo__tab-divider">
            <img src={tabDivider} alt="" draggable={false} />
          </span>
        </button>

        <div className="ask-dots-demo__island-content" aria-hidden={!expanded}>
          <div className="ask-dots-demo__island-actions">
            <button type="button" onClick={dismissPrompt}>忽略</button>
            <button type="button" className="ask-dots-demo__summary" onClick={enterThinking}>立即总结</button>
          </div>
        </div>
      </aside>

        <div className="ask-dots-demo__home-indicator" aria-hidden="true" />
      </main>

      {conversationStarted ? (
        <div
          className={`ask-dots-demo__conversation-transition${view === 'results' && transitionPhase === 'idle' ? ' ask-dots-demo__conversation-transition--parked' : ''}${transitionPhase === 'idle' ? '' : ` ask-dots-demo__conversation-transition--${transitionPhase}`}`}
          aria-hidden={view === 'results'}
          inert={view === 'results' ? true : undefined}
          onAnimationEnd={handleConversationAnimationEnd}
        >
          <DottedDemoScreen
            demoMode="streaming-reply"
            demoStep="think"
            continueAfterStep
            entryScenario={thinkingScenario}
            onBack={leaveThinking}
            onResponseComplete={handleResponseComplete}
            quickAnswerEnabled={false}
            shellVariant="main-site"
            streamingVariant="span-mask"
            thinkingDisplayVariant="single"
          />
        </div>
      ) : null}
    </div>
  )
}
