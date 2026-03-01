import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Temporary route to verify Vercel runtime logs are working.
 * Visit /api/log-test - you should see this message in Vercel Logs.
 * Remove this file once debugging is done.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[strava-visualizer] /api/log-test hit at', new Date().toISOString())
  res.status(200).json({
    ok: true,
    message: 'If you see this, the API route ran. Check Vercel Logs for the console message.',
    timestamp: new Date().toISOString(),
  })
}
