'use server'
import { NextRequest, NextResponse } from "next/server";
import { getUser, updateStatus } from "@/app/utils/supabase/supabaseFunctions";
import { getCurrentUser } from "@/app/utils/supabase/auth";

export async function POST(req: NextRequest, res: NextResponse) {
  try {

    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      return NextResponse.json({ error: 'Unauthorized User' }, { status: 401 });
    }
    const user = await getUser(authUser.id);
    if(!user){
      return NextResponse.json({ error: 'Unauthorized User' }, { status: 401 });
    }
    
    const data: { id: string, status: string } = await req.json();

    if(!data.id) throw new Error("User not found");
    
    await updateStatus(data.id, data.status);

    return NextResponse.json({ status: 201 });

  }catch (error) {
    console.error("UpdateStatus Error:", error)
    return NextResponse.json({ error: 'Internal Server Error' },{ status: 500 })
  }

}