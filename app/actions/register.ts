'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { isAdminUser, registerFormValidation } from '../utils/validation'
import { getUser } from '../utils/supabase/supabaseFunctions'
import { getCurrentUser } from '../utils/supabase/auth'

export async function createUser(formData: FormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;

  if (!supabaseUrl || !supabaseServiceRole) {
    throw new Error();
  }
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  })

  const registerData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    email_confirm: true
  }

  const userData = {
    displayName: formData.get('displayName') as string,
    role: 'user',
  }

  const authUser = await getCurrentUser();
  if(!authUser || !authUser.id){
    throw new Error('401:Unauthorized user');
  }
  const userInfo = await getUser(authUser.id);
  if(!userInfo){
    throw new Error('401:Unauthorized user');
  }
  const isAdmin = isAdminUser(userInfo);
  if(!isAdmin) {
    throw new Error('403:Permission denied');
  }

  const isValid = registerFormValidation(registerData.email, registerData.password, userData.displayName);
  if(!isValid) {
    return { error: true, message: "Invalid data" }
  }

  const { data: { user }, error: signUpError } = await supabaseAdmin.auth.admin.createUser(registerData);

  if (signUpError) {
    console.error(signUpError.message);
    throw new Error(`signUpError:${signUpError.message}`);
  }
  
  const { error: insertError } = await supabase.from('users').insert({ id: user?.id, email: registerData.email, displayName: userData.displayName, role: userData.role });

  if (insertError) {
    console.error(insertError.message);
    throw new Error(`signUpError:${insertError.message}`);
  }

  redirect('/user')
}