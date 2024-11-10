'use server'
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { updateSchedule } from '@/app/utils/supabase/supabaseFunctions';
import { APIError } from '@/app/utils/exceptions';
import { checkSchedule } from '@/app/utils/validation';


export async function PATCH(req: NextRequest, res: NextResponse) {
  try {

    if(req.method !== "PATCH"){
      throw new APIError(405, 'Method Not Allowed');
    }
    
    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, 'Unauthorized user');
    }

    const data: { id: string, title: string, description: string, startTime: string, endTime: string, paramId: string } = await req.json();

    if(authUser.id !== data.paramId) {
      throw new APIError(403, 'Permission denied');
    }

    const startTime: Date = new Date(data.startTime);
    const endTime: Date = new Date(data.endTime);

    const isValidData = checkSchedule(data.title, startTime, endTime);
    if(!isValidData) {
      throw new APIError(400, 'Invalid schedule data');
    }

    await updateSchedule(data.id, data.title, data.description, startTime, endTime);

    return NextResponse.json({ status: 201 });
  }catch (error) {
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