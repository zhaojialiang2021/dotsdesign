import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  MultiPassRenderer,
  createEmptyTexture,
} from '../../vendor/liquid-glass-studio/GLUtils'
import {
  GPUMultiPassRenderer,
  gpuCreateEmptyTexture,
} from '../../vendor/liquid-glass-studio/GPUUtils'
import type {
  IMultiPassRenderer,
  ITextureHandle,
  RenderPassConfig,
} from '../../vendor/liquid-glass-studio/RendererInterface'
import { detectWebGPU } from '../../vendor/liquid-glass-studio/gpuDetect'
import glslVertex from '../../vendor/liquid-glass-studio/shaders/vertex.glsl?raw'
import glslBackground from '../../vendor/liquid-glass-studio/shaders/fragment-bg.glsl?raw'
import glslVerticalBlur from '../../vendor/liquid-glass-studio/shaders/fragment-bg-vblur.glsl?raw'
import glslHorizontalBlur from '../../vendor/liquid-glass-studio/shaders/fragment-bg-hblur.glsl?raw'
import glslMain from '../../vendor/liquid-glass-studio/shaders/fragment-main.glsl?raw'
import glslSdf from '../../vendor/liquid-glass-studio/shaders/lib/sdf.glsl?raw'
import glslMath from '../../vendor/liquid-glass-studio/shaders/lib/math.glsl?raw'
import glslColor from '../../vendor/liquid-glass-studio/shaders/lib/color.glsl?raw'
import wgslVertex from '../../vendor/liquid-glass-studio/shaders-wgsl/vertex.wgsl?raw'
import wgslBackground from '../../vendor/liquid-glass-studio/shaders-wgsl/fragment-bg.wgsl?raw'
import wgslVerticalBlur from '../../vendor/liquid-glass-studio/shaders-wgsl/fragment-bg-vblur.wgsl?raw'
import wgslHorizontalBlur from '../../vendor/liquid-glass-studio/shaders-wgsl/fragment-bg-hblur.wgsl?raw'
import wgslMain from '../../vendor/liquid-glass-studio/shaders-wgsl/fragment-main.wgsl?raw'
import wgslSdf from '../../vendor/liquid-glass-studio/shaders-wgsl/lib/sdf.wgsl?raw'
import wgslMath from '../../vendor/liquid-glass-studio/shaders-wgsl/lib/math.wgsl?raw'
import wgslColor from '../../vendor/liquid-glass-studio/shaders-wgsl/lib/color.wgsl?raw'

type RendererBackend = 'webgpu' | 'webgl2' | 'static'

interface DotsLiquidGlassStudioSurfaceProps {
  collapsing: boolean
}

const backgroundTextureWidth = 361
const backgroundTextureHeight = 72

const glslIncludes: Record<string, string> = {
  './lib/sdf.glsl': glslSdf,
  './lib/math.glsl': glslMath,
  './lib/color.glsl': glslColor,
}

const wgslIncludes: Record<string, string> = {
  './lib/sdf.wgsl': wgslSdf,
  './lib/math.wgsl': wgslMath,
  './lib/color.wgsl': wgslColor,
}

const resolveShaderIncludes = (source: string, includes: Record<string, string>) => source.replace(
  /#include\s+['"]([^'"]+)['"]/g,
  (_, path: string) => includes[path] ?? '',
)

const resolvedGlslBackground = resolveShaderIncludes(glslBackground, glslIncludes)
const resolvedGlslMain = resolveShaderIncludes(glslMain, glslIncludes)
const resolvedWgslBackground = resolveShaderIncludes(wgslBackground, wgslIncludes)
const resolvedWgslMain = resolveShaderIncludes(wgslMain, wgslIncludes)

const createPasses = (backend: Exclude<RendererBackend, 'static'>): RenderPassConfig[] => {
  const vertex = backend === 'webgpu' ? wgslVertex : glslVertex
  const background = backend === 'webgpu' ? resolvedWgslBackground : resolvedGlslBackground
  const verticalBlur = backend === 'webgpu' ? wgslVerticalBlur : glslVerticalBlur
  const horizontalBlur = backend === 'webgpu' ? wgslHorizontalBlur : glslHorizontalBlur
  const main = backend === 'webgpu' ? resolvedWgslMain : resolvedGlslMain

  return [
    { name: 'bgPass', shader: { vertex, fragment: background } },
    {
      name: 'vBlurPass',
      shader: { vertex, fragment: verticalBlur },
      inputs: { u_prevPassTexture: 'bgPass' },
    },
    {
      name: 'hBlurPass',
      shader: { vertex, fragment: horizontalBlur },
      inputs: { u_prevPassTexture: 'vBlurPass' },
    },
    {
      name: 'mainPass',
      shader: { vertex, fragment: main },
      inputs: { u_blurredBg: 'hBlurPass', u_bg: 'bgPass' },
      outputToScreen: true,
    },
  ]
}

const computeGaussianKernel = (radius: number) => {
  const sigma = radius / 3
  const kernel: number[] = []
  let sum = 0

  for (let index = 0; index <= radius; index += 1) {
    const weight = Math.exp(-0.5 * (index * index) / (sigma * sigma))
    kernel.push(weight)
    sum += index === 0 ? weight : weight * 2
  }

  return kernel.map((weight) => weight / sum)
}

const drawBackgroundFrame = (
  host: HTMLElement,
  snapshot: HTMLCanvasElement,
) => {
  const stage = host.closest<HTMLElement>('.ask-dots-demo-stage')
  if (!stage) return false

  const stageRect = stage.getBoundingClientRect()
  const scale = stageRect.width / 393
  if (!Number.isFinite(scale) || scale <= 0) return false

  const hostRect = host.getBoundingClientRect()
  const target = hostRect
  if (target.width <= 0 || target.height <= 0) return false

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  const snapshotWidth = Math.round(backgroundTextureWidth * pixelRatio)
  const snapshotHeight = Math.round(backgroundTextureHeight * pixelRatio)
  if (snapshot.width !== snapshotWidth) snapshot.width = snapshotWidth
  if (snapshot.height !== snapshotHeight) snapshot.height = snapshotHeight
  const context = snapshot.getContext('2d')
  if (!context) return false

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  const styles = getComputedStyle(stage)
  const background = styles.getPropertyValue('--bg-base').trim()
    || styles.getPropertyValue('--always-white').trim()
    || getComputedStyle(document.body).backgroundColor
  context.fillStyle = background
  context.fillRect(0, 0, backgroundTextureWidth, backgroundTextureHeight)

  const destinationScaleX = backgroundTextureWidth / target.width
  const destinationScaleY = backgroundTextureHeight / target.height

  stage.querySelectorAll<HTMLImageElement>('.ask-dots-demo__result-image').forEach((image) => {
    if (!image.complete || image.naturalWidth === 0 || image.naturalHeight === 0) return
    const imageRect = image.getBoundingClientRect()
    const left = Math.max(target.left, imageRect.left)
    const top = Math.max(target.top, imageRect.top)
    const right = Math.min(target.right, imageRect.right)
    const bottom = Math.min(target.bottom, imageRect.bottom)
    if (right <= left || bottom <= top) return

    const sourceX = ((left - imageRect.left) / imageRect.width) * image.naturalWidth
    const sourceY = ((top - imageRect.top) / imageRect.height) * image.naturalHeight
    const sourceWidth = ((right - left) / imageRect.width) * image.naturalWidth
    const sourceHeight = ((bottom - top) / imageRect.height) * image.naturalHeight
    const destinationX = (left - target.left) * destinationScaleX
    const destinationY = (top - target.top) * destinationScaleY
    const destinationWidth = (right - left) * destinationScaleX
    const destinationHeight = (bottom - top) * destinationScaleY

    context.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destinationX,
      destinationY,
      destinationWidth,
      destinationHeight,
    )
  })

  return true
}

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

export function DotsLiquidGlassStudioSurface({ collapsing }: DotsLiquidGlassStudioSurfaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [backend, setBackend] = useState<RendererBackend>(() => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'static' : 'webgpu'
  ))

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setBackend(media.matches ? 'static' : 'webgpu')
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || backend === 'static') return

    let disposed = false
    let frame = 0
    let renderer: IMultiPassRenderer | null = null
    let texture: ITextureHandle | null = null
    let backgroundCanvas: HTMLCanvasElement | null = null
    let device: GPUDevice | null = null
    let width = 1
    let height = 1
    let backgroundDirty = true
    let removeLiveListeners = () => undefined
    const blurRadius = 12
    const blurWeights = computeGaussianKernel(blurRadius)
    const animationDuration = collapsing ? 560 : 1050

    const disposeTexture = () => {
      if (!texture) return
      if (backend === 'webgpu') (texture as GPUTexture).destroy()
      else canvas.getContext('webgl2')?.deleteTexture(texture as WebGLTexture)
      texture = null
    }

    const resize = () => {
      const host = canvas.parentElement
      if (!host || !renderer) return false
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.round(rect.width * dpr))
      height = Math.max(1, Math.round(rect.height * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        if (backend === 'webgl2') canvas.getContext('webgl2')?.viewport(0, 0, width, height)
        renderer.resize(width, height)
        backgroundDirty = true
        return true
      }
      return false
    }

    const uploadLiveBackground = () => {
      const host = canvas.parentElement
      if (!host || !backgroundCanvas || !texture) return
      if (!drawBackgroundFrame(host, backgroundCanvas)) return

      if (backend === 'webgpu' && device) {
        device.queue.copyExternalImageToTexture(
          { source: backgroundCanvas, flipY: false },
          { texture: texture as GPUTexture },
          [backgroundCanvas.width, backgroundCanvas.height],
        )
      } else {
        const gl = canvas.getContext('webgl2')
        if (!gl) return
        gl.bindTexture(gl.TEXTURE_2D, texture as WebGLTexture)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          backgroundCanvas,
        )
        gl.generateMipmap(gl.TEXTURE_2D)
      }
      backgroundDirty = false
    }

    const observeLiveBackground = () => {
      const stage = canvas.closest<HTMLElement>('.ask-dots-demo-stage')
      const scrollArea = stage?.querySelector<HTMLElement>('.ask-dots-demo__results-scroll')
      const images = stage?.querySelectorAll<HTMLImageElement>('.ask-dots-demo__result-image') ?? []
      const markDirty = () => {
        backgroundDirty = true
      }

      scrollArea?.addEventListener('scroll', markDirty, { passive: true })
      images.forEach((image) => image.addEventListener('load', markDirty))
      removeLiveListeners = () => {
        scrollArea?.removeEventListener('scroll', markDirty)
        images.forEach((image) => image.removeEventListener('load', markDirty))
      }
    }

    const start = async () => {
      try {
        if (backend === 'webgpu') {
          const detected = await detectWebGPU()
          if (!detected.supported || !detected.device) throw new Error(detected.reason ?? 'WebGPU unavailable')
          device = detected.device
          renderer = new GPUMultiPassRenderer(canvas, createPasses('webgpu'), device)
        } else {
          renderer = new MultiPassRenderer(canvas, createPasses('webgl2'))
        }

        await nextFrame()
        if (disposed || !renderer) return
        resize()

        backgroundCanvas = document.createElement('canvas')
        drawBackgroundFrame(canvas.parentElement!, backgroundCanvas)
        texture = backend === 'webgpu' && device
          ? gpuCreateEmptyTexture(device, backgroundCanvas.width, backgroundCanvas.height)
          : createEmptyTexture(canvas.getContext('webgl2')!)
        observeLiveBackground()
        uploadLiveBackground()

        const startedAt = performance.now()
        const render = (now: number) => {
          if (disposed || !renderer) return
          resize()
          const elapsed = Math.min((now - startedAt) / animationDuration, 1)
          const animating = elapsed < 1
          if (!animating && !backgroundDirty) {
            frame = requestAnimationFrame(render)
            return
          }
          if (animating || backgroundDirty) uploadLiveBackground()
          const eased = 1 - Math.pow(1 - elapsed, 3)
          const exitProgress = collapsing ? eased : 0
          const glareSweep = collapsing ? 1 - exitProgress : eased
          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          const logicalWidth = width / dpr
          const logicalHeight = height / dpr

          renderer.setUniforms({
            u_resolution: [width, height],
            u_dpr: dpr,
            u_blurWeights: blurWeights,
            u_blurRadius: blurRadius,
            u_mouse: [width, height * 0.5],
            u_mouseSpring: [width * 0.5, height * 0.5],
            u_shapeWidth: Math.max(1, logicalWidth - 2),
            u_shapeHeight: Math.max(1, logicalHeight - 2),
            u_shapeRadius: 16,
            u_shapeRoundness: 4,
            u_mergeRate: 0.05,
            u_glareAngle: -1.25 + glareSweep * 2.15,
            u_showShape1: 0,
          })

          renderer.render({
            bgPass: {
              u_bgType: 3,
              u_bgTexture: texture ?? undefined,
              u_bgTextureRatio: backgroundTextureWidth / backgroundTextureHeight,
              u_bgTextureReady: texture ? 1 : 0,
              u_shadowExpand: 18,
              u_shadowFactor: 0.16 * (1 - exitProgress),
              u_shadowPosition: [0, -2],
            },
            mainPass: {
              u_tint: [1, 1, 1, 0.34 - exitProgress * 0.12],
              u_refThickness: 26,
              u_refFactor: 1.42,
              u_refDispersion: 8,
              u_refFresnelRange: 34,
              u_refFresnelHardness: 0.18,
              u_refFresnelFactor: 0.34,
              u_glareRange: 30,
              u_glareHardness: 0.2,
              u_glareConvergence: 0.58,
              u_glareOppositeFactor: 0.68,
              u_glareFactor: (collapsing ? 0.28 : 0.88) * (1 - exitProgress),
              u_blurEdge: 1,
              STEP: 9,
            },
          })

          frame = requestAnimationFrame(render)
        }

        frame = requestAnimationFrame(render)
      } catch {
        if (disposed) return
        setBackend((current) => current === 'webgpu' ? 'webgl2' : 'static')
      }
    }

    void start()

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      removeLiveListeners()
      disposeTexture()
      renderer?.dispose()
    }
  }, [backend, collapsing])

  return (
    <canvas
      key={backend}
      ref={canvasRef}
      className="ask-dots-demo__liquid-glass-studio"
      data-renderer={backend}
      data-sampling="live"
      aria-hidden="true"
    />
  )
}
