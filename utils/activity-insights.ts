export type EffortLabel = 'Recovery' | 'Aerobic' | 'Tempo' | 'Threshold' | 'Max'

export interface HRZones {
  z1: number
  z2: number
  z3: number
  z4: number
  z5: number
}

export interface ActivityInsights {
  effortLabel: EffortLabel
  hrZones: HRZones
  aerobicDecoupling: number | null
  pacingScore: number | null
  summary: string
}

/**
 * Returns time spent in each HR zone as percentages (0–100).
 * Zone boundaries are based on % of maxHR (60/70/80/90).
 */
export function computeHRZones(heartrate: number[], maxHR: number): HRZones {
  if (heartrate.length === 0 || maxHR <= 0) {
    return { z1: 0, z2: 0, z3: 0, z4: 0, z5: 0 }
  }

  const counts = { z1: 0, z2: 0, z3: 0, z4: 0, z5: 0 }
  for (const hr of heartrate) {
    const pct = hr / maxHR
    if (pct < 0.6) counts.z1++
    else if (pct < 0.7) counts.z2++
    else if (pct < 0.8) counts.z3++
    else if (pct < 0.9) counts.z4++
    else counts.z5++
  }

  const total = heartrate.length
  return {
    z1: Math.round((counts.z1 / total) * 100),
    z2: Math.round((counts.z2 / total) * 100),
    z3: Math.round((counts.z3 / total) * 100),
    z4: Math.round((counts.z4 / total) * 100),
    z5: Math.round((counts.z5 / total) * 100),
  }
}

/**
 * Aerobic Decoupling (Pa:Hr): compares pace/HR efficiency ratio between
 * the first and second half of the activity. Positive = HR drifted up
 * relative to pace (cardiac stress). Negative = HR actually improved.
 */
export function computeAerobicDecoupling(
  velocity: number[],
  heartrate: number[],
): number | null {
  const len = Math.min(velocity.length, heartrate.length)
  if (len < 10) return null

  const mid = Math.floor(len / 2)

  const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length

  const v1 = mean(velocity.slice(0, mid))
  const hr1 = mean(heartrate.slice(0, mid))
  const v2 = mean(velocity.slice(mid))
  const hr2 = mean(heartrate.slice(mid))

  if (hr1 === 0 || v1 === 0) return null

  const eff1 = v1 / hr1
  const eff2 = v2 / hr2

  return Number(((eff1 - eff2) / eff1) * 100)
}

/**
 * Determines the dominant effort label from the HR zone distribution.
 */
export function computeEffortLabel(zones: HRZones): EffortLabel {
  if (zones.z5 >= 20) return 'Max'
  if (zones.z4 >= 25) return 'Threshold'
  if (zones.z3 >= 25) return 'Tempo'
  if (zones.z2 >= 30) return 'Aerobic'
  return 'Recovery'
}

/**
 * Pacing consistency as coefficient of variation (lower = more consistent).
 * Filters out near-zero velocity samples (stops, traffic lights, etc.).
 */
export function computePacingScore(velocity: number[]): number | null {
  const moving = velocity.filter((v) => v > 0.5)
  if (moving.length < 5) return null

  const mean = moving.reduce((a, b) => a + b, 0) / moving.length
  const variance =
    moving.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / moving.length
  const stdDev = Math.sqrt(variance)

  return Number(((stdDev / mean) * 100).toFixed(1))
}

function decouplingLabel(d: number): string {
  if (d < 0) return 'Your cardiovascular efficiency actually improved through the activity — a strong aerobic sign.'
  if (d < 5) return 'Your heart rate stayed stable relative to pace — good aerobic fitness at this intensity.'
  if (d < 10) return 'Some cardiac drift in the second half — mild fatigue or heat stress detected.'
  return 'Significant cardiac drift detected — your body worked harder for the same pace as the effort progressed.'
}

function pacingLabel(cv: number): string {
  if (cv < 8) return 'Pacing was very even throughout.'
  if (cv < 15) return 'Pacing had moderate variation.'
  return 'Pacing was highly variable — lots of surges or terrain changes.'
}

const effortDescriptions: Record<EffortLabel, string> = {
  Recovery: 'This was an easy recovery effort, mostly in low aerobic zones.',
  Aerobic: 'This was a solid aerobic base session, the bread and butter of endurance training.',
  Tempo: 'This was a tempo effort — comfortably hard and good for raising your lactate threshold.',
  Threshold: 'This was a high-intensity threshold session — demanding but effective for fitness gains.',
  Max: 'This was a maximum intensity effort with significant time in the red zone.',
}

export function generateInsightSummary(
  label: EffortLabel,
  decoupling: number | null,
  pacing: number | null,
): string {
  const parts: string[] = [effortDescriptions[label]]
  if (decoupling !== null) parts.push(decouplingLabel(decoupling))
  if (pacing !== null) parts.push(pacingLabel(pacing))
  return parts.join(' ')
}

export function computeActivityInsights(
  heartrateStream: number[],
  velocityStream: number[],
  maxHR: number,
): ActivityInsights {
  const hrZones = computeHRZones(heartrateStream, maxHR)
  const effortLabel = computeEffortLabel(hrZones)
  const aerobicDecoupling = computeAerobicDecoupling(velocityStream, heartrateStream)
  const pacingScore = computePacingScore(velocityStream)
  const summary = generateInsightSummary(effortLabel, aerobicDecoupling, pacingScore)

  return { effortLabel, hrZones, aerobicDecoupling, pacingScore, summary }
}
