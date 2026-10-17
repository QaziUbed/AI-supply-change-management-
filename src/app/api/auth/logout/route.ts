import { NextResponse } from 'next/server';
import { SIMPLE_AUTH_COOKIE } from '@/lib/simple-auth';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: SIMPLE_AUTH_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return response;
}
