import React, { useEffect } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { setToken, getAthlete } from '../actions';

import DashboardLayout from '../layouts/dashboard';
import ActivityDetailMap from '../components/activityDetailMap';
import RenderLineChart from '../components/activityCharts';

import Button from '../components/button';

const Single = (props) => {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [loading, setLoading] = React.useState(true);
  const [activity, setActivity] = React.useState([]);
  const [activityStream, setActivityStream] = React.useState([]);

  React.useEffect(() => {
    const activityFetchUrl = `https://www.strava.com/api/v3/activities/${id}`;
    const activityStreamFetchUrl = `${activityFetchUrl}/streams/watts,altitude,heartrate,latlng,cadence,velocity_smooth?resolution=low`;
    const fetchUrls = [activityFetchUrl, activityStreamFetchUrl];
    Promise.all(
      fetchUrls.map((url) =>
        fetch(url, {
          method: 'get',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${props.token.access_token}`,
          },
        })
      )
    )
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(([summary, stream]) => {
        setActivity(summary);
        setActivityStream(stream);
        setLoading(false);
      });
  }, [props]);

  if (!activity) {
    return null;
  }

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="col-span-1 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-600">
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="relative pt-8 pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-8 lg:px-8">
            <div className="relative max-w-7xl mx-auto">
              <div className="relative mt-10 px-4 sm:px-6 lg:pt-8 lg:pb-8 lg:px-8 ">
                <Button label="← Back" />

                <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-200 sm:text-4xl">
                  {activity.name}
                </h2>

                <div className="flex space-x-1 text-sm text-gray-500 mt-3">
                  <time dateTime="2020-03-16">
                    <Moment
                      format="ddd, Do MMM YYYY"
                      date={activity.start_date_local}
                    />
                  </time>
                </div>

                <RenderLineChart data={activityStream} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="block relative w-100">
        {activity.start_latlng ? (
          <ActivityDetailMap activitySummary={activity} />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

Single.propTypes = {
  token: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps, { setToken, getAthlete })(Single);
