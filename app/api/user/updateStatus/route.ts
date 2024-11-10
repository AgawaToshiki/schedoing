'use server'
import { NextRequest, NextResponse } from "next/server";
import { updateStatus } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser } from "@/app/utils/supabase/auth";
import { APIError } from '@/app/utils/exceptions';


export async function PATCH(req: NextRequest, res: NextResponse) {
  try {

    if(req.method !== "PATCH"){
      throw new APIError(405, 'Method Not Allowed');
    }

    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, 'Unauthorized user');
    }
    
    const data: { id: string, status: string } = await req.json();

    if(!data.id) {
      throw new APIError(400, 'Invalid Request: Missing user');
    }
    if(!data.status) {
      throw new APIError(400, 'Invalid status');
    }
    if(authUser.id !== data.id) {
      throw new APIError(403, 'Permission denied');
    }
    await updateStatus(data.id, data.status);

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