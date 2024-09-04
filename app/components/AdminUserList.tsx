import React from 'react'
import { getAllUser } from '../utils/supabase/supabaseFunctions';
import EditUserButton from '../components/EditUserButton';
import DeleteUserButton from '../components/DeleteUserButton';

const AdminUserList = async() => {
	const data = await getAllUser();

  return (
		<>
			<div className="overflow-x-auto">
				<table className="w-full border border-gray-200 shadow-md bg-white">
					<thead>
						<tr className="border border-gray-200">
							<th className="px-4 py-2 text-left">権限</th>
							<th className="px-4 py-2 text-left">ユーザー名</th>
							<th className="px-4 py-2 text-left">Email</th>
						</tr>
					</thead>
					<tbody>
						{data?.map((user) => (
							<tr key={user.id} className="border border-gray-200">
								<td className="px-4 py-2">{user.role}</td>
								<td className="px-4 py-2">{user.displayName}</td>
								<td className="px-4 py-2">{user.email}</td>
								<td className="flex gap-1.5 px-4 py-2">
									<EditUserButton user={user} />
									<DeleteUserButton id={user.id} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
  )
}

export default AdminUserList