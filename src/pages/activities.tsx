import React from 'react'

import { ActivityCard } from '../components/activity-card/activity-card'
import { useGetActivities } from '../api/api'

import { ActivitiesLayout } from './layouts/activities'

const Activities = () => {
  const { data: activities } = useGetActivities()

  if (!activities) return <h3 className="text-white">No activities found</h3>

  return (
    <ActivitiesLayout>
      <main className="flex-1 flex-col flex overflow-y-auto focus:outline-none bg-white dark:bg-gray-800">
        <div className="pt-8 pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-8 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <div className="relative mt-10 px-4 sm:px-6 lg:pt-8 lg:pb-8 lg:px-8 ">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-200 sm:text-4xl">
                Latest Activities
              </h2>
              <div className="mt-12 max-w-xl mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 xl:max-w-none">
                {activities.map((item: any) => (
                  <ActivityCard activity={item} key={item.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </ActivitiesLayout>
  )
}

export { Activities }
