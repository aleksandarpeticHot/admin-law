import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './pages/lib/auth/jwt'
import { Routes } from './constants';

export async function middleware(request: NextRequest) {
  const token = request.headers.get("authorization");
  const { pathname } = request.nextUrl

  // Define public routes
  const publicPaths = [
    Routes.LOGIN,          // Login page
    '/api/auth/login'       // Login API endpoint
  ]

  // Check if current path is public
  const isPublicPath = publicPaths.some(path =>
    pathname === path || pathname.startsWith(path)
  )

  // Handle public paths
  if (isPublicPath) {
    // If user has valid token, redirect from login pages
    if (pathname === Routes.LOGIN && token) {
      try {
        await verifyToken(token)
        return NextResponse.redirect(new URL('/users', request.url))
      } catch {
        // Invalid token, allow access to login
        return NextResponse.next()
      }
    }
    return NextResponse.next()
  }

  // All other routes require authentication
  if (!token) {
    return NextResponse.redirect(new URL(Routes.LOGIN, request.url))
  }

  try {
    await verifyToken(token)
    return NextResponse.next()
  } catch (error) {
    console.log(error)
    // Invalid token, clear cookie and redirect
    const response = NextResponse.redirect(new URL(Routes.LOGIN, request.url))
    response.cookies.delete('session-token')
    return response
  }
}
// Apply middleware to all routes EXCEPT /login
export const config = {
  matcher: [
    "/",
    "/users"
  ]
};
