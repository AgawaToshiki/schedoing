'use server'
import { NextRequest, NextResponse } from "next/server";
import { updateStatus } from "@/app/utils/supabase/supabaseFunctions";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data: { id: string, status: string } = await req.json();

    if(!data.id) throw new Error("User not found");
    
    await updateStatus(data.id, data.status);

    return NextResponse.json({ status: 201 });

  }catch (error) {
    console.error("UpdateStatus Error:", error)
    return NextResponse.json({ error: 'Internal Server Error' },{ status: 500 })
  }

}