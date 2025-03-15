import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './pages/lib/auth/jwt';
import { Routes } from './constants';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || null;

  console.log(request.url)
  console.log(Routes.LOGIN)
  console.log(request.url === Routes.LOGIN)

  if (!token && request.url === Routes.LOGIN) {
    console.log('usil')
    return NextResponse.next();
  }

  if (!token) {
    console.log('❌ No Token - Redirecting to Login');

    // Instead of forcing redirect, allow client-side handling
    const response = NextResponse.redirect(new URL(Routes.LOGIN, request.url));
    response.cookies.delete('token');
    return response;
  }

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    console.error('❌ Invalid Token:', error);

    // Clear invalid token and redirect to login
    const response = NextResponse.redirect(new URL(Routes.LOGIN, request.url));
    response.cookies.delete('token');
    return response;
  }
}

// Apply middleware to all routes EXCEPT /login
export const config = {
  matcher: ['/', '/users', '/users/(.*)', '/clients', '/clients/(.*)']
};
