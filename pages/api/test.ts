import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    message: 'API routes are working',
    timestamp: new Date().toISOString(),
    env: {
      hasStravaClientId: !!process.env.STRAVA_CLIENT_ID,
      hasStravaClientSecret: !!process.env.STRAVA_CLIENT_SECRET,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      nodeEnv: process.env.NODE_ENV,
    },
  })
}
