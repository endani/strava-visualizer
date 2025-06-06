'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

interface ActivityChartProps {
  data: {
    distance: number
    altitude: number
    heartrate: number
    velocity: number
  }[]
  onHover: (data: any) => void
}

export const ActivityChart = ({ data, onHover }: ActivityChartProps) => {
  const chartConfig = {
    altitude: {
      label: 'Elevation',
      color: 'hsl(var(--primary))',
    },
    heartrate: {
      label: 'Heart Rate',
      color: 'hsl(0 84.2% 60.2%)',
    },
    velocity: {
      label: 'Speed',
      color: 'hsl(142.1 70.6% 45.3%)',
    },
  }

  return (
    <ChartContainer className="h-[300px] w-full" config={chartConfig}>
      <AreaChart
        data={data}
        margin={{
          left: 0,
          right: 0,
          top: 10,
        }}
        onMouseLeave={() => onHover(null)}
        onMouseMove={(e) => {
          if (e.activePayload && e.activePayload.length > 0) {
            onHover(e.activePayload[0].payload)
          }
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="distance"
          tickLine={false}
          tickMargin={8}
          unit="km"
        />
        <YAxis
          axisLine={false}
          dataKey="altitude"
          domain={[
            (dataMin: number) => Math.floor(dataMin * 0.9),
            (dataMax: number) => Math.ceil(dataMax * 1.1),
          ]}
          tickLine={false}
          tickMargin={8}
          unit="m"
          yAxisId="left"
        />
        <YAxis
          axisLine={false}
          orientation="right"
          tickLine={false}
          tickMargin={8}
          yAxisId="right"
        />
        <ChartTooltip
          content={<ChartTooltipContent indicator="dot" />}
          cursor={false}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <defs>
          <linearGradient id="colorAltitude" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="colorHeartrate" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(0 84.2% 60.2%)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="hsl(0 84.2% 60.2%)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="colorVelocity" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(142.1 70.6% 45.3%)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="hsl(142.1 70.6% 45.3%)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="altitude"
          fill="url(#colorAltitude)"
          stroke="hsl(var(--primary))"
          type="natural"
          yAxisId="left"
        />
        <Area
          dataKey="heartrate"
          fill="url(#colorHeartrate)"
          stroke="hsl(0 84.2% 60.2%)"
          type="natural"
          yAxisId="right"
        />
        <Area
          dataKey="velocity"
          fill="url(#colorVelocity)"
          stroke="hsl(142.1 70.6% 45.3%)"
          type="natural"
          yAxisId="right"
        />
      </AreaChart>
    </ChartContainer>
  )
}
