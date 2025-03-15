import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { ClientFilterValuesType } from "@/lib/api/clients";

export default async function list(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are allowed.' });
  }

  try {
    const { rows, page, cityId, clientTypeId }: ClientFilterValuesType = req.body;

    const numberRows = rows ?? 20;
    const numberPage = page ?? 1;

    // eslint-disable-next-line 
    const filters: any = {}

    if (cityId) {
      filters.city_id = parseInt(cityId, 10)
    }

    if (req.body?.clientTypeId) {
      filters.client_type_id = parseInt(clientTypeId, 10)
    }

    const totalClients = await prisma.client.count({
      where: filters
    });

    const skip = (numberPage - 1) * numberRows;
    const take = numberRows;

    const clients = await prisma.client.findMany({
      where: filters,
      skip,
      take,
      include: {
        city: true,
        clientType: true
      }
    });

    return res.status(200).json({
      success: true,
      data: clients || [],
      pagination: {
        total: totalClients,
        numberPage,
        numberRows,
        totalPages: Math.ceil(totalClients / numberRows),
      },
    });

  } catch (error) {
    console.error('Error fetching clients:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong while fetching clients.' });
  }
}