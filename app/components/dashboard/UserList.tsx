'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import SearchUser from '../../components/SearchUser';
import Loading from '../../components/layouts/Loading';
import { getAllUser } from "@/app/utils/supabase/supabaseFunctions";
import { useRealtimeListener } from "../../hooks/useRealtimeListener";
import { User } from '../../types';


type Props = {
  userId: string
}

const UserList = ({ userId }: Props) => {

  const [users, setUsers] = useState<User[] | null>(null);
  const [searchName, setSearchName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const data = await getAllUser();
        if(data){
          setUsers(data);
        }
      } catch (error) {
        console.error("ユーザー取得エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    const channel = useRealtimeListener<User>({
      table: 'users',
      setter: setUsers,
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

    return () => {
      channel.unsubscribe();
    }
  }, [])

  const filterUsers = users?.filter(item => item.id !== userId && item.displayName.includes(searchName));
  const resultUsers = filterUsers?.sort((a, b) => {
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
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="mb-6">
            <SearchUser is_set={!!searchName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)} />
          </div>
          {resultUsers?.length === 0 && (
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
            {resultUsers?.map((user) => (
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
        </div>
      )}
    </>
  )
}

export default UserList