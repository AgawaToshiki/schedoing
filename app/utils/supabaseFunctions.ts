import { Database } from '../../database.types';
import { supabase } from '../lib/supabase';


type User = Database['public']['Tables']['users']['Row'];

export async function getAllUser(): Promise<User[] | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id,created_at,email,role,displayName,status');
  if(error) {
    console.error('Error getUsers:', error);
  }
  return data
}

export async function getUser(id: string): Promise<User | null> {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if(error || !user) {
    console.error("Error fetching user:", error);
    return null
  }

  return user
}

export function isAdminUser(user: User | null): boolean {
  if (user && user.role === "admin") {
    return true;
  }
  return false;
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

export async function deleteUser(id: string) {
  await supabase
    .from('users')
    .delete()
    .eq('id', id);
}

export async function getSchedule(id: string) {
  const {data, error} = await supabase
    .from('users')
    .select(`
      id,
      displayName,
      role,
      schedules (
        id,
        title
      )      
    `)
    .eq("id", id)
    .single();

  if(error) {
    console.error('Error getSchedule:', error);
  }

  return data
}