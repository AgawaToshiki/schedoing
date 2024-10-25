'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { signIn } from '../utils/supabase/auth'
import { updateStatus } from '../utils/supabase/supabaseFunctions';
import { formValidation } from '../utils/validation';
import { error } from 'console';

export async function login(formData: FormData) {

  const loginData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { loginFormValidation } = formValidation();
  const isValid = loginFormValidation(loginData.email, loginData.password);
  if(!isValid) {
    return { error: true, message: "不正な入力値です" }
  }
  
  const result = await signIn(loginData);
  if(result.error){
    throw new Error(`ログインエラー：${result.error.message}`);
  }
  if(!result.data.user){
    throw new Error("存在しないユーザーです");
  }
  await updateStatus(result.data.user.id, 'online');

  revalidatePath('/', 'layout')
  redirect('/')

}