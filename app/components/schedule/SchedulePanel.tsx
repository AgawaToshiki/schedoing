'use client'
import React, { useEffect, useState } from 'react'
import { Database } from '../../../database.types';
import { supabase } from "../../lib/supabase";
import CurrentTimeBorder from '../../components/CurrentTimeBorder';
import ScheduleCard from '../../components/schedule/ScheduleCard';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type ScheduleByDatabase = Database['public']['Tables']['schedules']['Row'];
type Schedule = Pick<ScheduleByDatabase, 'id' | 'title' | 'start_time' | 'end_time'>

type Props = {
  schedulesData: Schedule[] | null
}

const SchedulePanel = ({ schedulesData }: Props) => {

  const [schedules, setSchedules] = useState<Schedule[] | null>(schedulesData);

  const timeArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

  const isValidSchedule = (obj: any): obj is Schedule => {
    return (
      typeof obj.id === 'string' &&
      typeof obj.title === 'string' &&
      obj.start_time instanceof Date &&
      obj.end_time instanceof Date
    );
  }

  const listenScheduleData = async() => {
    const channel = supabase
      .channel('schedules')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'schedules' }, 
        (payload: RealtimePostgresChangesPayload<Schedule>) => {
          setSchedules((currentSchedules): Schedule[] | null => {
            if(!currentSchedules){
              if(isValidSchedule(payload.new)){
                return [payload.new]
              }
              return null
            }
            switch(payload.eventType) {
              case 'INSERT':
                return [...currentSchedules, payload.new]
              case 'UPDATE':
                return currentSchedules.map((schedule) => (
                  schedule.id === payload.new.id ? { ...schedule, ...payload.new } : schedule
                ))
              case 'DELETE':
                return currentSchedules.filter(schedule => schedule.id !== payload.old.id)
              default:
                return currentSchedules
            }
          })
        })
      .subscribe()
    return () => {
      channel.unsubscribe();
    };
  }

  useEffect(() => {
    listenScheduleData();
  }, [])

  return (
    <>
      <div className="w-full h-full p-6 border border-gray-200 rounded-md shadow-md bg-white">
        <div className="relative h-full overflow-y-scroll">
          <div className="absolute w-full h-full">
            <CurrentTimeBorder />
            {schedules?.map((schedule) => (
              <ScheduleCard key={schedule.id} schedule={schedule} />
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

