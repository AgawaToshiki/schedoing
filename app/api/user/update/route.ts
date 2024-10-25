'use server'
import { NextRequest, NextResponse } from "next/server";
import { updateUserEmailFromAuth } from "@/app/utils/supabase/authAdmin";
import { getUser, isAdminUser, updateUser } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser } from "@/app/utils/supabase/auth";
import { APIError } from '@/app/utils/exceptions';

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
    const isAdmin = isAdminUser(user);
    if(!isAdmin) {
      throw new APIError(403, 'Forbidden: Operation denied');
    }
    
    const data: { id: string, role: string, displayName: string, email: string } = await req.json();

    if(!data.id) {
      throw new APIError(400, 'Invalid Request: Missing user');
    }
    
    await updateUser(data.id, data.role, data.displayName, data.email);
    await updateUserEmailFromAuth(data.id, data.email);

    return NextResponse.json({ status: 201 });

  }catch (error) {
    console.error("UpdateUser Error:", error)
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