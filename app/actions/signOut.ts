'use server'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "../utils/auth";
import { updateStatus } from '../utils/supabaseFunctions';

export const handleSignOut = async() => {
  try {
    const supabase = createClient();
    const user = await getCurrentUser();
    if(!user || !user.id){
      redirect('/login')
    }
    await supabase.auth.signOut();

    await updateStatus(user.id, 'offline');

  }catch (error) {
    console.error("SignOut Error:", error)
  }
  revalidatePath('/', 'layout')
  redirect('/')
}