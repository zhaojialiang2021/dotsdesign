import {
  useCallback,
  useState,
  type CSSProperties,
} from 'react'
import { reportDemos } from '../manifest'
import { ReportDemoCanvas } from '../ReportDemoCanvas'
import { NotFoundPage } from './NotFoundPage'
import { DottedDemoScreen, type DottedDemoStep, type DottedSourceImageMotionVariant, type DottedThinkingDisplayVariant, type DottedToolNoteDisplayVariant } from '../../screens/DottedDemoScreen'
import {
  AskDotsIslandDemoScreen,
  type AskDotsIslandBubbleVariant,
  type AskDotsIslandSchemeAVariant,
  type AskDotsIslandSchemeBVariant,
} from '../../screens/AskDotsIslandDemoScreen'
import restartIcon from '../../assets/dotted/think-response-refresh.svg'
import iphoneBezel from '../../assets/docs/iphone-bezel.png'

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

export function ReportsPage({ slug }: { slug: string }) {
  const meta = reportDemos.find((p) => p.slug === slug)
  if (!meta) return <NotFoundPage path={`reports/${slug}`} />
  if (slug === 'conversation-streaming') return <ConversationStreamingReport />
  if (slug === 'long-thinking') return <LongThinkingReport />
  if (slug === 'ask-dots-island-demo') return <AskDotsIslandReport />
  if (slug === 'floating-cards-animation') return <FloatingCardsAnimationReport />
  return <NotFoundPage path={`reports/${slug}`} />
}

function AskDotsIslandReport() {
  const [bubbleVariant, setBubbleVariant] = useState<AskDotsIslandBubbleVariant>('compact')
  const [schemeAVariant, setSchemeAVariant] = useState<AskDotsIslandSchemeAVariant>('classic')
  const [schemeBVariant, setSchemeBVariant] = useState<AskDotsIslandSchemeBVariant>('simple')

  const changeBubbleVariant = (variant: AskDotsIslandBubbleVariant) => {
    if (variant === bubbleVariant) return
    setBubbleVariant(variant)
  }

  return (
    <ReportDemoCanvas
      activeSlug="ask-dots-island-demo"
      schemeControls={{
        kind: 'ask-dots-island',
        bubbleVariant,
        onBubbleVariantChange: changeBubbleVariant,
        schemeAVariant,
        onSchemeAVariantChange: setSchemeAVariant,
        schemeBVariant,
        onSchemeBVariantChange: setSchemeBVariant,
      }}
    >
      <div className="docs-phone-frame">
        <div className="docs-timestamp-phone docs-ask-dots-island-phone" aria-label="搜索结果页问点点灵动展开 demo">
          <AskDotsIslandDemoScreen
            key={`${bubbleVariant}-${schemeAVariant}-${schemeBVariant}`}
            bubbleVariant={bubbleVariant}
            schemeAVariant={schemeAVariant}
            schemeBVariant={schemeBVariant}
          />
        </div>
        <img className="docs-phone-bezel" src={iphoneBezel} alt="" aria-hidden="true" />
      </div>
    </ReportDemoCanvas>
  )
}

function FloatingCardsAnimationReport() {
  const [runId, setRunId] = useState(0)

  return (
    <ReportDemoCanvas activeSlug="floating-cards-animation" shellClassName="docs-report-demo-shell--floating-cards">
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
    </ReportDemoCanvas>
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
  const [toolNoteDisplayVariant, setToolNoteDisplayVariant] = useState<DottedToolNoteDisplayVariant>('preview-detail')
  const [sourceImageMotionEnabled, setSourceImageMotionEnabled] = useState(false)
  const sourceImageMotionVariant: DottedSourceImageMotionVariant = sourceImageMotionEnabled ? 'stack' : 'static'
  const thinkingDisplayVariant: DottedThinkingDisplayVariant = 'stacked'

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
    <ReportDemoCanvas
      activeSlug={activeSlug}
      schemeControls={toolCallDetailVariant === 'default' ? {
        kind: 'tool-call',
        toolNoteDisplayVariant,
        onToolNoteDisplayVariantChange: setToolNoteDisplayVariant,
        sourceImageMotionEnabled,
        onSourceImageMotionEnabledChange: setSourceImageMotionEnabled,
      } : undefined}
    >
      <section className="docs-timestamp-hero">
          <div className="docs-phone-frame">
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
            <img className="docs-phone-bezel" src={iphoneBezel} alt="" aria-hidden="true" />
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
    </ReportDemoCanvas>
  )
}
