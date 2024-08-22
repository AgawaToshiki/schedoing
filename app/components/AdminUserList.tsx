import React from 'react'
import { getAllUser } from '../utils/supabaseFunctions'
import EditButton from '../components/elements/EditButton'
import DeleteButton from '../components/elements/DeleteButton'

const AdminUserList = async() => {
	const data = await getAllUser();

  return (
		<>
			<table className="border border-gray-200 shadow-md bg-white">
				<thead>
					<tr className="border border-gray-200">
						<th className="px-4 py-2 text-left w-[100px]">権限</th>
						<th className="px-4 py-2 text-left min-w-[300px]">ユーザー名</th>
						<th className="px-4 py-2 text-left min-w-[300px]">Email</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((user) => (
						<tr key={user.id} className="border border-gray-200">
							<td className="px-4 py-2 w-[100px]">{user.role}</td>
							<td className="px-4 py-2 min-w-[300px]">{user.displayName}</td>
							<td className="px-4 py-2 min-w-[300px]">{user.email}</td>
							<td className="flex px-4 py-2">
								<EditButton id={user.id} />
								<DeleteButton id={user.id} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
  )
}

export default AdminUserList