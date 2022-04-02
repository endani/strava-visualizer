import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const SideMenu = (props) => {
  const { user } = props
  if (!user) {
    return null
  }
  return (
    <div className="w-90 flex-col hidden sm:flex">
      <nav className="bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-600 pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
        <div className="flex-grow mt-5 flex flex-col">
          <div className="flex-1 space-y-1">
            <div className="mx-auto sm:px-6 lg:pt-8 lg:pb-8 lg:px-8">
              <img
                className="hidden h-32 w-32 rounded-full sm:block m-auto"
                src={user.profile}
                alt=""
              />
              <div className="flex items-center">
                <h4 className="m-auto mt-5 text-2xl font-bold leading-7 text-gray-900 dark:text-gray-200 sm:leading-9 sm:truncate">
                  {user.firstname} {user.lastname}
                </h4>
              </div>
              <dl className="mt-10 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                <dt className="sr-only">Company</dt>
                <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {user.city}
                </dd>
                <dt className="sr-only">Account status</dt>
                <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="orange"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Premium
                </dd>
              </dl>
            </div>

            <dl className="rounded-lg sm:grid sm:grid-cols-2">
              <div className="flex flex-col border-b border-gray-100 p-6 plr-10 text-center sm:border-0 sm:border-r dark:border-gray-600">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                  Following
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-indigo-600 dark:text-gray-200">
                  {user.friend_count}
                </dd>
              </div>
              <div className="flex flex-col border-t border-b border-gray-100 p-6 plr-10 text-center sm:border-0 ">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                  Followers
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-indigo-600 dark:text-gray-200">
                  {user.follower_count}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </nav>
    </div>
  )
}

SideMenu.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(SideMenu)
