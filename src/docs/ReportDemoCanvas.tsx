import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import type { DottedToolNoteDisplayVariant } from '../screens/DottedDemoScreen'
import demoShellMenuIcon from '../assets/docs/demo-shell-menu.svg'
import demoShellArrowRightIcon from '../assets/docs/demo-shell-arrow-right.svg'
import demoShellShareIcon from '../assets/docs/demo-shell-share.svg'
import demoShellCloseIcon from '../assets/docs/demo-shell-close.svg'
import demoShellZoomInIcon from '../assets/docs/demo-shell-zoom-in.svg'
import demoShellZoomOutIcon from '../assets/docs/demo-shell-zoom-out.svg'
import demoShellSchemeIcon from '../assets/docs/demo-shell-scheme.svg'
import demoShellPanelCloseIcon from '../assets/docs/demo-shell-panel-close.svg'
import { reportDemos } from './manifest'
import { navigate } from './router'

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

export interface ReportDemoSchemeControls {
  toolNoteDisplayVariant: DottedToolNoteDisplayVariant
  onToolNoteDisplayVariantChange: (variant: DottedToolNoteDisplayVariant) => void
  sourceImageMotionEnabled: boolean
  onSourceImageMotionEnabledChange: (enabled: boolean) => void
}

export function ReportDemoCanvas({
  activeSlug,
  children,
  schemeControls,
  shellClassName,
}: {
  activeSlug: string
  children: ReactNode
  schemeControls?: ReportDemoSchemeControls
  shellClassName?: string
}) {
  const [canvasScale, setCanvasScale] = useState(100)
  const [phoneBezelVisible, setPhoneBezelVisible] = useState(false)
  const [canvasOffset, setCanvasOffset] = useState<DemoCanvasOffset>({ x: 0, y: 0 })
  const [canvasDragging, setCanvasDragging] = useState(false)
  const canvasDragStartRef = useRef<DemoCanvasDragStart | null>(null)

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

  return (
    <div
      className={[
        'docs-report-demo-shell',
        'docs-report-demo-shell--immersive',
        shellClassName,
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
        phoneBezelVisible={phoneBezelVisible}
        onPhoneBezelVisibleChange={setPhoneBezelVisible}
        schemeControls={schemeControls}
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
        <div
          className={[
            'docs-report-demo-canvas-content',
            phoneBezelVisible ? 'docs-report-demo-canvas-content--phone-bezel' : '',
          ].filter(Boolean).join(' ')}
          style={{ '--demo-canvas-scale': canvasScale / 100 } as CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  )
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
  phoneBezelVisible,
  onPhoneBezelVisibleChange,
  schemeControls,
}: {
  scale: number
  onScaleChange: (scale: number) => void
  phoneBezelVisible: boolean
  onPhoneBezelVisibleChange: (visible: boolean) => void
  schemeControls?: ReportDemoSchemeControls
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
      <div className="docs-report-demo-phone-bezel-control">
        <span>手机边框</span>
        <button
          className={[
            'docs-report-demo-scheme-control__switch',
            phoneBezelVisible ? 'is-active' : '',
          ].filter(Boolean).join(' ')}
          type="button"
          onClick={() => onPhoneBezelVisibleChange(!phoneBezelVisible)}
          role="switch"
          aria-checked={phoneBezelVisible}
          aria-label="手机边框"
        >
          <span />
        </button>
      </div>

      {schemeControls && schemePanelOpen ? (
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
                  className={schemeControls.toolNoteDisplayVariant === 'consistent' ? 'is-active' : undefined}
                  type="button"
                  onClick={() => schemeControls.onToolNoteDisplayVariantChange('consistent')}
                  aria-pressed={schemeControls.toolNoteDisplayVariant === 'consistent'}
                >
                  胶囊
                </button>
                <button
                  className={schemeControls.toolNoteDisplayVariant === 'preview-detail' ? 'is-active' : undefined}
                  type="button"
                  onClick={() => schemeControls.onToolNoteDisplayVariantChange('preview-detail')}
                  aria-pressed={schemeControls.toolNoteDisplayVariant === 'preview-detail'}
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
                  schemeControls.sourceImageMotionEnabled ? 'is-active' : '',
                ].filter(Boolean).join(' ')}
                type="button"
                onClick={() => schemeControls.onSourceImageMotionEnabledChange(!schemeControls.sourceImageMotionEnabled)}
                role="switch"
                aria-checked={schemeControls.sourceImageMotionEnabled}
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
          !schemeControls ? 'docs-report-demo-canvas-tools--scale-only' : '',
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
        {schemeControls ? (
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
