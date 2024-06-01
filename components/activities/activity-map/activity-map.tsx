import { MapImageLarge } from './activity-map.styled'
import { ActivityMapProps } from './activity-map.types'

const googleApiKey = process.env.googleAPIKEY

const ActivityMap = (props: ActivityMapProps) => {
  const { mediaDarkMode, polyline } = props

  const pathWeight = 4
  const pathColor = '0x3B8BFFff'
  const mapDimensionLarge = '380x380'
  let Style = ''

  if (!mediaDarkMode) {
    Style =
      '&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.business%7Cvisibility:off&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Cvisibility:off&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size='
  } else {
    Style =
      '&format=png&maptype=roadmap&style=feature:water%7Celement:geometry.fill%7Ccolor:0x75cff0&size='
  }

  const imageUrlLarge = `https://maps.googleapis.com/maps/api/staticmap?key=${googleApiKey}&path=weight:${pathWeight}%7Ccolor:${pathColor}%7Cenc:${polyline}${Style}${mapDimensionLarge}`

  return (
    <MapImageLarge>
      <img
        alt=""
        src={imageUrlLarge}
        style={{
          width: '100%',
        }}
      />
    </MapImageLarge>
  )
}

export { ActivityMap }
