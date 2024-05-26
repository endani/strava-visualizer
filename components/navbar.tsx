import {
  Link,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"

import { siteConfig } from "@/config/site"
import { ThemeSwitch } from "@/components/theme-switch"
import { GithubIcon, SearchIcon } from "@/components/icons"
import { Logo } from "@/components/icons"

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  )
}
