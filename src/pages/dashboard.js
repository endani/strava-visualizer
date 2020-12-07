import React, { useEffect } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import { setToken, getAthlete } from '../actions';

import DashboardLayout from '../layouts/dashboard';
import ActivityMap from '../components/map';
import Skeleton from '../components/skeleton';

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

  let renderActivities;
  if (activities.length > 0) {
    renderActivities = activities.map((item) => (
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
  } else {
    renderActivities = <h3 className="text-white">No activities found</h3>;
  }

  const Pagination = () => (
    <div className="mt-5 flex-1 flex justify-between sm:justify-end">
      <a className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Previous
      </a>
      <a className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Next
      </a>
    </div>
  );

  return (
    <DashboardLayout>
      <main className="flex-1 flex-col flex overflow-y-auto focus:outline-none bg-white dark:bg-gray-800">
        <div className="pt-8 pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-8 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <div className="relative mt-10 px-4 sm:px-6 lg:pt-8 lg:pb-8 lg:px-8 ">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-200 sm:text-4xl">
                Latest Activities
              </h2>
              <div className="mt-12 max-w-xl mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 xl:max-w-none">
                {!loading ? renderActivities : <Skeleton />}
              </div>
              <Pagination />
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
