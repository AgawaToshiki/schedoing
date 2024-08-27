'use client'
import React, { useState } from 'react'
import { useInterval } from '../hooks/useInterval';

const CurrentTimeBorder = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const currentTime = hours * 60 + minutes;

  const [currentTimeHeight, setCurrentTimeHeight] = useState<number>(currentTime);

  const getCurrentTimeHeight = () => {
    setCurrentTimeHeight(currentTime);
  }

  useInterval(() => getCurrentTimeHeight())

  return (
    <>
      <div className="absolute z-40 w-full" style={{top:`${currentTimeHeight}px`}}>
        <div className='h-0 w-full'>
          <div className='w-full border-t-4 border-red-400 rounded-sm'></div>
        </div>
        <div id="currentTimeBorder" className="block mt-[-80px]"></div>
      </div>
    </>
  )
}

export default CurrentTimeBorder