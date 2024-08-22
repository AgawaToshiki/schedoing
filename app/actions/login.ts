'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { signIn } from '../utils/auth'
import { updateStatus } from '../utils/supabaseFunctions';

export async function login(formData: FormData) {

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const loginData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  try {
    const result = await signIn(loginData);
    if(result.error || !result.data.user){
      console.error("Login Error", result.error);
      throw new Error(result.error?.message)
    }
    await updateStatus(result.data.user.id, 'online');

  } catch(error) {
    console.error("Login Error:", error);
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')

}