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

export async function updateStatus(userId: string, status: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('users')
    .update({ status: status })
    .eq('id', userId);
  if(error) {
    console.error('Error updating status:', error);
  }
}