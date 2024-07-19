'use client'
import React from 'react'
import { createClient } from "@/utils/supabase/client";
import { redirect } from 'next/navigation'


const SignOut = () => {
	const supabase = createClient()
  const signOut = async() => {
    const { error } = await supabase.auth.signOut()
		if (error) throw new Error(error.message)
		redirect("/login")
  }
  return (
    <>
      <button onClick={ signOut }>サインアウト</button>
    </>
  );
}

export default SignOut