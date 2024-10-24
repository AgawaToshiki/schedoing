'use server'
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { deleteSchedule, getUser } from '@/app/utils/supabase/supabaseFunctions';


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

    const data: { id: string } = await req.json();
    await deleteSchedule(data.id);

    return NextResponse.json({ status: 201 });
  }catch (error) {
    console.error("RegisterSchedule Error:", error)
    return NextResponse.json({ error: 'Internal Server Error' },{ status: 500 })
  }
}