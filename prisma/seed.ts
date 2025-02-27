import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  console.log(email)

  if (!email || !password) {
    console.error("⚠️ ADMIN_EMAIL or ADMIN_PASSWORD is missing from .env file");
    process.exit(1);
  }

  // Check if user already exists
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (!existingUser) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the Super Admin user
    await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log("✅ Super Admin user created successfully!");
  } else {
    console.log("⚠️ Super Admin user already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
