




import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public routes (e.g., login and register)
  const isPublic = path === '/login' || path === '/register';

  // Retrieve the token from cookies
  const token = request.cookies.get('token')?.value || '';

  // If user is logged in and trying to access login/register, redirect to dashboard
  if (isPublic && token) {
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    response.headers.set('Cache-Control', 'no-store, max-age=0'); // Disable caching
    return response;
  }

  // If user is not logged in and trying to access private pages, redirect to login
  if (!isPublic && !token) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.headers.set('Cache-Control', 'no-store, max-age=0'); // Disable caching
    return response;
  }

  // If no redirection is needed, proceed with the request
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store, max-age=0'); // Disable caching for private routes
  return response;
}

// Define the matching paths for the middleware
export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*'], // Add relevant routes
};
