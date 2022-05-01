// eslint-disable jsx-props-no-spreading
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts'
import { round, map } from 'lodash'
import useMedia from 'use-media'

import { ChartContainer, CustomTooltipStyled } from './styled'

const DISPLAY_ACTIVITY_DISTANCE_UNIT = 'km'

const Tick = ({
  payload: { value },
  verticalAnchor,
  visibleTicksCount,
  ...rest
}: {
  payload: { value?: number }
  verticalAnchor?: string
  visibleTicksCount?: number
}) => (
  <text style={{ fontSize: '12px' }} {...rest} dy={16}>
    {value} {DISPLAY_ACTIVITY_DISTANCE_UNIT}
  </text>
)

const CustomTooltip = (props: any) => {
  const { payload, label, active } = props
  const DISPLAY_ACTIVITY_DISTANCE_UNIT = 'km'

  const items = payload.map((item: any) => (
    <p style={{ color: item.stroke }} key={item.name}>
      {item.name}: {item.value} {item.unit}
    </p>
  ))

  if (active) {
    return (
      <CustomTooltipStyled>
        <p style={{ opacity: 0.5 }}>
          distance: {label} {DISPLAY_ACTIVITY_DISTANCE_UNIT}
        </p>
        {items}
      </CustomTooltipStyled>
    )
  }
  return <div />
}

const RenderLineChart = (props: any) => {
  const mediaDarkMode = useMedia('(prefers-color-scheme: dark)')
  const originalArray = props.data
  const showHeartrate = true
  const displayActivityTotalElevationGainUnit = 'm'
  const displaySpeedUnit = 'kph'

  // distance

  const distance = originalArray.filter((item: any) =>
    item.type.includes('distance')
  )
  const distanceStream = distance[0].data
  const distanceInKm = distanceStream.map((item: any) => round(item / 1000, 2))

  const displayDistance = distanceInKm

  // Altitude
  let altitudeStream: any = []
  const altitude = originalArray.filter((item: any) =>
    item.type.includes('altitude')
  )
  if (altitude.length > 0) {
    altitudeStream = altitude[0].data
  }

  // heartrate
  let heartrateStream: any = []
  const heartrate = originalArray.filter((item: any) =>
    item.type.includes('heartrate')
  )
  if (heartrate.length > 0) {
    heartrateStream = heartrate[0].data
  }

  // speed
  let speedStream = []
  const speed = originalArray.filter((item: any) =>
    item.type.includes('velocity_smooth')
  )

  if (speed.length > 0) {
    speedStream = speed[0].data
  }

  // Unit conversion function
  function toKPH(m: number) {
    const toKM = m / 1000
    const toKPH = toKM * 60 * 60

    return round(toKPH, 3)
  }

  const speedKPH = map(speedStream, toKPH)
  const displaySpeed = speedKPH
  const formattedData = displayDistance.map(
    (distance: number, index: number) => ({
      distance,
      altitude: altitudeStream[index],
      heartrate: heartrateStream[index],
      speed: displaySpeed[index],
    })
  )

  return (
    <ChartContainer>
      <ResponsiveContainer width="99%" height={200}>
        <ComposedChart data={formattedData}>
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid />
          <XAxis
            tick={<Tick payload={{ value: 0 }} />}
            type="number"
            domain={[0, 'dataMax']}
            // interval="Number"
            allowDecimals
            dataKey="distance"
            minTickGap={20}
          />
          <YAxis
            tick={<Tick payload={{ value: 0 }} />}
            minTickGap={30}
            type="number"
            dataKey="altitude"
            orientation="right"
            hide
          />

          <Area
            type="monotone"
            dataKey="altitude"
            stroke={mediaDarkMode ? '#fff' : '#000'}
            unit={displayActivityTotalElevationGainUnit}
            strokeWidth={0}
            dot={false}
            fill={mediaDarkMode ? '#fff' : '#000'}
            fillOpacity={0.2}
          />
          {showHeartrate ? (
            <Line
              type="monotone"
              dataKey="heartrate"
              unit="bpm"
              stroke="#DC524D"
              strokeWidth={1}
              dot={false}
            />
          ) : null}

          <Line
            type="monotone"
            dataKey="speed"
            unit={displaySpeedUnit}
            stroke="#0085FF"
            strokeWidth={1}
            // yAxisId="left"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export { RenderLineChart }
