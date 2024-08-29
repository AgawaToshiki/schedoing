import React from 'react'
import ScheduleForm from '../../components/schedule/ScheduleForm';

const RegisterSchedule = () => {

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
          path="register"
        >
          <button
            type="submit"
            className="flex items-center justify-center w-[50px] h-[50px] border rounded-full text-2xl bg-blue-500">
              +
          </button>
        </ScheduleForm>
      </div>
    </>
  )
}

export default RegisterSchedule