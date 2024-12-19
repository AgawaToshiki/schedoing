'use server'
import { NextRequest, NextResponse } from "next/server";
import { updateStatus } from "@/app/utils/supabase/supabaseFunctions";
import { signIn } from "@/app/utils/supabase/auth";
import { APIError } from '@/app/utils/exceptions';
import { loginValidation } from "@/app/utils/validation";


export async function POST(req: NextRequest) {
  try {

    if(req.method !== "POST"){
      throw new APIError(405, 'この操作は許可されていないHTTPメソッドです');
    }

    const data: { email: string, password: string } = await req.json();

    if(!data) {
      throw new APIError(400, 'リクエストに必要なデータが含まれていません');
    }

    const { isValid } = loginValidation(data.email, data.password);

    if(!isValid) {
      throw new APIError(400, 'ユーザーデータが不正です');
    }

    const user = await signIn(data.email, data.password);
    if(!user || !user.id){
      throw new APIError(401, 'ログイン情報が正しくありません');
    }
    await updateStatus(user.id, 'online');
  
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