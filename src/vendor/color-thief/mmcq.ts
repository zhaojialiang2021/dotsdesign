// Adapted from Color Thief's RGB MMCQ quantizer.
// Source: https://github.com/lokesh/color-thief/blob/master/src/quantizers/mmcq.ts
// License: MIT, see ./LICENSE.

export type Rgb = [number, number, number]

const significantBits = 5
const rightShift = 8 - significantBits
const histogramSize = 1 << (3 * significantBits)
const maxIterations = 1000

function colorIndex(red: number, green: number, blue: number) {
  return (red << (2 * significantBits)) + (green << significantBits) + blue
}

class ColorBox {
  private cachedCount?: number
  redMin: number
  redMax: number
  greenMin: number
  greenMax: number
  blueMin: number
  blueMax: number
  private readonly histogram: Uint32Array

  constructor(
    redMin: number,
    redMax: number,
    greenMin: number,
    greenMax: number,
    blueMin: number,
    blueMax: number,
    histogram: Uint32Array,
  ) {
    this.redMin = redMin
    this.redMax = redMax
    this.greenMin = greenMin
    this.greenMax = greenMax
    this.blueMin = blueMin
    this.blueMax = blueMax
    this.histogram = histogram
  }

  copy() {
    return new ColorBox(
      this.redMin,
      this.redMax,
      this.greenMin,
      this.greenMax,
      this.blueMin,
      this.blueMax,
      this.histogram,
    )
  }

  count() {
    if (this.cachedCount !== undefined) return this.cachedCount
    let total = 0
    for (let red = this.redMin; red <= this.redMax; red += 1) {
      for (let green = this.greenMin; green <= this.greenMax; green += 1) {
        for (let blue = this.blueMin; blue <= this.blueMax; blue += 1) {
          total += this.histogram[colorIndex(red, green, blue)]
        }
      }
    }
    this.cachedCount = total
    return total
  }

  volume() {
    return (
      (this.redMax - this.redMin + 1) *
      (this.greenMax - this.greenMin + 1) *
      (this.blueMax - this.blueMin + 1)
    )
  }

  average(): Rgb {
    const multiplier = 1 << rightShift
    let total = 0
    let redTotal = 0
    let greenTotal = 0
    let blueTotal = 0

    for (let red = this.redMin; red <= this.redMax; red += 1) {
      for (let green = this.greenMin; green <= this.greenMax; green += 1) {
        for (let blue = this.blueMin; blue <= this.blueMax; blue += 1) {
          const population = this.histogram[colorIndex(red, green, blue)]
          total += population
          redTotal += population * (red + 0.5) * multiplier
          greenTotal += population * (green + 0.5) * multiplier
          blueTotal += population * (blue + 0.5) * multiplier
        }
      }
    }

    if (total === 0) {
      return [
        Math.trunc((multiplier * (this.redMin + this.redMax + 1)) / 2),
        Math.trunc((multiplier * (this.greenMin + this.greenMax + 1)) / 2),
        Math.trunc((multiplier * (this.blueMin + this.blueMax + 1)) / 2),
      ]
    }

    return [
      Math.trunc(redTotal / total),
      Math.trunc(greenTotal / total),
      Math.trunc(blueTotal / total),
    ]
  }
}

function makeHistogram(pixels: Rgb[]) {
  const histogram = new Uint32Array(histogramSize)
  pixels.forEach(([red, green, blue]) => {
    histogram[colorIndex(red >> rightShift, green >> rightShift, blue >> rightShift)] += 1
  })
  return histogram
}

function initialBox(pixels: Rgb[], histogram: Uint32Array) {
  let redMin = 31
  let redMax = 0
  let greenMin = 31
  let greenMax = 0
  let blueMin = 31
  let blueMax = 0

  pixels.forEach(([redValue, greenValue, blueValue]) => {
    const red = redValue >> rightShift
    const green = greenValue >> rightShift
    const blue = blueValue >> rightShift
    redMin = Math.min(redMin, red)
    redMax = Math.max(redMax, red)
    greenMin = Math.min(greenMin, green)
    greenMax = Math.max(greenMax, green)
    blueMin = Math.min(blueMin, blue)
    blueMax = Math.max(blueMax, blue)
  })

  return new ColorBox(redMin, redMax, greenMin, greenMax, blueMin, blueMax, histogram)
}

type Channel = 'red' | 'green' | 'blue'

function splitBox(box: ColorBox, histogram: Uint32Array): [ColorBox, ColorBox] | null {
  if (box.count() <= 1) return null

  const widths = {
    red: box.redMax - box.redMin + 1,
    green: box.greenMax - box.greenMin + 1,
    blue: box.blueMax - box.blueMin + 1,
  }
  const channel = (Object.keys(widths) as Channel[]).reduce((widest, current) =>
    widths[current] > widths[widest] ? current : widest,
  )
  const minKey = `${channel}Min` as const
  const maxKey = `${channel}Max` as const
  const partial = new Map<number, number>()
  let total = 0

  for (let position = box[minKey]; position <= box[maxKey]; position += 1) {
    let slicePopulation = 0
    for (let red = box.redMin; red <= box.redMax; red += 1) {
      for (let green = box.greenMin; green <= box.greenMax; green += 1) {
        for (let blue = box.blueMin; blue <= box.blueMax; blue += 1) {
          const channelValue = channel === 'red' ? red : channel === 'green' ? green : blue
          if (channelValue === position) slicePopulation += histogram[colorIndex(red, green, blue)]
        }
      }
    }
    total += slicePopulation
    partial.set(position, total)
  }

  for (let position = box[minKey]; position < box[maxKey]; position += 1) {
    if ((partial.get(position) ?? 0) < total / 2) continue
    const first = box.copy()
    const second = box.copy()
    first[maxKey] = position
    second[minKey] = position + 1
    if (first.count() > 0 && second.count() > 0) return [first, second]
  }
  return null
}

function splitUntil(boxes: ColorBox[], target: number, histogram: Uint32Array) {
  let iterations = 0
  while (boxes.length < target && iterations < maxIterations) {
    iterations += 1
    boxes.sort((first, second) => first.count() * first.volume() - second.count() * second.volume())
    const candidate = boxes.pop()
    if (!candidate) break
    const split = splitBox(candidate, histogram)
    if (!split) {
      boxes.push(candidate)
      break
    }
    boxes.push(...split)
  }
}

export function dominantRgb(pixels: Rgb[], colorCount = 10): Rgb | null {
  if (pixels.length === 0) return null
  const histogram = makeHistogram(pixels)
  const boxes = [initialBox(pixels, histogram)]
  splitUntil(boxes, Math.max(2, Math.min(colorCount, 20)), histogram)
  boxes.sort((first, second) => second.count() - first.count())
  return boxes[0]?.average() ?? null
}
