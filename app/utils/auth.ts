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

// export async function signOut() {
//   const supabase = createClient();
//   const { data: { user }} = await supabase.auth.getUser();
//   if(user) {
//     const { error } = await supabase.auth.signOut();
//     if (error) throw new Error(error.message)
//   }
// }