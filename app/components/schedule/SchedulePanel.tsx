'use client'
import React from 'react'
import { Database } from '../../../database.types';
import CurrentTimeBorder from '../../components/CurrentTimeBorder';
import ScheduleCard from '../../components/schedule/ScheduleCard';
import { useRealtimeListener } from "../../hooks/useRealtimeListener";

type ScheduleByDatabase = Database['public']['Tables']['schedules']['Row'];
type Schedule = Pick<ScheduleByDatabase, 'user_id' | 'id' | 'title' | 'description' | 'start_time' | 'end_time'>

type Props = {
  userId: string;
  isOwn: boolean;
  schedulesData: Schedule[] | null;
}

const SchedulePanel = ({ userId, isOwn, schedulesData }: Props) => {

  const schedulesList = useRealtimeListener<Schedule>({
    table: 'schedules',
    defaultData: schedulesData,
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

  const schedules = schedulesList?.filter(item => item.user_id === userId);

  const timeArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

  return (
    <>
      <div className="w-full h-full p-6 border border-gray-200 rounded-md shadow-md bg-white">
        <div className="relative h-full overflow-y-scroll scrollbar">
          <div className="absolute w-full h-full">
            <CurrentTimeBorder />
            {schedules?.map((schedule) => (
              <ScheduleCard key={schedule.id} schedule={schedule} isOwn={isOwn} userId={userId} />
            ))}

            {timeArray.map((index) => (
              <div key={index}>
                <div className="absolute" style={{ top: `${index * 60}px`}}>
                  <div className="select-none">{index}:00</div>
                </div>
                <div className="absolute w-full h-[1px] bg-gray-300" style={{ top: `${index * 60}px`}}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SchedulePanel

