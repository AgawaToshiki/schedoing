'use client'
import React from 'react'
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';
import { updateStatus } from '../utils/client';

type Props = {
  id: string;
}

const SignOut = ({id}: Props) => {
	const supabase = createClient();
	const router = useRouter();

  const signOut = async() => {
    const { error } = await supabase.auth.signOut();
    await updateStatus(id, 'offline');
		if (error) throw new Error(error.message)
		router.push("/login")
  }
  return (
    <>
      <button className="p-1 border bg-red-400" onClick={ signOut }>サインアウト</button>
    </>
  );
}

export default SignOut