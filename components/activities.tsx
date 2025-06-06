'use client'

import Head from 'next/head'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { ActivityCardSkeleton } from './activity-card-skeleton'

import { ActivityCard } from '@/components/activity-card'
import { useActivities } from '@/contexts/activities-provider'
import { Activity } from '@/types'

const PageHead = () => (
  <Head>
    <title>Activities</title>
    <meta
      content="Get the most out of your Strava data with Strava Visualizer."
      name="description"
    />
  </Head>
)

const PageTitle = ({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) => (
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
      {title}
    </h2>
    <p className="text-muted-foreground mt-2 text-lg leading-8">{subtitle}</p>
  </div>
)

export const Activities = () => {
  const {
    activities,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    scrollPosition,
    setScrollPosition,
  } = useActivities()

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
    rootMargin: '200px 0px',
  })

  useEffect(() => {
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition)
    }
  }, [scrollPosition])

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [setScrollPosition])

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return (
      <main>
        <PageHead />
        <div className="py-16">
          <PageTitle
            subtitle="Fetching your latest activities from Strava..."
            title="Activities"
          />

          <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 text-center sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ActivityCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main>
        <PageHead />
        <div className="py-16">
          <PageTitle subtitle="Could not load activities." title="Error" />
        </div>
      </main>
    )
  }

  return (
    <>
      <PageHead />
      <main>
        <div className="py-16">
          <PageTitle
            subtitle="Here are the last activities from your Strava account."
            title="Activities"
          />

          <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 text-center sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {activities.map((activity: Activity, index) => (
              <ActivityCard
                key={activity.id}
                ref={index === activities.length - 1 ? ref : null}
                activity={activity}
                href={`/activities/${activity.id}`}
              />
            ))}
            {isFetchingNextPage &&
              Array.from({ length: 3 }).map((_, i) => (
                <ActivityCardSkeleton key={`skeleton-${i}`} />
              ))}
          </div>

          {!hasNextPage && !isFetchingNextPage && (
            <p className="mt-6 text-center">No more activities to load.</p>
          )}
        </div>
      </main>
    </>
  )
}
