import { NextResponse } from 'next/server';
import { getLandingStats } from '@/lib/mock-data';

export async function GET() {
  try {
    return NextResponse.json(getLandingStats());
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
