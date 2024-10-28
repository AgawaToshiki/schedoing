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
    throw new Error(`signOutError: ${signOutError.message}`);
  }
  
  await updateStatus(user.id, 'offline');

  revalidatePath('/', 'layout')
  redirect('/')
}