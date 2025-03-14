import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function list(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are allowed.' });
  }

  try {
    let { rows, page } = req.body;

    rows = rows ? parseInt(rows, 10) : 20;
    page = page ? parseInt(page, 10) : 1;

    const totalClients = await prisma.clients.count();

    const skip = (page - 1) * rows;
    const take = rows;

    const clients = await prisma.clients.findMany({
      skip,
      take
    });

    return res.status(200).json({
      success: true,
      data: clients || [],
      pagination: {
        total: totalClients,
        page,
        rows,
        totalPages: Math.ceil(totalClients / rows),
      },
    });

  } catch (error) {
    console.error('Error fetching clients:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong while fetching clients.' });
  }
}