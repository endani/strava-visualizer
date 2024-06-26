import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Spinner } from '@nextui-org/spinner'

import { ActivityCard } from '@/components'
import { useGetActivities } from '@/api'
import { subtitle, title } from '@/config/primitives'

const Activities = () => {
  const { data: activities, isLoading } = useGetActivities()

  if (isLoading)
    return (
      <div className="mx-auto text-center mt-16">
        <Spinner color="default" size="sm" />
      </div>
    )

  return (
    <>
      <Head>
        <title>Activities</title>
        <meta
          content="Get the most out of your Strava data with Strava Visualizer."
          name="description"
        />
      </Head>
      <main>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2
                className={`text-3xl font-bold tracking-tight sm:text-4xl ${title()}`}
              >
                Activities
              </h2>
              <p className={`mt-2 text-lg leading-8 ${subtitle()}`}>
                Here are the last activities from your Strava account.
              </p>
            </div>

            <div className="mx-auto text-center mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {activities.map((activity: any) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  href={`/activities/${activity.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export { Activities }
