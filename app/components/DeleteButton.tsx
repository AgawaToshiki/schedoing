'use client'
import React from 'react'
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';
import { deleteUser } from "../actions/delete";

type Props = {
  id: string;
}

const DeleteButton = ({ id }: Props) => {
	const router = useRouter();
	const supabase = createClient();

  const handleDelete = async(id: string) => {
		await supabase
		.from('users')
		.delete()
		.eq('id', id)
		await deleteUser(id);
		router.push('/user');
	}
  return (
    <button className="p-1 border bg-red-400" onClick={ () => handleDelete(id) }>削除</button>
  )
}

export default DeleteButton