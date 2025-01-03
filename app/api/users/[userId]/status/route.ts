'use server'
import { NextRequest, NextResponse } from "next/server";
import { updateStatus } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser } from "@/app/utils/supabase/auth";
import { APIError } from '@/app/utils/exceptions';


export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {

    if(req.method !== "PATCH"){
      throw new APIError(405, 'この操作は許可されていないHTTPメソッドです');
    }

    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, '認証されていないユーザーです');
    }
    
    const data: { status: string } = await req.json();

    if(!params.userId) {
      throw new APIError(404, '更新するユーザーデータが見つかりません');
    }
    if(!data.status) {
      throw new APIError(400, 'リクエストに必要なデータが含まれていません');
    }
    if(authUser.id !== params.userId) {
      throw new APIError(403, '権限がありません');
    }
    await updateStatus(params.userId, data.status);

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