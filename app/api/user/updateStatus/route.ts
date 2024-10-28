'use server'
import { NextRequest, NextResponse } from "next/server";
import { updateStatus } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser } from "@/app/utils/supabase/auth";
import { APIError } from '@/app/utils/exceptions';


export async function POST(req: NextRequest, res: NextResponse) {
  try {

    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, 'Unauthorized User');
    }
    
    const data: { id: string, status: string } = await req.json();

    if(!data.id) {
      throw new APIError(400, 'Invalid Request: Missing user');
    }
    if(authUser.id !== data.id) {
      throw new APIError(403, 'Permission denied');
    }
    await updateStatus(data.id, data.status);

    return NextResponse.json({ status: 201 });

  }catch (error) {
    console.error("UpdateStatus Error:", error)
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