import React from 'react'
import { format } from "date-fns";

type Props = {
  title: string;
  startTime: Date;
  endTime: Date;
}
const ScheduleDetail = ({ title, startTime, endTime }: Props) => {

  const formatStartTime = format(startTime, "H:mm");
  const formatEndTime = format(endTime, "H:mm");

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 mb-6">
          <div>タイトル：</div>
          <div>{title}</div>
        </div>
        <div className="flex items-center gap-1.5">
          <div>日程：</div>
          <div className="flex items-center">
            <div className="mr-2">
              {formatStartTime}
            </div>
            <div>～</div>
            <div className="ml-2">
              {formatEndTime}
            </div>
          </div>
        </div>

        </div>
    </>
  )
}

export default ScheduleDetail