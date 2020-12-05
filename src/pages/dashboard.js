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
import ActivityMap from '../components/map';

let activitiesFetchUrl;

const Dashboard = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [activities, setActivities] = React.useState([]);
  const [page, setPage] = React.useState('');
  const [nextPageUrl, setNextPageUrl] = React.useState('');
  const [previousPageUrl, setPreviousPageUrl] = React.useState('');
  const [isFirstPage, setIsFirstPage] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    const { location } = props;
    const { search } = location;
    const params = queryString.parse(search);

    const getToken = async (code) => {
      await props.setToken(code);
      await props.getAthlete(props.token.access_token);
    };

    getToken(params.code);
    if (page) {
      activitiesFetchUrl = `https://www.strava.com/api/v3/athlete/activities?per_page=30&page=${page}`;
      setNextPageUrl(`/activities?page=${Number(page) + 1}`);
      setIsFirstPage(false);

      if (page >= 2) {
        setPreviousPageUrl(`/activities?page=${Number(page) - 1}`);
      } else if (page === 1) {
        setPreviousPageUrl('/activities');
        setIsFirstPage(true);
      }
    } else {
      activitiesFetchUrl =
        'https://www.strava.com/api/v3/athlete/activities?per_page=30&page=1';

      setNextPageUrl(`/activities?page=${2}`);
      setIsFirstPage(true);
    }

    fetch(activitiesFetchUrl, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${props.token.access_token}`,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then((json) => {
        setActivities(json);
        setLoading(false);
      });
  }, [props, page]);

  const Card = styled(motion.div)``;

  const parentVariants = {
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
    hide: {
      opacity: 0,
    },
  };

  const childrenVariants = {
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { type: 'spring', stiffness: 800, damping: 40 },
    },
    hide: { y: 70, opacity: 0, scale: 0.9, rotateX: -45 },
  };

  const renderActivities = activities.map((item) => (
    <Link to={`/dashboard/${item.id}`} key={item.id}>
      <div className="flex flex-col rounded-lg shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
        <dl className="rounded-lg grid grid-cols-2">
          <div className="flex flex-col">
            <ActivityMap
              type={item.start_latlng ? 'map' : 'nomap'}
              polyline={item.map.summary_polyline}
            />
          </div>
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-200">
                {item.type}
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                {item.name}
              </p>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex space-x-1 text-sm text-gray-500">
                <time dateTime="2020-03-16">
                  <Moment
                    format="ddd, Do MMM YYYY"
                    date={item.start_date_local}
                  />
                </time>
              </div>
            </div>
          </div>
        </dl>
      </div>
    </Link>
  ));

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto focus:outline-none">
        <div className="relative bg-white dark:bg-gray-800 pt-8 pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-8 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <div className="relative mt-10 px-4 sm:px-6 lg:pt-8 lg:pb-8 lg:px-8 ">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-200 sm:text-4xl">
                Latest Activities
              </h2>
              <div className="mt-12 max-w-xl mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 xl:max-w-none">
                {activities ? (
                  renderActivities
                ) : (
                  <div className="rounded-lg shadow-lg bg-white dark:bg-gray-900 overflow-hidden w-full mx-auto">
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-light-blue-400 h-12 w-12" />
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-light-blue-400 rounded w-3/4" />
                        <div className="space-y-2">
                          <div className="h-4 bg-light-blue-400 rounded" />
                          <div className="h-4 bg-light-blue-400 rounded w-5/6" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-5 flex-1 flex justify-between sm:justify-end">
                <a className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </a>
                <a className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

Dashboard.propTypes = {
  token: PropTypes.object,
  location: PropTypes.object,
  setToken: PropTypes.func,
  getAthlete: PropTypes.func,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps, { setToken, getAthlete })(Dashboard);
