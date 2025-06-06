'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { SunFilledIcon, MoonFilledIcon } from '@/components/icons'

export const ThemeSwitch = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (!isMounted) {
    return <div className="w-8 h-8" />
  }

  return (
    <Button size="icon" variant="ghost" onClick={toggleTheme}>
      {theme === 'light' ? (
        <SunFilledIcon size={22} />
      ) : (
        <MoonFilledIcon size={22} />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
