import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getUser } from '../../utils/supabase/supabaseFunctions';
import RegisterUser from '../../components/user/RegisterUser'
import AdminUserList from '../../components/user/AdminUserList'
import SectionField from '../../components/layouts/SectionField';
import Loading from '../../components/layouts/Loading';
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { isAdminUser } from '@/app/utils/functions';
import { Query } from '@/app/types';


const User = async({ searchParams }: { searchParams: Query }) => {

	const query = {
		search: searchParams.search,
		role: searchParams.role,
		create_time: searchParams.create_time
	}

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
			<div className="mb-6 max-md:mb-4">
				<SectionField sectionTitle="新規ユーザー登録">
					<RegisterUser />
				</SectionField>
			</div>
			<SectionField sectionTitle="ユーザー一覧">
				<Suspense fallback={<Loading />}>
					<AdminUserList query={query}/>
				</Suspense>
			</SectionField>
		</>
	)
}

export default User