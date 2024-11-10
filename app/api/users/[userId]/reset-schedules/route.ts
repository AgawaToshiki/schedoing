'use server'
import { NextRequest, NextResponse } from "next/server";
import { updateSchedulesResetFlag } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser } from "@/app/utils/supabase/auth";
import { APIError } from '@/app/utils/exceptions';


export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {

    if(req.method !== "PATCH"){
      throw new APIError(405, 'Method Not Allowed');
    }

    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, 'Unauthorized user');
    }

    if(!params.userId) {
      throw new APIError(400, 'Bad Request');
    }

    if(authUser.id !== params.userId) {
      throw new APIError(403, 'Permission denied');
    }
    
    const data: { resetFlag: boolean } = await req.json();

    await updateSchedulesResetFlag(params.userId, data.resetFlag);

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