import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getAllUser, getUser } from '../../utils/supabase/supabaseFunctions';
import RegisterUser from '../../components/user/RegisterUser'
import AdminUserList from '../../components/user/AdminUserList'
import SectionField from '../../components/layouts/SectionField';
import Loading from '../../components/layouts/Loading';
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { isAdminUser } from '@/app/utils/validation';


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

	const GetUserList = async() => {

		const data = await getAllUser();
		if(!data) {
			throw new Error("User does not exist");
		}
		return (
			<>
				<AdminUserList data={data} />
			</>
		)
	}

	return (
		<>
			<div className="mb-6">
				<SectionField sectionTitle="新規ユーザー登録">
					<RegisterUser />
				</SectionField>
			</div>
			<SectionField sectionTitle="ユーザー一覧">
				<Suspense fallback={<Loading />}>
					<GetUserList />
				</Suspense>
			</SectionField>
		</>
	)
}

export default User