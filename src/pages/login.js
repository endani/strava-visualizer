import React from "react"

import LoginLayout from "./layouts/login"

const Login = () => (
  <LoginLayout>
    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <img
          alt=""
          className="h-8 w-auto sm:h-10 mb-20"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        />
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Strava</span>
            <span className="block text-indigo-600">Visualizer</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                href="https://www.strava.com/oauth/authorize?client_id=56740&response_type=code&redirect_uri=http://localhost:3000/activities/&approval_prompt=force&scope=activity:read_all,read_all,activity:read,profile:read_all"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Login with Strava
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  </LoginLayout>
)

export default Login
