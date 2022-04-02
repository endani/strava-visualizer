import moment from 'moment'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { getAthlete, setToken } from '../actions'
import ActivityDetailMap from '../components/activity-card/activity-card'
import RenderLineChart from '../components/activity-chart/activity-chart'
import Button from '../components/button/button'

const ActivitySingle = (props) => {
  const searchParams = useParams()
  const { id } = searchParams
  const [isLoading, setIsLoading] = useState(true)
  const [activity, setActivity] = useState([])
  const [activityStream, setActivityStream] = useState([])

  useEffect(() => {
    const activityFetchUrl = `https://www.strava.com/api/v3/activities/${id}`
    const activityStreamFetchUrl = `${activityFetchUrl}/streams/watts,altitude,heartrate,latlng,cadence,velocity_smooth?resolution=low`
    const fetchUrls = [activityFetchUrl, activityStreamFetchUrl]
    Promise.all(
      fetchUrls.map((url) =>
        fetch(url, {
          method: 'get',
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${props.token.access_token}`,
          },
        })
      )
    )
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(([summary, stream]) => {
        setActivity(summary)
        setActivityStream(stream)
        setIsLoading(false)
      })
  }, [id, props])

  const activityMovingTime = moment.duration(activity.moving_time, 'seconds')
  const activityMovingTimeHours = activityMovingTime.get('hours')
  const activityMovingTimeMinutes = activityMovingTime.get('minutes')
  const activityMovingTimeSeconds = activityMovingTime.get('seconds')

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="col-span-1 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-600">
        {isLoading ? (
          <h2 className="pt-8 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-200 sm:text-4xl">
            loading...
          </h2>
        ) : (
          <main className="flex-1 overflow-y-auto focus:outline-none">
            <div className="relative pt-8 pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-8 lg:px-8">
              <div className="relative max-w-7xl mx-auto">
                <Link to="/activities" key={activity.id}>
                  <Button label="← Back" />
                </Link>

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
                  <RenderLineChart data={activityStream} />
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
                      <dd className="order-1 text-2xl font-extrabold text-indigo-600 sm:text-3xl">
                        {activityMovingTimeHours}h {activityMovingTimeMinutes}m{' '}
                        {activityMovingTimeSeconds}s
                      </dd>
                    </div>
                    <div className="flex flex-col px-8 pt-8">
                      <dt className="order-2 text-base font-medium text-gray-500">
                        Calories
                      </dt>
                      <dd className="order-1 text-2xl font-extrabold text-indigo-600 sm:text-3xl">
                        {activity.calories}
                      </dd>
                    </div>
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
        )}
      </div>

      <div className="block relative h-100 w-100">
        {activity.start_latlng ? (
          <ActivityDetailMap activitySummary={activity} />
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

ActivitySingle.propTypes = {
  token: PropTypes.object,
  match: PropTypes.object,
}

const mapStateToProps = (state) => ({
  token: state.token,
})

export default connect(mapStateToProps, { setToken, getAthlete })(
  ActivitySingle
)
