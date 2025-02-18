import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "your_super_secret_key";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  // Define request body type
  interface LoginRequestBody {
    email: string;
    password: string;
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

  // Convert SECRET_KEY to Uint8Array for jose
  const secretKeyBytes = new TextEncoder().encode(SECRET_KEY);

  // Generate JWT Token using jose
  const token = await new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h") // Token expires in 1 hour
    .sign(secretKeyBytes);

  res.status(200).json({
    message: "Login successful!",
    token,
  });
}
