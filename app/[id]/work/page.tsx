import React from 'react'
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { getAllUser, getUser, isAdminUser } from '@/app/utils/supabase/supabaseFunctions';
import Main from '../../components/layouts/Main';
import SectionField from '../../components/layouts/SectionField';
import EditUserButton from '../../components/EditUserButton';
import DeleteUserButton from '../../components/DeleteUserButton';

const page = async() => {

  const authUser = await getCurrentUser();
  if(!authUser || !authUser.id){
		redirect('/login')
	}
  const user = await getUser(authUser.id);
	if(!user){
    redirect('/login')
  }
  const data = await getAllUser();
	const isAdmin = isAdminUser(user);
	if(!isAdmin) {
		redirect('/')
	}
  return (
    <Main isAdmin={isAdmin} id={user.id}>
      <SectionField sectionTitle="ユーザー一覧">
        <div className="max-w-[800px] flex bg-white">
          <div className="flex-grow overflow-x-auto">
            <table className="w-full border border-collapse">
              <thead>
                <tr className="h-14">
                  <th className="min-w-[150px] px-4 py-2 border text-left whitespace-nowrap">権限</th>
                  <th className="min-w-[250px] px-4 py-2 border text-left whitespace-nowrap">ユーザー名</th>
                  <th className="min-w-[250px] px-4 py-2 border text-left whitespace-nowrap">メールアドレス</th>
                  <th className="sticky right-0 min-w-[150px] px-4 py-2 border bg-white text-left whitespace-nowrap"></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((user) => (
                  <tr key={user.id} className="h-14">
                    <td className="px-4 py-2 border whitespace-nowrap">{user.role}</td>
                    <td className="px-4 py-2 border whitespace-nowrap">{user.displayName}</td>
                    <td className="px-4 py-2 border whitespace-nowrap">{user.email}</td>
                    <td className="sticky right-0 px-4 py-2 border bg-white whitespace-nowrap">
                      <div className="flex gap-1.5">
                        <EditUserButton user={user} />
                        <DeleteUserButton id={user.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionField>
    </Main>
  )
}

export default page