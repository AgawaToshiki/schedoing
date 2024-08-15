import React from 'react'
import Register from '../components/Register'
import AdminUserList from '../components/AdminUserList'
import { getCurrentUser } from '../utils/auth';
import { isAdmin } from '../utils/supabaseFunctions';



const User = async() => {
	const userId = await getCurrentUser();
	await isAdmin(userId);

		return (
    <>
			<div className="w-full">
				<div className="mb-10">
					<Register />
				</div>
				<div>
					<AdminUserList />
				</div>
			</div>

    </>
  )
}

export default User