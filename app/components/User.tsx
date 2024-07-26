'use client'
import { createClient } from "@/utils/supabase/client";
import { deleteUser } from "../actions/delete";
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
	user: {
		id: string;
		displayName: string;
		role: string;
	}
}

const User = ({ user }: Props) => {
	const router = useRouter();
	const supabase = createClient();

	const handleEdit = (id: string) => {

	}

	const handleDelete = async(id: string) => {
		await supabase
		.from('users')
		.delete()
		.eq('id', id)
		await deleteUser(id);
		router.push('/user');
	}
  return (
		<>
			<div className="flex">
				<div>
					{user.displayName}
				</div>
				<div>
					{user.role}
				</div>
				<button onClick={ () => handleEdit(user.id) }>編集</button>
				<button onClick={ () => handleDelete(user.id) }>削除</button>
			</div>
		</>
  )
}

export default User