'use server'
import { NextRequest, NextResponse } from "next/server";
import { deleteUserFromAuth } from "@/app/utils/authAdmin";
import { deleteUser } from "@/app/utils/supabaseFunctions";


export async function POST(req: NextRequest, res: NextResponse) {
  try {
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