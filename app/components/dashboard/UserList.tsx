'use client'
import { Database } from "../../../database.types";
import Link from "next/link";
import { useRealtimeListener } from "../../hooks/useRealtimeListener";

type User = Database['public']['Tables']['users']['Row'];

type Props = {
  data: User[]
  userId: string
}

const UserList = ({ data, userId }: Props) => {

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

  const users = usersList?.filter(item => item.id !== userId);

  return (
    <>
      {users?.map((user) => (
        <Link href={`/schedule/${user.id}#currentTime`} key={user.id}>        
          <div className="flex items-center gap-4 mx-4 p-6 border border-gray-200 rounded-md shadow-md bg-white">
            <div>{user.displayName}</div>
            <div className={`w-4 h-4 rounded-full ${user.status === 'online' ? 'bg-green-400' : user.status === 'leave' ? 'bg-yellow-400' : user.status === 'busy' ? 'bg-red-400' : 'bg-gray-400'}`}></div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default UserList