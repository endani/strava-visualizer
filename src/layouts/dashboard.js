import React from 'react';
import PropTypes from 'prop-types';
import SideMenu from '../components/sidemenu';
import TopMenu from '../components/topmenu';

const Dashboard = ({ children }) => (
  <div className="h-screen overflow-hidden flex">
    <SideMenu />
    <div className="flex-1 flex flex-col">
      {/* <TopMenu /> */}
      {children}
    </div>
  </div>
);

Dashboard.propTypes = {
  children: PropTypes.object,
};

export default Dashboard;
