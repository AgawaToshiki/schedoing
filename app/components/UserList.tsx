'use client'

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Database } from "../../database.types";
import Link from "next/link";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

type User = Database['public']['Tables']['users']['Row'];

type Props = {
  data: User[] | null
}

const UserList = ({ data }: Props) => {

  const [users, setUsers] = useState<User[] | null>(data);

  const isValidUser = (obj: any): obj is User => {
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

  const listenUserData = async() => {
    const channel = supabase
      .channel('users')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, 
        (payload: RealtimePostgresChangesPayload<User>) => {
          setUsers((currentUsers): User[] | null => {
            if(!currentUsers){
              if(isValidUser(payload.new)){
                return [payload.new]
              }
              return null
            }
            switch(payload.eventType) {
              case 'INSERT':
                return [...currentUsers, payload.new]
              case 'UPDATE':
                return currentUsers.map((user) => (
                  user.id === payload.new.id ? { ...user, ...payload.new } : user
                ))
              case 'DELETE':
                return currentUsers.filter(user => user.id !== payload.old.id)
              default:
                return currentUsers
            }
          })
        })
      .subscribe()
    return () => {
      channel.unsubscribe();
    };
  }

  useEffect(() => {
    listenUserData();
  }, [])

  return (
    <>
      {users?.map((user) => (
        <Link href={`/${user.id}/schedule#currentTimeBorder`} key={user.id}>        
          <div className="flex items-center gap-4 mx-4 p-6 border border-gray-200 rounded-md shadow-md bg-white">
            <div>{user.displayName}</div>
            <div className={`w-4 h-4 rounded-full ${user.status === 'online' ? 'bg-green-400' : user.status === 'leave' ? 'bg-red-400' : 'bg-gray-400'}`}></div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default UserList