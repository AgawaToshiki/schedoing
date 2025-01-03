'use client'
import React, { useState } from 'react';
import ScheduleModal from '../../components/schedule/ScheduleModal';
import DeleteSchedule from '../../components/schedule/DeleteSchedule';
import Icon from '../../components/elements/Icon';
import { getTotalMinutes } from '@/app/utils/functions';
import { formatInTimeZone } from 'date-fns-tz';
import { Schedule } from '../../types';

type Props = {
  userId: string;
  isOwn: boolean;
  schedule: Schedule;
}

const ScheduleCard = ({ userId, isOwn, schedule }: Props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const calculateHeight = (startTime: string, endTime: string): { startMinutes: number, result: number } => {
    const startMinutes = getTotalMinutes(startTime);
    const endMinutes = getTotalMinutes(endTime);
    const result = endMinutes - startMinutes;
    return {
      startMinutes,
      result,
    };
  };

  const { startMinutes, result: height } = calculateHeight(schedule.start_time, schedule.end_time);

  const formatStartTime = formatInTimeZone(new Date(schedule.start_time), 'Asia/Tokyo', 'H:mm');
  const formatEndTime = formatInTimeZone(new Date(schedule.end_time), 'Asia/Tokyo', 'H:mm');

  const handleOpenModal = (): void => {
    setIsOpen(true);
  }

  return (
    <>
      <div 
        className="
        flex items-center justify-center gap-10 absolute z-30 w-[70%] px-6 left-0 right-0 mx-auto where:bg-green-300 border border-green-500 shadow-md rounded-lg cursor-pointer transition duration-100 ease-in-out
        hover:where:bg-green-400 active:bg-green-500
        max-md:px-4 max-sm:w-[85%] max-sm:gap-2 max-sm:px-2
        "
        style={{height:`${height}px`, top:`${startMinutes}px`}}
        onClick={handleOpenModal}
      >
        <div className="flex items-center gap-10 max-md:flex-col max-md:gap-4">
          <div className="z-30 select-none break-all max-sm:text-sm">{schedule.title}</div>
          <div className="flex items-center z-30 select-none max-sm:hidden">
            <div className="mr-2">{formatStartTime}</div>
            <div>～</div>
            <div className="ml-2">{formatEndTime}</div>
          </div>
        </div>
        {isOwn ? (
          <DeleteSchedule scheduleId={schedule.id} userId={userId} />
        ) : (
          schedule.description && (
            <Icon icon="message" color="#1f2937" size={20}/>
          )
        )}
      </div>

      <ScheduleModal
        isOpen={isOpen}
        isOwn={isOwn}
        userId={userId}
        setter={setIsOpen}
        schedule={schedule}
      />
    </>
  )
}

export default ScheduleCard