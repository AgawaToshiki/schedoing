import React from 'react'
import { deleteUserFromAuth } from '../utils/authAdmin';
import { deleteUser } from '../utils/supabaseFunctions';


type Props = {
  id: string;
}

const DeleteButton = ({ id }: Props) => {
  // const handleDelete = async(id: string) => {
	// 	try {
	// 		await deleteUserFromAuth(id);
	// 		await deleteUser(id);
	// 		router.push('/user');
	// 	}catch(error) {
	// 		console.error(error);
	// 	}
	// }
  return (
    // <button className="p-1 border bg-red-400" onClick={ () => handleDelete(id) }>削除</button>
		<form action={`../auth/delete/${id}`} method="post">
			<button className="p-1 border bg-red-400">削除</button>
		</form>
  )
}

export default DeleteButton