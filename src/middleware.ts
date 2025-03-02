import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./pages/lib/auth/jwt";
import { Routes } from "./constants";

export async function middleware(request: NextRequest) {
  // ✅ Get token from cookies instead of headers
  const token = request.cookies.get("token")?.value || null;

  console.log("🔍 Middleware Hit:", request.nextUrl.pathname);
  console.log("🍪 All Cookies:", request.cookies.getAll());
  console.log("🔑 Token from Cookies:", token);

  if (!token) {
    console.log("❌ No Token - Redirecting to Login");
    return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  }

  try {
    await verifyToken(token);
    console.log("✅ Token Verified - Access Granted:", request.nextUrl.pathname);
    return NextResponse.next();
  } catch (error) {
    console.error("❌ Invalid Token:", error);
    const response = NextResponse.redirect(new URL(Routes.LOGIN, request.url));
    response.cookies.delete("token");
    return response;
  }
}

// Apply middleware to all routes EXCEPT /login
export const config = {
  matcher: ["/", "/users"],
};
