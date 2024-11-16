'use client'
import React, { useEffect, useState } from 'react'
import { Database } from '@/database.types';
import { format } from "date-fns";
import ScheduleModal from '../../components/schedule/ScheduleModal';
import DeleteSchedule from '../../components/schedule/DeleteSchedule';

type ScheduleByDatabase = Database['public']['Tables']['schedules']['Row'];
type Schedule = Pick<ScheduleByDatabase, 'user_id' | 'id' | 'title' | 'description' | 'start_time' | 'end_time'>

type Props = {
  paramId: string;
  isOwn: boolean;
  schedule: Schedule;
}

const ScheduleCard = ({ paramId, isOwn, schedule }: Props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [style, setStyle] = useState<{ height: number | null, top: number | null }>({ height: null, top: null });


  useEffect(() => {
    const calculateHeight = (startTime: string, endTime: string): { startMinutes: number, result: number } => {
      const getTotalMinutes = (timestamp: string): number => {
        const getDate = new Date(timestamp);
        const hours = getDate.getHours();
        const minutes = getDate.getMinutes();
        return hours * 60 + minutes;
      };
      const startMinutes = getTotalMinutes(startTime);
      const endMinutes = getTotalMinutes(endTime);
      const result = endMinutes - startMinutes;
      return {
        startMinutes,
        result,
      };
    };

    const { startMinutes, result: height } = calculateHeight(schedule.start_time, schedule.end_time);
    setStyle({ height, top: startMinutes });
  }, [schedule.start_time, schedule.end_time]);

  const formatStartTime = format(schedule.start_time, "H:mm");
  const formatEndTime = format(schedule.end_time, "H:mm");

  const handleOpenModal = (): void => {
    setIsOpen(true);
  }


  return (
    <>
      {style.height && style.top && (
        <div 
          className="flex items-center justify-center gap-10 absolute z-30 w-[80%] left-0 right-0 mx-auto bg-green-300 border border-green-500 shadow-md rounded-lg cursor-pointer transition duration-200 ease-in-out hover:bg-green-500"
          style={{height:`${style.height}px`, top:`${style.top}px`}}
          onClick={handleOpenModal}
        >
          <div className="text-xl z-30 select-none">{schedule.title}</div>
          <div className="flex items-center text-xl z-30 select-none">
            <div className="mr-2">{formatStartTime}</div>
            <div>～</div>
            <div className="ml-2">{formatEndTime}</div>
          </div>
          {isOwn && (
            <DeleteSchedule id={schedule.id} paramId={paramId} />
          )}
        </div>
      )}

      {isOpen && (
        <ScheduleModal
          isOpen={isOpen}
          isOwn={isOwn}
          paramId={paramId}
          setter={setIsOpen}
          schedule={schedule}
        />
      )}

    </>
  )
}

export default ScheduleCard