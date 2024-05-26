import Head from 'next/head'

import { Activity } from '@/types'

const filterActivities = (activities: Activity[]) =>
  activities.filter(
    (activity: Activity) =>
      activity.distance && ['Run', 'Ride', 'Workout'].includes(activity.type),
  )

const Activities = () => {
  // const activitiesFromStrava = getActivities()

  // const [activities, setActivities] = useState<Activity[]>(activitiesFromStrava)

  // useEffect(() => {
  //   setActivities(activitiesFromStrava)
  // }, [activitiesFromStrava])

  // const handleFilter = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = event.target

  //   if (isEmpty(value)) {
  //     setActivities(filterActivities(activitiesFromStrava))
  //     return
  //   }

  //   const filteredActivities: Activity[] = activities.filter(
  //     (activity: Activity) =>
  //       activity.name.toLowerCase().includes(value.toLowerCase()) ||
  //       activity.distance
  //         .toString()
  //         .toLowerCase()
  //         .includes(value.toLowerCase()) ||
  //       activity.type.toLowerCase().includes(value.toLowerCase())
  //   )

  //   setActivities(filteredActivities)
  // }

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
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Activities
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Here are the last activities from your Strava account.
              </p>
            </div>

            {/* <ActivityFilters onFilterChange={handleFilter} /> */}

            {/* { && !activities.length && (
              <div className="mx-auto text-center mt-16">
                <Spinner
                  sx={{
                    margin: 'auto',
                    width: '100px',
                  }}
                />
              </div>
            )} */}

            {/* {!activities && (
              <div className="mx-auto text-center mt-16">
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  We have not found any results.
                </p>
              </div>
            )}
            <div className="mx-auto text-center mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {activities &&
                activities.map((activity: any) => (
                  <ActivityCard
                    href={`/activities/${activity.id}`}
                    activity={activity}
                    key={activity.id}
                  />
                ))}
            </div> */}
          </div>
        </div>
      </main>
    </>
  )
}

export default Activities
