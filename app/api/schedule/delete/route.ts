'use server'
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { deleteSchedule, getScheduleId } from '@/app/utils/supabase/supabaseFunctions';
import { APIError } from '@/app/utils/exceptions';


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, 'Unauthorized User');
    }

    const data: { id: string } = await req.json();
    const scheduleData = await getScheduleId(data.id);

    if(!scheduleData) {
      throw new APIError(404, 'Schedule data not found');
    }
    if(scheduleData.user_id !== authUser.id) {
      throw new APIError(403, 'Permission denied');
    }
    await deleteSchedule(data.id);

    return NextResponse.json({ status: 201 });
  }catch (error) {
    console.error("RegisterSchedule Error:", error)
    if(error instanceof APIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}