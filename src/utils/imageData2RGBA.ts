export type RGBA = [Red: number, Green: number, Blue: number, Alpha: number] & {
  x: number
  y: number
}

export function rgba(r: number, g: number, b: number, a: number) {
  return [r, g, b, a]
}

export default function imageData2RGBA(imageData: Uint8ClampedArray, width: number): RGBA[] {
  const offset = 4
  const results: RGBA[] = []
  for (let i = 0; i < imageData.length / offset; i++) {
    const item = rgba(
      imageData[i * offset],
      imageData[i * offset + 1],
      imageData[i * offset + 2],
      imageData[i * offset + 3],
    ) as RGBA
    item.x = i % width | 0
    item.y = i / width | 0
    results.push(item)
  }
  return results
}
