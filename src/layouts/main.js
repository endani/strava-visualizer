import React from 'react';

const Main = ({ children }) => (
  <div className="relative bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto">{children}</div>
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
        src="https://images.unsplash.com/photo-1591211022816-c59c8e0dbd60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
        alt=""
      />
    </div>
  </div>
);

Main.propTypes = {
  children: Object,
};

export default Main;
