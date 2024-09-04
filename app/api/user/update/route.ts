'use server'
import { NextRequest, NextResponse } from "next/server";
import { updateUserEmailFromAuth } from "@/app/utils/supabase/authAdmin";
import { updateUser } from "@/app/utils/supabase/supabaseFunctions";

export async function POST(req: NextRequest, res: NextResponse) {
  try {

    const data: { id: string, role: string, displayName: string, email: string } = await req.json();

    if(!data.id) throw new Error("User not found");
    
    await updateUser(data.id, data.role, data.displayName, data.email);
    await updateUserEmailFromAuth(data.id, data.email);

    return NextResponse.json({ status: 201 });

  }catch (error) {
    console.error("UpdateUser Error:", error)
    return NextResponse.json({ error: 'Internal Server Error' },{ status: 500 })
  }

}