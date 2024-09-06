'use server'
import React from 'react'
import ScheduleForm from '../../components/schedule/ScheduleForm';

type Props = {
  isOwn: boolean;
}

const RegisterSchedule = ({ isOwn }: Props) => {

  //初期時刻を直近の15分刻みの時刻に設定
  const defaultStartDate = new Date();
  const minutes = defaultStartDate.getMinutes();
  const remainder = minutes % 15;
  defaultStartDate.setMinutes(minutes + (15 - remainder));
  defaultStartDate.setSeconds(0);
  defaultStartDate.setMilliseconds(0);
  //デフォルト終了時刻は開始時刻+15分
  const defaultEndDate = new Date(defaultStartDate.getTime());
  defaultEndDate.setMinutes(defaultStartDate.getMinutes() + 15);

  return (
    <>
      <div className="relative z-50 w-[300px]">
        <ScheduleForm
          title="" 
          startTime={defaultStartDate} 
          endTime={defaultEndDate}
          isOwn={isOwn}
          name="register"
        />
      </div>
    </>
  )
}

export default RegisterSchedule