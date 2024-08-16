import { createClient } from '@/utils/supabase/server'
import { updateStatus } from '@/app/utils/supabaseFunctions';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/auth';


export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const user = await getCurrentUser();
    if(!user || !user.id){
      redirect('/login')
    }
    await supabase.auth.signOut();

    await updateStatus(user.id, 'offline');
  
    revalidatePath('/', 'layout')
    return NextResponse.redirect(new URL('/login', req.url), {
      status: 302,
    })
  }catch (error) {
    console.error("SignOut Error:", error)
  }

}