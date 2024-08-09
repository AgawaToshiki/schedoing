'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'


export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
	if (error || !user) {
		redirect('/login')
	}
  return user.id
}

export async function signIn(loginData: { email: string, password: string }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword(loginData);
  return { data, error }
}