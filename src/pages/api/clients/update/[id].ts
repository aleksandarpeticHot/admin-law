import { prisma } from '@/lib/prisma';
import { toSnakeCase } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

export type DBClientType = {
  id: number;
  name: string;
  state: string;
  city_id: number;
  street: string;
  unique_id: string;
  phone_number: string;
  fax?: string | null;
  bank_account_number?: string | null;
  contact?: string | null;
  client_type_id: number;
  description?: string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Valid client ID is required' });
  }

  if (req.method === 'PUT') {
    try {
      const updateData = req.body;

      if (updateData.clientTypeId) {
        updateData.clientTypeId = parseInt(updateData.clientTypeId, 10)
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'No valid fields provided for update' });
      }

      const updatedClient = await prisma.client.update({
        where: { id },
        data: toSnakeCase(updateData)
      });

      return res.status(200).json({ success: true, data: updatedClient });

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(400).json({ error: 'Unique constraint failed. The uniqueId must be unique.' });
        }
        if (error.code === 'P2003') {
          return res.status(400).json({ error: 'Foreign key constraint failed. Check city_id or client_type_id.' });
        }
        if (error.code === 'P2000') {
          return res.status(400).json({ error: 'Input value too long for field. Check character limits.' });
        }
        if (error.code === 'P2004') {
          return res.status(400).json({ error: 'Check constraint failed. Ensure uniqueId is 8 or 13 characters.' });
        }
      }

      return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to update client' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
