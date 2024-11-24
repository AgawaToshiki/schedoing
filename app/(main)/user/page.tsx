import React from 'react';
import { getAllUser } from '../../utils/supabase/supabaseFunctions';
import RegisterUser from '../../components/user/RegisterUser'
import AdminUserList from '../../components/user/AdminUserList'
import SectionField from '../../components/layouts/SectionField';


const User = async() => {

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
			<SectionField sectionTitle="ユーザー一覧">
				<AdminUserList data={data} />
			</SectionField>
		</>
	)
}

export default User