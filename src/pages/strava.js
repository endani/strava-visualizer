import React, { useEffect } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setToken } from '../actions';

const Strava = (props) => {
  useEffect(() => {
    const { location } = props;
    const { search } = location;
    const params = queryString.parse(search);
    props.setToken(params.code);
  }, [props]);

  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <button
          type="button"
          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
          disabled
        >
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" />
          Processing
        </button>
      </div>
    </main>
  );
};

Strava.propTypes = {
  location: PropTypes.object,
  setToken: PropTypes.func,
};

export default connect(null, { setToken })(Strava);
