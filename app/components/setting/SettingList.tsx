import React from 'react'
import SwitchFlagElement from '../../components/setting/SwitchFlagElement';
import { User } from '../../types';


type Props = {
  user: User;
}

const SettingList = ({ user }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4 max-w-[450px] h-full">
        <SwitchFlagElement
          id={user.id}
          title="日付変更時にスケジュールをリセット"
          name="reset-schedules"
          defaultFlag={user.is_reset_schedules}
        />
      </div>
    </>
  )
}

export default SettingList