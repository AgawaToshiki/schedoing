'use client'
import React from 'react'
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';


const SignOut = () => {
	const supabase = createClient();
	const router = useRouter();

  const signOut = async() => {
    const { error } = await supabase.auth.signOut()
		if (error) throw new Error(error.message)
		router.push("/login")
  }
  return (
    <>
      <button onClick={ signOut }>サインアウト</button>
    </>
  );
}

export default SignOut