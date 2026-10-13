import { NextResponse } from 'next/server';
import { getLagosDate, LAGOS_TIMEZONE } from '@/lib/dates';

export async function GET() {
  return NextResponse.json({
    ok: true,
    data: {
      status: 'healthy',
      app: 'spotter',
      timezone: LAGOS_TIMEZONE,
      lagosDate: getLagosDate(),
      timestamp: new Date().toISOString(),
    },
  });
}
