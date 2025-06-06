import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import hsl from 'hsl-to-hex'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0')
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')

  return `${h}:${m}:${s}`
}

export function formatSpeed(speed: number) {
  return `${speed.toFixed(2)} km/h`
}

export function formatDistance(distance: number) {
  return `${(distance / 1000).toFixed(2)} km`
}

export function getThemeColor(variable: string) {
  if (typeof window === 'undefined') {
    return '#000000'
  }
  const hslColor = getComputedStyle(document.documentElement).getPropertyValue(
    variable,
  )
  const [h, s, l] = hslColor.split(' ').map(parseFloat)

  if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
    return hsl(h, s, l)
  }

  return '#000000'
}
