import React from 'react'
import { getAllUser } from '../utils/supabase/supabaseFunctions';
import EditUserButton from '../components/EditUserButton';
import DeleteUserButton from '../components/DeleteUserButton';

const AdminUserList = async() => {
	const data = await getAllUser();

  return (
		<>
      <div className="relative max-w-[800px] h-full overflow-x-auto flex bg-white">
        <div className="absolute flex-grow h-full">
          <table className="w-full h-full overflow-y-auto border border-collapse">
            <thead className="h-full">
              <tr className="h-[50px]">
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
            <tbody className="h-full">
              {data?.map((user) => (
                <tr key={user.id} className="h-[50px]">
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
		</>
  )
}

export default AdminUserList