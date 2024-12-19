'use server'
import { NextRequest, NextResponse } from "next/server";
import { createUserFromAuth } from "@/app/utils/supabase/authAdmin";
import { getUser, registerUser } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser } from "@/app/utils/supabase/auth";
import { APIError } from '@/app/utils/exceptions';
import { registerValidation } from "@/app/utils/validation";
import { isAdminUser } from '@/app/utils/functions';


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
    const isAdmin = isAdminUser(user);
    if(!isAdmin) {
      throw new APIError(403, '権限がありません');
    }

    const data: { email: string, password: string, displayName: string } = await req.json();

    if(!data) {
      throw new APIError(400, 'リクエストに必要なデータが含まれていません');
    }

    const { isValid } = registerValidation(data.email, data.password, data.displayName);

    if(!isValid) {
      throw new APIError(400, 'ユーザーデータが不正です');
    }
  
    const userData = await createUserFromAuth(data.email, data.password);

    if(!userData || !userData.id) {
      throw new APIError(422, 'ユーザー作成に失敗しました');
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
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}