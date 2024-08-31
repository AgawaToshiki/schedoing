import React from 'react'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { updateStatus } from '../utils/supabaseFunctions';
import { createClient } from '@/utils/supabase/server';
import { getCurrentUser } from '../utils/auth';
import Button from '../components/elements/button/Button';


const SignOutButton = () => {

  const handleSignOut = async() => {
    'use server'
    try {
      const supabase = createClient();
      const user = await getCurrentUser();
      if(!user || !user.id){
        redirect('/login')
      }
      await supabase.auth.signOut();
  
      await updateStatus(user.id, 'offline');

    }catch (error) {
      console.error("SignOut Error:", error)
    }
    revalidatePath('/', 'layout')
    redirect('/')
  }
  
  return (
    <>
      <form action={handleSignOut}>
        <Button
          variant="danger"
          size="medium"
          attrs={
            { type: "submit" }
          }
        >
          サインアウト
        </Button>
      </form>
    </>
  );
}

export default SignOutButton