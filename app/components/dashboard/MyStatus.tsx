import React from 'react';
import { redirect } from 'next/navigation';
import ChangeStatusList from '../../components/dashboard/ChangeStatusList';
import { getUser } from '@/app/utils/supabase/supabaseFunctions';


type Props = {
  userId: string;
}

const MyStatus = async({ userId }: Props) => {
  const user = await getUser(userId);
  if(!user){
    redirect('/login')
  }
  
  return (
    <>
      <div>ユーザー名：{user.displayName}</div>
      <div className="flex items-center gap-1.5">
        <div>状態：</div>
        <ChangeStatusList id={user.id} status={user.status} />
      </div>
    </>
  )
}

export default MyStatus