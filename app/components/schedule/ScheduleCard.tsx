'use client'
import React, { useState } from 'react'
import { Database } from '@/database.types';
import { format } from "date-fns";
import ScheduleModal from '../../components/schedule/ScheduleModal';
import DeleteSchedule from '../../components/schedule/DeleteSchedule';

type ScheduleByDatabase = Database['public']['Tables']['schedules']['Row'];
type Schedule = Pick<ScheduleByDatabase, 'id' | 'title' | 'start_time' | 'end_time'>

type Props = {
  isOwn: boolean;
  schedule: Schedule;
}

const ScheduleCard = ({ isOwn, schedule }: Props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  
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

  const formatStartTime = format(schedule.start_time, "H:mm");
  const formatEndTime = format(schedule.end_time, "H:mm");

  const handleOpenModal = () => {
    setIsOpen(true);
  }



  return (
    <>
      <div 
        className="flex items-center justify-center gap-10 absolute z-30 w-[80%] left-0 right-0 mx-auto border border-green-500 shadow-md rounded-lg bg-green-300 hover:bg-green-500 cursor-pointer"
        style={{height:`${height}px`, top:`${startMinutes}px`}}
        onClick={handleOpenModal}
      >
        <div className="text-xl z-30 select-none">{schedule.title}</div>
        <div className="flex items-center text-xl z-30 select-none">
          <div className="mr-2">{formatStartTime}</div>
          <div>～</div>
          <div className="ml-2">{formatEndTime}</div>
        </div>
        {isOwn && (
          <DeleteSchedule id={schedule.id} />
        )}
      </div>
      {isOpen && (
        <ScheduleModal
          isOpen={isOpen}
          isOwn={isOwn}
          setter={setIsOpen}
          schedule={schedule}
        />
      )}

    </>
  )
}

export default ScheduleCard