import React from 'react';
import mapboxgl from 'mapbox-gl';
import polyline from '@mapbox/polyline';
import useMedia from 'use-media';

import PropTypes from 'prop-types';

const latLngCircleSize = 10;
const latLngCircleOpacity = 1;
const style = {
  top: 0,
  bottom: 0,
  width: '100%',
  position: 'absolute',
};

const ActivityDetailMap = (props) => {
  const mapContainer = React.useRef(null);
  const [map, setMap] = React.useState(null);
  const mediaDarkMode = useMedia('(prefers-color-scheme: dark)');

  const decodedPolyline = polyline.toGeoJSON(
    props.activitySummary.map.polyline
  );
  const decodedPolylineCoordinates = decodedPolyline.coordinates;

  mapboxgl.accessToken =
    'pk.eyJ1IjoicDBwbWFrZXIiLCJhIjoiY2lzOXliOGlrMDA2ODJ5bzJ4YjNnb29qdSJ9.hf19Sca7oYCcR8kRlx07Rw';

  React.useEffect(() => {
    const { mediaDarkMode } = props;
    let mapTheme;

    if (!mediaDarkMode) {
      mapTheme = 'mapbox://styles/mapbox/dark-v10';
    } else {
      mapTheme = 'mapbox://styles/p0pmaker/cjrf0kzjd4xde2tqwor6ltd0u';
    }

    let map;

    const initializeMap = () => {
      map = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapTheme,
        center: [
          props.activitySummary.start_latlng[1],
          props.activitySummary.start_latlng[0],
        ],
        zoom: 10,
      });

      map.on('load', async () => {
        setMap(map);
        map.resize();

        map.addLayer({
          id: 'start',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {
                description: 'Activitiy Start',
              },
              geometry: {
                type: 'Point',
                coordinates: decodedPolylineCoordinates[0],
              },
            },
          },
          paint: {
            'circle-color': '#f03434',
            'circle-radius': latLngCircleSize,
            'circle-opacity': latLngCircleOpacity,
          },
        });

        map.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {
                description: 'Activitiy End',
              },
              geometry: {
                type: 'Point',
                coordinates: decodedPolylineCoordinates.pop(),
              },
            },
          },
          paint: {
            'circle-color': '#479C1F',
            'circle-radius': latLngCircleSize,
            'circle-opacity': latLngCircleOpacity,
          },
        });

        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: decodedPolylineCoordinates,
              },
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#0a67f2',
            'line-width': 2,
          },
        });

        // Geographic coordinates of the LineString
        const coordinates = decodedPolylineCoordinates;
        // Pass the first coordinates in the LineString to `lngLatBounds` &
        // wrap each coordinate pair in `extend` to include them in the bounds
        // result. A variation of this technique could be applied to zooming
        // to the bounds of multiple Points or Polygon geomteries - it just
        // requires wrapping all the coordinates with the extend method.

        const bounds = coordinates.reduce(function (bounds, coord) {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map.fitBounds(bounds, { padding: 80 });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, []);

  return <div style={style} ref={(el) => (mapContainer.current = el)} />;
};

ActivityDetailMap.propTypes = {
  activitySummary: PropTypes.object,
  mediaDarkMode: PropTypes.bool,
};

export default ActivityDetailMap;
