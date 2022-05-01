import moment from 'moment'
import Moment from 'react-moment'
import { Link, useParams } from 'react-router-dom'
import React from 'react'

import { RenderLineChart } from '../components/activity-chart/activity-chart'
import ActivitySingleCard from '../components/activity-single-card/activity-single-card'
import { Button } from '../components/button/button'
import { useGetActivity, useGetActivityStream } from '../api/api'

const ActivitySingle = () => {
  const searchParams = useParams()
  const { id } = searchParams

  const { data: activity, isLoading: isLoadingActivity } = useGetActivity(id)

  const { data: stream, isLoading: isLoadingStream } = useGetActivityStream(id)

  console.log(activity, isLoadingActivity)
  console.log(stream, isLoadingStream)

  if (isLoadingActivity || isLoadingStream) return null

  // const activityMovingTime = moment.duration(activity.moving_time, 'seconds')
  // const activityMovingTimeHours = activityMovingTime.get('hours')
  // const activityMovingTimeMinutes = activityMovingTime.get('minutes')
  // const activityMovingTimeSeconds = activityMovingTime.get('seconds')

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="col-span-1 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-600">
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="relative pt-8 pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-8 lg:px-8">
            <div className="relative max-w-7xl mx-auto">
              {
                <Link to="/activities" key={activity.id}>
                  <Button label="← Back" />
                </Link>
              }

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
              <div className="flex space-x-1 text-sm text-gray-500 mt-3">
                <RenderLineChart data={stream} />
              </div>
              <div className="mt-8 overflow-hidden">
                <dl className="-mx-8 -mt-8 flex flex-wrap">
                  <div className="flex flex-col px-8 pt-8">
                    <dt className="order-2 text-base font-medium text-gray-500">
                      Distance
                    </dt>
                    <dd className="order-1 text-2xl font-extrabold text-indigo-600 sm:text-3xl">
                      {(activity.distance / 1000).toFixed(1)}
                    </dd>
                  </div>
                  <div className="flex flex-col px-8 pt-8">
                    <dt className="order-2 text-base font-medium text-gray-500">
                      Elevation
                    </dt>
                    <dd className="order-1 text-2xl font-extrabold text-indigo-600 sm:text-3xl">
                      {activity.total_elevation_gain} m
                    </dd>
                  </div>
                  <div className="flex flex-col px-8 pt-8">
                    <dt className="order-2 text-base font-medium text-gray-500">
                      Duration
                    </dt>
                    {/* <dd className="order-1 text-2xl font-extrabold text-indigo-600 sm:text-3xl">
                      {activityMovingTimeHours}h {activityMovingTimeMinutes}m{' '}
                      {activityMovingTimeSeconds}s
                    </dd> */}
                  </div>
                  {/* <div className="flex flex-col px-8 pt-8">
                    <dt className="order-2 text-base font-medium text-gray-500">
                      Calories
                    </dt>
                    <dd className="order-1 text-2xl font-extrabold text-indigo-600 sm:text-3xl">
                      {activity.calories}
                    </dd>
                  </div> */}
                  <div className="flex flex-col px-8 pt-8">
                    <dt className="order-2 text-base font-medium text-gray-500">
                      Kudos
                    </dt>
                    <dd className="order-1 text-2xl font-extrabold text-indigo-600 sm:text-3xl">
                      {activity.kudos_count}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="block relative h-100 w-100">
        {activity.start_latlng ? (
          <ActivitySingleCard activitySummary={activity} />
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

export { ActivitySingle }
