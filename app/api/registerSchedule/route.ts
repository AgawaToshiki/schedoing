'use server'
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/auth';
import { registerSchedule } from '@/app/utils/supabaseFunctions';


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const user = await getCurrentUser();
    if(!user || !user.id){
      redirect('/login')
    }
    const data: { startTime: Date, endTime: Date, title: string } = await req.json();
    await registerSchedule(user.id, data.startTime, data.endTime, data.title);

    return NextResponse.json({ status: 201 });
  }catch (error) {
    console.error("RegisterSchedule Error:", error)
    return NextResponse.json({ error: 'Internal Server Error' },{ status: 500 })
  }
}