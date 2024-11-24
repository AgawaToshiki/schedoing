'use server'
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { deleteSchedule, getScheduleId, updateSchedule } from '@/app/utils/supabase/supabaseFunctions';
import { APIError } from '@/app/utils/exceptions';
import { checkSchedule } from '@/app/utils/validation';


export async function PATCH(
  req: NextRequest, 
  { params }: { params: { scheduleId: string } }
) {
  try {
    if(req.method !== "PATCH"){
      throw new APIError(405, 'Method Not Allowed');
    }
    
    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, 'Unauthorized user');
    }

    if(!params.scheduleId) {
      throw new APIError(400, 'BadRequest');
    }

    const scheduleData = await getScheduleId(params.scheduleId);

    if(!scheduleData) {
      throw new APIError(404, 'Schedule not found');
    }

    const data: { title: string, description: string, startTime: string, endTime: string, userId: string } = await req.json();

    if(authUser.id !== data.userId) {
      throw new APIError(403, 'Permission denied');
    }

    const startTime: Date = new Date(data.startTime);
    const endTime: Date = new Date(data.endTime);

    const isValidData = checkSchedule(data.title, startTime, endTime);
    if(!isValidData) {
      throw new APIError(400, 'Invalid schedule data');
    }

    await updateSchedule(params.scheduleId, data.title, data.description, startTime, endTime);

    return NextResponse.json({ status: 200 });
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { scheduleId: string } }
) {
  try {
    if(req.method !== "DELETE"){
      throw new APIError(405, 'Method Not Allowed');
    }
    
    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, 'Unauthorized user');
    }

    if(!params.scheduleId) {
      throw new APIError(404, 'Schedule not found');
    }

    const data: { paramId: string } = await req.json();

    if(authUser.id !== data.paramId) {
      throw new APIError(403, 'Permission denied');
    }

    const scheduleId = await getScheduleId(params.scheduleId);

    if(!scheduleId) {
      throw new APIError(404, 'Schedule data not found');
    }

    await deleteSchedule(params.scheduleId);

    return NextResponse.json({ status: 200 });
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