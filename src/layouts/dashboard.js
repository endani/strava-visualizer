import React from 'react';
import SideMenu from '../components/sidemenu';
import TopMenu from '../components/topmenu';

const Dashboard = ({ children }) => (
  <div className="h-screen bg-white overflow-hidden flex">
    <SideMenu />
    <div className="flex-1 flex flex-col">
      <TopMenu />
      {children}
    </div>
  </div>
);

Dashboard.propTypes = {
  children: Object,
};

export default Dashboard;
