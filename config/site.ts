export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Strava Visualizer',
  description: 'Get the most out of your Strava data. Visually.',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'AI Training',
      href: '/ai-training',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/endani/strava-visualizer/',
    docs: 'https://nextui-docs-v2.vercel.app',
  },
}
