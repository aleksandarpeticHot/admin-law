import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "@/pages/lib/auth/jwt";

const prisma = new PrismaClient();
export interface LoginRequestBody {
  email: string;
  password: string;
}

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { email, password }: LoginRequestBody = req.body;

  // Validate input
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  // Find user in database
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  // Compare hashed password
  const isMatch: boolean = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  // Generate JWT Token using jose
  const token = await generateToken(user)

  res.status(200).json({
    message: "Login successful!",
    token,
  });
}
