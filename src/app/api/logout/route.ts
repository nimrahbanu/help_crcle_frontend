// src/app/api/logout/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const res = NextResponse.redirect(new URL('/login', request.url));

  // Clear cookies by setting them to expire
  res.cookies.set('token', '', { maxAge: -1 });
  res.cookies.set('user_id', '', { maxAge: -1 });

  return res;
}
