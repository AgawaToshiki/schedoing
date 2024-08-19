import React from 'react'
import { deleteUserFromAuth } from '../utils/authAdmin';
import { deleteUser } from '../utils/supabaseFunctions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type Props = {
  id: string;
}

const DeleteButton = ({ id }: Props) => {

	const handleDelete = async() => {
		'use server'
		try {
			if(!id) throw new Error();
			await deleteUserFromAuth(id);
			await deleteUser(id);
		}catch (error) {
			console.error("DeleteUser Error:", error)
		}
		revalidatePath('/user')
		redirect('/user')
	}

  return (
		<>
			<form action={handleDelete}>
				<button className="p-1 border bg-red-400">削除</button>
			</form>
		</>

  )
}

export default DeleteButton