'use client'

import { useMemo } from 'react'
import { Activity } from '@/types'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { computeActivityInsights, EffortLabel, HRZones } from '@/utils/activity-insights'

interface ActivityInsightsProps {
  activity: Activity
  heartrateStream: number[]
  velocityStream: number[]
}

const effortConfig: Record<
  EffortLabel,
  { label: string; className: string }
> = {
  Recovery: {
    label: 'Recovery',
    className: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  },
  Aerobic: {
    label: 'Aerobic',
    className:
      'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  },
  Tempo: {
    label: 'Tempo',
    className:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  },
  Threshold: {
    label: 'Threshold',
    className:
      'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  },
  Max: {
    label: 'Max Effort',
    className: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  },
}

const zoneColors = [
  { key: 'z1', label: 'Z1', color: 'bg-sky-400', description: 'Recovery' },
  { key: 'z2', label: 'Z2', color: 'bg-green-400', description: 'Aerobic' },
  { key: 'z3', label: 'Z3', color: 'bg-yellow-400', description: 'Tempo' },
  { key: 'z4', label: 'Z4', color: 'bg-orange-400', description: 'Threshold' },
  { key: 'z5', label: 'Z5', color: 'bg-red-500', description: 'Max' },
] as const

function HRZonesBar({ zones }: { zones: HRZones }) {
  return (
    <div className="space-y-2">
      <div className="flex h-4 w-full overflow-hidden rounded-full">
        {zoneColors.map(({ key, color }) => {
          const pct = zones[key]
          if (pct === 0) return null
          return (
            <div
              key={key}
              className={`${color} h-full transition-all`}
              style={{ width: `${pct}%` }}
              title={`${key.toUpperCase()}: ${pct}%`}
            />
          )
        })}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {zoneColors.map(({ key, label, color, description }) => {
          const pct = zones[key]
          return (
            <div key={key} className="flex items-center gap-1.5">
              <div className={`h-2.5 w-2.5 rounded-sm ${color}`} />
              <span className="text-xs text-muted-foreground">
                {label} {description}
              </span>
              <span className="text-xs font-medium">{pct}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DecouplingStatus({ value }: { value: number }) {
  if (value < 0)
    return <span className="text-xs text-green-600 dark:text-green-400">Improving</span>
  if (value < 5)
    return <span className="text-xs text-green-600 dark:text-green-400">Stable</span>
  if (value < 10)
    return <span className="text-xs text-yellow-600 dark:text-yellow-400">Mild drift</span>
  return <span className="text-xs text-red-600 dark:text-red-400">Significant drift</span>
}

function PacingStatus({ value }: { value: number }) {
  if (value < 8)
    return <span className="text-xs text-green-600 dark:text-green-400">Very even</span>
  if (value < 15)
    return <span className="text-xs text-yellow-600 dark:text-yellow-400">Moderate variation</span>
  return <span className="text-xs text-orange-600 dark:text-orange-400">Highly variable</span>
}

export function ActivityInsights({
  activity,
  heartrateStream,
  velocityStream,
}: ActivityInsightsProps) {
  const insights = useMemo(
    () =>
      computeActivityInsights(
        heartrateStream,
        velocityStream,
        activity.max_heartrate,
      ),
    [heartrateStream, velocityStream, activity.max_heartrate],
  )

  if (!activity.has_heartrate || heartrateStream.length === 0) {
    return null
  }

  const effort = effortConfig[insights.effortLabel]

  return (
    <Card className="bg-gradient-to-br from-background to-muted/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Activity Insights</CardTitle>
          <span
            className={`rounded-full px-3 py-0.5 text-xs font-semibold ${effort.className}`}
          >
            {effort.label}
          </span>
          {activity.suffer_score != null && (
            <span className="ml-auto text-sm text-muted-foreground">
              Suffer score{' '}
              <span className="font-semibold text-foreground">
                {activity.suffer_score}
              </span>
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Heart Rate Zones
          </p>
          <HRZonesBar zones={insights.hrZones} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {insights.aerobicDecoupling !== null && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Aerobic Decoupling
              </p>
              <p className="text-2xl font-bold">
                {insights.aerobicDecoupling > 0 ? '+' : ''}
                {insights.aerobicDecoupling.toFixed(1)}%
              </p>
              <DecouplingStatus value={insights.aerobicDecoupling} />
            </div>
          )}
          {insights.pacingScore !== null && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Pacing Consistency
              </p>
              <p className="text-2xl font-bold">
                {insights.pacingScore.toFixed(1)}% CV
              </p>
              <PacingStatus value={insights.pacingScore} />
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed border-t pt-4">
          {insights.summary}
        </p>
      </CardContent>
    </Card>
  )
}
