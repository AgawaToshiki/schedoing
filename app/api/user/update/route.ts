'use server'
import { NextRequest, NextResponse } from "next/server";
import { updateUserEmailFromAuth } from "@/app/utils/supabase/authAdmin";
import { getUser, updateUser } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser } from "@/app/utils/supabase/auth";
import { APIError } from '@/app/utils/exceptions';
import { isAdminUser, updateValidation } from "@/app/utils/validation";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, 'Unauthorized user');
    }
    const user = await getUser(authUser.id);
    if(!user){
      throw new APIError(401, 'Unauthorized user');
    }
    const isAdmin = isAdminUser(user);
    if(!isAdmin) {
      throw new APIError(403, 'Permission denied');
    }
    
    const data: { id: string, role: string, displayName: string, email: string } = await req.json();

    if(!data.id) {
      throw new APIError(404, 'User data not found');
    }

    const { isValid } = updateValidation(data.email, data.displayName, data.role);
    if(!isValid) {
      throw new APIError(400, 'Invalid user data');
    }
    
    await updateUser(data.id, data.role, data.displayName, data.email);
    await updateUserEmailFromAuth(data.id, data.email);

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