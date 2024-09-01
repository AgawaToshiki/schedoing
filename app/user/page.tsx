import React from 'react'
import { getCurrentUser } from '../utils/auth';
import { getUser, isAdminUser } from '../utils/supabaseFunctions';
import { redirect } from 'next/navigation';
import Main from '../components/layouts/Main';
import RegisterUser from '../components/RegisterUser'
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
			<Main isAdmin={isAdmin} id={user.id}>
				<div className="mb-10">
					<SectionField sectionTitle="新規ユーザー登録">
						<RegisterUser />
					</SectionField>
				</div>
				<SectionField sectionTitle="ユーザー一覧">
					<AdminUserList />
				</SectionField>
			</Main>

    </>
  )
}

export default User