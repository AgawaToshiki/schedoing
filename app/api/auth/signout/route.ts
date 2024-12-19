'use server'
import { NextRequest, NextResponse } from "next/server";
import { getUser, updateStatus } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser, signOut } from "@/app/utils/supabase/auth";
import { APIError } from '@/app/utils/exceptions';


export async function POST(req: NextRequest) {
  try {

    if(req.method !== "POST"){
      throw new APIError(405, 'この操作は許可されていないHTTPメソッドです');
    }

    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, '認証されていないユーザーです');
    }

    const user = await getUser(authUser.id);
    if(!user){
      throw new APIError(401, '認証されていないユーザーです');
    }
    
    await signOut();
    await updateStatus(authUser.id, 'offline');
  
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