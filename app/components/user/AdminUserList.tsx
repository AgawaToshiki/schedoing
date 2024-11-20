"use client"
import React, { useState } from 'react'
import EditUserElement from '../../components/user/EditUser';
import DeleteUserElement from '../../components/user/DeleteUser';
import { Database } from "../../../database.types";
import SearchUser from '../../components/SearchUser';
import FilterUser from '../../components/user/FilterUser';

type User = Database['public']['Tables']['users']['Row'];

type Props = {
  data: User[];
}

const AdminUserList = ({ data }: Props) => {

  const [searchName, setSearchName] = useState<string>("");
  
  const users = data?.filter(item => item.displayName.includes(searchName));

  return (
		<>
      <div className="flex items-center gap-4 mb-6">
        <SearchUser is_set={!!searchName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)} />
        <FilterUser />
      </div>
      <div className="w-full h-full overflow-x-auto flex bg-white">
        <div className="relative flex-grow h-full overflow-y-auto scrollbar">
          <table className="absolute w-full h-full border border-collapse">
            <thead>
              <tr>
                <th className="
                sticky top-0 z-20 min-w-[150px] px-4 py-2 bg-gray-100 border text-center whitespace-nowrap
                before:absolute before:top-[-1px] before:left-[-1px] before:w-full before:h-full before:border-t
                after:absolute after:z-10 after:left-0 after:bottom-[-1px] after:border-b after:w-full after:h-full
                ">
                  権限
                </th>
                <th className="
                sticky top-0 z-20 min-w-[250px] px-4 py-2 bg-gray-100 border text-center whitespace-nowrap
                before:absolute before:top-[-1px] before:left-[-1px] before:w-full before:h-full before:border-t
                after:absolute after:z-1 after:left-0 after:bottom-[-1px] after:border-b after:w-full after:h-full
                ">
                  ユーザー名
                </th>
                <th className="
                sticky top-0 z-20 min-w-[250px] px-4 py-2 bg-gray-100 border text-center whitespace-nowrap
                before:absolute before:top-[-1px] before:left-[-1px] before:w-full before:h-full before:border-t
                after:absolute after:z-10 after:left-0 after:bottom-[-1px] after:border-b after:w-full after:h-full
                ">
                  メールアドレス
                </th>
                <th className="
                sticky top-0 right-0 z-20 min-w-[150px] px-4 py-2 bg-gray-100 border text-center whitespace-nowrap
                before:absolute before:top-[-1px] before:right-[-1px] before:w-full before:h-full before:border-t before:border-r
                after:absolute after:z-10 after:left-[-1px] after:bottom-[-1px] after:border-l after:border-b after:w-full after:h-full
                ">
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border whitespace-nowrap">{user.role}</td>
                  <td className="px-4 py-2 border whitespace-nowrap">{user.displayName}</td>
                  <td className="px-4 py-2 border whitespace-nowrap">{user.email}</td>
                  <td className="
                  sticky right-0 z-10 px-4 py-2 border bg-white whitespace-nowrap
                  before:absolute before:z-10 before:top-[-1px] before:right-[-1px] before:w-full before:h-full before:border-r
                  after:absolute after:z-10 after:top-[-1px] after:left-[-1px] after:border-l after:w-full after:h-full
                  ">
                    <div className="relative z-50 flex justify-center items-center gap-2">
                      <EditUserElement user={user} />
                      <DeleteUserElement id={user.id} />
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