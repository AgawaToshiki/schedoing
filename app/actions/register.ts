'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { registerFormValidation } from '../utils/validation'
import { getUser, isAdminUser } from '../utils/supabase/supabaseFunctions'
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
    throw new Error('401:Unauthorized User');
  }
  const userInfo = await getUser(authUser.id);
  if(!userInfo){
    throw new Error('401:Unauthorized User');
  }
  const isAdmin = isAdminUser(userInfo);
  if(!isAdmin) {
    throw new Error('Forbidden: Operation denied');
  }

  const isValid = registerFormValidation(registerData.email, registerData.password, userData.displayName);
  if(!isValid) {
    return { error: true, message: "不正な入力値です" }
  }

  const { data: { user }, error: signUpError } = await supabaseAdmin.auth.admin.createUser(registerData)

  if (signUpError) {
    console.error(signUpError.message);
    throw new Error(`ユーザー登録エラー：${signUpError.message}`);
  }
  
  const { error: insertError } = await supabase.from('users').insert({ id: user?.id, email: registerData.email, displayName: userData.displayName, role: userData.role })

  if (insertError) {
    console.error(insertError.message);
    throw new Error(`ユーザー登録エラー：${insertError.message}`);
  }

  redirect('/user')
}