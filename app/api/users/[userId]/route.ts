'use server'
import { NextRequest, NextResponse } from "next/server";
import { deleteUserFromAuth, updateUserEmailFromAuth } from "@/app/utils/supabase/authAdmin";
import { deleteUser, getUser, updateUser } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser } from "@/app/utils/supabase/auth";
import { APIError } from '@/app/utils/exceptions';
import { updateValidation } from "@/app/utils/validation";
import { isAdminUser } from "@/app/utils/functions";
import { User } from '../../../types';


const checkData = async(userId: string): Promise<User> => {
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

    if(!userId) {
      throw new APIError(404, '指定されたユーザーが見つかりません');
    }

    const getUserData = await getUser(userId);
    if(!getUserData) {
      throw new APIError(404, '指定されたユーザーが見つかりません');
    }
    return getUserData
}


export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {

    if(req.method !== "PATCH"){
      throw new APIError(405, 'この操作は許可されていないHTTPメソッドです');
    }

    const userData = await checkData(params.userId);
    
    const data: { role: string, displayName: string, email: string } = await req.json();

    const { isValid, isSetRole } = updateValidation(data.email, data.displayName, data.role);
    if(!isValid || !isSetRole) {
      throw new APIError(400, 'ユーザーデータが不正です');
    }
    
    if(userData.email !== data.email) {
      //emailに変更があるときだけ処理を行う
      await updateUserEmailFromAuth(params.userId, data.email);
    }

    await updateUser(params.userId, data.role, data.displayName, data.email);


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


export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {

    if(req.method !== "DELETE"){
      throw new APIError(405, 'この操作は許可されていないHTTPメソッドです');
    }
    
    await checkData(params.userId);

    await deleteUserFromAuth(params.userId);
    await deleteUser(params.userId);
    
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