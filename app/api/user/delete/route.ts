'use server'
import { NextRequest, NextResponse } from "next/server";
import { deleteUserFromAuth } from "@/app/utils/supabase/authAdmin";
import { deleteUser, getUser } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser } from "@/app/utils/supabase/auth";
import { APIError } from '@/app/utils/exceptions';
import { isAdminUser } from "@/app/utils/validation";


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
      throw new APIError(403, 'Forbidden');
    }

    const data: { id: string } = await req.json();
    if(!data.id) {
      throw new APIError(400, 'Invalid Request: Missing user');
    }
    await deleteUserFromAuth(data.id);
    await deleteUser(data.id);
    
    return NextResponse.json({ status: 201 });

  }catch (error) {
    console.error("DeleteUser Error:", error)

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