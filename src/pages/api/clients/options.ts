import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function clientsOptions(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  try {
    const cities = await prisma.city.findMany()
    const clientTypes = await prisma.clientType.findMany()

    return res.status(200).json({
      cities,
      clientTypes
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong while fetching clients options.' });
  }

}