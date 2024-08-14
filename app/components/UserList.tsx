'use client'

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Props = {
  data: {
    id: any;
    created_at: any;
    email: any;
    role: any;
    displayName: any;
    status: any;
  }[]| null
}

const UserList = ({ data }: Props) => {
  const [users, setUsers] = useState(data);

  const listenData = async() => {
    const channel = supabase
      .channel('users')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, 
        (payload: any) => {
          setUsers(currentUsers => {
            if(!currentUsers){
              return data
            }
            return currentUsers.map((user) => (
              user.id === payload.new.id ? { ...user, ...payload.new }: user
            ))
          })
        })
      .subscribe()
    return () => {
      channel.unsubscribe();
    };
  }

  useEffect(() => {
    listenData();
  }, [users])

  return (
    <>
      {users?.map((user) => (
        <div className="flex items-center mx-4 p-4 border border-black rounded-lg bg-red-100" key={user.id}>
          <div className="p-4 bg-red-100">{user.displayName}</div>
          <div className={`w-4 h-4 rounded-full ${user.status === 'online' ? 'bg-green-400' : user.status === 'leave' ? 'bg-red-400' : 'bg-gray-400'}`}></div>
        </div>
      ))}
    </>
  )
}

export default UserList