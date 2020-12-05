// eslint-disable jsx-props-no-spreading
import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from 'recharts';
import _ from 'lodash';
import useMedia from 'use-media';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

const ChartContainer = styled.div`
  padding: 10;
  margin: 20 0;
  width: 100%;
  position: relative;
`;

const displayActivityDistanceUnit = 'km';

const Tick = ({
  payload: { value },
  verticalAnchor,
  visibleTicksCount,
  ...rest
}) => (
  <text style={{ fontSize: '12px' }} {...rest} dy={16}>
    {value} {displayActivityDistanceUnit}
  </text>
);

Tick.propTypes = {
  payload: PropTypes.object,
  verticalAnchor: PropTypes.any,
  visibleTicksCount: PropTypes.any,
};

const CustomTooltipStyled = styled.div`
  background: #1f2937;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  border-radius: 12px;

  p {
    margin: 0;
  }
`;

const RenderLineChart = (props) => {
  const mediaDarkMode = useMedia('(prefers-color-scheme: dark)');
  const originalArray = props.data;

  const [showHeartrate, setShowHeartrate] = React.useState(true);

  const displayActivityDistanceUnit = 'km';

  const displayActivityTotalElevationGainUnit = 'm';

  const displaySpeedUnit = 'kph';

  // distance

  const distance = originalArray.filter((item) =>
    item.type.includes('distance')
  );
  const distanceStream = distance[0].data;
  const distanceInKm = distanceStream.map((item) => _.round(item / 1000, 2));

  const displayDistance = distanceInKm;

  // Altitude
  let altitudeStream = [];
  const altitude = originalArray.filter((item) =>
    item.type.includes('altitude')
  );
  if (altitude.length > 0) {
    altitudeStream = altitude[0].data;
  }

  // heartrate
  let heartrateStream = [];
  const heartrate = originalArray.filter((item) =>
    item.type.includes('heartrate')
  );
  if (heartrate.length > 0) {
    heartrateStream = heartrate[0].data;
  }

  // speed
  let speedStream = [];
  const speed = originalArray.filter((item) =>
    item.type.includes('velocity_smooth')
  );

  if (speed.length > 0) {
    speedStream = speed[0].data;
  }

  // Unit conversion function
  function toKPH(m) {
    const toKM = m / 1000;
    const toKPH = toKM * 60 * 60;

    return _.round(toKPH, 3);
  }

  const speedKPH = _.map(speedStream, toKPH);
  const displaySpeed = speedKPH;
  const formattedData = displayDistance.map((distance, index) => ({
    distance,
    altitude: altitudeStream[index],
    heartrate: heartrateStream[index],
    speed: displaySpeed[index],
  }));

  const CustomTooltip = (props) => {
    const { payload, label, active } = props;

    const items = payload.map((item) => (
      <p style={{ color: item.stroke }} key={item.name}>
        {item.name}: {item.value} {item.unit}
      </p>
    ));

    if (active) {
      return (
        <CustomTooltipStyled>
          <p style={{ opacity: 0.5 }}>
            distance: {label} {displayActivityDistanceUnit}
          </p>
          {items}
        </CustomTooltipStyled>
      );
    }
    return <div />;
  };

  CustomTooltip.propTypes = {
    payload: PropTypes.any,
    label: PropTypes.any,
    active: PropTypes.bool,
  };

  return (
    <ChartContainer>
      <ResponsiveContainer width="99%" height={200}>
        <ComposedChart data={formattedData}>
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid />
          <XAxis
            tick={<Tick />}
            type="number"
            domain={[0, 'dataMax']}
            interval="Number"
            allowDecimals
            dataKey="distance"
            minTickGap={20}
          />
          <YAxis
            tick={<Tick />}
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
  );
};

RenderLineChart.propTypes = {
  data: PropTypes.any,
};

export default RenderLineChart;
