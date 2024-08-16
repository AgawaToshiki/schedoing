import React from 'react'
import { getAllUser } from '../utils/supabaseFunctions'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

const AdminUserList = async() => {
	const data = await getAllUser();

  return (
		<>
			<div>ユーザー一覧</div>
			<table>
				<thead>
					<tr className="border border-gray-400">
						<th className="px-4 py-2 text-left">権限</th>
						<th className="px-4 py-2 text-left">ユーザー名</th>
						<th className="px-4 py-2 text-left">Email</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((user) => (
						<tr key={user.id} className="border border-gray-400">
							<td className="px-4 py-2">{user.role}</td>
							<td className="px-4 py-2">{user.displayName}</td>
							<td className="px-4 py-2">{user.email}</td>
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