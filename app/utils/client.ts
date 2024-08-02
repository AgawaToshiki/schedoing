import { createClient } from '@/utils/supabase/client'


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