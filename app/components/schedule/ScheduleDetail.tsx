import React from 'react'
import { formatInTimeZone } from 'date-fns-tz';

type Props = {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
}
const ScheduleDetail = ({ title, description, startTime, endTime }: Props) => {
  const formatStartTime = formatInTimeZone(new Date(startTime), 'Asia/Tokyo', 'H:mm');
  const formatEndTime = formatInTimeZone(new Date(endTime), 'Asia/Tokyo', 'H:mm');

  return (
    <>
      <div className="flex flex-col max-sm:text-sm">
        <div className="flex gap-1.5 mb-6">
          <div className="min-w-[80px] max-w-[80px] text-right">タイトル：</div>
          <div>{title}</div>
        </div>
        <div className="flex gap-1.5 mb-6">
          <div className="min-w-[80px] max-w-[80px] text-right">日程：</div>
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
        <div className="flex gap-1.5">
          <div className="min-w-[80px] max-w-[80px] text-right">備考：</div>
          <div>{description ? description : "なし"}</div>
        </div>
      </div>
    </>
  )
}

export default ScheduleDetail