'use server'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "../utils/supabase/auth";
import { updateStatus } from '../utils/supabase/supabaseFunctions';

export const signOut = async() => {
  const supabase = createClient();
  const user = await getCurrentUser();
  if(!user || !user.id){
    redirect('/login')
  }
  const { error: signOutError } = await supabase.auth.signOut();

  if (signOutError) {
    console.log(signOutError.message);
    throw new Error(`サインアウトエラー：${signOutError.message}`);
  }
  
  await updateStatus(user.id, 'offline');

  revalidatePath('/', 'layout')
  redirect('/')
}