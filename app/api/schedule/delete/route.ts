'use server'
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { deleteSchedule } from '@/app/utils/supabase/supabaseFunctions';


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const user = await getCurrentUser();
    if(!user || !user.id){
      redirect('/login')
    }
    const data: { id: string } = await req.json();
    await deleteSchedule(data.id);

    return NextResponse.json({ status: 201 });
  }catch (error) {
    console.error("RegisterSchedule Error:", error)
    return NextResponse.json({ error: 'Internal Server Error' },{ status: 500 })
  }
}