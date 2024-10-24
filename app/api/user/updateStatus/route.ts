'use server'
import { NextRequest, NextResponse } from "next/server";
import { getUser, updateStatus } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser } from "@/app/utils/supabase/auth";

class APIError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

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
    
    const data: { id: string, status: string } = await req.json();

    if(!data.id) {
      throw new APIError(400, 'Invalid Request: Missing user');
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