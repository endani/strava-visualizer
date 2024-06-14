// eslint-disable jsx-props-no-spreading
import { Card, Title, AreaChart } from '@tremor/react'
import { round, map } from 'lodash'

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}%`

const ActivityChart = (props: any) => {
  const { data: originalArray } = props

  // distance
  const distance = originalArray.filter((item: any) =>
    item.type.includes('distance'),
  )
  const distanceStream = distance[0].data
  const distanceInKm = distanceStream.map((item: any) => round(item / 1000, 2))

  const displayDistance = distanceInKm

  // Altitude
  let altitudeStream: any = []
  const altitude = originalArray.filter((item: any) =>
    item.type.includes('altitude'),
  )

  if (altitude.length > 0) {
    altitudeStream = altitude[0].data
  }

  // heartrate
  let heartrateStream: any = []
  const heartrate = originalArray.filter((item: any) =>
    item.type.includes('heartrate'),
  )

  if (heartrate.length > 0) {
    heartrateStream = heartrate[0].data
  }

  // speed
  let speedStream = []
  const speed = originalArray.filter((item: any) =>
    item.type.includes('velocity_smooth'),
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
    }),
  )

  return (
    <Card>
      <Title>Activity Chart</Title>
      <AreaChart
        categories={['altitude', 'heartrate', 'speed']}
        className="mt-6"
        color="blue"
        data={formattedData}
        index="distance"
        showGridLines={false}
        showXAxis={false}
        showYAxis={false}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  )
}

export { ActivityChart }
