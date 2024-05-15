const path = require('path')

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true,
      },
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },

  // webpackFinal: async (config) => {
  //   config.resolve.alias.storybook = path.resolve(__dirname, '../.storybook')

  //   config.module.rules.push({
  //     test: /\.stories\.tsx/,
  //     use: [
  //       {
  //         loader: 'story-description-loader',
  //         options: { isTSX: true },
  //       },
  //     ],
  //   })

  //   return config
  // },
}
export default config
