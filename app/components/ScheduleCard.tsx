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
  const startTime = new Date(schedule.start_time)
  const s = startTime.getHours();
  const ss = startTime.getMinutes();
  const sss = s * 60 + ss;

  const endTime = new Date(schedule.end_time)
  const e = endTime.getHours();
  const ee = endTime.getMinutes();
  const eee = e * 60 + ee;

  const height = eee - sss
  console.log(height);
  console.log(sss);
  // const formatDate = format(schedule.start_time, "yyyy/MM/dd");
  return (
    <>
      <div 
        className="flex items-center justify-center gap-10 absolute w-full bg-green-400"
        style={{height:`${height}px`, top:`${sss}px`}}
      >
        <div>{schedule.title}</div>
        <button>Delete</button>
      </div>
    </>
  )
}

export default ScheduleCard