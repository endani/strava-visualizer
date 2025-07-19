import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    status: 'ok',
    message: 'Health check passed',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
  })
}
