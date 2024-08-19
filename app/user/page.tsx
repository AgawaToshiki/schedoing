import React from 'react'
import { getCurrentUser } from '../utils/auth';
import { getUser, isAdminUser } from '../utils/supabaseFunctions';
import { redirect } from 'next/navigation';
import Main from '../components/layouts/Main';
import Register from '../components/Register'
import AdminUserList from '../components/AdminUserList'
import SectionField from '../components/layouts/SectionField';


const User = async() => {
  const authUser = await getCurrentUser();
  if(!authUser || !authUser.id){
		redirect('/login')
	}
  const user = await getUser(authUser.id);
	if(!user){
    redirect('/login')
  }
	const isAdmin = isAdminUser(user);
	if(!isAdmin) {
		redirect('/')
	}

		return (
    <>
			<Main isAdmin={isAdmin}>
				<div className="mb-10">
					<SectionField>
						<div className="mb-6">
							<h2>新規ユーザー登録</h2>
						</div>
						<Register />
					</SectionField>
				</div>
				<SectionField>
					<div className="mb-6">
						<h2>ユーザー一覧</h2>
					</div>
					<AdminUserList />
				</SectionField>
			</Main>

    </>
  )
}

export default User