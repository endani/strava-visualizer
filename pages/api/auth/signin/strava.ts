import type { NextApiRequest, NextApiResponse } from 'next'

import NextAuthHandler from '@/lib/nextauth'

export const config = { runtime: 'nodejs' }

function applyNextAuthUrl(req: NextApiRequest) {
  const url = process.env.NEXTAUTH_URL
  if (url) {
    try {
      const u = new URL(url)
      req.headers['x-forwarded-host'] = u.host
      req.headers['x-forwarded-proto'] = u.protocol.replace(':', '')
    } catch {
      // ignore
    }
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  applyNextAuthUrl(req)
  req.query = { ...req.query, nextauth: ['signin', 'strava'] }

  return NextAuthHandler(req, res)
}
