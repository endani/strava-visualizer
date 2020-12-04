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

const ChartContainer = styled.div`
  padding: 10;
  margin: 20 0;
  width: 100%;
  position: relative;
`;

let displayActivityDistanceUnit;

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

const CustomTooltipStyled = styled.div`
  background: ${(props) => props.theme.colors.cardBackground}};
  padding: ${(props) => props.theme.tokens.spacing.S.value}
    ${(props) => props.theme.tokens.spacing.M.value};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  border-radius: ${(props) => props.theme.tokens.borderRadius.value};

  p {
    margin: 0;
  }
`;

const RenderLineChart = (props) => {
  const mediaDarkMode = useMedia('(prefers-color-scheme: dark)');
  const originalArray = props.data;
  console.log(originalArray);
  const [showHeartrate, setShowHeartrate] = React.useState(true);

  const { user } = useAuthState();

  displayActivityDistanceUnit =
    user.measurement_preference == 'meters' ? 'km' : 'mi';

  const displayActivityTotalElevationGainUnit =
    user.measurement_preference == 'meters' ? 'm' : 'ft';

  const displaySpeedUnit =
    user.measurement_preference == 'meters' ? 'kph' : 'mph';

  // distance
  const distance = originalArray.filter((item) =>
    item.type.includes('distance')
  );
  const distanceStream = distance[0].data;
  const distanceInKm = distanceStream.map((item) => _.round(item / 1000, 2));
  const distanceInMi = _.map(distanceInKm, kmToMiles);

  const displayDistance =
    user.measurement_preference == 'meters' ? distanceInKm : distanceInMi;

  console.log(displayDistance, distanceStream);

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

  function KPHtoMPH(kph) {
    const mph = kph * 0.621371;

    return _.round(mph, 3);
  }

  function kmToMiles(km) {
    const mi = km * 0.621371;

    return _.round(mi, 3);
  }

  const speedKPH = _.map(speedStream, toKPH);
  const speedMPH = _.map(speedKPH, KPHtoMPH);

  const displaySpeed =
    user.measurement_preference == 'meters' ? speedKPH : speedMPH;

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
            Distance: {label} {displayActivityDistanceUnit}
          </p>
          {items}
        </CustomTooltipStyled>
      );
    }
    return <div />;
  };

  console.log(formattedData);

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

export default RenderLineChart;
