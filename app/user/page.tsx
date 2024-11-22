import React from 'react'
import { getCurrentUser } from '../utils/supabase/auth';
import { getAllUser, getUser } from '../utils/supabase/supabaseFunctions';
import { isAdminUser } from '../utils/validation';
import { redirect } from 'next/navigation';
import Main from '../components/layouts/Main';
import RegisterUser from '../components/user/RegisterUser'
import AdminUserList from '../components/user/AdminUserList'
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

	const data = await getAllUser();
  if(!data) {
    throw new Error("User does not exist");
  }

	return (
		<>
			<Main isAdmin={isAdmin} id={user.id}>
				<div className="mb-6">
					<SectionField sectionTitle="新規ユーザー登録">
						<RegisterUser />
					</SectionField>
				</div>
				<SectionField sectionTitle="ユーザー一覧">
					<AdminUserList data={data} />
				</SectionField>
			</Main>
		</>
	)
}

export default User