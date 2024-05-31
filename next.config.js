/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    mapboxKey:
      'pk.eyJ1IjoicDBwbWFrZXIiLCJhIjoiY2lzOXliOGlrMDA2ODJ5bzJ4YjNnb29qdSJ9.hf19Sca7oYCcR8kRlx07Rw',
    stravaClient: 56740,
    stravaSecret: '8c5caba12a4e7d4c5cc07b868d0abd0a88b958c0',
    googleAPIKEY: 'AIzaSyAsyxYCjxLqi49yGUuqUJRa4cYN8V4VyLE',
  },
}

module.exports = nextConfig
