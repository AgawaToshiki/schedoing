'use server'

import { createClient } from '@/utils/supabase/server'
import { User } from "@supabase/supabase-js";


export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
	if (error || !user) {
		return null
	}
  return user
}

export async function signIn(loginData: { email: string, password: string }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword(loginData);
  return { data, error }
}