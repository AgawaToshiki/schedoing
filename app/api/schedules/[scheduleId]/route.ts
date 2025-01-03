'use server'
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { deleteSchedule, getScheduleId, getUserWithSchedules, updateSchedule } from '@/app/utils/supabase/supabaseFunctions';
import { APIError } from '@/app/utils/exceptions';
import { getTotalMinutes } from '@/app/utils/functions';
import { checkSchedule } from '@/app/utils/validation';
import { Schedule } from '@/app/types';


export async function PATCH(
  req: NextRequest, 
  { params }: { params: { scheduleId: string } }
) {
  try {
    if(req.method !== "PATCH"){
      throw new APIError(405, 'この操作は許可されていないHTTPメソッドです');
    }
    
    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, '認証されていないユーザーです');
    }

    const data: { title: string, description: string, startTime: string, endTime: string, userId: string } = await req.json();

    if(authUser.id !== data.userId) {
      throw new APIError(403, '権限がありません');
    }

    const startTime: Date = new Date(data.startTime);
    const endTime: Date = new Date(data.endTime);

    const isValidData = checkSchedule(data.title, startTime, endTime);
    if(!isValidData) {
      throw new APIError(400, 'スケジュールデータが不正です');
    }

    const userData = await getUserWithSchedules(authUser.id);
    if(!userData) {
      throw new APIError(404, 'ユーザー登録されていません');
    }

    const schedules = userData.schedules;
    const hasUpdatingSchedule = schedules?.find((schedule) => schedule.id === params.scheduleId);
    if(!hasUpdatingSchedule) {
      throw new APIError(404, '更新するスケジュールが見つかりません');
    }
    if(schedules){
      //スケジュール時間が既存スケジュール時間と被っているかチェック
      const isOverlappingTime = schedules.some((schedule: Schedule) => {
        //変更中のスケジュールはチェックに含めない
        if(schedule.id === params.scheduleId) {
          return
        }
        const startMinutes = getTotalMinutes(schedule.start_time);
        const endMinutes = getTotalMinutes(schedule.end_time);
        const newStartMinutes = getTotalMinutes(data.startTime);
        const newEndMinutes = getTotalMinutes(data.endTime);
        return (
          (newStartMinutes < endMinutes && newEndMinutes > startMinutes)
        );
      })
      if (isOverlappingTime) {
        throw new APIError(400, '既存のスケジュールと時間が被っています');
      }
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
      { error: 'サーバーエラーが発生しました' },
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
      throw new APIError(405, 'この操作は許可されていないHTTPメソッドです');
    }
    
    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, '認証されていないユーザーです');
    }

    if(!params.scheduleId) {
      throw new APIError(404, '削除するスケジュールが見つかりません');
    }

    const data: { userId: string } = await req.json();

    if(authUser.id !== data.userId) {
      throw new APIError(403, '権限がありません');
    }

    const scheduleId = await getScheduleId(params.scheduleId);

    if(!scheduleId) {
      throw new APIError(404, '削除するスケジュールが見つかりません');
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
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}