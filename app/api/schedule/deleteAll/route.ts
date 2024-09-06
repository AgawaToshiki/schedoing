'use server'

import { NextRequest, NextResponse } from 'next/server'
import { deleteAllSchedule } from '@/app/utils/supabase/supabaseFunctions';

export const dynamic = 'force-dynamic';


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await deleteAllSchedule();

  }catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete schedules' }, { status: 500 });
  }
}