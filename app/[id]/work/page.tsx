import React from 'react'
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { getAllUser, getUser } from '@/app/utils/supabase/supabaseFunctions';
import { isAdminUser } from '@/app/utils/validation';
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
        <div className="max-w-[800px] h-full flex bg-white">
          <div className="flex-grow overflow-x-auto h-full overflow-y-scroll">
            <table className="w-full h-[200%] border border-collapse">
              <thead>
                <tr>
                  <th className="
                  sticky top-0 z-20 min-w-[150px] px-4 py-2 bg-gray-100 border text-left whitespace-nowrap
                  before:absolute before:top-[-1px] before:left-[-1px] before:w-full before:h-full before:border-t
                  ">
                    権限
                  </th>
                  <th className="
                  sticky top-0 z-20 min-w-[250px] px-4 py-2 bg-gray-100 border text-left whitespace-nowrap
                  before:absolute before:top-[-1px] before:left-[-1px] before:w-full before:h-full before:border-t
                  ">
                    ユーザー名
                  </th>
                  <th className="
                  sticky top-0 z-20 min-w-[250px] px-4 py-2 bg-gray-100 border text-left whitespace-nowrap
                  before:absolute before:top-[-1px] before:left-[-1px] before:w-full before:h-full before:border-t
                  ">
                    メールアドレス
                  </th>
                  <th className="
                  sticky top-0 right-0 z-20 min-w-[150px] px-4 py-2 bg-gray-100 border text-left whitespace-nowrap
                  before:absolute before:top-[-1px] before:right-[-1px] before:w-full before:h-full before:border-t before:border-r
                  ">
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-2 border whitespace-nowrap">{user.role}</td>
                    <td className="px-4 py-2 border whitespace-nowrap">{user.displayName}</td>
                    <td className="px-4 py-2 border whitespace-nowrap">{user.email}</td>
                    <td className="
                    sticky right-0 z-10 px-4 py-2 border bg-white whitespace-nowrap
                    before:absolute before:z-10 before:top-[-1px] before:right-[-1px] before:w-full before:h-full before:border-r
                    ">
                      <div className="relative z-50 flex justify-center items-center gap-2">
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