'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { LogOut } from 'lucide-react'

import { Button } from './ui/button'

import { useScrollDirection } from '@/hooks/use-scroll-direction'
import { cn } from '@/lib/utils'
import { ThemeSwitch } from '@/components/theme-switch'

export const Navbar = () => {
  const { data: session } = useSession()
  const scrollDirection = useScrollDirection()

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300',
        {
          '-translate-y-full': scrollDirection === 'down',
        },
      )}
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              Strava Visualizer
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {session ? (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          ) : null}
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
