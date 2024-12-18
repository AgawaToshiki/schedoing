import React from 'react'
import EditUserElement from '../../components/user/EditUser';
import DeleteUserElement from '../../components/user/DeleteUser';
import SearchUser from '../../components/user/SearchUser';
import FilterUser from '../../components/user/FilterUser';
import MobileManageUser from '../../components/user/MobileManageUser';
import { getAllUser } from '@/app/utils/supabase/supabaseFunctions';
import { Query } from '@/app/types';

type Props = {
  query: Query;
}

const AdminUserList = async({ query }: Props) => {
  const data = await getAllUser(query);
  if(!data) {
    throw new Error("User does not exist");
  }

  return (
		<>
      <div className="flex items-center gap-4 mb-6 max-md:mb-4 max-md:gap-2">
        <SearchUser query={query.search}/>
        <FilterUser query={{ role: query.role, create_time: query.create_time }}/>
      </div>
      {!!data?.length && (
        <div className="w-full h-full overflow-x-auto overscroll-x-none scrollbar flex bg-white">
          <div className="relative flex-grow h-full overflow-y-auto overscroll-y-none scrollbar">
            <table className="absolute w-full h-full border border-collapse">
              <thead>
                <tr>
                  <th className="
                    sticky top-0 z-20 min-w-[150px] px-4 py-2 bg-gray-100 border text-center whitespace-nowrap
                    before:absolute before:top-[-1px] before:left-[-1px] before:w-full before:h-full before:border-t
                    after:absolute after:z-10 after:left-0 after:bottom-[-1px] after:border-b after:w-full after:h-full
                    max-md:px-2 max-md:py-1 max-md:min-w-[50px]
                  ">
                    権限
                  </th>
                  <th className="
                    sticky top-0 z-20 min-w-[250px] px-4 py-2 bg-gray-100 border text-center whitespace-nowrap
                    before:absolute before:top-[-1px] before:left-[-1px] before:w-full before:h-full before:border-t
                    after:absolute after:z-1 after:left-0 after:bottom-[-1px] after:border-b after:w-full after:h-full
                    max-md:px-2 max-md:py-1 max-md:min-w-[100px]
                  ">
                    ユーザー名
                  </th>
                  <th className="
                    sticky top-0 z-20 min-w-[250px] px-4 py-2 bg-gray-100 border text-center whitespace-nowrap
                    before:absolute before:top-[-1px] before:left-[-1px] before:w-full before:h-full before:border-t
                    after:absolute after:z-10 after:left-0 after:bottom-[-1px] after:border-b after:w-full after:h-full
                    max-md:px-2 max-md:py-1
                  ">
                    メールアドレス
                  </th>
                  <th className="
                    sticky top-0 right-0 z-20 min-w-[150px] px-4 py-2 bg-gray-100 border text-center whitespace-nowrap
                    before:absolute before:top-[-1px] before:right-[-1px] before:w-full before:h-full before:border-t before:border-r
                    after:absolute after:z-10 after:left-[-1px] after:bottom-[-1px] after:border-l after:border-b after:w-full after:h-full
                    max-md:px-2 max-md:py-1 max-md:min-w-[10px]
                  ">
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-2 border whitespace-nowrap max-md:px-2 max-md:py-1">{user.role}</td>
                    <td className="px-4 py-2 border whitespace-nowrap max-md:px-2 max-md:py-1">{user.displayName}</td>
                    <td className="px-4 py-2 border whitespace-nowrap max-md:px-2 max-md:py-1">{user.email}</td>
                    <td className="
                      sticky right-0 z-10 px-4 py-2 border bg-white whitespace-nowrap
                      before:absolute before:z-10 before:top-[-1px] before:right-[-1px] before:w-full before:h-full before:border-r
                      after:absolute after:z-10 after:top-[-1px] after:left-[-1px] after:border-l after:w-full after:h-full
                      max-md:px-2 max-md:py-1
                    ">
                      <div className="relative z-50 flex justify-center items-center gap-2 max-md:hidden">
                        <EditUserElement user={user} />
                        <DeleteUserElement id={user.id} />
                      </div>
                      <div className="hidden max-md:flex max-md:justify-center max-md:items-center">
                        <MobileManageUser user={user} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {data?.length === 0 && (
        <div>
          <div>ユーザーが見つかりません。</div>
          <div>検索ワードやフィルターの条件を確認してください。</div>
        </div>
      )}
		</>
  )
}

export default AdminUserList