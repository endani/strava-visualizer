import PropTypes from 'prop-types'
import React from 'react'

export const LoginLayout = ({ children }) => (
  <div className="min-h-screen bg-white flex">
    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      {children}
    </div>
    <div className="hidden lg:block relative w-0 flex-1">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1591211022816-c59c8e0dbd60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
        alt=""
      />
    </div>
  </div>
)

LoginLayout.propTypes = {
  children: PropTypes.object,
}
