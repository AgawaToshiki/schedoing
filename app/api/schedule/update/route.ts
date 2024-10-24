'use server'
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { getUser, updateSchedule } from '@/app/utils/supabase/supabaseFunctions';


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    
    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      return NextResponse.json({ error: 'Unauthorized User' }, { status: 401 });
    }
    const user = await getUser(authUser.id);
    if(!user){
      return NextResponse.json({ error: 'Unauthorized User' }, { status: 401 });
    }

    const data: { id: string, title: string, description: string, startTime: Date, endTime: Date } = await req.json();
    await updateSchedule(data.id, data.title, data.description, data.startTime, data.endTime);

    return NextResponse.json({ status: 201 });
  }catch (error) {
    console.error("RegisterSchedule Error:", error)
    return NextResponse.json({ error: 'Internal Server Error' },{ status: 500 })
  }
}