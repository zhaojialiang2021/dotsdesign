import { dominantRgb, type Rgb } from '../../vendor/color-thief/mmcq'

const colorCache = new Map<string, string | null>()
const sampleQuality = 10

function rgbToHsb([redValue, greenValue, blueValue]: Rgb) {
  const red = redValue / 255
  const green = greenValue / 255
  const blue = blueValue / 255
  const brightness = Math.max(red, green, blue)
  const minimum = Math.min(red, green, blue)
  const delta = brightness - minimum
  let hue = 0

  if (delta !== 0) {
    if (brightness === red) hue = ((green - blue) / delta) % 6
    else if (brightness === green) hue = (blue - red) / delta + 2
    else hue = (red - green) / delta + 4
    hue = ((hue * 60) + 360) % 360
  }

  return {
    hue,
    saturation: brightness === 0 ? 0 : delta / brightness,
    brightness: brightness * 100,
  }
}

function hsbToRgb(hue: number, saturation: number, brightness: number): Rgb {
  const value = brightness / 100
  const chroma = value * saturation
  const section = hue / 60
  const intermediate = chroma * (1 - Math.abs((section % 2) - 1))
  const offset = value - chroma
  let channels: Rgb

  if (section < 1) channels = [chroma, intermediate, 0]
  else if (section < 2) channels = [intermediate, chroma, 0]
  else if (section < 3) channels = [0, chroma, intermediate]
  else if (section < 4) channels = [0, intermediate, chroma]
  else if (section < 5) channels = [intermediate, 0, chroma]
  else channels = [chroma, 0, intermediate]

  return channels.map((channel) => Math.round((channel + offset) * 255)) as Rgb
}

function lowerBrightness(rgb: Rgb): Rgb {
  const hsb = rgbToHsb(rgb)
  const adjustment = hsb.brightness >= 80 ? 40 : hsb.brightness >= 20 ? 20 : hsb.brightness
  return hsbToRgb(hsb.hue, hsb.saturation, hsb.brightness - adjustment)
}

function sampleBottomQuarter(image: HTMLImageElement): Rgb[] {
  const sourceWidth = image.naturalWidth
  const sourceHeight = image.naturalHeight
  if (sourceWidth === 0 || sourceHeight === 0) return []

  const regionHeight = Math.max(1, Math.round(sourceHeight * 0.25))
  const canvas = document.createElement('canvas')
  canvas.width = sourceWidth
  canvas.height = regionHeight
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return []

  context.drawImage(image, 0, sourceHeight - regionHeight, sourceWidth, regionHeight, 0, 0, sourceWidth, regionHeight)
  const data = context.getImageData(0, 0, sourceWidth, regionHeight).data
  const pixels: Rgb[] = []

  for (let pixel = 0; pixel < sourceWidth * regionHeight; pixel += sampleQuality) {
    const offset = pixel * 4
    const red = data[offset]
    const green = data[offset + 1]
    const blue = data[offset + 2]
    const alpha = data[offset + 3]
    if (alpha < 125 || (red > 250 && green > 250 && blue > 250)) continue
    pixels.push([red, green, blue])
  }

  return pixels
}

export function getMediaNoteGradientColor(image: HTMLImageElement): string | null {
  const cacheKey = image.currentSrc || image.src
  if (colorCache.has(cacheKey)) return colorCache.get(cacheKey) ?? null

  try {
    const dominant = dominantRgb(sampleBottomQuarter(image))
    const result = dominant ? `rgb(${lowerBrightness(dominant).join(' ')})` : null
    colorCache.set(cacheKey, result)
    return result
  } catch {
    // Canvas may reject cross-origin images without CORS headers; CSS keeps the token fallback.
    colorCache.set(cacheKey, null)
    return null
  }
}
