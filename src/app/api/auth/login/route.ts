import { NextResponse } from 'next/server';
import { createSessionToken, getSimpleAuthRole, SIMPLE_AUTH_COOKIE, validateSimpleCredentials } from '@/lib/simple-auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const result = validateSimpleCredentials(email, password);

    if (result.configMissing) {
      return NextResponse.json(
        { error: 'Simple auth credentials are not configured. Set SIMPLE_AUTH_EMAIL and SIMPLE_AUTH_PASSWORD.' },
        { status: 500 }
      );
    }

    if (!result.valid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const role = getSimpleAuthRole();
    const token = createSessionToken(email, role);

    const response = NextResponse.json({
      success: true,
      user: {
        id: email,
        email,
        full_name: email.split('@')[0] || 'User',
        role,
      },
      usingDevFallback: result.fallback,
    });

    response.cookies.set({
      name: SIMPLE_AUTH_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }
}
