'use client'
import React, { useState } from 'react'
import { Database } from '@/database.types';
import { format } from "date-fns";
import EditScheduleModal from '../components/EditScheduleModal';

type ScheduleByDatabase = Database['public']['Tables']['schedules']['Row'];
type Schedule = Pick<ScheduleByDatabase, 'id' | 'title' | 'start_time' | 'end_time'>

type Props = {
  schedule: Schedule
}

const ScheduleCard = ({ schedule }: Props) => {

  const [isShow, setShow] = useState<boolean>(false);
  
  const calculateHeight = (startTime: string, endTime: string): { startMinutes: number, result: number } => {
    const getTotalMinutes = (timestamp: string): number => {
      const getDate = new Date(timestamp);
      const hours = getDate.getHours();
      const minutes = getDate.getMinutes();
      const sum = hours * 60 + minutes;
      return sum
    }
    const startMinutes = getTotalMinutes(startTime);
    const endMinutes = getTotalMinutes(endTime);
    const result = endMinutes - startMinutes;
    return {
      startMinutes,
      result
    }
  }
  const { startMinutes, result: height } = calculateHeight(schedule.start_time, schedule.end_time);

  const formatStartTime = format(schedule.start_time, "k:mm");
  const formatEndTime = format(schedule.end_time, "k:mm");

  const handleShowModal = () => {
    setShow(true);
  }

  return (
    <>
      <div 
        className="flex items-center justify-center gap-10 absolute z-30 w-[80%] left-0 right-0 mx-auto border border-green-500 shadow-md rounded-lg bg-green-300 hover:bg-green-500 cursor-pointer"
        style={{height:`${height}px`, top:`${startMinutes}px`}}
        onClick={handleShowModal}
      >
        <div className="text-xl z-30 select-none">{schedule.title}</div>
        <div className="text-xl z-30 select-none">{formatStartTime}～{formatEndTime}</div>
      </div>
      {isShow && (
        <EditScheduleModal
          isShow={isShow} 
          setter={setShow}
          schedule={schedule}
        />
      )}

    </>
  )
}

export default ScheduleCard