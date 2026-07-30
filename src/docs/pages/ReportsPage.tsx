import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { reportDemos } from '../manifest'
import { navigate } from '../router'
import { NotFoundPage } from './NotFoundPage'
import { DottedDemoScreen, type DottedDemoStep, type DottedSourceImageMotionVariant, type DottedThinkingDisplayVariant, type DottedToolNoteDisplayVariant } from '../../screens/DottedDemoScreen'
import restartIcon from '../../assets/dotted/think-response-refresh.svg'
import demoShellMenuIcon from '../../assets/docs/demo-shell-menu.svg'
import demoShellArrowRightIcon from '../../assets/docs/demo-shell-arrow-right.svg'
import demoShellShareIcon from '../../assets/docs/demo-shell-share.svg'
import demoShellCloseIcon from '../../assets/docs/demo-shell-close.svg'
import demoShellZoomInIcon from '../../assets/docs/demo-shell-zoom-in.svg'
import demoShellZoomOutIcon from '../../assets/docs/demo-shell-zoom-out.svg'
import demoShellSchemeIcon from '../../assets/docs/demo-shell-scheme.svg'
import demoShellPanelCloseIcon from '../../assets/docs/demo-shell-panel-close.svg'

const demoSteps: Array<{ id: DottedDemoStep; label: string }> = [
  { id: 'thinking', label: '判断' },
  { id: 'judging-think', label: 'think' },
  { id: 'context', label: 'content' },
  { id: 'think', label: 'think' },
  { id: 'toolcall', label: 'tool call' },
  { id: 'think-compact', label: 'think' },
  { id: 'toolcall-search', label: 'tool call' },
  { id: 'think-plan', label: 'think' },
  { id: 'response', label: 'response' },
  { id: 'complete', label: '完成' },
]

const copyToastEnterDurationMs = 250
const copyToastHoldDurationMs = 2000
const copyToastExitDurationMs = 250
const demoCanvasScaleMin = 50
const demoCanvasScaleMax = 150
const demoCanvasScaleStep = 5

type CopyToastPhase = 'hidden' | 'visible' | 'leaving'

interface DemoCanvasOffset {
  x: number
  y: number
}

interface DemoCanvasDragStart extends DemoCanvasOffset {
  pointerId: number
  clientX: number
  clientY: number
}

export function ReportsPage({ slug }: { slug: string }) {
  const meta = reportDemos.find((p) => p.slug === slug)
  if (!meta) return <NotFoundPage path={`reports/${slug}`} />
  if (slug === 'conversation-streaming') return <ConversationStreamingReport />
  if (slug === 'long-thinking') return <LongThinkingReport />
  if (slug === 'floating-cards-animation') return <FloatingCardsAnimationReport />
  return <NotFoundPage path={`reports/${slug}`} />
}

function ReportDemoSwitcher({ activeSlug }: { activeSlug: string }) {
  const [open, setOpen] = useState(false)
  const switcherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event: PointerEvent) => {
      if (!switcherRef.current) return
      if (switcherRef.current.contains(event.target as Node)) return
      setOpen(false)
    }

    window.addEventListener('pointerdown', handlePointerDown)
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  return (
    <div ref={switcherRef} className={['docs-report-demo-switcher', open ? 'docs-report-demo-switcher--open' : ''].filter(Boolean).join(' ')}>
      <button
        className="docs-report-demo-switcher__trigger"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="切换项目 demo"
        aria-expanded={open}
      >
        <img className="docs-report-demo-switcher__icon" src={demoShellMenuIcon} alt="" />
      </button>
      {open ? (
        <div className="docs-report-demo-switcher__panel" role="menu" aria-label="项目 demo 列表">
          {reportDemos.map((demo) => {
            const isActive = demo.slug === activeSlug
            return (
              <button
                className="docs-report-demo-switcher__item"
                type="button"
                key={demo.slug}
                role="menuitem"
                onClick={() => {
                  setOpen(false)
                  if (!isActive) navigate(`/docs/reports/${demo.slug}`)
                }}
              >
                <span className="docs-report-demo-switcher__label">{demo.name}</span>
                <img className="docs-report-demo-switcher__arrow" src={demoShellArrowRightIcon} alt="" />
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function ReportDemoChrome({ activeSlug }: { activeSlug: string }) {
  const [copyToastPhase, setCopyToastPhase] = useState<CopyToastPhase>('hidden')
  const copyToastLeaveTimeoutRef = useRef<number | undefined>(undefined)
  const copyToastRemoveTimeoutRef = useRef<number | undefined>(undefined)
  const copied = copyToastPhase !== 'hidden'

  useEffect(() => () => {
    if (copyToastLeaveTimeoutRef.current !== undefined) window.clearTimeout(copyToastLeaveTimeoutRef.current)
    if (copyToastRemoveTimeoutRef.current !== undefined) window.clearTimeout(copyToastRemoveTimeoutRef.current)
  }, [])

  const copyCurrentPageLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    if (copyToastLeaveTimeoutRef.current !== undefined) window.clearTimeout(copyToastLeaveTimeoutRef.current)
    if (copyToastRemoveTimeoutRef.current !== undefined) window.clearTimeout(copyToastRemoveTimeoutRef.current)
    setCopyToastPhase('visible')
    copyToastLeaveTimeoutRef.current = window.setTimeout(
      () => setCopyToastPhase('leaving'),
      copyToastEnterDurationMs + copyToastHoldDurationMs,
    )
    copyToastRemoveTimeoutRef.current = window.setTimeout(
      () => setCopyToastPhase('hidden'),
      copyToastEnterDurationMs + copyToastHoldDurationMs + copyToastExitDurationMs,
    )
  }

  return (
    <>
      <ReportDemoSwitcher activeSlug={activeSlug} />
      <div className="docs-report-demo-actions" aria-label="项目 demo 操作">
        <button
          className="docs-report-demo-action"
          type="button"
          onClick={copyCurrentPageLink}
          aria-label={copied ? '已复制当前页面链接' : '复制当前页面链接'}
          title={copied ? '已复制' : '分享'}
        >
          <img src={demoShellShareIcon} alt="" />
        </button>
        <span className="docs-report-demo-actions__separator" aria-hidden="true" />
        <button
          className="docs-report-demo-action"
          type="button"
          onClick={() => navigate('/docs')}
          aria-label="关闭项目 demo"
          title="关闭"
        >
          <img src={demoShellCloseIcon} alt="" />
        </button>
      </div>
      {copied ? (
        <div
          className={[
            'docs-report-demo-toast',
            copyToastPhase === 'leaving' ? 'docs-report-demo-toast--leaving' : '',
          ].filter(Boolean).join(' ')}
          role="status"
          aria-live="polite"
        >
          链接已复制
        </div>
      ) : null}
    </>
  )
}

function ReportDemoCanvasTools({
  scale,
  onScaleChange,
  schemeSwitcherEnabled,
  toolNoteDisplayVariant,
  onToolNoteDisplayVariantChange,
  sourceImageMotionEnabled,
  onSourceImageMotionEnabledChange,
}: {
  scale: number
  onScaleChange: (scale: number) => void
  schemeSwitcherEnabled: boolean
  toolNoteDisplayVariant: DottedToolNoteDisplayVariant
  onToolNoteDisplayVariantChange: (variant: DottedToolNoteDisplayVariant) => void
  sourceImageMotionEnabled: boolean
  onSourceImageMotionEnabledChange: (enabled: boolean) => void
}) {
  const [schemePanelOpen, setSchemePanelOpen] = useState(false)

  const changeScale = (direction: -1 | 1) => {
    const nextScale = Math.min(
      demoCanvasScaleMax,
      Math.max(demoCanvasScaleMin, scale + direction * demoCanvasScaleStep),
    )
    onScaleChange(nextScale)
  }

  return (
    <>
      {schemeSwitcherEnabled && schemePanelOpen ? (
        <aside className="docs-report-demo-scheme-panel" aria-label="方案切换">
          <header className="docs-report-demo-scheme-panel__header">
            <h2>方案切换</h2>
            <button type="button" onClick={() => setSchemePanelOpen(false)} aria-label="关闭方案切换面板">
              <img src={demoShellPanelCloseIcon} alt="" />
            </button>
          </header>
          <div className="docs-report-demo-scheme-panel__content">
            <div className="docs-report-demo-scheme-control">
              <span>tool call 样式</span>
              <div className="docs-report-demo-scheme-control__segmented" role="group" aria-label="tool call 样式">
                <button
                  className={toolNoteDisplayVariant === 'consistent' ? 'is-active' : undefined}
                  type="button"
                  onClick={() => onToolNoteDisplayVariantChange('consistent')}
                  aria-pressed={toolNoteDisplayVariant === 'consistent'}
                >
                  胶囊
                </button>
                <button
                  className={toolNoteDisplayVariant === 'preview-detail' ? 'is-active' : undefined}
                  type="button"
                  onClick={() => onToolNoteDisplayVariantChange('preview-detail')}
                  aria-pressed={toolNoteDisplayVariant === 'preview-detail'}
                >
                  信息卡
                </button>
              </div>
            </div>
            <div className="docs-report-demo-scheme-control">
              <span>右侧图标动画</span>
              <button
                className={[
                  'docs-report-demo-scheme-control__switch',
                  sourceImageMotionEnabled ? 'is-active' : '',
                ].filter(Boolean).join(' ')}
                type="button"
                onClick={() => onSourceImageMotionEnabledChange(!sourceImageMotionEnabled)}
                role="switch"
                aria-checked={sourceImageMotionEnabled}
                aria-label="右侧图标动画"
              >
                <span />
              </button>
            </div>
          </div>
        </aside>
      ) : null}

      <div
        className={[
          'docs-report-demo-canvas-tools',
          !schemeSwitcherEnabled ? 'docs-report-demo-canvas-tools--scale-only' : '',
        ].filter(Boolean).join(' ')}
        aria-label="画布工具"
      >
        <button
          type="button"
          onClick={() => changeScale(1)}
          aria-label={`放大画布，当前 ${scale}%`}
          title={`放大至 ${Math.min(demoCanvasScaleMax, scale + demoCanvasScaleStep)}%`}
        >
          <img className="docs-report-demo-canvas-tools__zoom-icon" src={demoShellZoomInIcon} alt="" />
        </button>
        <button
          type="button"
          onClick={() => changeScale(-1)}
          aria-label={`缩小画布，当前 ${scale}%`}
          title={`缩小至 ${Math.max(demoCanvasScaleMin, scale - demoCanvasScaleStep)}%`}
        >
          <img className="docs-report-demo-canvas-tools__zoom-icon" src={demoShellZoomOutIcon} alt="" />
        </button>
        {schemeSwitcherEnabled ? (
          <>
            <span className="docs-report-demo-canvas-tools__separator" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setSchemePanelOpen(true)}
              aria-label="打开方案切换面板"
              aria-expanded={schemePanelOpen}
            >
              <img className="docs-report-demo-canvas-tools__scheme-icon" src={demoShellSchemeIcon} alt="" />
            </button>
          </>
        ) : null}
      </div>
    </>
  )
}

function FloatingCardsAnimationReport() {
  const [runId, setRunId] = useState(0)

  return (
    <div className="docs-report-demo-shell docs-report-demo-shell--immersive docs-report-demo-shell--floating-cards">
      <ReportDemoChrome activeSlug="floating-cards-animation" />
      <section className="docs-floating-cards-demo" aria-labelledby="floating-cards-title">
        <div className="docs-floating-cards-copy">
          <p className="docs-floating-cards-copy__eyebrow">Motion demo</p>
          <h1 id="floating-cards-title">景深浮动卡片动画</h1>
          <p>
            基于录屏 2.36 秒关键帧还原：前景表格卡退到右上，后方主卡推到中间，应用图标跟随景深层级漂移。
          </p>
          <button className="docs-floating-cards-copy__button" type="button" onClick={() => setRunId((current) => current + 1)}>
            重新播放
          </button>
        </div>

        <div className="docs-floating-cards-stage" key={runId} aria-label="景深浮动卡片动画舞台">
          <div className="docs-floating-cards-grid" aria-hidden="true" />
          <div className="docs-floating-cards-haze docs-floating-cards-haze--left" aria-hidden="true" />
          <div className="docs-floating-cards-haze docs-floating-cards-haze--right" aria-hidden="true" />

          <div className="docs-floating-cards-panel docs-floating-cards-panel--back" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="docs-floating-cards-panel docs-floating-cards-panel--main">
            <div className="docs-floating-cards-toolbar">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="docs-floating-cards-main-layout">
              <div className="docs-floating-cards-preview-card" />
              <div className="docs-floating-cards-table">
                {Array.from({ length: 3 }).map((_, row) => (
                  <div className="docs-floating-cards-table-row" key={row}>
                    <span />
                    <span />
                    <span />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="docs-floating-cards-doc docs-floating-cards-doc--front">
            <div className="docs-floating-cards-doc__lines">
              {Array.from({ length: 7 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
            <div className="docs-floating-cards-doc__chart" />
          </div>

          <div className="docs-floating-cards-doc docs-floating-cards-doc--right" aria-hidden="true">
            <span />
            <span />
          </div>

          <div className="docs-floating-cards-app docs-floating-cards-app--docs" aria-label="文档图标">
            <span />
          </div>
          <div className="docs-floating-cards-app docs-floating-cards-app--sheet" aria-label="表格图标">
            <span />
          </div>
          <div className="docs-floating-cards-app docs-floating-cards-app--cloud" aria-label="云服务图标">
            <span />
          </div>
          <div className="docs-floating-cards-app docs-floating-cards-app--mail" aria-label="消息图标">
            <span />
          </div>
        </div>
      </section>
    </div>
  )
}

function LongThinkingReport() {
  return (
    <ConversationStreamingReport
      activeSlug="long-thinking"
      title="真实感 loading"
      phoneLabel="点点对话页长思考链路 demo"
      quickAnswerEnabled={false}
      steps={[{ id: 'toolcall', label: 'tool call' }]}
      initialStep="toolcall"
      showStepProgress={false}
      toolCallDetailVariant="real-loading"
    />
  )
}

function ConversationStreamingReport({
  activeSlug = 'conversation-streaming',
  title = '回答loading新增长思考模式',
  phoneLabel = '点点对话页回答流式 demo',
  quickAnswerEnabled = true,
  steps = demoSteps,
  initialStep = 'thinking',
  showStepProgress = true,
  toolCallDetailVariant = 'default',
}: {
  activeSlug?: string
  title?: string
  phoneLabel?: string
  quickAnswerEnabled?: boolean
  steps?: Array<{ id: DottedDemoStep; label: string }>
  initialStep?: DottedDemoStep
  showStepProgress?: boolean
  toolCallDetailVariant?: 'default' | 'real-loading'
}) {
  const [demoStep, setDemoStep] = useState<DottedDemoStep | undefined>(initialStep)
  const [activeStep, setActiveStep] = useState<DottedDemoStep>(initialStep)
  const [playState, setPlayState] = useState<'idle' | 'playing' | 'paused'>('idle')
  const [continueAfterStep, setContinueAfterStep] = useState(false)
  const [demoRunId, setDemoRunId] = useState(0)
  const [resumeSignal, setResumeSignal] = useState(0)
  const [canvasScale, setCanvasScale] = useState(100)
  const [canvasOffset, setCanvasOffset] = useState<DemoCanvasOffset>({ x: 0, y: 0 })
  const [canvasDragging, setCanvasDragging] = useState(false)
  const [toolNoteDisplayVariant, setToolNoteDisplayVariant] = useState<DottedToolNoteDisplayVariant>('preview-detail')
  const [sourceImageMotionEnabled, setSourceImageMotionEnabled] = useState(false)
  const canvasDragStartRef = useRef<DemoCanvasDragStart | null>(null)
  const sourceImageMotionVariant: DottedSourceImageMotionVariant = sourceImageMotionEnabled ? 'stack' : 'static'
  const thinkingDisplayVariant: DottedThinkingDisplayVariant = 'stacked'

  const startCanvasDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return

    canvasDragStartRef.current = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      x: canvasOffset.x,
      y: canvasOffset.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setCanvasDragging(true)
    event.preventDefault()
  }

  const moveCanvas = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragStart = canvasDragStartRef.current
    if (!dragStart || dragStart.pointerId !== event.pointerId) return

    setCanvasOffset({
      x: dragStart.x + event.clientX - dragStart.clientX,
      y: dragStart.y + event.clientY - dragStart.clientY,
    })
  }

  const stopCanvasDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (canvasDragStartRef.current?.pointerId !== event.pointerId) return

    canvasDragStartRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    setCanvasDragging(false)
  }

  const jumpToStep = (step: DottedDemoStep) => {
    setPlayState('playing')
    setActiveStep(step)
    setDemoStep(step)
    setContinueAfterStep(true)
    setDemoRunId((current) => current + 1)
  }

  const startDemo = () => {
    setPlayState('playing')
    setActiveStep(initialStep)
    setDemoStep(steps.length === 1 ? initialStep : undefined)
    setContinueAfterStep(false)
    setDemoRunId((current) => current + 1)
  }

  const pauseDemo = () => {
    setPlayState('paused')
  }

  const resumeDemo = () => {
    setPlayState('playing')
    setResumeSignal((current) => current + 1)
  }

  const restartDemo = () => {
    setPlayState('playing')
    setActiveStep(initialStep)
    setDemoStep(steps.length === 1 ? initialStep : undefined)
    setContinueAfterStep(false)
    setDemoRunId((current) => current + 1)
  }

  const handleStepChange = useCallback((step: DottedDemoStep) => {
    if (!steps.some((item) => item.id === step)) return
    setActiveStep(step)
    if (step === 'complete') {
      setPlayState('idle')
      setContinueAfterStep(false)
    }
  }, [steps])

  const activeStepIndex = Math.max(0, steps.findIndex((step) => step.id === activeStep))
  const progressPercent = steps.length > 1 ? (activeStepIndex / (steps.length - 1)) * 100 : 100

  return (
    <div
      className={[
        'docs-report-demo-shell',
        'docs-report-demo-shell--immersive',
        canvasDragging ? 'docs-report-demo-shell--panning' : '',
      ].filter(Boolean).join(' ')}
    >
      <div
        className="docs-report-demo-pan-surface"
        aria-hidden="true"
        onPointerDown={startCanvasDrag}
        onPointerMove={moveCanvas}
        onPointerUp={stopCanvasDrag}
        onPointerCancel={stopCanvasDrag}
      />
      <ReportDemoChrome activeSlug={activeSlug} />
      <ReportDemoCanvasTools
        scale={canvasScale}
        onScaleChange={setCanvasScale}
        schemeSwitcherEnabled={toolCallDetailVariant === 'default'}
        toolNoteDisplayVariant={toolNoteDisplayVariant}
        onToolNoteDisplayVariantChange={setToolNoteDisplayVariant}
        sourceImageMotionEnabled={sourceImageMotionEnabled}
        onSourceImageMotionEnabledChange={setSourceImageMotionEnabled}
      />
      <div
        className="docs-report-demo-pan-layer"
        style={
          {
            '--demo-canvas-x': `${canvasOffset.x}px`,
            '--demo-canvas-y': `${canvasOffset.y}px`,
          } as CSSProperties
        }
      >
        <section
          className="docs-timestamp-hero"
          style={{ '--demo-canvas-scale': canvasScale / 100 } as CSSProperties}
        >
          <div className="docs-timestamp-phone" aria-label={phoneLabel}>
            <DottedDemoScreen
              key={`${demoStep ?? 'auto'}-${demoRunId}`}
              demoMode="streaming-reply"
              demoStep={demoStep}
              continueAfterStep={continueAfterStep}
              paused={playState === 'paused'}
              resumeSignal={resumeSignal}
              onStepChange={handleStepChange}
              streamingVariant="span-mask"
              toolNoteDisplayVariant={toolNoteDisplayVariant}
              sourceImageMotionVariant={sourceImageMotionVariant}
              thinkingDisplayVariant={thinkingDisplayVariant}
              quickAnswerEnabled={quickAnswerEnabled}
              toolCallDetailVariant={toolCallDetailVariant}
            />
          </div>

          <aside className="docs-report-progress" aria-label="回答状态进度控制">
            <h1 className="docs-report-demo-title">{title}</h1>
            {showStepProgress ? (
              <div className="docs-report-progress__track" style={{ '--progress': `${progressPercent}%` } as CSSProperties}>
                <div className="docs-report-progress__line" aria-hidden="true" />
                <div className="docs-report-progress__nodes">
                  {steps.map((step, index) => {
                    const isActive = index === activeStepIndex
                    const isComplete = index < activeStepIndex
                    return (
                      <button
                        className={[
                          'docs-report-progress__node',
                          isActive ? 'docs-report-progress__node--active' : '',
                          isComplete ? 'docs-report-progress__node--complete' : '',
                        ].filter(Boolean).join(' ')}
                        type="button"
                        key={step.id}
                        onClick={() => jumpToStep(step.id)}
                        aria-current={isActive ? 'step' : undefined}
                      >
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <strong>{step.label}</strong>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}
            <div className="docs-report-progress__actions">
              {playState === 'playing' || playState === 'paused' ? (
                <>
                  <button className="docs-report-progress__button docs-report-progress__button--primary" type="button" onClick={playState === 'paused' ? resumeDemo : pauseDemo}>
                    {playState === 'paused' ? '继续' : '暂停'}
                  </button>
                  <button
                    className="docs-report-progress__button docs-report-progress__button--secondary docs-report-progress__button--icon"
                    type="button"
                    onClick={restartDemo}
                    aria-label="重新开始"
                    title="重新开始"
                  >
                    <img src={restartIcon} alt="" aria-hidden="true" />
                  </button>
                </>
              ) : (
                <button className="docs-report-progress__button docs-report-progress__button--primary" type="button" onClick={startDemo}>
                  开始演示
                </button>
              )}
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
