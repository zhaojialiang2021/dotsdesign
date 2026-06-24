import { useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from 'react'
import { DemoFrame, DemoControl, PropPicker } from './_DemoStub'

const WAVEFORM_STATES = ['idle', 'listening', 'processing'] as const
const WAVEFORM_MODES = ['scrolling', 'static'] as const
const WAVEFORM_SIZES = ['compact', 'regular', 'large'] as const
const WAVEFORM_DENSITIES = ['compact', 'comfortable', 'dense'] as const
const WAVEFORM_TONES = ['brand', 'ink', 'inverse'] as const

type WaveformState = (typeof WAVEFORM_STATES)[number]
type WaveformMode = (typeof WAVEFORM_MODES)[number]
type WaveformSize = (typeof WAVEFORM_SIZES)[number]
type WaveformDensity = (typeof WAVEFORM_DENSITIES)[number]
type WaveformTone = (typeof WAVEFORM_TONES)[number]
type MicrophoneStatus =
  | 'idle'
  | 'requesting'
  | 'listening'
  | 'stopped'
  | 'denied'
  | 'unsupported'
  | 'error'

const densityConfig: Record<WaveformDensity, { bars: number; gap: number }> = {
  compact: { bars: 36, gap: 5 },
  comfortable: { bars: 52, gap: 4 },
  dense: { bars: 72, gap: 3 },
}

const stateCopy: Record<WaveformState, { label: string; desc: string; level: string }> = {
  idle: {
    label: '待机',
    desc: '低幅呼吸，表示语音入口可用但未采集。',
    level: '12%',
  },
  listening: {
    label: '监听中',
    desc: '波形随输入强弱滚动，强调系统正在接收声音。',
    level: '68%',
  },
  processing: {
    label: '处理中',
    desc: '规则脉冲表示语音已提交，AI 正在解析。',
    level: '44%',
  },
}

const microphoneCopy: Record<MicrophoneStatus, string> = {
  idle: '点击开始后，会请求浏览器麦克风权限并绘制真实输入波形。',
  requesting: '正在等待浏览器麦克风授权。',
  listening: '正在实时监听麦克风输入，波形来自当前环境声音。',
  stopped: '实时监听已停止，音频流已释放。',
  denied: '麦克风权限被拒绝，需要在浏览器权限里重新允许。',
  unsupported: '当前浏览器不支持麦克风实时输入。',
  error: '麦克风启动失败，请检查系统权限或输入设备。',
}

export function LiveWaveformDemo() {
  const [state, setState] = useState<WaveformState>('listening')
  const [mode, setMode] = useState<WaveformMode>('scrolling')
  const [size, setSize] = useState<WaveformSize>('regular')
  const [density, setDensity] = useState<WaveformDensity>('comfortable')
  const [tone, setTone] = useState<WaveformTone>('brand')
  const barCount = densityConfig[density].bars
  const microphone = useMicrophoneWaveform(barCount)

  const code = `<LiveWaveform\n  state="${state}"\n  source="microphone"\n  mode="${mode}"\n  size="${size}"\n  density="${density}"\n  tone="${tone}"\n/>`
  const current = stateCopy[state]
  const isRealtime = microphone.status === 'listening' && state === 'listening'
  const liveLevel = isRealtime ? `${Math.round(microphone.meter * 100)}%` : current.level

  return (
    <DemoFrame
      caption="LiveWaveform · Dots spec"
      code={code}
      stage={
        <div className="dots-waveform-spec">
          <section className="dots-waveform-spec__preview" aria-label="当前波形组合">
            <div className="dots-waveform-spec__header">
              <div>
                <div className="dots-waveform-spec__eyebrow">当前组合</div>
                <h3>{current.label}</h3>
              </div>
              <span className={`dots-waveform-spec__state dots-waveform-spec__state--${state}`}>
                {state}
              </span>
            </div>

            <p className="dots-waveform-spec__desc">{current.desc}</p>

            <LiveWaveformCanvas
              state={state}
              mode={mode}
              size={size}
              density={density}
              tone={tone}
              liveLevelsRef={microphone.levelsRef}
              realtime={isRealtime}
            />

            <div className="dots-waveform-spec__actions" aria-label="实时监听控制">
              <button
                type="button"
                className="dots-waveform-spec__button dots-waveform-spec__button--primary"
                onClick={() => {
                  setState('listening')
                  void microphone.start()
                }}
                disabled={microphone.status === 'requesting' || microphone.status === 'listening'}
              >
                {microphone.status === 'listening' ? '监听中' : '开始实时监听'}
              </button>
              <button
                type="button"
                className="dots-waveform-spec__button"
                onClick={microphone.stop}
                disabled={microphone.status !== 'requesting' && microphone.status !== 'listening'}
              >
                停止
              </button>
            </div>

            <p className="dots-waveform-spec__desc">{microphoneCopy[microphone.status]}</p>

            <div className="dots-waveform-spec__metrics" aria-label="波形参数">
              <span>
                level <strong>{liveLevel}</strong>
              </span>
              <span>
                source <strong>{isRealtime ? 'microphone' : 'demo'}</strong>
              </span>
              <span>
                bars <strong>{barCount}</strong>
              </span>
              <span>
                mode <strong>{mode}</strong>
              </span>
            </div>
          </section>

          <section className="dots-waveform-spec__scenarios" aria-label="典型场景">
            <WaveformScenario title="语音输入" note="listening / scrolling">
              <LiveWaveformCanvas
                state="listening"
                mode="scrolling"
                size="compact"
                density="comfortable"
                tone="brand"
              />
            </WaveformScenario>
            <WaveformScenario title="AI 处理中" note="processing / static">
              <LiveWaveformCanvas
                state="processing"
                mode="static"
                size="compact"
                density="dense"
                tone="ink"
              />
            </WaveformScenario>
          </section>
        </div>
      }
      controls={
        <>
          <DemoControl label="state">
            <PropPicker
              options={WAVEFORM_STATES}
              value={state}
              onChange={(next) => {
                setState(next)
                if (next !== 'listening') microphone.stop()
              }}
            />
          </DemoControl>
          <DemoControl label="mode">
            <PropPicker options={WAVEFORM_MODES} value={mode} onChange={setMode} />
          </DemoControl>
          <DemoControl label="size">
            <PropPicker options={WAVEFORM_SIZES} value={size} onChange={setSize} />
          </DemoControl>
          <DemoControl label="density">
            <PropPicker options={WAVEFORM_DENSITIES} value={density} onChange={setDensity} />
          </DemoControl>
          <DemoControl label="tone">
            <PropPicker options={WAVEFORM_TONES} value={tone} onChange={setTone} />
          </DemoControl>
        </>
      }
    />
  )
}

function LiveWaveformCanvas({
  state,
  mode,
  size,
  density,
  tone,
  liveLevelsRef,
  realtime = false,
}: {
  state: WaveformState
  mode: WaveformMode
  size: WaveformSize
  density: WaveformDensity
  tone: WaveformTone
  liveLevelsRef?: MutableRefObject<number[]>
  realtime?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const config = useMemo(() => densityConfig[density], [density])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const target = canvas
    const context = ctx

    let raf = 0
    let frame = 0
    let history = Array.from({ length: config.bars }, (_, index) =>
      sampleAmplitude(state, index, performance.now()),
    )
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function resize() {
      const ratio = window.devicePixelRatio || 1
      const width = Math.max(1, Math.floor(target.clientWidth * ratio))
      const height = Math.max(1, Math.floor(target.clientHeight * ratio))
      if (target.width !== width || target.height !== height) {
        target.width = width
        target.height = height
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    function drawFrame(time: number) {
      resize()
      const styles = getComputedStyle(target)
      const active = readCssVar(styles, '--waveform-active')
      const idle = readCssVar(styles, '--waveform-idle')
      const processing = readCssVar(styles, '--waveform-processing')
      const width = target.clientWidth
      const height = target.clientHeight
      const gap = config.gap
      const barCount = config.bars
      const barWidth = Math.max(2, (width - gap * (barCount - 1)) / barCount)

      context.clearRect(0, 0, width, height)

      const liveLevels = realtime && state === 'listening' ? liveLevelsRef?.current : undefined
      if (liveLevels?.length) {
        history = normalizeLevels(liveLevels, barCount)
      } else if (mode === 'scrolling' && state === 'listening' && !reduceMotion) {
        const next = sampleAmplitude(state, frame + barCount, time)
        history = history.slice(1).concat(next)
      } else {
        history = Array.from({ length: barCount }, (_, index) => sampleAmplitude(state, index, time))
      }

      history.forEach((value, index) => {
        const progress = barCount <= 1 ? 1 : index / (barCount - 1)
        const barHeight = Math.max(4, value * height * 0.86)
        const x = index * (barWidth + gap)
        const y = (height - barHeight) / 2

        context.globalAlpha = state === 'idle' ? 0.42 : 0.58 + progress * 0.42
        context.fillStyle = state === 'idle' ? idle : state === 'processing' ? processing : active
        roundedRect(context, x, y, barWidth, barHeight, barWidth / 2)
      })

      context.globalAlpha = 1
      frame += 1
    }

    function tick(time: number) {
      drawFrame(time)
      if (!reduceMotion) raf = window.requestAnimationFrame(tick)
    }

    let observer: ResizeObserver | null = null
    if ('ResizeObserver' in window) {
      observer = new ResizeObserver(() => drawFrame(performance.now()))
      observer.observe(target)
    }

    if (reduceMotion) {
      drawFrame(performance.now())
    } else {
      raf = window.requestAnimationFrame(tick)
    }

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      observer?.disconnect()
    }
  }, [config, liveLevelsRef, mode, realtime, size, state, tone])

  return (
    <div className={`dots-waveform-spec__surface dots-waveform-spec__surface--${tone}`}>
      <canvas
        ref={canvasRef}
        className={`dots-waveform-spec__canvas dots-waveform-spec__canvas--${size}`}
        aria-label={`${state} waveform`}
        draggable={false}
      />
    </div>
  )
}

function WaveformScenario({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: ReactNode
}) {
  return (
    <div className="dots-waveform-spec__scenario">
      <div>
        <strong>{title}</strong>
        <span>{note}</span>
      </div>
      {children}
    </div>
  )
}

function useMicrophoneWaveform(barCount: number) {
  const [status, setStatus] = useState<MicrophoneStatus>(() => {
    if (
      typeof window === 'undefined' ||
      typeof navigator === 'undefined' ||
      !window.AudioContext ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      return 'unsupported'
    }
    return 'idle'
  })
  const [meter, setMeter] = useState(0)
  const levelsRef = useRef<number[]>(createFlatLevels(barCount, 0.08))
  const barCountRef = useRef(barCount)
  const audioContextRef = useRef<AudioContext | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const frequencyDataRef = useRef<Uint8Array<ArrayBuffer>>(new Uint8Array(0))
  const timeDataRef = useRef<Uint8Array<ArrayBuffer>>(new Uint8Array(0))
  const rafRef = useRef(0)
  const lastMeterUpdateRef = useRef(0)

  useEffect(() => {
    barCountRef.current = barCount
    levelsRef.current = normalizeLevels(levelsRef.current, barCount)
  }, [barCount])

  const releaseAudio = useCallback(() => {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }

    sourceRef.current?.disconnect()
    sourceRef.current = null
    analyserRef.current = null

    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null

    if (audioContextRef.current) {
      void audioContextRef.current.close()
      audioContextRef.current = null
    }
  }, [])

  const stop = useCallback(() => {
    releaseAudio()
    levelsRef.current = createFlatLevels(barCountRef.current, 0.08)
    setMeter(0)
    setStatus((current) => (current === 'unsupported' ? current : 'stopped'))
  }, [releaseAudio])

  const start = useCallback(async () => {
    if (
      typeof window === 'undefined' ||
      typeof navigator === 'undefined' ||
      !window.AudioContext ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      setStatus('unsupported')
      return
    }

    releaseAudio()
    setStatus('requesting')

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })
      const audioContext = new window.AudioContext()
      if (audioContext.state === 'suspended') {
        await audioContext.resume()
      }

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 1024
      analyser.smoothingTimeConstant = 0.72

      const source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)

      streamRef.current = stream
      audioContextRef.current = audioContext
      sourceRef.current = source
      analyserRef.current = analyser
      frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount)
      timeDataRef.current = new Uint8Array(analyser.fftSize)
      setStatus('listening')

      const pump = (time: number) => {
        const currentAnalyser = analyserRef.current
        if (!currentAnalyser) return

        currentAnalyser.getByteFrequencyData(frequencyDataRef.current)
        currentAnalyser.getByteTimeDomainData(timeDataRef.current)

        const nextMeter = getMicrophoneMeter(timeDataRef.current)
        levelsRef.current = readMicrophoneLevels(
          frequencyDataRef.current,
          nextMeter,
          barCountRef.current,
        )

        if (time - lastMeterUpdateRef.current > 96) {
          lastMeterUpdateRef.current = time
          setMeter(nextMeter)
        }

        rafRef.current = window.requestAnimationFrame(pump)
      }

      rafRef.current = window.requestAnimationFrame(pump)
    } catch (error) {
      releaseAudio()
      setMeter(0)
      levelsRef.current = createFlatLevels(barCountRef.current, 0.08)
      const errorName = error instanceof Error ? error.name : ''
      setStatus(
        errorName === 'NotAllowedError' || errorName === 'PermissionDeniedError'
          ? 'denied'
          : 'error',
      )
    }
  }, [releaseAudio])

  useEffect(() => releaseAudio, [releaseAudio])

  return {
    levelsRef,
    meter,
    start,
    status,
    stop,
  }
}

function sampleAmplitude(state: WaveformState, index: number, time: number) {
  if (state === 'idle') {
    return 0.08 + Math.abs(Math.sin(time * 0.001 + index * 0.4)) * 0.1
  }

  if (state === 'processing') {
    const pulse = Math.max(0, Math.sin(time * 0.004 + index * 0.34))
    return 0.12 + pulse * 0.72
  }

  const carrier = (Math.sin(time * 0.005 + index * 0.42) + 1) / 2
  const breath = (Math.sin(time * 0.0017 + index * 0.09) + 1) / 2
  return 0.14 + (carrier * 0.6 + breath * 0.4) * 0.76
}

function readMicrophoneLevels(
  frequencyData: Uint8Array<ArrayBuffer>,
  meter: number,
  barCount: number,
) {
  if (!barCount) return []
  const usableBins = Math.max(1, Math.floor(frequencyData.length * 0.72))

  return Array.from({ length: barCount }, (_, index) => {
    const start = Math.floor((index / barCount) * usableBins)
    const end = Math.max(start + 1, Math.floor(((index + 1) / barCount) * usableBins))
    let total = 0

    for (let bin = start; bin < end; bin += 1) {
      total += frequencyData[bin] ?? 0
    }

    const frequencyLevel = total / (end - start) / 255
    const shaped = Math.pow(clamp(frequencyLevel * 2.25 + meter * 1.75, 0, 1), 0.72)
    const taper = 0.86 + Math.sin(index * 0.52) * 0.14
    return clamp(shaped * taper, 0.04, 1)
  })
}

function getMicrophoneMeter(timeData: Uint8Array<ArrayBuffer>) {
  if (!timeData.length) return 0
  let total = 0

  timeData.forEach((value) => {
    const centered = (value - 128) / 128
    total += centered * centered
  })

  return clamp(Math.sqrt(total / timeData.length) * 3.4, 0, 1)
}

function normalizeLevels(levels: number[], count: number) {
  if (levels.length === count) return levels
  if (!count) return []
  if (!levels.length) return createFlatLevels(count, 0.08)

  return Array.from({ length: count }, (_, index) => {
    const sourceIndex = Math.min(levels.length - 1, Math.floor((index / count) * levels.length))
    return levels[sourceIndex] ?? 0.08
  })
}

function createFlatLevels(count: number, value: number) {
  return Array.from({ length: count }, () => value)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function readCssVar(styles: CSSStyleDeclaration, name: string) {
  return styles.getPropertyValue(name).trim() || 'currentColor'
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + width - r, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + r)
  ctx.lineTo(x + width, y + height - r)
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height)
  ctx.lineTo(x + r, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.fill()
}
