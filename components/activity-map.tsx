'use client'

import Map, {
  Marker,
  Source,
  Layer,
  NavigationControl,
} from 'react-map-gl/mapbox'
import { useTheme } from 'next-themes'
import 'mapbox-gl/dist/mapbox-gl.css'
import polyline from '@mapbox/polyline'
import { LngLatBounds } from 'mapbox-gl'

import { getThemeColor } from '@/lib/utils'

interface ActivityMapProps {
  summary_polyline?: string
  coordinates?: [number, number][]
  hoveredDataPoint?: {
    latlng: [number, number]
  }
}

export const ActivityMap = ({
  summary_polyline,
  coordinates: routeCoordinates,
  hoveredDataPoint,
}: ActivityMapProps) => {
  const { theme } = useTheme()
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  if (!mapboxToken) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <p>Mapbox token is not configured.</p>
      </div>
    )
  }

  if (!summary_polyline && !routeCoordinates) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <p>Map data is not available for this activity.</p>
      </div>
    )
  }

  let coordinates: [number, number][] = []

  if (routeCoordinates && routeCoordinates.length > 0) {
    coordinates = routeCoordinates.map(
      (c: [number, number]) => [c[1], c[0]] as [number, number],
    )
  } else if (summary_polyline) {
    // Decode polyline
    const decodedCoordinates = polyline.decode(summary_polyline)

    coordinates = decodedCoordinates.map(
      (c: [number, number]) => [c[1], c[0]] as [number, number],
    )
  }

  if (coordinates.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <p>Map data is not available for this activity.</p>
      </div>
    )
  }

  const bounds = coordinates.reduce(
    (acc: LngLatBounds, coord: any) => acc.extend(coord),
    new LngLatBounds(coordinates[0], coordinates[0]),
  )

  const lineColor = getThemeColor('--primary') || '#2563EB'

  const startCoord = coordinates[0]
  const endCoord = coordinates[coordinates.length - 1]

  // Place ~10 evenly-spaced direction chevrons along the route
  const directionMarkers: { lng: number; lat: number; bearing: number }[] = []
  const markerCount = Math.max(1, Math.min(10, Math.floor(coordinates.length / 20)))
  const step = Math.floor(coordinates.length / (markerCount + 1))
  for (let i = 1; i <= markerCount; i++) {
    const idx = i * step
    const curr = coordinates[idx]
    const lookahead = coordinates[Math.min(idx + Math.max(1, step >> 2), coordinates.length - 1)]
    const [lng1, lat1] = curr
    const [lng2, lat2] = lookahead
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const lat1R = (lat1 * Math.PI) / 180
    const lat2R = (lat2 * Math.PI) / 180
    const y = Math.sin(dLng) * Math.cos(lat2R)
    const x =
      Math.cos(lat1R) * Math.sin(lat2R) -
      Math.sin(lat1R) * Math.cos(lat2R) * Math.cos(dLng)
    const bearing = (Math.atan2(y, x) * 180) / Math.PI
    directionMarkers.push({ lng: lng1, lat: lat1, bearing })
  }

  const mapStyle =
    theme === 'dark'
      ? 'mapbox://styles/mapbox/dark-v11'
      : 'mapbox://styles/mapbox/streets-v12'

  const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: coordinates,
    },
  }

  return (
    <Map
      initialViewState={{
        bounds: bounds,
        padding: { top: 40, bottom: 40, left: 40, right: 40 },
      }}
      mapStyle={mapStyle}
      mapboxAccessToken={mapboxToken}
      style={{ width: '100%', height: '100%' }}
    >
      <style>{`
        .pulsing-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--primary));
          border: 2px solid #fff;
          box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
          }
        }
      `}</style>
      {/* <Source
        id="mapbox-dem"
        type="raster-dem"
        url="mapbox://mapbox.mapbox-terrain-dem-v1"
        tileSize={512}
        maxzoom={14}
      /> */}
      <Source data={geojson} id="route" type="geojson">
        <Layer
          id="route-layer"
          layout={{
            'line-join': 'round',
            'line-cap': 'round',
          }}
          paint={{
            'line-color': lineColor,
            'line-width': 4,
          }}
          source="route"
          type="line"
        />
      </Source>
      {directionMarkers.map(({ lng, lat, bearing }, i) => (
        <Marker key={`dir-${i}`} anchor="center" longitude={lng} latitude={lat}>
          <div
            style={{ transform: `rotate(${bearing}deg)`, backgroundColor: lineColor }}
            className="flex h-5 w-5 items-center justify-center rounded-sm opacity-80 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="h-3 w-3"
            >
              <path d="M12 2l7 18-7-5-7 5z" />
            </svg>
          </div>
        </Marker>
      ))}
      {startCoord && (
        <Marker
          anchor="center"
          latitude={startCoord[1]}
          longitude={startCoord[0]}
        >
          <div className="h-3 w-3 rounded-full border-2 border-background bg-emerald-500 shadow-md" />
        </Marker>
      )}
      {endCoord && (
        <Marker
          anchor="center"
          latitude={endCoord[1]}
          longitude={endCoord[0]}
        >
          <div className="h-3 w-3 rounded-full border-2 border-background bg-destructive shadow-md" />
        </Marker>
      )}
      {hoveredDataPoint && hoveredDataPoint.latlng && (
        <Marker
          anchor="center"
          latitude={hoveredDataPoint.latlng[0]}
          longitude={hoveredDataPoint.latlng[1]}
        >
          <div className="pulsing-dot" />
        </Marker>
      )}
      <NavigationControl position="top-right" />
    </Map>
  )
}
