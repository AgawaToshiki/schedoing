'use client'
import { useState } from "react";
import { useRealtimeListener } from "../../hooks/useRealtimeListener";
import Link from "next/link";
import { Database } from "../../../database.types";
import SearchUser from '../../components/SearchUser';


type User = Database['public']['Tables']['users']['Row'];

type Props = {
  data: User[]
  userId: string
}

const UserList = ({ data, userId }: Props) => {

  const [searchName, setSearchName] = useState<string>("");

  const usersList = useRealtimeListener<User>({
    table: 'users',
    defaultData: data,
    isValidData: (obj: any): obj is User => {
      return (
        typeof obj.created_at === 'string' &&
        typeof obj.displayName === 'string' &&
        typeof obj.email === 'string' &&
        typeof obj.title === 'string' &&
        typeof obj.id === 'string' &&
        typeof obj.role === 'string' &&
        typeof obj.status === 'string'
      );
    }
  })

  const filterUserList = usersList?.filter(item => item.id !== userId && item.displayName.includes(searchName));
  const users = filterUserList?.sort((a, b) => {
    if(a.status !== 'offline' && b.status === 'offline') {
      return -1;
    }
    if(a.status === 'offline' && b.status !== 'offline') {
      return 1;
    }
    return 0
  });


  return (
    <>    
      <div className="mb-6">
        <SearchUser is_set={!!searchName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)} />
      </div>
      {users?.length === 0 && (
          searchName !== "" ? 
          (<div>検索にヒットするユーザーが見つかりません。</div>) :
          (
            <div>
              <div>ユーザーが登録されていません。</div>
              <div>新規ユーザーを追加してください。</div>
            </div>
          )
      )}
      <div className="flex flex-wrap gap-2 mx-auto">
        {users?.map((user) => (
            <Link 
              href={`/schedule/${user.id}#currentTime`}
              key={user.id}
              className="w-[300px]"
            >        
              <div className="flex items-center justify-between p-6 border border-gray-200 rounded-md shadow-md bg-white">
                <div>{user.displayName}</div>
                <div className={`w-4 h-4 rounded-full ${user.status === 'online' ? 'bg-green-400' : user.status === 'leave' ? 'bg-yellow-400' : user.status === 'busy' ? 'bg-red-400' : 'bg-gray-400'}`}></div>
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}

export default UserList