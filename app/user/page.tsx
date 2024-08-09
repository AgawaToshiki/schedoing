import React from 'react'
import Register from '../components/Register'
import UserList from '../components/UserList'
import { getCurrentUser } from '../utils/auth';
import { checkRole } from '../utils/supabaseFunctions';



const User = async() => {
	const userId = await getCurrentUser();
	await checkRole(userId);

		return (
    <>
			<div className="w-full">
				<div className="mb-10">
					<Register />
				</div>
				<div>
					<UserList />
				</div>
			</div>

    </>
  )
}

export default User