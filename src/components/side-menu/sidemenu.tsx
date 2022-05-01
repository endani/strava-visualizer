import { useAuth } from '../../utils/auth-context'

const SideMenu = () => {
  const { authData } = useAuth()

  if (!authData) return null

  return (
    <div className="w-90 flex-col hidden sm:flex">
      <nav className="bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-600 pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
        <div className="flex-grow mt-5 flex flex-col">
          <div className="flex-1 space-y-1">
            <div className="mx-auto sm:px-6 lg:pt-8 lg:pb-8 lg:px-8">
              <img
                className="hidden h-32 w-32 rounded-full sm:block m-auto"
                src={authData.profilePictureUrl}
                alt=""
              />
              <div className="flex items-center">
                <h4 className="m-auto mt-5 text-2xl font-bold leading-7 text-gray-900 dark:text-gray-200 sm:leading-9 sm:truncate">
                  {authData.firstname} {authData.lastname}
                </h4>
              </div>
              <dl className="mt-10 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
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
                  {authData.city}
                </dd>
                <dt className="sr-only">Account status</dt>
                <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="orange"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Premium
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export { SideMenu }
