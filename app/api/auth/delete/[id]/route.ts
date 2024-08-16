import { deleteUser } from '@/app/utils/supabaseFunctions';
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { deleteUserFromAuth } from '@/app/utils/authAdmin';

export async function POST(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();
  try {
    if(!id) throw new Error();
    await deleteUserFromAuth(id);
    await deleteUser(id);
    revalidatePath('/user')
    return NextResponse.redirect(new URL('/user', req.url), {
      status: 302,
    })
  }catch (error) {
    console.error("DeleteUser Error:", error)
  }

}