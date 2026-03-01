import type { NextApiRequest, NextApiResponse } from 'next'

import NextAuthHandler from '@/lib/nextauth'

export const config = { runtime: 'nodejs' }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.query = { ...req.query, nextauth: ['signout'] }

  return NextAuthHandler(req, res)
}
