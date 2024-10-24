'use server'
import { NextRequest, NextResponse } from "next/server";
import { deleteUserFromAuth } from "@/app/utils/supabase/authAdmin";
import { deleteUser, getUser, isAdminUser } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser } from "@/app/utils/supabase/auth";


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    //ここにユーザーは認証されている・ユーザーの権限がadminのバリデーションを実装
    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      return NextResponse.json({ error: 'Unauthorized User' }, { status: 401 });
    }
    const user = await getUser(authUser.id);
    if(!user){
      return NextResponse.json({ error: 'Unauthorized User' }, { status: 401 });
    }
    const isAdmin = isAdminUser(user);
    if(!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data: { id: string } = await req.json();
    if(!data.id) throw new Error();
    await deleteUserFromAuth(data.id);
    await deleteUser(data.id);
    
    return NextResponse.json({ status: 201 });

  }catch (error) {
    console.error("DeleteUser Error:", error)
    return NextResponse.json({ error: 'Internal Server Error' },{ status: 500 })
  }
}