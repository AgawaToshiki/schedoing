import { Database } from '../../database.types';

export type User = Database['public']['Tables']['users']['Row'];

export type UserWithSchedule = Pick<User, 'id' | 'displayName' | 'role'> & {
  schedules: Pick<Schedule, 'user_id' | 'id' | 'title' | 'description' | 'start_time' | 'end_time'>[] | null
}

type ScheduleByDatabase = Database['public']['Tables']['schedules']['Row'];
export type Schedule = Pick<ScheduleByDatabase, 'user_id' | 'id' | 'title' | 'description' | 'start_time' | 'end_time'>

export type Query ={
  searchName: string;
  filterRole: 'user' | 'admin' | "";
}

export type LoginValidation = {
  isValid: boolean;
  isValidEmail: boolean;
  isEmptyEmail: boolean;
  isValidPassword: boolean;
  isCheckPasswordLength: boolean;
  isEmptyPassword: boolean;
}
export type RegisterValidation = {
  isValid: boolean;
  isValidEmail: boolean;
  isEmptyEmail: boolean;
  isValidPassword: boolean;
  isCheckPasswordLength: boolean;
  isEmptyPassword: boolean;
  isEmptyDisplayName: boolean;
}
export type UpdateValidation = {
  isValid: boolean;
  isValidEmail: boolean;
  isEmptyEmail: boolean;
  isEmptyDisplayName: boolean;
  isSetRole: boolean;
}