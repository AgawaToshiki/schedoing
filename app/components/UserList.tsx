import { createClient } from '@/utils/supabase/server'
import User from '../components/User'
import React from 'react'

const UserList = async() => {
	const supabase = createClient()
	const { data, error } = await supabase.from('users').select('id,displayName,role');

  return (
		<>
			<div>ユーザー一覧</div>
			{data?.map((user) => (
				<User key={user.id} user={user} />
			))}
		</>
  )
}

export default UserList