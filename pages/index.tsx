import {
  Link,
  Snippet,
  Code,
  button as buttonStyles,
  Button,
} from "@nextui-org/react"

import { siteConfig } from "@/config/site"
import { title, subtitle } from "@/components/primitives"
import { GithubIcon } from "@/components/icons"
import DefaultLayout from "@/layouts/default"

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Get the most of your&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>Strava.</h1>
          <br />
          <h1 className={title()}>Visually.</h1>
          <h4 className={subtitle({ class: "mt-4" })}>
            Strava Visualizer is the best way to understand your activities,
            analyze your data, and get better at your sport.
          </h4>
        </div>

        <div className="flex gap-3">
          <Link
            className={buttonStyles({
              color: "primary",
            })}
            href={`https://www.strava.com/oauth/authorize?client_id=${process.env.stravaClient}&response_type=code&redirect_uri=http://localhost:3000&approval_prompt=force&scope=activity:read_all,read_all,activity:read,profile:read_all`}
          >
            Login with Strava
          </Link>
        </div>
      </section>
    </DefaultLayout>
  )
}
