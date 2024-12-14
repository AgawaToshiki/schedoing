'use server'
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { getUserWithSchedules, registerSchedule } from '@/app/utils/supabase/supabaseFunctions';
import { APIError } from '@/app/utils/exceptions';
import { getTotalMinutes } from '@/app/utils/functions';
import { checkSchedule } from '@/app/utils/validation';
import { Schedule } from '@/app/types';


export async function POST(req: NextRequest) {
  try {

    if(req.method !== "POST"){
      throw new APIError(405, 'Method Not Allowed');
    }
    
    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, 'Unauthorized user');
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

    const userData = await getUserWithSchedules(authUser.id);
    if(!userData) {
      throw new APIError(400, 'User does not exist');
    }

    const schedules = userData.schedules;
    if(schedules){
      //スケジュール時間が既存スケジュール時間と被っているかチェック
      const isOverlappingTime = schedules.some((schedule: Schedule) => {
        const startMinutes = getTotalMinutes(schedule.start_time);
        const endMinutes = getTotalMinutes(schedule.end_time);
        const newStartMinutes = getTotalMinutes(data.startTime);
        const newEndMinutes = getTotalMinutes(data.endTime);
        return (
          (newStartMinutes < endMinutes && newEndMinutes > startMinutes)
        );
      })
      if (isOverlappingTime) {
        throw new APIError(400, '既存スケジュールと時間が被っています');
      }
    }

    await registerSchedule(authUser.id, data.title, data.description, startTime, endTime);

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