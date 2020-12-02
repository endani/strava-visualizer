import React, { useEffect } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setToken } from '../actions';

import DashboardLayout from '../layouts/dashboard';

const Strava = (props) => {
  useEffect(() => {
    const { location } = props;
    const { search } = location;
    const params = queryString.parse(search);
    props.setToken(params.code);
  }, [props]);

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto focus:outline-none">
        <div className="flex items-center">
          <img
            className="hidden h-16 w-16 rounded-full sm:block"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
            alt=""
          />
          <div>
            <div className="flex items-center">
              <img
                className="h-16 w-16 rounded-full sm:hidden"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                alt=""
              />
              <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                Good morning, Emilia Birch
              </h1>
            </div>
            <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
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
                Duke street studio
              </dd>
              <dt className="sr-only">Account status</dt>
              <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                <svg
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified account
              </dd>
            </dl>
          </div>
        </div>
        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="absolute inset-0">
            <div className="bg-white h-1/3 sm:h-2/3" />
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                From the blog
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
                libero labore natus atque, ducimus sed.
              </p>
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                    alt=""
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <a href="#" className="hover:underline">
                        Article
                      </a>
                    </p>
                    <a href="#" className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        Boost your conversion rate
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Architecto accusantium praesentium eius, ut atque fuga
                        culpa, similique sequi cum eos quis dolorum.
                      </p>
                    </a>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <a href="#">
                        <span className="sr-only">Roel Aufderehar</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        <a href="#" className="hover:underline">
                          Roel Aufderehar
                        </a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime="2020-03-16">Mar 16, 2020</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>6 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                    alt=""
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <a href="#" className="hover:underline">
                        Video
                      </a>
                    </p>
                    <a href="#" className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        How to use search engine optimization to drive sales
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Velit facilis asperiores porro quaerat doloribus,
                        eveniet dolore. Adipisci tempora aut inventore optio
                        animi., tempore temporibus quo laudantium.
                      </p>
                    </a>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <a href="#">
                        <span className="sr-only">Brenna Goyette</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        <a href="#" className="hover:underline">
                          Brenna Goyette
                        </a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime="2020-03-10">Mar 10, 2020</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>4 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                    alt=""
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <a href="#" className="hover:underline">
                        Case Study
                      </a>
                    </p>
                    <a href="#" className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        Improve your customer experience
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sint harum rerum voluptatem quo recusandae magni placeat
                        saepe molestiae, sed excepturi cumque corporis
                        perferendis hic.
                      </p>
                    </a>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <a href="#">
                        <span className="sr-only">Daniela Metz</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        <a href="#" className="hover:underline">
                          Daniela Metz
                        </a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime="2020-02-12">Feb 12, 2020</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>11 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
          <div className="pt-10 pb-16">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Settings
              </h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="py-6">
                <div className="lg:hidden">
                  <select
                    id="selected-tab"
                    name="selected-tab"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                  >
                    <option selected>General</option>

                    <option>Password</option>

                    <option>Notifications</option>

                    <option>Plan</option>

                    <option>Billing</option>

                    <option>Team Members</option>
                  </select>
                </div>
                <div className="hidden lg:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex">
                      <a
                        href="#"
                        className="whitespace-nowrap py-4 px-1 border-b-2 border-purple-500 font-medium text-sm text-purple-600"
                      >
                        General
                      </a>

                      <a
                        href="#"
                        className="whitespace-nowrap ml-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      >
                        Password
                      </a>

                      <a
                        href="#"
                        className="whitespace-nowrap ml-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      >
                        Notifications
                      </a>

                      <a
                        href="#"
                        className="whitespace-nowrap ml-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      >
                        Plan
                      </a>

                      <a
                        href="#"
                        className="whitespace-nowrap ml-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      >
                        Billing
                      </a>

                      <a
                        href="#"
                        className="whitespace-nowrap ml-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      >
                        Team Members
                      </a>
                    </nav>
                  </div>
                </div>

                <div className="mt-10 divide-y divide-gray-200">
                  <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Profile
                    </h3>
                    <p className="max-w-2xl text-sm text-gray-500">
                      This information will be displayed publicly so be careful
                      what you share.
                    </p>
                  </div>
                  <div className="mt-6">
                    <dl className="divide-y divide-gray-200">
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">
                          Name
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span className="flex-grow">Chelsea Hagon</span>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              Update
                            </button>
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                        <dt className="text-sm font-medium text-gray-500">
                          Photo
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span className="flex-grow">
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </span>
                          <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                            <button
                              type="button"
                              className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              Update
                            </button>
                            <span className="text-gray-300" aria-hidden="true">
                              |
                            </span>
                            <button
                              type="button"
                              className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              Remove
                            </button>
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                        <dt className="text-sm font-medium text-gray-500">
                          Email
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span className="flex-grow">
                            chelsea.hagon@example.com
                          </span>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              Update
                            </button>
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                        <dt className="text-sm font-medium text-gray-500">
                          Job title
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span className="flex-grow">
                            Human Resources Manager
                          </span>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              Update
                            </button>
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="mt-10 divide-y divide-gray-200">
                  <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Account
                    </h3>
                    <p className="max-w-2xl text-sm text-gray-500">
                      Manage how information is displayed on your account.
                    </p>
                  </div>
                  <div className="mt-6">
                    <dl className="divide-y divide-gray-200">
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">
                          Language
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span className="flex-grow">English</span>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              Update
                            </button>
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                        <dt className="text-sm font-medium text-gray-500">
                          Date format
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span className="flex-grow">DD-MM-YYYY</span>
                          <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                            <button
                              type="button"
                              className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              Update
                            </button>
                            <span className="text-gray-300" aria-hidden="true">
                              |
                            </span>
                            <button
                              type="button"
                              className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              Remove
                            </button>
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                        <dt
                          id="timezone-option-label"
                          className="text-sm font-medium text-gray-500"
                        >
                          Automatic timezone
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <button
                            type="button"
                            aria-pressed="true"
                            aria-labelledby="timezone-option-label"
                            className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto"
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                            />
                          </button>
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                        <dt
                          id="auto-update-option-label"
                          className="text-sm font-medium text-gray-500"
                        >
                          Auto-update applicant data
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <button
                            type="button"
                            aria-pressed="false"
                            aria-labelledby="auto-update-option-label"
                            className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto"
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                            />
                          </button>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

Strava.propTypes = {
  location: PropTypes.object,
  setToken: PropTypes.func,
};

export default connect(null, { setToken })(Strava);
