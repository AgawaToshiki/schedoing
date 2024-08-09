import { createClient } from '@/utils/supabase/server'
import { updateStatus } from '@/app/utils/supabaseFunctions';
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/auth';

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const userId = await getCurrentUser()
    await supabase.auth.signOut();

    await updateStatus(userId, 'offline');
  
    revalidatePath('/', 'layout')
    return NextResponse.redirect(new URL('/login', req.url), {
      status: 302,
    })
  }catch (error) {
    console.error("SignOut Error:", error)
  }

}