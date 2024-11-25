'use server'
import React from 'react'
import ScheduleForm from '../../components/schedule/ScheduleForm';

type Props = {
  userId: string;
}

const RegisterSchedule = ({ userId }: Props) => {

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
      <div className="relative z-50 max-w-[300px] w-full">
        <ScheduleForm
          title="" 
          description=""
          startTime={defaultStartDate} 
          endTime={defaultEndDate}
          userId={userId}
          name="register"
        />
      </div>
    </>
  )
}

export default RegisterSchedule