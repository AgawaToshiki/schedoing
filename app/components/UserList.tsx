import { createClient } from '@/utils/supabase/server'
import React from 'react'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

const UserList = async() => {
	const supabase = createClient()
	const { data, error } = await supabase.from('users').select('id,created_at,email,role,displayName');

  return (
		<>
			<div>ユーザー一覧</div>
			<table>
				<thead>
					<tr>
						<th>権限</th>
						<th>ユーザー名</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((user) => (
						<tr key={user.id}>
							<td>{user.role}</td>
							<td>{user.displayName}</td>
							<td>{user.email}</td>
							<td>
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

export default UserList