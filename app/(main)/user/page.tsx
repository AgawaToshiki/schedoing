import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getAllUser, getUser } from '../../utils/supabase/supabaseFunctions';
import RegisterUser from '../../components/user/RegisterUser'
import AdminUserList from '../../components/user/AdminUserList'
import SectionField from '../../components/layouts/SectionField';
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { isAdminUser } from '@/app/utils/validation';
import Loading from '@/app/loading';


const UserList = async() => {
	const data = await getAllUser();
	if(!data) {
		throw new Error("User does not exist");
	}

	return (
		<>
			<SectionField sectionTitle="ユーザー一覧">
				<AdminUserList data={data} />
			</SectionField>
		</>
	)
}


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
			<div className="mb-6">
				<SectionField sectionTitle="新規ユーザー登録">
					<RegisterUser />
				</SectionField>
			</div>
			{/* <SectionField sectionTitle="ユーザー一覧">
				<AdminUserList data={data} />
			</SectionField> */}
			<Suspense fallback={<Loading />}>
				<UserList />
			</Suspense>
		</>
	)
}

export default User