import { prisma } from '@/lib/prisma'
import { toCamelCase } from '@/lib/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function getClient(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  try {
    if (!id) {
      return res.status(400).json({ error: 'id is required' })
    }

    if (typeof (id) !== 'string') {
      return res.status(400).json({ error: 'id has to be string' })
    }

    const client = await prisma.client.findUnique({
      where: {
        id
      }
    })

    if (!client) {
      return res.status(404).json({ error: 'Klijent ne postoji' })
    }
    return res.status(200).json({
      ...toCamelCase(client)
    })

  } catch (error) {
    res.status(500).json({ error, message: 'Internal server error' })
  }
}