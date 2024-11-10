import React from 'react'
import { Database } from "../../../database.types";
import ChangeResetSchedule from '../../components/setting/ChangeResetSchedule';

type User = Database['public']['Tables']['users']['Row'];

type Props = {
  user: User;
}

const SettingList = ({ user }: Props) => {
  return (
    <>
      <div className="flex flex-col bg-gray-300">
        <ChangeResetSchedule id={user.id} resetFlag={user.is_reset_schedules}/>
      </div>
    </>
  )
}

export default SettingList