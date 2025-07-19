import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    message: 'Auth API routes are working',
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method,
  })
}
