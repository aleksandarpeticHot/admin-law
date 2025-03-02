import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "@/pages/lib/auth/jwt";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await prisma.users.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = await generateToken(user);

  console.log("✅ Token Generated:", token); // Debugging

  // ✅ Set HttpOnly cookie
  res.setHeader(
    "Set-Cookie",
    serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false, // Secure only in production
      sameSite: "lax", // ✅ Ensures middleware can access the cookie
      path: "/",
    })
  );

  res.status(200).json({ message: "Login successful!" });
}
