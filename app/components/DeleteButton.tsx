import React from 'react'


type Props = {
  id: string;
}

const DeleteButton = ({ id }: Props) => {

  return (
		<>
			<form action={`../api/auth/delete/${id}`} method="post">
				<button className="p-1 border bg-red-400">削除</button>
			</form>
		</>

  )
}

export default DeleteButton