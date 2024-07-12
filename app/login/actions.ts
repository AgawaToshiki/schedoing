'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const userData = {
    email: formData.get('email') as string,
    role: 'user',
  }

  const { error: signUpError } = await supabase.auth.signUp(data)

  if (signUpError) {
    console.log(signUpError.message);
    redirect('/error')
  }
  
  const { error: insertError } = await supabase.from('users').insert({ email: userData.email, role: userData.role })

  if (insertError) {
    console.log(insertError.message);
    redirect('/error')
  }


  revalidatePath('/', 'layout')
  redirect('/')
}