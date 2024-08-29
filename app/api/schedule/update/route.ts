'use server'
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/auth';
import { updateSchedule } from '@/app/utils/supabaseFunctions';


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const user = await getCurrentUser();
    if(!user || !user.id){
      redirect('/login')
    }
    const data: { id: string, title: string, startTime: Date, endTime: Date } = await req.json();
    await updateSchedule(data.id, data.title, data.startTime, data.endTime);

    return NextResponse.json({ status: 201 });
  }catch (error) {
    console.error("RegisterSchedule Error:", error)
    return NextResponse.json({ error: 'Internal Server Error' },{ status: 500 })
  }
}