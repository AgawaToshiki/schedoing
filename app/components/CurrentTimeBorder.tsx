'use client'
import React, { useEffect, useState } from 'react'
import { useInterval } from '../hooks/useInterval';

const CurrentTimeBorder = () => {
  const getCurrentTime = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const currentTime = hours * 60 + minutes;
    return currentTime
  }
  const [currentTimeHeight, setCurrentTimeHeight] = useState<number | null>(null);

  useEffect(() => {
    setCurrentTimeHeight(getCurrentTime());
  }, [])

  const getCurrentTimeHeight = () => {
    setCurrentTimeHeight(getCurrentTime());
  }

  useInterval(() => getCurrentTimeHeight(), 30000)

  return (
    <>
      {currentTimeHeight && (
        <div className="absolute z-40 w-full" style={{top:`${currentTimeHeight}px`}}>
          <div className='h-0 w-full'>
            <div className='w-full border-t-4 border-red-400 rounded-sm'></div>
          </div>
          <div id="currentTime" className="block mt-[-80px]"></div>
        </div>
      )}

    </>
  )
}

export default CurrentTimeBorder