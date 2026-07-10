import { useCallback, useState, type CSSProperties } from 'react'
import { reportDemos } from '../manifest'
import { navigate } from '../router'
import { NotFoundPage } from './NotFoundPage'
import { DottedDemoScreen, type DottedDemoStep, type DottedThinkingDisplayVariant, type DottedToolNoteDisplayVariant } from '../../screens/DottedDemoScreen'
import restartIcon from '../../assets/dotted/think-response-refresh.svg'

const demoSteps: Array<{ id: DottedDemoStep; label: string }> = [
  { id: 'thinking', label: '判断' },
  { id: 'judging-think', label: 'think' },
  { id: 'context', label: 'context' },
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
  return <NotFoundPage path={`reports/${slug}`} />
}

function ConversationStreamingReport() {
  const [demoStep, setDemoStep] = useState<DottedDemoStep | undefined>('thinking')
  const [activeStep, setActiveStep] = useState<DottedDemoStep>('thinking')
  const [playState, setPlayState] = useState<'idle' | 'playing' | 'paused'>('idle')
  const [continueAfterStep, setContinueAfterStep] = useState(false)
  const [demoRunId, setDemoRunId] = useState(0)
  const [resumeSignal, setResumeSignal] = useState(0)
  const [toolNoteDisplayVariant, setToolNoteDisplayVariant] = useState<DottedToolNoteDisplayVariant>('preview-detail')
  const [thinkingDisplayVariant, setThinkingDisplayVariant] = useState<DottedThinkingDisplayVariant>('stacked')

  const jumpToStep = (step: DottedDemoStep) => {
    setPlayState('playing')
    setActiveStep(step)
    setDemoStep(step)
    setContinueAfterStep(true)
    setDemoRunId((current) => current + 1)
  }

  const startDemo = () => {
    setPlayState('playing')
    setActiveStep('thinking')
    setDemoStep(undefined)
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
    setActiveStep('thinking')
    setDemoStep(undefined)
    setContinueAfterStep(false)
    setDemoRunId((current) => current + 1)
  }

  const handleStepChange = useCallback((step: DottedDemoStep) => {
    setActiveStep(step)
    if (step === 'complete') {
      setPlayState('idle')
      setContinueAfterStep(false)
    }
  }, [])

  const activeStepIndex = Math.max(0, demoSteps.findIndex((step) => step.id === activeStep))
  const progressPercent = demoSteps.length > 1 ? (activeStepIndex / (demoSteps.length - 1)) * 100 : 0

  return (
    <div className="docs-report-demo-shell docs-report-demo-shell--immersive">
      <button className="docs-report-demo-close" type="button" onClick={() => navigate('/docs')} aria-label="关闭项目 demo">
        关闭
      </button>
      <section className="docs-timestamp-hero">
        <div className="docs-timestamp-phone" aria-label="点点对话页回答流式 demo">
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
            thinkingDisplayVariant={thinkingDisplayVariant}
          />
        </div>

        <aside className="docs-report-progress" aria-label="回答状态进度控制">
          <h1 className="docs-report-demo-title">回答loading新增长思考模式</h1>
          <div className="docs-report-option" aria-label="工具调用笔记展示样式">
            <span>工具调用的笔记展示样式</span>
            <div className="docs-report-option__control">
              {([
                { id: 'consistent', label: 'A 里外一致' },
                { id: 'preview-detail', label: 'B 外部缩略' },
              ] as Array<{ id: DottedToolNoteDisplayVariant; label: string }>).map((variant) => (
                <button
                  className={toolNoteDisplayVariant === variant.id ? 'docs-report-option__button docs-report-option__button--active' : 'docs-report-option__button'}
                  type="button"
                  key={variant.id}
                  onClick={() => setToolNoteDisplayVariant(variant.id)}
                  aria-pressed={toolNoteDisplayVariant === variant.id}
                >
                  {variant.label}
                </button>
              ))}
            </div>
          </div>
          <div className="docs-report-option" aria-label="思考过程展示方式">
            <span>思考过程展示方式</span>
            <div className="docs-report-option__control">
              {([
                { id: 'single', label: '单条切换' },
                { id: 'stacked', label: '连续堆叠' },
              ] as Array<{ id: DottedThinkingDisplayVariant; label: string }>).map((variant) => (
                <button
                  className={thinkingDisplayVariant === variant.id ? 'docs-report-option__button docs-report-option__button--active' : 'docs-report-option__button'}
                  type="button"
                  key={variant.id}
                  onClick={() => setThinkingDisplayVariant(variant.id)}
                  aria-pressed={thinkingDisplayVariant === variant.id}
                >
                  {variant.label}
                </button>
              ))}
            </div>
          </div>
          <div className="docs-report-progress__track" style={{ '--progress': `${progressPercent}%` } as CSSProperties}>
            <div className="docs-report-progress__line" aria-hidden="true" />
            <div className="docs-report-progress__nodes">
              {demoSteps.map((step, index) => {
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
  )
}
