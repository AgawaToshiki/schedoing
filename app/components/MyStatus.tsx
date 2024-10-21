import React from 'react';
import { Database } from '../../database.types';
import ChangeStatusList from '../components/ChangeStatusList';


type User = Database['public']['Tables']['users']['Row'];

type Props = {
  user: User;
}

const MyStatus = ({ user }: Props) => {
  return (
    <>
      <div>ユーザー名：{user.displayName}</div>
        <div className="flex items-center gap-1.5">
          <div>状態：</div>
          <ChangeStatusList id={user.id} status={user.status}/>
        </div>
    </>
  )
}

export default MyStatus