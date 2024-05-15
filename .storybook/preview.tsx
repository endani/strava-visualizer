import React from 'react'

import '@/styles/tailwind.css'
import { Preview } from '@storybook/react'
import { ThemeProvider } from '@primer/react'

/** @type { import('@storybook/react').Preview } */
const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
