'use client'
import React, { useEffect, useState } from 'react'
import ScheduleCard from '../../components/schedule/ScheduleCard';
import CurrentTimeBorder from '../../components/CurrentTimeBorder';
import { getUserWithSchedules } from '@/app/utils/supabase/supabaseFunctions';
import { useRealtimeListener } from "../../hooks/useRealtimeListener";
import { Schedule } from '../../types';


type Props = {
  userId: string;
  isOwn: boolean;
  schedulesData: Schedule[] | null;
}

const SchedulePanel = ({ userId, isOwn }: Props) => {

  const [schedules, setSchedules] = useState<Schedule[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getUserWithSchedules(userId);
      if(data){
        setSchedules(data.schedules);
      }
    })()
  }, [])

  useRealtimeListener<Schedule>({
    table: 'schedules',
    setter: setSchedules,
    isValidData: (obj: any): obj is Schedule => {
      return (
        typeof obj.user_id === 'string' &&
        typeof obj.id === 'string' &&
        typeof obj.title === 'string' &&
        typeof obj.description === 'string' &&
        obj.start_time instanceof Date &&
        obj.end_time instanceof Date
      );
    }
  })

  const filterSchedules = schedules?.filter(item => item.user_id === userId);

  const timeArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

  return (
    <>
      <div className="flex items-center w-full h-full p-6 border border-gray-200 rounded-md shadow-md bg-white overflow-y-scroll scrollbar max-md:p-4">
        <div className="relative w-[30px] h-full">
          {timeArray.map((index) => (
            <div key={index}>
              <div className="absolute translate-y-[-50%] z-50 pr-2 bg-white" style={{ top: `${index * 60}px`}}>
                <div className="select-none">{index}:00</div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative w-full h-full">
          <div className="absolute w-full h-full">
            <CurrentTimeBorder />
            {filterSchedules?.map((schedule) => (
              <ScheduleCard key={schedule.id} schedule={schedule} isOwn={isOwn} userId={userId} />
            ))}
          </div>
          {timeArray.map((index) => (
            <div key={index} className="absolute z-10 w-full h-[1px] bg-gray-300" style={{ top: `${index * 60}px`}}></div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SchedulePanel

