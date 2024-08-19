'use client'
import React, { useState } from 'react'
import TimePicker from '../components/TimePicker';

const Schedule = () => {
  //初期時刻を直近の15分刻みの時刻に設定
  const initialDate = new Date();
  const minutes = initialDate.getMinutes();
  const remainder = minutes % 15;
  initialDate.setMinutes(minutes + (15 - remainder));


  const [startTime, setStartTime] = useState<Date>(initialDate);
  const [endTime, setEndTime] = useState<Date>(initialDate);
  const [title, setTitle] = useState<string>("");


  const handleStartTime = (startTime: Date) => {
    setStartTime(startTime)
  }

  const handleEndTime = () => {
    
  }

  const handleRegisterSchedule = () => {

  }

  return (
    <>
      <div className="w-[300px]">
        <input 
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-200 shadow-md text-base block p-1 h-12"
        />
        <div className="flex">
          <TimePicker
            id='startTime'
            name='startTime'
            title='開始'
            value={startTime}
            setter={setStartTime}
            onChange={handleStartTime}
          />
          <TimePicker
            id='endTime'
            name='endTime'
            title='終了'
            value={endTime}
            setter={setEndTime}
            onChange={handleEndTime}
          />
        </div>
        <button 
          onClick={handleRegisterSchedule}
          className="flex items-center justify-center w-[50px] h-[50px] border rounded-full text-2xl bg-blue-500">
            +
        </button>
      </div>
    </>
  )
}

export default Schedule