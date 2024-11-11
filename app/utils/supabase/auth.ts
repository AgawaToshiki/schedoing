'use server'

import { createClient } from '@/utils/supabase/server'
import { User } from "@supabase/supabase-js";
import { APIError } from '@/app/utils/exceptions';


export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if(error) {
    if(error.status){
      throw new APIError(error.status, `${error.message}`);
    }
    throw new Error(error.message);
	}
  return user
}

export async function signIn(email: string, password: string): Promise<User | null> {
  const supabase = createClient();
  const loginData = { email, password };
  const { data: { user }, error } = await supabase.auth.signInWithPassword(loginData);
  if(error) {
    if(error.status){
      throw new APIError(error.status, `${error.message}`);
    }
    throw new Error(error.message);
	}
  return user
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`${error.status}:${error.message}`);
  }
}