import { supabase } from '../lib/supabase';
import { redirect } from 'next/navigation'


export async function getAllUser() {
  const { data, error } = await supabase
    .from('users')
    .select('id,created_at,email,role,displayName');
  if(error) {
    console.error('Error getUsers:', error);
  }
  return data
}

export async function updateStatus(userId: string, status: string) {
  const { error } = await supabase
    .from('users')
    .update({ status: status })
    .eq('id', userId);
  if(error) {
    console.error('Error updating status:', error);
  }
}

export async function checkRole(id: string) {
  const { data: roleData } = await supabase
    .from("users")
    .select('role')
    .eq('id', id)
    .single();
	if(!roleData || roleData.role !== 'admin'){
			redirect('/')
	}
}

export async function deleteUser(id: string) {
  await supabase
    .from('users')
    .delete()
    .eq('id', id);
}