'use server'
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { getUser, updateSchedule } from '@/app/utils/supabase/supabaseFunctions';
import { APIError } from '@/app/utils/exceptions';
import { checkSchedule } from '@/app/utils/validation';


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, 'Unauthorized User');
    }
    const user = await getUser(authUser.id);
    if(!user){
      throw new APIError(401, 'Unauthorized User');
    }

    const data: { id: string, title: string, description: string, startTime: Date, endTime: Date } = await req.json();

    const isValidData = checkSchedule(data.title, data.startTime, data.endTime);
    if(!isValidData) {
      throw new APIError(400, 'Invalid schedule data');
    }

    await updateSchedule(data.id, data.title, data.description, data.startTime, data.endTime);

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