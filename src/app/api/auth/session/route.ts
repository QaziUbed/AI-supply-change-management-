import { NextResponse } from 'next/server';
import { getSessionUserFromCookies } from '@/lib/simple-auth';

export async function GET() {
  const user = await getSessionUserFromCookies();

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user,
  });
}
