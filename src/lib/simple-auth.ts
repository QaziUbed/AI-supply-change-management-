import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import type { UserRole } from '@/lib/rbac';

export const SIMPLE_AUTH_COOKIE = 'scm_simple_auth';
const DEFAULT_DEV_EMAIL = 'admin@example.com';
const DEFAULT_DEV_PASSWORD = 'dev-password';
const DEFAULT_ROLE: UserRole = 'Planner';

interface SessionPayload {
  email: string;
  role: UserRole;
  iat: number;
}

export interface SessionUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
}

function toBase64Url(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function fromBase64Url(value: string): string {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function getSecret(): string {
  return process.env.SIMPLE_AUTH_SESSION_SECRET || process.env.SIMPLE_AUTH_PASSWORD || 'dev-session-secret';
}

export function getSimpleAuthRole(): UserRole {
  const configuredRole = process.env.SIMPLE_AUTH_ROLE;
  if (configuredRole === 'Admin' || configuredRole === 'Planner' || configuredRole === 'Manager') {
    return configuredRole;
  }
  return DEFAULT_ROLE;
}

function getExpectedCredentials() {
  const email = process.env.SIMPLE_AUTH_EMAIL;
  const password = process.env.SIMPLE_AUTH_PASSWORD;

  if (email && password) {
    return { email, password, fallback: false };
  }

  if (process.env.NODE_ENV !== 'production') {
    return { email: DEFAULT_DEV_EMAIL, password: DEFAULT_DEV_PASSWORD, fallback: true };
  }

  return null;
}

function safeEqualString(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function validateSimpleCredentials(email: string, password: string) {
  const credentials = getExpectedCredentials();

  if (!credentials) {
    return { valid: false, fallback: false, configMissing: true } as const;
  }

  const valid = safeEqualString(email, credentials.email) && safeEqualString(password, credentials.password);

  return {
    valid,
    fallback: credentials.fallback,
    configMissing: false,
  } as const;
}

function sign(value: string): string {
  return createHmac('sha256', getSecret()).update(value).digest('base64url');
}

export function createSessionToken(email: string, role: UserRole) {
  const payload: SessionPayload = {
    email,
    role,
    iat: Date.now(),
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function parseSessionToken(token?: string | null): SessionUser | null {
  if (!token) return null;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  if (!safeEqualString(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as SessionPayload;
    if (!payload?.email || !payload?.role) return null;

    const role = payload.role;
    if (role !== 'Admin' && role !== 'Planner' && role !== 'Manager') return null;

    return {
      id: payload.email,
      email: payload.email,
      full_name: payload.email.split('@')[0] || 'User',
      role,
    };
  } catch {
    return null;
  }
}

export async function getSessionUserFromCookies() {
  const cookieStore = await cookies();
  return parseSessionToken(cookieStore.get(SIMPLE_AUTH_COOKIE)?.value);
}

export function getSessionUserFromRequest(request: NextRequest) {
  return parseSessionToken(request.cookies.get(SIMPLE_AUTH_COOKIE)?.value);
}
