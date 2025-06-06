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
