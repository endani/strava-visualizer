'use client'

import Head from 'next/head'
import { useParams, useSearchParams } from 'next/navigation'
import { Spinner, button as buttonStyles } from '@nextui-org/react'
import NextLink from 'next/link'
import clsx from 'clsx'

import { ActivitySingleCard } from '@/components'
import { secondsToTime } from '@/utils'
import { useGetActivity, useGetActivityStream } from '@/api'

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
        <title>Activity</title>
        <meta
          content="Get the most out of your Strava data with Strava Visualizer."
          name="description"
        />
      </Head>
      <main>
        <div className="grid min-h-screen grid-cols-2">
          <div className="col-span-1 border-r border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-900">
            <main className="flex-1 overflow-y-auto focus:outline-none">
              <div className="relative px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-8 lg:pt-8">
                <div className="relative mx-auto max-w-7xl">
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

                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
                    {activity?.name}
                  </h2>

                  <div className="mt-3 flex space-x-1 text-sm text-gray-500">
                    <time dateTime="2020-03-16">
                      {/* <Moment
                        format="ddd, Do MMM YYYY"
                        date={activity.start_date_local}
                      /> */}
                    </time>
                  </div>
                  <div className="mt-3 flex space-x-1 text-sm text-gray-500">
                    {/* <ActivityChart data={activityStream} /> */}
                  </div>
                  <div className="mt-8 overflow-hidden">
                    <dl className="-mx-8 -mt-8 flex flex-wrap">
                      <div className="flex flex-col px-8 pt-8">
                        <dt className="order-2 text-base font-medium text-gray-500">
                          Distance
                        </dt>
                        <dd className="order-1 text-2xl font-extrabold text-indigo-600 sm:text-3xl">
                          {(activity?.distance / 1000).toFixed(1)}
                        </dd>
                      </div>
                      <div className="flex flex-col px-8 pt-8">
                        <dt className="order-2 text-base font-medium text-gray-500">
                          Elevation
                        </dt>
                        <dd className="order-1 text-2xl font-extrabold text-indigo-600 sm:text-3xl">
                          {activity?.total_elevation_gain} m
                        </dd>
                      </div>
                      <div className="flex flex-col px-8 pt-8">
                        <dt className="order-2 text-base font-medium text-gray-500">
                          Duration
                        </dt>
                        <dd className="order-1 text-2xl font-extrabold text-indigo-600 sm:text-3xl">
                          {secondsToTime(activity?.moving_time)}
                        </dd>
                      </div>
                      <div className="flex flex-col px-8 pt-8">
                        <dt className="order-2 text-base font-medium text-gray-500">
                          Calories
                        </dt>
                        <dd className="order-1 text-2xl font-extrabold text-indigo-600 sm:text-3xl">
                          {activity?.calories}
                        </dd>
                      </div>
                      <div className="flex flex-col px-8 pt-8">
                        <dt className="order-2 text-base font-medium text-gray-500">
                          Kudos
                        </dt>
                        <dd className="order-1 text-2xl font-extrabold text-indigo-600 sm:text-3xl">
                          {activity?.kudos_count}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </main>
          </div>

          <div className="h-100 w-100 relative block">
            {activity?.start_latlng ? (
              <ActivitySingleCard activitySummary={activity} />
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </>
  )
}
