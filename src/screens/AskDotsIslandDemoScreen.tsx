import { useCallback, useEffect, useRef, useState, type AnimationEvent, type TransitionEvent, type UIEvent } from 'react'
import backIcon from '../assets/dotted/ask-dots-island/back.svg'
import closeIcon from '../assets/dotted/ask-dots-island/close.svg'
import dotsAvatar from '../assets/dotted/ask-dots-island/dots-avatar.svg'
import filterIcon from '../assets/dotted/ask-dots-island/filter.svg'
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
import schemeBAvatar from '../assets/dotted/ask-dots-island/scheme-b-avatar.svg'
import schemeBPointer from '../assets/dotted/ask-dots-island/scheme-b-pointer.svg'
import tabDivider from '../assets/dotted/ask-dots-island/tab-divider.svg'
import { DottedDemoScreen, type DottedEntryScenario } from './DottedDemoScreen'
import { askDotsFamilyResponse } from './dotted/askDotsFamilyResponse'
import { DotsLiquidGlassStudioSurface } from './dotted/DotsLiquidGlassStudioSurface'
import { DotsLogoMotion } from './dotted/DotsLogoMotion'
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
  judgmentText: '',
  contextText: '',
  thinkingTitle: '整理上海周末遛娃好去处',
  thinkingBody: '',
  thinkingHoldMs: 2000,
  response: askDotsFamilyResponse,
}

export type AskDotsIslandBubbleVariant = 'current' | 'new' | 'compact'
export type AskDotsIslandSchemeAVariant = 'classic' | 'live'
export type AskDotsIslandSchemeBVariant = 'full' | 'simple'

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

export function AskDotsIslandDemoScreen({
  bubbleVariant = 'current',
  schemeAVariant = 'classic',
  schemeBVariant = 'simple',
}: {
  bubbleVariant?: AskDotsIslandBubbleVariant
  schemeAVariant?: AskDotsIslandSchemeAVariant
  schemeBVariant?: AskDotsIslandSchemeBVariant
} = {}) {
  const [view, setView] = useState<'results' | 'thinking'>('results')
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'entering' | 'leaving'>('idle')
  const [expanded, setExpanded] = useState(false)
  const [collapsing, setCollapsing] = useState(false)
  const [prompted, setPrompted] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [conversationStarted, setConversationStarted] = useState(false)
  const [answerPending, setAnswerPending] = useState(false)
  const [hideCompletedStatus, setHideCompletedStatus] = useState(false)
  const [completionNoticePending, setCompletionNoticePending] = useState(false)
  const [completionNoticeExpanded, setCompletionNoticeExpanded] = useState(false)
  const [completionNoticeCollapsing, setCompletionNoticeCollapsing] = useState(false)
  const [openedCompletedConversation, setOpenedCompletedConversation] = useState(false)
  const [renderCycleCount, setRenderCycleCount] = useState(1)
  const appendedScrollHeightRef = useRef(0)
  const promptScrollTopRef = useRef(0)
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
      if (event.key !== 'Escape') return
      setCollapsing(true)
      setExpanded(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [expanded])

  useEffect(() => {
    if (!expanded) return undefined

    const timer = window.setTimeout(() => {
      setDismissed(true)
      setCollapsing(true)
      setExpanded(false)
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [expanded])

  useEffect(() => {
    if (!collapsing) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setCollapsing(false), reduceMotion ? 0 : 1000)
    return () => window.clearTimeout(timer)
  }, [collapsing])

  useEffect(() => {
    if (!completionNoticeExpanded) return undefined

    const timer = window.setTimeout(() => {
      setCompletionNoticeCollapsing(true)
      setCompletionNoticeExpanded(false)
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [completionNoticeExpanded])

  const enterThinking = () => {
    triggerLightHaptic()
    if (!conversationStarted) {
      setConversationStarted(true)
      setAnswerPending(true)
      setCompletionNoticePending(false)
      setCompletionNoticeExpanded(false)
      setCompletionNoticeCollapsing(false)
      setOpenedCompletedConversation(false)
    }
    setHideCompletedStatus(false)
    setPrompted(true)
    if (expanded) setCollapsing(true)
    setExpanded(false)
    setTransitionPhase('entering')
    setView('thinking')
  }

  const handleResponseComplete = useCallback(() => {
    setAnswerPending(false)
    if (view === 'results' && transitionPhase === 'idle') {
      setCompletionNoticeExpanded(true)
      return
    }
    setCompletionNoticePending(true)
  }, [transitionPhase, view])

  const leaveThinking = () => {
    triggerLightHaptic()
    if (!answerPending && openedCompletedConversation) setHideCompletedStatus(true)
    setTransitionPhase('leaving')
  }

  const openCompletedConversation = () => {
    triggerLightHaptic()
    setCompletionNoticePending(false)
    setCompletionNoticeExpanded(false)
    setCompletionNoticeCollapsing(false)
    setOpenedCompletedConversation(true)
    setHideCompletedStatus(false)
    setTransitionPhase('entering')
    setView('thinking')
  }

  const handleConversationAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return

    if (transitionPhase === 'leaving') {
      setView('results')
      setTransitionPhase('idle')
      if (completionNoticePending) {
        setCompletionNoticePending(false)
        setCompletionNoticeExpanded(true)
      }
      if (hideCompletedStatus) {
        setConversationStarted(false)
        setHideCompletedStatus(false)
        setOpenedCompletedConversation(false)
      }
      return
    }

    if (transitionPhase === 'entering') setTransitionPhase('idle')
  }

  const dismissPrompt = () => {
    triggerLightHaptic()
    setDismissed(true)
    setCollapsing(true)
    setExpanded(false)
  }

  const finishCompletionNotice = useCallback(() => {
    setCompletionNoticePending(false)
    setCompletionNoticeExpanded(false)
    setCompletionNoticeCollapsing(false)
    setConversationStarted(false)
    setHideCompletedStatus(false)
    setOpenedCompletedConversation(false)
  }, [])

  useEffect(() => {
    if (!completionNoticeCollapsing) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(finishCompletionNotice, reduceMotion ? 0 : 1000)
    return () => window.clearTimeout(timer)
  }, [completionNoticeCollapsing, finishCompletionNotice])

  const handleIslandTransitionEnd = (event: TransitionEvent<HTMLElement>) => {
    if (
      event.target !== event.currentTarget
      || event.propertyName !== 'width'
      || expanded
      || completionNoticeExpanded
    ) return
    if (completionNoticeCollapsing) {
      finishCompletionNotice()
      return
    }
    setCollapsing(false)
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

    if (expanded && Math.abs(scrollArea.scrollTop - promptScrollTopRef.current) >= scrollArea.clientHeight * 3) {
      setDismissed(true)
      setCollapsing(true)
      setExpanded(false)
      return
    }

    if (answerPending || prompted || dismissed) return
    if (scrollArea.scrollTop < scrollArea.clientHeight * 0.85) return

    promptScrollTopRef.current = scrollArea.scrollTop
    setPrompted(true)
    setExpanded(true)
  }

  const hasVisibleConversationStatus = conversationStarted && !hideCompletedStatus
  const islandStatusLabel = hasVisibleConversationStatus && answerPending ? '总结中' : '问点点'
  const showCompletionPrompt = completionNoticeExpanded || completionNoticeCollapsing
  const showSchemeBPrompt = !showCompletionPrompt && bubbleVariant === 'new' && (expanded || collapsing)
  const showSchemeCPrompt = !showCompletionPrompt && bubbleVariant === 'compact' && (expanded || collapsing)
  const showSchemeASharedLabel = bubbleVariant === 'compact' && !answerPending
  const islandExpanded = (!showSchemeBPrompt && expanded) || completionNoticeExpanded
  const islandCollapsing = (!showSchemeBPrompt && collapsing) || completionNoticeCollapsing
  const islandVariantClass = showCompletionPrompt
    ? ` ask-dots-demo__island--completion${bubbleVariant === 'compact' ? ' ask-dots-demo__island--completion-c' : ''}`
    : bubbleVariant === 'new'
      ? ' ask-dots-demo__island--variant-b'
      : bubbleVariant === 'compact'
        ? ' ask-dots-demo__island--variant-c'
        : ''

  return (
    <div
      className="ask-dots-demo-stage"
      data-bubble-variant={bubbleVariant}
      data-scheme-a-variant={schemeAVariant}
      data-scheme-b-variant={schemeBVariant}
    >
      <IOSStatusBar className="ask-dots-demo-stage__system-status" />

      <main className="ask-dots-demo" data-theme="light" aria-hidden={view === 'thinking'} inert={view === 'thinking' ? true : undefined}>
        <div className="ask-dots-demo__header-surface" aria-hidden="true" />

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
        className={`ask-dots-demo__island${islandVariantClass}${islandExpanded ? ' ask-dots-demo__island--expanded' : ''}${islandCollapsing ? ' ask-dots-demo__island--collapsing' : ''}`}
        aria-label={showCompletionPrompt ? '点点已帮你总结完成' : answerPending ? '点点正在总结' : '问点点总结提示'}
        onTransitionEnd={handleIslandTransitionEnd}
      >
        {!showCompletionPrompt && bubbleVariant !== 'new' ? (
          <span
            className={`ask-dots-demo__island-liquid${bubbleVariant === 'compact' && schemeAVariant === 'classic' ? ' ask-dots-demo__island-liquid--classic' : ''}`}
            aria-hidden="true"
          >
            {showSchemeCPrompt && schemeAVariant === 'live' ? (
              <DotsLiquidGlassStudioSurface collapsing={collapsing} />
            ) : null}
          </span>
        ) : null}

        {(!showCompletionPrompt || bubbleVariant === 'compact') ? (
          <>
            <span className="ask-dots-demo__island-logo" aria-hidden="true">
              {answerPending && view === 'results' ? (
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
                {showSchemeASharedLabel ? (
                  <>
                    <span className="ask-dots-demo__scheme-c-prefix">问</span>
                    <span className="ask-dots-demo__scheme-c-core">点点</span>
                  </>
                ) : islandStatusLabel}
              </span>
              {!showCompletionPrompt && bubbleVariant === 'current' ? (
                <span className="ask-dots-demo__island-copy-question">
                  笔记看花眼？试试让点点帮你总结
                </span>
              ) : null}
            </span>
          </>
        ) : null}

        {showCompletionPrompt ? (
          <>
            <button
              className={`ask-dots-demo__completion-copy${bubbleVariant === 'compact' ? ' ask-dots-demo__completion-copy--shared' : ''}`}
              type="button"
              onClick={openCompletedConversation}
            >
              {bubbleVariant !== 'compact' ? (
                <span className="ask-dots-demo__completion-agent">
                  <span className="ask-dots-demo__completion-logo" aria-hidden="true">
                    <img src={dotsAvatar} alt="" draggable={false} />
                  </span>
                  <span>点点</span>
                </span>
              ) : null}
              <span className="ask-dots-demo__completion-message">已帮你总结完成</span>
            </button>
            <button
              className="ask-dots-demo__completion-action"
              type="button"
              onClick={openCompletedConversation}
            >
              去看看
            </button>
          </>
        ) : (
          <>
            <button
              className="ask-dots-demo__island-trigger"
              type="button"
              aria-label={answerPending ? '查看总结中的回答' : hasVisibleConversationStatus ? '查看已总结的回答' : '问点点'}
              onClick={enterThinking}
            >
              <span className="ask-dots-demo__tab-divider">
                <img src={tabDivider} alt="" draggable={false} />
              </span>
            </button>

            {showSchemeCPrompt ? (
              <span className="ask-dots-demo__scheme-c-row">
                <span className="ask-dots-demo__scheme-c-question" aria-hidden="true">
                  笔记看花眼？试试让点点帮你总结
                </span>
                <button
                  className="ask-dots-demo__scheme-c-confirm"
                  type="button"
                  onClick={enterThinking}
                >
                  好的
                </button>
              </span>
            ) : bubbleVariant === 'current' ? (
              <div className="ask-dots-demo__island-content" aria-hidden={!expanded}>
                <div className="ask-dots-demo__island-actions">
                  <button type="button" onClick={dismissPrompt}>忽略</button>
                  <button type="button" className="ask-dots-demo__summary" onClick={enterThinking}>好的</button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </aside>

      {showSchemeBPrompt ? (
        <aside
          className={`ask-dots-demo__scheme-b-card${schemeBVariant === 'simple' ? ' ask-dots-demo__scheme-b-card--simple' : ''}${expanded ? ' ask-dots-demo__scheme-b-card--expanded' : ''}${collapsing ? ' ask-dots-demo__scheme-b-card--collapsing' : ''}`}
          aria-label="问点点总结提示"
        >
          <img
            className="ask-dots-demo__scheme-b-pointer"
            src={schemeBPointer}
            alt=""
            draggable={false}
          />
          {schemeBVariant === 'simple' ? (
            <>
              <span className="ask-dots-demo__scheme-b-primary" aria-hidden="true">
                <span className="ask-dots-demo__scheme-b-avatar">
                  <DotsLogoMotion className="ask-dots-demo__scheme-b-logo-motion" />
                </span>
                <span className="ask-dots-demo__scheme-b-question">
                  笔记太多看花眼？我来帮你总结
                </span>
              </span>
              <button
                className="ask-dots-demo__scheme-b-simple-confirm"
                type="button"
                onClick={enterThinking}
              >
                好的
              </button>
            </>
          ) : (
            <>
              <span className="ask-dots-demo__scheme-b-primary" aria-hidden="true">
                <span className="ask-dots-demo__scheme-b-avatar">
                  <img src={schemeBAvatar} alt="" draggable={false} />
                </span>
                <span className="ask-dots-demo__scheme-b-question">
                  需要我帮你总结下上海周末遛娃好去处吗？
                </span>
              </span>
              <span className="ask-dots-demo__scheme-b-actions">
                <button type="button" onClick={dismissPrompt}>忽略</button>
                <button
                  className="ask-dots-demo__scheme-b-confirm"
                  type="button"
                  onClick={enterThinking}
                >
                  好的
                </button>
              </span>
            </>
          )}
        </aside>
      ) : null}

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
