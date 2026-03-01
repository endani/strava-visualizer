import type { NextApiRequest, NextApiResponse } from 'next'

import NextAuthHandler from '@/lib/nextauth'

export const config = { runtime: 'nodejs' }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.query = { ...req.query, nextauth: ['providers'] }

  return NextAuthHandler(req, res)(req, res)
}
