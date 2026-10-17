import { NextResponse } from 'next/server';
import { validateApiAuth } from '@/lib/api-auth';
import { mockAiInsights } from '@/lib/mock-data';

export async function GET() {
  try {
    const auth = await validateApiAuth();
    if (!auth.authenticated) return auth.response;

    const insights = mockAiInsights
      .slice()
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 5)
      .map((insight) => ({
        id: insight.id,
        title: `${insight.category} Alert`,
        content: insight.insight_text,
        type: insight.category.toLowerCase(),
        created_at: insight.created_at,
      }));

    return NextResponse.json(insights);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch insights' }, { status: 500 });
  }
}
