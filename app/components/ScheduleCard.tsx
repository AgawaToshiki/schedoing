import React from 'react'
import { format } from "date-fns";

type Props = {
  schedule: {
    id: string,
    title: string,
    start_time: Date,
    end_time: Date
  }
}

const ScheduleCard = ({ schedule }: Props) => {
  
  const calculateHeight = (startTime: Date, endTime: Date): { startMinutes: number, result: number } => {
    const getTotalMinutes = (date: Date): number => {
      const getDate = new Date(date);
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

  return (
    <>
      <div 
        className="flex items-center justify-center gap-10 absolute z-30 w-[80%] left-0 right-0 mx-auto border border-green-500 shadow-md rounded-lg bg-green-300 hover:bg-green-500"
        style={{height:`${height}px`, top:`${startMinutes}px`}}
      >
        <div className="text-xl z-30">{schedule.title}</div>
        <div className="text-xl z-30">{formatStartTime}～{formatEndTime}</div>
      </div>
    </>
  )
}

export default ScheduleCard