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
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`${error.status}:${error.message}`);
  }
  
  await updateStatus(user.id, 'offline');

  revalidatePath('/', 'layout');
  redirect('/login');
}