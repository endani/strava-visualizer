import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import ActivityMap from '../map/map'

const ActivityCard = ({ activity }: { activity: any }) => (
  <Link to={`/activities/${activity.id}`} key={activity.id}>
    <div className="flex flex-col rounded-lg shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
      <dl className="rounded-lg grid grid-cols-2">
        <div className="flex flex-col">
          <ActivityMap
            type={activity.start_latlng ? 'map' : 'nomap'}
            polyline={activity.map.summary_polyline}
          />
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-200">
              {activity.type}
            </p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-200">
              {activity.name}
            </p>
          </div>
          <div className="mt-6 flex items-center">
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime="2020-03-16">
                <Moment
                  format="ddd, Do MMM YYYY"
                  date={activity.start_date_local}
                />
              </time>
            </div>
          </div>
        </div>
      </dl>
    </div>
  </Link>
)

export { ActivityCard }
