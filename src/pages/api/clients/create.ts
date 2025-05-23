import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { ClientStoreType } from '@/lib/api/clients';

export default async function createClient(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are allowed.' });
  }

  try {
    // Validate request body
    const {
      name,
      state,
      cityId,
      street,
      uniqueId,
      phoneNumber,
      clientTypeId,
      fax,
      bankAccountNumber,
      contact,
      description
    } = req.body as ClientStoreType;

    if (!name || !uniqueId || !phoneNumber || !clientTypeId) {
      return res.status(400).json({ error: 'Missing required fields', message: 'Please provide all required client details.' });
    }

    if(clientTypeId === 1 && uniqueId.length !== 8 ) {
      return res.status(400).json({ error: 'Unique id must have exactly 8 characters!', message: 'Unique id must have exactly 8 characters!' })
    }

    if(clientTypeId === 2 && uniqueId.length !== 13 ) {
      return res.status(400).json({ error: 'Unique id must have exactly 13 characters!', message: 'Unique id must have exactly 13 characters!' })
    }

    // Create new client in the database
    const newClient = await prisma.client.create({
      data: {
        name,
        state,
        city_id: cityId,
        street,
        unique_id: uniqueId,
        phone_number: phoneNumber,
        client_type_id: clientTypeId,
        fax: fax || null,
        bank_account_number: bankAccountNumber || null,
        contact: contact || null,
        description: description || null
      }
    });

    return res.status(201).json({ success: true, data: newClient });

  } catch (error) {
    console.error('Error creating client:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong while creating the client.' });
  }
}
