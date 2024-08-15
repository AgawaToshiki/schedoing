import React from 'react'
import { getCurrentUser } from '../../utils/auth';
import { isAdminUser } from '../../utils/supabaseFunctions';
import { redirect } from 'next/navigation';
import Register from '../../components/Register'
import AdminUserList from '../../components/AdminUserList'



const User = async() => {
	const userId = await getCurrentUser();
	if(!userId){
		redirect('/login')
	}
	const isAdmin = await isAdminUser(userId);
	if(!isAdmin) {
		redirect('/')
	}

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