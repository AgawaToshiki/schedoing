import { supabase } from '../../lib/supabase';
import { Query, User, UserWithSchedule } from '../../types'


const initialQuery: Query = {
  search: "",
  role: "",
  create_time: ""
}

export async function getAllUser(query: Query = initialQuery): Promise<User[] | null> {

  const order = () => {
    if(query.create_time === 'asc'){
      return {
        sort: 'created_at',
        ascending: true
      }
    }
    if(query.create_time === 'desc'){
      return {
        sort: 'created_at',
        ascending: false
      }
    }
    return {
      sort: 'updated_at',
      ascending: false
    }
  }
  const { data, error } = await supabase
    .from('users')
    .select('id,created_at,email,role,displayName,status,updated_at,is_reset_schedules')
    .ilike('displayName', query.search ? `%${query.search}%` : '%%')
    .or(query.role ? `role.eq.${query.role}` : 'role.neq.null')
    .order(order().sort, {
      ascending: order().ascending
    })
  if(error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data
}

export async function getUser(id: string): Promise<User | null> {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if(error) {
    console.error(error);
    throw new Error(error.message);
  }

  return user
}

export async function registerUser(userId: string, email: string, displayName: string): Promise<void> {
  const { error } = await supabase
  .from('users')
  .insert({ 'id': userId, 'email': email, 'displayName': displayName, 'role': 'user', 'is_reset_schedules': true });
  if(error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function updateUser(userId: string, role: string, displayName: string, email: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ 'role': role, 'displayName': displayName, 'email': email })
    .eq('id', userId);

  if(error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function updateStatus(userId: string, status: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ 'status': status })
    .eq('id', userId);
  if(error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function updateSchedulesResetFlag(userId: string, resetFlag: boolean): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ 'is_reset_schedules': resetFlag })
    .eq('id', userId);
  if(error) {
    console.error(error);
    throw new Error(`updateFlagError:${error.message}`);
  }
}

export async function deleteUser(id: string) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
    if(error) {
      console.error(error);
      throw new Error(error.message);
    }
}

export async function getUserWithSchedules(id: string): Promise<UserWithSchedule | null> {
  const { data, error } = await supabase
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

  if(error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data
}


export async function getScheduleId(id: string): Promise<{ id: string } | null> {
  const { data, error } = await supabase
    .from('schedules')
    .select('id')
    .eq("id", id)
    .single();

  if(!data || error) {
    console.error('getScheduleError:', error);
    throw new Error(error.message);
  }
  
  return data
}

export async function registerSchedule(userId: string, title: string, description: string, startTime: Date, endTime: Date): Promise<void> {
  const { error } = await supabase
    .from('schedules')
    .insert({ 'user_id': userId, 'title': title, 'description': description, 'start_time': startTime, 'end_time': endTime })

  if(error) {
    console.error('registerScheduleError:', error);
    throw new Error(error.message);
  }
}

export async function updateSchedule(id: string, title: string, description: string, startTime: Date, endTime: Date): Promise<void> {
  const { error } = await supabase
    .from('schedules')
    .update({ 'title': title, 'description': description, 'start_time': startTime, 'end_time': endTime })
    .eq("id", id)
    .single()

  if(error) {
    console.error('updateScheduleError:', error);
    throw new Error(error.message);
  }
}

export async function deleteSchedule(id: string): Promise<void> {
  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq("id", id)
    .single()

  if(error) {
    console.error('deleteScheduleError:', error);
    throw new Error(error.message);
  }
}