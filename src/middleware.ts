import { NextResponse, type NextRequest } from 'next/server';
import { PUBLIC_ROUTES, PUBLIC_API_ROUTES, SYSTEM_PATHS } from '@/lib/rbac';
import { getSessionUserFromRequest } from '@/lib/simple-auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (SYSTEM_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  if (PUBLIC_API_ROUTES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const user = getSessionUserFromRequest(request);

  if (!user) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
