import { Database } from '../../../database.types';
import { supabase } from '../../lib/supabase';


type User = Database['public']['Tables']['users']['Row'];
type Schedule = Database['public']['Tables']['schedules']['Row'];

type UserWithSchedule = Pick<User, 'id' | 'displayName' | 'role'> & {
  schedules: Pick<Schedule, 'user_id' | 'id' | 'title' | 'description' | 'start_time' | 'end_time'>[] | null
 }

export async function getAllUser(): Promise<User[] | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id,created_at,email,role,displayName,status,updated_at');
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

export async function updateUser(userId: string, role: string, displayName: string, email: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ 'role': role, 'displayName': displayName, 'email': email })
    .eq('id', userId);

  if(error) {
    console.error('Error updating user:', error);
  }
}

export async function updateStatus(userId: string, status: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ 'status': status })
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

export async function getSchedule(id: string): Promise<UserWithSchedule | null> {
  const {data, error} = await supabase
    .from('users')
    .select(`
      id,
      displayName,
      role,
      schedules (
        user_id,
        id,
        title,
        description,
        start_time,
        end_time
      )      
    `)
    .eq("id", id)
    .single();

  if(!data || error) {
    console.error('Error getSchedule:', error);
  }

  return data
}

export async function registerSchedule(userId: string, title: string, description: string, startTime: Date, endTime: Date): Promise<void> {
  const { error } = await supabase
    .from('schedules')
    .insert({ 'user_id': userId, 'title': title, 'description': description, 'start_time': startTime, 'end_time': endTime })

  if(error) {
    console.error(error);
  }
}

export async function updateSchedule(id: string, title: string, description: string, startTime: Date, endTime: Date): Promise<void> {
  const { error } = await supabase
    .from('schedules')
    .update({ 'title': title, 'description': description, 'start_time': startTime, 'end_time': endTime })
    .eq("id", id)
    .single()

  if(error) {
    console.error(error);
  }
}

export async function deleteSchedule(id: string): Promise<void> {
  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq("id", id)
    .single()

  if(error) {
    console.error(error);
  }
}

export async function deleteAllSchedule(): Promise<void> {
  const { error } = await supabase
    .from('schedules')
    .delete()

  if(error) {
    console.error(error);
  }
}