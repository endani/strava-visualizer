'use client'

import Head from 'next/head'
import { Spinner, button as buttonStyles } from '@nextui-org/react'
import NextLink from 'next/link'
import clsx from 'clsx'

import { ActivityChart, ActivitySingleCard, Navbar } from '@/components'
import { secondsToTime } from '@/utils'
import { useGetActivity, useGetActivityStream } from '@/api'
import { subtitle, title } from '@/config/primitives'

export const getServerSideProps = async ({ params }) => {
  const { id } = params

  return {
    props: {
      id,
    },
  }
}

export default function SingleActivity({ id }) {
  const { data: activity, isLoading: isActivityLoading } = useGetActivity(id)
  const { data: activityStream, isLoading: isActivityStreamLoading } =
    useGetActivityStream(id)

  if (isActivityLoading || isActivityStreamLoading)
    return (
      <div className="mx-auto text-center mt-16">
        <Spinner color="default" size="sm" />
      </div>
    )

  return (
    <>
      <Head>
        <title>{activity?.name}</title>
      </Head>

      <main>
        <div className="grid min-h-screen grid-cols-2">
          <div>
            <Navbar />
            <div className="flex-1 overflow-y-auto focus:outline-none">
              <div className="relative px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-8 lg:pt-8">
                <NextLink
                  className={clsx(
                    buttonStyles({
                      color: 'primary',
                    }),
                    'mb-4',
                  )}
                  href="/"
                >
                  ← Back
                </NextLink>

                <div className="relative mx-auto max-w-7xl ">
                  <h2
                    className={`text-3xl font-bold tracking-tight sm:text-4xl ${title()}`}
                  >
                    {activity?.name}
                  </h2>

                  <div className="mt-3 flex space-x-1 text-sm text-gray-500">
                    <time dateTime={activity.start_date_local}>
                      {activity.start_date_local}
                    </time>
                  </div>
                  <div className="mt-8 overflow-hidden">
                    <dl className={`-mx-8 -mt-8 flex flex-wrap ${subtitle()}`}>
                      <div className="flex flex-col px-8 pt-8">
                        <dt className="order-2 text-base font-medium">
                          Distance
                        </dt>
                        <dd className="order-1 text-2xl font-extrabold  sm:text-3xl">
                          {(activity?.distance / 1000).toFixed(1)}
                        </dd>
                      </div>
                      <div className="flex flex-col px-8 pt-8">
                        <dt className="order-2 text-base font-medium">
                          Elevation
                        </dt>
                        <dd className="order-1 text-2xl font-extrabold  sm:text-3xl">
                          {activity?.total_elevation_gain} m
                        </dd>
                      </div>
                      <div className="flex flex-col px-8 pt-8">
                        <dt className="order-2 text-base font-medium">
                          Duration
                        </dt>
                        <dd className="order-1 text-2xl font-extrabold  sm:text-3xl">
                          {secondsToTime(activity?.moving_time)}
                        </dd>
                      </div>
                      <div className="flex flex-col px-8 pt-8">
                        <dt className="order-2 text-base font-medium">
                          Calories
                        </dt>
                        <dd className="order-1 text-2xl font-extrabold  sm:text-3xl">
                          {activity?.calories}
                        </dd>
                      </div>
                      <div className="flex flex-col px-8 pt-8">
                        <dt className="order-2 text-base font-medium">Kudos</dt>
                        <dd className="order-1 text-2xl font-extrabold  sm:text-3xl">
                          {activity?.kudos_count}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-3 flex space-x-1 text-sm text-gray-500">
                    <ActivityChart data={activityStream} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-100 w-100 relative block">
            {activity?.start_latlng && (
              <ActivitySingleCard activitySummary={activity} />
            )}
          </div>
        </div>
      </main>
    </>
  )
}
