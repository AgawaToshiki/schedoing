'use server'
import { NextRequest, NextResponse } from "next/server";
import { createUserFromAuth } from "@/app/utils/supabase/authAdmin";
import { getUser, registerUser } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser } from "@/app/utils/supabase/auth";
import { APIError } from '@/app/utils/exceptions';
import { isAdminUser, registerValidation } from "@/app/utils/validation";


export async function POST(req: NextRequest, res: NextResponse) {
  try {

    if(req.method !== "POST"){
      throw new APIError(405, 'Method Not Allowed');
    }
    
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

    const data: { email: string, password: string, displayName: string } = await req.json();

    if(!data) {
      throw new APIError(400, 'BadRequest');
    }

    const { isValid } = registerValidation(data.email, data.password, data.displayName);

    if(!isValid) {
      throw new APIError(400, 'Invalid user data');
    }
  
    const userData = await createUserFromAuth(data.email, data.password);

    if(!userData || !userData.id) {
      throw new APIError(422, 'User creation failed');
    }

    await registerUser(userData.id, data.email, data.displayName);
    
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