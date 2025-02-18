import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "your_super_secret_key";

// Convert the secret key to a Uint8Array for jose
const SECRET_KEY_BYTES = new TextEncoder().encode(SECRET_KEY);

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  try {
    // Use `jose` to verify the JWT token
    await jwtVerify(token, SECRET_KEY_BYTES);
    return NextResponse.next(); // Allow request to continue
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/user/profile", "/api/admin/:path*"], // Protect these paths
};
