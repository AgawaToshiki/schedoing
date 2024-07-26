import React from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Register from '../components/Register'
import UserList from '../components/UserList'


const User = async() => {
	const supabase = createClient()
	const { data: { user }, error } = await supabase.auth.getUser();
	if (error || !user) {
			redirect('/login')
	}

	const { data: roleData } = await supabase.from("users").select('role').eq('id', user?.id).single();
	if(!roleData || roleData.role !== 'admin'){
			redirect('/')
	}
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